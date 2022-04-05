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
                    <el-button type="primary" @click="addTeacher">添加教师</el-button>
                </el-col>
            </el-row>

            <el-table :data="teacherlist" style="width: 100%" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column  label="照片" width="250">
                    <template slot-scope="scope">
                        <img :src="scope.row.image"></img>
                    </template>
               </el-table-column>
                <el-table-column prop="username" label="工号" ></el-table-column>
                <el-table-column prop="name" label="姓名" ></el-table-column>
                <el-table-column prop="sex" label="性别" ></el-table-column>
                <el-table-column prop="age" label="年龄" ></el-table-column>
                <el-table-column prop="college" label="学院" ></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="phone" label="联系方式"></el-table-column>
                <el-table-column prop="interest" label="研究方向"></el-table-column>
                <el-table-column prop="" label="更多">
                    <template slot-scope="scope">
                      <el-link type="primary" @click="getDetails(scope.row.id)">详情</el-link>
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

        <!-- 添加教师的对话框 -->
        <el-dialog
        title="添加教师"
        :visible.sync="addDialogVisible"
        width="50%">
        <!-- 内容主题区域 -->
        <span>
                <el-form ref="addform"  :model="addform" label-width="80px">
                <el-form-item label="工号">
                    <el-input v-model="addform.username"></el-input>
                </el-form-item>
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
                <el-form-item label="学院" :label-width="formLabelWidth">
                      <el-cascader
                        v-model="value"
                        :options="options"
                        :props="{ expandTrigger: 'hover' }"
                        ></el-cascader>
                  </el-form-item>
                 <el-form-item label="手机号">
                    <el-input v-model="addform.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                   <el-input v-model="addform.email"></el-input>
                </el-form-item>
                <el-form-item label="研究方向">
                   <el-input v-model="addform.interest"></el-input>
                </el-form-item>
                <el-form-item label="个人简介">
                   <el-input v-model="addform.introduce"></el-input>
                </el-form-item>
                <el-form-item label="个人荣誉">
                    <el-input v-model="addform.honor" ></el-input>
                </el-form-item>
                <el-form-item label="个人照片" prop="photo">
                        <el-upload
                            class="avatar-uploader"
                            action="http://localhost:8888/upload"
                            accept="image/jpeg,image/gif,image/png,image/bmp"
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
            <el-button type="primary" @click="addTeacherPOST" >确 定</el-button>
        </span>
        </el-dialog>

         <!-- 修改用户的对话框 -->
        <el-dialog
        title="修改用户"
        :visible.sync="editDialogVisible"
        width="50%">
        <!-- 内容主题区域 -->
        <span>
             <el-form ref="editForm" :model="editForm" label-width="80px">
               <el-form-item label="工号">
                    <el-input v-model="editForm.username"></el-input>
                </el-form-item>
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
                <el-form-item label="学院" :label-width="formLabelWidth">
                      <el-cascader
                        v-model="value1"
                        :options="options"
                        :props="{ expandTrigger: 'hover' }"
                        ></el-cascader>
                  </el-form-item>
                 <el-form-item label="手机号">
                    <el-input v-model="editForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                   <el-input v-model="editForm.email"></el-input>
                </el-form-item>
                <el-form-item label="研究方向">
                   <el-input v-model="editForm.interest"></el-input>
                </el-form-item>
                <el-form-item label="个人简介">
                   <el-input v-model="editForm.introduce"></el-input>
                </el-form-item>
                <el-form-item label="个人荣誉">
                    <el-input v-model="editForm.honor" ></el-input>
                </el-form-item>
                <el-form-item label="个人照片" prop="photo">
                        <el-upload
                            class="avatar-uploader"
                            action="http://localhost:8888/upload"
                            accept="image/jpeg,image/gif,image/png,image/bmp"
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
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editTeacher">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
              //自定义手机号码验证
        var checkPhone = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('手机号不能为空'));
                } else {
                    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
                    //console.log(reg.test(value));
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error('请输入正确的手机号'));
                    }
                }
        };
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
            uploadImageUrl:'',//上传文件的路径
            addDialogVisible:false, //控制添加对话框的显示与隐藏
            editDialogVisible:false,
            editForm:{
            }, //查询到的用户信息
             addform: {  //添加的用户信息
             college:''
            },
            options: [
              {
                label: '机械工程学院',
                value: '机械工程学院',
                children: [
                  {
                    label: '机械电子工程',
                    value: '机械电子工程'
                  },
                  {
                    label: '材料成型及控制工程',
                    value: '材料成型及控制工程'
                  },
                  {
                    label: '机械设计制造及其自动化',
                    value: '机械设计制造及其自动化'
                  },
                  {
                    label: '汽车服务工程',
                    value: '汽车服务工程'
                  },
                  {
                    label: '工业设计',
                    value: '工业设计'
                  },
                  {
                    label: '飞行器制造工程',
                    value: '飞行器制造工程'
                  },
                  {
                    label: '飞行器适航技术',
                    value: '飞行器适航技术'
                  },
                  {
                    label: '机电一体化技术',
                    value: '机电一体化技术'
                  }
                ]
              },
              {
                label: '电子信息与电气工程学院',
                value: '电子信息与电气工程学院',
                children: [
                  {
                    label: '自动化',
                    value: '自动化'
                  },
                  {
                    label: '电子信息工程',
                    value: '电子信息工程'
                  },
                  {
                    label: '通信工程',
                    value: '通信工程'
                  },
                  {
                    label: '电气工程及其自动化',
                    value: '电气工程及其自动化'
                  },
                  {
                    label: '机器人工程',
                    value: '机器人工程'
                  },
                  {
                    label: '电气自动化技术',
                    value: '电气自动化技术'
                  }
                ]
              },
              {
                label: '计算机科学与信息工程学院',
                value: '计算机科学与信息工程学院',
                children: [
                  {
                    label: '计算机科学与技术',
                    value: '计算机科学与技术'
                  },
                  {
                    label: '网络工程',
                    value: '网络工程'
                  },
                  {
                    label: '软件工程',
                    value: '软件工程'
                  },
                  {
                    label: '物联网工程',
                    value: '物联网工程'
                  },
                  {
                    label: '信息管理与信息系统',
                    value: '信息管理与信息系统'
                  },
                  {
                    label: '数据科学与大数据技术',
                    value: '数据科学与大数据技术'
                  },
                  {
                    label: '计算机应用技术',
                    value: '计算机应用技术'
                  },
                  {
                    label: '软件技术',
                    value: '软件技术'
                  }
                ]
              },
              {
                label: '土木与建筑工程学院',
                value: '土木与建筑工程学院',
                children: [
                  {
                    label: '土木工程',
                    value: '土木工程'
                  },
                  {
                    label: '工程管理',
                    value: '工程管理'
                  },
                  {
                    label: '建筑学',
                    value: '建筑学'
                  },
                  {
                    label: '给排水科学与工程',
                    value: '给排水科学与工程'
                  },
                  {
                    label: '城乡规划',
                    value: '城乡规划'
                  },
                  {
                    label: '建筑工程技术',
                    value: '建筑工程技术'
                  }
                ]
              },
              {
                label: '化学与环境工程学院',
                value: '化学与环境工程学院',
                children: [
                  {
                    label: '化学工程与工艺',
                    value: '化学工程与工艺'
                  },
                  {
                    label: '应用化学',
                    value: '应用化学'
                  },
                  {
                    label: '环境工程',
                    value: '环境工程'
                  },
                  {
                    label: '高分子材料与工程',
                    value: '高分子材料与工程'
                  },
                  {
                    label: '应用化工技术',
                    value: '应用化工技术'
                  }
                ]
              },
              {
                label: '生物与食品工程学院',
                value: '生物与食品工程学院',
                children: [
                  {
                    label: '食品科学与工程',
                    value: '食品科学与工程'
                  },
                  {
                    label: '食品质量与安全',
                    value: '食品质量与安全'
                  },
                  {
                    label: '生物工程',
                    value: '生物工程'
                  },
                  {
                    label: '生物技术',
                    value: '生物技术'
                  },
                  {
                    label: '动物医学',
                    value: '动物医学'
                  },
                  {
                    label: '农业生物技术',
                    value: '农业生物技术'
                  },
                  {
                    label: '畜牧兽医',
                    value: '畜牧兽医'
                  }
                ]
              },
              {
                label: '数理学院',
                value: '数理学院',
                children: [
                  {
                    label: '信息与计算科学',
                    value: '信息与计算科学'
                  },
                  {
                    label: '应用物理学',
                    value: '应用物理学'
                  },
                  {
                    label: '新能源材料与器件',
                    value: '新能源材料与器件'
                  }
                ]
              },
              {
                label: '飞行学院',
                value: '飞行学院',
                children: [
                  {
                    label: '飞行技术',
                    value: '飞行技术'
                  },
                  {
                    label: '物流管理',
                    value: '物流管理'
                  },
                  {
                    label: '安全工程',
                    value: '安全工程'
                  },
                  {
                    label: '交通运输',
                    value: '交通运输'
                  },
                  {
                    label: '直升机驾驶技术',
                    value: '直升机驾驶技术'
                  },
                  {
                    label: '民航空中安全保卫',
                    value: '民航空中安全保卫'
                  }
                ]
              },
              {
                label: '经济管理学院',
                value: '经济管理学院',
                children: [
                  {
                    label: '会计学',
                    value: '会计学'
                  },
                  {
                    label: '工商管理',
                    value: '工商管理'
                  },
                  {
                    label: '财务管理',
                    value: '财务管理'
                  },
                  {
                    label: '国际经济与贸易',
                    value: '国际经济与贸易'
                  },
                  {
                    label: '市场营销',
                    value: '市场营销'
                  },
                  {
                    label: '电子商务',
                    value: '电子商务'
                  },
                  {
                    label: '会计',
                    value: '会计'
                  }
                ]
              },
              {
                label: '文法学院',
                value: '文法学院',
                children: [
                  {
                    label: '社会工作',
                    value: '社会工作'
                  },
                  {
                    label: '知识产权',
                    value: '知识产权'
                  },
                  {
                    label: '播音与主持艺术',
                    value: '播音与主持艺术'
                  },
                  {
                    label: '广播电视编导',
                    value: '广播电视编导'
                  },
                  {
                    label: '新闻采编与制作',
                    value: '新闻采编与制作'
                  }
                ]
              },
              {
                label: '外国语学院',
                value: '外国语学院',
                children: [
                  {
                    label: '英语',
                    value: '英语'
                  },
                  {
                    label: '商务英语',
                    value: '商务英语'
                  },
                  {
                    label: '汉语国际教育',
                    value: '汉语国际教育'
                  },
                  {
                    lable: '应用英语',
                    value: '应用英语'
                  }
                ]
              },
              {
                label: '艺术设计学院',
                value: '艺术设计学院',
                children: [
                  {
                    label: '视觉传达设计',
                    value: '视觉传达设计'
                  },
                  {
                    label: '环境设计',
                    value: '环境设计'
                  },
                  {
                    label: '产品设计',
                    value: '产品设计'
                  },
                  {
                    label: '动画',
                    value: '动画'
                  },
                  {
                    label: '绘画',
                    value: '绘画'
                  },
                  {
                    label: '视觉传播设计与制作',
                    value: '视觉传播设计与制作'
                  }
                ]
              },
              {
                label: '国际教育学院',
                value: '国际教育学院',
                children: [
                  {
                    label: '土木工程',
                    value: '土木工程'
                  },
                  {
                    label: '城乡规划',
                    value: '城乡规划'
                  }
                ]
              }
			      ]
        }
    },
    methods:{
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            if(res.status==200){
                this.uploadImageUrl = "http://localhost:8888"+res.data;
                return this.$message.success("上传成功");
            }else{
                return this.$message.error("上传失败");
            }
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isGIF = file.type === 'image/gif';
            const isPNG = file.type === 'image/png';
            const isBMP = file.type === 'image/bmp';
            const size = file.size / 1024 / 1024 < 10;
            if (!isJPG && !isGIF && !isPNG && !isBMP) {
                this.common.errorTip('上传图片必须是JPG/GIF/PNG/BMP 格式!');
            }
            if (!size) {
              this.$message.error('上传头像图片大小不能超过 10MB!');
            }
            return (isJPG || isBMP || isGIF || isPNG) &&size;
        },
        async getTeacherList(){
            //发送请求获取数据
           const {data:res} = await this.$http.get('/teachers',{params:this.queryInfo});
           //console.log(res);
           if(res.status!=200){
                this.teacherlist = [];
                this.total = 0;
                return this.$message.error(res.msg)
            }else if(res.status==200){
                this.teacherlist = res.data.list;
                this.total = res.data.totalCount;
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
        addTeacher(){
                this.addDialogVisible = true;      
        },
        async addTeacherPOST(){
                this.addform.college = this.value[0];
                this.addform.major = this.value[1];
                this.addform.image = this.uploadImageUrl;
                const{data:res}= await this.$http.post("/teachers",this.addform)
                if(res.status!=200){
                  return  this.$message.error(res.msg);
                }
                if(res.status==200){
                     this.value = [];
                    this.$message.success(res.msg);
                    this.getTeacherList();
                    this.addDialogVisible = false;
                }
        },
        //修改对话框事件
        async showeditDialogVisible(id){
            //根据id查询用户信息
            // this.$http.get()
            const {data:res} = await this.$http.get("/editteacher",{params:{"id":id}});
           if(res.status!=200){
                return this.$message.error(res.msg);
            }
            if(res.status==200){
                this.editForm = res.data;
                this.value1[0] = this.editForm.college;
                this.value1[1] = this.editForm.major;
               // this.$message.success(res.msg)     
            }
            this.editDialogVisible = true;
            
        },
        async editTeacher(){
         // console.log(this.value1)
          if(this.value1.length == 0){
            return   this.$message.error("请选择学院");
          }
          this.editForm.college = this.value1[0];
          this.editForm.major = this.value1[1];
          this.editForm.image = this.uploadImageUrl;
         // console.log(this.editForm);
          const {data:res} = await this.$http.post("/editteacher",this.editForm);
         // console.log(res);
          if(res.status!=200){
                return this.$message.error(res.msg);
            }
          if(res.status==200){
              this.value1 = [];
              this.$message.success(res.msg)
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
              if(res.status!=200){
                return this.$message.error(res.msg);
            }
            if(res.status==200){
                this.$message.success(res.msg)
                this.getTeacherList();
            }
          }
        },
       // 跳转到详情页面
        getDetails(id){
            this.$router.push({path:"/userdetails",query:{id:id,type:'teacher'}});
            //console.log(id);
        },
                //条件筛选查询
       async handleChange(){
         this.queryInfo1.query = this.value2[0]+'/'+this.value2[1];
         console.log(this.queryInfo1)
         //发送请求获取数据
          //  const {data:res} = await this.$http.get('/queryteacher',{params:this.queryInfo1});
          //  console.log(res)
          //  if(!res.flag){
          //           this.teacherlist = [];
          //           this.total = 0;
          //           return this.$message.error(res.errorMsg)
          //       }
          //       if(res.flag){
          //           this.teacherlist = res.data.users;
          //           this.total = res.data.totalpage;
                    
          //       }
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