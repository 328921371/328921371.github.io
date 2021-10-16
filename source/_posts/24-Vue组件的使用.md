---
title: Vue组件使用
categories:
  - Vue
tags:
  - Vue
copyright: true
comments: true
abbrlink: '47143409'
date: 2017-03-15 14:57:15
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 组件 (Component) 是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素，Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以表现为用 is 特性进行了扩展的原生 HTML 元素。

<!--more-->

### 组件的基础

#### 全局--注册组件

```javascript
	Vue.component('g-com', {
	  	template: '<h1>你好世界</h1>'
	  	data(){
	  		//data 为函数
			//这里目的:让每一个组件都有独立的数据,而不是使用同一个对象进行共享
			return {
				counter : 0
			}
		},
	})
	
	//g-com这个是html直接使用的标签
	//component注册组件的方法
```

>对于自定义标签的命名 ,Vue不强制遵循 W3C 规则 (小写，并且包含一个短杠)，尽管这被认为是最佳实践。


#### 局部--注册组件
```javascript
	var app = new Vue({
		el:'#app',
		data:{
			message:'hello'
		},
		components:{
			'my-com':{
				template:'<p>这个是app里的局部组件</p>'
			}
		}
	})
	
	//在某一个实例中注册的组件,就只能在这个实例中使用
	//my-com这个是html直接使用的标签
```

### 创建组件模板时的注意点

官方的文档也给了说明，但是看得有点绕，我稍微做了一点小小的总结

>template 模板只会显示最外层的标签，比如使用下面这种方式创建模板：

```javascript
	<script type="text/html" id="g-com">
		<div>
			只会显示最外层一个标签
		</div>
	</script>
```

>在创建模板时要注意元素的限制，在浏览器解析、规范化模板之后才能获取其内容。
例如：ul.ol.table.select. 这些标签限制了能被它包裹的元素


举个简单的例子：

```javascript
	<table>
		<my-com></my-com>
	</table>
```

自定义组件 <my-com> 会被当作无效的内容，因此会导致错误的渲染结果。变通的方案是使用特殊的 is 特性：

```javascript
	<table>
		<tr is="my-com"></tr>
	</table>
```



以上就是我对Vue组件的一些理解，希望大神们可以指出错误，谢谢
