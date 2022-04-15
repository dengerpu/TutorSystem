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
import AdminChoice from '../components/assign/AdminChoice.vue'
import StudentChoicie from '../components/assign/StudentChoice.vue'
import TutorChoice from '../components/assign/TutorChoice.vue'
import ApplationRecord from '../components/assign/ApplationRecord.vue'
import MyApplation from '../components/assign/MyApplation.vue'
import PersonCenter from '../components/index/PersonalCenter.vue'
import SecurityCenter from '../components/index/SecurityCenter.vue'
import NoticeMange from '../components/noticeManger/NoticeMange.vue'
import NoticeShowALL from '../components/noticeManger/NoticeShowAll.vue'
import NoticeDetails from '../components/noticeManger/NoticeDeatis.vue'
import TimeTable from '../components/course/Timetable.vue'
import PublishArtile from '../components/noticeManger/PublishAtricle.vue'
import PerAnalysis from '../components/course/PerformanceAnalysis.vue'
import FormulatePlan from '../components/growth/FormulatePlan.vue'
import MyGrowthPlan from '../components/growth/MyGrowthPlan.vue'
import MyStudent from '../components/growth/MyStudents.vue'


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
      {path:'/choice',component:AdminChoice},
      {path:'/studentchoice',component:StudentChoicie},
      {path:'/tutorchoice',component:TutorChoice},
      {path:'/applayrecord',component:ApplationRecord},
      {path:'/psersoncenter',component:PersonCenter},
      {path:'/securitycenter',component:SecurityCenter},
      {path:'/timetable',component:TimeTable},
      {path:'/panalysis',component:PerAnalysis},
      {path:'/notice',component:NoticeMange},
      {path:'/noticeall',component:NoticeShowALL},
      {path:'/publish',component:PublishArtile},
      {path:'/noticedetails',component:NoticeDetails},
      {path:'/myApplation',component:MyApplation},
      {path:'/myplan',component:MyGrowthPlan},
      {path:'/formulateplan',component:FormulatePlan},
      {path:'/mystudent',component:MyStudent}
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
