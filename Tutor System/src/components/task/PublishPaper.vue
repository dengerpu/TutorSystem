<template>
    <div id="app">
        <!-- 面包屑导航 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>任务管理</el-breadcrumb-item>
            <el-breadcrumb-item>提交任务</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="标题" prop="title" >
                        <el-input v-model="ruleForm.title" width="200px"></el-input>
                    </el-form-item>
                     <el-form-item label="类型" prop="type" >
                       <el-select v-model="ruleForm.type" placeholder="请选择类型">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="内容" prop="content">
                        <vue-editor v-model="ruleForm.content"></vue-editor>
                    </el-form-item>
                    <el-form-item label="上传文件">
                      <el-upload
                        class="upload-demo"
                        drag
                        action="http://localhost:8888/upload"
                        :on-success="handleAvatarSuccess"
                        multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                      </el-upload>
                    </el-form-item>
                <el-form-item class="from_bottom">
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
        options: [{
          value: '课题申报表、审核表',
          label: '课题申报表、审核表'
        }, {
          value: '任务书',
          label: '任务书'
        }, {
          value: '开题报告',
          label: '开题报告'
        }, {
          value: '毕业论文',
          label: '毕业论文'
        }],
        value: '',
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
          ],
          type: [
            { required: true, message: '请输入类型', trigger: 'blur' },
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' },
          ]
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
              this.uploadUrl = null;
                return this.$message.error("上传失败");
            }
                    
        },
       submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.saveText();
          } else {
            this.$message.error("请输入内容");
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
         //获取学生姓名
      async getStudentName(id){
        const {data:res} = await this.$http.get('/editstudent',{params:{"id":id}});
       if(res.status!=200){
              this.ruleForm.author = "未知"
              return this.$message.error(res.msg)
          }else if(res.status==200){
              this.ruleForm.author = res.data.name;
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
            //this.ruleForm.update_time = new Date().format("yyyy-MM-dd hh:mm:ss");
            this.ruleForm.create_time = new Date();
            this.ruleForm.update_time = this.ruleForm.create_time;
            this.ruleForm.enclosure = this.uploadUrl;
            //console.log(this.ruleForm);
            const{data:res}= await this.$http.post("/papers",this.ruleForm)
               // console.log(res);
              if(res.status!=200){
                return  this.$message.error(res.msg);
              }
               if(res.status==200){
                  this.$message.success(res.msg);
                  this.ruleForm = {};
                  this.$router.push({path:"/paper"});
              }    
        },
    },
    created(){
      this.ruleForm.sid = parseInt(window.sessionStorage.getItem("sid"));
      this.getStudentName(this.ruleForm.sid);
    }
}
</script>

<style lang="less" scoped>
.el-select{
  width: 100%;
}
.quillWrapper{
    margin-left: 20px;
}
.from_bottom{
    margin-top: 20px;
}
.el-upload{
  display: block!important;
  float: left;
}

</style>