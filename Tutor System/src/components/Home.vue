<template>
    <el-container>
        
        <!-- 头部区域 -->
        <el-header>
            <div>
                <img src="../assets/img/logo.png" alt="">
                <span>导师制下的学生成长管理系统</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <!-- 页面主题区域 -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse ?'64px' :'200px'">
                <div class="toggle-button" @click="menuToggle">|||</div>
                <el-menu class="el-menu-vertical-demo" background-color="#b3c0d1" text-color="#fff" active-text-color="#409eff" 
                unique-opened :collapse="isCollapse" :collapse-transition="false" :router="true" :default-active="activePath">
                    <!-- 一级菜单 -->
                    <el-submenu index="0">
                        <!-- 一级菜单模板 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i class="iconfont icon-user"></i>
                            <!-- 文字 -->
                            <span>首页</span>
                        </template>
                    </el-submenu>
                    <!-- 一级菜单 -->
                    <el-submenu index="1">
                        <!-- 一级菜单模板 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i class="iconfont icon-user"></i>
                            <!-- 文字 -->
                            <span>用户管理</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item index="/users" @click="saveNavState('/users')">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>用户列表</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/teachers" @click="saveNavState('/teachers')">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>教师列表</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/students" @click="saveNavState('/students')">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>学生列表</span>
                            </template>
                        </el-menu-item>

                    </el-submenu>
                    <!-- 一级菜单 -->
                    <el-submenu index="2">
                        <!-- 一级菜单模板 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i class="iconfont icon-lock_fill"></i>
                            <!-- 文字 -->
                            <span>权限管理</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item index="/choice" @click="saveNavState('/choice')">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>分配管理</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/tutorchoice" @click="saveNavState('/tutorchoice')">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>选择学生</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/studentchoice" @click="saveNavState('/studentchoice')">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>选择老师</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                                        <!-- 一级菜单 -->
                    <el-submenu index="3">
                        <!-- 一级菜单模板 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i class="iconfont icon-shangpin"></i>
                            <!-- 文字 -->
                            <span>课程管理</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item index="/videos" @click="saveNavState('/videos')">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>视频列表</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/textlist" @click="saveNavState('/textlist')">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>文本列表</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/texts" @click="saveNavState('/texts')">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>添加文本</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                                        <!-- 一级菜单 -->
                    <el-submenu index="4">
                        <!-- 一级菜单模板 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i class="iconfont icon-danju"></i>
                            <!-- 文字 -->
                            <span>订单管理</span>
                        </template>
                        <!-- 二级菜单 -->
                        <!-- <el-menu-item index="41">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>导航一</span>
                            </template>
                        </el-menu-item> -->
                    </el-submenu>

                       <el-submenu index="5">
                        <!-- 一级菜单模板 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i class="iconfont icon-baobiao"></i>
                            <!-- 文字 -->
                            <span>数据统计</span>
                        </template>
                        <!-- 二级菜单 -->
                        <!-- <el-menu-item index="51">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>导航一</span>
                            </template>
                        </el-menu-item> -->
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
        this.getMenulist(); //获取菜单
        this.activePath = window.sessionStorage.getItem('activePath');
    },
    data(){
        return{
            isCollapse:false,  //菜单的切换
            activePath:''    //导航栏切换，高亮显示
        }
    },
    methods:{
        //退出功能
        logout(){
            window.sessionStorage.clear();
            this.$router.push("/login");
        },
        //发起请求获取菜单数据
        async getMenulist(){

        },
        menuToggle(){
            this.isCollapse = !this.isCollapse;
        },
        //设置当前哈希地址，保证导航的高亮显示
        saveNavState(activePath){
            window.sessionStorage.setItem('activePath',activePath);
            this.activePath = activePath;
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
    background-color: #b3c0d1;
    color: #fff;
    font-size: 20px;
    >div{
        display: flex;
        align-items: center;
        img{
            // width: 40px;
            height: 60px;
        }
        span{
            margin-left: 20px;
        }
    }
}
.el-aside{
    background-color: rgb(238, 241, 246);
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
</style>