---
title: Vue修饰符
categories:
  - Vue
tags:
  - Vue
copyright: true
comments: true
abbrlink: 6ae493f2
date: 2017-03-02 14:11:20
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> Vue的修饰符往往能起到许多意向不到的作用，和大家分享一下吧

<!--more-->

Vue的修饰符分为鼠标修饰符和键值修饰符，鼠标按钮修饰符还有系统修饰符以及Vue 2.5.0新增的exact 修饰符，各有各的用法


### 鼠标的修饰符

1. .stop 	阻止单击事件冒泡
2. .prevent 阻止默认事件
3. .capture 添加事件侦听器时使用事件捕获模式
4. .self  	只当事件在该元素本身（比如不是子元素）触发时触发回调
5. 修饰符可以串联使用,不过要注意前后关系(用 @click.prevent.self 会阻止所有的点击，而 @click.self.prevent 只会阻止元素上的点击。)
6. .once 	事件只触发一次

```javascript
<!-- 阻止单击事件冒泡 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件侦听器时使用事件捕获模式 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当事件在该元素本身 (比如不是子元素) 触发时触发回调 -->
<div v-on:click.self="doThat">...</div>

<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>
```

### 键值的修饰符

在监听键盘事件时，我们经常需要监测常见的键值。Vue 允许为 v-on 在监听键盘事件时添加关键修饰符：

```javascript
<!-- 只有在 keyCode 是 13 时调用 vm.submit() -->
<input v-on:keyup.13="submit">
```

记住所有的 keyCode 比较困难，所以 Vue 为最常用的按键提供了别名：

```javascript
<input @keyup.enter="submit">
```

* .enter
* .tab
* .delete (捕获“删除”和“退格”键)
* .esc
* .space
* .up
* .down
* .left
* .right

>可以通过全局 config.keyCodes 对象自定义键值修饰符别名：

```javascript
// 可以使用 v-on:keyup.f1
Vue.config.keyCodes.f1 = 112
```

### 系统修饰键

可以用如下修饰符开启鼠标或键盘事件监听，使在按键按下时发生响应。

* .ctrl
* .alt
* .shift
* .meta

举个简单的例子：

```javascript
	<!-- Alt + C -->
	<input @keyup.alt.67="clear">
	<!-- Ctrl + Click -->
	<div @click.ctrl="doSomething">Do something</div>
```

>修饰键比正常的按键不同；修饰键和 keyup 事件一起用时，事件引发时必须按下正常的按键。换一种说法：如果要引发 keyup.ctrl，必须按下 ctrl 时释放其他的按键；单单释放 ctrl 不会引发事件。

### 鼠标按钮修饰符

1. .left	
2. .right	
3. .middle	

这些修饰符会限制处理程序监听特定的滑鼠按键。

### .exact 修饰符

.exact 修饰符应与其他系统修饰符组合使用，以指示处理程序只在精确匹配该按键组合时触发。

```javascript
	<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
	<button @click.ctrl="onClick">A</button>
	<!-- 只有在 Ctrl 被按下的时候触发 -->
	<button @click.ctrl.exact="onCtrlClick">A</button>
```

### 为什么在 HTML 中监听事件?

1. 扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法。
2. 因为你无须在 JavaScript 里手动绑定事件，你的 ViewModel 代码可以是非常纯粹的逻辑，和 DOM 完全解耦，更易于测试。
3. 当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何自己清理它们。


以上就是我对Vue修饰符的一些理解，希望大神们可以指出错误，谢谢
