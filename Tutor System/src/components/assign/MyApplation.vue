<template>
    <div>
        <!-- 面包屑导航 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>双选管理</el-breadcrumb-item>
            <el-breadcrumb-item>我的申请</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区域 -->
        <el-card class="box-card">
            <div style="text-align: left; ">
                <el-tag effect="dark" type="info"  style="font-size:15px; margin:24px;margin-bottom:20px; line-height:0px;">
                    <h2>我的申请记录</h2>
                </el-tag>
            </div>
            <div class="block">
              <el-timeline>
                <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :icon="activity.icon"
                :type="activity.type"
                :color="activity.color"
                :size="activity.size"
                :timestamp="activity.timestamp">
                {{activity.content}}
                </el-timeline-item>
            </el-timeline>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return{
            sid:'',
            activities: [{
                    content: '无',
                    timestamp: '2018-04-12 20:46',
                    size: 'large',
                    type: '',
                    }, {
                    content: '无',
                    timestamp: '2018-04-03 20:46',
                    size: 'large',
                    type: '',
                    }, {
                    content: '无',
                    timestamp: '2018-04-03 20:46',
                    size: 'large',
                    type: '',
                    }]
        }
    },
    methods:{
               //修改时间格式
        GETdate(data){
          if (data ===null) {
              return ''
          }
          let dt = new Date(data)
          // console.log("dt"+dt);
              return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
               // + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
        },
        async getRecordList(){
            this.sid = parseInt(window.sessionStorage.getItem("sid"));
            //发送请求获取数据
           const {data:res} = await this.$http.get('/sidrecord',{params:{"sid":this.sid}});
           console.log(res);
           if(res.status!=200){
                return this.$message.error(res.msg)
            }else if(res.status==200){
                //let dt = new Date(data)
                this.activities[0].content = "向"+res.data.tname+"发出申请";
                this.activities[0].timestamp = this.GETdate(res.data.create_time);
                this.activities[0].type = "primary"
                this.activities[1].content = res.data.tname+"正在审核";
                this.activities[1].timestamp = this.activities[0].timestamp;
                this.activities[1].type = "primary"
                if(res.data.is_agree==true){
                    this.activities[2].content = "申请通过";
                    this.activities[2].timestamp =this.GETdate(res.data.update_time);
                    this.activities[2].type = "success"
                }else if(res.data.is_agree==false){
                     this.activities[2].content = "未通过申请";
                    this.activities[2].timestamp = this.GETdate(res.data.update_time);
                    this.activities[2].type = "danger"
                }else{
                     this.activities[2].content = "正在审核";
                    this.activities[2].timestamp = "";
                    this.activities[2].type = ""
                }
            }
        },
    },
    created(){
        this.getRecordList();
    }
    
}
</script>

<style lang="less" scoped>
.block{
    width: 300px;
}
.el-pagination{
    margin: 20px 0;
}
.el-dialog__wrapper{
    width: 50%;
    margin: 0 auto;
}
img{
  width: 200px;
  height: 150px;
  padding: 0 10px;
}
</style>