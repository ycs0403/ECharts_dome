package com.Echarts.util;
/**
 * 
 * atm����λ������x,y��λ������locationDesc
 *
 */
public class Location {
	private int x;
	private int y;
	
	private String locationDesc;
	
	public Location(int x, int y ,String locationDesc) {
		this.x = x;
		this.y = y;
		this.locationDesc = locationDesc;
	}

	public int getX() {
		return x;
	}

	public void setX(int x) {
		this.x = x;
	}

	public int getY() {
		return y;
	}

	public void setY(int y) {
		this.y = y;
	}

	public String getLocationDesc() {
		return locationDesc;
	}

	public void setLocationDesc(String locationDesc) {
		this.locationDesc = locationDesc;
	}
	
	
}
