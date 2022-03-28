<template>
    <div>
        <!-- 面包屑导航 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区域 -->
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="4" >
                     <!-- 搜索与添加区域 -->
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
                        <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
                </el-col>
            </el-row>

            <el-table :data="userlist" style="width: 100%" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="username" label="姓名" ></el-table-column>
                <el-table-column prop="email" label="邮箱" ></el-table-column>
                <el-table-column prop="mobile" label="电话"></el-table-column>
                <el-table-column prop="role" label="角色"></el-table-column>
                <el-table-column  label="状态">
                    <template slot-scope="scope">
                        <el-switch @change="userStateChange(scope.row)" v-model="scope.row.status"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showeditDialogVisible(scope.row.id)"></el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>
                        <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                             <!-- 分配角色按钮 -->
                                <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                        </el-tooltip>
                    
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

        <!-- 添加用户的对话框 -->
        <el-dialog
        title="添加用户"
        :visible.sync="addDialogVisible"
        width="50%">
        <!-- 内容主题区域 -->
        <span>
            <el-form ref="addform" :model="addform" label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="addform.username"></el-input>
                </el-form-item>
                 <el-form-item label="密码">
                    <el-input v-model="addform.password"></el-input>
                </el-form-item>
                 <el-form-item label="邮箱">
                    <el-input v-model="addform.email"></el-input>
                </el-form-item>
                 <el-form-item label="手机号">
                    <el-input v-model="addform.mobile"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="addform.role" placeholder="请选择角色">
                    <el-option label="管理员" value="admin"></el-option>
                    <el-option label="会员" value="vip"></el-option>
                    <el-option label="普通用户" value="ordinary"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </span>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser" >确 定</el-button>
        </span>
        </el-dialog>

         <!-- 修改用户的对话框 -->
        <el-dialog
        title="修改用户"
        :visible.sync="editDialogVisible"
        width="50%">
        <!-- 内容主题区域 -->
        <span>
            <el-form ref="" :model="editForm" label-width="80px">
                <el-form-item label="用户名" >
                    <el-input v-model="editForm.username" :disabled="true"></el-input>
                </el-form-item>
                 <el-form-item label="密码">
                    <el-input v-model="editForm.password"></el-input>
                </el-form-item>
                 <el-form-item label="邮箱">
                    <el-input v-model="editForm.email"></el-input>
                </el-form-item>
                 <el-form-item label="手机号">
                    <el-input v-model="editForm.mobile"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="editForm.role" placeholder="请选择角色">
                    <el-option label="管理员" value="admin"></el-option>
                    <el-option label="会员" value="vip"></el-option>
                    <el-option label="普通用户" value="ordinary"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </span>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editUser">确 定</el-button>
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
            total:0,  //总数据数
            userlist: [],//用户数据
          addDialogVisible:false, //控制添加对话框的显示与隐藏
            editDialogVisible:false,
            editForm:{
            }, //查询到的用户信息
             addform: {  //添加的用户信息
                username: '',
                password: '',
                email: '',
                mobile: '',
                role:''
            }
        }
    },
    methods:{
        async getUserList(){
            //发送请求获取数据
           const {data:res} = await this.$http.get('/users',{params:this.queryInfo});
           if(!res.flag){
                    return this.$message.error(res.errorMsg)
                }
                if(res.flag){
                    this.userlist = res.data.users;
                    this.total = res.data.totalpage;
                }
        },
        //监听oagesize改变的事件
        handleSizeChange(newSize){
            //console.log(newSize);
            this.queryInfo.pagesize = newSize;
            //再次调用接口查找用户
            this.getUserList();
        },
        //监听页码值改变的事件
        handleCurrentChange(newPage){
            //console.log(newPage);
            this.queryInfo.pagenum = newPage;
             //再次调用接口查找用户
             this.getUserList();
        },
        //监听switch开关的改变
        userStateChange(userinfo){
            console.log(userinfo);
            //发送请求改变用户状态
            //this.$http.put()
            //发生错误不等于200 ，然后取反，保证状态不会发生变化
            // if(status!=200){
            //     userinfo.mg_state = !userinfo.mg_state;
            //     return this.$message.error('更新用户状态失败');
            // }
            // return this.$message.success('更新用户状态成功');
        },
        //添加用户
        async addUser(){
            const{data:res}= await this.$http.post("/adduser",this.addform)
            console.log(res);
            if(!res.flag){
               return  this.$message.error(res.errorMsg);
            }
            if(res.flag){
                this.$message.success(res.errorMsg);
                this.getUserList();
                this.addDialogVisible = false
            }
            
        },
        //修改对话框事件
        async showeditDialogVisible(id){
            //根据id查询用户信息
            // this.$http.get()
            
            const {data:res} = await this.$http.get("/edituser",{params:{"id":id}});
           if(!res.flag){
                return this.$message.error(res.errorMsg);
            }
            if(res.flag){
                this.editForm = res.data;
                this.$message.success(res.errorMsg)
                
            }
            this.editDialogVisible = true;
            
        },
        async editUser(){
            
            const {data:res} = await this.$http.post("/edituser",this.editForm);
            if(!res.flag){
                return this.$message.error(res.errorMsg);
            }
            if(res.flag){
                this.$message.success(res.errorMsg)
                this.editDialogVisible = false;
                this.getUserList();
            }
        },
        //根据ID删除用户
        async removeUserById(id){
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
              const {data:res} = await this.$http.get("/deleteuser",{params:{"id":id}})
              if(!res.flag){
                return this.$message.error(res.errorMsg);
            }
            if(res.flag){
                this.$message.success(res.errorMsg)
                this.getUserList();
            }
          }
        }

    },
    created(){
        this.getUserList();
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
</style>