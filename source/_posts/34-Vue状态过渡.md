---
title: Vue状态过渡
categories:
  - Vue
tags:
  - Vue
copyright: true
comments: true
abbrlink: 20d1f4c9
date: 2017-06-20 19:50:02
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> Vue 的过渡系统提供了非常多简单的方法设置进入、离开和列表的动效。那么对于数据元素本身的动效呢，Vue使用第三方库来实现切换元素的过渡状态。

<!--more-->

数据元素本身的动效有哪些？

1. 数字和运算
2. 颜色的显示
3. SVG 节点的位置
4. 元素的大小和其他的属性

之前在讲计算属性的时候有提到过，Vue提供了一种更通用的方式来观察和响应 Vue 实例上的数据变动：侦听属性(watch)。那个时候说一般都是使用computed，但是存在即是有道理的，watch有他自己的优势。

先来看一个例子，输入数字后，数字做动画效果，使用Tweenjs：

首先导入 https://fastly.jsdelivr.net/npm/tween.js@16.3.4

```javascript
<div id="app">
	<input type="number" v-model="number">
	{{ animateNumber }}
</div>
```

```javascript
new Vue({
	el:'#app',
	data:{
		number:0,
		animateNumber:0
	},
	watch:{ //watch 观察,可以指定观察的属性(数据),属性一旦发生改变,就会调用观察所对应属性的 函数
	  number(newValue,oldValue){//传入两个值，一个新的，一个旧的
		
		var vm = this;//接收this，下面赋值用到
		
		var tween = new TWEEN.Tween({
			x : oldValue
		})
		.to({
			x : newValue
		},2000)
		.easing(TWEEN.Easing.Elastic.InOut)//过渡形式,有很多种
		.onUpdate(function(){//监听更新
			vm.animateNumber = this.x.toFixed(0)//将平滑值赋值
		})
		.start();// 开启启动动画
		
		animate();//运行动画效果
 
		function animate () {
			//TWEEN.update() 触发更新方法
	        if (TWEEN.update()) {
				//请求帧动画的方法				        
	        	requestAnimationFrame(animate)
	        }
	    }
	  }
	}
})
```

直接在代码里解释比较详细，在官网的例子上做了些注释，更多的例子可以去官网学习一下。

以上就是我对Vue状态过渡的一些理解，有哪里不对的欢迎提出

