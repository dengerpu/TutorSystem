<template>
    <div>
        <!-- 面包屑导航 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>分配管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区域 -->
        <el-card class="box-card">
            <el-row :gutter="24">
                <el-col :span="1" >
                   <el-button  :type="buttontype1" @click="getTeacher">老师</el-button>
                </el-col>
                <el-col :span="4">
                    <el-button  :type="buttontype2" @click="getStudent">学生</el-button>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" >添加教师</el-button>
                </el-col>
            </el-row>

            <el-table :data="list" style="width: 100%" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="username" label="工号" ></el-table-column>
                <el-table-column prop="name" label="姓名" ></el-table-column>
                <el-table-column prop="college" label="学院" ></el-table-column>
                <el-table-column prop="major" label="专业" ></el-table-column>
                <el-table-column v-if="buttontype1=='success'" prop="quota" label="招生名额" ></el-table-column>
                <el-table-column v-if="buttontype1=='success'" prop="already" label="已录名额" ></el-table-column>
                <el-table-column v-if="buttontype1=='success'" label="空余名额" >
                    <template slot-scope="scope">
                      {{scope.row.quota - scope.row.already}}
                    </template>
                </el-table-column>
                <el-table-column v-if="buttontype2=='success'" prop="turtor" label="导师" ></el-table-column>
                <el-table-column prop="" label="更多">
                    <template slot-scope="scope">
                      <el-link type="primary" @click="getDetails(scope.row.id)">详情</el-link>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="260px">
                    <template slot-scope="scope">
                       <el-button type="warning" v-if="buttontype1=='success'" size="mini" @click="AssignQuota(scope.row.id)">分配名额</el-button>
                       <el-button type="primary" v-if="buttontype1=='success'" size="mini" icon="el-icon-s-tools" @click="AssignStudent(scope.row.id)">分配学生</el-button>
                        <el-button type="primary" v-if="buttontype2=='success'" icon="el-icon-s-tools" @click="AssignTurtor(scope.row.id)">分配导师</el-button>
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

        <!-- 更改老师招生名额的对话框 -->
        <el-dialog
        title="分配学生"
        :visible.sync="addQuotaVisible"
        width="50%">
        <!-- 内容主题区域 -->
        <span>
               
                <el-form  label-width="80px">
                <el-form-item label="招生名额" :label-width="formLabelWidth">
                  <el-select v-model="quota" placeholder="请选择名额">
                    <el-option
                      v-for="item in quotaSelect"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
            </el-form>
        </span>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="addQuotaVisible = false">取 消</el-button>
            <el-button type="primary" @click="AssignQuotaPOST" >确 定</el-button>
        </span>
        </el-dialog>

        <!-- 分配学生的对话框 -->
        <el-dialog
        title="分配学生"
        :visible.sync="addDialogVisible"
        width="50%">
        <!-- 内容主题区域 -->
        <span>
               
                <el-form ref="addform"  :model="addform" label-width="80px">
                <el-form-item label="学院" :label-width="formLabelWidth">
                      <el-cascader
                        v-model="queryValue"
                        :options="options"
                        :props="{ expandTrigger: 'hover' }"
                        @change="getStudentInfo"
                        ></el-cascader>
                </el-form-item>
                <el-form-item label="学生" :label-width="formLabelWidth">
                  <el-select v-model="StudentId" placeholder="请选择学生">
                    <el-option
                      v-for="item in stuList"
                      :key="item.id"
                      :label="item.username+item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
            </el-form>
        </span>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="AssignStudentPOST" >确 定</el-button>
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
             </el-form>
        </span>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="">确 定</el-button>
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
            queryCollegeAndMajor:{
              college:'',
              major:'',
              pagenum:1,  //当前页数
              pagesize:5  //每页显示多少条数据
            },
            buttontype1:'success',
            buttontype2:'',
            value:[],
            queryValue:[],
            value1:[],//用于修改
            value2:[],//用于筛选查询
            formLabelWidth: '80px',
            total:0,  //总数据数
            list: [],//用户数据
            stuList:[],
            StudentId:'',
            addQuotaVisible:false,  //控制分配导师名额对话框的显示与隐藏
            addDialogVisible:false, //控制添加对话框的显示与隐藏
            editDialogVisible:false,
            editForm:{
            }, //查询到的用户信息
             addform: {  //添加的用户信息
             college:''
            },
            editQuota:{ //修改招生名额提交的表单
              id:'',
              quota:'',
              sid:'',
              tid:''
            },
            quota:6,//招生名额
            quotaSelect: [{
                value: 1,
                label: '1'
              }, {
                value: 2,
                label: '2'
              }, {
                value: 3,
                label: '3'
              }, {
                value: 4,
                label: '4'
              }, {
                value: 5,
                label: '5'
              },
              {
                value: 6,
                label: '6'
              }, {
                value: 7,
                label: '7'
              }, {
                value: 8,
                label: '8'
              }, {
                value: 9,
                label: '9'
              }, {
                value: 10,
                label: '10'
              }
              ],
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
        async getTeacherList(){
            //发送请求获取数据
           const {data:res} = await this.$http.get('/teas',{params:this.queryInfo});
           console.log(res);
           if(res.status!=200){
                this.list = [];
                this.total = 0;
                return this.$message.error(res.msg)
            }else if(res.status==200){
                this.list = res.data.list;
                this.total = res.data.totalCount;
            }
        },
        async getStudentList(){
            //发送请求获取数据
           const {data:res} = await this.$http.get('/stuandtea',{params:this.queryInfo});
           console.log(res);
           if(res.status!=200){
                this.list = [];
                this.total = 0;
                return this.$message.error(res.msg)
            }else if(res.status==200){
                this.list = res.data.list;
                this.total = res.data.totalCount;
            }
        },
        //获取教师列表
        getTeacher(){
            this.buttontype1 = "success";
            this.buttontype2 = "";
            this.getTeacherList();

        },
        //获取学生列表
        getStudent(){
            this.buttontype1 = "";
            this.buttontype2 = "success";
            this.getStudentList();

        },
        //监听oagesize改变的事件
        handleSizeChange(newSize){
            //console.log(newSize);
            this.queryInfo.pagesize = newSize;
            //再次调用接口查找用户
            if(this.buttontype1 == "success"){
               this.getTeacherList();
            }
            if(this.buttontype2 =="success"){
              this.getStudentList();
            }
           
        },
        //监听页码值改变的事件
        handleCurrentChange(newPage){
            //console.log(newPage);
            this.queryInfo.pagenum = newPage;
             //再次调用接口查找用户
            if(this.buttontype1 == "success"){
               this.getTeacherList();
            }
            if(this.buttontype2 =="success"){
              this.getStudentList();
            }
        },
        AssignQuota(tid){
          this.editQuota.id = tid;
          this.getQuota(tid);
          this.addQuotaVisible = true;
        },
        //获取老师招生名额
        async getQuota(tid){
          const {data:res} = await this.$http.get("/editquota",{params:{"tid":tid}});
          if(res.status!=200){
            return  this.$message.error(res.msg);
          }
          if(res.status==200){
            this.quota = res.data;
          }
        },
        //修改招生名额
        async AssignQuotaPOST(){
          this.editQuota.quota = this.quota;
         // console.log(this.editQuota);
          const {data:res} = await this.$http.post("/editquota",this.editQuota);
          if(res.status!=200){
              return  this.$message.error(res.msg);
          }
          if(res.status==200){
            this.addQuotaVisible = false;
            if(this.buttontype1 == "success"){
               this.getTeacherList();
            }
            if(this.buttontype2 =="success"){
              this.getStudentList();
            }
             this.$messge.success(res.msg);
          }
        },
        //为导师分配学生
        AssignStudent(id){
          this.editQuota.tid = id;
          this.addDialogVisible = true;
        },
        async AssignStudentPOST(){
          this.editQuota.sid = this.StudentId;
           const {data:res} = await this.$http.post("/relationship",this.editQuota);
            if(res.status!=200){
                return  this.$message.error(res.msg);
            }
             if(res.status==200){
              this.addDialogVisible = false;
              if(this.buttontype1 == "success"){
                this.getTeacherList();
              }
              if(this.buttontype2 =="success"){
                this.getStudentList();
              }
              this.$messge.success(res.msg);
            }
            
        },
        //根据学院获取学生信息
        async getStudentInfo(){
            this.queryCollegeAndMajor.college = this.queryValue[0];
            this.queryCollegeAndMajor.major = this.queryValue[1];
            const {data:res} = await this.$http.get("/stus",{params:this.queryCollegeAndMajor});
            if(res.status!=200){
                  return  this.$message.error(res.msg);
            }
            if(res.status==200){
                this.stuList = res.data.list;
                this.$message.success(res.msg);
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