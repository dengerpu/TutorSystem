<template>
  <body>
            <!-- 面包屑导航 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>任务管理</el-breadcrumb-item>
            <el-breadcrumb-item>发布任务</el-breadcrumb-item>
        </el-breadcrumb>

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
                  <el-form-item label="发布人 " prop="author"    label-width="100px">
                    <el-tag  effect="plain"  type="info"  style="width:150px;text-align: left;" > 
                      <i style="text-align: left;font-size:12px;color:#000">{{NoticeForm.author}}</i> </el-tag>
                </el-form-item>
                <el-form-item label="发布时间 " prop="create_time"  label-width="100px" >
                  <div class="block">
                    <el-date-picker
                      disabled
                      size="small"
                      style="width:150px ;"
                      v-model.trim="NoticeForm.create_time"
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
                   <el-button type="primary" size="small"  @click="sendNotice('NoticeForm')">确定发送</el-button>
                   <el-button type="warning" size="small"  @click="sendEmail('NoticeForm')">保存并邮箱通知</el-button>
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
                  <el-form-item label="发布人 " prop="author"    label-width="100px">
                    <el-tag  effect="plain"  type="info"  style="width:150px;text-align: left;" > 
                      <i style="text-align: left;font-size:12px;color:#000">{{ruleForm.author}}</i> </el-tag>
                </el-form-item>
                <el-form-item label="发布时间 " prop="update_time"  label-width="100px" >
                  <div class="block">
                    <el-date-picker
                      disabled
                      size="small"
                      style="width:150px ;"
                      v-model.trim="ruleForm.update_time"
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
                   <el-button type="primary" size="small"  @click.prevent="updateNotice()">确定修改</el-button>
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
              >发布任务</el-button
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
        <!-- <el-tag effect="dark" type="info"  style="font-size:15px; margin:24px;margin-bottom:20px; line-height:0px;">
            <h2>通知记录</h2>
        </el-tag> -->
        <el-button type="info">任务记录</el-button>
    </div>
    <el-table class="mytable" :data="tableData" border>
      <!-- <el-table-column prop="frequency" label="序号" align="center" width="50px" ></el-table-column> -->
        <!-- <el-table-column prop="date" align="center"   sortable label="发布时间"
        :formatter="dataFormat"  ></el-table-column> -->
        <el-table-column prop="update_time" align="center"   sortable label="发布时间"
        :formatter="dataFormat"  ></el-table-column>
        <el-table-column prop="title" align="center" label="公告标题" ></el-table-column>
        <el-table-column align="center"  label="公告内容" >
            <template slot-scope="scope">
              <p v-if="scope.row.content.length>20">请点击详情</p>
              <p v-else>{{scope.row.content}}</p> 
          </template>
        </el-table-column>
        <el-table-column prop="author" align="center"  label="发布人"></el-table-column>
        <el-table-column align="center"  label="附件">
          <template slot-scope="scope">
                 <a :href="scope.row.enclosure">
                   <el-button v-if="scope.row.enclosure!=null" type="primary" size="mini">附件下载<i class="el-icon-download el-icon--right"></i></el-button>
                   </a>  
          </template>
        </el-table-column>
        <el-table-column label="更多">
            <template slot-scope="scope">
              <el-link
               size="small" 
              type="primary"
              @click="getDetails(scope.row.id)"
            > <i class="el-icon-view"></i>查看详情</el-link>
        </template>
      </el-table-column>
        <el-table-column label="操作" width="180px">
        <template slot-scope="scope">
          <el-button size="small" type="primary" icon="el-icon-edit" @click="edit(scope.row.id)"
            >编辑</el-button>
          <el-button
            icon="el-icon-delete"
            type="danger"
            size="small"
            @click="del(scope.row.id)"
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
      :current-page="queryInfo.pagenum"
      :page-sizes="[1,2,5,10]"
      :page-size="queryInfo.pagesize"
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
        _this.NoticeForm.create_time = new Date(); // 修改数据date
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
         //获取用户列表的参数对象
        queryInfo:{
          query:'',
          pagenum:1,  //当前页数
          pagesize:5  //每页显示多少条数据
        },
         ruleForm:{},
         tableData:[],

        currentPage: 1,
        total: null,
        pageSize: 5,
       rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' },
          ]
        },
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
        async getNoticeList(){
            //发送请求获取数据
            const {data:res} = await this.$http.get('/notices',{params:this.queryInfo});
            //console.log(res);
            if(res.status!=200){
                this.tableData = [];
                this.total = 0;
                return this.$message.error(res.msg)
            }else if(res.status==200){
                this.tableData = res.data.list;
                this.total = res.data.totalCount;
            }
        },
        //监听oagesize改变的事件
        handleSizeChange(newSize){
            //console.log(newSize);
            this.queryInfo.pagesize = newSize;
            //再次调用接口查找用户
            this.getNoticeList();
        },
        //监听页码值改变的事件
        handleCurrentChange(newPage){
            //console.log(newPage);
            this.queryInfo.pagenum = newPage;
             //再次调用接口查找用户
             this.getNoticeList();
        },
          //获取老师姓名
      async getTeachName(username){
        const {data:res} = await this.$http.get('/tearname',{params:{"username":username}});
        if(res.status!=200){
              this.NoticeForm.author = "未知"
              return this.$message.error(res.msg)
          }else if(res.status==200){
              this.NoticeForm.author = res.data.name;
              this.NoticeForm.tid = res.data.id;
          }
      },
      //发布通知
      async sendNotice(formName){
         this.$refs[formName].validate( async (valid) => {
              if (valid) {
               //console.log(this.NoticeForm);
                this.NoticeForm.update_time = this.NoticeForm.create_time;
                //console.log(this.NoticeForm)
                  const{data:res}= await this.$http.post("/notices",this.NoticeForm)
                      // console.log(res);
                        if(res.status!=200){
                          return  this.$message.error(res.msg);
                        }
                        if(res.status==200){
                            this.$message.success(res.msg);
                            this.getNoticeList();
                            this.sendNoticeDataDialog = false;
                        }
          } else {
            this.$message.error("必填项未填");
            return false;
          }
        });
      },
      //发布通知并邮箱通知
      async sendEmail(formName){
          this.$refs[formName].validate( async (valid) => {
              if (valid) {
                const username = window.sessionStorage.getItem("username");
                if(username=='admin'){
                    //则向所有用户发送通知
                    this.sendNotice(this.NoticeForm);
                    const {data:res} = await this.$http.get('/sendusers',{params:{"title":this.NoticeForm.title}});
                    if(res.status==200){
                      this.$message.success(res.msg);
                    }else{
                      this.$message.error(res.msg);
                    }
                }else{
                    //老师则只向自己的学生发
                    const tid = parseInt(window.sessionStorage.getItem("tid"));
                    this.sendNotice(this.NoticeForm);
                    const {data:res} = await this.$http.get('/sendmystudent',{params:{"title":this.NoticeForm.title,"tid":tid}});
                    if(res.status==200){
                      this.$message.success(res.msg);
                    }else{
                      this.$message.error(res.msg);
                    }
                }
          } else {
            this.$message.error("必填项未填");
            return false;
          }
        });
      },
      //发布公告展示
    sendNoticeDialog(){
          const username = window.sessionStorage.getItem("username");
          if(username=='admin'){
            this.NoticeForm.author = "管理员"
            this.NoticeForm.tid = 0;
          }else{
            this.getTeachName(username);
          }
          this.sendNoticeDataDialog = true;
        },
         //根据id获取通知详情信息
      async getNoticeById(id){
          const {data:res} = await this.$http.get('/editnotice',{params:{"id":id}});
          //console.log(res);
          if(res.status!=200){
                return this.$message.error(res.msg)
            }else if(res.status==200){
              this.ruleForm = res.data;
              this.$message.success(res.msg)
            }
      },
      edit(id){
        this.getNoticeById(id);
        this.updateNoticeDataDialog = true;
      },
      async updateNotice(){
        this.ruleForm.update_time = new Date();
         // console.log(this.ruleForm);
          const {data:res} = await this.$http.post('/editnotice',this.ruleForm);
          if(res.status!=200){
                return this.$message.error(res.msg)
            }else if(res.status==200){
              this.getNoticeList();
              this.updateNoticeDataDialog = false;
              this.$message.success(res.msg)
            }
      },
      async del(id){
          const confirmResult = await this.$confirm('此操作将永久删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).catch(err=>err);  //相当于err => {return err}
        
          // console.log(confirmResult)
          if(confirmResult != 'confirm'){
              this.$message.info('已取消删除')
          }
           if(confirmResult == 'confirm'){
              const {data:res} = await this.$http.get("/deletenotice",{params:{"id":id}})
              if(res.status!=200){
                return this.$message.error(res.msg);
            }
            if(res.status==200){
                this.$message.success(res.msg)
                this.getNoticeList();
            }
          }
      },
        // 跳转到详情页面
        getDetails(id){
            this.$router.push({path:"/noticedetails",query:{id:id}});
        },
        resetForm(formName) {
         this.$refs[formName].resetFields();
        },


    },
    created(){
        this.getNoticeList();
      // var choice = window.sessionStorage.getItem("choice");
      //   if(choice === "学生"){
      //       this.$router.push({name: "MasterPage"});
      //   }
    }
}
</script>

<style>

</style>