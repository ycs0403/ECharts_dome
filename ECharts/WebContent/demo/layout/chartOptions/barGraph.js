//定义图表配置项全局名称
var barGraphOption;

barGraphOption = {
	    	    title: {
	        text: '月最低生活费组成（单位:元）',
	        x   : 'left',
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