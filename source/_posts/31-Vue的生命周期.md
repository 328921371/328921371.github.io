---
title: Vue生命周期的使用
categories:
  - Vue
tags:
  - Vue
  - Vue生命周期
copyright: true
comments: true
abbrlink: 5d36c89a
date: 2017-04-26 14:37:15
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 每个 Vue 实例在被创建之前都要经过一系列的初始化过程。例如需要设置数据监听、编译模板、挂载实例到 DOM、在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做生命周期钩子的函数，给予用户机会在一些特定的场景下添加他们自己的代码。

<!--more-->

上面这些是官方文档给出的定义，简单的来说就是我们什么时候需要它，什么时候调用，官网的图已经写的很详细了，我这里只是稍微归纳一下

### 钩子函数(组件的生命周期函数)

1. 创建之前: beforeCreate

2. 创建之后: created  -->一般在这个时候进行请求数据

3. 组件挂载之前: beforeMount -->在组件挂载完成之前,组件还没有创建完成,模板还没有生成

4. 组件挂载之后(所有组件挂载完成): mounted -->生成模板,获取模板内容

5. 组件更新之前: beforeUpdate

6. 组件更新之后: updated 

7. 组件销毁之前: beforeDestroy -->	this.$refs.com1.$destroy();

8. 组件销毁之后: destroyed 

>所有的组件都是 依次 创建之前 ->创建完成 -> 挂载之前 -> 然后等所有的组件 挂载完成 ->再依次执行挂载完成函数

```javascript
<script type="text/javascript">
	Vue.component('com',{
		template:'#com',
		data(){
			return {
				
			}
		},
		//组件创建之前,
		beforeCreate(){
			console.log('组件创建之前');
		},
		//组件创建完成
		created(){
			console.log('组件创建完成');
		},
		//组件挂载之前
		beforeMount(){
			console.log('组件挂载之前');
		},
		//组件挂载完成
		mounted(){
			console.log('组件挂载完成');
		},
		//组件更新之前
		beforeUpdate(){
			console.log('组件更新之前');
		},
		//组件更新之后
		updated(){
			console.log('组件更新之后');
		},
		//组件销毁之前
		beforeDestroy(){
			console.log('组件销毁之前');
		},
		//组件销毁之后
		destroyed(){
			console.log('组件销毁之后');
		}
		
	})
	
	new Vue({
		el:'#app',
		data:{
			
		},
		methods:{
		
		}
	})
	
	
</script>
```

>生命周期比较常用到的地方

created：一般请求数据是在这边

mounted：一些监听的方法放在这边

以上就是我对Vue生命周期的一些理解，希望大牛提出一些宝贵的意见，谢谢
