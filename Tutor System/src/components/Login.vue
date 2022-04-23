<template>
  <el-container style="height: 100%; background: antiquewhite; ">
    <el-container style="padding: 10px;line-height: 0; background:#66b5cd; margin:0 auto">
      <el-row style="height:100%;margin:0 auto" type="flex" class="row-bg loginpageback" justify="space-around">

        <el-row>
            <!-- 标题 -->
          <el-col :xs="0" :sm="12" :md="13" :lg="15" :xl="15">
            <div class="grid-content" style="margin-top:-10px">
              <h2 style="font-size: 40px; z-index：2; position:absolute; left:-100px; font-weight:700; color:#fff;">
                导师制下的学生成长管理系统</h2>
              <img
                src="../assets/img/办公.svg"
                style=""
                alt=""
                class=""
              />
            </div>
          </el-col>

          <el-col :xs="24" :sm="9" :md="9" :lg="9" :xl="8">
              <!-- 登录部分 -->
            <div class="grid-content">

              <el-form
                :label-position="labelPosition"
                :model="formData"
                status-icon
                label-width="100px"
                class="demo-formData itemgroup"
                :rules="rules"
                ref="formData"
              >
                <el-row>
                  <el-col :span="24" style="text-align: center;">
                    <div class="grid-content loginlogo">
                      <img
                        src="../assets/img/登录.svg"
                        width="30%"
                        alt=""
                      />
                    </div>
                  </el-col>
                </el-row> 

                <div style="margin:30px 0">
                <el-form-item  prop="username" style="margin-left:-100px">
                  <el-input
                    type="text"
                    v-model="formData.username"
                    placeholder="请输入账号（学号/工号）"
                    prefix-icon="el-icon-user"
                    autofocus="true"
                  >
                  </el-input>
                </el-form-item>

                <el-form-item prop="password" style="margin-left:-100px;">
                  <el-input
                   type="text"
                    v-model="formData.password"
                    show-password
                    placeholder="请输入密码"
                    prop="password"
                    prefix-icon="el-icon-lock"
                  >
                  </el-input>
                </el-form-item>

               <el-form-item prop="type" style="margin-left:-100px;">
                  <el-select 
                    v-model="formData.type" 
                    placeholder="请选择登录用户"
                    prop="type"
                    style="width: 100%"
                    >
                    <el-option label="学生" value="student"></el-option>
                    <el-option label="导师" value="teacher"></el-option>
                    <el-option label="管理员" value="admin"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="code"  style="margin-left:-100px;display:flex;">
                    <el-col :span="10" style="float:left;">
                       <el-input type="text" v-model="formData.code" placeholder="请输入验证码"></el-input>
                    </el-col>
                    <el-col :span="10" style="float:right;">
                          <!-- <span @click="getCode">
                              <img :src="imageUrl" ></img>
                          </span> -->
                          <img :src="imageUrl" @click="getCode"></img>
                    </el-col>
                </el-form-item>
              </div>
                <el-row :gutter="1">

                  <el-col :xs="10" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-link
                      href="#/register"
                      type="primary"
                      style="padding:10px;margin-bottom:20px; float:left;">
                      注册
                    </el-link>
                  </el-col>

                <el-col :xs="10" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-link
                      href="#/findPassword"
                      type="primary"
                      style="padding:10px;margin-bottom:20px; float:right;">
                      忘记密码
                    </el-link>
                  </el-col>

                </el-row>
                <el-row :span="12" :offset="6">
                  <el-col> <el-button type="primary"
                      @click.prevent="submitForm('formData')"
                      style="width:100%; font-size:18px"
                    >
                      登 录
                    </el-button>
                  </el-col></el-row
                >

              </el-form>
            </div>
          </el-col>


        </el-row>

      </el-row>
    </el-container>
  </el-container>

</template>

<script>
export default {

  data() {

    return {
      labelPosition: "left",
      formData: {
        username: "",
        password: "",
        type:[],
        code:"",
      },
      imageUrl:"",
      responseResult: [],
      rules: {
         username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 5, message: "长度不能少于5个字符", trigger: "blur" },
          { max: 11, message: "长度不能超过11个字符", trigger: "blur" },
          {
            validator: function (rule, value, callback) {
              //校验空格
              let reg = new RegExp("[ ]");
              if (reg.test(value)) {
                callback(new Error("不能输入空格字符"));
              } else {
                //校验通过
                callback();
              }
            },
            
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { max: 16, message: "长度不能超过16个字符", trigger: "blur" },
          { min: 5, message: "长度不能少于5个字符", trigger: "blur" },
           {
            validator: function (rule, value, callback) {
              //校验空格
              let reg = new RegExp("[ ]");
              if (reg.test(value)) {
                callback(new Error("不能输入空格字符"));
              } else {
                //校验通过
                callback();
              }
            },
            
          },
        ],
        type: [{ required: true, message: "请选择用户", trigger: "blur" }],
        code: [{ required: true, message: "请选择验证码", trigger: "blur" }],
      },
    };
  },

  methods: {
    async getStudentId(username){
      const {data:res} = await this.$http.get('/getsid',{params:{"username":username}});
      //console.log(res);
      if(res.status==200){
        window.sessionStorage.setItem("sid",res.data);
      }
    },
    async getTeacherId(username){
      const {data:res} = await this.$http.get('/gettid',{params:{"username":username}});
      
     if(res.status==200){
        window.sessionStorage.setItem("tid",res.data);
        //console.log("tid:"+res.data);
      }
    },
    // 登录
    submitForm(formName) {
        //1.2token只应在当前网站打开期间生效，所以将token保存在sessionStorage中
                  // window.sessionStorage.setItem("token","123456");
                  // //2.通过编程式导航跳到后台主页路由地址是/home
                  // this.$router.push("/home")
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const{data:resCode} = await this.$http.get('verify/checkcode',{params:{"code":this.formData.code}});
          if(resCode.status==400){
            return this.$message.error(resCode.msg);
          }else if(resCode.status==401){
             return this.$message.error(resCode.msg);
          }else if(resCode.status==200){
                     // console.log(this.formData);
             const {data: res}= await this.$http.post('/login', {
                username: this.formData.username,
                password: this.formData.password,
                type: this.formData.type
                }); 
                //console.log(res);
                if(res.status===200){
                  this.$message.success("登陆成功");
                  //1.2token只应在当前网站打开期间生效，所以将token保存在sessionStorage中
                  window.sessionStorage.setItem("token","123456");
                  window.sessionStorage.setItem("username",res.data.username);
                  window.sessionStorage.setItem("type",res.data.type);
                  window.sessionStorage.setItem("email",res.data.email);
                  if(res.data.type=="student"){
                    this.getStudentId(res.data.username);
                  }else if(res.data.type=="teacher"){
                    this.getTeacherId(res.data.username);
                    //console.log("查询教师id成功");
                  }
                  //2.通过编程式导航跳到后台主页路由地址是/home
                  this.$router.push("/home")
                }else{
                  return this.$message.error(res.msg);
                }

          }

           }
        })
      },
      //获取验证码
      async getCode(){
       // console.log("执行了....");
        let res= await this.$http.get('verify/getcode',{
        responseType: 'blob'
        })
       // this.imageUrl = res.data
        this.imageUrl = window.URL.createObjectURL(res.data)

        //this.imageUrl=window.URL.createObjectURL(blob)
        //console.log(blob);
       
      }
  },
    created(){
      this.getCode();
      const _this = this;
      _this.formData.username = window.sessionStorage.getItem("loginuser");
      _this.formData.type = window.sessionStorage.getItem("logintype");
  }
}
 
</script>
<style scoped>
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  /* background-color: #f9fafc; */
}
.line{
  margin-left: 20px;
}

.page {
    padding: 5% 0;
    background: url('../assets/img/场景-工作讨论.svg') no-repeat;
    background-position: 100px;
    background-color: antiquewhite;
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