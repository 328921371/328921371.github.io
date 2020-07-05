---
title: javaScript 数据类型
categories:
  - javaScript
tags:
  - javaScript
  - 数据类型
copyright: true
comments: true
abbrlink: 7a4468e0
date: 2016-07-11 19:13:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 接触javaScript有一段时间了,今天来讲一下javaScript中的数据类型都有哪些

<!--more-->

### 数据类型

javaScript 中有六大数据类型:

* object   (对象)
* number   (数字)
* string   (字符串)
* blooean  (布尔)
* Null     (空)
* undefined(未定义)

其中 javaScript还分为了基本数据类型和引用类型,在这里不详细的展开,我在接下来的博客中会进行详细的讲述

### 数据类型的隐式转化

javaScript中的隐式转化也是很有趣的一个地方,打个比方,我定义了一个字符串的变量,
再定义一个Number类型的变量 ,进行比较,结果却是true

	var a = '123' ;

	var b = 123;

	a == b //true

这是因为javaScript执行时将String转化为了Number类型,再进行判断,这样的隐式转化还有很多,
布尔类型转化Number都是可以的

	true == 1;
	false == 0;

隐式转化还有个值得注意的地方在于 + 号 与 - 号

	var a = '100',
	var b = 50

	a + b // 10050
	a - b // 50

这是因为,在执行 + 号的时候, 变量a为字符串类型,所以执行的字符串的拼接,但是在js的代码中,-被认定
为减法运算,所以会自动将变量a转化为Number类型,并进行运算

### 包装对象

包装对象这一特性在javaScript中也是值得一提的,大家都知道对象是可以进行打点调用或赋值的,那字符串可以吗,
我们可以做一个测试

	var a = "string";
	console.log(a.t = 3); // 3
	console.log(a.t); // undefined

正所谓在H5中,一切皆为对象,把一个基本类型尝试用对象的方式使用它的时候,javascript会把这些基本类型转化为对应的包装类型对象完成这样一个操作以后，这个临时对象会被销毁掉。所以a.t赋值3了以后,再去输出a.t值是undefined。

### 类型检测

typeof 和 instanceof 都可以进行类型检测,typeof就不进行细讲了,来说一下instanceof

它基于原型链操作。obj instanceof Object。

左边的操作数为对象，不是就返回false,右操作数必须是函数对象或者函数构造器,因为只有函数才有prototype这个属性,不是会爆出typeError异常。

原理：判断左边的左操作数的对象的原型链上是否有右边这个构造函数的prototype属性。原型链和构造函数我在后面会
进行细讲

注意一个坑:不同window或iframe之间的对象类型检测不能使用instanceof！

### 数据类型转化

我这里简单的介绍一下常用的类型转化

1. 将字符串类型转化为number的类型
	str = Number(str);

2. number类型转化为string类型
	a = a.toString()
	a =	String(a)

3. 布尔类型转化为number
	var y = false;
	y = Number(y);

4. 把数字格式化为指定的长度;会四舍五入
	i = i.toPrecision(3)

5. 将数字转化为字符串,保留几位小数,不够的用0补位
	i = i.toFixed(1);

前端会经常进行数据的交互和处理,所以Number的转化是用到最多的,这里详细的介绍一下

Number()函数的转换规则如下：

* 如果是Boolean值，true和false将分别被替换为1和0

* 如果是数字值，只是简单的传入和返回

* 如果是null值，返回0

* 如果是undefined，返回NaN

* 如果是字符串，遵循下列规则：

	* 如果字符串中只包含数字，则将其转换为十进制数值，即”1“会变成1，”123“会变成123，而”011“会变成11（前导的0被忽略）

	* 如果字符串中包含有效的浮点格式，如”1.1“，则将其转换为对应的浮点数（同样，也会忽略前导0）

	* 如果字符串中包含有效的十六进制格式，例如”0xf“，则将其转换为相同大小的十进制整数值

	* 如果字符串是空的，则将其转换为0

	* 如果字符串中包含除了上述格式之外的字符，则将其转换为NaN

	* 如果是对象，则调用对象的valueOf()方法，然后依照前面的规则转换返回的值。如果转换的结果是NaN，则调用对象的toString()方法，然后再依次按照前面的规则转换返回的字符串值。

javaScript 的数据类型就讲到这里了,如果有错误,欢迎各位大牛指出,感激不尽
