<template>
    <div>
       <el-transfer v-model="value"
             :data="data"></el-transfer>
    </div>
</template>



<script>
export default {
  created(){
 
  },
  mounted(){
    
  },
    data(){
          const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      };
        return{
          times:'',
                   data: generateData(),
        value: []
        }
        
    },
    methods:{
     
    }
}
</script>

<style lang="less">
.el-transfer-panel__item{
    display:  inline-block!important;
}
.el-checkbox__label{
    display: inline-block!important;
}
// .el-transfer-panel__item.el-checkbox .el-checkbox__label{
//     display: inline-block;
// }

</style>