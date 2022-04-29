<template>
     <div>
       <!-- 面包屑导航 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>任务管理</el-breadcrumb-item>
             <el-breadcrumb-item>详情</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <div class="button_box">
                <el-button round class="el-icon-caret-left goback" @click="goBack">返回</el-button>
            </div>
            <el-divider></el-divider>
            <el-descriptions class="margin-top" title="" :column="3" border>
                <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user"></i>
                    学号
                </template>
                {{studentInfo.username}}
                </el-descriptions-item>
                <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user-solid"></i>
                    姓名
                </template>
                 {{studentInfo.name}}
                </el-descriptions-item>
                <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-office-building"></i>
                    学院
                </template>
                {{studentInfo.college}}
                </el-descriptions-item>
                <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-school"></i>
                    专业
                </template>
                {{studentInfo.major}}
                </el-descriptions-item>
                <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-office-building"></i>
                    类型
                </template>
                 <el-tag size="small">{{paperInfo.type}}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="">
                    <template slot="label">
                        <i class="el-icon-s-custom"></i>
                        指导老师
                    </template>
                     {{studentInfo.turtor}}
                </el-descriptions-item>
                </el-descriptions>
                <el-descriptions title=""  :column="4" border>
                    <el-descriptions-item label="论文内容">
                        <div v-html="paperInfo.content"></div>
                    </el-descriptions-item>
                </el-descriptions>
        </el-card>
    </div>
</template>
<script>
export default {
    data(){
        return{
            id:'',
            type:'',
            studentInfo:{},
            paperInfo:{}
        }
    },
    methods:{
        //获取用户详情信息
        async getStudentInfo(){
            const {data:res} = await this.$http.get('/findstudent',{params:{"id":this.id}});
               // console.log(res);
            if(res.status!=200){
                this.$message.console.error(res.msg);
            }
            if(res.status==200){
                this.studentInfo = res.data;
            }
        },
          //获取用户详情信息
        async getPaperInfo(){
           const pid = this.$route.query.id;  //论文id
            const {data:res} = await this.$http.get('/editpaper',{params:{"id":pid}});
              //  console.log(res);
            if(res.status!=200){
                this.$message.console.error(res.msg);
            }
            if(res.status==200){
                this.id = parseInt(res.data.sid);
                this.getStudentInfo();
                this.paperInfo = res.data;
            }
        },
        goBack(){
            this.$router.go(-1);
        }
    },
    created(){
        if(window.sessionStorage.getItem!=null){
            this.id = parseInt(window.sessionStorage.getItem("sid"));
        }
        this.getPaperInfo();
        //this.getStudentInfo();
     
    }
}
</script>

<style lang="less" scoped>
.button_box{
    width: 100%;
    height: 40px;
}
.goback{
   float: left;
}
</style>