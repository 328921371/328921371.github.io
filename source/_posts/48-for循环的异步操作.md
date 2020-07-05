---
title: for循环的异步操作
categories:
  - javaScript
tags:
  - javaScript
copyright: true
comments: true
abbrlink: f9274624
date: 2018-01-08 15:16:33
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

>for循环的操作想必大家都不陌生,今天来探讨一下for循环的小陷阱

<!--more-->

什么都先不说,先上个代码

```javascript
for (var i = 0; i < 5; i++) {
  console.log(i);
}
```

这段代码小伙伴肯定都很熟悉,for循环的基本操作,输出0,1,2,3,4.

>如果我在里面加一个setTimeout呢

```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000 * i);
}
```

有一些小伙伴也想到了, setTimeout 会延迟执行，那么执行到 console.log 的时候，其实 i 已经变成 5 了，所以会每隔一秒输出一个5

>那应该怎么改才能输出 0 到 4 呢？

其实加一个闭包就可以了

```javascript
for (var i = 0; i < 5; i++) {
  (function(i) {
    setTimeout(function() {
      console.log(i);
    }, i * 1000);
  })(i);
}
```

至于闭包的原理和实现,可以查看我另一篇博客,这里就不重复说啦

>看到这里是不是已经跃跃欲试了,如果,我把i删掉呢?会输出什么

```javascript
for (var i = 0; i < 5; i++) {
  (function() {
    setTimeout(function() {
      console.log(i);
    }, i * 1000);
  })(i);
}
```

这样子的话，内部其实没有对 i 保持引用，闭包也就没有效果了,所以会每隔一秒输出一个5

>现在,我把代码改成这样,输出什么呢?
```javascript
for (var i = 0; i < 5; i++) {
  setTimeout((function(i) {
    console.log(i);
  })(i), i * 1000);
}
```
一看就懵了,什么,在setTimeout里面放入一个立即执行函数,其实,setTimeout 可以接受函数或者字符串作为参数，那么这里立即执行函数是个啥呢，应该是个 undefined ，也就是说等价于:setTimeout(undefined, ...);所以会立马输出0~4

>好了,最后一题,放大招

```javascript
setTimeout(function() {
  console.log(1)
}, 0);
new Promise(function executor(resolve) {
  console.log(2);
  for( var i=0 ; i<10000 ; i++ ) {
    i == 9999 && resolve();
  }
  console.log(3);
}).then(function() {
  console.log(4);
});
console.log(5);
```

莫慌,少年,我们来一步一步的分析

首先先碰到一个 setTimeout，于是会先设置一个定时，在定时结束后将传递这个函数放到任务队列里面，因此开始肯定不会输出 1 。

然后是一个 Promise，里面的函数是直接执行的，因此应该直接输出 2 3 。

然后，Promise 的 then 应当会放到当前 tick 的最后，但是还是在当前 tick 中。

因此，应当先输出 5，然后再输出 4 。

最后在到下一个 tick，就是 1 。

所以最后的答案是 2 3 5 4 1

好了,今天for循环的知识点就先讨论到这里,如果文章由于我学识浅薄，导致您发现有严重谬误的地方，请一定在评论中指出，我会在第一时间修正我的博文，以避免误人子弟。