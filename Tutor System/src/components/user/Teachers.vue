<template>
    <div>
        <!-- 面包屑导航 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>教师列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区域 -->
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="4" >
                     <!-- 搜索与添加区域 -->
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getTeacherList">
                        <el-button slot="append" icon="el-icon-search" @click="getTeacherList"></el-button>
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
                    <el-button type="primary" @click="addDialogVisible = true">添加教师</el-button>
                </el-col>
            </el-row>

            <el-table :data="teacherlist" style="width: 100%" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column  label="照片" width="250">
                    <template slot-scope="scope">
                        <img :src="scope.row.photo"></img>
                    </template>
               </el-table-column>
                <el-table-column prop="name" label="姓名" ></el-table-column>
                <el-table-column prop="sex" label="性别" ></el-table-column>
                <el-table-column prop="teacher" label="是否有教师资格证" ></el-table-column>
                <el-table-column prop="age" label="年龄" ></el-table-column>
                <el-table-column prop="class1" label="类别"></el-table-column>
                <el-table-column prop="phone" label="电话"></el-table-column>
                <el-table-column prop="achievement" label="教学成就"></el-table-column>
                <el-table-column prop="describes" label="教学经历"></el-table-column>
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

        <!-- 添加教师的对话框 -->
        <el-dialog
        title="添加教师"
        :visible.sync="addDialogVisible"
        width="50%">
        <!-- 内容主题区域 -->
        <span>
                <el-form ref="addform" :model="addform" label-width="80px">
                <el-form-item label="姓名">
                    <el-input v-model="addform.name"></el-input>
                </el-form-item>
                 <el-form-item label="性别">
                    <el-select v-model="addform.sex" placeholder="请选择性别">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="年龄">
                    <el-input v-model="addform.age"></el-input>
                </el-form-item>
                <el-form-item label="分类" :label-width="formLabelWidth">
                      <el-cascader
                        v-model="value"
                        :options="options"
                        :props="{ expandTrigger: 'hover' }"
                        ></el-cascader>
                  </el-form-item>
                 <el-form-item label="手机号">
                    <el-input v-model="addform.phone"></el-input>
                </el-form-item>
                <el-form-item label="地区">
                   <el-input v-model="addform.zone"></el-input>
                </el-form-item>
                <el-form-item label="是否有教师资格证">
                    <el-select v-model="addform.teacher" placeholder="请选择">
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="教学成就">
                   <el-input v-model="addform.achievement"></el-input>
                </el-form-item>
                <el-form-item label="教学经历">
                   <el-input v-model="addform.describes"></el-input>
                </el-form-item>
                <el-form-item label="个人照片" prop="photo">
                        <el-upload
                            class="avatar-uploader"
                            action="http://localhost:8888/api/private/uploadphoto"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                       </el-upload>
                 </el-form-item>
            </el-form>
        </span>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addTeacher" >确 定</el-button>
        </span>
        </el-dialog>

         <!-- 修改用户的对话框 -->
        <el-dialog
        title="修改用户"
        :visible.sync="editDialogVisible"
        width="50%">
        <!-- 内容主题区域 -->
        <span>
             <el-form ref="addform" :model="editForm" label-width="80px">
                <el-form-item label="姓名">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                 <el-form-item label="性别">
                    <el-select v-model="editForm.sex" placeholder="请选择性别">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="年龄">
                    <el-input v-model="editForm.age"></el-input>
                </el-form-item>
                 <el-form-item label="分类" :label-width="formLabelWidth">
                      <el-cascader
                        v-model="value1"
                        :options="options"
                        :props="{ expandTrigger: 'hover' }"
                        ></el-cascader>
                  </el-form-item>
                 <el-form-item label="手机号">
                    <el-input v-model="editForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="地区">
                   <el-input v-model="editForm.zone"></el-input>
                </el-form-item>
                <el-form-item label="是否有教师资格证">
                    <el-select v-model="editForm.teacher" placeholder="请选择">
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="教学成就">
                   <el-input v-model="editForm.achievement"></el-input>
                </el-form-item>
                <el-form-item label="教学经历">
                   <el-input v-model="editForm.describes"></el-input>
                </el-form-item>
                <el-form-item label="个人照片" prop="photo">
                  <img :src="editForm.photo"></img>
                 </el-form-item>
             </el-form>
        </span>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editTeacher">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
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
            teacherlist: [],//用户数据
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
        async getTeacherList(){
            //发送请求获取数据
           const {data:res} = await this.$http.get('/teacherlist',{params:this.queryInfo});
            console.log(res);
           if(!res.flag){
                    this.teacherlist = [];
                    this.total = 0;
                    return this.$message.error(res.errorMsg)
                }
                if(res.flag){
                    this.teacherlist = res.data.users;
                    this.total = res.data.totalpage;
                }
        },
        //监听oagesize改变的事件
        handleSizeChange(newSize){
            //console.log(newSize);
            this.queryInfo.pagesize = newSize;
            //再次调用接口查找用户
            this.getTeacherList();
        },
        //监听页码值改变的事件
        handleCurrentChange(newPage){
            //console.log(newPage);
            this.queryInfo.pagenum = newPage;
             //再次调用接口查找用户
             this.getTeacherList();
        },
        //添加用户
        async addTeacher(){
          if(this.value == null || this.addform.sex == null|| this.addform.teacher ==null){
            return this.$message.error("请选择");
          }
             this.addform.class1 = this.value[0]+'/'+this.value[1]+'/'+this.value[2];
            const{data:res}= await this.$http.post("/addteacher",this.addform)
            console.log(res);
            if(!res.flag){
               return  this.$message.error(res.errorMsg);
            }
            if(res.flag){
                this.$message.success(res.errorMsg);
                this.getTeacherList();
                this.addDialogVisible = false
            }
            
        },
        //修改对话框事件
        async showeditDialogVisible(id){
            //根据id查询用户信息
            // this.$http.get()
            const {data:res} = await this.$http.get("/editteacher",{params:{"id":id}});
           if(!res.flag){
                return this.$message.error(res.errorMsg);
            }
            if(res.flag){
                this.editForm = res.data;
                this.value1 = this.editForm.class1.split("/");
                this.$message.success(res.errorMsg)     
            }
            this.editDialogVisible = true;
            
        },
        async editTeacher(){
          console.log(this.value1)
          if(this.value1.length == 0){
            return   this.$message.error("请选择年级");
          }
            this.editForm.class1 = this.value1[0]+'/'+this.value1[1]+'/'+this.value1[2];
            console.log(this.editForm)
            const {data:res} = await this.$http.post("/editteacher",this.editForm);
            console.log(res);
            if(!res.flag){
                return this.$message.error(res.errorMsg);
            }
            if(res.flag){
                this.$message.success(res.errorMsg)
                this.editDialogVisible = false;
                this.getTeacherList();
            }
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
              const {data:res} = await this.$http.get("/deleteteacher",{params:{"id":id}})
              if(!res.flag){
                return this.$message.error(res.errorMsg);
            }
            if(res.flag){
                this.$message.success(res.errorMsg)
                this.getTeacherList();
            }
          }
        },
                //条件筛选查询
       async handleChange(){
         this.queryInfo1.query = this.value2[0]+'/'+this.value2[1]+'/'+this.value2[2];
         console.log(this.queryInfo1)
         //发送请求获取数据
           const {data:res} = await this.$http.get('/queryteacher',{params:this.queryInfo1});
           console.log(res)
           if(!res.flag){
                    this.teacherlist = [];
                    this.total = 0;
                    return this.$message.error(res.errorMsg)
                }
                if(res.flag){
                    this.teacherlist = res.data.users;
                    this.total = res.data.totalpage;
                    
                }
       }

    },
    created(){
        this.getTeacherList();
    }
    
}
</script>

<style lang="less" scoped>
.el-pagination{
    margin: 20px 0;
}
.el-dialog__wrapper{
    width: 50%;
    margin: 0 auto;
}
img{
  width: 200px;
  height: 150px;
  padding: 0 10px;
}
</style>