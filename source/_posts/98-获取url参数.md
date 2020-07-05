---
title: 获取url参数记录
categories:
  - javaScript
tags:
  - javaScript
copyright: true
comments: true
abbrlink: beb363e8
date: 2019-09-25 10:10:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 简单的获取url做个记录

<!--more-->

简单,但是又容易忘,又不想刻意的去背,在这里做个简单的记录吧

### 第一种

```
function getUrlParam(name){
  //构造一个含有目标参数的正则表达式对象
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  //匹配目标参数
  var r = window.location.search.substr(1).match(reg);
  //返回参数值
  if (r!=null) return unescape(r[2]); return null;
} 
```

### 第二种

```
function getQueryVariable(variable){
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable){return pair[1];}
  }
  return(false);
}
```

还有更多的方法就不介绍了,百度上面都有,上面这两个方法是我比较常用的