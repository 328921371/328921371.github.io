---
title: Vue插槽的使用
categories:
  - Vue
tags:
  - Vue
copyright: true
comments: true
abbrlink: 7868cb4a
date: 2017-04-03 14:25:26
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 为了让组件可以组合，我们需要一种方式来混合父组件的内容与子组件自己的模板。这个过程被称为内容分发 。Vue.js 实现了一个内容分发 API，参照了当前 Web Components 规范草案，使用特殊的 <slot> 元素作为原始内容的插槽。

<!--more-->


### Vue 插槽的使用

在注册组件中定义好标签名字，先全局注册一个组件

```javascript
Vue.component('component',{
	template:'#component',
	data(){
		return {}
	}
})
```

在text/html中使用 slot,想要几个就写几个

```javascript
<div>
	<slot name='title'></slot>
	//每个插槽最好都要有自己的名字，不然所有的标签都会被使用
</div>
```

在html中 可以直接使用Vue实例中的data数据

```javascript
<div id="app">			
	<component>
		<h1 slot='title'>标题是:{{ title }}</h1>
	</component>
</div>
```

这就是插槽最基本的使用


### 作用域插槽

作用域插槽是一种特殊类型的插槽，用作一个 (能被传递数据的) 可重用模板，来代替已经渲染好的元素。

>在父级中，具有特殊特性 slot-scope 的 `<template>` 元素必须存在，表示它是作用域插槽的模板。slot-scope 的值将被用作一个临时变量名，此变量接收从子组件传递过来的 prop 对象：

```javascript
<component>
	<template slot='title' scope="props">
	//scope="props" 类似于可以将组件中插槽传递的数据全部获取出来进行打点调用,点的是下面:的东西
		{{message}}
	// message 这个是Vue实例中data的数据
		{{ props}}
	</template>
		
</component>
```

>在子组件中，只需将数据传递到插槽，就像你将 prop 传递给组件一样：

```javascript
//这个是插槽将组件中data的数据传递过去
<slot name='title' :message='message' :title='tit'></slot>
```

>在 2.5.0+ ，slot-scope 能被用在任意元素或组件中而不再局限于 `<template>`。这里演示的是2.4.*的版本，放在template中



以上就是我对Vue插槽的一些理解，还在学习中，哪里有错误请指导小生一下，谢谢
