---
title: vue-cli 打包删除console.log
categories:
  - Vue-cli
tags:
  - Vue-cli
copyright: true
comments: true
abbrlink: 5ce8c5b8
date: 2020-06-05 19:38:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 项目打包的时候想要删除console.log,但是又不想手动删除,万一编译的时候还要用,这时候就要自己开始配置了

<!--more-->

### vue-cli 2 版本 并且 webpack 3 版本

打开webpack.prod.conf.js文件

找到 UglifyJsPlugin, 添加`drop_console: true` 就可以了

```
new UglifyJsPlugin({
  uglifyOptions: {
    compress: {
      warnings: false,
      drop_debugger: true,
      drop_console: true
    }
  },
  sourceMap: config.build.productionSourceMap,
  parallel: true
}),
```

### vue-cli 3 || 4 版本

由于这个版本的webpack被简化了,所以我们的项目中没有build文件夹,所以可以在vue.config.js的文件中进行配置

```
configureWebpack: (config) => {
  // 覆盖webpack默认配置的都在这里
  if (process.env.NODE_ENV === "production") {
    config.optimization.minimizer[0].options.terserOptions.compress.warnings = false;
    config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true;
    config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = [
      "console.log"
    ];
  }
}
```

有看到其他用插件的,什么安装`babel-plugin-transform-remove-console`,安装`terser-webpack-plugin`, 都太麻烦了,webpack中有自带的,用它的就行




以上就是我对console.log配置的一些理解,如果文章由于我学识浅薄,导致您发现有严重谬误的地方,请一定在评论中指出,我会在第一时间修正我的博文,以避免误人子弟。
