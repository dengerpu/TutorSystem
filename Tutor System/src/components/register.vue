<template>
  <el-container style="height: 100%; background: antiquewhite">
    <el-container
      style="padding: 10px; line-height: 0; background: #66b5cd; margin: 0 auto">

      <el-row
        style="height: 100%; margin: 0 auto"
        type="flex"
        class="row-bg loginpageback"
        justify="space-around"
      >
        <el-row>
          <el-col :xs="0" :sm="12" :md="13" :lg="15" :xl="15">
            <div class="grid-content" style="margin-top: -10px">
              <h2
                style="font-size: 40px; z-index：2; position:absolute; left:0px; font-weight:700; color:#fff;"
              >
                导师制下的学生成长管理系统
              </h2>
              <img
                src="../assets/img/合作开发网站.svg"
                style="background: #66b5cd"
                width="800px"
                alt=""
                class=""
              />
            </div>
          </el-col>

          <el-col :xs="24" :sm="9" :md="9" :lg="9" :xl="8">
            <div class="grid-content">
              <!-- 注册表单 -->
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="myform"
              >
               <el-row>
                  <el-col :span="24" style="text-align: center;">
                    <div class="grid-content loginlogo">
                      <img
                        src="../assets/img/欢迎注册.svg"
                        width="50%"
                        height="30%"
                        alt=""
                      />
                    </div>
                  </el-col>
                </el-row> 
                <el-form-item label="账号" prop="username">
                  <el-input
                    prefix-icon="el-icon-user-solid"
                    placeholder="请输入账号（学号/工号）"
                    v-model.trim="ruleForm.username"
                  ></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password" auto-complete="off">
                  <el-input
                    prefix-icon="el-icon-lock"
                    placeholder="请输入密码"
                    type="password"
                    v-model.trim="ruleForm.password"
                    show-password
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="确认密码"
                  prop="checkPass"
                  auto-complete="off"
                >
                  <el-input
                    placeholder="请再次输入密码"
                    prefix-icon="el-icon-lock"
                    type="password"
                    v-model.trim="ruleForm.checkPass"
                    show-password
                  ></el-input>
                </el-form-item>
                <el-form-item label="邮箱 " prop="email">
                  <el-input
                    placeholder="请输入邮箱"
                    prefix-icon="el-icon-message"
                    v-model.trim="ruleForm.email"
                  ></el-input>
                </el-form-item>
                <el-form-item label="手机 " prop="phone">
                  <el-input
                    placeholder="请输入手机号"
                    prefix-icon="el-icon-message"
                    v-model.trim="ruleForm.phone"
                  ></el-input>
                </el-form-item>

                <el-form-item  label="选择用户" prop="type" style="margin-left:5px; text-align: center" >
                  <el-select 
                  style="margin-right:125px; width:300px"
                    v-model="ruleForm.type" 
                    placeholder="请选择用户类型"
                    prop="type">
                    <el-option label="学生" value="student"></el-option>
                    <el-option label="导师" value="teacher"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item>
                  <div style="text-align: left">
                    <el-button
                      type="primary"
                      round
                      @click="submitForm('ruleForm')"
                      >立即注册</el-button
                    >
                    
                    <el-button round @click="resetForm('ruleForm')"
                      >重置</el-button
                    >
                    <el-button type="info" round plain @click="back('ruleForm')"
                      >返回</el-button
                    >
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </el-row>
    </el-container>
  </el-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      let reg = new RegExp("[ ]");
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (/[\u4E00-\u9FA5]/g.test(value)) {
        callback(new Error("不能输入中文!"));
      } else if (reg.test(value)) {
        callback(new Error("不能输入空格字符"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
          //自定义手机号码验证
     var checkPhone = (rule, value, callback) => {
         if (!value) {
               return callback(new Error('手机号不能为空'));
          } else {
              const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
              //console.log(reg.test(value));
              if (reg.test(value)) {
                   callback();
               } else {
                   return callback(new Error('请输入正确的手机号'));
              }
           }
     };

  

    return {

      ruleForm: {
        username: "",
        password: "",
        email: "",
        phone:"",
        checkPass: "",
        type:[],
        status:'',
        date:''
      },
      successResponse: [],

      rules: {

        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 5, message: "请输入正确的学号/职工号", trigger: "blur" },
          { max: 11, message: "请输入正确的学号/职工号", trigger: "blur" },
          {
            validator: function (rule, value, callback) {
              //校验空格
              let reg = new RegExp("[ ]");
              if (reg.test(value)) {
                callback(new Error("不能输入空格字符"));
              }else {
                //校验通过
                callback();
              }
            },
            
          },
        ],

        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        phone: [
         {required:true, validator:checkPhone, trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePass },
          { max: 12, message: "长度不能超过12个字符", trigger: "blur" },
          { min: 6, message: "长度不能少于6个字符", trigger: "blur" },
        ],
        checkPass: [
          { required: true, trigger: "blur", validator: validatePass2 },
        ],
         type: [{ required: true, message: "请选择用户", trigger: "blur" }],
      },
    };
  },
  methods: {
    //注册用户
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
            this.ruleForm.status = 0;
            this.ruleForm.date = new Date();
           // console.log(this.ruleForm);
            const{data:res}= await this.$http.post("/register",this.ruleForm)
                   //  console.log(res);
            if(res.status===200){
                this.$message.success(res.msg);
                this.$router.push({path:"/login"});
                
            }else if(res.status==400){
                this.$message.error(res.msg);
            }else if(res.status==401){
              this.$message.error(res.msg);
            }
           }
        })
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //返回
    back(formName){
      this.$refs[formName].resetFields();
      sessionStorage.clear();
      this.$router.push({ name: "login" });
    }

  },
};
</script>

<style scoped>
.register {
  background: url("../assets/img/实名认证.svg");
  background-size: 125% 130%;
  /* border: 1px; */
  width: 100%;
}

.myform {
  padding: 20px;
  z-index: 2;
  width: 400px;
  background: #fff;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#fff),
    to(#f4f4f4)
  );
  background-image: -webkit-linear-gradient(top, #fff, #f4f4f4);
  background-image: -moz-linear-gradient(top, #fff 0, #f4f4f4 100%);
  background-image: linear-gradient(-180deg, #fff, #f4f4f4);
  -webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
}
.logincontent {
    width: 80%;
    margin: 0 auto;
    position: relative;
}

.logincontent .myform {
    /* margin-left: 60%; */
    z-index: 2;
    width: 400px;
    /* height: 450px; */
    background: #fff;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    background-image: -webkit-gradient(linear, left top, left bottom, from(#fff), to(#f4f4f4));
    background-image: -webkit-linear-gradient(top, #fff, #f4f4f4);
    background-image: -moz-linear-gradient(top, #fff 0, #f4f4f4 100%);
    background-image: linear-gradient(-180deg, #fff, #f4f4f4);
    -webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .1);
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .1);
}

.logincontent .myform .loginlogo {
    margin-bottom: 20px;
}


/* login表格样式 */

.itemgroup {
    padding: 60px 25px;
    background-color: #fff;
    margin: 10px;
}

.title {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 70px;
}

.logincontent .myform .btn {
    width: 100%;
}

.footer {
    background-color: rgb(109, 109, 109);
}


body>.el-container {
    margin-bottom: 0px;
}
.loginpageback {
    padding: 4% 0;
    background-color: #66b5cd;
}
</style>
