---
title: Vue动态组件的运用
categories:
  - Vue
tags:
  - Vue
  - Vue动态组件
copyright: true
comments: true
abbrlink: 88e917f9
date: 2017-04-08 16:08:06
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 组件在之前已经介绍过了，今天分享一下动态组件，通过使用保留的 <component> 元素，动态地绑定到它的 is 特性，我们让多个组件可以使用同一个挂载点，并动态切换

<!--more-->


### 动态组件 :is的用法

>首先在主页面中创建一个用来切换组件的标签

```javascript
<span @mouseover="com='com2'">切换到第二个组件</span>			
```

>其次，使用<component> 元素，动态地绑定到它的 is 特性，is中的值是组件的名称
```javascript
//keep-alive 保留原来的状态

<keep-alive>
	<component :is='com'></component> //通过 :is 属性 指明要变成的组件
</keep-alive>
```

>接着在js中注册全局组件

```javascript
Vue.component('com2',{
	template:'<div>组件2 <input type="text" /> </div>'
	
});

var app = new Vue({
	el:'#app',
	data:{
		com:'com1'
	}
})
```


### 动态组件的原理步骤

1. 它会根据component 标签里 :is 来寻找Vue实例中 data的数据

2. 这时com指向com1的组件,所以component的内容为com1组件的内容

3. span标签中 @mouseover="com='com2'" 可以提取Vue实例中的data数据,实现动态调整组件


以上就是我对Vue动态组件的一些理解，希望大牛提出一些宝贵的意见，谢谢
