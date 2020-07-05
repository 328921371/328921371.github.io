---
title: vue-cli中proxy的pathRewrite该怎么使用
categories:
  - Vue-cli
tags:
  - Vue-cli
copyright: true
comments: true
abbrlink: 60e2b656
date: 2019-12-19 14:00:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 很多同学明明配置好了跨域,可是接口还是返回404,不明所以

<!--more-->

跨域的原理我就不讲了

直接上代码显示

假如我的接口是`https://api.douban.com/v2/music/search?q=周杰伦`

```
devServer: {
  proxy: {
    '/mgr': {
      target: 'https://api.douban.com',
      ws: true,
      changeOrigin: true,
      pathRewrite:{
        '^/mgr': ''
      }
    }
  }
},
```

那我调用时就可以将接口写成这样`/mgr/v2/music/search?q=周杰伦`

那这个pathRewrite到底是干嘛用的,为什么有时候需要写,有时候不需要写

其实很简单,用代理, 首先你得有一个标识, 告诉node, 我接口只要是'/mgr'开头的才用代理.所以你的接口就要这么写 /mgr/xx/xx. 最后代理的路径就是 http://xxx.xx.com/mgr/xx/xx.

可是不对啊, 我正确的接口路径里面没有/mgr啊. 所以就需要 pathRewrite,用`'^/mgr':''`, 把'/mgr'去掉, 这样既能有正确标识, 又能在请求接口的时候去掉mgr.

现在换一种不用pathRewrite的写法

接口同样不变

```
devServer: {
  proxy: {
    '/v2': {
      target: 'https://api.douban.com',
      ws: true,
      changeOrigin: true
    }
  }
},
```

这时候接口就要写成这样`/v2/music/search?q=周杰伦`,因为v2是真的在接口中出现的,不能去掉


以上就是我对pathRewrite的一些理解,如果文章由于我学识浅薄,导致您发现有严重谬误的地方,请一定在评论中指出,我会在第一时间修正我的博文,以避免误人子弟。





