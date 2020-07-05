---
title: vue使用history模式部署ng服务器
categories:
  - Vue-cli
tags:
  - Vue-cli
copyright: true
comments: true
abbrlink: 2f14e154
date: 2019-12-13 14:06:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 由于微信更新到7.0.9后不识别url地址栏上面的#,所以只能使用history模式,来看看有哪些需要注意的地方

<!--more-->

首先，按照官网的写法，添加history模式

```
export default new Router({
  mode: 'history',
  routes: router
})
```

但是仅仅这样是不够的,会导致刷新发生404,这一点官网也有说明,而且我的项目打包后在nginx的服务器上不是放在根目录上,所以对路径也有要求

ng服务器上应该这么写

```
server {
  listen       8080;
  server_name  localhost;
  #charset koi8-r;
  #access_log  logs/host.access.log  main;
  location / {
      try_files $uri $uri/ /index.html;
      root   html; #这里是文件的位置，可以直接写绝对路径
      index  index.html index.htm;
  }
}

```

这样配置后，打开的浏览器就可以直接访问到了。`127.0.0.1:8080/index.html`

假设我的路径不想放在根目录下,我想要多一层路径用来区分,假设我的文件放在html下面的dev文件下的pay

那ng服务器应该这样配置

```
location /dev/pay {
  try_files $uri $uri/ /dev/pay/index.html; 
  root   html; 
  index  index.html index.htm;
}
```

`try_files`的意思也很好理解,寻找`$uri`,没有就匹配`$uri/`,都没有就进入`/dev/pay/index.html`,加这一句话也是为了刷新的时候不会出现404

ng这样配置之后,vue-cli也要做相应的配置,不然页面进来是白屏的

```
export default new Router({
  mode: 'history',
  base: '/dev/pay/',
  routes: router
})
```

到这里,vue使用history模式部署ng服务器都可以使用了

两种写法,不同的需求,需要哪个就使用哪个

以上就是我对vue使用history模式部署ng服务器的一些理解，如果文章由于我学识浅薄，导致您发现有严重谬误的地方，请一定在评论中指出，我会在第一时间修正我的博文，以避免误人子弟。





