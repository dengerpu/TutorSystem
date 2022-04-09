<template>
    <div id="app">
        <!-- 面包屑导航 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>通知管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加文本</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="文章名称" prop="title" >
                        <el-input v-model="ruleForm.title" width="200px"></el-input>
                    </el-form-item>
                <vue-editor v-model="ruleForm.content"></vue-editor>
                <el-upload
                  class="upload-demo"
                  drag
                  action="http://localhost:8888/upload"
                  :on-success="handleAvatarSuccess"
                  multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div class="el-upload__tip" slot="tip">请上传上传附件</div>
                </el-upload>
                <el-form-item class="from_bottom">
                     <el-button type="warning" icon="el-icon-message">邮箱通知</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
                </el-form>
            
        </el-card>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
    components: {
    VueEditor
  },
  data() {
    return {
        uploadUrl:'',
         ruleForm: {
        },
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
          ],
        },
    };
  },
  methods:{
     //文件上传成功
        handleAvatarSuccess(res, file) {
            if(res.status==200){
                this.uploadUrl = "http://localhost:8888"+res.data;
                return this.$message.success("上传成功");
            }else{
                return this.$message.error("上传失败");
            }
                    
        },
       submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.saveText();
          } else {
            this.$message.error("请输入标题");
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
         //获取老师姓名
      async getTeachName(username){
        const {data:res} = await this.$http.get('/tearname',{params:{"username":username}});
        //console.log(res);
        if(res.status!=200){
              this.ruleForm.author = "未知"
              return this.$message.error(res.msg)
          }else if(res.status==200){
              this.ruleForm.author = res.data.author;
              this.ruleForm.tid = res.data.tid;
          }
      },
        //添加用户
        async saveText(){
           Date.prototype.format = function(fmt) { 
              var o = { 
                  "M+" : this.getMonth()+1,                 //月份 
                  "d+" : this.getDate(),                    //日 
                  "h+" : this.getHours(),                   //小时 
                  "m+" : this.getMinutes(),                 //分 
                  "s+" : this.getSeconds(),                 //秒 
                  "q+" : Math.floor((this.getMonth()+3)/3), //季度 
                  "S"  : this.getMilliseconds()             //毫秒 
              }; 
              if(/(y+)/.test(fmt)) {
                      fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
              }
              for(var k in o) {
                  if(new RegExp("("+ k +")").test(fmt)){
                      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                  }
              }
              return fmt; 
          } 
          const username = window.sessionStorage.getItem("username");
            if(username=='admin'){
              this.ruleForm.author = "管理员"
              this.ruleForm.tid = 0;
            }else{
              this.getTeachName(username);
            }
            //this.ruleForm.update_time = new Date().format("yyyy-MM-dd hh:mm:ss");
            this.ruleForm.update_time = new Date();
            this.ruleForm.create_time = this.ruleForm.update_time;
            this.ruleForm.enclosure = this.uploadUrl;
           // console.log(this.ruleForm);
            const{data:res}= await this.$http.post("/notices",this.ruleForm)
               // console.log(res);
              if(res.status!=200){
                return  this.$message.error(res.msg);
              }
               if(res.status==200){
                  this.$message.success(res.msg);
                  this.ruleForm = {};
                  this.$router.push({path:"/noticeall"});
              }
            
        },
    }
}
</script>

<style lang="less" scoped>
.quillWrapper{
    margin-left: 20px;
}
.from_bottom{
    margin-top: 20px;
}
.upload-demo{
  margin: 20px 0 0 20px;
}

</style>