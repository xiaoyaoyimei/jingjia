// JavaScript Document
    // 路径配置
           require.config({
            paths:{ 
                'echarts' : 'js/vender/echarts',
                'echarts/chart/pie' : 'js/vender/echarts'
            }
        }); 
          
         // 使用  
        require(  
            [  
                'echarts',  
                'echarts/chart/pie' 
            ],  
            function (ec) {  
                // 基于准备好的dom，初始化echarts图表  
                    var myChart = ec.init(document.getElementById("overallcompletion"));   
					 var myChartfg = ec.init(document.getElementById("fgstreet"));   
                  
               option = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data:['未完成人数','实际人数']
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:335, name:'未完成人数'},
                {value:310, name:'实际人数'}
            
            ]
        }
    ]
};
           optionfg = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data:['90分以上','80-90分','70-80','70分以下']
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:200, name:'90分以上'},
                {value:200, name:'80-90分'},
				      {value:300, name:'70-80'},
                {value:300, name:'70分以下'}
            
            ]
        }
    ]
}; 
    myChart.setOption(option);   
                // 为echarts对象加载数据   
                myChartfg.setOption(optionfg);   
            }  
        );  