---
title: express请求处理管线
categories:
  - Node
tags:
  - Node
copyright: true
comments: true
abbrlink: '646e5108'
date: 2016-11-15 20:13:53
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> express是一个简洁而灵活的 node.js Web应用框架，这个要介绍起来太多了，现在的Node是越来越火了，今天就分享一下express请求处理管线的基本使用

<!--more-->

Node的代码及安装配置我就不贴出来了，这里将主要代码给分享一下

为什么要用到管线？研究问题通常要带着目的去研究，管线的作用是什么？简单的来说，javaScript的代码是以此执行的，在请求数据或其他工作时，有时候是需要依赖性的，所以管线的作用就体现出来了，通常是在请求之前，先执行管线中代码，再执行之后的代码，在工作中经常用在判断cookie的存在

### 基本的管线处理

```javascript
		// 请求处理管线中的一个函数
		// req: 请求对象    res：响应对象
		// next : 下一个等待处理请求的回调函数
		function firstFun(req,res,next){
			console.log(req.query);
			// 当前函数中的所有内容执行完后，可以进行回调下一个处理函数
			next();
		}
		多个函数可以写入数组中
		app.get('/',[firstFun,secondFun],function(req,res){
			console.log('请求成功了...');
			res.send('收到来自 / 的请求');
		});
```

### 处理请求响应数据的乱码问题

```javascript
		function charSet(req,res,next){
			// res.set()  设置响应头
			// res.set('头字段','值')    设置单一的响应头
			// res.set({'头字段': '值','头字段': '值'...}) 批量设置响应头
			// Content-type ：设置响应数据内容类型，并且同时制定了编码格式(防止乱码)
			res.set('Content-type','text/html;charset=utf-8');
			console.log('通用功能，设置响应头编码问题');

			next();
		}

		// app.use() ： 可以在默认处理管线(所有请求接口的处理管线)中
		// 添加一个回调函数，每次请求都会先来执行默认管线中的回调
		// 函数，然后再执行各自接口的处理管线中的回调函数


		app.use(charSet);//重点:!!!!!!!
```

app.use(charSet)千万要记得写，踩了一次坑

### 获取参数

```javascript
		app.get('/index/:age',function(req,res){
			// 获取参数的方法

			var name = req.query.name;
			var age = req.query.age;

			// 后台获取客户端数据的方法
			/*
			 *  1. 获取 url 中 ? 后面的参数 key=value
			 * 		get 请求的时候url后面的参数获取
			 *      通过 ： req.query.key
			 *  2. 获取请求体中的数据(通过 post 请求的时候才能这样做)
			 *     比如： req.body.key
			 * 	   如果是用 urlencoded 编码 就用 body-parser 模块
			 *     如果是用 mutipart/form-data 需要用 multer 模块
			 *  3. 获取请求头里面的数据
			 *     比如 req.get(key)
			 *  4. 获取 cookie 中的数据
			 *     比如 req.cookies.key 需要引入 cookie-parser
			 *  5. 获取 url 路径中的数据
			 *     比如 req.params.key
			 *     这种获取数据的方法在请求的时候需要这样去写 ： /index/20(数值)
			 *     将参数写在 path 中相对于把参数写到 ? 后面，更加
			 *     容易被用户和浏览器引擎识别，又被称为  友好的 url
			 */

			console.log(req.params.age);

			res.send('收到来自 index 的请求');

		});

```

以上就是我对express-请求处理管线的理解，因为也在学习中，所以总结的不是很到位，希望大家有好的博客也可以和我分享
