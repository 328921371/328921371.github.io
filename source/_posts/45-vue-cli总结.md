---
title: Vue-cli 2.0 总结
categories:
  - vue-cli
tags:
  - vue-cli
copyright: true
comments: true
abbrlink: 1845e2be
date: 2019-09-13 12:13:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 写了很久了,一直没有发出来,本来想像Vue那样分知识点一个一个讲的,但是Vue-cli其实也就是一个脚手架,所以索性合在一起讲

<!--more-->

# 写一下一直以来对Vue的理解

# 什么是Vue?为什么选择Vue?

简单的来说,Vue就是一个`渐进式框架` + `MVVM模式`

那么问题来了,什么是 渐进式框架?

## 渐进式框架

总结一句话来说,可以只使用一部分功能,不必使用全部功能,可以跟其他的框架结合使用,这就叫渐进式框架.

每个框架都有一定的主张,(会有自己的一些特点),从而会对使用者有一定的要求,相比较于Angular的模块机制和依赖注入,react的函数式编程等,Vue的主张是最少

它可以在原项目的基础上,拆分出一两个组件用vue来封装,其他的继续用jquer或者javascript,也可以使用Vue-cli来搭建全家桶

再来看看什么是 MVVM设计模式

## MVVM模式

其实Vue设计上没有完全遵循MVVM模式,但是Vue的设计无疑是受到了它的启发

MVVM分来三个模型

* M: model 数据模型
* V: view 视图模型
* VM: 视图数据模型

相比较于传统H5的MVC模式,MVVM模式将应用程序分为了三大部分,实现了职责分离,通过`数据双向绑定`让数据驱动视图.
在学习Vue的过程中要转化思想,不要想着怎么操作DOM元素,而是操作数据

以后再介绍Vue-cli 3.0的版本,我们先在Vue-cli 2.0的基础上,看看Vue给我们带来了哪些功能, 想要了解在html中使用Vue.js的用法,可以搜索我的博客 `陈先生的小前端`

在学习Vue的过程中,我们没必要一上来就搞懂Vue的每一个部件和功能,先从核心功能开始学习,逐渐扩展。 

同时,在使用中,我们也没有必要把全部件能都拿出来,需要什么就用什么就是了。

# 搭建Vue-cli

项目是运行在node环境上的,所以我们需要去Node官网下载安装

由于Vue-cli是基于webpack的,所以我们要再安装一下webpack `npm install webpack -g` 。

全局安装 `npm install vue-cli -g`

初始化项目 `vue init webpack project`

过程我就不细说了,直接看看项目结构

![项目结构图](https://csblogimage.oss-cn-hangzhou.aliyuncs.com/45-projectImg.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,size_16,text_Qnku6ZmI5YWI55Sf55qE5bCP5YmN56uv,color_FFFFFF,shadow_50,t_100,g_se,x_10,y_10)

# Vue基础语法

## 插值

* 数据绑定最常见的形式就是使用 “Mustache” 语法（双大括号）的文本插值
* v-once 能执行一次性地插值,当数据改变时,插值处的内容不会更新。
* v-text 和双大括号一样,绑定一个值
* v-html 简单的来说能编译标签,站点上动态渲染的任意 HTML 可能会非常危险,因为它很容易导致XSS攻击。

## 指令

* 解释：指令(Directives)是带有 v- 前缀的特殊属性。指令属性的值预期是单个 JavaScript 表达式 (v-for 是例外情况)
* 作用：当表达式的值改变时,将其产生的连带影响,响应式地作用于 DOM

刚刚说到的 v-html 那些也是指令,就不再重复解释了,看看我们还经常用到那些指令

### v-bind

* 作用：绑定属性,当表达式的值改变时,将其产生的连带影响,响应式地作用于 DOM
* 语法：v-bind:title="msg"
* 简写：:title="msg"

```
<!-- 完整语法 -->
<a v-bind:href="url"></a>
<!-- 缩写 -->
<a :href="url"></a>
```

### v-on

* 作用：绑定事件
* 语法：v-on:click="say" or v-on:click="say('参数', $event)"
* 简写：@click="say"
* 说明：绑定的事件定义在methods

```
<!-- 完整语法 -->
<a v-on:click="doSomething"></a>
<!-- 缩写 -->
<a @click="doSomething"></a>
```

绑定事件后面还可以跟一些修饰符,修饰符在一些应用场景可以起关键作用,类似阻止冒泡之类的,看看都有哪些事件修饰符(还有其他类型的修饰符)

* .native 原生点击事件
* .stop 阻止冒泡,调用 event.stopPropagation()
* .prevent 阻止默认行为,调用 event.preventDefault()
* .capture 添加事件侦听器时使用事件捕获模式
* .self 只当事件在该元素本身（比如不是子元素）触发时,才会触发事件
* .once 事件只触发一次

> 主要要注意的是,修饰符可以串联使用,不过要注意前后关系(用 @click.prevent.self 会阻止所有的点击,而 @click.self.prevent 只会阻止元素上的点击。)

为什么在 HTML 中监听事件?

* 扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法。
* 因为你无须在 JavaScript 里手动绑定事件,你的 ViewModel 代码可以是非常纯粹的逻辑,和 DOM 完全解耦,更易于测试。
* 当一个 ViewModel 被销毁时,所有的事件处理器都会自动被删除。你无须担心如何自己清理它们。

修饰符一共有哪些种类呢?

* 事件修饰符: 就是上面讲的那些
* 按键修饰符: 针对键盘keyup的修饰符
* 系统修饰符: 按下相应按键时才触发鼠标或键盘事件的监听器。
* 表单修饰符: 多用于表单
	* .lazy : v-model 在每次 input 事件触发后将输入框的值与数据进行同步。你可以添加 lazy 修饰符,从而转变为使用 change
	* .number : 如果想自动将用户的输入值转为数值类型,可以给 v-model 添加 number 修饰符
	* .trim : 如果要自动过滤用户输入的首尾空白字符，可以给 v-model 添加 trim 修饰符
* 自定义事件修饰符: .sync, 后面会讲到怎么用

### v-model

* 作用：在表单元素上创建双向数据绑定
* 说明：监听用户的输入事件以更新数据,多用于表单中

### v-for

* 作用：基于源数据多次渲染元素或模板块

### v-if , v-show

这两个都是用于条件渲染

* v-if：根据表达式的值的真假条件,销毁或重建元素
* v-show：根据表达式之真假值,切换元素的 display CSS 属性

> 所以如果需要频繁的切换显示状态,使用v-show对性能更友好

### v-pre

* 说明：vue会跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。

### 自定义指令

如果觉得vue自带的指令不够用,我们可以进行自定义指令

```
// 输入框自动获取焦点
<input v-focus>
---------------
directives: {
  focus: {
    // 指令的定义
    inserted(el) {
      el.focus()
    }
  }
}
```


## script内的方法

```
export default {
	data() {
		return {}
	},
	methods: {},
	created() {},
	mounted() {},
	computed: {},
	watch: {},
	filters:{},
	components: {},
	directives: {}
}
```

### data

data大家都知道里面存放的是数据,可是为什么需要一个return返回?

因为不使用return包裹的数据会在项目的全局可见,会造成变量污染 
使用return包裹后数据中变量只在当前组件中生效,不会影响其他组件。

### methods

用来存放方法,我们所有的方法都尽量写在里面,便于管理

### computed(计算属性)

* 说明：计算属性是基于它们的依赖进行缓存的,只有在它的依赖发生改变时才会重新求值
* 注意：computed中的属性不能与data中的属性同名,否则会报错

为什么会用到计算属性呢? 因为在模板中放入太多的逻辑会让模板过重且难以维护,举个例子

```
<div id="example">
	{{ message.split('').reverse().join('') }}
</div>
```

想要反转字符串,但是这样写显然让人觉得看的很累,所以采用计算属性来写

```
<div id="example">
	<p>{{ reversedMessage }}</p>
</div>

computed: {
	reversedMessage() {
		return this.message.split('').reverse().join('')
	}
}
```

> 其实写在methods也可以实现这个功能,采用计算属性就是为了响应式依赖进行计算,对性能更友好

### watch(监听)

Vue 提供了一种更通用的方式来观察和响应 Vue 实例上的数据变动：侦听属性。

```
watch:{ //watch 观察,可以指定观察的属性(数据),属性一旦发生改变,就会调用观察所对应属性的 函数
	number(newValue,oldValue){//传入两个值,一个新的,一个旧的
		// 在这里可以处理当number的值改变时的回调函数
	}
}
```

### 过滤器

讲一下vue中的过滤器,说到过滤器,先说一下vue中`双大括号`, 它也是单个 JavaScript 表达式,所以可以使用过滤器

* 作用：文本数据格式化
* 过滤器可以用在两个地方：`双大括号`和 v-bind 表达式
* 两种过滤器：1 全局过滤器 2 局部过滤器

> 过滤器可以串联,可以接收多个参数 

给个简单的例子

```
<div id="app">
	<!--第一个是参数 | 第二个是方法的名字-->		
	
	<p>2的三次方等于{{ 2 | pow(3) }}</p>
	
	<p>2加3 加5等于{{ 2 | add(3,5) }}</p>//多个参数的时候可以直接在第二个后面跟
	
</div>

// 注意!过滤器函数,必须要有一个参数
filters:{
	pow(num1,num2){
		return Math.pow(num1,num2)
	},
	add(n1,n2,n3){
		return n1 + n2 + n3
	}
}
```

### components(组件)

当引入组件的时候需要在这边声明,具体后面再说

## 生命周期

每个 Vue 实例在被创建之前都要经过一系列的初始化过程。
例如需要设置数据监听、编译模板、挂载实例到 DOM、在数据变化时更新 DOM 等。
同时在这个过程中也会运行一些叫做生命周期钩子的函数,给予用户机会在一些特定的场景下添加他们自己的代码。

1. 创建之前: beforeCreate
* 说明：在实例初始化之后,数据观测 (data observer) 和 event/watcher 事件配置之前被调用
* 注意：此时,无法获取 data中的数据、methods中的方法

2. 创建之后: created –>一般在这个时候进行请求数据
* 注意：这是一个常用的生命周期,可以调用methods中的方法、改变data中的数据
* 使用场景：发送请求获取数据

3. 组件挂载之前: beforeMount –>在组件挂载完成之前,组件还没有创建完成,模板还没有生成
* 说明：在挂载开始之前被调用

4. 组件挂载之后(所有组件挂载完成): mounted –>生成模板,获取模板内容
* 说明：此时,vue实例已经挂载到页面中,可以获取到el中的DOM元素,进行DOM操作

5. 组件更新之前: beforeUpdate
* 说明：数据更新时调用,发生在虚拟 DOM 重新渲染和打补丁之前。你可以在这个钩子中进一步地更改状态,这不会触发附加的重渲染过程。
* 注意：此处获取的数据是更新后的数据,但是获取页面中的DOM元素是更新之前的

6. 组件更新之后: updated
* 说明：组件 DOM 已经更新,所以你现在可以执行依赖于 DOM 的操作。

7. 组件销毁之前: beforeDestroy –> this.$refs.com1.$destroy();
* 说明：实例销毁之前调用。在这一步,实例仍然完全可用。
* 使用场景：实例销毁之前,执行清理任务,比如：清除定时器等

8. 组件销毁之后: destroyed
* 说明：Vue 实例销毁后调用。调用后,Vue 实例指示的所有东西都会解绑定,所有的事件监听器会被移除,所有的子实例也会被销毁。

## 组件的使用

组件一般分为两种,父子间组件和非父子间组件..只要弄清楚传值,监听和发送,就差不多掌握了

### 创建组件

首先创建一个.vue的页面,作为一个组件

在需要它的页面导入 `import 组件名 from '@/components/页面名称.vue'`

之后在	`components: { 组件名 }` 中声明一下就可以调用了

### prop传值

我们先看看父组件怎么传值给子组件

> 在 Vue 中,父子组件的关系可以总结为 prop 向下传递,事件向上传递。父组件通过 prop 给子组件下发数据,子组件通过事件给父组件发送消息。

为什么要用prop?因为组件实例的作用域是独立的,子组件的模板不能直接使用父类的,所以Vue中使用prop进行父级向子级传值

* 方式：通过子组件props属性来传递数据 props是一个数组
* 注意：属性的值必须在组件中通过props属性显示指定,否则,不会生效
* 说明：传递过来的props属性的用法与data属性的用法相同


假设这个是我们要创建的组件

```
<template>
	<div>
		{{ myName }}
	</div>
</template>
<script>
	export default {
		// 接收父级传来的数据
		props: {
			myName: {
				type: String,
				default: 'csing'
			},
			// 对象或数组默认值必须从一个函数获取
			numList: {
				type: Array,
				default: function () {
					return ['csing']
				}
			},
		},
		data() {
			return {
				// 用一个字段接收
				msg: this.myName,
			}
		}
	}
</script>
```

> 需要注意的是,在子组件中不可以修改prop传递过来的值

每次父组件更新时,子组件的所有 prop 都会更新为最新值。这意味着你不应该在子组件内部改变 prop。如果你这么做了,Vue 会在控制台给出警告。

在两种情况下,我们很容易忍不住想去修改 prop 中数据：
1. Prop 作为初始值传入后,子组件想把它当作局部数据来用；
2. Prop 作为原始数据传入,由子组件处理成其它数据输出。

所以我们需要一个字段去接收

> 还有一个重点我们要讲一下, JavaScript 中对象和数组是引用类型,指向同一个内存空间,如果 prop 是一个对象或数组,在子组件内部改变它会影响父组件的状态。

那么问题来了,非prop属性会被替换吗

举个很简单的例子,一个组件里面定义了class,在外面引用该组件时,也写了一个class,class会被替换吗

> 庆幸的是,class 和 style 特性会稍微智能一些,即两边的值会被合并起来


所以我们需要使用 `inheritAttrs: false` 来禁用特性继承,配合`$attrs`

```
	<p v-bind="$attrs">继承属性</p>
```


### 自定义事件

子组件传值给父组件就需要用到自定义事件,自定义事件大体上分为三个步骤,我把它叫做三步曲


#### 第一步:监听自定义事件

```
<!-- 父组件接受子组件的to-parent方法 -->
<viewpage :myName="name" @to-parent="fromChild"></viewpage>
```

#### 第二步:触发自定义事件

```
methods:{
	add(){
		this.$emit('to-parent',this.addName)	//这里的ran是传递的参数	
	}
}
```

#### 第三步:传递过来的值进行计算

```
methods: {
	fromChild(name){
		this.name = this.name + name
	}
}
```

> 现在有一个问题,如果子组件只是想当初的修改一下父组件传进来的值,并且赋值给父组件,怎么办

使用修饰符 `sync`

举个例子

```
<template>
	<div class="details">
		<myComponent :show.sync='valueChild' style="padding: 30px 20px 30px 5px;border:1px solid #ddd;margin-bottom: 10px;"></myComponent>
		<button @click="changeValue">toggle</button>
	</div>
</template>
<script>
import Vue from 'vue'
Vue.component('myComponent', {
		template: `<div v-if="show">
									<p>默认初始值是{{show}}，所以是显示的</p>
									<button @click.stop="closeDiv">关闭</button>
							 </div>`,
		props:['show'],
		methods: {
			closeDiv() {
				this.$emit('update:show', false); //触发 input 事件，并传入新值
			}
		}
})
export default{
	data(){
		return{
			valueChild:true,
		}
	},
	methods:{
		changeValue(){
			this.valueChild = !this.valueChild
		}
	}
}
</script>
```

动态效果如下：

![动态效果](https://upload-images.jianshu.io/upload_images/7579449-1567b35b54771fc6.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/497/format/webp)

vue 修饰符sync的功能是：当一个子组件改变了一个 prop 的值时，这个变化也会同步到父组件中所绑定。如果我们不用.sync，我们想做上面的那个弹窗功能，我们也可以props传初始值，然后事件监听，实现起来也不算复杂。这里用sync实现，只是给大家提供一个思路，让其明白他的实现原理，可能有其它复杂的功能适用sync。

到这里最常用的父子组件相互传值就已经完成了,接下来说一下非父子间的传值

### bus中央线

其实原理和自定义事件是一样的,也是三部曲

#### 第一步

>创建一个 vue 作为中央线来处理 非父子关系的组件传递数据

```
import Vue from 'Vue'
var bus = new Vue();
export default bus;
```
#### 第二步

> 在组件二中创建监听事件—-注意:监听事件一定要在发射之前,监听才有效

```
//使用前先导入
import bus from '@/util/bus.js';

created() {
	bus.$on('giveMsg',(value)=>{
		//这里的value是传递过来的值
		this.counter += value
	})
},
```

#### 第三步

> 在组件一中发射组件

```
add(){
	//通过bus中央线来发射组件
	//giveMsg类似于事件的名称
	//num是要传递的参数
	bus.$emit('giveMsg',this.num) 
}
```

### 插槽

> 为了让组件可以组合,我们需要一种方式来混合父组件的内容与子组件自己的模板。这个过程被称为内容分发 。Vue.js 实现了一个内容分发 API,参照了当前 Web Components 规范草案,使用特殊的 元素作为原始内容的插槽。

在组件中写 slot,想要几个就写几个

```
<div>
	//每个插槽最好都要有自己的名字,不然所有的标签都会被使用
	<slot name='title'></slot>
</div>
```

使用插槽

```
<div id="app">			
	<component>
		<h1 slot='title'>标题是:{{ title }}</h1>
	</component>
</div>
```

现在这种用法虽然也可以,但是`2.6.0` v-slot 指令取代了 slot,并且只能在template上使用

```
<template v-slot:title>我是一个标题</template>
```

### 混入 (mixin) 

> 有时候不需要插槽的功能,我们需要实现Vue 组件中的可复用功能,比如三个组件中都需要共同的方法,我们就可以用到mixin

新建一个mixin.js

```
var mixin = {
  data() {
    return {
      tableHight: 300,
    }
  },
  methods: {
    // 判断屏幕告诉,并自适应表格高度
    viewHeight() {
      setTimeout(() => {
        this.tableHight = window.innerHeight - this.$refs.table.offsetTop - (100 * (window.innerHeight / 1080));
      }, 100)
      this.$nextTick(function() {
        this.tableHight = window.innerHeight - this.$refs.table.offsetTop - (100 * (window.innerHeight / 1080));
        // 监听窗口大小变化(暂时不监听)
        let self = this;
        window.onresize = function() {
          self.tableHight = window.innerHeight - self.$refs.table.offsetTop - (100 * (window.innerHeight / 1080));
        }
      })
    },
  },
  mounted() {
    this.viewHeight()
  },
}

export default mixin

```

之后在组件中导入使用

```
import mixin from '@/util/mixin.js'

export default {
  mixins: [mixin],
}

```

需要注意的是 

> 当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”。比如，数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先


## router路由

说到路由,先说一下为什么vue中的路由,在安卓或者ios监听不到页面url的变化,因为它是一个单页应用程序

### SPA -单页应用程序

> 单页Web应用（single page application,SPA）,就是只有一个Web页面的应用,是加载单个HTML页面,并在用户与应用程序交互时动态更新该页面的Web应用程序。

1. 单页面应用程序: 只有第一次会加载页面, 以后的每次请求, 仅仅是获取必要的数据.然后, 由页面中js解析获取的数据, 展示在页面中
传统多页面应用程序：

2. 对于传统的多页面应用程序来说, 每次请求服务器返回的都是一个完整的页面


#### 优势

1. 减少了请求体积,加快页面响应速度,降低了对服务器的压力
2. 更好的用户体验,让用户在web app感受native app的流畅

#### 实现思路和技术点

1. 锚点的使用（window.location.hash #）
2. hashchange 事件 window.addEventListener("hashchange",function () {})
3. 监听锚点值变化的事件,根据不同的锚点值,请求相应的数据
4. 原本用作页面内部进行跳转,定位并展示相应的内容

### 路由的使用

SPA往往是功能复杂的应用,为了有效管理所有视图内容,前端路由 应运而生,当URL中的哈希值（# hash）发生改变后,路由会根据制定好的规则,展示对应的视图内容


在router/index.js 中配置路由

```
export default new Router({
	routes: [
		//  将 path 重定向到 redirect
		{
			path: '/',
			redirect: '/home'
		},
		{
			path: '/home',
			name: 'home-page',
			component: require('@/view/home').default,
			children:[
				{
					path: '/Welcome',
					name: 'Welcome',
					component: require('@/view/Welcome').default,
				},
			]
		}
	]
})
```

在页面中使用编程式导航

```
// 字符串
router.push('home')
// 对象
router.push({ path: 'home' })
// 命名的路由
router.push({ name: 'user', params: { userId: 123 }})

```


#### router.replace

router.replace 跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。

#### 路由守卫

具体的不说了,简单介绍一下完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用离开守卫。
3. 调用全局的 beforeEach 守卫。
4. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
5. 在路由配置里调用 beforeEnter。
6. 解析异步路由组件。
7. 在被激活的组件里调用 beforeRouteEnter。
8. 调用全局的 beforeResolve 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 afterEach 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。

[路由守卫具体链接-->戳我](https://www.chensheng.group/2017/09/25/41-Vue的导航守卫/)

## Vuex数据仓库

> vuex是vue的一个插件,是一个专为 Vue.js 应用程序开发的状态管理模式。(状态:数据,改变数据和获取数据)

[数据仓库具体链接-->戳我](https://www.chensheng.group/2017/11/09/44-Vuex%E7%9A%84%E4%BD%BF%E7%94%A8/)

## axios

> 由于vue不再继续维护vue-resource，并推荐使用 axios,所有axios进入了大家的视野

* 以Promise为基础的HTTP客户端，适用于：浏览器和node.js
* 封装ajax，用来发送请求，异步获取数据
* 从浏览器中创建 XMLHttpRequest
* 从 node.js 发出 http 请求
* 支持 Promise API
* 拦截请求和响应
* 转换请求和响应数据
* 取消请求
* 自动转换JSON数据
* 客户端支持防止 CSRF/XSRF

### 安装：npm i -S axios

### 使用

```
// 在浏览器中使用，直接引入js文件使用下面的GET/POST请求方式即可
// 1 引入 axios.js
// 2 直接调用axios提供的API发送请求
created() {
  axios.get(url).then(function(resp) {})
}

---
// 配合 webpack 使用方式如下：
import Vue from 'vue'
import axios from 'axios'
// 将 axios 添加到 Vue.prototype 中
Vue.prototype.$axios = axios

---
// 在组件中使用：
methods: {
  getData() {
    this.$axios.get('url')
      .then(res => {})
      .catch(err => {})
  }
}

---
// API使用方式：

axios.get(url[, config])
axios.post(url[, data[, config]])
axios(url[, config])
axios(config)
```

看看具体的代码实现

### Get 请求

```
const url = 'http://vue.studyit.io/api/getnewslist'

// url中带有query参数
axios.get('/user?id=89')
.then(function (response) {
	console.log(response);
})
.catch(function (error) {
	console.log(error);
});

// url和参数分离，使用对象
axios.get('/user', {
  params: {
    id: 12345
  }
})
```

### Post 请求

默认情况下，axios 会将JS对象序列化为JSON对象。为了使用 application/x-www-form-urlencoded 格式发送请求，我们可以这样：

```
// 使用 qs 包，处理将对象序列化为字符串
// npm i -S qs
// var qs = require('qs')
import qs from 'qs'
qs.stringify({ 'bar': 123 }) ===> "bar=123"
axios.post('/foo', qs.stringify({ 'bar': 123 }))

// 或者：
axios.post('/foo', 'bar=123&age=19')

// 具体使用
axios.post('/user', qs.stringify({
	firstName: 'Fred',
	lastName: 'Flintstone'
}))
.then(function (response) {
	console.log(response);
})
.catch(function (error) {
	console.log(error);
});
```

如果就是正常的传递json对象,那就这样

```
axios.post('/user', {
	firstName: 'Fred',
	lastName: 'Flintstone'
})
.then(function (response) {
	console.log(response);
})
.catch(function (error) {
	console.log(error);
});
```


## 打包

项目做好后,最后一步就是打包了

打包其实vue-cli都帮我们配置好了,`npm run build` 就可以了,需要其他的配置,以后会说到

[打包踩过的坑](https://www.chensheng.group/2018/01/29/55-vue-cli打包问题总结/)
