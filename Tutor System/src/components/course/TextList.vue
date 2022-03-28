<template>
    <div id="app">
        <!-- 面包屑导航 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>课程管理</el-breadcrumb-item>
            <el-breadcrumb-item>文本列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
              <el-row :gutter="20">
                <el-col :span="4" >
                     <!-- 搜索与添加区域 -->
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getTextList">
                        <el-button slot="append" icon="el-icon-search" @click="getTextList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                   <el-cascader
                        v-model="value2"
                        :options="options"
                        :props="{ expandTrigger: 'hover' }"
                        @change="handleChange"></el-cascader>
                </el-col>
            </el-row>

            <el-table :data="TextList" style="width: 100%" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="title" label="标题" ></el-table-column>
                <el-table-column prop="content" label="内容" ></el-table-column>
                <el-table-column prop="update_time" label="更新时间" ></el-table-column>
                <el-table-column prop="class1" label="类别"></el-table-column>
                 <el-table-column  label="附件">
                    <template slot-scope="scope">
                        <a :href="scope.row.fileUrl">{{scope.row.fileName}}</a>  
                    </template>
                   
                </el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showeditDialogVisible(scope.row.id)"></el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeTeacherById(scope.row.id)"></el-button>
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
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
    components: {
    VueEditor
  },
 
  data(){
        return{
            //获取用户列表的参数对象
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
            value:[],
            value1:[],//用于修改
            value2:[],//用于筛选查询
            formLabelWidth: '80px',
            total:0,  //总数据数
            TextList: [],//用户数据
            imageUrl: '',
          addDialogVisible:false, //控制添加对话框的显示与隐藏
            editDialogVisible:false,
            editForm:{
            }, //查询到的用户信息
             addform: {  //添加的用户信息
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
        }
    },
    methods:{
         handleAvatarSuccess(res, file) {
                    this.imageUrl = URL.createObjectURL(file.raw);
                },
                beforeAvatarUpload(file) {
                    const isJPG = file.type === 'image/jpeg';
                    const isLt2M = file.size / 1024 / 1024 < 2;

                    if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                    }
                    if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                    }
                    return isJPG && isLt2M;
                },
        async getTextList(){
            //发送请求获取数据
           const {data:res} = await this.$http.get('/contentlist',{params:this.queryInfo});
            console.log(res);
           if(!res.flag){
                    this.TextList = [];
                    this.total = 0;
                    return this.$message.error(res.errorMsg)
                }
                if(res.flag){
                  this.TextList = res.data.users;
                    this.total = res.data.totalpage;
                   for (let index = 0; index <this.TextList.length; index++) {
                      const element = this.TextList[index];
                      if(element.fileUrl!=null){
                          const arr = element.fileUrl.split("/");
                          //this.TextList.file = arr[arr.length-1];
                          this.TextList[index].fileName = arr[arr.length-1];
                      }else{
                          this.TextList[index].fileName = '';
                      }
                    }
                    console.log(this.TextList)
                  
                }
        },
        //监听oagesize改变的事件
        handleSizeChange(newSize){
            //console.log(newSize);
            this.queryInfo.pagesize = newSize;
            //再次调用接口查找用户
            this.getTextList();
        },
        //监听页码值改变的事件
        handleCurrentChange(newPage){
            //console.log(newPage);
            this.queryInfo.pagenum = newPage;
             //再次调用接口查找用户
             this.getTextList();
        },
        //根据ID删除用户
        async removeTeacherById(id){
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
              const {data:res} = await this.$http.get("/deletecontent",{params:{"id":id}})
              if(!res.flag){
                return this.$message.error(res.errorMsg);
            }
            if(res.flag){
                this.$message.success(res.errorMsg)
                this.getTextList();
            }
          }
        },
                //条件筛选查询
       async handleChange(){
         this.queryInfo1.query = this.value2[0]+'/'+this.value2[1]+'/'+this.value2[2];
         //发送请求获取数据
           const {data:res} = await this.$http.get('/querycontent',{params:this.queryInfo1});
           if(!res.flag){
                    this.TextList = [];
                    this.total = 0;
                    return this.$message.error(res.errorMsg)
                }
                if(res.flag){

                    this.TextList = res.data.users;

                    //console.log(this.TextList)
                    this.total = res.data.totalpage;
                    
                }
       }

    },
    created(){
        this.getTextList();
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

</style>