Ext.BLANK_IMAGE_URL = '/EChartsDemo/ext/resources/images/default/s.gif';
var clientWidth = document.body.clientWidth - 15;
var clientHeight = document.body.clientHeight;
//定义图表配置项全局名称
var barGraphOption;
//dom
var mainDom;
//图表对象
var barChart;

barGraphOption = {
	    title: {
	        text: '右击菜单事件',
	        x   : 'center',
	        subtext: '实验'
	    },
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'none'        // 默认为直线，可选为：'line' | 'shadow'|'none'
	        },
	         position : function(p) {
            // 位置回调
	        //获取鼠标点击的位置x，y
    	    x = p[0];
            y = p[1];
            },
	        formatter: function (params) {
	            var tar = params[0];
	            return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value+'<br/>'+'<a href="javascript:acctSplit();" target="_self">分配</a>';
	        }
	    },
	    toolbox: {
	        show : true,
	        feature : {
	            saveAsImage : {show: true}
	        }
	    },
	    xAxis : [
	        {
	            type : 'category',
	            splitLine: {show:false},
	            data : ['总费用','房租','水电费','交通费','伙食费','日用品数']
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series : [
	        {
	            name:'辅助',
	            type:'bar',
	            stack: '总量',
	            itemStyle:{
	                normal:{
	                    barBorderColor:'rgba(0,0,0,0)',
	                    color:'rgba(0,0,0,0)'
	                },
	                emphasis:{
	                    barBorderColor:'rgba(0,0,0,0)',
	                    color:'rgba(0,0,0,0)'
	                }
	            },
	            data:[0, 1700, 1400, 1200, 300, 0]
	        },
	        {
	            name:'生活费',
	            type:'bar',
	            stack: '总量',
	            itemStyle : { normal: {
		        	                label : {
		        	                  show: true,
		        	                  textStyle : {
				                            color: 'blue'
				                      },
		        	                  position: 'top'   //顶部显示值提示
		        	                }
	                          }
	                         },
	            data:[ 2900, 1200, 300, 200, 900, {
                    value: 300,
                    symbolSize : 10,   // 数据级个性化
                    itemStyle: {
                        normal: {
                            color :'lime'
                        }
                    }
                }]
	        }
	    ]
};
//右击菜单
document.body.oncontextmenu = function(){
	if (typeof(contextmenu) != "undefined") {
	    contextmenu.destroy();
    }
    contextmenu = new Ext.menu.Menu({
		items : [{
					text : '机构',
					id : 'orgHander',
					handler : function() {
			         alert("机构")
					}
				}, {
					text : '条线',
					id : 'lineHander',
					handler : function() {
					  alert("条线")
					}
				}]
	});
    contextmenu.showAt([event.clientX,event.clientY]);
return false
}

//初始化图表
function initChart(){
	require(
    [
        'echarts',
        'echarts/chart/bar'   //按需引入
    ],
	function (ec) {
    	
    	var ecConfig = require('echarts/config');
    	mainDom = document.getElementById('main')
		barChart = ec.init(mainDom);
		
		//显示后台获取数据时loading
		barChart.showLoading({text:'读取数据ing'});   
		barChart.setOption(barGraphOption);
		window.onresize = barChart.resize;
		//隐藏loading
		barChart.hideLoading();
	 }
 );
	
}

var Panel = new Ext.Panel({
		region			: 'center',
		width 			: clientWidth,
		height 			: clientHeight-10-27,
		html            : '<div id="main" style="height:80%;width:80%;border:0px solid #ccc;padding:0px;"></div>',
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
			Panel
		]
	});
	viewport.doLayout();
	
	initChart();
})
