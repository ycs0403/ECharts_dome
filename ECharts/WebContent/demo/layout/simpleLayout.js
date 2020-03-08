var clientWidth = document.body.clientWidth - 15;
var clientHeight = document.body.clientHeight;

//初始化图表
function initEchar(){
	require(
    [
        'echarts',
        'echarts/chart/bar',
        'echarts/chart/line',
        'echarts/chart/pie'
    ],
	function (ec) {
    	var firstChart;
    	var secondChart;
    	var thirdChart ;
    	var fourthChart; //fourthChart
    	
		firstChart = ec.init(document.getElementById('leftUp'));
		firstChart.setOption(barGraphOption);
		//设置图表随浏览器窗口大小变化
        window.onresize = firstChart.resize;
		
		secondChart = ec.init(document.getElementById('righUp'));
		secondChart.setOption(lineGraphOption);
		//设置图表随浏览器窗口大小变化
        window.onresize = secondChart.resize;
	
		thirdChart = ec.init(document.getElementById('leftDown'));
		thirdChart.setOption(bar1GraphOption);
		//设置图表随浏览器窗口大小变化
        window.onresize = thirdChart.resize;
		
		
		fourthChart = ec.init(document.getElementById('righDown'));
		fourthChart.setOption(pieGraphOption);
		//设置图表随浏览器窗口大小变化
        window.onresize = fourthChart.resize;
	 }
 );
	
}
/*
 * 存放图表
 * <div id="leftUp" style="height:100%;width:100%;border:0px solid #ccc;padding:0px;"></div>
 * 其中id为leftUp表示左上角，其他同理
 */
var mainPanel = new Ext.FormPanel({
		region			: 'center',
		width 			: clientWidth,
		height 			: clientHeight-10,
		loadMask 		: true,
		style 			: 'padding:10px;',
		bodyStyle		: 'padding:10px;border-color:#96aec6;border-bottom-color:#829ab4',
		items           : [{
			layout : 'column',
			items : [{
				columnWidth : .5,
				layout      : 'form',
				items : [
					      new Ext.Panel({
							height 			: (clientHeight-10)/2,
							html            : '<div id="leftUp" style="height:100%;width:100%;border:0px solid #ccc;padding:0px;"></div>'
						   })
				]
		   },{
			    columnWidth : .5,
				layout      : 'form',
				items : [
					      new Ext.Panel({
							height 			: (clientHeight-10)/2,
							html            : '<div id="righUp" style="height:100%;width:100%;border:0px solid #ccc;padding:0px;"></div>'
						   })
				]
		   }]
		},{
			layout : 'column',
			items : [{
				columnWidth : .5,
				layout      : 'form',
				items : [
					      new Ext.Panel({
							height 			: (clientHeight-10)/2,
							html            : '<div id="leftDown" style="height:100%;width:100%;border:0px solid #ccc;padding:0px;"></div>'
						   })
				]
		   },{
			    columnWidth : .5,
				layout      : 'form',
				items : [
					      new Ext.Panel({
							height 			: (clientHeight-10)/2,
							html            : '<div id="righDown" style="height:100%;width:100%;border:0px solid #ccc;padding:0px;"></div>'
						   })
				]
		   }]
		}]
	});
Ext.onReady(function() {
	Ext.Ajax.timeout = 900000;// 超时为十五分钟，单位为毫秒，默认是30秒
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'side';
	// 结合拦截器共同拦截数据请求动作，已检查SESSION是否过期
	Ext.util.Observable.observeClass(Ext.data.Connection);
	Ext.data.Connection.on('requestcomplete', function(conn, resp,
					options) {
				if (resp && resp.getResponseHeader
						&& resp.getResponseHeader('__timeout'))
					window.location.href = __prime.constants.contentPath + '/noLogin.html';
			});
	// 检测每个请求返回状态，返回0时表示服务器关闭
	Ext.data.Connection.on('requestexception', function(conn, resp,
					options) {
				if (resp.status == 0)
					parent.Ext.Msg.alert('系统消息',
							'数据请求出错，应用服务器已关闭，请您联系系统管理员！');
			});
	//页面控件渲染
	var viewport = new Ext.Viewport({
		layout: 'border',
		items: [
			mainPanel
		]
	});
	viewport.doLayout();
	initEchar();
})
