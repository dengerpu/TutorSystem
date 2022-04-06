<template>
     <div>
       <!-- 面包屑导航 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户详情</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-container>
                <el-aside width="240px" >
                    <div class="info_img">
                       <img width="180px" height="240px" :src="userInfo.image"></img>
                        <span>{{userInfo.name}}</span>
                    </div>
                    <div class="info_message">
                        <div class="info_message_title">
                              <!-- 图标 -->
                            <i class="el-icon-s-custom"></i>
                            <div>
                               <span class="span_z">个人信息：</span> 
                               <span class="span_e">Personal Information</span> 
                            </div>
                        </div>
                        <div class="info_message_main">
                             <span>性别：{{userInfo.sex}}</span> 
                             <span>年龄：{{userInfo.age}}</span> 
                             <span>学院：{{userInfo.college}}</span> 
                             <span>专业：{{userInfo.major}}</span> 
                             <span v-if="type=='teacher'">毕业学校：北京大学</span> 
                             <span v-if="type=='teacher'">研究方向：{{userInfo.interest}}</span> 
                        </div>
                    </div>
                    <div class="info_link">
                        <div class="info_link_title">
                              <!-- 图标 -->
                            <i class="el-icon-phone-outline"></i>
                            <div>
                               <span class="span_z">联系方式：</span> 
                               <span class="span_e">Other Contact Information</span> 
                            </div>
                        </div>
                        <div class="info_link_main">
                            <span>邮编：455000</span> 
                             <span>手机：{{userInfo.phone}}</span> 
                             <span>邮箱：{{userInfo.email}}</span> 
                             <span>地址：安阳工学院</span> 
                        </div>
                    </div>
                </el-aside>
                <el-main>
                    <!-- 个人简介区域 -->
                    <div>
                        <div class="info_main_title">
                                <el-col :span="20" class="div_box">
                                        <!-- 图标 -->
                                        <i class="el-icon-guide"></i>
                                        <div>
                                            <span class="span_z">个人简介：</span> 
                                            <span class="span_e">Personal Profile</span> 
                                        </div>
                                </el-col>
                                <el-col :span="4" float="right">
                                    <el-button round @click="goBack">返回</el-button>
                                </el-col>
                            </div>
                        <div class="main_content" v-html="userInfo.introduce">
                        </div>
                    </div>
                    <div>
                        <div class="info_main_title">
                                <el-col :span="20" class="div_box">
                                        <!-- 图标 -->
                                        <i class="el-icon-trophy"></i>
                                        <div>
                                            <span class="span_z">个人荣誉：</span> 
                                            <span class="span_e">Personal Honor</span> 
                                        </div>
                                </el-col>
                            </div>
                        <div class="main_content" v-html="userInfo.honor">
                        </div>
                    </div>
                   
                </el-main>
            </el-container>
        </el-card>
    </div>
</template>
<script>
export default {
    data(){
        return{
            id:'',
            type:'',
            userInfo:{}
        }
    },
    methods:{
        //获取用户详情信息
        async getUserInfo(){
            this.id = this.$route.query.id;
            this.type = this.$route.query.type;
            if(this.type=='teacher'){
                const {data:res} = await this.$http.get('/editteacher',{params:{"id":this.id}});
                //console.log(res);
                if(res.status!=200){
                    this.$message.console.error(res.msg);
                }
                if(res.status==200){
                    this.userInfo = res.data;
                }
            }else if (this.type=='student'){
                 const {data:res} = await this.$http.get('/editstudent',{params:{"id":this.id}});
               // console.log(res);
                if(res.status!=200){
                    this.$message.console.error(res.msg);
                }
                if(res.status==200){
                    this.userInfo = res.data;
                }
            }
        },
        goBack(){
            this.$router.go(-1);
        }
    },
    created(){
        this.getUserInfo();
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
    }
}
.el-aside{
     background-color: #eeefff;
    line-height: 20px;
    >div{
        border-top:5px solid #6A2300;
        padding: 20px;
        height:260px;
        margin-bottom: 40px;
    }
    .info_img{
        //background: #fff;
         span{
            display: block;
            padding: 5px;
            height: 20px;
            color: black;
            font-size: 20px;
            line-height: 20px;
         }
    }
    .info_message{
        .info_message_title{
            display: flex;
            padding: 10px;
            border-bottom: 2px solid #ccc;
            >div{
                margin-left: 10px;
                span{
                    display: block;
                }
                .span_z{
                    font-size: 18px;
                    text-align: left;
                    line-height: 22px;
                    color: #b34c19;
                }
                .span_e{
                    font-size: 12px;
                    color: #afaeb4;
                    line-height: 18px;
                }
            }
            .el-icon-s-custom{
                font-size: 38px;
                color: #0883f7;
            }
        }
        .info_message_main{
            padding-top: 20px;
            span{
                display: block;
                text-align: left;
                padding: 5px;
                color:black ;
            }
        }
    }
    .info_link{
        .info_link_title{
            display: flex;
            padding: 10px;
            border-bottom: 2px solid #ccc;
            >div{
                margin-left: 10px;
                span{
                    display: block;
                }
                .span_z{
                    font-size: 18px;
                    text-align: left;
                    line-height: 22px;
                    color: #b34c19;
                }
                .span_e{
                    font-size: 12px;
                    color: #afaeb4;
                    line-height: 18px;
                }
            }
            .el-icon-phone-outline{
                font-size: 30px;
                color: #0883f7;
            }
        }
        .info_link_main{
            padding-top: 20px;
            span{
                display: block;
                text-align: left;
                padding: 5px;
                color:black ;
            }
        }
    }
    
}
.el-main{
    background-color: #eeefff;
   border-top: 5px solid #05b4a3;
    margin-left: 40px;
     .info_main_title{
         display: flex;
         width: 100%;
          border-bottom: 2px solid #ccc;
         .div_box{
            float: left;
            display: flex;
            padding: 10px;
            >div{
                margin-left: 10px;
                span{
                    display: block;
                }
                .span_z{
                    font-size: 18px;
                    text-align: left;
                    line-height: 22px;
                    color: #b34c19;
                }
                .span_e{
                    font-size: 12px;
                    color: #afaeb4;
                    line-height: 18px;
                }
            }
            .el-icon-guide,.el-icon-trophy{
                font-size: 40px;
                color: #0883f7;
            }  

        }
           
    }
    //主题内容区域
    .main_content{
        padding:10px;
        text-align: left;
    }
}
.iconfont{
    margin-right: 10px;
    font-size: 20px;
}
</style>