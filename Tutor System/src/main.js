import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'


// 导入全局样式表
import './assets/css/global.css'
import './assets/css/style.css'

//导入字体图标
import './assets/fonts/iconfont.css'

import "./assets/js/flexible.js"
import "./assets/js/echarts.min.js"
// import "./assets/js/china.js"
// import "./assets/js/index.js"


import axios from 'axios'

//配置请求的根路径
axios.defaults.baseURL = 'http://localhost:8888'
//axios请求拦截
axios.interceptors.request.use(config=>{
  //为请求头对象，添加token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

// 定义一个过滤器 处理时间
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  // 月份从0开始,使她变成字符串,不足两位时,前面补个0.
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
