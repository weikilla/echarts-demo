// 基于准备好的dom，初始化echarts实例
thresholdMap = { "ANR": "0.6", "Crash率": 0.06, "卡顿": 6 }
currentTargetLine = 0
whichTarget = ''
var myChart = echarts.init(document.getElementById('main'), null, { renderer: 'svg' });
var appName = "美柚";
var date = ["2020-01-06", "2020-01-07", "2020-01-08", "2020-01-09", "2020-01-10", "2020-01-11", "2020-01-12"];
var anr = ["0.58", "0.59", "0.64", "0.73", "0.77", "0.77", "0.78"];
var crash = ["0.05", "0.06", "0.04", "0.07", "0.10", "0.09", "0.09"];
var lagging = ["6.19", "5.83", "5.95", "6.58", "6.33", "6.76", "6.38"];

var option = {
    title: {
        text: appName
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (datas) {
            var res = datas[0].name + '<br/>', val;
            for (var i = 0, length = datas.length; i < length; i++) {
                val = (datas[i].value) + '%';
                res += datas[i].seriesName + '：' + val + '<br/>';
            }
            return res;
        },

    },
    legend: {
        data: ['ANR', 'Crash率', '卡顿']
    },
    grid: {
        left: '6%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: true,
        data: date
    },
    dataZoom: [{
        type: 'inside',
        throttle: 50
    }],
    yAxis: {
        type: 'value',
        axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value} %',
        },
        triggerEvent: true,
        show: true,
        axisPointer: {
            //阈值
            value: 0,
            handle: {
                show: false,
                size: 20,
                margin: 60,
                color: '#DC143C',
                throttle: 100
            },
            snap: false,
            triggerTooltip: false,
            label: {
                show: true,
                formatter: function (params) {
                    var value = (Math.round(params.value * 1000) / 1000).toFixed(3);
                    currentTargetLine = value
                    return value;
                },

            },
        },
    },
    series: [
        {
            name: 'ANR',
            type: 'line',
            data: anr,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}%'
                    }
                }
            }
        },
        {
            name: 'Crash率',
            type: 'line',
            data: crash,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}%'
                    }
                }
            }
        },
        {
            name: '卡顿',
            type: 'line',
            data: lagging,
            markPoint: {
                symbol: 'circle',
                symbolSize: 10,
                label: {
                    show: true,
                    formatter: "!",
                    fontSize: 12
                },
                itemStyle: {
                    color: '#00CD68'
                },
            },
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}%'
                    }
                }
            }
        }]
};
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
myChart.on('legendselectchanged', function (params) {
    //判断select里是否只有一个true
    // selected: {ANR: true, Crash率: true, 卡顿: false}
    var selected = params.selected;
    let origin = []
    Object.keys(selected).forEach(function (item) {
        if (selected[item]) {
            origin.push(item);
        }
    });
    if (origin.length === 1) {
        //展示阈值参考线
        option.yAxis.axisPointer.handle.show = true;
        option.yAxis.axisPointer.value = thresholdMap[origin[0]]
        option.tooltip.triggerOn = 'none';
    } else {
        option.yAxis.axisPointer.handle.show = false;
        option.tooltip.triggerOn = 'mousemove|click';
    }
    myChart.setOption(option);

    window.addEventListener("resize", function () {
        myChart.resize();
    });
});
function mouseup() {
    //更改markpoint操作
    // 源和阈值
    console.log("阈值：" + currentTargetLine)
    var selected = option.legend.selected;
    console.log(selected)


}




