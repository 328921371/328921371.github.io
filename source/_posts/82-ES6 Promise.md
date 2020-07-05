---
title: ECMAScript 6 Promise
categories:
  - ECMAScript 6
tags:
  - ECMAScript 6
copyright: true
comments: true
abbrlink: 14e6d942
date: 2019-02-19 10:55:05
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> Promise我在很早的时候就有写过,现在放在ES6中重新的提一下,因为真的很重要

<!--more-->

文章主要参考阮一峰老师的 ECMAScript 6入门,站在巨人的肩膀上看世界...

ES6中的promise的出现给我们很好的解决了回调地狱的问题，在使用ES5的时候，在多层嵌套回调时，写完的代码层次过多，很难进行维护和二次开发，ES6认识到了这点问题，现在promise的使用，完美解决了这个问题.

## promise的含义

所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

Promise对象有以下两个特点。

1. 对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

## promise的基本用法

创造了一个Promise实例。

```
  const promise = new Promise(function(resolve, reject) {
    // ... some code
    if (/* 异步操作成功 */){
      resolve(value);
    } else {
      reject(error);
    }
  });
```

> resolve -- 在异步操作成功时调用，并将异步操作的结果，作为参数传递出去.

> reject -- 在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去.

Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。

```

promise.then(function(value) {
  // success
  // 在then中,第一个函数代表成功
}, function(error) {
  // failure
  // 第二个函数代表失败
});
```

> value的值就是resolve函数传递出来的

但是,一般来说,不要在then方法里面定义 Reject 状态的回调函数（即then的第二个参数），而是使用catch方法。

```
promise
  .then(function(data) { //cb
    // success
  })
  .catch(function(err) {
    // error
  });
```

> 因为这样写法可以捕获前面then方法执行中的错误，也更接近同步的写法（try/catch）

then是成功,catch是失败,现在我们来看一下finally

finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。

```
promise
  .then(result => {···})
  .catch(error => {···})
  .finally(() => {···});
```

finally方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是fulfilled还是rejected。这表明，finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

最常用到的就是这三种,更多的大家可以去看看官方的文档

以上就是我对ECMAScript 6 Promise的一些理解，如果文章由于我学识浅薄，导致您发现有严重谬误的地方，请一定在评论中指出，我会在第一时间修正我的博文，以避免误人子弟。