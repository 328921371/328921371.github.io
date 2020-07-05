---
title: Vue路由权限控制
categories:
  - Vue
tags:
  - Vue
  - Vuex
copyright: true
comments: true
abbrlink: 19a1ebf
date: 2019-01-21 13:16:15
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 在实际的开发过程中，我们通常会涉及到权限的问题，不同的用户进来只能看到他对应的菜单权限，页面上的菜单渲染是比较好实现的，这里就不多提，唯一比较难的就是路由的权限控制。

<!--more-->

本文由超级无敌帅气`小凯龙`友情赞助

## 解决思路

> 目前大概有两种思路可以实现路由的权限控制：

1.通过router.beforeEach() 路由拦截的方式实现。

2.通过vue-router 官方提供的addRoutes()来进行动态路由注入，`注意` 该方法只有vue-router的版本 `>= 2.2`才有效。

> 我们可以来看这两种方式是如何实现的：

## 解决方案
### 路由拦截的方式

这种方式依赖于我们项目的路由表都是事先配置好的，假设我们的路由表有：
```javascript
const router = new Router({
  routes: [{
		path: '/',
		redirect: '/index1'
	}, {
		path: '/index1',
		name: 'Index1',
		component: Index1
	}, {
		path: '/index2',
		name: 'Index2',
		component: Index2
	}, {
		path: '/index3',
		name: 'Index3',
		component: Index3
	}]
})

export default router;
```
在 `router/index` 中，通过router.beforeEach() 路由拦截去进行权限判断：
```javascript
router.beforeEach((to, from, next) => {
	//to: 从哪个路由来
	//from: 去哪个路由
	//next：是一个方法，使用路由拦截，必须在后面添加next()，否则路由无法跳转

	//假设我们从后台获取的权限为：
	const list = ['index1', 'index2'];

	//如果没有匹配到，证明没有权限
	if(list.indexOf(to.name) === -1) {
		//next('/login');

		... //或者执行其他操作
	}

	//路由拦截可根据项目返回的权限自行调整，这里只是做了一个简单的例子
})
```

### 动态注入路由

这种方式我们只需要配置静态的路由表，比如登录、注册页，其他路由通过动态注入：
```javascript
const router = new Router({
  routes: [{
		path: '/',
		redirect: '/login'
	}, {
		path: '/login',
		name: 'login',
		component: Login
	}]
})

export default router;
```
假设我们在 登录 的时候，后端返回的权限列表如下：
```json
//leaf: 是我们用来判断是否唯一的
//component：一般来说后端返回给我们的就是一个路径而已，所以我们需要自行的去加载组件
export const routers = [{
	path: '/main',
	name: 'main',
	leaf: false,
	component: 'pages/main/main',
	children: [{
		path: '/main/home',
		name: 'home',
		component: 'pages/home/home',
		leaf: true
	}, {
		path: '/main/index1',
		name: 'index1',
		component: 'pages/index1',
		leaf: true
	}, {
		path: '/main/index2',
		name: 'index2',
		component: 'pages/index2',
		leaf: true
	}, {
		path: '/main/index3',
		name: 'index3',
		component: 'pages/index3',
		leaf: true
	}, {
		path: '/main/index4',
		name: 'index4',
		component: 'pages/index4',
		leaf: true
	}]
}, {
	path: '*',
	component: 'pages/noFind',
	leaf: true
}]

```
可以写个方法去再次过滤返回回来的路由列表
```javascript
/**
 * @param routers 初始数据，为数组格式，一般来说是个空数组
 * @param data 后端返回的路由列表数据
 */
function generaMenu(routers, data) {
  data.forEach((item)=>{
    let menu = Object.assign({},item);
    menu.component = import(`@/${menu.component}.vue`);
    if(!item.leaf) {
      menu.children = [];
      generaMenu(menu.children,item.children);
	    menu.redirect = menu.children[0].path; //如果需要重定向的话，可以根据自己的需求进行选择
    }
    routers.push(menu);
  })
}

```
这样我们最终就得到了符合路由规则的路由表了。然后通过 `addRoutes()` 这个方法把路由给注入到路由表里面，之后就可以访问已注入的路由了：
```javascript
this.$route.addRoutes(data);
```
`注意` 如果有用到404的路由话，需要把404这个路由放到整个路由表的最后一个，否则，因为一开始我们是没有对应的动态路由，默认就跳转到了404页面了，所以静态路由表不配置404路由，与动态路由一起注入到路由表中。

`注意` 因为使用了addRoutes()这个方法之后，路由表已经可以认为是不可控的了，也就是说，已经注入的路由，没办法在通过官方给的api删除掉(当然，目前官方也没有提供相应的api)。那当我们A帐号退出之后，B帐号登录进来，也会执行 `addRoutes()` 这个方法，会一直累加上去，然后控制台上也会有警告，出现了重复的路由，然后我们访问A帐号有，B帐号没有的路由时，发现是可以进行访问的。这显然不符合我们的需求。

那么，我们该如何解决这个问题呢？

一种是在用户退出的时候，进行项目的重载：
```javascript
location.href = '/'; //这种相对来说体验就非常差了，相当于重新刷新了页面，显然也是不符合我们的需求
```

还有一种就是重新初始化静态路由表：
首先，我们要对 `router/index` 进行改造一下：
```
const createRouter = () => new Router({
  routes: [{
  	path: '/',
  	redirect: '/login'
  }, {
  	path: '/login',
  	name: 'login',
  	component: Login
  }]
})

const router = createRouter()

//重新实例化一个新的路由表，替换之前的路由表，然后将这个方法导出
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // the relevant part
}
```
然后，我们在用户退出的时候，重新执行下 `resetRouter()` 这个方法就可以解决路由表重复累加的问题，同时也发现B账号进来之后，只能访问对应的路由权限而已。A账号的权限路由已经不存在了。
