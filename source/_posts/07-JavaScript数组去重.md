---
title: JavaScript数组去重
categories:
  - javaScript
tags:
  - javaScript
  - 数组去重
copyright: true
comments: true
abbrlink: b72f19da
date: 2016-10-23 19:22:12
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> javaScript的数组去重有很多种方法，我分享一下我学习过程中的小demo

<!--more-->

原理比较简单，我直接在下面贴出例子

假设有一个arr1的数组

### 去重代码

第一种：

```

	function way1() {
    var newArr = [];//创建新数组
    for(var i = 0; i < arr1.length; i++) {
			if(newArr.indexOf(arr1[i]) == -1) {//判断是否有这个值
				newArr.push(arr1[i]);
			}
		}
		console.log(newArr)
	}
```

第二种：

```javascript
  function way2(){
    var arr2 = arr1.sort();	//对数组排序
    var res = [];
    for(var i=0;i<arr2.length;i++){
      if(arr2[i] !== res[res.length-1]){
        res.push(arr2[i]);
      }
    }
    console.log(res);
	}
```

第三种：

```javascript
		var setObj = new Set();
		for(var i = 0; i < arr1.length; i++) {
			setObj.add(arr1[i]);
		}
		var arr4 = [];
		for(var i of setObj){
			arr4.push(i)
		}
```

第四种：

```

	function way4(arr){
    var res =[];
    var obj = {};
    for(var i=0;i<arr1.length;i++){
      if(!obj[arr1[i]]){
        res.push(arr1[i]);
        obj[arr1[i]] = 1;
      }
    }
    console.log(res)
	}
```

第五种：

```

	function way5(){
    var arr=[];
    for(var i = 0;i<arr1.length;i++){
      //判断当前位置的数字首次出现的位置是不是当前的位置
      if(arr1.indexOf(arr1[i]) == i){
        arr.push(arr1[i])
      }
    }
    console.log(arr)
  }
```

第六种：

```

	function way6() {
    var r = [];
    for (var i = 0;i < arr1.length; i++) {
      for (var j = i + 1; j < arr1.length; j++){
        if (arr1[i] === arr1[j]) j = ++i;
      }
      r.push(arr1[i]);
    }
    console.log(r);
  }
```

### 去重原理

我简单的说一下具体的原理


第一种:

创建一个空数组arr
用for循环
判断 arr indexOf (这里是要判断的数组的元素) == -1
如果是,就push进去

第二种:

先排序
	arr2[i] !== res[res.length-1]
判断前后是否一致
这里的res是新数组

第三种:

创建一个集合,将数组所有的都加入到集合中
	setObj.add(arr1[i]);

第四种:

创建空的[]和{}
将数组值当做{}的键
判断对象上是否有键
没有的话就在空数组push

第五种:

判断当前位置的数字首次出现的位置是不是当前的位置
	arr1.indexOf(arr1[i]) == i

第六种:

两个for循环进行判断
假如有个数组[1,2,5,2,4,3,1];

```javascript
		for (var i = 0;i < arr1.length; i++) {
	        for (var j = i + 1; j < arr1.length; j++){
	        	if (arr1[i] === arr1[j]) j = ++i;
	        }
	        r.push(arr1[i]);
	 }
```

当遇到一样的数值时，就跳过判断下一个，没有的话第二个for循环会执行结束
这样就可以push进去了..[5,2,4,3,1]


以上就是我对数组去重的一些理解,不足之处希望大牛们多提一些意见,感激不尽















