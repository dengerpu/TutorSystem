<template>
  <body>
            <!-- 面包屑导航 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>任务管理</el-breadcrumb-item>
            <el-breadcrumb-item>查看提交</el-breadcrumb-item>
        </el-breadcrumb>
    <el-card style="margin:20px;" class="box-card">
    <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
    <div style="text-align: left; ">
        <!-- <el-tag effect="dark" type="info"  style="font-size:15px; margin:24px;margin-bottom:20px; line-height:0px;">
            <h2>提交记录</h2>
        </el-tag> -->
        <el-button type="info">提交记录</el-button>
    </div>
    <el-table class="mytable" :data="tableData" border>
        <el-table-column prop="update_time" align="center" sortable label="提交时间"
        :formatter="dataFormat"  ></el-table-column>
        <el-table-column prop="title" align="center"  label="提交标题" ></el-table-column>
        <el-table-column  label="提交内容" >
          <template slot-scope="scope">
              <p v-if="scope.row.content.length>20">请点击详情</p>
              <p v-else>{{scope.row.content}}</p> 
          </template>
        </el-table-column>
        <el-table-column prop="author" align="center" label="提交人"></el-table-column>
        <el-table-column  align="center" label="附件">
        <template slot-scope="scope">
                 <a :href="scope.row.enclosure">
                   <el-button v-if="scope.row.enclosure!=null&&scope.row.enclosure!=''" type="primary" size="mini">附件下载<i class="el-icon-download el-icon--right"></i></el-button>
                   </a>  
          </template>
        </el-table-column>
        <el-table-column label="详情" >
        <template slot-scope="scope">
              <el-link
               size="small" 
              type="primary"
              @click="getDetails(scope.row.id)"
            > <i class="el-icon-view"></i>查看详情</el-link>
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

    data(){
       return{
         //获取用户列表的参数对象
        queryInfo:{
          tid:0,
          query:'',
          pagenum:1,  //当前页数
          pagesize:5  //每页显示多少条数据
        },
        total:0,
        tableData:[],
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
          //监听oagesize改变的事件
        handleSizeChange(newSize){
            //console.log(newSize);
            this.queryInfo.pagesize = newSize;
            //再次调用接口查找用户
            this.getPaperList();
        },
        //监听页码值改变的事件
        handleCurrentChange(newPage){
            //console.log(newPage);
            this.queryInfo.pagenum = newPage;
             //再次调用接口查找用户
             this.getPaperList();
        },
        async getPaperList(){
            //发送请求获取数据
            const {data:res} = await this.$http.get('/tidpapper',{params:this.queryInfo});
           // console.log(res);
            if(res.status!=200){
                this.total = 0;
                return this.$message.error(res.msg)
            }else if(res.status==200){
                this.tableData = res.data.list;
                this.total = res.data.totalCount;
            }
        },
         // 跳转到详情页面
        getDetails(id){
            this.$router.push({path:"/paperdetails",query:{id:id}});
        },
       
    },
    created(){
      this.queryInfo.tid = parseInt(window.sessionStorage.getItem("tid"));
      this.getPaperList();
    }
}
</script>

<style>

</style>