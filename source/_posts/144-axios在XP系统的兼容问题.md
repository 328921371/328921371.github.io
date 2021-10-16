---
title: axios在XP系统的兼容问题
categories:
  - javaScript
tags:
  - javaScript
copyright: true
comments: true
abbrlink: 888bcb50
date: 2021-09-01 13:30:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> vue-cli 使用 axios 兼容 xp

<!--more-->

项目需要兼容XP,控制台查看报错发现是 `promise is undefined`, 项目中调用接口使用的是axios, axios又是基于promise上

所以需要添加一些插件进行兼容

### 方法一

看到一篇博客说可以使用bluebird.js解决。直接在页面引入bluebird.js问题就解决了。

[bluebird.js下载地址](https://cdn.jsdelivr.net/bluebird/latest/bluebird.js)

### 方法二

`npm install --save babel-polyfill`

安装成功以后需要在main.js 中引入 babel-polyfill

一般会配置 webpack.base.config.js 中 entry

```
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: ["babel-polyfill", "./src/main.js"] 
    // app: './src/main.js'
  }
}
```

搞定......