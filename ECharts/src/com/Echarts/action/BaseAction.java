package com.Echarts.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.DateFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.LazyDynaBean;
import org.apache.struts2.ServletActionContext;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.Echarts.util.CommonUtil;
import com.Echarts.util.PageResult;
import com.opensymphony.xwork2.ActionSupport;


public class BaseAction extends ActionSupport {
	private static final long serialVersionUID = 780890225752339116L;
	protected interface ObjectToString{
		public String getStringValue(Object obj,Object value);
	}
	public String jsonString;
	/**
	 * 分页参数
	 * @param str
	 */
	private int start;
	private int limit;
	private String sort;
	private String dir;
	//其它自定义字段
	private List<String> otherFields;
	//定义嵌套对象属性
	private List<String> innerObjectFields;
	/**
	 * 使用转换器的先决条件为BaseAction为prototype
	 */
	//默认日期转换器
	private DateFormat dateFormat;//
	//默认整数转换器
	private NumberFormat intFormat;
	//默认小数转换器
	private NumberFormat doubleFormat;
	//为特定属性特别指定的日期转换器
	private Map<String,DateFormat> dateFormatMap;
	//为特定属性特别指定的整数转换器
	private Map<String,NumberFormat> intFormatMap;
	//为特定属性特别指定的小数转换器
	private Map<String,NumberFormat> doubleFormatMap;
	//为特定属性指定的转换器
	private Map<String,ObjectToString> fieldFormatMap;
	
	
	
	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	public String getDir() {
		return dir;
	}

	public void setDir(String dir) {
		this.dir = dir;
	}

	protected void addInnerObjectField(String fieldName){
		if(innerObjectFields==null){
			innerObjectFields = new ArrayList<String>();
		}
		this.innerObjectFields.add(fieldName);
	}
	protected void removeInnerObjectField(String fieldName){
		this.innerObjectFields.remove(fieldName);
	}

	public DateFormat getDateFormat() {
		return dateFormat;
	}

	public void setDateFormat(DateFormat dateFormat) {
		this.dateFormat = dateFormat;
	}

	public NumberFormat getIntFormat() {
		return intFormat;
	}

	public void setIntFormat(NumberFormat intFormat) {
		this.intFormat = intFormat;
	}

	public NumberFormat getDoubleFormat() {
		return doubleFormat;
	}

	public void setDoubleFormat(NumberFormat doubleFormat) {
		this.doubleFormat = doubleFormat;
	}

	public Map<String, DateFormat> getDateFormatMap() {
		return dateFormatMap;
	}

	public void setDateFormatMap(Map<String, DateFormat> dateFormatMap) {
		this.dateFormatMap = dateFormatMap;
	}

	public Map<String, NumberFormat> getIntFormatMap() {
		return intFormatMap;
	}

	public void setIntFormatMap(Map<String, NumberFormat> intFormatMap) {
		this.intFormatMap = intFormatMap;
	}

	public Map<String, NumberFormat> getDoubleFormatMap() {
		return doubleFormatMap;
	}

	public void setDoubleFormatMap(Map<String, NumberFormat> doubleFormatMap) {
		this.doubleFormatMap = doubleFormatMap;
	}


	/********************************************************************/
	protected Object getBean(String id) {
		WebApplicationContext ctx = WebApplicationContextUtils
				.getWebApplicationContext(getServletContext());
		return ctx.getBean(id);
	}

	public void outJsonString(String str) {
		getResponse().setContentType("text/javascript;charset=UTF-8");
		outString(str);
	}

	public void outJsonStringHtml(String str) {
		getResponse().setContentType("text/html;charset=UTF-8");
		outString(str);
	}

	public void outString(String str) {
		try {
			PrintWriter out = getResponse().getWriter();
			out.write(str);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public void outXMLString(String xmlStr) {
		getResponse().setContentType("application/xml;charset=UTF-8");
		outString(xmlStr);
	}

	public HttpServletRequest getRequest() {
		return ServletActionContext.getRequest();
	}

	public HttpServletResponse getResponse() {
		return ServletActionContext.getResponse();
	}

	public HttpSession getSession() {
		return getRequest().getSession();
	}

	public ServletContext getServletContext() {
		return ServletActionContext.getServletContext();
	}

	public String getRealyPath(String path) {
		return getServletContext().getRealPath(path);
	}

	@SuppressWarnings("unchecked")
	public Map<String, String> getParaMap() {
		Map<String, String> paramMap = null;
		try {
			LazyDynaBean ll = new LazyDynaBean();
			BeanUtils.populate(ll, getRequest().getParameterMap());
			paramMap = ll.getMap();
		} catch (Exception e) {
			e.printStackTrace();
		}
		;
		return paramMap;
	}

	public String jsonBackStrHelper(String inStr, String flag) {
		return "{success:" + flag + ",msg:'" + inStr.replace('\'', '\"') + "'}";
	}

	public String objToJSON(PageResult pgr, String param[]) {
		StringBuffer backStr = new StringBuffer();
		backStr.append("{rowCount:");
		List<Object[]> list = pgr.getData();
		if (pgr.getRowCount() == null)
			backStr.append(list.size());
		else
			backStr.append(pgr.getRowCount());
		backStr.append(",data:[");
		for (int i = 0; i < list.size(); i++) {
			Object result[] = (Object[]) list.get(i);
			if (i == 0)
				backStr.append("{");
			else
				backStr.append(",{");
			for (int j = 0; j < param.length; j++) {
				if (j > 0)
					backStr.append(",");
				backStr.append(param[j] + ":");
				backStr.append(result[j] == null ? "''" : "'"
						+ result[j].toString().trim().replaceAll(" ", "&nbsp;")
								.replaceAll("'", "&#039;")
								.replaceAll("<", "&lt;")
								.replaceAll(">", "&gt;")
								.replaceAll("\r\n", "</br>")
								.replaceAll("\n", "</br>") + "'");
			}
			backStr.append("}");
		}
		backStr.append("]}");
		return backStr.toString();
	}

	public String objListToJSON(List<Object[]> list, String param[]) {
		StringBuffer backStr = new StringBuffer();
		backStr.append("{rowCount:");
		backStr.append(list.size());
		backStr.append(",data:[");
		for (int i = 0; i < list.size(); i++) {
			Object result[] = list.get(i);
			if (i == 0)
				backStr.append("{");
			else
				backStr.append(",{");
			for (int j = 0; j < param.length; j++) {
				if (j > 0)
					backStr.append(",");
				backStr.append(param[j] + ":");
				backStr.append(result[j] == null ? "''" : "'"
						+ result[j].toString().trim().replaceAll(" ", "&nbsp;")
								.replaceAll("'", "&#039;")
								.replaceAll("<", "&lt;")
								.replaceAll(">", "&gt;")
								.replaceAll("\r\n", "</br>")
								.replaceAll("\n", "</br>") + "'");
			}
			backStr.append("}");
		}
		backStr.append("]}");
		return backStr.toString();
	}

	public String objToJSONByTrans(PageResult pgr, String param[]) {
		StringBuffer backStr = new StringBuffer();
		backStr.append("{rowCount:");
		List<Object[]> list = pgr.getData();
		if (pgr.getRowCount() == null)
			backStr.append(list.size());
		else
			backStr.append(pgr.getRowCount());
		backStr.append(",data:[");
		for (int i = 0; i < list.size(); i++) {
			Object result[] = (Object[]) list.get(i);
			if (i == 0)
				backStr.append("{");
			else
				backStr.append(",{");
			for (int j = 0; j < param.length; j++) {
				if (j > 0)
					backStr.append(",");
				backStr.append(param[j] + ":");
				backStr.append(result[j] == null ? "''" : "'"
						+ result[j].toString().trim().replaceAll("'", "\"")
						+ "'");
			}
			backStr.append("}");
		}
		backStr.append("]}");
		return backStr.toString();
	}
	
	protected String genJsonStringByPageResultDefault(PageResult pgr){
		if(pgr==null){
			throw new RuntimeException("数据不能为空!");
		}
		return genJsonStringByPageResult(pgr,"rowCount","data");
	}
	protected String genJsonStringByPageResult(PageResult pgr,String rowCountPre,String dataPre){
		if(pgr==null){
			throw new RuntimeException("数据不能为空!");
		}
		String result = "{"+rowCountPre+":"+pgr.getRowCount()+","+dataPre+":"+genJsonStringByList(pgr.getData())+"}";
		return CommonUtil.string2Json(result);
	}
	private String genJsonStringByList(List<?> valueList){
		StringBuilder result = new StringBuilder("[");
		int num = 0;
		for(Object obj:valueList){
			if(num>0){
				result.append(",");
			}
			result.append("{"+genJsonStringByObject(obj,false)+"}");
			num++;
		}
		result.append("]");
		return result.toString();
	}
	
	private String genJsonStringByObject(Object obj,boolean isInnerCall){
		if(obj instanceof List||obj instanceof Map||obj instanceof Object[]){
			throw new RuntimeException("类型错误！");
		}
		try{
			StringBuilder result = new StringBuilder("");
			Class<?> cls = obj.getClass();
			Field[] fields = cls.getDeclaredFields();
			int num = 0;
			for(Field field:fields){
				boolean accessible = field.isAccessible();
				field.setAccessible(true);
				if(num>0){
					result.append(",");
				}
				String fieldName = field.getName();
				Object value = field.get(obj);
				
				if(innerObjectFields!=null&&innerObjectFields.contains(fieldName)){
					result.append(genJsonStringByObject(value,true));
				}else{
					String strValue = getObjectStringValue(obj,value,fieldName);
					result.append(fieldName+":'"+strValue+"'");
				}
				num++;
				field.setAccessible(accessible);
			}
			if(this.otherFields!=null&&!isInnerCall){
				for(String fieldName:otherFields){
					if(num>0){
						result.append(",");
					}
					String strValue = this.getObjectStringValue(obj, null, fieldName);
					result.append(fieldName+":'"+strValue+"'");
				}
			}
			//result.append("}");
			return result.toString();
			
		}catch(Exception e){
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}
	private String getObjectStringValue(Object obj,Object value,String fieldName){
		//值有可能为空
		if(fieldFormatMap!=null){
			ObjectToString ots = fieldFormatMap.get(fieldName);
			if(ots!=null){
				return ots.getStringValue(obj,value);
			}
		}
		
		if(value==null){
			return "";
		}
		//字符串
		if(value instanceof String){
			return value.toString();
		}
		//日期
		else if(value instanceof java.util.Date || value instanceof java.sql.Date){
			DateFormat dateFormat = null;
			Map<String,DateFormat> dateFormatMap = this.getDateFormatMap();
			if(dateFormatMap!=null){
				dateFormat = dateFormatMap.get(fieldName);
			}
			if(dateFormat==null){
				dateFormat = this.getDateFormat();
			}
			if(dateFormat == null){
				throw new RuntimeException("无法转换日期类型！");
			}
			return dateFormat.format(value);
		}
		//整数类型
		else if(value instanceof Integer || value.getClass() == int.class || value instanceof BigInteger
				|| value instanceof Long || value.getClass() == long.class){
			Object intValue;
			if(value instanceof BigInteger){
				intValue = ((BigInteger)value).intValue();
			}else{
				intValue = value;
			}
			
			NumberFormat intFormat = null;
			Map<String,NumberFormat> intFormatMap = this.getIntFormatMap();
			if(intFormatMap!=null){
				intFormat = intFormatMap.get(fieldName);
			}
			if(intFormat==null){
				intFormat = this.getIntFormat();
			}
			if(intFormat==null){
				throw new RuntimeException("无法转换整形数字！");
			}
			
			return intFormat.format(intValue);
		}
		//小数类型
		else if(value instanceof Double ||value instanceof Float|| value.getClass() == double.class 
				|| value.getClass() == float.class || value instanceof BigDecimal){
			Object doubleValue;
			if(value instanceof BigDecimal){
				doubleValue = ((BigDecimal)value).doubleValue();
			}else {
				doubleValue = value;
			}
			
			NumberFormat doubleFormat = null;
			Map<String,NumberFormat> doubleFormatMap = this.getDoubleFormatMap();
			if(doubleFormatMap!=null){
				doubleFormat = doubleFormatMap.get(fieldName);
			}
			if(doubleFormat==null){
				doubleFormat = this.getDoubleFormat();
			}
			if(doubleFormat==null){
				throw new RuntimeException("无法转换小数数字！");
			}
			
			return doubleFormat.format(doubleValue);
		}
		throw new RuntimeException("无法处理的属性"+fieldName);
	}
	protected String genDataOnlyJsonStringByList(List<?> valueList){
		return genDataOnlyJsonStringByList(valueList,"data");
	}
	protected String genDataOnlyJsonStringByList(List<?> valueList,String dataPre){
		return CommonUtil.string2Json("{"+dataPre+":"+genJsonStringByList(valueList)+"}");
	}
	protected void addOtherField(String fieldName,ObjectToString ots){
		this.addOtherField(fieldName);
		this.addFieldFormat(fieldName, ots);
	}

	protected void addOtherField(String fieldName){
		if(fieldName==null||fieldName.trim().length()<=0){
			throw new RuntimeException("字段名不能为空！");
		}
		if(this.otherFields==null){
			this.otherFields = new ArrayList<String>();
		}
		otherFields.add(fieldName);
	}
	protected void addFieldFormat(String fieldName,ObjectToString ots){
		if(fieldFormatMap==null){
			fieldFormatMap = new HashMap<String,ObjectToString>();
		}
		fieldFormatMap.put(fieldName, ots);
	}
	
}