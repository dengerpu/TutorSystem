<template>
    <div>
        <!-- 面包屑导航 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>学习管理</el-breadcrumb-item>
            <el-breadcrumb-item>成绩分析报告</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <div style="display:flex;">
    <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
                <div id="main" style="width: 600px;height:400px;"></div>
                <div id="main1" style="width: 600px;height:400px;"></div>
            </div>
        </el-card>
    </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    data(){
        return{
        }
    },
    mounted(){
        this.getZHU();
        this.getBING();
            },
    methods:{
        //柱状图
        getZHU(){
            var chartDom = document.getElementById('main');
            var myChart = echarts.init(chartDom);
            var option;
            option = {
            dataset: {
                source: [
                ['score', 'amount', 'product'],
                [60, 60, '计算机组成原理'],
                [30, 30, 'XML技术'],
                [100, 100, '数据结构'],
                [96, 96, '古希腊文明'],
                [86, 86, '计算机网络原理'],
                [90.3, 90.3, '操作系统'],
                [50, 50, '体育(IV)'],
                [87, 87, '工程数学(二)'],
                [71, 71, '大学英语(IV)']
                ]
            },
            grid: { containLabel: true },
            xAxis: { name: '成绩' },
            yAxis: { type: 'category' },
            visualMap: {
                orient: 'horizontal',
                left: 'center',
                min: 50,
                max: 100,
                text: ['高', '低'],
                // Map the score column to color
                dimension: 0,
                inRange: {
                color: ['#65B581', '#409eff','#FFCE34', '#409eff','#FD665F']
                }
            },
            series: [
                {
                type: 'bar',
                encode: {
                    // Map the "amount" column to X axis.
                    x: 'amount',
                    // Map the "product" column to Y axis
                    y: 'product'
                }
                }
            ]
            };

            option && myChart.setOption(option);
        },
        getBING(){
            var chartDom = document.getElementById('main1');
            var myChart = echarts.init(chartDom);
            var option;

            option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [
                {
                name: '课程',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                    show: true,
                    fontSize: '40',
                    fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: '必修课' },
                    { value: 735, name: '专业课' },
                    { value: 580, name: '选修课' },
                    { value: 484, name: '专业拓展' },
                    { value: 300, name: '专业方向' }
                ]
                }
            ]
            };

            option && myChart.setOption(option);
        }
    },
    
}

</script>

<style lang="less" scoped>

</style>