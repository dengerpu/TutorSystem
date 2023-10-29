# TutorSystem
导师制下的学生成长管理系统的设计与实现

![image-20231029095609923](https://trpora-1300527744.cos.ap-chongqing.myqcloud.com/img/202310290956983.png)

## 技术栈

* Vue
* SpringBoot
* MySql
* Echarts

## 部分功能截图

### 登陆

![img](https://trpora-1300527744.cos.ap-chongqing.myqcloud.com/img/202310290956131.png)

### 用户信息

![img](https://trpora-1300527744.cos.ap-chongqing.myqcloud.com/img/202310290956079.jpg)

![img](https://trpora-1300527744.cos.ap-chongqing.myqcloud.com/img/202310290957508.jpg)

![image-20231029095809052](https://trpora-1300527744.cos.ap-chongqing.myqcloud.com/img/202310290958164.png)

![img](https://trpora-1300527744.cos.ap-chongqing.myqcloud.com/img/202310290958954.jpg)

### 双选管理

![img](https://trpora-1300527744.cos.ap-chongqing.myqcloud.com/img/202310290958238.jpg)

![img](https://trpora-1300527744.cos.ap-chongqing.myqcloud.com/img/202310290959101.jpg)

![img](https://trpora-1300527744.cos.ap-chongqing.myqcloud.com/img/202310290959871.jpg)

### 课表查看

![img](https://trpora-1300527744.cos.ap-chongqing.myqcloud.com/img/202310291000066.jpg)

### 成绩分析报告

![img](https://trpora-1300527744.cos.ap-chongqing.myqcloud.com/img/202310291000495.jpg)

### 通知管理

![img](https://trpora-1300527744.cos.ap-chongqing.myqcloud.com/img/202310291000513.png)

![img](https://trpora-1300527744.cos.ap-chongqing.myqcloud.com/img/202310291001994.png)

![img](https://trpora-1300527744.cos.ap-chongqing.myqcloud.com/img/202310291001691.jpg)

### 成长管理

![img](https://trpora-1300527744.cos.ap-chongqing.myqcloud.com/img/202310291001102.jpg)

![img](https://trpora-1300527744.cos.ap-chongqing.myqcloud.com/img/202310291001559.png)

## 功能说明

本课题的任务是设计和开发一个导师制下的学生成长管理系统，为学生与导师提供一个双向选择和查询各种信息的管理平台。有利于导师对学生的成长管理，为导师和学生提供极大的便利。主要设计如下：

1.数据库设计：主要有建立学生个人信息表、导师个人信息表、学生导师对应关系表、学生课表、学生成长计划表、成绩表等。

2.系统设计：在系统设计中主要涉及到的内容有管理系统页面和后台服务器的设计。管理系统页面设计，主要有导师学生和管理员对应不同的页面和分别对应不同的操作。后台服务器设计，主要有对数据库的操作，处理浏览器发送的请求并返回数据。

根据需求分析，按照系统开发的基本观点对功能进行分解，可对模块做如下的划分：

1.管理员模块：管理员管理包括对系统整体管理和权限管理。管理员可以设置导师和学生的相关权限，以及对用户锁定解除。

2.导师模块：导师管理包括对导师个人信息，教育背景，教育经历等的管理。导师可以发布开会信息，制定学生培养计划，给学生分享学习资料，学习经验等。

3.学生模块：学生管理包括对学生个人信息，奖惩信息，培养计划等的管理。学生可以提交论文，项目申请等。

4.指导关系模块：导师和学生指导关系管理包括指导关系的建立、变更、查看。其中，指导关系分为两种：导入导师学生指导关系、学生导师双向选择。

5.数据统计模块：echarts做数据报表和统计。学生培养计划，成绩分析报告以图表的形式做出展示。

6.成长管理模块：用于展示导师给学生制定的成长培养计划。
