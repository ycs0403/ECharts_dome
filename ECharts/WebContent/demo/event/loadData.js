Ext.BLANK_IMAGE_URL = '/EChartsDemo/ext/resources/images/default/s.gif';
var clientWidth = document.body.clientWidth - 15;
var clientHeight = document.body.clientHeight;
//定义柱状图表配置项全局名称
var barGraphOption;
//定义饼图表配置项全局名称
var pieGraphOption;
//bardom
var barDom;
//piedom
var pieDom;
//柱状图表对象
var barChart;
//饼图表对象
var pieChart;
//存放参数
var paraDatas;
//柱状图表配置项初始化
barGraphOption = {
    title : {
        text: 'xx银行存贷款量',
        subtext: '纯属虚构',
        x      : 'center'
    },
    tooltip : {
        trigger: 'axis',
        formatter: function (params,ticket,callback) {
    	    paraDatas = params;  //为了存储全局参数
            var res =  params[0].name;
            for (var i = 0, l = params.length; i < l; i++) {
                res += '<br/>' + params[i].seriesName + ' : ' + params[i].value;
            }
            setTimeout(function (){
                // 仅为了模拟异步回调
                callback(ticket, res);
            }, 1000)
            return 'loading';
       }
    },
    legend: {
        data:['存款','贷款'],
        y:'bottom'                  //置于底部
    },
    calculable : false,
    xAxis : [
        {
            type : 'category',
            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'存款',
            type:'bar',
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            //最大值和最小值显示
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},          
                    {type : 'min', name: '最小值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            }
        },
        {
            name:'贷款',
            type:'bar',
            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
            markPoint : {
                data : [
                    {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183, symbolSize:18},  //xAxis: 7, yAxis: 183 显示的坐标位置，symbolSize表示大小
                    {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name : '平均值'}
                ]
            }
        }
    ]
};
//饼图表配置项初始化
pieGraphOption = {
	  title : {
        text: '一级网点存贷占比',
        subtext: '纯属虚构',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        position : function(p) {
        }
    },
    //点击图例可以动态显示饼图的值，取消时图例变暗。
    legend: {
        orient : 'vertical',
        x : 'left',
        data:['异地分行','中心支行','县域支行','公司业务部','总行直属机构']
    },
    calculable : true,
    series : [
        {
            name:'存贷占比',
            type:'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:0, name:'异地分行'},   //其中name的值必须与配置项legend的data的值一样，否则本项初始化为无效状态（即点击图例不起作用）
                {value:0, name:'中心支行'},
                {value:0, name:'县域支行'},
                {value:0, name:'公司业务部'},
                {value:0, name:'总行直属机构'}
            ]
        }
    ]
};
//右击菜单(火狐浏览器不可用)
function initMouseRightEvent(){
	document.getElementById("up").oncontextmenu = function(params){
		if (typeof(contextmenu) != "undefined") {
		    contextmenu.destroy();
	    }
	    contextmenu = new Ext.menu.Menu({
			items : [{
						text : '条线',
						id : 'lineHander',
						handler : function() {
				         getData()
						}
					}, {
						text : '分行',
						id : 'branchOrgHander',
						handler : function() {
						  alert("分行")
						}
					},{
						text : '支行',
						id : 'subOrgHander',
						handler : function() {
						  alert("支行")
						}
					},{
						text : '团队',
						id : 'teamHander',
						handler : function() {
						  alert("团队")
						}
					},{
						text : '客户经理',
						id : 'mngHander',
						handler : function() {
						  alert("客户经理")
						}
					}]
		});
	    contextmenu.showAt([event.clientX,event.clientY]);
	return false
	}
}
//模拟图表交互
function getData(){
	var selectedMonth = paraDatas[0].name;
	
	pieGraphOption.title.text = '一级网点'+selectedMonth+'存贷占比';
	pieGraphOption.series[0].data = [   {value:Math.random()*100, name:'异地分行'}, 
							            {value:Math.random()*100, name:'中心支行'},
							            {value:Math.random()*100, name:'县域支行'},
							            {value:Math.random()*100, name:'公司业务部'},
							            {value:Math.random()*100, name:'总行直属机构'}
							        ];
	pieChart.setOption(pieGraphOption);
    
}
//初始化图表
function initEChart(){
	require(
    [
        'echarts',
        'echarts/chart/bar',
        'echarts/chart/pie'
    ],
	function (ec) {
    	
    	var ecConfig = require('echarts/config');
    	barDom = document.getElementById('up');
    	pieDom = document.getElementById('down');
		barChart = ec.init(barDom);
		pieChart = ec.init(pieDom);
		
		//显示后台获取数据时loading
		barChart.showLoading({text:'读取数据ing'});   
		barChart.setOption(barGraphOption);
		pieChart.showLoading({text:'读取数据ing'});   
		pieChart.setOption(pieGraphOption);
		window.onresize = barChart.resize;
		window.onresize = pieChart.resize;
		//隐藏loading
		barChart.hideLoading();
		pieChart.hideLoading();
	 }
 );
	
}

var upPanel = new Ext.Panel({
		region			: 'north',
		width 			: clientWidth,
		height 			: clientHeight/2,
		html            : '<div id="up" style="height:100%;width:100%;border:0px solid #ccc;padding:0px;"></div>',
		loadMask 		: true,
		style 			: 'padding:5px;',
		bodyStyle		: 'padding:5px;border-color:#96aec6;border-bottom-color:#829ab4'
	});

var downPanel = new Ext.Panel({
		region			: 'center',
		width 			: clientWidth,
		height 			: clientHeight/2,
		html            : '<div id="down" style="height:100%;width:100%;border:0px solid #ccc;padding:0px;" ></div>',
		loadMask 		: true,
		style 			: 'padding:5px;',
		bodyStyle		: 'padding:5px;border-color:#96aec6;border-bottom-color:#829ab4'
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
		id : 'view',
		items: [
			upPanel,downPanel
		]
	});
	viewport.doLayout();
	initEChart();
	initMouseRightEvent();
})
