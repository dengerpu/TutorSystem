<template>
     <div>
       <!-- 面包屑导航 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>学习管理</el-breadcrumb-item>
             <el-breadcrumb-item>提交详情</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
             <el-button round class="el-icon-caret-left goback" @click="goBack">返回</el-button>
            	<h2>{{noticeInfo.title}}</h2>
                <p class="one">发布时间：<em class="blue">{{noticeInfo.date}}</em>&nbsp;&nbsp;&nbsp;作者：<em class="blue">{{noticeInfo.author}}</em><em class="gray">（<em id="num">80</em>人点击）</em></p>
                <hr/>
                <div v-html="noticeInfo.content"></div>
                <div style="float:left; padding:10px 0;" v-if="noticeInfo.enclosure!=null">附件：
                        <a :href="noticeInfo.enclosure">
                            <el-button  type="primary" size="mini">附件下载<i class="el-icon-download el-icon--right"></i></el-button>
                        </a>  
                </div>
        </el-card>
    </div>
</template>
<script>
export default {
    data(){
        return{
            id:'',
            type:'',
            noticeInfo:{}
        }
    },
    methods:{
        //获取用户详情信息
        async getNoticeInfo(){
            this.id = this.$route.query.id;
            const {data:res} = await this.$http.get('/editnotice',{params:{"id":this.id}});
               // console.log(res);
            if(res.status!=200){
                this.$message.console.error(res.msg);
            }
            if(res.status==200){
                this.noticeInfo = res.data;
                let dt = new Date(res.data.update_time);
                this.noticeInfo.date = dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
              
            }
        },
        goBack(){
            this.$router.go(-1);
        }
    },
    created(){
       this.getNoticeInfo();
    }
}
</script>

<style lang="less" scoped>
 h2{
	font:normal 22px/35px  "微软雅黑";
	   color:#072885;
	   text-align:center;
}
.one{
	font-szie:12px;
	text-align:center;
}
p{text-indent:2em;}
.blue{color:#3d6cb0;}
.gray{color:#666;}
#num{color:#3d6cb0;}
em{ font-style:normal;}
.two{font-family:"楷体_GB2312";}
.four{font-weight:bold;}
.goback{
   float: left;
}
</style>