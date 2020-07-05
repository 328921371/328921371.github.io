---
title: JavaScript对象合并
categories:
  - javaScript
tags:
  - javaScript
  - 对象合并
copyright: true
comments: true
abbrlink: e10743cb
date: 2016-10-05 11:42:12
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> javaScript的对象合并也是一个比较重要的知识点，分为浅复制和深复制，现在和大家分享一下我的学习过程

<!--more-->

### 浅复制

在之前的博客中有提到过，由于对象赋值是实际上赋值地址，所以赋值后修改新对象，会导致原来的对象也被修改举个简单的例子

```

	function externalCopy(original,current){
		for(var i in original){
			current[i] = original[i];
		}
		return current;
	}
```

### 深复制

解决这种问题常用的有两种方法

第一种：

```

	function deepCopy(original, current) {//这里传递两个对象，被复制的，复制的
		for(var i in original){//遍历要复制的对象
			if(typeof original[i] === "object") {//判断是否为引用类型
				//引用类型的话，数组就给一个新的[]，这样指向新地址，对象给{}
				current[i] = (Object.prototype.toString.call(original[i]) === "[object Array]") ? [] : {};
				//这时候重新调用本身，也就是递归函数，将[]或{}传入到current这个参数，
				//original在上面重新循环，这时候循环的是他的属性值，实现值的复制
				deepCopy(original[i], current[i]);
			} else {
				//基本类型直接复制
				current[i] = original[i];
			}
		}
	  return current;
	}
```

第二种使用 $.extend()进行深复制

```

	var newobj = $.extend(true,{}, obj1, obj2);
```

以上就是我对对象复制的一些理解,不足之处希望大牛们多提一些意见,感激不尽















