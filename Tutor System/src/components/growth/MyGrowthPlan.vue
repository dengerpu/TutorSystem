<template>
    <div>
        <!-- 面包屑导航 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>成长管理</el-breadcrumb-item>
            <el-breadcrumb-item>制定计划</el-breadcrumb-item>
        </el-breadcrumb>
       <h1>欢迎你</h1>
        我的培养计划
    </div>
</template>



<script>
export default {
  created(){
 
  },
  mounted(){
    
  },
    data(){
        return{
          times:''
        }
        
    },
    methods:{
     
    }
}
</script>

<style lang="less" scoped>


</style>