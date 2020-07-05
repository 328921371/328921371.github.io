---
title: Vue的表单控件的使用
categories:
  - Vue
tags:
  - Vue
copyright: true
comments: true
abbrlink: 2ababef
date: 2017-02-25 11:01:35
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> Vue最方便的地方就在于它可以很轻松的实现双向数据绑定，现在就来看一下吧

<!--more-->

### v-model 指令

v-model 指令就是Vue用来实现双向数据绑定的，它也有一些特性：

1. v-model 指令在表单控件元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。

2. v-model 会忽略所有表单元素的 value、checked、selected 特性的初始值。因为它会选择 Vue 实例数据来作为具体的值。你应该通过 JavaScript 在组件的 data 选项中声明初始值。


先来看一下v-model 指令在表单控件中的一些基本使用

#### text文本

```javascript
<input v-model="text" placeholder="请输入">
<p>你输入的是: {{ text }}</p>

//text在data中为字符串
```

当你在输入框中输入文字的时候，在下面可以马上的显示出你输入的信息

#### 多行文本

```javascript
<textarea v-model="message"></textarea>
<div>
	你输入的文字为:
	<pre>
		{{ message }}
	</pre>
</div>

//message在data中为字符串
```

#### 复选框

```javascript
<div>
	<input type="checkbox" v-model="sex">
	{{ sex }}
</div>

//sex在data中为布尔型
```

### 多个复选框(绑定到同一个数组)

```javascript
<div>
	爱好选项:
	<label for=""><input type="checkbox" value="敲代码" v-model="hobbies"/>敲代码</label>
	<label for=""><input type="checkbox" value="阅读" v-model="hobbies"/>阅读</label>
	<br /><br />
	你的选择:
		<span v-for="(v,i) in hobbies">
			<!--<span v-if="i == hobbies.length - 1">
				{{ i + 1 }}.{{ v }}						
			</span>-->
			<template v-if="i != 0">,</template>
			<span>
				{{ i + 1 }}.{{ v }}							
			</span>
		</span>
</div>

//hobbies在data中为数组
```


### 单选

```javascript
<label for="one"><input type="radio"  value="男" v-model="male">男</label>		  
<label for="two"><input type="radio"  value="女" v-model="male">女</label>
<span>性别: {{ male }}</span>
	
//male在data中为字符串
```

### 选择列表

```javascript
<div>
	<select v-model="stname" multiple style="width: 50px">
		<option value="你好">你好</option>
		<option value="世界">世界</option>
	</select>
	选择了:{{ stname }}
</div>

//stname在data中为字符串
```

### 表单控件的修饰符

```javascript
	<!--.lazy 输入时不会改变,离开文本框改变-->
	<input type="text" v-model.lazy="msg" />
	<div> 输入的是 : {{ msg }} </div>
	
	<!--.number将值转化为number-->
	<input type="number" v-model.number="num" />
	<div> 输入的是 : {{ num + 1 }} </div>
	
	<!--.trim 去掉首尾空格-->
	<input type="text" v-model.trim="message" />
	{{ message }}
```
绑定的值自行在data中添加一下


以上就是我的Vue表单控件的一些理解，希望大神们可以指出错误，谢谢
