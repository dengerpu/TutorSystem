<template>
  <body >
    <el-card>
            <!-- 面包屑导航 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>安全中心</el-breadcrumb-item>
        </el-breadcrumb>
    <div class="infinite-list-wrapper">
      <!-- 更换邮箱弹出框 -->
      <el-dialog
        :visible.sync="changeEmailDialog "
        width="30%"
        style="align:center"
        :close-on-click-modal="false"
        @close="resetForm('ruleForm')">
        <!--更换邮箱表单 -->
          <el-form
            :model="ruleForm"
            ref="ruleForm"
            :rules="rules"
            label-width="120px"
            size="medium"
            style="padding: 10px;line-height: 0; margin:0 auto;"
          > 
            <h2 style="font-size:30px; margin:24px;text-align: center; margin-bottom:50px;">
                    更换邮箱
            </h2>

            <el-form-item label="用户" prop="username" >
              <el-input
                type="text"
                disabled
                v-model.trim="ruleForm.username"
                placeholder="请确认当前用户"
              ></el-input>
            </el-form-item>

            <el-form-item label="旧邮箱 " prop="oldemail">
              <el-input
                placeholder="请输入旧邮箱"
                prefix-icon="el-icon-message"
                v-model.trim="ruleForm.email"
              ></el-input>
            </el-form-item>

              <el-form-item label="邮箱验证码">
              <el-col :span="12"> 
                <el-input 
                  placeholder="请输入验证码"
                  prefix-icon="el-icon-picture-outline"
                  v-model.trim="ruleForm.code"
                  style="width:150px margin-left:600px"
                ></el-input>
              </el-col>
              <el-col :span="8">
                <el-button :type="color" 
                style="margin-left:15px ;width:120px; text-align: center" 
                plain 
                v-loading.fullscreen.lock="checkLoading"
                @click="getCheckemail()" 
                :disabled="flag">{{content}}</el-button>
              </el-col>
                </el-form-item>


              <el-form-item label="新邮箱 " prop="newEmail">
                <el-input
                  placeholder="请输入新邮箱"
                  prefix-icon="el-icon-message"
                  v-model.trim="ruleForm.newEmail"
                ></el-input>
            </el-form-item>
                <el-form-item size="small" class="text-center subBtn">
                  <el-button type="primary" @click.prevent="changeEmail('ruleForm')">确定修改</el-button>
                  <el-button round @click="resetForm('ruleForm')"
                            >重置</el-button
                          >
                </el-form-item>
          </el-form>
      </el-dialog>

      <!-- 修改密码弹出框 -->
      <el-dialog
        :visible.sync="changePasswordDialog "
        width="30%"
        style="align:center"
        :close-on-click-modal="false"
        @close="resetForm('ruleForm')">

        <!-- 修改密码表单 -->
          <el-form
            :model="ruleForm"
            ref="ruleForm"
            :rules="rules"
            label-width="120px"
            size="medium"
            style="padding: 10px;line-height: 0; margin:0 auto"
          > 
            <h2 style="font-size:29px; margin:24px;text-align: center; margin-bottom:50px;">
                    修改密码
            </h2>

            <el-form-item label="用户" prop="username"  v-show="selectUser =false" >
              <el-input
                type="text"
                disabled
                v-model.trim="ruleForm.username"
                placeholder="请确认当前用户"
              ></el-input>
            </el-form-item>

                <el-form-item label="旧密码" prop="password">
                  <el-input
                    type="password"
                    v-model.trim="ruleForm.password"
                    placeholder="请输入旧密码"
                    show-password
                  ></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                  <el-input
                    type="password"
                    v-model.trim="ruleForm.newPassword"
                    placeholder="请输入新密码"
                    show-password
                  ></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="checknewpassword">
                  <el-input
                    type="password"
                    v-model.trim="ruleForm.checknewpassword"
                    placeholder="请再次输入新密码"
                    show-password
                  ></el-input>
                </el-form-item>
                <el-form-item size="small" class="text-center subBtn">
                  <el-button type="primary" @click.prevent="changePassword('ruleForm')">确定修改</el-button>
                  <el-button round @click="resetForm('ruleForm')"
                            >重置</el-button
                          >
                </el-form-item>
          </el-form>
      </el-dialog>

      <!-- 注销账号弹出框 -->
      <el-dialog
        :visible.sync="delDialog "
        width="30%"
        style="align:center"
        :close-on-click-modal="false"
        @close="resetForm('ruleForm')">

        <!-- 注销账号表单 -->
          <el-form
            :model="ruleForm"
            ref="ruleForm"
            :rules="rules"
            label-width="120px"
            size="medium"
            style="padding: 10px;line-height: 0; margin:0 auto"
          > 
            <h2 style="font-size:29px; margin:24px;text-align: center; margin-bottom:50px;">
                    注销账号
            </h2>

            <el-form-item label="用户" prop="username"  v-show="selectUser = false" >
              <el-input
                type="text"
                disabled
                v-model.trim="ruleForm.username"
                placeholder="请确认当前用户"
              ></el-input>
            </el-form-item>

            
            <el-form-item label="邮箱 " prop="oldemail">
              <el-input
                placeholder="请输入绑定邮箱"
                prefix-icon="el-icon-message"
                v-model.trim="ruleForm.email"
              ></el-input>
            </el-form-item>

              <el-form-item label="邮箱验证码" prop="checkemail">

              <el-col :span="12"> 
                <el-input 
                  placeholder="请输入验证码"
                  prefix-icon="el-icon-picture-outline"
                  v-model.trim="ruleForm.checkemail"
                  style="width:150px margin-left:600px"
                ></el-input>
              </el-col>
              <el-col :span="8">
                <el-button :type="color" 
                style="margin-left:15px ;width:120px; text-align: center" 
                plain 
                v-loading.fullscreen.lock="checkLoading"
                @click="getCheckemail()" 
                :disabled="flag">{{content}}</el-button>
              </el-col>
                </el-form-item>


            <el-form-item size="small" class="text-center subBtn">
              <el-button type="primary" @click.prevent="delUser('ruleForm')">确定注销</el-button>
              <el-button round @click="resetForm('ruleForm')"
                        >重置</el-button
                      >
            </el-form-item>
          </el-form>
      </el-dialog>    
      
       <!-- 更换邮箱 -->
      <el-card style="margin:5px;" class="box-card">
          <el-col :span="24">
            <div style="text-align:left;padding:10px;">
              <h2 style="font-size:20px; color:#000 ">安全邮箱</h2>
            </div>
          </el-col>
        <!-- 更换邮箱 -->
          <el-form>
            <el-form-item>
              <el-row >
                <el-col :span="20" >
                  <p style="text-align: left;font-size:15px;">安全邮箱是账号归属的唯一凭证。当忘记密码时，你可以通过安全邮箱找回密码。
                    可设置该邮箱是否接收系统待办。消息提醒，如果需要开启邮箱消息提醒功能请在“个人设置-安全中心”中开启。</p>
                </el-col>
                  <el-col :span="20">
                    <p style="text-align: right ;font-size:15px"> 邮箱：{{this.ruleForm.email}} 
                    <el-link type="primary" style="margin-left:5px" @click="changeEmailDialog = true">更换邮箱</el-link></p>
                  </el-col>
                </el-row>
            </el-form-item>
          </el-form>
        </el-card>

       <!-- 修改密码 -->
     <el-card style="margin:5px;" class="box-card"> 
          <!-- 修改密码 -->
          <el-col :span="24">
            <div style="text-align:left;padding:10px;">
              <h2 style="font-size:20px; color:#000 ">修改密码</h2>
            </div>
          </el-col>
            <el-form>
              <el-form-item>
                <el-row >
                  <el-col :span="20">
                    <p style="text-align: left;font-size:15px"> 定期修改登录密码有助于账号的安全。</p>
                  </el-col>

                  <el-col :span="20">
                    <p style="text-align: right"> 
                    <el-link type="primary" @click="changePasswordDialog = true">更改密码</el-link></p>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-form>

        </el-card>

         <!-- 注销账号 -->
     <el-card style="margin:5px;" class="box-card">
         <!-- 注销账号 -->
          <el-col :span="24">
            <div style="text-align:left;padding:10px;">
              <h2 style="font-size:20px; color:#000 ">注销账号</h2>
            </div>
          </el-col>
          <el-form>
            <el-form-item>
              <el-row >
                <el-col :span="20">
                  <p style="text-align: left;font-size:15px"> 注销您的账号信息。注销后的账号信息无法恢复，只能重新注册。</p>
                </el-col>

                <el-col :span="20">
                  <p style="text-align: right"> 
                  <el-link type="danger" @click="delDialog = true">注销账号</el-link></p>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </el-card>
    </div>
    </el-card>
  </body>
</template>

<script>
export default {
  
  data() {
  //密码规则验证 
    var validatePass1 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value === this.ruleForm.password) {
        callback(new Error("新密码不能与旧密码相同!"));
      }
      else if (/[\u4E00-\u9FA5]/g.test(value)) {
      callback(new Error('不能输入中文!'));
      }
      let reg = new RegExp("[ ]")
            if(reg.test(value)){
                callback(new Error('不能输入空格字符'));
                }  else {
        callback();
      }
    };
    // 两次输入密码是否不一致
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      //传给后台所需要的参数
    
      changeEmailDialog:false,//邮箱弹出框
      changePasswordDialog: false,//密码弹出框
      delDialog:false,//注销账号弹出框
      content: '获取验证码', // 获取验证码按钮文字
      flag: false,//按钮是否可取
      totalTime: 60,//倒计时时间
      color:"success",//按钮颜色
      checkLoading:false,//缓存

      ruleForm: {
        username: '',
        password:'',
        newPassword:'',
        checknewpassword:'',
        checkemail:"",
        oldemail:"",
        newEmail:"",
      },
      userData: {},

      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, message: "长度不能少于2个字符", trigger: "blur" },
          { max: 10, message: "长度不能超过10个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
          { max: 12, message: "长度不能超过12个字符", trigger: "blur" },
          { min: 6, message: "长度不能少于6个字符", trigger: "blur" },
        ],
        
        newPassword: [
          { required: true, validator: validatePass1, trigger: "blur" },
          { max: 12, message: "长度不能超过12个字符", trigger: "blur" },
          { min: 6, message: "长度不能少于6个字符", trigger: "blur" },
          ],
        checknewpassword: [
          { required: true, validator: validatePass2, trigger: "blur" },
          { max: 12, message: "长度不能超过12个字符", trigger: "blur" },
          { min: 6, message: "长度不能少于6个字符", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        newEmail: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        checkemail:[{required: true, message: "请输入邮箱验证码", trigger: "blur"}]

      },
    };
  },
  methods: {

    // 修改密码
    changePassword(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {    
           const {data:res} = await this.$http.post('/updatepassword', {
            username:this.ruleForm.username,
            password:this.ruleForm.password,
            newPassword:this.ruleForm.newPassword,
          })
          if(res.status!=200){
            this.$message.error(res.msg);
          }else if(res.status==200){
            window.sessionStorage.clear();
            this.$router.push("/login");
            this.$message.success(res.msg);
          }
        } else {
          this.$message.error('修改失败！');
        }
      
      });
    },

    //重置
    resetForm(formName) {
          this.$refs[formName].resetFields();
        },
//发送验证码
    async getCheckemail(){
      const {data:res} = await this.$http.get("/findpassword",{params:{
        "username": this.ruleForm.username,
        "email": this.ruleForm.email,
        "type": this.ruleForm.type
        }})
       // console.log(res);
      if(res.status!=200){
        return this.$message.error(res.msg);
      }else if(res.status==200){
          this.$message.success(res.msg);
        //验证码发送成功后按钮变化
          this.flag = true;//点击之后设置按钮不可取
          this.content = this.totalTime + "s后重新发送";//按钮内文本
          this.color  = "info"//按钮颜色变化
          //时间控制
          let clock = window.setInterval(() => {
            this.totalTime--;
            this.content = this.totalTime + "s后重新发送";
            if (this.totalTime < 0) {
              window.clearInterval(clock);
              this.content = "重新发送验证码";
              this.totalTime = 60;
              this.flag = false; //这里重新开启
              this.color = "success";
              } 
          }, 1000);
      }   
    },
    //修改邮箱
    changeEmail(formName){
      this.$refs[formName].validate( async (valid) => {
        if (valid) {       
          const {data:res} = await this.$http.post('/updateemail', {
            username:this.ruleForm.username,
            newEmail:this.ruleForm.newEmail,
            code:this.ruleForm.code,//验证码
          })
          if(res.status!=200){
            this.$message.error(res.msg);
          }else if(res.status==200){

            this.changeEmailDialog = false;
            this.ruleForm.email = this.ruleForm.newEmail;
            this.$message.success(res.msg);
          }
        } 
        else {
          this.$message.error('修改失败！');
        }
      
      });
    },
    //注销账号
    delUser(formName){
      alert("请联系管理员");
    },
  },
  created(){
     this.ruleForm.username = window.sessionStorage.getItem("username");
     this.ruleForm.type = window.sessionStorage.getItem("type");
     this.ruleForm.email = window.sessionStorage.getItem('email');
  }

};
</script>

<style>
.size {
  font-size: 200%;
  color: grey;
  height: 5%;
}


</style>