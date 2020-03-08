Ext.BLANK_IMAGE_URL = '/EChartsDemo/ext/resources/images/default/s.gif';
var clientWidth = document.body.clientWidth - 15;
var clientHeight = document.body.clientHeight;
//dom
var mainDom;
//图表对象
var myChart;

var option = {
	title: {
	        text: '广西地图',
	        x   : 'center'
	    },
    tooltip : {
        trigger: 'item'
    },
    series : [
        {
            tooltip: {
                trigger: 'item',
                formatter: '{b}'
            },
            name: '广西',
            type: 'map',
            mapType: '广西',  //地图类型，如mapType: 'china'，表示中国地图。ctrl+f 输入关键字 mapType查找官方文档详细说明
	        itemStyle:{
	            normal:{label:{show:true}},
	            emphasis:{label:{show:false}}
	        },
	        mapLocation: {
	            x: '10%'
	        },
	        roam: false,  //是否可以移动地图
            data:[
                {name: '百色市',value: Math.round(Math.random()*1000)},
	            {name: '河池市',value: Math.round(Math.random()*1000)},
	            {name: '桂林市',value: Math.round(Math.random()*1000)},
	            {name: '南宁市',value: Math.round(Math.random()*1000)},
	            {name: '柳州市',value: Math.round(Math.random()*1000)},
	            {name: '崇左市',value: Math.round(Math.random()*1000)},
	            {name: '来宾市',value: Math.round(Math.random()*1000)},
	            {name: '玉林市',value: Math.round(Math.random()*1000)},
	            {name: '梧州市',value: Math.round(Math.random()*1000)},
	            {name: '贺州市',value: Math.round(Math.random()*1000)},
	            {name: '钦州市',value: Math.round(Math.random()*1000)},
	            {name: '贵港市',value: Math.round(Math.random()*1000)},
	            {name: '防城港市',value: Math.round(Math.random()*1000)},
	            {name: '北海市',value: Math.round(Math.random()*1000)}
            ]
            }],
     animation: true,
     //值域选择，每个图表最多仅有一个值域控件
     dataRange : {
    	    show  : false,  //是否显示
	        orient: 'horizontal',
	        x: 'right',
	        min: 0,
	        max: 1000,
	        color:['orange','yellow'],
	        text:['高','低'],           // 文本，默认为数值文本
	        splitNumber:0
	    }
};



//初始化图表
function initChart(){
	require(
    [
        'echarts',
        'echarts/chart/map'   //按需引入
    ],
	function (ec) {
    	var ecConfig = require('echarts/config');
    	mainDom = document.getElementById('left')
		myChart = ec.init(mainDom);
		//显示后台获取数据时loading
		myChart.showLoading({text:'读取数据ing'}); 
		myChart.setOption(option);
		window.onresize = myChart.resize;
		//隐藏loading
		myChart.hideLoading();
		//地图点击事件监听
		myChart.on(ecConfig.EVENT.CLICK,function(param){
			document.getElementById('right').innerHTML = '<img src=/EChartsDemo/echartsAction_doGetAtmMap.action?mapName='+encodeURI(encodeURI(param.name))+' onmousedown="javascript:doPrompt(this,event)">'
		});
	 }
 );
	
}

function  getleft(el){
	var offsetleft = el.offsetLeft;
	if(el.offsetParent!=null){
		offsetleft+=getleft(el.offsetParent);
	}
	return offsetleft
}
function getTop(el){
	var offsetTop = el.offsetTop;
	if(el.offsetParent!=null){
		offsetTop+=getTop(el.offsetParent);
	}
	return offsetTop
}

function doPrompt(img,event){
	var offsetleft = getleft(img);
	var offsetTop = getTop(img);
	
	var x = event.clientX-offsetleft;
	var y = event.clientY-offsetTop
    doCheckClickLocationAndGetDesc(event.clientX,event.clientY,x,y);
}
function doCheckClickLocationAndGetDesc(clickX,clickY,x,y){
	
	Ext.Ajax.request({
		waitTitle 	: '请稍候',
		waitMsg 	: '正在保存......',
		url			: '/EChartsDemo/echartsAction_doCheckAtmMapLocationAndGetDesc.action',
		method	    : 'POST',
		params		:{
			positionX	 :x,
			positionY	 :y
		},
		success		:function(response) {
			var desc = response.responseText;
			
			if(desc=="")return;
			var contextmenu = new Ext.menu.Menu({
			items : [{
						text : "xx银行atm提款机"+desc
					}]
		});
	    contextmenu.showAt([clickX,clickY]);
		},
		failure 	: function(form, action) {
		},
		scope 		: this	
	});
}
var leftPanel = new Ext.Panel({
		region			: 'west',
		width 			: clientWidth/2,
		height 			: clientHeight-100,
		html            : '<div id="left" style="height:100%;width:100%;border:0px solid #ccc;padding:0px;"></div>',
		style 			: 'padding:10px;',
		bodyStyle		: 'padding:30px;border-color:#96aec6;border-bottom-color:#829ab4'
	});
var rightPanel = new Ext.Panel({
		region			: 'center',
		width 			: clientWidth/2,
		height 			: clientHeight-100,
		html            : '<div id="right"><img src=/EChartsDemo/demo/map.png></div>',
		loadMask 		: true,
		style 			: 'padding:10px;',
		bodyStyle		: 'padding:30px;border-color:#96aec6;border-bottom-color:#829ab4'
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
			leftPanel,rightPanel
		]
	});
	viewport.doLayout();
	initChart();
})
