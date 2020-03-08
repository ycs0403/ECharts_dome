package com.Echarts.util;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.concurrent.ConcurrentHashMap;

import javax.imageio.ImageIO;
/**
 * 
 * 地图缓存，atm位置信息缓存
 *
 */
public class AtmMapUtil {
	//地图缓存
	private static final ConcurrentHashMap<String, BufferedImage>  atmMapCache = new ConcurrentHashMap<String, BufferedImage>();
	//位置信息缓存
	private static final ConcurrentHashMap<String, ArrayList<Location>>  atmMapLocationCache = new ConcurrentHashMap<String, ArrayList<Location>>();
	
	public static BufferedImage getImageCache(String mapPath){
		BufferedImage cache = atmMapCache.get(mapPath);
		
		if(cache==null){
			System.out.println("开始缓存图片");
			cache = createImageCache(mapPath);
			atmMapCache.put(mapPath, cache);
		}
		return cache;
	}
	
	public static ArrayList<Location> getLocationsCache(String mapPath){
		ArrayList<Location> cacheLocation = atmMapLocationCache.get(mapPath);
		return cacheLocation;
	}
	public static  void setLocationsCache(String mapPath,ArrayList<Location> locations){
		System.out.println("缓存位置信息");
		atmMapLocationCache.put(mapPath, locations);
	}

	public static BufferedImage createImageCache(String mapPath) {
		BufferedImage biMap = null;
		try {
			biMap = ImageIO.read(new File(mapPath));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return biMap;
	}
	
	public static void outImage(BufferedImage image,ArrayList<Location> locations,OutputStream out){
		
		//图片宽度和高度
		int width = image.getWidth();
		int height = image.getHeight();
		
		System.out.println("图片的宽度为"+width+",高度为"+height);
		//获取画笔
		Graphics2D g = (Graphics2D) image.getGraphics();
		g.setColor(Color.RED);
		
		//获取atm的位置经纬度即x和y的值
		for(int z=0;z<locations.size();z++){
			int x = locations.get(z).getX();
			int y = locations.get(z).getY();
		    g.fillOval(x, y, 20, 20);
		}
		try {
			ImageIO.write(image, "png", out);
			out.flush();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if(out!=null){
				try {
					out.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
	
	
}
