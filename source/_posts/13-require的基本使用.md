---
title: require的基本操作
categories:
  - javaScript
tags:
  - javaScript
  - AMD
copyright: true
comments: true
abbrlink: bec53495
date: 2016-12-28 20:19:06
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 为什么要用到require？首先，当js文件 都引入的同一个文件下时，会导致命名冲动。其次，js文件之间存在依赖关系，因此必须严格保证加载顺序，依赖性最大的模块一定要放到最后加载，当依赖关系很复杂的时候，代码的编写和维护都会变得困难。所以require很好的解决了这个问题

<!--more-->

require.js的教程推荐 推荐阮一峰老师的日志，这样附上链接 [request.js教程](http://www.ruanyifeng.com/blog/2012/11/require_js.html)

我简单的和大家分享一下学习的过程，

### require的基本使用

	这里的js1，js2，main，require，html文件都是自己创建的

#### html界面

		<script src="require.js"  data-main="main" type="text/javascript" charset="utf-8"></script>

这里的src导入的是require.js------这里的main为主文件的路径，可以不加.js

#### js页面

		简单的创建几个变量作为测试。比如var a = 5;var b = 10;
		这里的js页面不用独立作用域,不需要return

#### main页面

```javascript
		require(['js1','js2'],function(){
			console.log(num)
		})
```

当js1和js2没有独立的时候,main可以使用js1 和 js2 文件中的任意变量,

require.js 默认会把入口js文件所在的路径,作为基本路径,加载其他文件中的js时,需要改变路径

参数一:是一个数组,数组中规定了需要导入的js文件的文件路径,可以同时加载多个js文件
参数二:是一个回调函数,等一个参数中的所有js文件全部被加载完成后,才会进行回调参数二中指定的回调函数

### require的模块化(AMD)

全称是Asynchronous Module Definition，即异步模块加载机制

requireJs优点:

1. 说明不同js文件之间的依赖
2. 可以按需求，并行，延时去加载js库
3. 可以让我们的代码已模块的方式使用

我将主要代码贴出

#### html页面
		这个页面和之前的一样

#### js页面

需要define(),有三个参数：

1. 模块的名称		--------可省略
2. 需要依赖的js	--------可省略
3. 回调函数

```javascript
		define(function(){
			var a = 5;
			var b = 10;
			var c = 15;
			var num = 20;

			return{a,c}
		})

		//这里需要注意一下，因为导入了js3，所以可以使用js3中的str----这里的js3没有独立
		define(['js1','js3'],function(js1){
			function fun(){
				console.log('这是js2中的函数' +  str)
			}
			return fun
		})
```

#### main页面

```javascript
		require(['js1','js2'],function(js1,js2){

			//js3里面的str在这里也可以被使用，因为js3没有独立，而且已经被js2导入了
				console.log(str)
			//由于js1和js2已经独立了，所以在main里面只能用js1 和js2 导出的模块功能
		})
```

### require导出模块的四种方式

#### 第一种

定义模块：define
导出模块中的功能:return

```javascript
		define(function(){
			return {}
		})
```

#### 第二种

定义模块：define
导出模块中的功能 exports

注意点:

1. 需要导入exports作为依赖项
2. 需要有参数
3. 导出时一个一个导出

```javascript
		define(['exports'],function(exports){
			var num1 = 11;
			exports.num1 = num1;
		})
```

#### 第三种

定义模块：define
导出模块中的功能 module.exports

注意点：

1. 这里需要导入module作为依赖项
2. 需要有参数
3. 导出时以对象的形式导出

```javascript
		define(['module'],function(module){
			var num1 = 111;
			module.exports = {num1}
		});
```

#### 第四种

注意点：

1. 这里需要导入require作为依赖项
2. 需要有参数
3. 其他与第三种方法差不多

```javascript
		define(['require'],function(require){
			var module = require('module')
			var num1 = 1111;
			module.exports = {num1}
		});
```

之后在main文件中

```javascript
		require(['m1','m2','m3','m4'],function(m1,m2,m3,m4){
			console.log(m1);
			//使用什么就打点调用什么
		})
```

### require的配置及define时定义名字怎么使用

假设我们要使用一个jq全屏插件，怎么使用require进行配置依赖项

这是需要用到的js文件： jquery.fullscreen.js

最终实现这样的效果： $(document).fullScreen(true)

变量名是随便起的，主要是介绍一下主要的知识点是什么意思

#### define()使用名字：

```javascript
		define('moduleA1',function(){
			console.log('这个是a.js中的moduleA1');
			return '这个是a.js中的moduleA1'
		})
```

一个js文件中可以定义多个模块，一个文件中定义多个模块的话，尽量去使用模块名称进行区分

```javascript
		define('moduleA2',function(){
			console.log('这个是a.js中的moduleA2');
			return '这个是a.js中的moduleA2'
		})
```

#### 在主界面main中配置require

```javascript
		require.config({
			baseUrl:'lib',----- 配置基本路径，默认的是入口js文件所在的路径

			paths:{
				test:'../scripts/aaa/bbb', ----配置不放在基本路径上的js的路径
				test1:'http://cdn.jquery-3.2.1/' ---含有URL协议的也可以，比如http，导入时不要写后缀.js
				a:'../scripts/a'
			},
			shim:{  ---------配置依赖项，当依赖的模块全部加载结束之后，才会执行当前脚本
				jqueryFullscreen : ['jquery','test']	---对象的属性为模块名（js的名字），数组中的元素一般是相对与baseUrl的路径，只不过没有文件后缀
			},
			bundles:{--模块树，如果一个js文件中有多个模块，就可以使用这种方法来进行解决
				a:['moduleA1','moduleA2']	---之前定义的名字在这里使用
			},
			waitSeconds:7 ----设置等待加载，默认7秒

		});
```

配置完之后，就可以使用模块的名字了,要记得写参数

```javascript
		require(['jqueryFullscreen','moduleA1','moduleA2'],function(a0,a1,a2){
			console.log(a1);
			console.log(a2);
			console.log($.fn.fullScreen);
			console.log(str);

			$('div').click(function(){
				$(document).fullScreen(true)
			})
		})
```

require的知识还有许多，这里只是一些入门，如果有错，希望大牛们指点一下，感激不尽