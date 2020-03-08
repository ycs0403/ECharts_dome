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
 * ��ͼ���棬atmλ����Ϣ����
 *
 */
public class AtmMapUtil {
	//��ͼ����
	private static final ConcurrentHashMap<String, BufferedImage>  atmMapCache = new ConcurrentHashMap<String, BufferedImage>();
	//λ����Ϣ����
	private static final ConcurrentHashMap<String, ArrayList<Location>>  atmMapLocationCache = new ConcurrentHashMap<String, ArrayList<Location>>();
	
	public static BufferedImage getImageCache(String mapPath){
		BufferedImage cache = atmMapCache.get(mapPath);
		
		if(cache==null){
			System.out.println("��ʼ����ͼƬ");
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
		System.out.println("����λ����Ϣ");
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
		
		//ͼƬ��Ⱥ͸߶�
		int width = image.getWidth();
		int height = image.getHeight();
		
		System.out.println("ͼƬ�Ŀ��Ϊ"+width+",�߶�Ϊ"+height);
		//��ȡ����
		Graphics2D g = (Graphics2D) image.getGraphics();
		g.setColor(Color.RED);
		
		//��ȡatm��λ�þ�γ�ȼ�x��y��ֵ
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
