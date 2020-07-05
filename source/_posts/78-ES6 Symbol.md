---
title: ECMAScript 6 Symbol
categories:
  - ECMAScript 6
tags:
  - ECMAScript 6
copyright: true
comments: true
abbrlink: 63ac1b25
date: 2019-01-11 14:45:05
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 可能大家对Symbol很陌生,简单的来说,他就是新的原始数据类型,表示独一无二的值

<!--more-->

文章主要参考阮一峰老师的 ECMAScript 6入门,站在巨人的肩膀上看世界...

## 认识Symbol

Symbol 值通过Symbol函数生成。凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

```
  // Symbol函数前不能使用new命令，否则会报错。
  let cs = Symbol();

  typeof cs
  // "symbol"
```


> Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。

```
  let s1 = Symbol('foo');
  let s2 = Symbol('bar');

  s1 // Symbol(foo)
  s2 // Symbol(bar)

  s1.toString() // "Symbol(foo)"
  s2.toString() // "Symbol(bar)"

  // 上面代码中，s1和s2是两个 Symbol 值。如果不加参数，它们在控制台的输出都是Symbol()，不利于区分。有了参数以后，就等于为它们加上了描述，输出的时候就能够分清，到底是哪一个值。
  // 所以值一样的时候,他们还是不相等的,只是一个描述
```

## Symbol在对象中的应用

> 由于每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。

```
  et mySymbol = Symbol();

  // 第一种写法
  let a = {};
  a[mySymbol] = 'Hello!';

  // 第二种写法
  let a = {
    [mySymbol]: 'Hello!'
  };

  // 以上写法都得到同样结果
  a[mySymbol] // "Hello!"
```

## Symbol对象元素的保护作用

```
  // 使用Symbol来进行保护年龄。
  let obj={name:'jspang',skill:'web'};
  let age=Symbol();
  obj[age]=18;
  for (let item in obj){
    console.log(obj[item]); // 这里是看不到年龄的
  }
  console.log(obj);
```

## Symbol.for()，Symbol.keyFor()

> 有时，我们希望重新使用同一个 Symbol 值，Symbol.for方法可以做到这一点。

```
  let s1 = Symbol.for('foo');
  let s2 = Symbol.for('foo');

  s1 === s2 // true

  // 接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值。
```

> Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key。

```
  let s1 = Symbol.for("foo");
  Symbol.keyFor(s1) // "foo"

  let s2 = Symbol("foo");
  Symbol.keyFor(s2) // undefined
```

更多的Symbol相关的知识可以移步阮一峰老师的博客,我这里就不贴出来了

以上就是我对ECMAScript 6 Symbol的一些理解，如果文章由于我学识浅薄，导致您发现有严重谬误的地方，请一定在评论中指出，我会在第一时间修正我的博文，以避免误人子弟。