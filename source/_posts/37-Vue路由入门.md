---
title: Vue路由入门
categories:
  - Vue
tags:
  - Vue
copyright: true
comments: true
abbrlink: 10415af9
date: 2017-07-29 16:23:14
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> Vue大多数是单页面应用，跳转的功能使用的不是a标签，而是vue-router

<!--more-->

vue-router是Vue中非常重要的知识点，官方也特地出了一个文档来专门介绍路由,官网写的非常详细，我只是分享一下我的学习心得

### Html

```javascript
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<div id="app">
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to='/home'>首页</router-link> 
	<!-- query 与  params 为固定写法  会根据这两个进行寻找参数-->
	<router-link :to='{path:"/user/123",query:{page:2}}'>测试一</router-link>
	<router-link :to='{name:"user",params:{id:2}}'>测试二</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <!-- router-view 存放组件的容器 -->
  <router-view></router-view>
</div>
```

### javaScript

```javascript

// 1. 定义（路由）组件。可以从其他文件 import 进来

var home = {template:`<main class='a'><h1>次页面是首页</h1></main>`}
var info = {template:`<main class='b'><h1>次页面是测试</h1></main>`}

// 2. 设置路由对应页面

var routes = [
{path:'/home',component:home},
{name:'user',path:'/user/:id',component:user}, // 动态路径参数 以冒号开头
]

// 3. 创建 router 实例，然后传 routes配置

var router = new VueRouter({
	routes // 路由规则,路由的信息 （缩写）相当于 routes: routes
})

// 4. 创建和挂载根实例。记得要通过 router 配置参数注入路由，

new Vue({
	el: '#app',
	data: {		
	},
	router ,//指定使用哪一个路由
})

```

以上就是Vue路由的基础功能，可以实现简单的跳转，有什么不对的地方欢迎提出