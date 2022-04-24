<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img :src="circleUrl" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name"> {{name}} </div>
                            <div> {{role}} </div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        上次登录时间：
                        <span>2022-04-22</span>
                    </div>
                    <div class="user-info-list">
                        上次登录地点：
                        <span>安阳</span>
                    </div>
                </el-card>
                <el-card shadow="hover" style="height:252px;">
                    <template #header>
                        <div class="clearfix">
                            <span>语言详情</span>
                        </div>
                    </template>
                    Vue
                    <el-progress :percentage="71.3" color="#42b983"></el-progress>JavaScript
                    <el-progress :percentage="24.1" color="#f1e05a"></el-progress>CSS
                    <el-progress :percentage="13.7"></el-progress>HTML
                    <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-user-solid grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{totalUser}}</div>
                                    <div>用户数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-message-solid grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{total}}</div>
                                    <div>通知消息</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-s-custom grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{totalStudent}}|{{totalTeacher}}</div>
                                    <div>学生|老师数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height:403px;">
                    <template #header>
                        <div class="clearfix">
                            <span>通知</span>
                            <el-button style="float: right; padding: 3px 0" type="text" @click="goToMore()">更多</el-button>
                        </div>
                    </template>

                    <el-table :show-header="false" :data="noticeList" style="width:100%;">
                        <el-table-column type="index" width="40">
                        </el-table-column>
                        <el-table-column>
                            <template #default="scope">
                                <div class="todo-item" :class="{
                                        'todo-item-del': scope.row.status,
                                    }">{{ scope.row.title }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template slot-scope="scope">
                               <el-link type="primary" @click="goToDetails(scope.row.id)">详情</el-link>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Schart from "vue-schart";
import { reactive } from "vue";
export default {
    name: "dashboard",
    components: { Schart },
    data(){
      return {
        noticeList:[],
        queryInfo:{
                query:'',
                pagenum:1,  //当前页数
                pagesize:5  //每页显示多少条数据
        },
        totalUser:0,
        totalStudent:0,
        totalTeacher:0,
        name:'',
        role:'',
        total:0,
        circleUrl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi.qqkou.com%2Fi%2F0a3305298991x2024211813b26.jpg&refer=http%3A%2F%2Fi.qqkou.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653006468&t=c1887dd493be8a7b4a0820c495cbd04e"
      }
    },
    methods: {
      //获取用户详情信息
        async getStudentInfo(){
            const sid = parseInt(window.sessionStorage.getItem("sid"));
            const {data:res} = await this.$http.get('/findstudent',{params:{"id":sid}});
               // console.log(res);
            if(res.status!=200){
                this.$message.console.error(res.msg);
            }
            if(res.status==200){
                this.studentInfo = res.data;
                this.name = res.data.name;
                this.circleUrl = res.data.image;
            }
        },
        async getTeacherInfo(){
            const tid = parseInt(window.sessionStorage.getItem("tid"));
            const {data:res} = await this.$http.get('/editteacher',{params:{"id":tid}});
               // console.log(res);
            if(res.status!=200){
                this.$message.console.error(res.msg);
            }
            if(res.status==200){
                this.teacherInfo = res.data;
                this.name = res.data.name;
                this.circleUrl = res.data.image;
            }
        },
        //获取总用户数量
         async getTotalUser(){
            const {data:res} = await this.$http.get('/findtotaluser');
               // console.log(res);
            if(res.status!=200){
                this.$message.console.error(res.msg);
            }
            if(res.status==200){
               this.totalUser = res.data;
            }
        },
        //获取学生数量
         async getTotalStudent(){
            const {data:res} = await this.$http.get('/findtotalstu');
               // console.log(res);
            if(res.status!=200){
                this.$message.console.error(res.msg);
            }
            if(res.status==200){
               this.totalStudent = res.data;
            }
        },
         //获取老师数量
         async getTotalTeacher(){
            const {data:res} = await this.$http.get('/findtotaltea');
               // console.log(res);
            if(res.status!=200){
                this.$message.console.error(res.msg);
            }
            if(res.status==200){
               this.totalTeacher = res.data;
            }
        },
         async getNoticeList(){
            //发送请求获取数据
            const {data:res} = await this.$http.get('/notices',{params:this.queryInfo});
            //console.log(res);
            if(res.status!=200){
                this.total = 0;
                return this.$message.error(res.msg)
            }else if(res.status==200){
                this.noticeList = res.data.list;
                this.total = res.data.totalCount;
            }
        },
        //访问更多
        goToMore(){
          this.$router.push({path:"/noticeall"});
        },
        goToDetails(id){
          this.$router.push({path:"/noticedetails",query:{id:id}});
        }
    },
    created(){
      this.name = window.sessionStorage.getItem("username");
      const type = window.sessionStorage.getItem("type");
      if(type=='admin'){
        this.role = "管理员"
      }else if(type=='student'){
        this.role = "学生"
        this.getStudentInfo();
      }else if(type=='teacher'){
        this.role = "老师"
        this.getTeacherInfo();
      }
      this.getNoticeList();  
      this.getTotalUser();
      this.getTotalTeacher();
      this.getTotalStudent();
    }
};
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
