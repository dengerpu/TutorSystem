<template>
    <div>
        <!-- 面包屑导航 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>导师管理</el-breadcrumb-item>
            <el-breadcrumb-item>选择学生</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            导师选择学生区域
        </el-card>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>

</style>