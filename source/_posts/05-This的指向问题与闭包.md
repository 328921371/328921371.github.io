---
title: This的指向问题与闭包
categories:
  - javaScript
tags:
  - javaScript
  - this
  - 闭包
copyright: true
comments: true
abbrlink: 77fc9202
date: 2016-09-24 12:42:12
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> This的指向问题一直是JavaScript的一个容易混淆的地方，闭包与this的结合更是让人头晕，现在和大家分享一下我的学习过程

<!--more-->

### This的用法

总结起来比较常用的在三个地方

#### 全局中

全局中，函数的调用，this基本都是指向window

#### 点击事件中

在点击事件中，this 指向的是当前触发事件的元素对象

#### 构造函数中

在构造函数中，this 表示的是正在初始化的对象本身

举个简单的例子

```javascript
	var obj = {
		name:'小强',
		age: 20,
		run: function(){
			console.log(this);
		}
	}
	var fun = obj.run;
	fun();//这样子调用，this指向的是window
	obj.run();//这样调用，this指向的是obj
```

### 闭包

闭包的作用有两个：让外部访问函数内部的变量、另一个就是让这些变量的值始终保持在内存中。

实现的方法,在函数的内部在声明一个函数,返回这个函数,就可以获取到外部的变量，举个简单的例子

```

  function f1(){
    var n=999;
    nAdd=function(){n+=1}
    function f2(){
      alert(n);
    }
    return f2;
  }

  var result=f1();
  result(); // 999
  nAdd();
  result(); // 1000
```

也就是说，当内部函数的作用域，被外部引用时，就创建了该内部函数的闭包，如果内部函数引用了位于外部函数的变量，当外部函数调用完毕后，这些变量在内存中不会被释放，因为闭包需要他们


有两个比较经典的关于this的指向与闭包的小demo，也和大家分享一下，如果知道了原理，this的指向就不再困扰你了

> 第一题

```

	var object = {
		name:"My Object",
		getNameFunc: function() {
			return function() {
				return this;
			};
		}
	};
	console.log(object.getNameFunc()());

```

> 第二题

```

	var name = "The Window";
	var object = {
		name: "My Object",
		getNameFunc: function() {
			var that = this;
			return function() {
				return that.name;
			};
		}
	};
	console.log(object.getNameFunc()());

```

以上就是我对this指向的一些理解,不足之处希望大牛们多提一些意见,感激不尽















