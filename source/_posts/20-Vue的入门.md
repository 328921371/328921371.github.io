---
title: Vue的入门及介绍
categories:
  - Vue
tags:
  - Vue
copyright: true
comments: true
abbrlink: 915832d3
date: 2017-02-15 09:20:11
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 最近开始接触用户界面的渐进式框架-Vue。Vue采用自底向上增量开发的设计，是一个轻量级框架 。这里先给出[Vue的官网](https://cn.vuejs.org/)

<!--more-->

### Vue介绍

Vue是JavaScript的一个框架，是国内个人开发的,虽然是轻量级,但是功能强大。

渐进式框架：没有非常强的主张

使用的是MVVM的模式：提供高效的数据绑定和灵活的组件系统。


### 使用Vue (使用版为2.4.*)

开始学习Vue时我们先不适用Vue-cli进行搭建项目，使用cdn来引入Vue进行单页面的学习

稍微介绍一下大致具有哪些属性，这里只列出常用的几种

### 模板语法

1. 采用双大括号插入值,原样式输出(不编译标签,纯文本) 

2. v-html 插入 html内容(编译标签)

3. v-bind: 动态添加属性 (缩写: v-bind: => :)

4. v-on:click 绑定事件 (缩写: v-on:click => :@click)

>注意：双大括号中是单个表达式，可以写入简单的javascript代码，不能使用多行的if/else，可以使用三元运算符进行判断

这里先贴出Vue单页面的代码，在代码中进行介绍各个属性的含义

```javascript
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Vue的入门及介绍</title>
		<script src="https://cdn.jsdelivr.net/npm/vue" type="text/javascript" charset="utf-8"></script>
	</head>
	<body>
		<div id="app">
			<span>{{ message }}</span> // {{ }} 用来插入值
			//标签内可以插入Vue的指令
		</div>
	</body>
	<script type="text/javascript">
		//如果使用vue 可以创建一个Vue的实例
		var app = new Vue({
			el: '#app',  //el:制定模版，主模板不能指定到body
			data: {
				message: '你好 世界' //data 里面是数据
			},
			methods:{
				//methods里面写入函数
			},
			filters:{
				//filters里面写入过滤器
			},
			computed:{
				//computed里面写入计算属性
			}
		})
	</script>
</html>
```

### 指令

指令 (Directives) 是带有 v- 前缀的特殊属性。指令属性的值预期是单个 JavaScript 表达式 (v-for 是例外情况，稍后我们再讨论)

* 只有指令名 (v-if="值")

* 带有参数的,:后面是参数 (v-bind:title)

* 带参数的,:后面是参数;带修饰符的 .后面是修饰符 (v-on:click.prevent)

还有很多指令，在后面会提到。

给个例子，在代码中可以更直观的看出

```javascript
<div id="app">
	<!-- 1. v-if 指令,当为true时候渲染这个标签-->
	<p v-if="true">能不能看到我</p>
	
	<!-- 2. v-bind 指令: 带有参数的指令 -->
	<p v-bind:title="message">标签上有标题</p>
	
	<!-- 3. v-on 指令 绑定事件-->
	<button v-on:click="go($event)">求点击</button>
	
	<!-- 4. 需要阻止默认事件 可以使用v-on:click.prevent .prevent是修饰符 -->
	<a href="http://www.baidu.com" v-on:click.prevent="go">点击进入百度</a>

</div>

```

>调用方法时 加()和不加()的区别

* 什么都不加,就是传递一个event事件
* 加()什么都不写,就是不传递参数
* 加(),()里写参数就是传递参数,$event就是传递事件

### 过滤器

过滤器可以串联：

```javascript
	{{ message | filterA | filterB }}
```

可以接收多个参数：

```javascript
	{{ message | filterA('arg1', arg2) }}
```

给个简单的例子

```javascript
<div id="app">
	<!--第一个是参数 | 第二个是方法的名字-->		
	
	<p>2的三次方等于{{ 2 | pow(3) }}</p>
	
	<p>2加3 加5等于{{ 2 | add(3,5) }}</p>//多个参数的时候可以直接在第二个后面跟
	
</div>
```

>注意!!! 过滤器函数,必须要有一个参数

```javascript
filters:{
	pow(num1,num2){
		return Math.pow(num1,num2)
	},
	add(n1,n2,n3){
		return n1 + n2 + n3
	}
}
```


正在学习Vue中，讲的不是太详细清楚，有好的博客欢迎和我分享一下