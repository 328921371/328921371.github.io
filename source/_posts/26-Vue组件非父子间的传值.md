---
title: Vue组件非父子间传值
categories:
  - Vue
tags:
  - Vue
  - Vue组件传值
copyright: true
comments: true
abbrlink: 83eaa17c
date: 2017-03-28 13:16:14
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> Vue组件之间的传值不仅仅发生在父子间组件中，有时候，非父子关系的两个组件之间也需要通信。

<!--more-->

### 非父子组件的传值

非父子组件的传值大体上也是分为三个步骤，我还是称作三部曲

在简单的场景下，可以使用一个空的 Vue 实例作为事件总线：

#### 第一步

>创建一个 vue 作为中央线来处理 非父子关系的组件传递数据

新建一个bus.js

```javascript
	import Vue from 'Vue'

	var bus = new Vue();
	export default bus;

```

#### 第二步

>在组件二中创建监听事件----注意:监听事件一定要在发射之前,监听才有效

```javascript

//使用前先导入
import bus from '../bus.js';

created(){	//created这个会在注册组件完成是执行,后面再细说
	bus.$on('giveMsg',(value)=>{ //箭头函数的this是指向外部的,所以没有问题
		this.counter += value
		//这里的value是传递过来的值
	})	//可以加bind改变this的指向,普通的匿名函数的指向值bus的
}
```

#### 第三步

在组件一中发射组件

```javascript
methods:{
	add(){
		bus.$emit('giveMsg',ran) //通过bus中央线来发射组件
		//giveMsg类似于事件的名称
		//ran是要传递的参数
	}
}
```

非父子组件的传值与自定义事件的思路是类似的，写法上也大体相同


以上就是我对Vue组件非父子间传值的一些理解，希望大神们可以指出错误，谢谢
