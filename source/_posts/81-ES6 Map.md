---
title: ECMAScript 6 Map
categories:
  - ECMAScript 6
tags:
  - ECMAScript 6
copyright: true
comments: true
abbrlink: 1cc41369
date: 2019-02-19 10:55:05
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> Map是一种灵活，简单的适合一对一查找的数据结构。我们知道的数据结构，已经有了json和set。那map有什么特点。

<!--more-->

文章主要参考阮一峰老师的 ECMAScript 6入门,站在巨人的肩膀上看世界...

JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。

为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。

举个简单的例子

```
  let json = {
    name:'csing',
    skill:'web'
  }
  console.log(json.name);
  var map=new Map();
  map.set(json,'iam');
  console.log(map);
```

你的key可以设置成对象，值也可以设置成字符串，让它不规律对应起来,当然也可key字符串，value是对象。我们调换一下位置，依然是符合map的数据结构规范的。

## Map值的增加

上面的代码就已经体现了Map值的增加了

`map.set('csing',json);`

## Map值的获取

`map.get(json)`

## Map值的删除

`map.delete(json);`

## Map值的size属性

`console.log(map.size);`

## 查找是否存在has

`map.has('csing')`

## 清楚所有元素clear

`map.clear()`

Map在现在开发中已经经常使用，它的灵活性和高效性是我们喜欢的。

以上就是我对ECMAScript 6 Map的一些理解，如果文章由于我学识浅薄，导致您发现有严重谬误的地方，请一定在评论中指出，我会在第一时间修正我的博文，以避免误人子弟。