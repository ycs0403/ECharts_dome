package com.Echarts.util;

public class CommonUtil {
	public static StringBuffer getOrgFilterSql(StringBuffer sb,String orgLvl,String orgId){
		sb.append(" a.org_id in (select t4.lvl4_id from v_dim_meta_org_lvl4 t4 where  t4.lvl"+orgLvl+"_id = '"+orgId+"'");
		if(Integer.parseInt(orgLvl)<4){
			sb.append(" union select t3.lvl3_id from v_dim_meta_org_lvl4 t3 where  t3.lvl"+orgLvl+"_id = '"+orgId+"'");
		}
		if(Integer.parseInt(orgLvl)<3){
			sb.append(" union select t2.lvl2_id from v_dim_meta_org_lvl4 t2 where  t2.lvl"+orgLvl+"_id = '"+orgId+"'");
		}
		if(Integer.parseInt(orgLvl)<2){
			sb.append(" union select t1.lvl1_id from v_dim_meta_org_lvl4 t1 where  t1.lvl"+orgLvl+"_id = '"+orgId+"'");
		}
		sb.append(")");
		return sb;
	}
	
	public static String getOrgLvlFilterSql(String orgId){
		return "select v.NODE_LVL from ma_meta_tree v where v.tree_id = '300097' and v.node_id = '"+orgId+"'";
	}
	/**
	 * 处理特殊的Json字符
	 * @param s
	 * @return
	 */
	public static String string2Json(String s) {       
        StringBuffer sb = new StringBuffer ();       
        for (int i=0; i<s.length(); i++) {       
  
            char c = s.charAt(i);       
            switch (c) {       
                case '\"':       
                    sb.append("\\\"");       
                    break;       
                case '\\':       
                    sb.append("\\\\");       
                    break;       
                case '/':       
                    sb.append("\\/");       
                    break;       
                case '\b':       
                    sb.append("\\b");       
                    break;       
                case '\f':       
                    sb.append("\\f");       
                    break;       
                case '\n':       
                    sb.append("\\n");       
                    break;       
                case '\r':       
                    sb.append("\\r");       
                    break;       
                case '\t':       
                    sb.append("\\t");       
                    break;       
                default:       
                    sb.append(c);       
            }  
       }  
       return sb.toString();       
    }
}
