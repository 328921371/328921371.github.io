---
title: Vue自定义指令
categories:
  - Vue
tags:
  - Vue
copyright: true
comments: true
abbrlink: 8833154b
date: 2017-07-03 11:14:55
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 除了核心功能默认内置的指令 (v-model 和 v-show)，Vue 也允许注册自定义指令。关于自定义指令，官网讲的很详细，我只是讲一下学习的过程

<!--more-->

### Vue的自定义指令

* Vue.directive()定义指令的方式,
* 参数1 为 指令名 写的时候不加v-  用的时候要加	
* 参数2 为 对象----对象的内容:(对象提供定义指令的几个钩子函数(可选))

* bind：指令第一次绑定到元素时调用，只会调用一次。
* inserted：被绑定的元素插入到父节点时调用。
* update：被绑定的元素在模板更新后调用。
* componentUpdated：被绑定元素模板完成一次周期更新时调用
* unbind：在指令从元素上解除绑定时调用，只会调用一次。

举个简单的例子:假设我有三个输入框，利用自定义指令，将输入框每隔一秒，依次获取焦点

```javascript
<div id="app">
	<input type="text" v-focus>
	<input type="text" v-focus>
	<input type="text" v-focus>
</div>
```

```javascript
var i = 0;
Vue.directive('focus', {	// 当绑定的元素插入到 DOM 时调用此函数……
  inserted: function (el) {
  	i++;
    setTimeout(function(){
    	el.focus(); // 元素调用 focus 获取焦点   	
    },1000 * i)//定义一个i 第一次执行1秒 第二次 执行 2秒 第三次 执行 3秒  
  }
})

```

自定义指令讲的不是很详细，更多的需要自己去实践一下才知道，有哪里不对的地方欢迎提出。