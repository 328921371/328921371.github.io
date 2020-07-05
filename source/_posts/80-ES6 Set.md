---
title: ECMAScript 6 Set
categories:
  - ECMAScript 6
tags:
  - ECMAScript 6
copyright: true
comments: true
abbrlink: 697d9c0e
date: 2019-02-19 10:55:05
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> Set想必大家是不陌生的,ES6一个较为好用的方法,和Array很像但又不同

<!--more-->

文章主要参考阮一峰老师的 ECMAScript 6入门,站在巨人的肩膀上看世界...

>Set和Array 的区别是Set不允许内部有重复的值，如果有只显示一个，相当于去重。虽然Set很像数组，但是他不是数组。

> [...new Set(array)]

## Set的声明

```
  let setArr = new Set(['cs','csing','web']);
  console.log(setArr);
```

### Set值的追加

在使用Array的时候，可以用push进行追加值，那Set稍有不同，它用更语义化的add进行追加。

```
  let setArr = new Set(['cs','csing','web']);
  setArr.add('hello');
  console.log(setArr);
```

### Set值的删除

```
  let setArr = new Set(['cs','csing','web']);
  setArr.delete('csing');
  console.log(setArr);
```

### Set值的查找

用has进行值的查找，返回的是true或者false。

```
  let setArr = new Set(['cs','csing','web']);
  console.log(setArr.has('csing'));//true
```

### Set值的删除

```
  let setArr = new Set(['cs','csing','web']);
  setArr.clear();
  console.log(setArray);//true
```

### set的for...of循环

```
  let setArr = new Set(['cs','csing','web']);
  for (let item of setArr){
    console.log(item);
  }
```

### set的size属性

size属性可以获得Set值的数量。

```
  let setArr = new Set(['cs','csing','web']);
  console.log(setArr.size);
```

### set的forEach循环

```
  let setArr = new Set(['cs','csing','web']);
  setArr.forEach((value)=>console.log(value));
```

### WeakSet的声明

WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，WeakSet 的成员只能是对象，而不能是其他类型的值。

```
  let weakObj = new WeakSet();
  let obj = {a:'cs',b:'csing'}
  weakObj.add(obj);
  console.log(weakObj);
```

在实际开发中Set用的比较多，WeakSet用的并不多，但是他对传入值必须是对象作了很好的判断，我们灵活应用还是有一定的用处的。

以上就是我对ECMAScript 6 Set的一些理解，如果文章由于我学识浅薄，导致您发现有严重谬误的地方，请一定在评论中指出，我会在第一时间修正我的博文，以避免误人子弟。