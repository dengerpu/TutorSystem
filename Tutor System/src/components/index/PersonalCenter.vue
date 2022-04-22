<template>      
  <el-container style="height: 100%; background: white">
      <el-card  class="box-card">
      <el-row>
      <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24" >
      <div style="text-align:center;" ><!--border:1px solid #000 -->

      <el-form :inline="true" :rules="rules" :model="ruleForm" ref="ruleForm" class="demo-form-inline" >
        <el-row > 

          <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div style="text-align:center">
          <el-form-item label="姓名 " prop="realname" label-width="150px">
                <el-input
                style="width:500px ;"
                  placeholder="请输入姓名"
                  v-model.trim="ruleForm.realname"
                >
                </el-input>
                  <div style="text-align:left">
                <p style="text-align: left;font-size:12px;">真实姓名</p>
                </div>
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
                <div style="text-align:left">
                <p style="text-align: left;font-size:12px;">学号/工号</p>
                </div>
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

      <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24" v-show="selectStudent">
      <div style="text-align:center">
      <el-form-item label="班级 " prop="classes" label-width="150px">
            <el-input
            
            style="width:500px ;"
              placeholder="请输入班级"
              v-model.trim="ruleForm.classes"
            >
            </el-input>
        </el-form-item>
        </div>
    </el-col>

      <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24" v-show="selectTeacher">
      <el-form-item label="所管班级: "  label-width="150px">
        <div style="text-align:left;width:500px;" >

        <el-tag :key="tag" v-for="tag in classes" style=" margin-left: 10px" :disable-transitions="false"  
          type="info" ><i>{{tag}}</i></el-tag>

        </div>
        </el-form-item>

    </el-col>

    <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24" >
    <div style="text-align:center">
    <el-form-item label="院系 " prop="dept" label-width="150px" v-show="selectNoLeader">
          <el-input
          style="width:500px ;"
            placeholder="请输入院系"
            v-model.trim="ruleForm.dept"
          >
          </el-input>
      </el-form-item>
      </div>
      </el-col>

      <el-col :span="24" :xs="12" :sm="12" :md="24" :lg="24" :xl="24">
        <el-form-item label="用户类型 " prop="choice"    label-width="150px">
          <el-input
              disabled
            placeholder="请输入用户类型"
            v-model.trim="ruleForm.choice"
          ></el-input>
      </el-form-item>

      <el-form-item label=" " prop="state"  label-width="200px">
            <div style="text-align: left">
            <el-button type="primary" size="small" @click.prevent="editData('ruleForm')">确定发送</el-button>
            </div>
      </el-form-item>
    </el-col>
      </el-row>
    </el-form>
    </div>
      </el-col>
    </el-row>
    </el-card>

  </el-container>
</template>

<script>
export default {
  data(){
 var validateClass = (rule,value,callback) => {
        if (this.ruleForm.choice == "学生"){
          if (!value) {
          return callback(new Error("班级不能为空"));
          } else {
          callback();
        }
        }else {
          callback();
        }
      };
    var validateDept = (rule,value,callback) => {
        if (this.ruleForm.choice == "院领导"
          ||this.ruleForm.choice == "学生"
          || this.ruleForm.choice == "辅导员"){ 
          if (!value) {
            return callback(new Error("院系不能为空"));
            } else {
            callback();
          }
         }else {
            callback();
          }
      };

    return{
      classes:[],
      selectStudent:"", //仅学生可见
      selectTeacher:"",//仅辅导员可见
      selectNoTeacher:"",//仅辅导员不可见
      selectNoLeader:"",//仅教务处不可见
      ruleForm: {
        realname:"",
        username: "",
        age:"",
        sex:"",
        classes:"",
        depts:"",   
        choice:"",
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
        realname: [
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
        dept: [
          { required: true, validator: validateDept, trigger: "blur"},
        ],
        classes: [
         { required: true, validator: validateClass, trigger: "blur"},
        ],
        sex: [
          { required: true, message: "性别不能为空", trigger: "blur" },]
      },
    }
  },
  methods:{
    Hide(choice){
        switch(choice){
         case "学生":
        //  console.log("test")
            this.selectStudent = true;
            this.selectTeacher = false;
            this.selectNoLeader = true;
            this.selectNoTeacher = true;
            break;
          case "辅导员":
            this.selectTeacher = true
            this.selectNoLeader = true;
            this.selectNoTeacher = false;
            break;
          case "教务处":
            this.selectTeacher = true
            this.selectNoTeacher = true;
            this.selectTeacher = false;
            this.selectNoLeader = false;
            break;
        default:
            this.selectStudent = false;
            this.selectTeacher = false;
            this.selectNoLeader = true;
            this.selectNoTeacher = true;
            break;
        }
    },
    findAll(){
      //  const _this = this;
      //   _this.ruleForm.username = window.sessionStorage.getItem("username");

      //   this.$http.get('http://localhost:8181/data/findAllByUsername/'+_this.ruleForm.username).then(function(resp){
      //    _this.ruleForm = resp.data
      // // console.log(_this.value)
      //   this.$http.get('http://localhost:8181/leave/findClass/'+_this.ruleForm.realname).then(function(resp){
      //           _this.classes = resp.data;
      //       }); 
      //    });
     
    },
    editData(formName) {
      const _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {           
        this.$confirm('是否确定修改？', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

        //修改用户基础信息
        axios.post("http://localhost:8181/data/updateData", _this.ruleForm)
        .then(function (resp) {

            switch(resp.data){
            case "empty":
                _this.$message.error("该用户信息不存在！");
          
            break;

            case "success":
            // window.sessionStorage.setItem("loginuser",_this.ruleForm.username);
              _this.$message({message: "修改成功",type: "success",});    
              window.location.reload();
            break;  
            }
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });          
        });
        } else {
          _this.$message.error("请检查输入的信息是否完整！");
          return false;
        }
      });
    },
  },
  created(){
    
      var choice = window.sessionStorage.getItem("choice");
      this.Hide(choice);
      if(choice === "管理员"){
          this.$router.push({name: "MasterPage"});
      }else{
          this.findAll();
      }
  },
}
</script>

<style>

</style>