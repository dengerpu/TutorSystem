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
        size="70%"
        direction="ltr"
        custom-class="demo-drawer"
        ref="drawer"
        >
        <div class="demo-drawer__content">
            <div class="block">
            <span class="demonstration">折叠展示Tag</span>
            <el-cascader
                :options="options"
                :props="props"
                collapse-tags
                clearable></el-cascader>
            </div>
            <div class="demo-drawer__footer">
            <el-button @click="cancelForm">取 消</el-button>
            <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
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
            props: { multiple: true },
            options: [{
            value: 1,
            label: '东南',
            children: [{
                value: 2,
                label: '上海',
                children: [
                { value: 3, label: '普陀' },
                { value: 4, label: '黄埔' },
                { value: 5, label: '徐汇' }
                ]
            }, {
                value: 7,
                label: '江苏',
                children: [
                { value: 8, label: '南京' },
                { value: 9, label: '苏州' },
                { value: 10, label: '无锡' }
                ]
            }, {
                value: 12,
                label: '浙江',
                children: [
                { value: 13, label: '杭州' },
                { value: 14, label: '宁波' },
                { value: 15, label: '嘉兴' }
                ]
            }]
            }, {
            value: 17,
            label: '西北',
            children: [{
                value: 18,
                label: '陕西',
                children: [
                { value: 19, label: '西安' },
                { value: 20, label: '延安' }
                ]
            }, {
                value: 21,
                label: '新疆维吾尔族自治区',
                children: [
                { value: 22, label: '乌鲁木齐' },
                { value: 23, label: '克拉玛依' }
                ]
            }]
            }]
            
        }
        
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
            if (this.loading) {
                return;
            }
            this.$confirm('确定要提交表单吗？')
                .then(_ => {
                this.loading = true;
                this.timer = setTimeout(() => {
                    done();
                    // 动画关闭需要一定的时间
                    setTimeout(() => {
                    this.loading = false;
                    }, 400);
                }, 2000);
                })
                .catch(_ => {});
            },
            cancelForm() {
            this.loading = false;
            this.dialog = false;
            clearTimeout(this.timer);
            }
    }
}
</script>

<style lang="less" scoped>
.el-checkbox__input{
    display: inline-block;
}
.el-checkbox__label{
    display: inline-block;
}
.el-transfer-panel__item{
    background-color: red;
}

</style>