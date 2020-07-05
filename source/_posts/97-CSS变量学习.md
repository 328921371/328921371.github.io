---
title: CSS变量学习
categories:
  - CSS
tags:
  - CSS
copyright: true
comments: true
abbrlink: 5f1da264
date: 2019-09-19 10:44:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 在之前我们聊过scss/sass,今天我们来看看css中的变量

<!--more-->

文章参考阮一峰老师的 CSS 变量教程,站在巨人的肩膀上看世界...

### 变量的声明

声明变量的时候，变量名前面要加两根连词线（--）。

```
// 选择器里面声明了两个变量：--header-color和--Header-Color
body {
  --header-color: #7F583F;
  --Header-Color: #F7EFD2;
}
```

变量名大小写敏感，--header-color和--Header-Color是两个不同变量。

> 为什么选择两根连词线（--）表示变量？因为$foo被 Sass 用掉了，@foo被 Less 用掉了。为了不产生冲突，官方的 CSS 变量就改用两根连词线了。

### var() 函数

上面定义了变量,现在就要来读取,var()函数用于读取变量。

```
a {
  color: var(--header-color);
}
```

var()函数还可以使用第二个参数，表示变量的默认值。如果该变量不存在，就会使用这个默认值。

`color: var(--header-color, #7F583F);`

第二个参数不处理内部的逗号或空格，都视作参数的一部分。

```
var(--pad, 10px 15px 20px);
```

var()函数还可以用在变量的声明。

```
body {
  --primary-color: red;
  --logo-text: var(--primary-color);
}
```

注意，变量值只能用作属性值，不能用作属性名。

```

.foo {
  --side: margin-top;
  /* 无效 */
  var(--side): 20px;
}
```

### 变量值的类型

如果变量值是一个字符串，可以与其他字符串拼接。

```
--bar: 'hello';
--foo: var(--bar)' world';
```

如果变量值是数值，不能与数值单位直接连用。

```
.foo {
  --gap: 20;
  /* 无效 */
  margin-top: var(--gap)px;
}
```

上面代码中，数值与单位直接写在一起，这是无效的。必须使用calc()函数，将它们连接。

```
.foo {
  --gap: 20;
  margin-top: calc(var(--gap) * 1px);
}
```

如果变量值带有单位，就不能写成字符串。

```
/* 无效 */
.foo {
  --foo: '20px';
  font-size: var(--foo);
}

/* 有效 */
.foo {
  --foo: 20px;
  font-size: var(--foo);
}
```

### 作用域

同一个 CSS 变量，可以在多个选择器内声明。读取的时候，优先级最高的声明生效。这与 CSS 的"层叠"（cascade）规则是一致的。

```
<style>
  :root { --color: blue; }
  div { --color: green; }
  #alert { --color: red; }
  * { color: var(--color); }
</style>

<p>蓝色</p>
<div>绿色</div>
<div id="alert">红色</div>
```

其他的都很好理解,优先级和以前的一样,唯一要注意的就是这个 `:root`,意思就是根元素,任何选择器都可以读取它们。

> 这里需要注意的是,在.vue文件中 :root读取不到,暂时没有找到原因,推荐.vue中还是使用scss

### 响应式布局

CSS 是动态的，页面的任何变化，都会导致采用的规则变化。

利用这个特点，可以在响应式布局的media命令里面声明变量，使得不同的屏幕宽度有不同的变量值。

```
body {
  --primary: #7F583F;
  --secondary: #F7EFD2;
}

a {
  color: var(--primary);
  text-decoration-color: var(--secondary);
}

@media screen and (min-width: 768px) {
  body {
    --primary:  #F7EFD2;
    --secondary: #7F583F;
  }
}
```

### 兼容性处理

对于不支持 CSS 变量的浏览器，可以采用下面的写法。

```
a {
  color: #7F583F;
  color: var(--primary);
}
```

也可以使用`@support`命令进行检测。

```
@supports ( (--a: 0)) {
  /* supported */
}

@supports ( not (--a: 0)) {
  /* not supported */
}
```

关于这个`@supports`,可能还有小伙伴不太明白,我再举一个简单的例子

`display: flex` 这个css3的弹性布局肯定都不陌生

但是有一些浏览器不兼容,我们应该怎么办?

在可以兼容的情况下这样写

```
@supports (display: flex) {
	div { display: flex; }
}
```

在不能兼容的情况下就用浮动布局

```
@supports not (display: flex) {
	div { float: left; } /* 替换样式 */
}
```

对多个CSS属性的检查可以通过‘or’和‘and’串联起来

```
/* and and or */
@supports ((display: -webkit-flex) or
          (display: -moz-flex) or
          (display: flex)) and (-webkit-appearance: caret) {
 
    /* use styles here */
}
```


### JavaScript 操作

JavaScript 也可以检测浏览器是否支持 CSS 变量。

```
const isSupported =
  window.CSS &&
  window.CSS.supports &&
  window.CSS.supports('--a', 0);

if (isSupported) {
  /* supported */
} else {
  /* not supported */
}
```

JavaScript 操作 CSS 变量的写法如下。

```
// 设置变量
document.body.style.setProperty('--primary', '#7F583F');

// 读取变量
document.body.style.getPropertyValue('--primary').trim();
// '#7F583F'

// 删除变量
document.body.style.removeProperty('--primary');
```

这意味着，JavaScript 可以将任意值存入样式表。下面是一个监听事件的例子，事件信息被存入 CSS 变量。

```
const docStyle = document.documentElement.style;

document.addEventListener('mousemove', (e) => {
  docStyle.setProperty('--mouse-x', e.clientX);
  docStyle.setProperty('--mouse-y', e.clientY);
});
```

那些对 CSS 无用的信息，也可以放入 CSS 变量。

```
--foo: if(x > 5) this.width = 10;
```

上面代码中，--foo的值在 CSS 里面是无效语句，但是可以被 JavaScript 读取。这意味着，可以把样式设置写在 CSS 变量中，让 JavaScript 读取。

所以，CSS 变量提供了 JavaScript 与 CSS 通信的一种途径。
