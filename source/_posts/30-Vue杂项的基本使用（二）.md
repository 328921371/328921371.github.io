---
title: Vue杂项的基本使用（二）
categories:
  - Vue
tags:
  - Vue
copyright: true
comments: true
abbrlink: 5c3bc2c
date: 2017-04-20 10:44:11
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 杂项是Vue里一个比较零散的知识点，和大家分享一下学习的过程

<!--more-->

### 组件的命名约定

当注册组件 (或者 prop) 时，可以使用 kebab-case (短横线分隔命名)、camelCase (驼峰式命名) 或 PascalCase (单词首字母大写命名)。

官方的文档说的挺详细的：

#### 在组件定义中

		components: {
		  // 使用 kebab-case 注册
		  'kebab-cased-component': { /* ... */ },
		  // 使用 camelCase 注册
		  'camelCasedComponent': { /* ... */ },
		  // 使用 PascalCase 注册
		  'PascalCasedComponent': { /* ... */ }
		}

#### 在 HTML 模板中始终使用 kebab-case

		<kebab-cased-component></kebab-cased-component>
		<camel-cased-component></camel-cased-component>
		<pascal-cased-component></pascal-cased-component>

>当使用字符串模式时，可以不受 HTML 大小写不敏感的限制。

### 递归组件

组件在它的模板内可以递归地调用自己。不过，只有当它有 name 选项时才可以这么做：
当使用 Vue.component 全局注册了一个组件，全局的 ID 会被自动设置为组件的 name。

举一个简单的递归例子：

```javascript
//在组件内调用自己本身,一定要添加判断(v-if),否则会死循环
<script type="text/html" id="component">		
	<div>
		<component v-if='ran()>0.1'></component>
		显示内容 {{ num }}
	</div>		
</script>
````

>如果进入死循环，会导致一个“max stack size exceeded”错误，所以要确保递归调用有终止条件 (比如递归调用时使用 v-if 并最终解析为 false)。


### 组件间的循环使用

官方文档举的例子其实挺详细的，通俗一点来说，其实就是组件A想调用组件B，而组件B也想调用组件A，所以引起了冲突。
要解决这个问题，我们需要在其中一个组件中告诉模块化管理系统：“A 虽然最后会用到 B，但是不需要优先导入 B”。

所以要等到 beforeCreate 生命周期钩子中才去注册：

底下是官方的例子，什么是生命周期我们后面再进行分享

```javascript
beforeCreate: function () {
  this.$options.components.TreeFolderContents = require('./tree-folder-contents.vue')
}
```

简单的理解，也就是在组件A中使用上面这一串代码，可以再之后引入组件B，从而解决冲突的问题

### 内联模板

如果子组件有 inline-template 特性，组件将把它的内容当作它的模板，而不是把它当作分发内容。这让模板编写起来更灵活。

```javascript
<my-component inline-template>
  <div>
    <p>这些将作为组件自身的模板。</p>
    <p>而非父组件透传进来的内容。</p>
  </div>
</my-component>
```

但是 inline-template 让模板的作用域难以理解。使用 template 选项在组件内定义模板或者在 .vue 文件中使用 template 元素才是最佳实践。

### 对低开销的静态组件使用v-once

尽管在 Vue 中渲染 HTML 很快，不过当组件中包含大量静态内容时，可以考虑使用 v-once 将渲染结果缓存起来，就像这样：

```javascript
Vue.component('terms-of-service', {
  template: '\
    <div v-once>\
      <h1>Terms of Service</h1>\
      ...很多静态内容...\
    </div>\
  '
})
```

以上就是我对Vue杂项的一些理解，希望大牛提出一些宝贵的意见，谢谢
