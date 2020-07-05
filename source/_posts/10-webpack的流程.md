---
title: webpack的流程
categories:
  - webpack
tags:
  - webpack
copyright: true
comments: true
abbrlink: 5a946dbb
date: 2016-12-02 22:23:44
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 最近开始学习webpack打包工具，和大家分享一下webpack的具体流程

<!--more-->


### Webpack是什么?

1. 一个打包工具: 将所有的资源都打包成一个js文件

2. 一个模块加载工具

3. 将各种资源都可以当做模块来处理

### 对于模块的组织,通常有以下几种方法

1. 通过书写在不同文件中,使用 script 标签进行加载

2. 通过CommonJS文件加载,如: nodeJS 就使用这种方式

3. AMD 进行加载, require.js 使用的就是这种方式

4. ES6模块 通过import export

### Webpack的特点是什么?

1. Webpack 是 以 CommonJS 的形式来进行编写脚本的,但是对 AMD / CMD 的支持也很全面的,方便
旧项目进行代码迁移

2. 能被模块化的不仅仅是JS了

3. 开发便捷,能够替代部分grunt/gulp 的工作, 比如 打包,压缩,混淆,图片转base64 等

4. 扩展性强,插件机制完善

>名词解释:	
AMD 即异步模块加载机制,完整描述了模块的定义，依赖关系，引用关系以及加载机制
作为一个规范，只需定义其语法API，而不关心其实现。AMD规范简单到只有一个API，即define函数

>CMD 命令行(Command Processor) 一般指命令提示符,命令提示符是在操作系统中，提示进行命令输入的一种工作提示符。

>CommonJS 是一种规范，NodeJS是这种规范的实现。CommonJS API定义很多普通应用程序（主要指非浏览器的应用）使用的API
在兼容CommonJS的系统中，你可以实用JavaScript程序开发：

### Webpack的安装

全局安装一个webpack

		npm install -g webpack

### 体验

#### 生成 js 命令(将哪个js打包成哪个js)

>webpack ./entry.js bundle.js

#### 将css 打包 成 js--需要安装 加载器(css加载器 与 style加载器)

并安装插件
npm install css-loader 
npm install style-loader 

		注意: 这里需要在入口文件导入css , require('style-loader!css-loader!./style.css');
		
同样执行 webpack ./entry.js bundle.js


### 配置

1. 配置文件名为: webpack.config.js 默认会找这个文件

2. 打包命令 webpack

>附上基本的 webpack.config.js 配置

```javascript
		module.exports = {
		    entry: './entry.js',	//	配置入口文件 (入口文件中可以导入其他js或css文件)(var content = require('./content.js') 和 require('./style.css');)
		
		    output: {	//	配置保存的路径
		        
		        path: __dirname,	// 文件路径,__dirname 代表当前目录,当前文件所在的路径
		        
		        filename: 'bundle.js'	// 打包后的文件名
		    },
		    
		    module: {	//模块部分
		    	
		        loaders: [	// 加载器 可以配置多个
		            {
		            	
		                test: /\.css$/,	//匹配以 .css 结尾的文件
		                
		                loaders: 'style-loader!css-loader'	//指定加载的
		            }
		        ]
		    },
		    // 配置web-dev-server
 			// 第一种：iframe模式 顶部带一个黑条
  			// 第二种：inline模块  不带黑条 true
		    devServer: {
			    inline: false 
			}
		}
```


### 服务器相关配置

>作用:  当文件发送变化时,会自动执行重新生成文件

全局安装:
npm install webpack-dev-server -g

本地安装
npm install webpack-dev-server

服务器运行(会生成 127.0.0.1:8080-- 打开就可以看到了)
webpack-dev-server

### ES6 转化 ES5

#### 创建个文件夹，初始化一下，首先全局安装webpack

#### 安装babel

		npm install --save-dev babel-core babel-preset-es2015  
		npm install --save-dev babel-loader  
		
#### 创建一个文件app.js，里面写入现在浏览器不全支持的es6代码

		let a = 111;  
		let b = 222;  
		var xxx = (c,d) => c*d;  
		console.log(xxx(a,b));  

#### 创建webpack配置文件

```javascript
		module.exports = {
		    entry: './app.js',
		    output: {
		        path: __dirname,
		        filename: 'bundle.js'
		    },
		    module: {  
		        loaders: [{  
		            test: /\.js$/,  
		            exclude: /node_modules/,  
		            loader: 'babel-loader' ,
		            query: {
		                presets: ['es2015']
		            }
		        }]  
		    }
		}
```

>entry和output都是通用的配置，与ES6无关，这里不展开。
重点在loaders配置，loader和query一定要配置test配置指定了哪些是ES6代码,
可以指定一个文件夹,则所有源代码一定要放在该文件夹下,
或者用一个 正则表达式指定哪些是ES6代码。只有ES6代码，才会编译。

#### 运行 webpack

出现下面这些指令则运行成功

		function(module, exports) {  
		  
		"use strict";  
		  
		var a = 111;  
		var b = 222;  
		var xxx = function xxx(c, d) {  
		  return c * d;  
		};  
		console.log(xxx(a, b));  


以上是webpack的基本流程，如果有不对的地方，欢迎提出，谢谢