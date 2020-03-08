package com.Echarts.action;


import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Map;
import java.util.Random;



import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.Echarts.util.AtmMapUtil;
import com.Echarts.util.Location;

public class EchartsAction extends BaseAction {
	private static final Log log = LogFactory.getLog(EchartsAction.class);
	
	
	
	public void doGetAtmMap(){
		log.info("��ʼ��ȡ��ͼģ��");
		String mapName = this.getParaMap().get("mapName");
		
		try {
			mapName = java.net.URLDecoder.decode(mapName,"UTF-8");
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		}
		String commonPath = this.getClass().getClassLoader().getResource("/").getPath();
		String mapPath = commonPath+"../../atmMapModel/baiduMap_liuzhou.png";
		
		BufferedImage bufferedImage = AtmMapUtil.getImageCache(mapPath);
		
		ArrayList<Location> locations = AtmMapUtil.getLocationsCache(mapPath);
		if(locations==null || locations.size()<1) {
			System.out.println("����λ����Ϣ�������û���");
			locations = this.getLocationService(mapName);
			AtmMapUtil.setLocationsCache(mapPath, locations);
		}
		OutputStream out = null;;
		try {
			out = this.getResponse().getOutputStream();
			AtmMapUtil.outImage(bufferedImage, locations, out);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}


   /**
    * ģ�����ݿ����
    * @param mapName
    * @return
    */
	private ArrayList<Location> getLocationService(String mapName) {
		Random random = new Random();
		Location location = null;
		ArrayList<Location> locations = new ArrayList<Location>();
		for(int i=0; i<8;i++){
			location = new Location(random.nextInt(800),random.nextInt(450),new String("location"+i));
			locations.add(location);
		}
		return locations;
	}
	
	/**
	 * ��ȡ�����atmλ�����꣬��֤��ͨ���򷵻ظ�atm��λ����Ϣ������ǰ̨�����ʾ
	 */
	public void doCheckAtmMapLocationAndGetDesc(){
		Map params = this.getParaMap();
		
		int positionX = Integer.parseInt((String) params.get("positionX"));
		int positionY = Integer.parseInt((String) params.get("positionY"));
		System.out.println("���������XΪ"+positionX+",YΪ"+positionY);
		String commonPath = this.getClass().getClassLoader().getResource("/").getPath();
		String mapPath = commonPath+"../../atmMapModel/baiduMap_liuzhou.png";
		ArrayList<Location> locations = AtmMapUtil.getLocationsCache(mapPath);
		
		for(Location l:locations){
			int x = l.getX();
			int y = l.getY();
			//���λ�÷�Χ�ж�
			if(x<=positionX && positionX<=(x+15)){
				if(y<=positionY && positionY<=(y+15)){
					//���λ����Ϣ
					outJsonString(l.getLocationDesc());
				}
			}
			System.out.println("atmλ������x="+x+",y="+y);
		}
		
	}
}
