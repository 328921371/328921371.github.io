---
title: 在vue-cli中的webApp适配
categories:
  - 前端适配
tags:
  - 前端适配
copyright: true
comments: true
abbrlink: 1154f60a
date: 2018-02-05 13:44:22
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 适配一直都是前端比较重视的问题，今天主要是记录一下自己的学习过程，适配之前先初始化样式，我用的是Amaze UI的那一套，这个看个人喜好

<!--more-->

使用Flexible实现H5页面的终端适配，先给大家一个连接，写的很详细  [点我!!点我!!](https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html)

由于我的项目是用vue来搭建的，就先说一下在vue中如何使用吧

实现的原理我就不说了，由于我理解的也不是很深入，就不误人子弟，小伙伴们自己看看上面的文档吧

>首先在你的项目中导入 Flexible

npm i lib-flexible --save

>之后在 main.js的页面导入

import 'lib-flexible'

>实际开发中，我们通过设计稿得到的值单位是 px，所以要将 px 转换成 rem 再写进样式中。
将 px 转换成 rem 我们将使用 px2rem 这个工具，它有 webpack 的 loader：px2rem-loader

npm install px2rem-loader

在 vue-cli 生成的 webpack 配置中，vue-loader 的 options 和其他样式文件 loader 最终是都是由 build/utils.js 里的一个方法生成的。

我们只需在 cssLoader 后再加上一个 px2remLoader 即可，px2rem-loader 的 remUnit 选项意思是 1rem=多少像素，结合 lib-flexible 的方案，我们将 px2remLoader 的 options.remUnit 设置成设计稿宽度的 1/10，这里我们假设设计稿宽为 750px。

```javascript
var cssLoader = {
  loader: 'css-loader',
  options: {
    minimize: process.env.NODE_ENV === 'production',
    sourceMap: options.sourceMap
  }
}
var px2remLoader = {
  loader: 'px2rem-loader',
  options: {
    remUnit: 75
  }
}
```

并放进 loaders 数组中

```javascript
const loaders = options.usePostCSS ? [cssLoader, postcssLoader, px2remLoader] : [cssLoader, px2remLoader]

if (loader) {
  loaders.push({
    loader: loader + '-loader',
    options: Object.assign({}, loaderOptions, {
      sourceMap: options.sourceMap
    })
  })
}
```

修改配置后需要重启，然后我们在组件中写单位直接写 px，设计稿量多少就可以写多少了，舒服多了。

```
.selector {
    width: 150px;
    height: 64px; /*px*/
    font-size: 28px; /*px*/
    border: 1px solid #ddd; /*no*/
}

上面的/no/和/px/ 标识 不需要变成rem的一定要加上 这样最终不会把px变成rem px2rem处理之后将会变成：
.selector {
    width: 2rem;
    border: 1px solid #ddd;
}
[data-dpr="1"] .selector {
    height: 32px;
    font-size: 14px;
}
[data-dpr="2"] .selector {
    height: 64px;
    font-size: 28px;
}
[data-dpr="3"] .selector {
    height: 96px;
    font-size: 42px;
}
```

说明:

font-size:26px /*no*/ px不转成rem
font-size:26px /*px*/ px根据设备转化
font-size:26px px转成rem

好了，以上就是我对vue-cli的适配的一些理解，如果文章由于我学识浅薄，导致您发现有严重谬误的地方，请一定在评论中指出，我会在第一时间修正我的博文，以避免误人子弟。