---
title: Vue嵌套路由
categories:
  - Vue
tags:
  - Vue
  - Vue路由
copyright: true
comments: true
abbrlink: f40ee393
date: 2017-08-14 21:14:25
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 实际生活中的应用界面，通常由多层嵌套的组件组合而成。同样地，URL 中各段动态路径也按某种结构对应嵌套的各层组件

<!--more-->

嵌套路由字面上就是路由中嵌套的一个或多个子路由，我直接把完整的代码贴出来，在代码中做解释，看的比较清楚一点,复制后可直接运行

```javascript

<!DOCTYPE html>
<html>
<head>
  <title></title>
  <meta charset="utf-8">
  <script src="http://unpkg.com/vue/dist/vue.js"></script>
  <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
</head>
<body> 
  <div id="box">
    <p>
      <router-link to="/home">home</router-link>
      <router-link to="/news">news</router-link>
    </p>
     <router-view></router-view>
  </div>
 
  <!-- 模板抽离出来 -->
  <template id="home">
    <!-- 注意：组件只能有一个根元素，所以我们包装到这个div中 -->
    <div>
      <h2>首页</h2>
       <router-link to="/home/login">登录</router-link>
      <router-link to="/home/reg">注册</router-link>
      <!-- 路由匹配到的组件将渲染在这里 -->
      <router-view></router-view>
    </div>
  </template>
 
  <template id="news">
    <div>新闻</div>
  </template>
 
  <template id="login">
    <div>登录界面</div>
  </template>
  <template id="reg">
    <div>注册界面</div>
  </template>
 
  <script type="text/javascript">
    // 1. 定义（路由）组件。
    const Home = { template: '#home' };
    const News = { template: '#news' };
 
    const Login = { template: '#login' };
    const Reg = { template: '#reg' };
 
    // 2. 定义路由
    const routes = [
       { path: '/', redirect: '/home' },
      { 
        path: '/home', 
        component: Home, 
        children:[
          { path: '/home/login', component: Login},
          { path: '/home/reg', component: Reg}
        ]
      },
      { path: '/news', component: News}
    ]
 
    // 3. 创建 router 实例，然后传 `routes` 配置
    const router = new VueRouter({
      routes // （缩写）相当于 routes: routes
    })
 
 
    // 4. 创建和挂载根实例。
    // 记得要通过 router 配置参数注入路由，
    // 从而让整个应用都有路由功能
    const app = new Vue({
     router
    }).$mount('#box')
 
    // 现在，应用已经启动了！
  </script>
</body>
</html>
```

要注意，以 / 开头的嵌套路径会被当作根路径，这让你充分的使用嵌套组件而无须设置嵌套的路径，children 配置就是像 routes 配置一样的路由配置数组，所以呢，你可以嵌套多层路由。

以上就是我对Vue嵌套路由的一些理解，有不对的地方欢迎提出
