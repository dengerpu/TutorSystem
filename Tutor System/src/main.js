import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'


// 导入全局样式表
import './assets/css/global.css'
// import './assets/css/style.css'

//导入字体图标
import './assets/fonts/iconfont.css'

// 导入echarts插件
import * as echarts from 'echarts'

import axios from 'axios'

//配置请求的根路径
axios.defaults.baseURL = 'http://localhost:8888'
axios.defaults.withCredentials = true;
//axios请求拦截
axios.interceptors.request.use(config=>{
  //为请求头对象，添加token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
