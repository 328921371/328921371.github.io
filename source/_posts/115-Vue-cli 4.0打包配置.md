---
title: Vue-cli 4.0 打包配置不同环境
categories:
  - vue-cli
tags:
  - vue-cli
copyright: true
comments: true
abbrlink: e0d8e35
date: 2019-12-20 16:55:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 在之前已经写过了vue 2.0的打包配置,今天写一下4.0的配置,略微有些区别

<!--more-->

相比较于之前的版本,4.0的配置显得较为简单一些

首先在根目录下创建三个文件

.env .env.test .env.production

* .env 本地环境
{% label info@NODE_ENV="development" %}

* .env.test 测试环境
{% label info@NODE_ENV="test" %}

* .env.production 生产环境
{% label info@NODE_ENV="production" %}

配置好后,在api.js中就可以直接使用

```
let baseUrl= "";
switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = "/mgr" //开发环境url
    break
  case 'test':
    baseUrl = "/test" //测试环境中的url
    break
  case 'production':
    baseUrl = "/production" //生产环境url
    break
}
```

至于这个baseUrl,有人喜欢也在.env中文件直接配置好,这个看个人爱好

再来看看config中怎么配置

```
module.exports = {
  // 输出文件目录,默认就是dist
  outputDir: process.env.NODE_ENV === "test" ? 'distTest' : 'distPro',
}
```

将测试和正式环境分开来,打包在不同的文件夹里面


最后就是配置命令了,和之前一样,在package.json中

```
"scripts": {
  "serve": "vue-cli-service serve",
  "test": "vue-cli-service build --mode test",
  "build": "vue-cli-service build --mode production",
  "all": "npm run build && npm run test",
},
```

> 注意命名要和文件名一样的


以上就是我对vue-cli 4.0 打包配置的一些理解,如果文章由于我学识浅薄,导致您发现有严重谬误的地方,请一定在评论中指出,我会在第一时间修正我的博文,以避免误人子弟。





