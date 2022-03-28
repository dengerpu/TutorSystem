<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="logo_box">
                <img src="../assets/img/logo.png" alt="">
            </div>
            <!-- 登陆表单区域 -->
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormrules" label-width="80px" class="login_form">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginForm.password" type="password" prefix-icon="iconfont icon-3702mima"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登陆</el-button>
                    <el-button type="info" @click="resertForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            //登陆表单数据绑定
            loginForm: {
                username: "admin",
                password: "admin"
            },
            //表单验证规则
            loginFormrules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
                ],
            }
        }
        
    },
    methods:{
        //重置按钮点击事件，重置账号密码
        resertForm(){
            //console.log(this);
            this.$refs.loginFormRef.resetFields();
        },
        login(){

window.sessionStorage.setItem("token","123456");
        this.$router.push("/home")

            // this.$refs.loginFormRef.validate(async valid=>{
            //     if(!valid) return;
            //     const {data:res} = await this.$http.post('/login',this.loginForm)
            //     if(!res.flag){
            //         return this.$message.error(res.errorMsg)
            //     }
            //     if(res.flag){
            //         this.$message.success(res.errorMsg);
            //     }

            //    // const {data:res} = await this.$http.post('http://localhost:8888/api/private/login',this.loginForm)
            //     // //data属性才是服务器端返回来的，其他都是axios封装的
            //     // console.log(result)
            //     // if(res.meta.status !=200 ) return this.$message.error("登录失败")
                
               
            //     //1.将登陆成功之后的token,保存到客户端的sessionStorage中
            //     //1.1项目中除了登陆之外的api接口，必须在登陆之后才能访问
            //     //1.2token只应在当前网站打开期间生效，所以将token保存在sessionStorage中
            //     window.sessionStorage.setItem("token","123456");
            //     //2.通过编程式导航跳到后台主页路由地址是/home
            //     this.$router.push("/home")
            // })
        }
    }
}
</script>

<style scoped lang="less">
.login_container{
    // background-color: #2b4b6b;
    //background-image: url(../assets/img/bg.png);
    background: url(../assets/img/bg.jpg) no-repeat;
    background-size:100% 100% ;
    height: 100%;

}
.login_box{
    width: 450px;
    height: 300px;
    border-radius: 3px;
    background-color: #2b4b6b;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .logo_box{
        // width: 130px;
        // height: 130px;
        width: 160px;
        height: 80px;
        border: 1px solid #ccc;
        // border-radius: 50%;
        border-radius: 5%;
        // padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
        img{
            width: 100%;
            height: 100%;
            border-radius: 5%;
            // border-radius: 50%;
            background-color: #eee;
        }
    }
}
.login_form{
    position: absolute;
    padding: 0 20px;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
}
.btns{
    display: flex;
    justify-content: flex-end;
}
</style>