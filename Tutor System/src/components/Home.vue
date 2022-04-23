<template>
    <el-container>
        
        <!-- 头部区域 -->
        <el-header>
            <div>
                <img class="imgBox" src="../assets/img/logo.png" alt="">
                <span>导师制下的学生成长管理系统</span>
            </div>
            <div class="block"><el-avatar class="imgBox" :size="50" :src="circleUrl"></el-avatar>
                <el-button type="info" @click="logout">退出</el-button>
            </div>   
        </el-header>
        <!-- 页面主题区域 -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse ?'64px' :'200px'">
                <div class="toggle-button" @click="menuToggle">|||</div>
                <el-menu class="el-menu-vertical-demo" background-color="#292B3A" text-color="#fff" active-text-color="#409eff" 
                :unique-opened="false" :collapse="isCollapse" :collapse-transition="false" :router="true" :default-active="activePath">
                    <!-- 一级菜单 -->
                    <el-submenu index="0">
                        <!-- 一级菜单模板 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i class="el-icon-s-home"></i>
                            <!-- 文字 -->
                            <span>首页</span>
                        </template>
                         <!-- 二级菜单 -->
                        <el-menu-item index="/psersoncenter" v-if="type!='admin'" @click="saveNavState('/psersoncenter')">
                            <template slot="title">
                                <i class="el-icon-info"></i>
                                <span>个人中心</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/securitycenter" @click="saveNavState('/securitycenter')">
                            <template slot="title">
                                <i class="el-icon-warning"></i>
                                <span>安全中心</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                    <!-- 一级菜单 -->
                    <el-submenu index="1" v-if="type=='admin'">
                        <!-- 一级菜单模板 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i class="iconfont icon-user"></i>
                            <!-- 文字 -->
                            <span>用户管理</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item index="/users" v-if="type=='admin'" @click="saveNavState('/users')">
                            <template slot="title">
                                <i class="el-icon-notebook-2"></i>
                                <span>用户列表</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/teachers"  v-if="type=='admin'" @click="saveNavState('/teachers')">
                            <template slot="title">
                                <i class="el-icon-user-solid"></i>
                                <span>教师列表</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/students"  v-if="type=='admin'" @click="saveNavState('/students')">
                            <template slot="title">
                                <i class="el-icon-user"></i>
                                <span>学生列表</span>
                            </template>
                        </el-menu-item>

                    </el-submenu>
                    <!-- 一级菜单 -->
                    <el-submenu index="2">
                        <!-- 一级菜单模板 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i class="el-icon-s-help"></i>
                            <!-- 文字 -->
                            <span>双选管理</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item index="/choice"  v-if="type=='admin'" @click="saveNavState('/choice')">
                            <template slot="title">
                                <i class="el-icon-thumb"></i>
                                <span>分配管理</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/applayrecord" v-if="type=='teacher'"   @click="saveNavState('/applayrecord')">
                            <template slot="title">
                                <i class="el-icon-notebook-2"></i>
                                <span>申请记录</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/myapplation" v-if="type=='student'"  @click="saveNavState('/myapplation')">
                            <template slot="title">
                                <i class="el-icon-notebook-2"></i>
                                <span>我的申请</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/tutorchoice" v-if="type=='teacher'"   @click="saveNavState('/tutorchoice')">
                            <template slot="title">
                                <i class="el-icon-price-tag"></i>
                                <span>选择学生</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/studentchoice" v-if="type=='student'" @click="saveNavState('/studentchoice')">
                            <template slot="title">
                                <i class="el-icon-discount"></i>
                                <span>选择老师</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                                        <!-- 一级菜单 -->
                    <el-submenu index="3">
                        <!-- 一级菜单模板 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i class="el-icon-s-management"></i>
                            <!-- 文字 -->
                            <span>学习管理</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item index="/publishpaper" v-if="type=='student'" @click="saveNavState('/publishpaper')">
                            <template slot="title">
                                <i class="el-icon-document-add"></i>
                                <span>提交论文</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/paper" v-if="type=='student'" @click="saveNavState('/paper')">
                            <template slot="title">
                                <i class="el-icon-document"></i>
                                <span>我的提交</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/timetable" @click="saveNavState('/timetable')">
                            <template slot="title">
                                <i class="el-icon-date"></i>
                                <span>查看课表</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/panalysis" @click="saveNavState('/panalysis')">
                            <template slot="title">
                                <i class="el-icon-data-analysis"></i>
                                <span>成绩分析</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                                        <!-- 一级菜单 -->
                    <el-submenu index="4">
                        <!-- 一级菜单模板 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i class="el-icon-message-solid"></i>
                            <!-- 文字 -->
                            <span>通知管理</span>
                        </template>
                       <el-menu-item index="/notice" v-if="type!='student'" @click="saveNavState('/notice')">
                            <template slot="title">
                                <i class="el-icon-document-add"></i>
                                <span>发布会议</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/publish"  v-if="type!='student'" @click="saveNavState('/publish')">
                            <template slot="title">
                                <i class="el-icon-edit-outline"></i>
                                <span>发布通知</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/noticeall" @click="saveNavState('/noticeall')">
                                <template slot="title">
                                    <i class="el-icon-document-copy"></i>
                                    <span>查看通知</span>
                                </template>
                        </el-menu-item>
                    </el-submenu>

                       <el-submenu index="5">
                        <!-- 一级菜单模板 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i class="el-icon-s-marketing"></i>
                            <!-- 文字 -->
                            <span>成长管理</span>
                        </template>
                         <el-menu-item index="/mystudent" v-if="type=='teacher'" @click="saveNavState('/mystudent')">
                            <template slot="title">
                                <i class="el-icon-connection"></i>
                                <span>我的学生</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/myplan" v-if="type=='student'" @click="saveNavState('/myplan')">
                                <template slot="title">
                                    <i class="el-icon-data-line"></i>
                                    <span>查看计划</span>
                                </template>
                        </el-menu-item>
                    </el-submenu>
                
                </el-menu>
            </el-aside>
            <!-- 内容区域 -->
            <el-main>
                <!-- 路由占位符 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    created(){
        this.getJurisdiction(); //获取菜单
        this.activePath = window.sessionStorage.getItem('activePath');
        if(this.type=="admin"){
            this.circleUrl = "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi.qqkou.com%2Fi%2F0a3305298991x2024211813b26.jpg&refer=http%3A%2F%2Fi.qqkou.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653006468&t=c1887dd493be8a7b4a0820c495cbd04e";
        }else if(this.type=="student"){
            this.getStudentInfo();
        }else if(this.type=="teacher"){
            this.getTeacherInfo();
        }
    },
    data(){
        return{
            isCollapse:false,  //菜单的切换
            activePath:'' ,   //导航栏切换，高亮显示
            username:'',
            type:'',
            studentInfo:{},
            teacherInfo:{},
            circleUrl: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi.qqkou.com%2Fi%2F0a3305298991x2024211813b26.jpg&refer=http%3A%2F%2Fi.qqkou.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653006468&t=c1887dd493be8a7b4a0820c495cbd04e",
        }
    },
    methods:{
        //退出功能
        logout(){
            window.sessionStorage.clear();
            this.$router.push("/login");
        },
        //发起请求获取菜单数据
        getJurisdiction(){
            this.username = window.sessionStorage.getItem("username");
            this.type = window.sessionStorage.getItem("type");
        },
        menuToggle(){
            this.isCollapse = !this.isCollapse;
        },
        //设置当前哈希地址，保证导航的高亮显示
        saveNavState(activePath){
            window.sessionStorage.setItem('activePath',activePath);
            this.activePath = activePath;
        },
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
                this.circleUrl = res.data.image;
            }
        }
    }
}
</script>

<style lang="less" scoped>
.el-container{
    height: 100%;
}
.el-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    // background-color: #b3c0d1;
    // color: #fff;
    background-color: #292B3A;
    color: #fff;
    font-size: 20px;
    >div{
        display: flex;
        align-items: center;
        img{
            width: 80px;
            height: 80px;
        }
        span{
            margin-left: 20px;
        }
    }
}
.el-aside{
    //background-color: rgb(238, 241, 246);
    background-color: #fff;
    .el-menu{
        border-right: none;
        span{
            font-size: 18px;
        }
    }
}
.el-main{
    background-color: #eaedf1;
}
.iconfont{
    margin-right: 10px;
    font-size: 20px;
}
.toggle-button{
    background-color: #4A5064;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    color: #fff;
    letter-spacing: 0.3 em;
    cursor: pointer;
}
.imgBox{
    margin:0 10px;
}
</style>