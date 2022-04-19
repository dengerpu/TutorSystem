<template>
        <div>
        <!-- 面包屑导航 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>成长管理</el-breadcrumb-item>
            <el-breadcrumb-item>计划详情</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <el-page-header @back="goBack" :content="content">
            </el-page-header>
             <el-divider></el-divider>
            <div style="display:flex;">
    <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
                <div id="main" style="width: 800px;height:600px;"></div>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
  created(){
        this.tid = parseInt(window.sessionStorage.getItem("tid"));
        this.getStudentInfo();
        this.getPlanInfo();
        
  },
  mounted(){
    
  },
  data(){
      return {
        planInfo:{},
        studentInfo:{},
        data:[],
        dataStr:[],
        content:'学习路线',
        option: {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c}%'
            },
            toolbox: {
                feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {}
                }
            },
            legend: {
                data: ['Show', 'Click', 'Visit', 'Inquiry', 'Order']
            },
            series: [
                {
                name: 'Funnel',
                type: 'funnel',
                left: '20%',
                top: 80,
                bottom: 60,
                width: '80%',
                min: 0,
                max: 100,
                minSize: '0%',
                maxSize: '100%',
                sort: 'descending',
                gap: 2,
                label: {
                    show: true,
                    position: 'inside'
                },
                labelLine: {
                    length: 10,
                    lineStyle: {
                    width: 1,
                    type: 'solid'
                    }
                },
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 1
                },
                emphasis: {
                    label: {
                    fontSize: 20
                    }
                },
                data: [
                    { value: 60, name: 'Visit' },
                    { value: 40, name: 'Inquiry' },
                    { value: 20, name: 'Order' },
                    { value: 80, name: 'Click' },
                    { value: 100, name: 'Show' }
                ]
                //data:this.data
                }
            ]
            }
      }
        
  },
    methods:{
            //获取用户详情信息
        async getStudentInfo(){
            const id = this.$route.query.id;  //学生id
            const {data:res} = await this.$http.get('/findstudent',{params:{"id":id}});
               // console.log(res);
            if(res.status!=200){
                this.$message.console.error(res.msg);
            }
            if(res.status==200){
                this.studentInfo = res.data;
            }
        },
          //获取用户详情信息
        async getPlanInfo(){
           const sid = this.$route.query.id;  //学生id
            const {data:res} = await this.$http.get('/sidplan',{params:{"sid":sid}});
            if(res.status!=200){
                this.$message.console.error(res.msg);
            }
            if(res.status==200){
                this.planInfo = res.data; 
                this.dataStr = res.data.plan.split('/');
                for(let i=0;i<this.dataStr.length;i++){
                    this.data.push({
                        value:(i+1)*10,
                        name:this.dataStr[i]
                    })
                }
                //console.log(this.option)
                 var mychartDom = this.$echarts.init(document.getElementById('main'));
                 this.option.legend.data = this.dataStr;
                 this.option.series[0].data = this.data;
                 this.content = this.studentInfo.name+":"+res.data.direction+"学习路线";
                 mychartDom.setOption(this.option);
                //console.log(this.data)
            }
        },
        goBack(){
            this.$router.go(-1);
        },
    }
}
</script>

<style lang="less" scoped>


</style>