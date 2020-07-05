---
title: ECMAScript 6 Class
categories:
  - ECMAScript 6
tags:
  - ECMAScript 6
copyright: true
comments: true
abbrlink: ecf83a43
date: 2019-02-25 10:57:05
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 如果看过我之前的博客,构造函数和原型,应该会发现我提到过Class

<!--more-->

早期的时候,生成实例对象的传统方法是通过构造函数,具体实现可以移步[原型与构造函数的继承](https://www.chensheng.group/2016/09/15/03-%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0%E4%B8%8E%E5%8E%9F%E5%9E%8B/)

ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类。

## 基本用法

举个简单的例子

```
  class Point {
    // constructor方法，这就是构造方法，而this关键字则代表实例对象。
    // 传递参数后可以直接使用this.xxx进行调用。
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    // 静态属性的表达。前面加上static关键字
    static uumber = 42;

    // 前面加一个#表示私有的,只能在自己的内部使用this调用
    #myValue = 0;

    // 写方法之间不要用逗号,方法如果要调用,要记得return
    toString() {
      return '(' + this.x + ', ' + this.y + ')';
    }

    // 可以进行传参
    name(val){
      console.log(val)
    }
  }

  var yuan = new Point(1,2)

  console.log(yuan.name('name')) // 最外层输出的undefined,因为没有return东西出来

```

## 类的继承

使用extends进行继承,这在我之前的博客已经提到过了

```
  class line extends Point{

  }
```

声明一个line的新类并继承Point类，line新类里边为空，这时候我们实例化新类，并调用里边的name方法。结果也是可以调用到的。


Class的知识点还有很多,但是工作中最常用到的就是这一些,更多的知识可以移步官方文档

以上就是我对ECMAScript 6 Class的一些理解，如果文章由于我学识浅薄，导致您发现有严重谬误的地方，请一定在评论中指出，我会在第一时间修正我的博文，以避免误人子弟。