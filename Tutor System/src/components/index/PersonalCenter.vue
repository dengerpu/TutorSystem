<template>      
  <el-container style="height: 100%; background: white">
      <el-card  class="box-card">
                    <!-- 面包屑导航 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        </el-breadcrumb>
      <el-row>
      <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24" >
      <div style="text-align:center;" ><!--border:1px solid #000 -->

      <el-form :inline="true" :rules="rules" :model="ruleForm" ref="ruleForm" class="demo-form-inline" >
        <el-row > 

          <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div style="text-align:center">
          <el-form-item label="姓名 " prop="name" label-width="150px">
                <el-input
                style="width:500px ;"
                  placeholder="请输入姓名"
                  v-model.trim="ruleForm.name"
                >
                </el-input>
            </el-form-item>
            
            </div>
        </el-col>
        
          <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div style="text-align:center">
          <el-form-item label="学号/工号 " prop="username" label-width="150px">
                <el-input
                disabled
                style="width:500px ;"
                  placeholder="请输入学号/工号"
                  v-model.trim="ruleForm.username"
                >
                </el-input>
            </el-form-item>
            </div>
        </el-col>

        <el-col :span="24" :xs="12" :sm="12" :md="24" :lg="24" :xl="24">
        <el-form-item label="性别 " prop="sex"    label-width="150px">
            <div style="text-align: left">
            <el-radio-group v-model="ruleForm.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
            </el-radio-group>
            
            </div>
      </el-form-item>

      <el-form-item label="年龄 " prop="age"  label-width="150px">
          <el-input
            placeholder="请输入年龄"
            v-model.number.trim="ruleForm.age"
          ></el-input>
      </el-form-item>
      </el-col>

      <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <div style="text-align:center">
      <el-form-item label="学院 " prop="college" label-width="150px">
            <el-input
            disabled
            style="width:500px ;"
              placeholder="请输入学院"
              v-model.trim="ruleForm.college"
            >
            </el-input>
        </el-form-item>
        </div>
    </el-col>

    <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <div style="text-align:center">
      <el-form-item label="专业" prop="major" label-width="150px">
            <el-input
            disabled
            style="width:500px ;"
              placeholder="请输入专业"
              v-model.trim="ruleForm.major"
            >
            </el-input>
        </el-form-item>
        </div>
    </el-col>

    <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24" >
    <div style="text-align:center">
    <el-form-item label="邮箱 " prop="email" label-width="150px">
          <el-input
          style="width:500px ;"
            placeholder="请输入邮箱"
            v-model.trim="ruleForm.email"
          >
          </el-input>
      </el-form-item>
      </div>
      </el-col>

      <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24" >
        <div style="text-align:center">
        <el-form-item label="手机 " prop="phone" label-width="150px">
              <el-input
              style="width:500px ;"
                placeholder="请输入手机"
                v-model.trim="ruleForm.phone"
              >
              </el-input>
          </el-form-item>
          </div>
        </el-col>
      <el-col :span="24" :xs="12" :sm="12" :md="24" :lg="24" :xl="24">
        <el-form-item label-width="150px">
              <div style="text-align: left">
                <el-button type="warning" size="small" @click="honordialogVisible = true" >添加个人荣誉</el-button>
                <el-button type="warning" size="small" @click="introducedialogVisible = true" >添加个人介绍</el-button>
                <el-button type="warning" size="small" @click="imgdialogVisible = true" >更改头像</el-button>
              <el-button type="primary" size="small" @click.prevent="editData()">修改</el-button>
              </div>
        </el-form-item>
     </el-col>
      </el-row>
    </el-form>
    </div>
      </el-col>
    </el-row>
    </el-card>
  <!-- 个人荣誉 -->
    <el-dialog
      title="个人荣誉"
      :visible.sync="honordialogVisible"
      width="30%"
    >
      <vue-editor v-model="ruleForm.honor"></vue-editor>
      <span slot="footer" class="dialog-footer">
        <el-button @click="honordialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="honordialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 个人介绍 -->
    <el-dialog
      title="个人介绍"
      :visible.sync="introducedialogVisible"
      width="30%"
    >
      <vue-editor v-model="ruleForm.introduce"></vue-editor>
      <span slot="footer" class="dialog-footer">
        <el-button @click="introducedialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="introducedialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
        <!-- 更改头像 -->
    <el-dialog
      title="更改头像"
      :visible.sync="imgdialogVisible"
      width="30%"
    >
      <el-upload
      class="avatar-uploader"
      action="http://localhost:8888/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="ruleForm.image" :src="ruleForm.image" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="imgdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="imgdialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
      components: {
    VueEditor
  },
  data(){
    return{
      honordialogVisible:false,
      introducedialogVisible:false,
      imgdialogVisible:false,
      ruleForm: {
      },

      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 2, message: "长度不能少于2个字符", trigger: "blur" },
          { max: 10, message: "长度不能超过10个字符", trigger: "blur" },
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
        name: [
          { required: true, message: "请输入真实性名", trigger: "blur" },
          {
            validator: function (rule, value, callback) {
              //校验中文的正则：/^[\u4e00-\u9fa5]{0,}$/
              if (/^[\u4e00-\u9fa5]+$/.test(value) == false) {
                callback(new Error("请输入中文"));
              } else {
                //校验通过
                callback();
              }
            },
          },
        ],
        age: [
          { required: true, message: "年龄不能为空" ,trigger: "blur" },
          { type: "number", message: "年龄必须为数字值" },
        ],        
        sex: [
          { required: true, message: "性别不能为空", trigger: "blur" },]
      },
    }
  },
  methods:{
     handleAvatarSuccess(res, file) {
         //this.ruleForm.image = URL.createObjectURL(file.raw);
            if(res.status==200){
                 this.ruleForm.image = "http://localhost:8888"+res.data;
                return this.$message.success("上传成功");
            }else{
                return this.$message.error("上传失败");
            }
      },
      beforeAvatarUpload(file) {
       const isJPG = file.type === 'image/jpeg';
            const isGIF = file.type === 'image/gif';
            const isPNG = file.type === 'image/png';
            const isBMP = file.type === 'image/bmp';
            const size = file.size / 1024 / 1024 < 10;
            if (!isJPG && !isGIF && !isPNG && !isBMP) {
                this.common.errorTip('上传图片必须是JPG/GIF/PNG/BMP 格式!');
            }
            if (!size) {
              this.$message.error('上传头像图片大小不能超过 10MB!');
            }
            return (isJPG || isBMP || isGIF || isPNG) &&size;
      },
    async getStudentInfo(id){
      //根据id查询用户信息
            // this.$http.get()
          const {data:res} = await this.$http.get("/editstudent",{params:{"id":id}});
          if(res.status!=200){
              return this.$message.error(res.msg);
          }
          if(res.status==200){
              this.ruleForm = res.data;
              this.value1[0] = this.ruleForm.college;
              this.value1[1] = this.ruleForm.major;
               // this.$message.success(res.msg)     
          }
    },
    async getTeacherInfo(id){
       const {data:res} = await this.$http.get("/editteacher",{params:{"id":id}});
           if(res.status!=200){
                return this.$message.error(res.msg);
            }
            if(res.status==200){
                this.ruleForm = res.data;
                this.value1[0] = this.editForm.college;
                this.value1[1] = this.editForm.major;
               // this.$message.success(res.msg)     
            }
    },
    getInfo(){
      const type = window.sessionStorage.getItem("type");
      if(type=='student'){
        const sid = parseInt(window.sessionStorage.getItem("sid"));
        this.getStudentInfo(sid);
      }else if(type=='teacher'){
         const tid = parseInt(window.sessionStorage.getItem("tid"));
        this.getTeacherInfo(tid);
      }
    },
    //修改学生信息
    async editStudent(){
          const {data:res} = await this.$http.post("/editstudent",this.ruleForm);
          if(res.status!=200){
                return this.$message.error(res.msg);
            }
          if(res.status==200){
              this.$message.success(res.msg)
          }
    },
    //修改老师信息
     async editTeacher(){
        const {data:res} = await this.$http.post("/editteacher",this.ruleForm);
         // console.log(res);
        if(res.status!=200){
          return this.$message.error(res.msg);
        }
        if(res.status==200){
          this.$message.success(res.msg)
        }
      },
      editData(){
        const type = window.sessionStorage.getItem("type");
      if(type=='student'){
        this.editStudent();
      }else if(type=='teacher'){
        this.editTeacher();
      }
      }
    
  },
  created(){
    this.getInfo();
    console.log(this.ruleForm)
  },
}
</script>

<style  scoped>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>