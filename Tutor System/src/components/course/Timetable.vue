<template>
  <div>
          <!-- 面包屑导航 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>课程</el-breadcrumb-item>
            <el-breadcrumb-item>查看课表</el-breadcrumb-item>
        </el-breadcrumb>
    <el-card>
      <div id="coursesTable" ></div>
    </el-card>
  </div>
</template>

<script>
import timetable from 'timetables'
export default {
  components: {},
  data () {
    return {
      styles: {
        Gheight: 50,
        leftHandWidth: 50,
        palette: ['#ff6633', '#eeeeee']
      },
      courselist: [
        ['大学英语(Ⅳ)A18-202', '大学英语(Ⅳ)A18-202', '', '', '', '', '毛概A02-212', '毛概A02-212', '', '', '选修', '选修'],
        ['', '', '软件工程A06-209', '软件工程A06-209', '','','', '','工程数学A06-106', '工程数学A06-106',  '', ''],
        ['大学体育(Ⅳ)1号体育场', '大学体育(Ⅳ)1号体育场', '形势与政策(Ⅳ)A17-101', '形势与政策(Ⅳ)A17-101', '', '', '电路、信号与系统实验A06-404', '电路、信号与系统实验A06-404', '', '', '', ''],
        ['', '', '', '', '编程训练A06-404', '编程训练A06-404', '', '',  '大学体育2号体育场', '大学体育2号体育场','', ''],
        ['', '', '数据结构A06-419', '数据结构A06-419', '', '', '', '', '计算机网络A06-208', '计算机网络A06-208', '', '']
      ],
      timetableType: [
        [{index: '1', name: '8:00'}, 1],
        [{index: '2', name: '9:50'}, 1],
        [{index: '3', name: '10:10'}, 1],
        [{index: '4', name: '12:00'}, 1],
        [{index: '5', name: '12:30'}, 1],
        [{index: '6', name: '14:20'}, 1],
        [{index: '7', name: '14:30'}, 1],
        [{index: '8', name: '16:20'}, 1],
        [{index: '9', name: '16:40'}, 1],
        [{index: '10', name: '19:00'}, 1],
        [{index: '11', name: '20:00'}, 1],
        [{index: '12', name: '21:30'}, 1]
      ],
      week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      timetable: null
    }
  },
  mounted () {
    this.timetable =
      // eslint-disable-next-line new-cap
      new timetable({
        el: '#coursesTable',
        timetables: this.courselist,
        week: this.week,
        highlightWeek: new Date().getDay(),
        timetableType: this.timetableType,
        styles: this.styles
      })
  }
}
</script>

<style>
  #coursesTable {
    padding: 15px 10px;
  }

  .Courses-head {
    background-color: #edffff;
  }

  .Courses-head > div {
    text-align: center;
    font-size: 14px;
    line-height: 28px;
  }

  .left-hand-TextDom, .Courses-head {
    background-color: #f2f6f7;
  }

  .Courses-leftHand {
    background-color: #f2f6f7;
    font-size: 12px;
  }

  .Courses-leftHand .left-hand-index {
    color: #9c9c9c;
    margin-bottom: 4px !important;
  }

  .Courses-leftHand .left-hand-name {
    color: #666;
  }

  .Courses-leftHand p {
    text-align: center;
    font-weight: 900;
  }

  .Courses-head > div {
    border-left: none !important;
  }

  .Courses-leftHand > div {
    padding-top: 5px;
    border-bottom: 1px dashed rgb(219, 219, 219);
  }

  .Courses-leftHand > div:last-child {
    border-bottom: none !important;
  }

  .left-hand-TextDom, .Courses-head {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
  }

  .Courses-content > ul {
    border-bottom: 1px dashed rgb(219, 219, 219);
    box-sizing: border-box;
  }

  .Courses-content > ul:last-child {
    border-bottom: none !important;
  }

  .highlight-week {
    color: #02a9f5 !important;
  }

  .Courses-content li {
    text-align: center;
    color: #666666;
    font-size: 14px;
    line-height: 50px;
  }

  .Courses-content li span {
    padding: 6px 2px;
    box-sizing: border-box;
    line-height: 18px;
    border-radius: 4px;
    white-space: normal;
    word-break: break-all;
    cursor: pointer;
  }

  .grid-active {
    z-index: 9999;
  }

  .grid-active span {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  }
</style>