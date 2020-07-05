---
title: artTemplate的基本语法
categories:
  - javaScript
tags:
  - javaScript
copyright: true
comments: true
abbrlink: f70e6679
date: 2016-10-30 23:27:33
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 比较了几款前端模版引擎，还是选择介绍一下artTemplate，它是前端用来渲染页面的，使用方便以及性能卓越，关于它的介绍以及性能大家可以移步http://cdc.tencent.com/?p=5723。

<!--more-->

我这里分享一下artTemplate基本的使用步骤（需要一定的NodeJs的基础，否则看的很吃力）

### artTemplate的使用步骤

#### 创建一个模板

1. 创建模板需要使用script标签，并且 type要设置成text/html
2. 创建模板是 script 标签必须设置id，才能使用模板
3. 双花括号 表示引用模板数据对象，或者 template 内置的语法关键字

#### 使用模板

```javascript
		var htmlstr = template('templ', data);
		document.body.innerHTML = htmlstr;
```

参数1：需要使用的模板的ID
参数2：套用模板需要使用的数据（data是要传入的数据）

### 模板套模板

artTemplate支持模板中再嵌套一个模板，使用 include 'templ2' value

### 服务器端的模板

```javascript
		var template = require("art-template");
		app.get('/',function(req,res){
			console.log('如果没有index.html，就会执行这个接口')

		//__dirname 为当前服务器的目录
	    console.log("绝对路径为： " + __dirname);


		//template 第一个参数是模板的路径，是绝对路径， 第二个参数是需要渲染的数据
		var htmlStr = template(__dirname + '/tem/art1',data);//这里将文件的html删掉,系统会默认寻找.art文件

		res.status(200).send(htmlStr);
		})
```

还有一种渲染的方法是较为简单的

```javascript
		var render = require('./views/art2')//导入 art2 这里的render就是一个渲染的函数
		var htmlStr = render(data)//把数据当做参数传入进去，将数据渲染到模块上
		res.status(200).send(htmlStr);
```

以上就是我对artTemplate的理解，因为也在学习中，所以总结的不是很到位，希望大家有好的博客也可以和我分享















