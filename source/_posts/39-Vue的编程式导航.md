---
title: Vue的编程式导航
categories:
  - Vue
tags:
  - Vue
  - Vue路由
copyright: true
comments: true
abbrlink: 40a3a3e0
date: 2017-08-30 18:55:25
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 除了使用 <router-link> 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。

<!--more-->

## router.push

在 Vue 实例内部，你可以通过 $router 访问路由实例。因此你可以调用 this.$router.push。

想要导航到不同的 URL，则使用 router.push 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。

当你点击 <router-link> 时，这个方法会在内部调用，所以说，点击 <router-link :to="..."> 等同于调用 router.push(...)。

官方的文档是这样描述的，挺详细的，简单点的意思就是，系统会自动调用 router.push，我们也可以手动的使用它。

举个简单的例子

```javascript
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: 123 }})
```

>这里有个值得注意的地方，如果提供了 path，params 会被忽略，需要提供路由的 name 或手写完整的带有参数的 path：

```javascript

const userId = 123

router.push({ name: 'user', params: { userId }}) // -> /user/123

router.push({ path: `/user/${userId}` }) // -> /user/123

// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user

```

## router.replace

router.replace 跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。

组件中在router-link后面添加replace就好了

```javascript
<router-link :to="..." replace>
```

## router.go(n)

这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 window.history.go(n)。

举个简单的例子：

```javascript
// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)

// 后退一步记录，等同于 history.back()
router.go(-1)

// 前进 3 步记录
router.go(3)

// 如果 history 记录不够用，那就默默地失败呗
router.go(-100)
router.go(100)
```

以上就是我对vue编程式导航的一些理解，有哪里不对的欢迎提出