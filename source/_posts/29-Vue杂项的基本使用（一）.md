---
title: Vue杂项的基本使用（一）
categories:
  - Vue
tags:
  - Vue
copyright: true
comments: true
abbrlink: 35d550f4
date: 2017-04-15 12:58:22
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 杂项是Vue里一个比较零散的知识点，和大家分享一下学习的过程

<!--more-->

官方文档的杂项说的挺详细的，我这里把知识点归纳一下

### 编写可复用组件

在编写组件时，最好考虑好以后是否要进行复用。一次性组件间有紧密的耦合没关系，但是可复用组件应当定义一个清晰的公开接口，同时也不要对其使用的外层数据作出任何假设。

Vue 组件的 API 来自三部分——prop、事件和插槽：

1. Prop 允许外部环境传递数据给组件；
2. 事件允许从组件内触发外部环境的副作用；
3. 插槽允许外部环境将额外的内容组合在组件中。

也就是在使用Vue的时候，将多次运用到的内容编写成可重复利用的组件，通俗的说也就是封装，利用Prop，事件或插槽进行与其他组件的交互，这样使代码看起来更为整洁

### 子组件引用

其实主要的内容是 ref 的使用，我个人认为这个属性是非常好用的。

为什么要使用ref？ 尽管有 prop 和事件，但是有时仍然需要在 JavaScript 中直接访问子组件。为此可以使用 ref 为子组件指定一个引用 ID。

举一个简单的例子,假设com是一个我们写好的组件

```javascript
<div id="app">		
	<!--为了方面找到 组件对应的dom元素,通过ref指定一个名称-->
	<com ref='com'></com>
</div>
```

这样子就为com这个组件赋予了一个名为com的ref的属性，来看一下他的作用

>找到页面中的Dom元素

1. app.$refs 得到页面中所有设置的ref ,返回的是一个对象
2. app.$refs.com 得到对应的组件 ,是一个对象
3. app.$refs.com.$el 得到组件的 dom元素

>修改组件数据

假设com组件的data中有msg这个属性，并且使用了，那么这样做是可以直接修改他的数据的

```javascript
app.$refs.com.msg = '修改数据'
```

>普通的元素 也可以通过ref找到

不仅仅是组件可以使用ref这个属性，普通的标签也是可以的，有兴趣的小伙伴可以自己去尝试一下，这里就不做太多的说明

>refs 只在组件渲染完成后才填充，并且它是非响应式的。它仅仅是一个直接操作子组件的应急方案——应当避免在模板或计算属性中使用 refs。

### 异步组件

官方的文档可能看的不是很明白，简单的来说，其实异步组件的目的就在于:

>使用时才装入需要的组件，可以有效的提高首次装入页面的速度。比如在路由切换时

Vue.js允许将组件定义为一个工厂函数，动态地解析组件的定义。工厂函数接收一个resolve回调，成功获取组件定义时调用。也可以调用reject(reason)指示失败。

可能当当文字不是那么的好理解，我们做一个简单的测试，假设我们有两个组件Home、About。Home组件和首页同步加载，而About组件则按需加载。案例的代码有首页index.html，组件代码about.js构成。

首先是about.js代码：

```javascript
Vue.component('about', {
  template: '<div>About page</div>'
});

```

接下来是index.html代码：

```javascript
<html>
<head>
  <title>Async Component test</title>
</head>
<body>

  <div id="app">
    <router-link to="/home">/home</router-link>
    <router-link to="/about">/about</router-link>
    <router-view></router-view>
  </div>

  <script src="https://unpkg.com/vue/dist/vue.js"></script>
  <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
  <script>
    function load(componentName, path) {
      return new Promise(function(resolve, reject) {
        var script = document.createElement('script');
        script.src = path;
        script.async = true;
        script.onload = function() {
          var component = Vue.component(componentName);
          if (component) {
            resolve(component);
          } else {
            reject();
          }
        };
        script.onerror = reject;
        document.body.appendChild(script);
      });
    }
    var router = new VueRouter({
      routes: [
        {
          path: '/',
          redirect:'/home'
        },
        {
          path: '/home',
          component: {
            template: '<div>Home page</div>'
          },
        },
        {
          path: '/about',
          component: function(resolve, reject) {
            load('about', 'about.js').then(resolve, reject);
          }
        }
      ]
    });
    var app = new Vue({
      el: '#app',
      router: router,
    });
  </script>

</body>
</html>
```

为了加载在服务器的js文件，我们需要一个HTTP服务器。可以使用node.js的http-server实现。安装并启动一个服务器的方法：

		npm install http-server -g
		http-server

访问：

		http://127.0.0.1:8080
		
我们即可在首页看到home和about的链接，点击home可以显示home组件，点击about，如果还没有加载过，就加载about组件。

对index.html内的代码稍作解释:

1. 组件定义为function(resolve, reject) {}函数，其内调用load函数，成功后resolve，否则reject
2. 函数load内通过创建标签script加载指定文件，并通过onload事件当加载完成后，通过Vue.component验证组件，存在就resolve,否则reject


以上就是我对Vue杂项的一些理解，希望大牛提出一些宝贵的意见，谢谢
