---
title: Vue混合对象
categories:
  - Vue
tags:
  - Vue
copyright: true
comments: true
abbrlink: '70300033'
date: 2017-07-15 18:33:14
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 混合 (mixins) 是一种分发 Vue 组件中可复用功能的非常灵活的方式。混合对象可以包含任意组件选项。以组件使用混合对象时，所有混合对象的选项将被混入该组件本身的选项。

<!--more-->

在看vue的混合对象之前，我们先了解一下其他混合对象的方法

1. for 循环

		for(var value in obj){
			zhangsan[value] = obj[value]
		}

2. $.extend

		var newzhangsan = $.extend(true,{},zhangsan,obj);

3. es6方法

		console.log(Object.assign(zhangsan,obj));

4. es7方法

		console.log({...zhangsan,...obj});//如果是数组就用[]

5. lodash 方法, 一旦设置了相同属性的值，后续的将被忽略掉。

		console.log(_.defaultsDeep(zhangsan,zhangsi));

接下来我们看一下Vue的方法，官方的文档对这一个模块也讲的挺详细的

```jaascript
var myMixin = Vue.extend({	//定义混合 混合的作用:代码的复用性
	data(){
		return {
			author: 'Mr.chen'
		}
	},
	created(){ 		//每一次调用或者引入都会执行
		console.log('作者' + this.author)
	}
})

Vue.component('com1',{
	mixins:[myMixin], 	//混合过来多个对象, mixins固定用法
	
	template:`<div>{{message}}的作者是 {{ author }}</div>`,
	data(){
		return {
			message:'javascript'
		}
	},
	created(){
		console.log('你好世界')
	}	
})
```

关于混合对象我也只是稍微了解了一下，在实际中并没有用到，有兴趣的小伙伴可以自行去官网上研究。
