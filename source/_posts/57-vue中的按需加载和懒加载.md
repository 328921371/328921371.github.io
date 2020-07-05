---
title: vue中的按需加载和懒加载
categories:
  - Vue
tags:
  - Vue
copyright: true
comments: true
abbrlink: 71f6eb12
date: 2018-02-26 10:05:22
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> vue打包之后,经常首页白屏时间过长,这时候就需要使用按需加载和懒加载了

<!--more-->

### 路由懒加载

直接说一下官方推荐

vue官方的一种方法，import()方法和增加webpackChunkName。

1. 需要安装 cnpm i -s @babel/plugin-syntax-dynamic-import
2. 配置webpack，在webpack-base-conf.js的output加入chunkFilename: ‘[name].js’

> 按需加载 + js打包分离,这样做的好处,每个组件单独打包，加载的时候文件不会太大。webpackChunkName中的名称一样,就打包在同一个文件

```
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
     {
       path: '/',
       name: 'HelloWorld',
       component: () => import(/* webpackChunkName: "HelloWorld" */ '@/components/HelloWorld')
     }
  ]
})
```

如果觉得麻烦,不想装插件

`component: resolve => require(['@/components/HelloWorld'], resolve),` 也是可以的


### 组件懒加载

组件懒加载其实用法和路由是一样的

```
components: {
  historyTab:resolve => {
    require(['@/components/Tab.vue'],resolve)
  },   
},
```

### UI组件库按需加载

引入的第三方库过于庞大,也是导致首页白屏的很大原因

我们可以对组件库进行按需加载,我常用的就是element和iview,说一下这两个吧,其实官网也都有说的

#### element

`npm install babel-plugin-component –D`

`npm install babel-plugin-import --save-dev`

然后配置插件，将 .babelrc修改为：

```
{
  "presets": [
    ["env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }],
    "stage-2"
  ],
  "plugins": ["transform-vue-jsx", "transform-runtime",
		[
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
	]
}

```

需要那些就在main.js中引入

```
// 按需加载
import { Table, TableColumn, Button} from 'element-ui';
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
```


#### iview

其实道理都一样

`npm install babel-plugin-import --save-dev`

然后修改.babelrc

```
{
  "plugins": [["import", {
    "libraryName": "iview",
    "libraryDirectory": "src/components"
  }]]
}
```

使用也是一样的,就不说了

> 可能每个版本的vue-cli的.babelrc初始配置不一样,照着改就好了,多试几次

以上就是我对Vue按需加载的一些理解，如果文章由于我学识浅薄，导致您发现有严重谬误的地方，请一定在评论中指出，我会在第一时间修正我的博文，以避免误人子弟。