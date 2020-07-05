---
title: Vuex的使用
categories:
  - Vue
tags:
  - Vue
  - Vuex
copyright: true
comments: true
abbrlink: 3bf443a
date: 2017-11-09 13:16:15
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 如果您不打算开发大型单页应用，使用 Vuex 可能是繁琐冗余的。确实是如此——如果您的应用够简单，您最好不要使用 Vuex。一个简单的 global event bus 就足够您所需了。但是，如果您需要构建是一个中大型单页应用，您很可能会考虑如何更好地在组件外部管理状态，Vuex 将会成为自然而然的选择。

<!--more-->

## Vuex 是什么?

vuex是vue的一个插件,是一个专为 Vue.js 应用程序开发的状态管理模式。(状态:数据,改变数据和获取数据)


## 安装

	也是依赖于  npm install vue-cli -g 要先进行全局安装
	
	npm install vuex --save
	
## 使用
	
### 创建一个文件当做一个store仓库

```javascript
import Vue from 'vue' 
import Vuex from 'vuex' //导入使用 vuex 
Vue.use(Vuex) 

var state = {
	// state 所有的状态(数据)
} 	

var mutations = {	
	// 改变 state 状态,提交 mutations
}

var getters = {
	// getters 计算属性
}

var actions = {
	// 异步改变数据
}

//将这些对象引入
export default new Vuex.Store({
	state,
	mutations,
	getters,
	actions
})

```

### 在main.js中导入store这个仓库

```javascript
import store from './store/index.js'
new Vue({
	store,//指定储存对象
	router,
	render: h => h(App)
}).$mount('#app')
```

## vuex的五大特性

### State	

Vuex 使用单一状态树，用一个对象就包含了全部的应用层级状态,数据等都写在 state中

```javascript
var state = {
	count:0,
	userName:'cs',
	ownner:'this is chensheng'
} 	// state 所有的状态(数据)
```

### Mutations

改变state的状态(数据),通过提交mutations,也就是调用里面的方法( 在 页面中methods使用 this.$store.commit() )

```javascript
var mutations = {
	//参数一:state对象
	//参数二:自定义的参数 
	
    add(state,payload) {
    	state.count += payload || 1
    },
    jian(state,payload) {
    	state.count -= payload || 1
    }
}
```

>Payload,你可以向 store.commit 传入额外的参数，在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读.

### getters

Vuex 允许我们在 store 中定义"getter"（可以认为是 store 的计算属性）,类似于 计算属性,对 state里面的数据进行处理,当依赖值发生改变的时候会自动计算,需要将 state对象 传进去.

```javascript
var getters = {
	upperOwnner(state){
		return state.ownner.slice(0,1).toUpperCase() + state.ownner.slice(1)
	}
}
```


### Actions

Action 提交的是 mutation，而不是直接变更状态,可以包含任意异步操作。

```javascript
var actions = {
	// context :上下文,指 store对象
	// param : 自定义参数
	addAsync(context,param){
		// 修改 state
		// actions 不能直接修改 stayed 状态,必须提交到 mutations 修改
		context.commit('add',param);
	}
}
```

### Modules

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割

```javascript
var moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

var moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

var store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
```

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态


## 如何在vue界面使用 写好的store 的 javascript页面

### State	

导入 mapState 辅助 方法
```javascript
import { mapState } from 'vuex'
```

使用mapState(当名称与 state 的子节点名称相同时,我们也可以给 mapState 传一个字符串数组。)
```javascript
export default {
	computed:{
		...mapState(['count','userName','ownner'])
	}
}
```

### Mutations

```javascript
methods:{
	add(){
		//建议这样写 使用状态,可以预测 提交mutations 方法去修改状态
		this.$store.commit('add',10)
	}
}
```

### getters

之前说了mapState 可以传递数组,当需要计算属性时,也可以使用对象

```javascript
computed:{

	anthor:function(){
		
		console.log(this);//这里的this指向的是组件
		
		console.log(this.$store);//this.$store 存储对象
			
		console.log(this.$store.getters);//this.$store.getters --getters 对象里的所有数据		
		
		return this.$store.getters.upperOwnner
	}
	
}
```

也可以导入 mapGetters 辅助 方法
```javascript
import { mapGetters } from 'vuex'

computed:{
	...mapGetters([
		'upperOwnner'
	]),
}
```

### dispatch 

dispatch 其实使用的方法与 Mutations其实是一样的,在var actions 的时候,实际上操作的是commit
只是它是异步修改的

```javascript
methods:{
	add(){
		//调用 action方法 addAsync
		this.$store.dispatch('addAsync',3)
	},
}
```

也可以导入mapActions 辅助方法

```javascript
import { mapActions } from 'vuex'

methods: {
    ...mapActions([
      'addAsync'
    ]),
}
```

>组合 Action, Action 通常是异步的，那么如何知道 action 什么时候结束呢？更重要的是，我们如何才能组合多个 action，以处理更加复杂的异步流程？

```javascript
actions: {
  // ...
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}
```
可以向上面这样组合

更多详细的Vuex的知识可以上官网阅读，以上就是我对Vuex的一些基础理解，有不对的地方欢迎提出