import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/register.vue'
import FindPassword from '../components/findPassword.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from  '../components/user/Users.vue'
import Students from '../components/user/Studens.vue'
import Teachers from '../components/user/Teachers.vue'
import UserDetails from '../components/user/UserDetails.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import Videos from '../components/course/Videos.vue'
import Texts from '../components/course/Texts.vue'
import textlist from '../components/course/TextList.vue'


Vue.use(VueRouter)

const routes = [

  {path:'/',redirect:'/login'},
    // 登录页面：
  {path:'/login',component:Login},
    // 注册页面：
  {path:'/register',component:Register},
    // 找回密码页面：
  {path:'/findPassword',component:FindPassword},
  {
    path:'/home',
    component:Home,
    redirect:'/welcome',
    children:[
      {path:'/welcome',component:Welcome},
      {path:'/users',component:Users},
      {path:'/students',component:Students},
      {path:'/teachers',component:Teachers},
      {path:'/userdetails',component:UserDetails},
      {path:'/rights',component:Rights},
      {path:'/roles',component:Roles},
      {path:'/videos',component:Videos},
      {path:'/texts',component:Texts},
      {path:'/textlist',component:textlist},

    ]}
]

const router = new VueRouter({
  routes
})

//挂载路由导航守卫
router.beforeEach((to,from,next)=>{
 // to将要访问的路径
  //from代表从哪个路径跳转而来
  //next是一个函数表示放行  next()放行  next('/login') 强制跳转
  if(to.path === '/login') return next();
  if(to.path === '/register') return next();
  if(to.path === '/findPassword') return next();
  //获取token
  const tokenStr = window.sessionStorage.getItem('token');
  if(!tokenStr) return next('/login');
  next();
})

export default router
