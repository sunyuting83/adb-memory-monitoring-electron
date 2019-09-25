import React, { Component } from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legendScroll';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/dataZoom';

let myChart;

let getkb = (value, tow) => {
    if (value === 0) return '0 K';
    var k = 1024, // or 1024
        sizes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(value) / Math.log(k));
    let vl = (value / Math.pow(k, i)).toPrecision(parseInt(tow)) + sizes[i];
    // console.log(vl);
    return vl;
}

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            memorys:[],
            timeline: []
        };
    }

    static getDerivedStateFromProps(props, state) {
        // console.log(props.memorys);
        if (props.memorys !== state.memorys) {
            return {
                memorys: props.memorys
            }
        }
        return null; 
    }
    componentDidUpdate() {
        const { memorys } = this.state;
        let timeline = [],
            Native = [],
            Java = [],
            Stack = [],
            Code = [],
            Graphics = [],
            Other = [],
            System = [],
            Total = [];
        memorys.forEach(Last => {
            timeline = [...timeline, Last.Uptime];
            Native = [...Native, Last.Native];
            Java = [...Java, Last.Java];
            Stack = [...Stack, Last.Stack];
            Code = [...Code, Last.Code];
            Graphics = [...Graphics, Last.Graphics];
            Other = [...Other, Last.Other];
            System = [...System, Last.System];
            Total = [...Total, Last.Total];
        });
        myChart.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                },
                formatter: function (value) {
                    // console.log(value);
                    let iconColor = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f82', '#ca8622','#bda29a'];
                    var relVal = `${value[0].name}<br/>`;
                    value.forEach((item,i) => {
                        relVal += `<div style="text-align:left"><span style="display:inline-block;width:0.25rem;height:0.25rem;border-radius:50%;margin-right:0.13rem;background: ${iconColor[i]}"></span>${item.seriesName}:${getkb(item.value, 4)}</div>`
                    });
                    return relVal;
                }
            },
            legend: {
                textStyle: {
                    color: '#FFF'
                },
                data: ['Native', 'Java', 'Stack', 'Code', 'Graphics', 'Other', 'System', 'Total']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: timeline,
                    axisLine: {
                        lineStyle:{
                            color: '#FFF'
                        }
                    }
                }
            ],
            yAxis: [
                {
                    boundaryGap: [0, '100%'],
                    type: 'value',
                    axisLine:{
                        lineStyle: {
                            color: '#FFF'
                        }
                    },
                    axisLabel: {
                        formatter: function (value) {
                            return getkb(value, 3);
                        }
                    }
                }
            ],
            dataZoom: [{
                type: 'slider',//图表下方的伸缩条
                show : true, //是否显示
                realtime : true, //拖动时，是否实时更新系列的视图
                start : 0, //伸缩条开始位置（1-100），可以随时更改
                end : 100, //伸缩条结束位置（1-100），可以随时更改
        　　 }],
            series: [
                {
                    name: 'Native',
                    type: 'line',
                    stack: '总量',
                    smooth:true,
                    symbol:'none',
                    areaStyle: {},
                    data: Native  
                },
                {
                    name: 'Java',
                    type: 'line',
                    stack: '总量',
                    smooth: true,
                    symbol: 'none',
                    areaStyle: {},
                    data: Java
                },
                {
                    name: 'Stack',
                    type: 'line',
                    stack: '总量',
                    smooth: true,
                    symbol: 'none',
                    areaStyle: {},
                    data: Stack
                },
                {
                    name: 'Code',
                    type: 'line',
                    stack: '总量',
                    smooth: true,
                    symbol: 'none',
                    areaStyle: { normal: {} },
                    data: Code
                },
                {
                    name: 'Graphics',
                    type: 'line',
                    stack: '总量',
                    smooth: true,
                    symbol: 'none',
                    areaStyle: { normal: {} },
                    data: Graphics
                },
                {
                    name: 'Other',
                    type: 'line',
                    stack: '总量',
                    smooth: true,
                    symbol: 'none',
                    areaStyle: { normal: {} },
                    data: Other
                },
                {
                    name: 'System',
                    type: 'line',
                    stack: '总量',
                    smooth: true,
                    symbol: 'none',
                    areaStyle: { normal: {} },
                    data: System
                },
                {
                    name: 'Total',
                    type: 'line',
                    stack: '总量',
                    smooth: true,
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            label: {
                                formatter: function (params) { 
                                    return getkb(params.value, 4)
                                }
                            }
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: 'white'
                            }
                        }
                    },
                    areaStyle: { normal: {} },
                    data: Total
                }
            ]
        });
    }

    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        myChart = echarts.init(document.getElementById('main'));
    }


    render() {
        return(
            <div id="main" style={{ width: '100%', height: '13rem' }}></div>
        )
    }
}

export default Chart;
