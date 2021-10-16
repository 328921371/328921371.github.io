---
title: JavaScript的执行顺序
categories:
  - javaScript
tags:
  - javaScript
copyright: true
comments: true
abbrlink: 7354ab90
date: 2020-07-04 13:35:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 如何理解JavaScript的事件循环?什么是宏任务和微任务?怎么理解消息队列的执行顺序?

<!--more-->

由于我们是一个前端的开发者,所以大多数接触到的是浏览器或者Node,我们该如何去使用JavaScript 引擎。

当拿到一段 JavaScript 代码时,浏览器或者 Node 环境首先要做的就是,传递给 JavaScript 引擎,并且要求它去执行。

我们都知道JavaScript是单线程,但是执行 JavaScript 并非一步到位,宿主环境当遇到一些事件时,会继续把一段代码传递给 JavaScript 引擎去执行,此外,我们可能还会提供 API 给 JavaScript 引擎,比如 setTimeout 这样的 API,它会允许 JavaScript 在特定的时机执行。

{% note info  %}
所以,我们首先应该形成一个感性的认知：一个 JavaScript 引擎会常驻于内存中,它等待着我们（宿主）把 JavaScript 代码或者函数传递给它执行。
{% endnote %}


在 ES3 和更早的版本中,JavaScript 本身还没有异步执行代码的能力,这也就意味着,宿主环境传递给 JavaScript 引擎一段代码,引擎就把代码直接顺次执行了,这个任务也就是宿主发起的任务。

但是,在 ES5 之后,JavaScript 引入了 Promise,这样,不需要浏览器的安排,JavaScript 引擎本身也可以发起任务了。

我们采纳 JSC 引擎的术语,把宿主发起的任务称为宏观任务,把 JavaScript 引擎发起的任务称为微观任务。

### 事件循环

JavaScript 引擎等待宿主环境分配宏观任务,在操作系统中,通常等待的行为都是一个事件循环,所以在 Node 术语中,也会把这个部分称为事件循环(event loop)。

JavaScript是单线程异步处理,其实也都是通过事件循环来实现的异步或模拟'多线程'。

* 同步和异步任务在不同的执行"场所",同步的进入主线程,异步的进入Event Table执行并注册函数。

* 当指定的异步事情完成时,Event Table会将这个函数移入Event Queue。

* 主线程内的任务执行完毕为空,会去Event Queue读取对应的函数,推入主线程执行。

* js引擎的monitoring process进程会持续不断的检查主线程执行栈是否为空,一旦为空,就会去Event Queue那里检查是否有等待被调用的函数。上述过程会不断重复,也就是常说的Event Loop(事件循环)。

用个例子说明上述过程：

```
let data = [];
$.ajax({
  url:www.javascript.com,
  data:data,
  success:() => {
    console.log('发送成功!');
  }
})
console.log('代码执行结束');
```

* ajax（异步任务）进入Event Table,注册回调函数success。

* 执行console.log('代码执行结束')。（同步任务在主线程执行）

* ajax事件完成,回调函数success进入Event Queue。

* 主线程从Event Queue读取回调函数success并执行。

我们可以大概理解：宏观任务的队列就相当于事件循环。总结起来就是下面这样

主任务(宏任务)完 ——> 所有微任务 ——> 宏任务（找到宏任务其中一个任务队列执行,其中如果又有微任务,该任务队列执行完就执行微任务）——> 宏任务中另外一个任务队列（里面有微任务就再执行微任务）。

![图片](https://csblogimage.oss-cn-hangzhou.aliyuncs.com/133-Js%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,size_16,text_Qnku6ZmI5YWI55Sf55qE5bCP5YmN56uv,color_FFFFFF,shadow_50,t_100,g_se,x_10,y_10)

### 宏观任务(MacroTask)和微观任务(MicroTask)

之前我们说过了,宿主发起的任务称为宏观任务,把 JavaScript 引擎发起的任务称为微观任务

除了广义的同步任务和异步任务,我们对任务有更精细的定义:

macro-task(宏任务): 包括整体代码script,setTimeout,setInterval

micro-task(微任务): Promise,process.nextTick

那宏观任务和微观任务有什么关系呢?

在宏观任务中,JavaScript 的 Promise 还会产生异步代码,JavaScript 必须保证这些异步代码在一个宏观任务中完成,因此,每个宏观任务中又包含了一个微观任务队列

有了宏观任务和微观任务机制,我们就可以实现 JavaScript 引擎级和宿主级的任务了,例如：Promise 永远在队列尾部添加微观任务。setTimeout 等宿主 API,则会添加宏观任务。

#### Promise

Promise我们已经讲过很多次了,这里就不再重复说了,再看一次我之前再其他博客写过的代码

```
setTimeout(function(){ 
  console.log(4)
}, 0);
new Promise(function(resolve){
  console.log(1)
  for( var i = 0 ; i < 10000 ; i++ ){
    i == 9999 && resolve()
  }
  console.log(2)
}).then(function(){
  console.log(5)
});
console.log(3);
```

打印的结果是 '1, 2, 3, 5, 4', 具体详情可以参考这篇博客 [陈先生的小前端-JS高频考题分享](https://www.chensheng.group/2019/10/10/106-JS高频考题分享/)

我们发现,不论代码顺序如何,4 必定发生在 5 之后,因为 Promise 产生的是 JavaScript 引擎内部的微任务,而 setTimeout 是浏览器 API,它产生宏任务。

为了理解微任务始终先于宏任务,我们设计一个实验：执行一个耗时 1 秒的 Promise。

```
setTimeout(()=>{
  console.log("6")
}, 0) 
var r = new Promise((resolve, reject)=>{
  console.log('1')
  resolve()
}); 
r.then(()=>{
  console.log('3')
  var begin = Date.now(); 
  while(Date.now() - begin < 1000);
  console.log("4") 
  new Promise((resolve, reject)=>{ 
    resolve()
  }).then(() => console.log("5"))
});
console.log('2')
```

这里我们强制了 1 秒的执行耗时,这样,我们可以确保任务 5 是在 6 之后被添加到任务队列。
我们可以看到,即使耗时一秒的 4 执行完毕,再 enque 的 5,仍然先于 6 执行了,这很好地解释了微任务优先的原理。

通过一系列的实验,我们可以总结一下如何分析异步执行的顺序：

* 首先我们分析有多少个宏任务；
* 在每个宏任务中,分析有多少个微任务；
* 根据调用次序,确定宏任务中的微任务执行次序；
* 根据宏任务的触发规则和调用次序,确定宏任务的执行次序；
* 确定整个顺序。

Promise 是 JavaScript 中的一个定义,但是实际编写代码时,我们可以发现,它似乎并不比回调的方式书写更简单,但是从 ES6 开始,我们有了 async/await,这个语法改进跟 Promise 配合,能够有效地改善代码结构。

之前一直没有说async/await, 今天刚好一起介绍一下

#### async/await

其实async/await 就是 promise的一个语法糖,让我们的代码看起来像是同步,更加的美观,先来看一下基本用法

async 函数必定返回 Promise,我们把所有返回 Promise 的函数都可以认为是异步函数。

async 函数是一种特殊语法,特征是在 function 关键字之前加上 async 关键字,这样,就定义了一个 async 函数,我们可以在其中使用 await 来等待一个 Promise。

另外还有一个很有意思的语法规定,await 只能出现在 async 函数中。

我们先看看async 起什么作用,而他又是怎么处理他的返回值的

举个例子

```
methods: {
  testAsync() {
    return "hello async";
  },
  async testAsync2() {
    return "hello async";
  }
}
```

分别输出这两个函数,你会发现很有趣的地方

async 函数返回的是一个 Promise 对象,如果在函数中 return 一个直接量,async 会把这个直接量通过 Promise.resolve() 封装成 Promise 对象。

假设我们没有return东西,那它就会返回一个Promise.resolve(undefined)。

> 补充知识点: Promise.resolve(x) 可以看作是 new Promise(resolve => resolve(x)) 的简写,可以用于快速封装字面量对象或其他对象,将其封装成 Promise 实例。

现在来看看await,他等的是什么?

一般来说,都认为 await 是在等待一个 async 函数完成。其实也可以用来等待普通函数,所以实际上 await 等是一个返回值 

举个例子

```
methods: {
  async getData(){
    let sendMessage = {
      url: '/v2/music/search?q=周杰伦',
      PostData: {}
    }
    return await this.$store.dispatch('Get', sendMessage) // 这个是封装的方法,返回的是一个promise
  },
  test(){
    return 'music'
  },
  async lookData(){
    let m1 = await this.getData()
    let m2 = await this.test()
    console.log(m1, m2)
  }
  
},
created() {
  this.lookData() // m1和m2都可以输出
}
```

单一的 Promise 链并不能发现 async/await 的优势,但是,如果需要处理由多个 Promise 组成的 then 链的时候,优势就能体现出来了

我们之前是用Promise 通过 then 链来解决多层回调地狱的问题

现在又可以使用 async/await 来进一步优化它,看起来更像一个同步了。

### 结尾

为了更好的理解 事件循环,宏观任务,微观任务,以及任务队列,直接上代码

```
console.log('1'); //第一轮主线程【1】
 
setTimeout(function() { //碰到set异步，丢入宏任务队列【set1】：我将它命名为set1
     console.log('2');//第二轮宏任务执行，输出【2】
     process.nextTick(function() {//第二轮宏任务执行，碰到process，丢入微任务队列，【3】
         console.log('3');
     })
     new Promise(function(resolve) {//第二轮宏任务执行，输出【2，4】
         console.log('4');
        resolve();
    }).then(function() {
        console.log('5')//第二轮宏任务执行，碰到then丢入微任务队列，【3，5】
    })
})
process.nextTick(function() { //碰到process，丢入微任务队列【6】
    console.log('6'); //第一轮微任务执行
})
new Promise(function(resolve) { 
    console.log('7'); //new的同时执行代码，第一轮主线程此时输出【1，7】
    resolve();
}).then(function() {
    console.log('8') //第一轮主线程中promise的then丢入微任务队列，此时微任务队列为【6，8】。当第一轮微任务执行，顺序输出【6，8】
})

setTimeout(function() { //碰到set异步丢入宏任务队列，此时宏任务队列【set1.set2】：我将它命名为set2
    console.log('9');//第三轮宏任务执行，输出【9】
    process.nextTick(function() { //第三轮宏中执行过程中添加到微任务【10】
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');//第三轮宏任务执行，宏任务累计输出【9,11】
        resolve();
    }).then(function() {
        console.log('12') //第三轮宏中执行过程中添加到微任务【10，12】
    })
})
```

解答: 

第一轮：主线程输出：【1，7】，添加宏任务【set1，set2】，添加微任务【6，8】。执行完主线程，然后执行微任务输出【6，8】

第二轮：执行宏任务其中一个任务队列set1:输出【2，4】，执行任务的过程，碰到有微任务，所以在微任务队列添加输出【3，5】的微任务，在set1宏任务执行完就执行该微任务，第二轮总输出：【2，4，3，5】

第三轮：执行任务另一个任务队列set2：输出【9，11】，执行任务的过程，碰到有微任任务，所以在微任务队列添加输出【10，12】的微任务，在set2宏任务执行完就执行该微任务，第三轮总输出：【9，11，10，12】

整段代码，共进行了三次事件循环，完整的输出为1，7，6，8，2，4，3，5，9，11，10，12。(请注意，node环境下的事件监听依赖libuv与前端环境不完全相同，输出顺序可能会有误差)

以上就是我对JavaScript执行的一些理解,如果文章由于我学识浅薄,导致您发现有严重谬误的地方,请一定在评论中指出,我会在第一时间修正我的博文,以避免误人子弟。








