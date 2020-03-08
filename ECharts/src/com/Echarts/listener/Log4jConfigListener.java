package com.Echarts.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.PropertyConfigurator;

public class Log4jConfigListener implements ServletContextListener {
	private static final long serialVersionUID = 1L;

	public void contextDestroyed(ServletContextEvent sce) {
	}

	public void contextInitialized(ServletContextEvent sce) {
		String log4jDir = "log4j.properties";
		String path = this.getClass().getClassLoader().getResource("/").getPath();
	    String pathHandled = path.substring(0,path.length()-8).replaceAll("\\\\", "/");
	    PropertyConfigurator.configure(pathHandled +log4jDir);
	}
}
