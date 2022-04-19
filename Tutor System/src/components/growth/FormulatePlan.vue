<template>
    <div>
       <div class="block">
         <el-select  @change="getData()" v-model="optionsValue" placeholder="请选择">
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
    </div>
</template>
<script>
export default {
  created(){
 
  },
  mounted(){
    
  },
  data(){
      return {
        optionsValue:'',
        data:[{key:"暂无",value:"暂无"}],
        value: [],
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
     getInfo(){
       for(let i = 0;i<this.value.length;i++){
         console.log(this.value[i]);
       }
       console.log(this.value);
     },
     getData(){
        if(this.optionsValue=="网络安全"){
          this.data = this.options1;
        }else if(this.optionsValue=="软件开发"){
          this.data = this.options2;
        }
     }
    }
}
</script>

<style lang="less">
// .el-transfer-panel__item{
//     display:  inline-block!important;
// }
// .el-checkbox__label{
//     display: inline-block!important;
// }
// .el-transfer-panel__item.el-checkbox .el-checkbox__label{
//     display: inline-block;
// }

</style>