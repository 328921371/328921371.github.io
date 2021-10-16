---
title: Vue过渡动画
categories:
  - Vue
tags:
  - Vue
copyright: true
comments: true
abbrlink: fd437717
date: 2017-05-02 15:46:55
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果。今天和大家分享一下学习的过程

<!--more-->

过渡的方法可以由以下几种进行实现：

1. 在 CSS 过渡和动画中自动应用 class
2. 可以配合使用第三方 CSS 动画库，如 Animate.css
3. 在过渡钩子函数中使用 JavaScript 直接操作 DOM
4. 可以配合使用第三方 JavaScript 动画库，如 Velocity.js

# 在CSS中设置过渡效果

>transition 标签里 放入需要过渡的内容

```javascript
<transition name='fade'>
	<div v-if="seen"><span>我是要过渡的内容</span> </div>
</transition>
```

>在style中写入过渡的内容，假设过渡的名字为fade，实现淡入淡出的效果

```javascript
<style type="text/css">
	.fade-enter-active{
		/* 进入完成 */
		transition: all 1s ease;
		opacity: 1; 	
	}
	.fade-enter{
		/* 进入之前 */
		opacity: 0;
	}
	
	.fade-leave-active{
		/* 离开完成 */
		transition: all 1s linear;
		opacity: 0;
	}
	.fade-leave{
		/* 离开之前 */
		opacity: 1;
	}
</style>
```

>原理稍微介绍一下

1. transition 标签 vue 会自动给其加上对应的样式(v-enter v-enter-active v-leave v-leave-active),v则是我们定义的name的值

2. 带 active 的样式 一定要写在对应的非 active 样式之前

# 在CSS中设置动画效果

之前是过渡，现在我们来看一下动画是怎么实现的，方法和过渡差不多：


一、首先将需要执行动画的元素放到 transition 标签内

二、其次给transition标签起一个名字,transition name='bounce',Vue会自动为transition标签里的目标元素，在适当的添加或删除 

>我们来看一下Vue自动生成的类有哪些：

1. v-enter: 定义进入过渡的开始状态。在元素被插入时生效，在下一个帧移除。
2. v-enter-active: 定义过渡的状态。在元素整个过渡过程中作用，在元素被插入时生效，在 transition/animation 完成之后移除。 这个类可以被用来定义过渡的过程时间，延迟和曲线函数。
3. v-enter-to: 2.1.8版及以上 定义进入过渡的结束状态。在元素被插入一帧后生效（于此同时 v-enter 被删除），在 transition/animation 完成之后移除。
4. v-leave: 定义离开过渡的开始状态。在离开过渡被触发时生效，在下一个帧移除。
5. v-leave-active: 定义过渡的状态。在元素整个过渡过程中作用，在离开过渡被触发后立即生效，在 transition/animation 完成之后移除。 这个类可以被用来定义过渡的过程时间，延迟和曲线函数。
6. v-leave-to: 2.1.8版及以上 定义离开过渡的结束状态。在离开过渡被触发一帧后生效（于此同时 v-leave 被删除），在 transition/animation 完成之后移除。

三、在style中定义动画 animation: bounce-in 1s ease-in; 这里只是举个例子，animation可以根据具体的情况自行定义

四、再将动画补全 @keyframes bounce-in{ }，@keyframes的内容根据自身需求来写

>补充

1. v- 是这些类名的前缀。使用 <transition name="bounce"> 可以重置前缀
2. 可以在transition标签中添加 :duration="{ enter: 500, leave: 800 }" 来控制时间

# 依据动画库设置动画

1. 首先引入animate.css
2. 将自定义动画的动画内容 放入transition标签内
3. 将需要的动画 放在 animated后面,注意前面的class,一定要加

```javascript
	<transition
		name='custom'
		enter-active-class='animated bounceInLeft'
		leave-active-class='animated bounceOutRight'
	>
```

# 在javascript标签中设置动画

这里举一个简单的例子，可以去官方文档查看一下具体的例子

一、首先在transition标签中,写入响应的事件,后面''中填写的是函数名

```javascript
<transition
	name='fade'
	@before-enter='beforeEnter'
	@enter='enter'
	@before-leave='beforeLeave'
	@leave="leave"	
>
```

二、在Vue的实例中,methods里面写入实现相应的函数

>一定要注意,函数需要传入参数,在enter 和 leave 的函数中,要调用 done()，当只用 JavaScript 过渡的时候， 在 enter 和 leave 中，回调函数 done 是必须的 。否则，它们会被同步调用，过渡会立即完成

```javascript
beforeEnter(el) {
	$(el).css({
		opacity : 0
	})
},
enter(el,done){
	$(el).animate({
		opacity : 1
	},1000,'linear',function(){
		done()
	})	 
}
```

动画的效果根据实际的情况进行描写，这里只是介绍了一种动画钩子，还有很多的动画钩子有兴趣的可以去试一下，运用的原理是一样的

# 常见的javascript动画钩子有哪些

1. @before-enter="beforeEnter"
2. @enter="enter" //调用done()
3. @after-enter="afterEnter"
4. @enter-cancelled="enterCancelled" //动画取消进入触发
5. @before-leave="beforeLeave"
6. @leave="leave"//调用done()
7. @after-leave="afterLeave"
8. @leave-cancelled="leaveCancelled" //动画取消离开触发,leaveCancelled 只用于 v-show 中

# 初始化渲染

> 在transition标签中写入appear属性, vue会加上这个初始渲染动画,和过渡一样，同样也可以自定义 CSS 类名,自定义 JavaScript 钩子.

定义CSS类名:

```javascript
<transition
  appear
  appear-class="custom-appear-class"
  appear-to-class="custom-appear-to-class" (2.1.8+)
  appear-active-class="custom-appear-active-class"
>
</transition>
```

自定义 JavaScript 钩子:

```javascript
<transition
	appear
	@before-appear='beforeAppear'
	@appear='appear'
	@before-enter='beforeEnter'
	@enter='enter'
	@before-leave='beforeLeave'
	@leave='leave'
	:css='false'
	>
</transition>
```

>分享一下学习的体会

1. before-appear是初始动画之前 
2. appear为开始初始动画,这样写的好处是不影响我们进行动画的切换
3. css属性: 有时候有css过渡 ,如果说为false,Vue 会跳过 CSS 的检测。这也可以避免过渡过程中 CSS 的影响


# 多元素过渡

文档给出了例子，我这里就不再重复了，归纳一下具体的一些知识点

* transition 标签中要添加 mode="out-in" 
	* in-out: 新元素先进行过渡，完成之后当前元素过渡离开。
	* out-in: 当前元素先进行过渡，完成之后新元素过渡进入。
* 一般来说transition 标签只能有一个标签在最外层,但是可以用v-if来控制
* 相同标签名进行 if else 切换,一定要加上 key且值要不一样

# 多组件过渡

多个组件的过渡简单很多 - 我们不需要使用 key 特性。相反，我们只需要使用动态组件:

```javascript
<transition name="component-fade" mode="out-in">
  <component :is="view"></component>
</transition>
```

在CSS中写入过渡:

```javascript
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
```

# 列表过渡

与transition不同,列表过渡使用的是:transition-group 过渡组

>不同于 transition标签,它会以一个真实元素呈现：默认为一个 <span>。你也可以通过 tag 特性更换为其他元素。内部元素 总是需要 提供唯一的 key 属性值,添加的class 会传递到 生成的标签上

例如:

```javascript
<transition-group name="list" tag="div" class='aa'>
    <span v-for="item in items" v-bind:key="item" class="list-item">
      {{ item }}
    </span>
</transition-group>
```

> <transition-group> 组件还有一个特殊之处。不仅可以进入和离开动画，还可以改变定位。
要使用这个新功能只需了解新增的 v-move 特性，它会在元素的改变定位的过程中应用

例如: 

```javascript
.list-move{
	transition: all 0.4s linear;
}
```

1. 需要在 list-leave-active 中添加  position: absolute  目的是让他不占位置
2. 过渡的元素最好display: inline-block,因为transform适用所有块元素以及某些行内元素(但是不包括span)

官方文档给出了更为详细的例子，有兴趣的小伙伴可以去看一下

这篇的过渡动画写的有点略长，以上就是我对Vue过渡动画的一些理解，有哪里不对的欢迎提出


