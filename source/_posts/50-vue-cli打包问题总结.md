---
title: Vue-cli打包踩过的坑
categories:
  - Vue-cli
tags:
  - Vue-cli
copyright: true
comments: true
abbrlink: 9eedb282
date: 2018-01-29 13:31:22
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 写了一堆vue的代码，终于到了要打包部署上线了，许多小伙伴肯定都激动不已，但是发现打包之后一片空白，各种资源路径报错，今天就来讨论一下大家遇到的问题

<!--more-->

首先，bulid文件里面的东西我们就不看了，vue配置的差不多了，直接npm run build 会生成dist文件

将dist文件放在服务器上，遇到的第一个问题：

## 资源引入错误，各种报错

莫慌，这是因为在开发环境和生产环境的相对路径和绝对路径导致的，在config文件夹-index.js中的assetsPublicPath: '/'要改为'./'

假如项目没有放在根目录,并且引入了静态文件,需要改成: assetsPublicPath: '/文件名/'

## 在css中设置的背景图片显示不出来

原因其实认真思考一下也能发现，因为在css中你添加的路径，你打包出来路径就不一样了啊，你可以再打包之后修改一下路径，也可以在build/utils.js中配置
加上一句 publicPath: '../../'

```
if (options.extract) {
  return ExtractTextPlugin.extract({
    use: loaders,
    fallback: 'vue-style-loader',
    publicPath: '../../'
  })
} else {
  return ['vue-style-loader'].concat(loaders)
}
```

## 用UI框架的小伙伴可能会发现，字体图标也不见了

别急，在webpack.base.conf.js里面修改limit要改大，把10000改为90000

## 刷新时发现404

这你肯定在路由中设置了Historty模式 ，注释掉就好了

好了，以上就是我对vue-cli打包的一些理解，如果文章由于我学识浅薄，导致您发现有严重谬误的地方，请一定在评论中指出，我会在第一时间修正我的博文，以避免误人子弟。