---
title: RequireJS插件的使用
categories:
  - javaScript
tags:
  - javaScript
copyright: true
comments: true
abbrlink: 56b1bf7f
date: 2017-01-03 15:19:06
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> RequireJS 是一个JavaScript模块加载器，使用RequireJS加载模块化脚本将提高代码的加载速度和质量。今天和大家分享一下RequireJS插件的使用

<!--more-->

关于RequireJS，我也还在学习中，下方贴出核心代码，和一下注释，更多详细的教程可以阮一峰老师的文档中看一看

### require text插件

1. 需要导入 require.js 和 text.js

2. 使用text!,可以得到文件中的内容,需要注意路径

```javascript
		require(['libs/text!resource/textc.css','libs/text!resource/texth.html','libs/text!resource/textt.txt'],function(cssStr,htmlStr,textStr){
			console.log(cssStr);
			console.log(htmlStr);
			console.log(textStr);

			document.getElementById('st').innerHTML = cssStr;
			document.body.innerHTML = htmlStr + textStr;
		})
```

### require domReady插件

需要导入 require.js 和 domReady.js

```javascript
	require(['libs/domReady'],function(domReady){
		domReady(function(){
			domReady()会在html文件加载完成时调用
		})
	})
```

### require css插件

需要导入 require.js 和 css.js	---将css.js ! style.css 写在一起

如何利用 requireJs 加载 css 文件

```javascript
		//libs/css --> libs/css.js
		//css/style --> css/style.css
		//中间以 '!' 隔开
		require(['libs/css!css/style'],function(){
			// 其实 css.js 实现原理很简单，读取 css 文件内容，创建 style
			// 标签，把 css 内容拼接进去，把 style 标签放到 head 中。
			alert('js和css资源加载完毕');
		});
```

### require 使用模板插件

需要导入 require.js 和 template-web.js

```javascript
	//这里先引入template 和 模板
	require(['template-web','text!template.html'],function(template,templateStr){

		var fun = template.compile(templateStr);//template.compile()函数返回的是一个渲染的函数,参数是一个模板的字符串


		var htmlStr = fun(data);//通过一个渲染函数，可以将数据渲染到 渲染函数的模板上

		document.body.innerHTML = htmlStr;//最终可以的到一个被渲染后的字符串

	})
```

### require 压缩合并

需要导入 require.js 和 r.js

这里是压缩js--------首先要配置bulid.js文件

#### 配置require

```javascript
		({
			paths:{-------使用require.js 进行js优化时，不能加载网络文件

				requireLib:'require',-----如果要将require.js也压缩，那需要在paths中加上

				jquery:'empty:'---如果不想压缩某个js，就可以将其配置成：empty:
			},
			include:['requireLib','jquery'],---include 相当于引入哪些文件，需要压缩合并的文件

			name:'index',---设置优化的js文件入口  ---这里的index.js将要压缩的js都导入进来require(['js1'])

			out:'index-build.js'---生成优化后的文件名字及路径
		})
```

		在命令行输入(先cd到当前文件夹)

		node r.js -o build.js  ---这是压缩合并的

		node r.js -o build.js optimize=none ----合并不压缩

踩坑！！！！！ 有时候文件里的注释会导致压缩失败

			全局安装require

			npm i -g requirejs

			cd 文件夹

			node r.js -o build.js

#### 压缩css

			先新建一个index.css----@import url("css/css1.css");

			node r.js -o cssIn=index.css out=index-bulid.css

以上就是我对requireJs插件的一些理解,不足之处希望大牛们多提一些意见,感激不尽
