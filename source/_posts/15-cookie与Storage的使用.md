---
title: Cookie与Storage的使用
categories:
  - javaScript
tags:
  - Cookie
  - Storage
copyright: true
comments: true
abbrlink: '560e7496'
date: 2017-01-15 10:19:06
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 很多小伙伴都知道，本地存储用的大多数是cookie,还有用的是sessionStorage和localStorage,当时他们具体是怎么使用的呢，又有哪些区别？

<!--more-->

### Cookie

一、 使用cookie(cookie存储大小约4K)

	在使用cookie之前首先导入 jquery.js 和 jquery.cookie.js 文件，
	
二、 DOM 原生方法:

```javascript
		//存:
			document.cookie = 'name=小白';		
		//取:
			document.cookie.split(";")[0].split("=")[1];
```

三、 jquery 方法:

```javascript
		//存:
			$.cookie('name','小白',{expires:n});
		//取:
			$.cookie('name');
```

注意:第三个参数可以是{expires:n},表示存储多少天,否则关闭浏览器后消失


#### 使用cookie的弊端


1. Cookie数量和长度的限制。每个domain最多只能有20条cookie，每个cookie长度不能超过4KB，否则会被截掉。

2. 安全性问题。如果cookie被人拦截了，那人就可以取得所有的session信息。即使加密也与事无补，因为拦截者并不需要知道cookie的意义，他只要原样转发cookie就可以达到目的了。

3. 有些状态不可能保存在客户端。例如，为了防止重复提交表单，我们需要在服务器端保存一个计数器。如果我们把这个计数器保存在客户端，那么它起不到任何作用。


### Storage

####  sessionStorage的使用	(大小约为5MB)

```javascript
		//存:
			sessionStorage.setItem("name","白白");
		//取:
			sessionStorage为一个对象，可以打点取值
			console.log(sessionStorage.name);
			console.log(sessionStorage.getItem("name"));
			
		//查看存储个数：
			sessionStorage.lenght
		//删除单个:
			sessionStorage.removeItem("name")
		//清空所有:
			sessionStorage.clear();
		//循环输出:
			for(var i in sessionStorage){
				console.log(sessionStorage[i])			
			}
		//可以用JSON进行转化,否则只能存取字符串:------可以进行封装
			sessionStorage.setItem("obj",JSON.stringify({a:10,b:20}));
			console.log(JSON.parse(sessionStorage.getItem("obj")));
```

#### localStorage的使用(本地储存)

	有效期-除非手动清除,否则会一直存在，同一个域使用
	
	localStorage 与	sessionStorage 	的使用方法一样



### 离线缓存

	首先npm init 和 express

	第一步：html里manifest  设置离线文件
		<html manifest="index.manifest">~~~=号里的是文件的名字
	
	第二步:配置index.manifest文件
		
		CACHE MANIFEST # 这句一定要写	#是注释符号

		# 2017-08-23	v1.0.0
		
		# 缓存文件列表-----缓存什么就写什么
		CACHE：
		index.html
		images/0.jpg
		jquery/jquery.js
		js/Music.js
		mp3/click.mp3 
		
		# 不缓存的文件列表
		NETWORK:
		index.manifest 
		
		# 离线失败时显示的页面
		FALLBACK:
		html/index.html
		
		
	第三步:
		文件改变，用户不会手动清缓存,如果index.manifest 文件发生改变，会自动执行下面监听方法
		
```javascript
		window.applicationCache.addEventListener('updateready',function(){
			console.log('改变了')
			if (window.applicationCache.status == window.applicationCache.UPDATEREADY){
				if(confirm('新版本发布了，是否现在更新最新版本')){
					//更新替换缓存
					window.applicationCache.update();
					//刷新页面
					window.location.reload()
				}
			}	  
		})
```

>补充一个MD5加密

	//首先要有md5.js
	var name = hex_md5("陈晟");
	//得到一串乱码，不能逆向
	

以上就是我对Cookie的一些理解,不足之处希望大牛们多提一些意见,感激不尽


