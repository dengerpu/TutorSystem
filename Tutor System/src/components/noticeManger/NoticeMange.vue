<template>
  <body>

      <div>
    <!-- 发布公告 -->
      <el-dialog
        :visible.sync="sendNoticeDataDialog"
        width="60%"
        style="align:center"
        :close-on-click-modal="false"
        @close="resetForm('NoticeForm')"
        >
        <el-row>
          <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-form :inline="true"  :rules="rules"  :model="NoticeForm" ref="NoticeForm" class="demo-form-inline" >
            <el-row > 

              <el-col :span="24" :xs="12" :sm="12" :md="24" :lg="24" :xl="24" >
                  <el-form-item label="发布人 " prop="realname"    label-width="100px">
                    <el-tag  effect="plain"  type="info"  style="width:150px;text-align: left;" > 
                      <i style="text-align: left;font-size:12px;color:#000">{{NoticeForm.realname}}</i> </el-tag>
                </el-form-item>
                <el-form-item label="发布时间 " prop="date"  label-width="100px" >
                  <div class="block">
                    <el-date-picker
                      disabled
                      size="small"
                      style="width:150px ;"
                      v-model.trim="NoticeForm.date"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </div>
                </el-form-item>
              </el-col>

            <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <div style="text-align:center">
                <el-form-item label="标题 " prop="title">
                    <el-input
                    style="width:480px"
                    placeholder="请输入标题"
                    v-model.trim="NoticeForm.title"
                  ></el-input>
                </el-form-item>
                </div>
            </el-col>

            <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <div style="text-align:center">
                <el-form-item label="公告栏 " prop="content">
                    <el-input
                    style="width:500px ;"
                      type="textarea"
                      placeholder="请输入公告内容"
                      v-model.trim="NoticeForm.content"
                      maxlength="1000"
                      show-word-limit
                    >
                    </el-input>
                </el-form-item>
                </div>
            </el-col>

              <el-col :span="24" :xs="12" :sm="12" :md="24" :lg="24" :xl="24">

              <el-form-item label=" " prop="state"  label-width="50px">
                    <div style="text-align: left">
                   <el-button type="primary" size="small"  @click.prevent="sendNotice('NoticeForm')">确定发送</el-button>
                    </div>
              </el-form-item>
            </el-col>
         </el-row>
        </el-form>
          </el-col>
        </el-row>


      </el-dialog>

    <!-- 修改公告 -->
      <el-dialog
        :visible.sync="updateNoticeDataDialog"
        width="60%"
        style="align:center"
        :close-on-click-modal="false"
        @close="resetForm('ruleForm')"
        >
        <el-row>
          <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-form :inline="true"  :rules="rules"  :model="ruleForm" ref="ruleForm" class="demo-form-inline" >
            <el-row > 

              <el-col :span="24" :xs="12" :sm="12" :md="24" :lg="24" :xl="24" >
                  <el-form-item label="发布人 " prop="realname"    label-width="100px">
                    <el-tag  effect="plain"  type="info"  style="width:150px;text-align: left;" > 
                      <i style="text-align: left;font-size:12px;color:#000">{{ruleForm.realname}}</i> </el-tag>
                </el-form-item>
                <el-form-item label="发布时间 " prop="date"  label-width="100px" >
                  <div class="block">
                    <el-date-picker
                      disabled
                      size="small"
                      style="width:150px ;"
                      v-model.trim="ruleForm.date"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
            <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <div style="text-align:center">
                <el-form-item label="标题 " prop="title">
                    <el-input
                    style="width:480px"
                    placeholder="请输入标题"
                    v-model.trim="ruleForm.title"
                  ></el-input>
                </el-form-item>
                </div>
            </el-col>
            <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <div style="text-align:center">
                <el-form-item label="公告栏 " prop="content">
                    <el-input
                    style="width:500px ;"
                      type="textarea"
                      placeholder="请输入公告内容"
                      v-model.trim="ruleForm.content"
                      maxlength="1000"
                      show-word-limit
                    >
                    </el-input>
                </el-form-item>
                </div>
            </el-col>

              <el-col :span="24" :xs="12" :sm="12" :md="24" :lg="24" :xl="24">

              <el-form-item label=" " prop="state"  label-width="50px">
                    <div style="text-align: left">
                   <el-button type="primary" size="small"  @click.prevent="updateNotice('ruleForm')">确定修改</el-button>
                    </div>
              </el-form-item>
            </el-col>
         </el-row>
        </el-form>
          </el-col>
        </el-row>


      </el-dialog>

      </div>

        <el-card style="margin:20px;" class="box-card">
      <div style="text-align: left; ">
        <el-row><el-col>
        <el-form :inline="true"  class="demo-form-inline">

          <el-form-item  >
                  <div style="text-align:left;">
        <el-button plain  type="success" icon="el-icon-s-management" @click="sendNoticeDialog()"
              >发布公告</el-button
            >
        </div>
          </el-form-item>

        </el-form>
      </el-col></el-row>
      </div>
      </el-card>

    <el-card style="margin:20px;" class="box-card">
    <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
    <div style="text-align: left; ">
        <el-tag effect="dark" type="info"  style="font-size:15px; margin:24px;margin-bottom:20px;">
            <h2>旧公告记录</h2>
        </el-tag>
    </div>
    <el-table class="mytable" :data="tableData" border :default-sort = "{prop: 'date'}">
      <!-- <el-table-column prop="frequency" label="序号" align="center" width="50px" ></el-table-column> -->
        <el-table-column prop="date" align="center"   sortable label="发布时间"
        :formatter="dataFormat"  ></el-table-column>
        <el-table-column prop="title" align="center" label="公告标题" ></el-table-column>
        <el-table-column prop="content" align="center"  label="公告内容" ></el-table-column>
         <el-table-column prop="realname" align="center"  label="发布人"></el-table-column>
        <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button size="small" type="primary" icon="el-icon-edit" @click="edit(scope.row)"
            >编辑</el-button>
          <el-button
            icon="el-icon-delete"
            type="danger"
            size="small"
            @click="del(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
   </el-col>
<el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
    <el-pagination
      style="padding-top: 15px;text-align: left;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :v-if="total != 0"
      :current-page="currentPage"
      :page-sizes="[5,15,30,50]"
      :page-size="pageSize"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
  </el-col>
      </el-card>
  </body>
</template>

<script>
export default {
  mounted() {
        let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
        this.timer = setInterval(() => {
        _this.NoticeForm.date = new Date(); // 修改数据date
        }, 1000)
    },
    beforeDestroy() {
        if (this.timer) {
        clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
        }
  },
    data(){
       return{
        sendNoticeDataDialog:false,
        updateNoticeDataDialog:false,
        NoticeForm:{
         date: new Date(),
         content:"",
        },
         ruleForm:{},
         tableData:[],

        currentPage: 1,
        total: null,
        pageSize: 5,
        rules:{
            content: [{ required: true, message: "公告内容不能为空", trigger: "blur" },]
        }
       } 
    },

    methods:{
            //修改时间格式
        dataFormat: function(row,column){
            let data = row[column.property]
            if (data ===null) {
                return ''
            }
            let dt = new Date(data)
            // console.log("dt"+dt);
                return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate()
                // + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
            },
        handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize = val;
          this.findAll();
        },
        handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage = val;
         this.findAll();
        },
        resetForm(formName) {
         this.$refs[formName].resetFields();
        },
        findAll(){
             const _this = this;
            var username = window.sessionStorage.getItem("username");
            axios.get('http://localhost:8181/data/findAllByUsername/'+username).then(function(resp){
                _this.NoticeForm.realname = resp.data.realname;
                var formName = _this.NoticeForm.realname;
            axios.get('http://localhost:8181/notice/showAllNotice/'+_this.currentPage+'/'+_this.pageSize+'/'+formName).then(function(resp){
            _this.tableData = resp.data.content;
            });
        });
        },
        sendNotice(formName){
            const _this = this;
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios.post("http://localhost:8181/notice/sendNotice",_this.NoticeForm)
                    .then(function (resp) {
                switch(resp.data){

                    case "repeat":
                    _this.$message.error("该公告已经发送!请勿重复发送");
                     _this.$refs["NoticeForm"].resetFields();
                    break;

                    case "success":
                    window.location.reload();
                    _this.$message({
                        message: "发送成功！",
                        type: "success",
                    });
                    break; 
                }
              })
                .catch((failResponse) => {});
            } else {
            return false;
            }
            });
        },
        findNotice(){
            var _this=this;
            axios.get('http://localhost:8181/notice/showNotice/').then(function(resp){
                _this.NoticeForm = resp.data;
                }); 
        },
        updateNotice(formName){
             const _this = this;
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios.post("http://localhost:8181/notice/updateNotice",_this.ruleForm)
                    .then(function (resp) {
                switch(resp.data){

                    case "empty":
                    _this.$message.error("该公告内容不存在");
                   
                    break;

                    case "success":
                    window.location.reload();
                    _this.$message({
                        message: "修改成功！",
                        type: "success",
                    });
                    break; 
                }
              })
                .catch((failResponse) => {});
            } else {
            return false;
            }
            });
        },
        edit(row){
            this.updateNoticeDataDialog = true;
             var _this=this;
            axios.get('http://localhost:8181/notice/showById/'+row.id).then(function(resp){
                _this.ruleForm = resp.data;
                }); 
        },
    del(row) {
      this.$confirm("此操作将永久删除该公告信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 数据库...
          const _this = this;
          axios
            .delete("http://localhost:8181/notice/delNotice/" + row.id)
            .then(function (resp) {
              _this.$alert(" 公告《 " + row.title + " 》 已删除！", "消息", {
                confirmButtonTest: "确定",
                callback: (action) => {
                  window.location.reload();}
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    sendNoticeDialog(){
        this.sendNoticeDataDialog = true;
      
    },
    },
    created(){
        this.findAll();
      var choice = window.sessionStorage.getItem("choice");
        if(choice === "学生"){
            this.$router.push({name: "MasterPage"});
        }
      }
}
</script>

<style>

</style>