---
title: electron-vue 启动报错
categories:
  - electron-vue
tags:
  - electron-vue
copyright: true
comments: true
abbrlink: 3f1c7bd
date: 2019-09-12 14:54:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 隔了很久重新打开electron-vue,有新加了需求,结果运行报错: process is not defined

<!--more-->

当时就把我整蒙逼了,太久没启动,项目都生锈了吗

上百度一查,原来不止是我,很多人都有这个问题,那我就放心了,在GitHub的electron-vue的issue中找到了解决办法

### 第一种

简单粗暴，不知道会不会有什么影响，直接将`src/index.ejs`这段代码去掉

```
<% if (!process.browser) { %>
  <script>
    if (process.env.NODE_ENV !== 'development') window.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
  </script>
<% } %>
```

### 第二种 

将 .electron-vue/webpack.web.config.js 和.electron-vue/webpack.renderer.config.js中的代码修改为 


```
new HtmlWebpackPlugin({
  filename: 'index.html',
  template: path.resolve(__dirname, '../src/index.ejs'),
  templateParameters(compilation, assets, options) {
    return {
      compilation: compilation,
      webpack: compilation.getStats().toJson(),
      webpackConfig: compilation.options,
      htmlWebpackPlugin: {
        files: assets,
        options: options
      },
      process,
    };
  },
  minify: {
    collapseWhitespace: true,
    removeAttributeQuotes: true,
    removeComments: true
  },
  nodeModules: false
})
```

### 第三种

后来搞清楚了原因,node 版本在12.0以上才会报这个错误,把node版本回退一下就好了,怎么回退就看我上一篇的博客吧



以上就是我对electron-vue 报错的一些理解，如果文章由于我学识浅薄，导致您发现有严重谬误的地方，请一定在评论中指出，我会在第一时间修正我的博文，以避免误人子弟。