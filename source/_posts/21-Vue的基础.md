---
title: Vue的基础知识
categories:
  - Vue
tags:
  - Vue
copyright: true
comments: true
abbrlink: f56a2fb7
date: 2017-02-20 10:13:01
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 今天分享一下Vue的其他一些基础知识，计算属性，Style绑定以及条件渲染

<!--more-->

### 了解computed 和 methods 的区别

计算属性与函数的写入类似，不同之处在于函数的调用需要手动执行,不管值有没有改变都回去执行函数，而计算属性,在值发生改变的时候执行

因为计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值。

计算属性默认只有 getter ，不过在需要时你也可以提供一个 setter 

举个例子

如果想设置值,传一个对象,里面有get和set方法

```javascript
	age: {
	    // 不需要age.get,获取的时候自动执行
	    get() {
		    var year = new Date().getFullYear();
			return year - this.birtYear	
	    },
	    // setter
	    set(Value) {
	    	var year = new Date().getFullYear()
	    	this.birtYear = year - Value
	    }
	}
	
	//设置值的时候不需要调用set方法,会自动识别
	app.age = 30
```

### 绑定class属性及改变样式

#### 绑定class属性,可以直接用字符串

```javascript
	<div v-bind:title="title"  :class="classStr">这是一个盒子</div>
```

#### 通过对象绑定class,如果有class 那么会将其合并 

```javascript
	<div class="font-size25" :class="classObject">通过对象绑定</div>
```

#### 通过数组绑定class属性

```javascript
	<div :class="classArr">通过数组绑定class</div>
```
#### 通过对象来绑定 style 改变样式

```javascript
	<div :style="styleObject">通过对象来绑定 style 改变样式</div>
```

#### 通过数组style数组 改变样式

```javascript
	<div :style="[styleObject,styleObject2]">通过style数组 改变样式</div>
```

下面是需要的数据：

```javascript
<script type="text/javascript">
var app = new Vue({
	el:'#app',
	data:{
		classStr: 'red font-size25',
		removered:true,
		//对象绑定class
		classObject:{
			//以class的名字作为键名.使用布尔值控制class是否显示
			'red':true
		},
		classArr:[{red : removered },font-size25],
		styleObject: {
		    color: 'blue',
		    fontSize: '30px',
		    lineHeight:'100px'
		},
		styleObject2: {
		    color: 'green',
		    fontSize: '60px',
		    backgroundColor:'red'
		},
	}
})
</script>
```

### if与else

* v-if 和 v-else 之间不能有其他标签 ,v-else-if 要加中间
* 使用标签包住时使用 template ,用div时,div也会被渲染
* v-if能过条件判断  是否创建这个dom元素
* v-show 一定会创建这个dom元素   只是通过 样式来控制这个元素是否显示(display:none)

具体的例子可以看一下官方的文档，这里就不给出了

### v-for循环的使用

假设boys是一个数组，里面有name这个对象，使用v-for可以将其遍历出来

```javascript
	<tr v-for="(student,index) in boys">
		<td>{{index}}</td>
		<td>{{student.name}}</td>
	</tr>
```

#### v-for循环的方式
1. 普通循环 v-for="(student, index) in students" 循环里还可以套一层
2. 对象的迭代 v-for="(value,key,index) in students[0]"
3. 整数的迭代 v-for="n in 10"
4. 数组迭代 v-for="vl in numbers"


以上就是我的Vue一些基础知识的理解，希望大神们可以指出错误，谢谢
