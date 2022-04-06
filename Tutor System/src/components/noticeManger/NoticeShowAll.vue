<template>
  <body>

    <!-- 修改公告 -->
      <el-dialog
        :visible.sync="showNoticeDataDialog"
        width="60%"
        style="align:center"
        :close-on-click-modal="false"
        @close="resetForm('ruleForm')"
        >
        <el-row>
          <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-form :inline="true"  :model="ruleForm" ref="ruleForm" class="demo-form-inline" >
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
                <el-tag  effect="plain"  type="info"  style="width:500px;text-align: left;" > 
                <i style="text-align: left;font-size:12px;color:#000">{{ruleForm.title}}</i> </el-tag>
                </el-form-item>
                </div>
            </el-col>
            <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <div style="text-align:center">
                <el-form-item label="公告栏 " prop="content">
                <el-tag  effect="plain"  type="info"  style="height:100px;width:500px;text-align: left;" > 
                <i style="text-align: left;font-size:12px;color:#000">{{ruleForm.content}}</i> </el-tag>
                </el-form-item>
                </div>
            </el-col>
         </el-row>
        </el-form>
          </el-col>
        </el-row>


      </el-dialog>

    <el-card style="margin:20px;" class="box-card">
    <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
    <div style="text-align: left; ">
        <el-tag effect="dark" type="info"  style="font-size:15px; margin:24px;margin-bottom:20px;">
            <h2>公告记录</h2>
        </el-tag>


        <el-button v-show="selectAdmin"
          style="margin:20px"
            icon="el-icon-delete"
            type="danger"
            size="small"
            @click="delAll()"
            >删除所有公告信息</el-button>
    </div>
    <el-table class="mytable" :data="tableData" border  :default-sort = "{prop: 'date'}">
        <el-table-column prop="date" align="center" sortable label="发布时间"
        :formatter="dataFormat"  ></el-table-column>
        <el-table-column prop="title" align="center"  label="公告标题" ></el-table-column>
        <el-table-column prop="content" align="center" label="公告内容" ></el-table-column>
        <el-table-column prop="realname" align="center" label="发布人"></el-table-column>
        <el-table-column label="操作" >
        <template slot-scope="scope">
              <el-link
               size="small" 
              type="primary"
              @click="show(scope.row)"
            > <i class="el-icon-view"></i>查看详情</el-link>
          <el-button v-show="selectAdmin"
          style="margin:20px"
            icon="el-icon-delete"
            type="danger"
            size="small"
            @click="del(scope.row)"
            >删除</el-button>
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

    data(){
       return{
         selectAdmin:false,
        ruleForm:{},
        tableData:[],
        showNoticeDataDialog:false,
        currentPage: 1,
        total: null,
        pageSize: 5,

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
        resetForm(formName) {
         this.$refs[formName].resetFields();
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
        show(row){
          this.showNoticeDataDialog = true;
          var _this=this;
          axios.get('http://localhost:8181/notice/showById/'+row.id).then(function(resp){
              _this.ruleForm = resp.data;
              }); 
        },
        findAll(){
            const _this = this;
            axios.get('http://localhost:8181/notice/showAllNotice/'+_this.currentPage+'/'+_this.pageSize).then(function(resp){
            _this.tableData = resp.data.content;
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
       delAll(){
       this.$confirm("此操作将永久删除所有账号信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 数据库...
          const _this = this;
          axios
            .delete("http://localhost:8181/user/deleteAll/")
            .then(function (resp) {
              _this.$alert("所有账号信息均已删除", "消息", {
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
    },
    created(){
        this.findAll();
      var choice = window.sessionStorage.getItem("choice");
        if(choice === "学生"){
           
        }else if(choice === "管理员"){
          this.selectAdmin = true;
        }
        else{
            this.$router.push({name: "MasterPage"});
        }
      }
}
</script>

<style>

</style>