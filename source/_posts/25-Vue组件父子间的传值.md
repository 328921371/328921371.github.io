---
title: Vue组件父子间传值
categories:
  - Vue
tags:
  - Vue
copyright: true
comments: true
abbrlink: 935a2f31
date: 2017-03-21 09:59:30
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 在 Vue 中，父子组件的关系可以总结为 prop 向下传递，事件向上传递。父组件通过 prop 给子组件下发数据，子组件通过事件给父组件发送消息。看看它们是怎么工作的。

<!--more-->

### prop传值

>为什么要用prop

因为组件实例的作用域是独立的，子组件的模板不能直接使用父类的，所以Vue中使用prop进行父级向子级传值，下面贴出代码

#### 首先先创建一个Vue的实例

```javascript
var app = new Vue({
	el:'#app',
	data:{
		title:'信息记录',
		person:{
			name:'金毛',
			job:'看家',
			company:'皇家护卫队',
			phone:'18066666666'
		}		
	}			
})
```

#### 创建一个模板

```javascript
<script type="text/html" id="card">
	<div>
		<h2>{{ title }}</h2>
		姓名: {{ person.name }}<br />
		职位: {{ person.job }}<br />
		公司: {{ person.company }}<br />
		手机: {{ person.phone }}<br />	
	</div>
	
</script>
```

#### 注册一个组件

```javascript
Vue.component('card',{
	template:'#card',
	data(){
		return {
			
		}
	},
	//相当于在data有person数据,接收从组件标签传过来的值
	props: ['title','person'],
})
```

#### 使用组件

```javascript
<div id="app">
	<card :person = 'person' :title = 'title'></card>
	//这里的title是 Vue实例data数据里的title,将数据通过 :title 传递到 props:['title']
	//不加: 相当于直接绑定到组件上了
</div>
```

>需要注意的是，在子组件中不可以修改prop传递过来的值

每次父组件更新时，子组件的所有 prop 都会更新为最新值。这意味着你不应该在子组件内部改变 prop。如果你这么做了，Vue 会在控制台给出警告。

在两种情况下，我们很容易忍不住想去修改 prop 中数据：

1. Prop 作为初始值传入后，子组件想把它当作局部数据来用；
2. Prop 作为原始数据传入，由子组件处理成其它数据输出。

对这两种情况，正确的应对方式是：

1.定义一个局部变量，并用 prop 的值初始化它：

```javascript
props: ['initialCounter'],
data: function() {
	return { counter: this.initialCounter }
}
```

2.定义一个计算属性，处理 prop 的值并返回：

```javascript
props: ['size'],
computed: {
	normalizedSize: function () {
		return this.size.trim().toLowerCase()
	}
}
```

>注意在 JavaScript 中对象和数组是引用类型，指向同一个内存空间，如果 prop 是一个对象或数组，在子组件内部改变它会影响父组件的状态。


### prop属性验证--对传入的值指定类型

我们可以为组件的 prop 指定验证规则。如果传入的数据不符合要求，Vue 会发出警告。这对于开发给他人使用的组件非常有用。

要指定验证规则，需要用对象的形式来定义 prop，而不能用字符串数组：

```javascript
props:{
	//propA 键名,传过来的属性---Number,指定为数值类型
	propA:Number,
	
	//可以多种类型
	propB:[Boolean,Number],
	
	propC: {
    	type: String,
    	required: true
    },
    
    //默认值
    propD: {
    	type: Number,
    	default: 100
    }  
}
```

>我们知道，父组件使用 prop 传递数据给子组件。但子组件怎么跟父组件通信呢？这个时候 Vue 的自定义事件系统就派得上用场了。

### 自定义事件

自定义事件大体上分为三个步骤，我把它叫做三步曲

每个 Vue 实例都实现了事件接口，即：

父组件可以在使用子组件的地方直接用 v-on 来监听子组件触发的事件。
子组件使用 $emit(eventName)来触发事件。

#### 第一步:监听自定义事件

```javascript
<div id="app">
	//组件如果想添加原生的事件 需要使用 .native
	<counter @to-parent="received" @click.native='show'></counter>
	//to-parent 是自己定义的一个事件,在第二步触发
	//received 是Vue实例 里的一个函数名
</div>
```

#### 第二步:触发自定义事件

```javascript
methods:{
	add(){
		this.$emit('to-parent',ran)	//这里的ran是传递的参数	
	}
}
```

#### 第三步:传递过来的值进行计算

```jabascript
var app = new Vue({
	el:'#app',
	data:{
		total:0
	},
	methods:{
		received(value){
			this.total += value
			//这里的value就是传递过来的值
		},
		show(){
			alert('显示出来吧')
		}
	}
})
```

### 自定义组件的 v-model

Vue 2.2.0 新增的自定义组件的 v-model，默认情况下，一个组件的 v-model 会使用 value prop 和 input 事件。但是诸如单选框、复选框之类的输入类型可能把 value 用作了别的目的。model 选项可以避免这样的冲突，官网给出了相应的例子，

有兴趣的小伙伴可以研究一下





以上就是我对Vue组件父子间传值的一些理解，希望大神们可以指出错误，谢谢
