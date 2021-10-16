---
title: Vue-cli 2.0 打包配置不同环境
categories:
  - vue-cli
tags:
  - vue-cli
copyright: true
comments: true
abbrlink: bb1807b
date: 2019-09-14 11:48:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 项目会部署到线上不同的环境,看看怎么配置

<!--more-->

1. 复制config>prod.env.js，创建一个test.env.js，并修改环境为test。

2. 复制build>webpack.prod.conf.js，创建一个webpack.test.conf.js，并修改文件中出现的prod单词，替换为test

3. webpack.base.conf.js和utils.js 改为`process.env.NODE_ENV === 'production' || 'test'`

4. vue-loader.conf.js 修改为 `const isProduction = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test'`

4. package.json中改 `"test": "node build/test.build.js"`,`"all": "npm run build && npm run test"`

5. 复制build.js文件,命名为test.build.js,改为 `process.env.NODE_ENV = 'test'`,`const webpackConfig = require('./webpack.test.conf')`

> 配置不同的打包文件

```
let buildFolder;

// >>>>>>>>> 创建不同的打包地址
if (processEnv == 'production') {
  buildFolder = 'distPro';  // 生产
}

if (processEnv == 'test') {
  buildFolder = 'distTest';
}

```

```
build: {
  // Template for index.html
  index: path.resolve(__dirname, `../${buildFolder}/index.html`),

  // Paths
  assetsRoot: path.resolve(__dirname, `../${buildFolder}`),
  assetsSubDirectory: 'static',
  assetsPublicPath: './',
}
```

> 配置不同的url

```

let baseUrl= "";
switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = "/mgr/" //开发环境url
    break
  case 'test':
    baseUrl = "/dev/mgr/" //测试环境中的url
    break
  case 'production':
    baseUrl = "/mgr/" //生产环境url
    break
}

var NewApiRootUrl = baseUrl;
```


## 另一种思路

上面那种做法是比较偷懒的,相当于把test直接和prod绑在一起,也是可以分开的

1. 在config/index.js中新增一个对象类似这样的

```
module.exports = {
    dev: {},
    build: {},
    test: {}
}
```

然后再test中配置需要的参数

2. 在各个配置里面,把刚刚上面提到的那些 `|| 'test'` 修改为相对于的方法,指向到config/index.js中的test方法,其实原理都是一样的


以上就是我对vue-cli 2.0打包配置 的一些理解，如果文章由于我学识浅薄，导致您发现有严重谬误的地方，请一定在评论中指出，我会在第一时间修正我的博文，以避免误人子弟。
