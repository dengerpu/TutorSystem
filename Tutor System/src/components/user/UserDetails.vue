<template>
     <div>
                <!-- 面包屑导航 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户详情</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            卡片区域
            {{userInfo}}
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id:1,
            type:'',
            userInfo:{}
        }
    },
    methods:{
        async getUserInfo(){
            this.id = this.$route.query.id;
            this.type = this.$route.query.type;
            if(this.type=='teacher'){
                const {data:res} = await this.$http.get('/editteacher',{params:{"id":this.id}});
                console.log(res);
                if(res.status!=200){
                    this.$message.console.error(res.msg);
                }
                if(res.status==200){
                    this.userInfo = res.data;
                }
            }
        }
    },
    created(){
        this.getUserInfo();
    }
}
</script>

<style lang="less" scoped>

</style>