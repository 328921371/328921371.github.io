---
title: uniapp与webview之间的相互传值
categories:
  - uniApp
tags:
  - uniApp
copyright: true
comments: true
abbrlink: b4e32eb
date: 2021-04-19 21:41:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 在uniApp中,有时候我们需要外嵌一个H5在我们的webview中,那怎么让他们之前进行相互传值

<!--more-->

{% note primary  %}
以下代码都是在真机调试中测试的,有一些方法是只有uniapp运行到真机中才可以使用的
{% endnote %}

### 引入的H5文件

这个H5的例子官方是已经有了的,需要注意的就是引入的`uni.webview.1.5.2.js`

我不知道为什么引入外部cdn(https://js.cdn.aliyun.dcloud.net.cn/dev/uni-app/uni.webview.1.5.2.js) 会失效,所以我都是将js下载下来,进行本地引入

H5的源码如下

```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title></title>
		<style type="text/css">
			.btn {
				display: block;
				margin: 20px auto;
				padding: 5px;
				background-color: #007aff;
				border: 0;
				color: #ffffff;
				height: 40px;
				width: 200px;
			}

			.btn-red {
				background-color: #dd524d;
			}

			.btn-yellow {
				background-color: #f0ad4e;
			}

			.desc {
				padding: 10px;
				color: #999999;
			}
		</style>
	</head>
	<body>
		<p class="desc">web-view 组件加载本地 html 示例，仅在 App 环境下生效。点击下列按钮，跳转至其它页面。</p>
    <div class="mui-content">
        <div id="div1"></div>
    </div>
    <input type="file" capture='camera' accept='image/*'>
		<div class="btn-list">
			<button class="btn" type="button" data-action="navigateTo">navigateTo</button>
			<button class="btn" type="button" data-action="redirectTo">redirectTo</button>
			<button class="btn" type="button" data-action="navigateBack">navigateBack</button>
			<button class="btn" type="button" data-action="reLaunch">reLaunch</button>
			<button class="btn" type="button" data-action="switchTab">switchTab</button>
		</div>
		<p class="desc">网页向应用发送消息。注意：小程序端应用会在此页面后退时接收到消息。</p>
		<div class="btn-list">
			<button class="btn btn-red" type="button" id="postMessage">postMessage</button>
		</div>
		<!-- uni 的 SDK -->
		<!-- <script type="text/javascript" src="https://js.cdn.aliyun.dcloud.net.cn/dev/uni-app/uni.webview.1.5.2.js"></script> -->
    <script type="text/javascript" src="uni.js"></script>
		<script type="text/javascript">
			document.addEventListener('UniAppJSBridgeReady', function() {
				document.querySelector('.btn-list').addEventListener('click', function(evt) {
					var target = evt.target;
					if (target.tagName === 'BUTTON') {
						var action = target.getAttribute('data-action');
						switch (action) {
							case 'switchTab':
								uni.switchTab({
									url: '/pages/tabBar/API/API'
								});
								break;
							case 'reLaunch':
								uni.reLaunch({
									url: '/pages/tabBar/API/API'
								});
								break;
							case 'navigateBack':
								uni.navigateBack({
									delta: 1
								});
								break;
							default:
								uni[action]({
									url: '/pages/component/button/button'
								});
								break;
						}
					}
				});
				document.querySelector("#postMessage").addEventListener('click', function() {
					uni.postMessage({
						data: {
							action: 'message'
						}
					});
				})
			});
      function ajaxRequest(a){
        alert('接收到的参数: ', a);
      }
		</script>
	</body>
</html>

```

### H5 发送数据到 uniapp

* H5使用uni.postMessage发送数据

```
uni.postMessage({
  data: {
    action: 'message'
  }
});
```

* webview使用@message进行监听

具体源码如下

```
<template>
  <view>
    <web-view ref='webview' src="/hybrid/html/local.html"	@message="handleMessage" ></web-view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleMessage(evt) {
      console.log('接收到的消息：' + JSON.stringify(evt.detail.data));
    }
  }
};
</script>
```

H5页面的postMessage就是向uniapp发送消息

{% note info  %}
需要注意的是这里的src引入,我这里引入的是本地文件,所以跟着官方的文档走,放在`/hybrid/html/`的路径下
{% endnote %}

### uniapp 发送数据到 H5

百度上大部分的答案都是 通过url就可以向H5进行传参 

这种当然也可以,在H5中,再去获取url中的参数值,但是这种方法只能用在第一次

接下来后续应该怎么传递参数呢

> 获取到这个webview的元素,然后就可以使用evalJS方法了

但是这一步卡了我很久

因为百度到的都是`this.$mp.page.$getAppWebview()`这样的方法

但是 uniapp编译app时使用的都是webview,this.$mp.page.$getAppWebview()获取的是父webview. 所以一直没有evalJS方法

需要打点`.children()[0]; `获取到子级,才是当前的webview

```
const webview = this.$mp.page.$getAppWebview().children()[0]; 
var name = 'mike';
webview.evalJS("ajaxRequest('" + name + "')");
```

然后使用`evalJS`去调用方法就行

{% note warning  %}
注意evalJS方法里的 单引号 和 双引号
{% endnote %}

在H5中,只要有对应的方法就可以了

```
function ajaxRequest(a){
  alert('接收到的参数: ', a);
}
```

> 获取当前的webview,也可以使用下面这种方法

```
var pages = getCurrentPages();  
var page = pages[pages.length - 1];  
var webview = page.$getAppWebview(); //页面栈最顶层就是当前webview  
```

{% note warning  %}
getCurrentPages() 方法是 uniapp 中自带的
{% endnote %}

以上就是我对uniapp与webview之间的相互传值的一些理解,如果文章由于我学识浅薄,导致您发现有严重谬误的地方,请一定在评论中指出,我会在第一时间修正我的博文,以避免误人子弟。