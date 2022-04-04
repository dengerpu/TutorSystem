<template>
    <div>
        <!-- 面包屑导航 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>选择导师</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            学生选择导师区域
        </el-card>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>

</style>