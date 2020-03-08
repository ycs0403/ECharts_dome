/*!
 * Ext JS Library 3.2.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
 
/**** 
 * 通用处理
****/
//调用本地占位符图片，防止客户端在没有连接internet时从EXT官网下载图片而造成许多问题
Ext.BLANK_IMAGE_URL = '/EChartsDemo/ext/resources/images/default/s.gif';
var clientWidth = document.body.clientWidth - 15;
var clientHeight = document.body.clientHeight;

/**** 
 * 全局变量
****/

/**** 
 * 全局方法
****/
function doHref(value, metadata, record, rowIndex){
	return '<div style="cursor:hand"><a href="#" onclick="javascript:viewDetail(\''+record.get('url')+'\')">'+value+'</a></div>';
}
function viewDetail(url){
	var newWin = window.open(url,"_blank","fullscreen=no,height=" +
		(window.screen.availHeight)+",width=" +
		(window.screen.availWidth)+",top=0, left=0,toolbar=no, menubar=no, scrollbars=no, resizable=yes,location=no, status=no, maximize=true");
	newWin.focus();
}

/**** 
 * 各类控件
****/
var myData = [
        ['演示功能1','特点：右键菜单事件','demo/event/mouse.jsp'],
        ['演示功能2','特点：钻取','demo/event/loadData.jsp'],
        ['演示功能3','特点：布局','demo/layout/simpleLayout.jsp'],
        ['演示功能4','特点：树形层级关系','demo/levelTreeView/levelTreeDemo/levelTreeDemo.jsp'],
        ['演示功能5','特点：点击城市地图加载该市xx银行atm位置','demo/map/chinaMap.jsp']
];        

var store = new Ext.data.ArrayStore({
	fields 	: ['name','description','url']
});   

store.loadData(myData);
var cols = [
	new Ext.grid.RowNumberer({
		renderer : function(value, metadata, record, rowIndex) {
			return rowIndex + 1;
		}
	}),
	{header: "演示功能", dataIndex: 'name', renderer:doHref},
	{header: "功能介绍", dataIndex: 'description'}	
];
    
var grid = new Ext.grid.GridPanel({
	el 				: 'grid',
	id				: 'grid',
	store 			: store,
	columns 		: cols,
	width			: 700,
	height			: 500,
	stripeRows 		: true,
	loadMask 		: true,
	bodyStyle		: 'border-color:#96aec6;border-bottom-color:#829ab4',
	viewConfig	: {
		forceFit : true 	
	},
	selModel 	: new Ext.grid.RowSelectionModel({
					singleSelect : true
				  })
});

/**** 
 * 主函数
****/
Ext.onReady(function(){
 	Ext.Ajax.timeout=900000;//超时为十五分钟，单位为毫秒，默认是30秒  
	//鼠标提示
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'side';
	
	//结合拦截器共同拦截数据请求动作，已检查SESSION是否过期
	Ext.util.Observable.observeClass(Ext.data.Connection);
	Ext.data.Connection.on('requestcomplete', function(conn, resp, options){
			if(resp && resp.getResponseHeader && resp.getResponseHeader('__timeout'))
				window.location.href = '../../noLogin.html';
		}
	);
	//检测每个请求返回状态，返回0时表示服务器关闭
	Ext.data.Connection.on('requestexception', function(conn, resp, options){
			if(resp.status == 0)
				parent.Ext.Msg.alert('系统消息', '数据请求出错，应用服务器已关闭，请您联系系统管理员！');
		}
	);
	
	grid.render();
	
});