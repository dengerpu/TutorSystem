<template>
    <div>
        <!-- 面包屑导航 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>成长管理</el-breadcrumb-item>
            <el-breadcrumb-item>我的学生</el-breadcrumb-item>
        </el-breadcrumb>
  <!-- 卡片视图区域 -->
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="4">
                    <div style="text-align: left; ">
                    </div>
                </el-col>
                <el-col :span="4" >
                     <!-- 搜索与添加区域 -->
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getStudentList">
                        <el-button slot="append" icon="el-icon-search" @click="getStudentList"></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <el-table :data="studentlist" style="width: 100%" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="username" label="学号" ></el-table-column>
                <el-table-column prop="name" label="姓名" ></el-table-column>
                <el-table-column prop="sex" label="性别" ></el-table-column>
                <el-table-column prop="age" label="年龄" ></el-table-column>
                <el-table-column prop="college" label="学院" ></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="phone" label="联系方式"></el-table-column>
                <el-table-column prop="" label="培养计划">
                    <template slot-scope="scope">
                      <el-link type="primary" @click="getDetails(scope.row.id)">点击查看</el-link>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <el-button type="warning" @click="dialog = true" class="el-icon-help" size="mini">制定培养计划</el-button>
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

        <!-- 制定培养计划 -->
        <el-drawer
        title="制定培养计划 !"
        :before-close="handleClose"
        :visible.sync="dialog"
        size="45%"
        direction="ltr"
        custom-class="demo-drawer"
        ref="drawer"
        >
        <div class="demo-drawer__content">
            <div class="block">
                <el-select class="selectbox"  @change="getData()" v-model="optionsValue" placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                </el-option>
                </el-select>
                <el-transfer v-model="value" :data="data" @change="getInfo()"></el-transfer>
            </div>
            <div class="demo-drawer__footer">
            <el-button @click="cancelForm">取 消</el-button>
            <el-button type="primary" @click="$refs.drawer.closeDrawer()" >确 定</el-button>
            </div>
        </div>
        </el-drawer>
    </div>
</template>



<script>
export default {
  created(){
      this.queryInfo.tid = parseInt(window.sessionStorage.getItem("tid"));
      this.getStudentList();
  },
  mounted(){
    
  },
    data(){
        return{
                   //获取用户列表的参数对象
            queryInfo:{
                tid:0,
                query:'',
                pagenum:1,  //当前页数
                pagesize:5  //每页显示多少条数据
            },
            total:0,  //总数据数
            studentlist: [],//用户数据
            dialog: false,
            optionsValue:'',
            data:[{key:"暂无",value:"暂无"}],
            value: [],
            plan:'',
            options: [{
            value: '网络安全',
            label: '网络安全'
            }, {
            value: '软件开发',
            label: '软件开发'
            }, {
            value: '人工智能',
            label: '人工智能'
            }],
            options1:[
            {
            key: '网络基础',
            value: '网络基础'
            }, {
            key: 'windows服务安全',
            value: 'windows服务安全'
            }, {
            key: 'windows安全基线',
            value: 'windows安全基线'
            }, {
            key: '以太网交换与路由技术',
            value: '以太网交换与路由技术'
            }, {
            key: '高级网络技术',
            value: '高级网络技术'
            }, {
            key: '网络安全基线',
            value: '网络安全基线'
            }, {
            key: '安全设备防护',
            value: '安全设备防护'
            }, {
            key: 'Linux安全运维',
            value: 'Linux安全运维'
            }, {
            key: '代码安全',
            value: '代码安全'
            },, {
            key: '渗透测试',
            value: '渗透测试'
            }, {
            key: '安全素养',
            value: '安全素养'
            }],
            options2:[
            {
            key: 'HTML',
            value: 'HTML'
            }, {
            key: 'CSS',
            value: 'CSS'
            }, {
            key: 'JavaScript',
            value: 'JavaScript'
            }, {
            key: 'Flex伸缩布局',
            value: 'Flex伸缩布局'
            }, {
            key: '移动web开发',
            value: '移动web开发'
            }, {
            key: 'jQuery快速开发',
            value: 'jQuery快速开发'
            }, {
            key: 'JavaScript高级',
            value: 'JavaScript高级'
            }, {
            key: '前后端交互Node+Culp',
            value: '前后端交互Node+Culp'
            }, {
            key: '前后端交互MongoDB+Express',
            value: '前后端交互MongoDB+Express'
            }, {
            key: '前后端交互Ajax',
            value: '前后端交互Ajax'
            },, {
            key: '前后端交互Git和GitHub',
            value: '前后端交互Git和GitHub'
            }, {
            key: 'Vue基础',
            value: 'Vue基础'
            }, {
            key: '微信小程序',
            value: '微信小程序'
            }, {
            key: 'React',
            value: 'React'
            }, {
            key: 'ReactNative',
            value: 'ReactNative'
            }, {
            key: 'Java基础',
            value: 'Java基础'
            },
            {
            key: 'JavaWeb',
            value: 'JavaWeb'
            }, {
            key: 'Mybatis',
            value: 'Mybatis'
            }, {
            key: 'Spring',
            value: 'Spring'
            }, {
            key: 'SpringMVC',
            value: 'SpringMVC'
            }, {
            key: 'Oracle',
            value: 'Oracle'
            }, {
            key: 'Maven高级',
            value: 'Maven高级'
            }, {
            key: 'SpringBoot',
            value: 'SpringBoot'
            }]
        };
            
        },
    methods:{
      async getStudentList(){
            //发送请求获取数据
           const {data:res} = await this.$http.get('/mystudent',{params:this.queryInfo});
           //console.log(res);
           if(res.status!=200){
                this.studentlist = [];
                this.total = 0;
                return this.$message.error(res.msg)
            }else if(res.status==200){
                this.studentlist = res.data.list;
                this.total = res.data.totalCount;
            }
        },
        getInfo(){
            for(let i = 0;i<this.value.length;i++){
                if(i!=this.value.length-1){
                    this.plan += this.value[i]+'/';
                }else{
                    this.plan +=this.value[i];
                }
            }
            console.log(this.plan);
        },
        //获取内容
        getData(){
             if(this.optionsValue=="网络安全"){
                this.data = this.options1;
            }else if(this.optionsValue=="软件开发"){
                this.data = this.options2;
            }else{
                this.data = [{key:"暂无",value:"暂无"}];
            }
        },
        //监听oagesize改变的事件
        handleSizeChange(newSize){
            //console.log(newSize);
            this.queryInfo.pagesize = newSize;
            //再次调用接口查找用户
            this.getStudentList();
        },
        //监听页码值改变的事件
        handleCurrentChange(newPage){
            //console.log(newPage);
            this.queryInfo.pagenum = newPage;
             //再次调用接口查找用户
             this.getStudentList();
        },
         handleClose(done) {
            this.$confirm('确定要提交培养计划吗？')
                .then(_ => {
                    console.log("提交");
                    this.dialog = false;
                })
                .catch(_ => {
                    console.log("异常");
                });
            },
            cancelForm() {
                this.dialog = false;
            }
    }
}
</script>

<style lang="less" scoped>
.demo-drawer__content{
    margin-left: 50px;
}
.selectbox{
   margin: 10px 0;
}
.demo-drawer__footer{
    margin: 10px 0 10px 33%;
}
</style>