<template>
    <div>
        <!-- 面包屑导航 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>课程管理</el-breadcrumb-item>
            <el-breadcrumb-item>视频列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="4" >
                     <!-- 搜索与添加区域 -->
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getVideoList">
                        <el-button slot="append" icon="el-icon-search" @click="getVideoList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                   <el-cascader
                        v-model="value2"
                        :options="options"
                        :props="{ expandTrigger: 'hover' }"
                        @change="handleChange"></el-cascader>
                </el-col>
                <el-col :span="4">
                    <el-button size="small" @click="dialogVisible = true" type="primary">点击上传</el-button>
              </el-col>
            </el-row>
          <el-table :data="videolist" border style="width: 100%">
            <el-table-column type="index"></el-table-column>
            <el-table-column  label="视频" width="250">
              <template slot-scope="scope">
                  <video :src="scope.row.url" controls></video>
               </template>
               </el-table-column>
            <el-table-column prop="title" label="标题" width="180"></el-table-column>
            <el-table-column prop="author" label="作者" width="180"></el-table-column>
            <el-table-column prop="class1" label="类别"></el-table-column>
            <el-table-column prop="role" label="权限"></el-table-column>
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showeditDialogVisible(scope.row.id)"></el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeVideoById(scope.row.id)"></el-button>
                    </template>
            </el-table-column>
          </el-table>
         
         <!-- 底部分页功能 -->
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[1, 2, 5, 10]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
        </el-card>

        <el-dialog
            title="上传视频"
            :visible.sync="dialogVisible"
            width="30%"
            >
            <span>
                <el-form :model="form">
                  <el-form-item label="标题" :label-width="formLabelWidth">
                    <el-input v-model="form.title" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="作者" :label-width="formLabelWidth">
                    <el-input v-model="form.author" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="分类" :label-width="formLabelWidth">
                      <el-cascader
                        v-model="value"
                        :options="options"
                        :props="{ expandTrigger: 'hover' }"
                        ></el-cascader>
                  </el-form-item>
                  <el-form-item label="角色" :label-width="formLabelWidth">
                    <el-select v-model="form.role" placeholder="请选择角色">
                    <el-option label="会员" value="vip"></el-option>
                    <el-option label="普通用户" value="ordinary"></el-option>
                    </el-select>
                </el-form-item>
                  <el-upload
                    class="upload-demo"
                    drag
                    action="http://127.0.0.1:8888/api/private/upload"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将视频拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传mp4文件，且不超过500M</div>
                  </el-upload>
              </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addVideo">确 定</el-button>
            </span>
          </el-dialog>

        <!-- 修改视频信息 -->
           <el-dialog
            title="修改视频信息"
            :visible.sync="editdialogVisible"
            width="30%"
            >
            <span>
                <el-form :model="editform">
                  <el-form-item label="标题" :label-width="formLabelWidth">
                    <el-input v-model="editform.title" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="作者" :label-width="formLabelWidth">
                    <el-input v-model="editform.author" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="分类" :label-width="formLabelWidth">
                      <el-cascader
                        v-model="value1"
                        :options="options"
                        :props="{ expandTrigger: 'hover' }"
                        ></el-cascader>
                  </el-form-item>
                  <el-form-item label="角色" :label-width="formLabelWidth">
                    <el-select v-model="editform.role" placeholder="请选择角色">
                    <el-option label="会员" value="vip"></el-option>
                    <el-option label="普通用户" value="ordinary"></el-option>
                    </el-select>
                </el-form-item>
                <div class="videobox">
                      <video :src="editform.url" controls></video>
                </div>
                  
              </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="editdialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="editVideo">确 定</el-button>
            </span>
          </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
      return {
           dialogVisible: false,
           editdialogVisible:false,
            form: {
              title: '',
              author: '',
              url: '',
              date: '',
              role:'',
              class1:'',
            },
            editform:{},
            value:[],
            value1:[],//用于修改
            value2:[],//用于筛选查询
             //获取视频列表的参数对象
            queryInfo:{
                query:'',
                pagenum:1,  //当前页数
                pagesize:5  //每页显示多少条数据
            },
            queryInfo1:{
                query:'',
                pagenum:1,  //当前页数
                pagesize:5  //每页显示多少条数据
            },
            total:0,  //总数据数
            videolist: [],//视频数据
            formLabelWidth: '80px',
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
      }
    },
     methods:{
       async getVideoList(){
          //发送请求获取数据
           const {data:res} = await this.$http.get('/videolist',{params:this.queryInfo});
           if(!res.flag){
                this.videolist = [];
                this.total = 0;
                    return this.$message.error(res.errorMsg)
                    
                }
                if(res.flag){
                    this.videolist = res.data.users;
                    this.total = res.data.totalpage;
                }
       },
        //监听oagesize改变的事件
        handleSizeChange(newSize){
            //console.log(newSize);
            this.queryInfo.pagesize = newSize;
            //再次调用接口查找用户
            this.getVideoList();
        },
        //监听页码值改变的事件
        handleCurrentChange(newPage){
            //console.log(newPage);
            this.queryInfo.pagenum = newPage;
             //再次调用接口查找用户
             this.getVideoList();
        },
        async addVideo(){ 
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
            this.form.class1 = this.value[0]+'/'+this.value[1]+'/'+this.value[2];
            this.form.date = new Date().format("yyyy-MM-dd");
           // console.log(this.form)
            const {data:res} = await this.$http.post("/addvideo",this.form);
         if(!res.flag){
                return this.$message.error(res.errorMsg);
            }
            if(res.flag){
                this.$message.success(res.errorMsg)
                this.dialogVisible = false;
                this.getVideoList();
            }
        
        },
          //修改对话框事件
        async showeditDialogVisible(id){
            //根据id查询用户信息
            // this.$http.get()
            
            const {data:res} = await this.$http.get("/editvideo",{params:{"id":id}});
           // console.log(res);
           if(!res.flag){
                return this.$message.error(res.errorMsg);
            }
            if(res.flag){
                this.editform = res.data;
                this.value1 = this.editform.class1.split("/");
                this.$message.success(res.errorMsg)
                
            }
            this.editdialogVisible = true;
        },
        async editVideo(){
            this.editform.class1 = this.value1[0]+'/'+this.value1[1]+'/'+this.value1[2];
            const {data:res} = await this.$http.post("/editvideo",this.editform);
            if(!res.flag){
                return this.$message.error(res.errorMsg);
            }
            if(res.flag){
                this.$message.success(res.errorMsg)
                this.editdialogVisible = false;
                this.getVideoList();
            }
        },
        //根据ID删除视频
        async removeVideoById(id){
            const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).catch(err=>err);  //相当于err => {return err}
        
          // console.log(confirmResult)
          if(confirmResult != 'confirm'){
              this.$message.info('已取消删除')
          }
           if(confirmResult == 'confirm'){
              const {data:res} = await this.$http.get("/deletevideo",{params:{"id":id}})
              if(!res.flag){
                return this.$message.error(res.errorMsg);
            }
            if(res.flag){
                this.$message.success(res.errorMsg)
                this.getVideoList();
            }
          }
        },
        //条件筛选查询
       async handleChange(){
         this.queryInfo1.query = this.value2[0]+'/'+this.value2[1]+'/'+this.value2[2];
         //发送请求获取数据
           const {data:res} = await this.$http.get('/queryvideo',{params:this.queryInfo1});
           console.log(res)
           if(!res.flag){
                    this.videolist = [];
                    this.total = 0;
                    return this.$message.error(res.errorMsg)
                }
                if(res.flag){
                    this.videolist = res.data.users;
                    this.total = res.data.totalpage;
                    
                }
       }
      } ,
      created(){
        this.getVideoList();
    }
    
}
</script>

<style lang="less" scoped>
.upload-demo{
  margin-left: 50px!important;
}
video{
  width: 200px;
  height:150px;
  padding: 0 10px;
}
.videobox{
  margin-left: 60px;
}
</style>