<template>
  <body >
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

            <el-form-item label="用户" prop="username"  v-if="select = false" >
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
                v-model.trim="ruleForm.oldemail"
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


              <el-form-item label="新邮箱 " prop="newemail">
                <el-input
                  placeholder="请输入新邮箱"
                  prefix-icon="el-icon-message"
                  v-model.trim="ruleForm.newemail"
                ></el-input>
            </el-form-item>

            <el-form-item label="选择用户" prop="choice"  v-if="select = false">
              <el-input
                type="text"
                disabled
                v-model.trim="ruleForm.choice"
                placeholder="请确认当前选择用户"
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

                <el-form-item label="旧密码" prop="oldpassword">
                  <el-input
                    type="password"
                    v-model.trim="ruleForm.oldpassword"
                    placeholder="请输入旧密码"
                    show-password
                  ></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newpassword">
                  <el-input
                    type="password"
                    v-model.trim="ruleForm.newpassword"
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
                v-model.trim="ruleForm.oldemail"
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
  </body>
</template>

<script>
// import axios from 'axios';
export default {
  
  data() {
  //密码规则验证 
    var validatePass1 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value === this.ruleForm.oldpassword) {
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
      } else if (value !== this.ruleForm.newpassword) {
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
      totalTime: 30,//倒计时时间
      color:"success",//按钮颜色
      checkLoading:false,//缓存

      ruleForm: {
        username: '',
        oldpassword:'',
        newpassword:'',
        checknewpassword:'',
        checkemail:"",
        oldemail:"",
        newemail:"",
      },
      userData: {},

      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, message: "长度不能少于2个字符", trigger: "blur" },
          { max: 10, message: "长度不能超过10个字符", trigger: "blur" },
        ],
        oldpassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
          { max: 12, message: "长度不能超过12个字符", trigger: "blur" },
          { min: 6, message: "长度不能少于6个字符", trigger: "blur" },
        ],
        
        newpassword: [
          { required: true, validator: validatePass1, trigger: "blur" },
          { max: 12, message: "长度不能超过12个字符", trigger: "blur" },
          { min: 6, message: "长度不能少于6个字符", trigger: "blur" },
          ],
        checknewpassword: [
          { required: true, validator: validatePass2, trigger: "blur" },
          { max: 12, message: "长度不能超过12个字符", trigger: "blur" },
          { min: 6, message: "长度不能少于6个字符", trigger: "blur" },
        ],
        oldemail: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        newemail: [
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
      this.$refs[formName].validate((valid) => {
        if (valid) {    

          this.$http
          .post('http://localhost:8181/user/updatePassword/', {
            username:this.ruleForm.username,
            password:this.ruleForm.newpassword,
            choice:this.ruleForm.oldpassword,//旧密码
          }
          ).then(successResponse => {

            // 后端返回值判断
            switch(successResponse.data){
              case "success":
                this.$router.push({ name: "login" });
                this.$message({message: "修改成功，请重新登录",type: "success", }); 
                break;
              case "error":
                this.$message.error('账号密码错误！');
                break;
              case "empty":
                this.$message.error('账号不存在！');
                break;
            }
          });
        } else {
          this.$message.error('修改失败！');
        }
      
      });
    },

    //重置
    resetForm(formName) {
          this.$refs[formName].resetFields();
        },
      //获取验证码
      getCheckemail(){
         this.checkLoading = true;
         this.$http.post('http://localhost:8181/user/getCheckemail', {
            username: this.ruleForm.username,
            email: this.ruleForm.oldemail,
            choice: this.ruleForm.choice,
        }).then(successResponse => {
        
        switch(successResponse.data){
          case "addressError":
            this.checkLoading = false;
            this.$message({message: "请输入正确的绑定邮箱!",type: "warning",}); 
            break;
            
            case "error":
              this.checkLoading = false;
              this.$message({message: "邮箱地址错误或邮箱不存在!",type: "warning",}); 
            break;    

            case "userError":
              this.checkLoading = false;
              this.$message({message: "用户或选择用户错误!",type: "warning",});
            break;   

            case "empty":
              this.checkLoading = false;
              this.$message({message: "用户不存在",type: "error",}); 
            break;

            case "success":
              this.checkLoading=false;
              this.$message({message: "获取成功!请查看邮箱！",type: "success",}); 

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
                    this.totalTime = 30;
                    this.flag = false; //这里重新开启
                    this.color = "success";
                  } 
                }, 1000);
            break;
        }

      });
    },
    //修改邮箱
    changeEmail(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {    
          this.$http
          .post('http://localhost:8181/user/changeEmial', {
              username:this.ruleForm.username,
              email:this.ruleForm.newemail,
              verifyCode:this.ruleForm.checkemail,
          }
          ).then(successResponse => {

            // 后端返回值判断
            switch(successResponse.data){
              case "success":
                window.location.reload();     
                this.$message({message: "修改成功！",type: "success", }); 
                break;
              case "error":
                
                this.$message.error('验证码错误！');
                break;
              case "empty":
                this.$message.error('账号不存在！');
                break;
            }
          });
        } else {
          this.$message.error('修改失败！');
        }
      
      });
    },
    //注销账号
    delUser(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {           
        this.$confirm('注销账号后信息不可恢复，是否确定注销？', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$http
            .post('http://localhost:8181/user/delUser', {
              username:this.ruleForm.username,
              verifyCode:this.ruleForm.checkemail,
          }
          ).then(successResponse => {

            // 后端返回值判断
            switch(successResponse.data){
              case "success":
                this.$router.push({ name: "login" });
                this.$message({message: "账号已注销！",type: "warning", }); 
                break;
              case "error":
                this.$message.error('验证码错误！');
                break;
              case "empty":
                this.$message.error('账号不存在！');
                break;
            }
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });          
        });
        } else {
          this.$message.error('修改失败！');
        }
      });
    },
  },
  created(){
      var choice = window.sessionStorage.getItem("choice");
      if(choice === "管理员"){
          this.$router.push({name: "MasterPage"});
      }
          const _this = this 
     _this.ruleForm.username = window.sessionStorage.getItem("username");
    this.$http.get('http://localhost:8181/user/findAllByUsername/'+_this.ruleForm.username).then(function(resp){
         _this.ruleForm = resp.data})
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