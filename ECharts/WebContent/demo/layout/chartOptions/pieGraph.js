//定义图表配置项全局名称
var pieGraphOption;
pieGraphOption = {
	  title : {
        text: '某站点用户访问来源',
        subtext: '纯属虚构',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        position : function(p) {
        // 位置回调
        //获取鼠标点击的位置x，y
		    x = p[0]+800;
	        y = p[1]+400;
        }
    },
    //点击图例可以动态显示饼图的值，取消时图例变暗。
    legend: {
        orient : 'vertical',
        x : 'left',
        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    calculable : true,
    series : [
        {
            name:'访问来源',
            type:'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'直接访问'},   //其中name的值必须与配置项legend的data的值一样，否则本项初始化为无效状态（即点击图例不起作用）
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ]
        }
    ]
};