<template>
    <div>
        <!-- 面包屑导航 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>申请记录</el-breadcrumb-item>
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
            </el-row>

            <el-table :data="record" style="width: 100%" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="susername" label="学号" ></el-table-column>
                <el-table-column prop="sname" label="申请人" ></el-table-column>
                <el-table-column prop="major" label="专业" ></el-table-column>
                <el-table-column prop="tname" label="申请老师" ></el-table-column>
                <el-table-column prop="create_time"  :formatter="dataFormat" label="申请时间" ></el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                      <div v-if="scope.row.is_agree==null">
                        <el-button type="success" size="mini" @click="Agree(scope.row)" >接收</el-button>
                        <el-button type="danger" size="mini" @click="Refuse(scope.row.id)">拒绝</el-button>
                      </div>
                      <div v-if="scope.row.is_agree==true">
                        <el-button type="success" size="mini">已同意</el-button>
                      </div>
                      
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
export default {
    data(){
        return{
            //获取用户列表的参数对象
            queryInfo:{
                  tid:1,
                pagenum:1,  //当前页数
                pagesize:5  //每页显示多少条数据
            },
            formLabelWidth: '80px',
            total:0,  //总数据数
            record: [],//用户数据
            application:{
              tid:0,
              sid:0
            }
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
        async getTeacherList(){
            //发送请求获取数据
            this.queryInfo.tid = parseInt(window.sessionStorage.getItem("tid"));
           const {data:res} = await this.$http.get('/records',{params:this.queryInfo});
           //console.log(res);
           if(res.status!=200){
                this.record = [];
                this.total = 0;
                return this.$message.error(res.msg)
            }else if(res.status==200){
                this.record = res.data.list;
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
        async Agree(records){
          this.application.tid = window.sessionStorage.getItem("tid");
          this.application.sid = records.sid;
          this.application.update_time = new Date();
          this.application.id = records.id;
          this.application.is_agree = true;
            const {data:res} = await this.$http.post("/relationship",this.application);
            if(res.status == 200){
                const{data:res1} = await this.$http("/editrecord",this.application);
                if(res1.status==200){
                    this.getTeacherList();
                }else{
                  return this.$message.error(res.msg);
                }
            }else if (res.status == 400){
              return this.$message.warning(res.msg);
            }else if(res.status==401){
              return this.$message.error(res.msg);
            }
        },
        //拒绝该用户的操作
        async Refuse(id){
           const confirmResult = await this.$confirm('此操作将拒绝该学生, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).catch(err=>err);  //相当于err => {return err}
        
          // console.log(confirmResult)
          if(confirmResult != 'confirm'){
              this.$message.info('已取消拒绝')
          }
           if(confirmResult == 'confirm'){
             const{data:res} = this.$http.get("/deleterecord",{params:{"id":id}});
              if(res.status!=200){
                return this.$message.error(res.msg);
            }
            if(res.status==200){
                this.getTeacherList();
                this.$message.success(res.msg)
            }
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