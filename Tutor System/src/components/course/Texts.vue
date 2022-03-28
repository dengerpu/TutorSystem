<template>
    <div id="app">
        <!-- 面包屑导航 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>课程管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加文本</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="文章名称" prop="title" >
                        <el-input v-model="ruleForm.title" width="200px"></el-input>
                    </el-form-item>
                <el-form-item label="分类">
                    <el-cascader
                        v-model="value"
                        :options="options"
                        :props="{ expandTrigger: 'hover' }"
                        ></el-cascader>
                </el-form-item>
                <!-- <el-form-item label="发布时间" required>
                    <el-col :span="11">
                    <el-form-item prop="date1">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2"></el-col>
                    <el-col :span="11">
                    <el-form-item prop="date2">
                        <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                    </el-form-item>
                    </el-col>
                </el-form-item> -->
                <vue-editor v-model="ruleForm.content"></vue-editor>
                <el-upload
                  class="upload-demo"
                  drag
                  action="http://127.0.0.1:8888/api/private/uploadfile"
                  multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div class="el-upload__tip" slot="tip">请上传上传附件</div>
                </el-upload>
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
         ruleForm: {
        },
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
          ],
        },
         options: [{
          value: '小学',
          label: '小学',
          children: [{
            value: '一年级',
            label: '一年级',
            children: [{
              value: '语文',
              label: '语文'
            }, {
              value: '数学',
              label: '数学'
            }]
          },{
            value: '二年级',
            label: '二年级',
            children: [{
              value: '语文',
              label: '语文'
            }, {
              value: '数学',
              label: '数学'
            }]
          },{
            value: '三年级',
            label: '三年级',
            children: [{
              value: '语文',
              label: '语文'
            }, {
              value: '数学',
              label: '数学'
            }, {
              value: '英语',
              label: '英语'
            }]
          },{
            value: '四年级',
            label: '四年级',
            children: [{
              value: '语文',
              label: '语文'
            }, {
              value: '数学',
              label: '数学'
            }, {
              value: '英语',
              label: '英语'
            }]
          },{
            value: '五年级',
            label: '五年级',
            children: [{
              value: '语文',
              label: '语文'
            }, {
              value: '数学',
              label: '数学'
            }, {
              value: '英语',
              label: '英语'
            }]
          },{
            value: '六年级',
            label: '六年级',
            children: [{
              value: '语文',
              label: '语文'
            }, {
              value: '数学',
              label: '数学'
            }, {
              value: '英语',
              label: '英语'
            }]
          } 
          ]
        }, {
          value: '初中',
          label: '初中',
          children: [{
            value: '初一',
            label: '初一',
            children: [{
              value: '语文',
              label: '语文'
            }, {
              value: '数学',
              label: '数学'
            }, {
              value: '英语',
              label: '英语'
            }, {
              value: '政治',
              label: '政治'
            }, {
              value: '历史',
              label: '历史'
            }, {
              value: '生物',
              label: '生物'
            }, {
              value: '地理',
              label: '地理'
            }]
          }, {
            value: '初二',
            label: '初二',
            children: [{
              value: '语文',
              label: '语文'
            }, {
              value: '数学',
              label: '数学'
            }, {
              value: '英语',
              label: '英语'
            }, {
              value: '政治',
              label: '政治'
            }, {
              value: '历史',
              label: '历史'
            }, {
              value: '生物',
              label: '生物'
            }, {
              value: '地理',
              label: '地理'
            }, {
              value: '物理',
              label: '物理'
            }]
          }, {
             value: '初三',
            label: '初三',
            children: [{
              value: '语文',
              label: '语文'
            }, {
              value: '数学',
              label: '数学'
            }, {
              value: '英语',
              label: '英语'
            }, {
              value: '政治',
              label: '政治'
            }, {
              value: '历史',
              label: '历史'
            }, {
              value: '化学',
              label: '化学'
            }, {
              value: '物理',
              label: '物理'
            }]
          }]
        }, {
          value: '高中',
          label: '高中',
          children: [{
             value: '高一',
            label: '高一',
            children: [{
              value: '语文',
              label: '语文'
            }, {
              value: '数学',
              label: '数学'
            }, {
              value: '英语',
              label: '英语'
            }, {
              value: '政治',
              label: '政治'
            }, {
              value: '历史',
              label: '历史'
            },
            {
              value: '地理',
              label: '地理'
            } ,{
              value: '生物',
              label: '生物'
            },{
              value: '化学',
              label: '化学'
            }, {
              value: '物理',
              label: '物理'
            }]
          }, {
               value: '高二',
            label: '高二',
            children: [{
              value: '语文',
              label: '语文'
            }, {
              value: '数学',
              label: '数学'
            }, {
              value: '英语',
              label: '英语'
            }, {
              value: '政治',
              label: '政治'
            }, {
              value: '历史',
              label: '历史'
            },
            {
              value: '地理',
              label: '地理'
            } ,{
              value: '生物',
              label: '生物'
            },{
              value: '化学',
              label: '化学'
            }, {
              value: '物理',
              label: '物理'
            }]
          }, {
               value: '高三',
            label: '高三',
            children: [{
              value: '语文',
              label: '语文'
            }, {
              value: '数学',
              label: '数学'
            }, {
              value: '英语',
              label: '英语'
            }, {
              value: '政治',
              label: '政治'
            }, {
              value: '历史',
              label: '历史'
            },
            {
              value: '地理',
              label: '地理'
            } ,{
              value: '生物',
              label: '生物'
            },{
              value: '化学',
              label: '化学'
            }, {
              value: '物理',
              label: '物理'
            }]
          }]
            }]
     
    };
  },
  methods:{
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
          if(this.value == null){
            return this.$message.error("请选择年级");
          }
            this.ruleForm.class1 = this.value[0]+'/'+this.value[1]+'/'+this.value[2];
            this.ruleForm.update_time = new Date().format("yyyy-MM-dd hh:mm:ss");
            console.log(this.ruleForm)
           // console.log(this.form)
            const {data:res} = await this.$http.post("/addcontent",this.ruleForm);
         if(!res.flag){
                return this.$message.error(res.errorMsg);
            }
            if(res.flag){
                this.$message.success(res.errorMsg)
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