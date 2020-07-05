---
title: scss/sass的使用
categories:
  - scss
tags:
  - scss
copyright: true
comments: true
abbrlink: dd2285f
date: 2018-03-12 17:05:29
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 前端写样式总是一件很繁琐的事情，这时候，有人就开始为CSS加入编程元素，这被叫做"CSS预处理器"。它的基本思想是，用一种专门的编程语言，进行网页样式设计，然后再编译成正常的CSS文件。

<!--more-->

> 本篇参考了阮一峰老师的博客，感谢各位大神对代码的无私奉献

css预处理器也有很多版本，之前接触过less，感觉挺好用的，但是没有继续使用它，一方面觉得有点不适应，一方面是觉得还不满足自己对预处理器的需求，直到出了scss！

## 什么是scss

scss是sass3中的引入的新语法，相比较其他的，我个人更喜欢使用scss

## 安装scss

SASS是Ruby语言写的，但是两者的语法没有关系。不懂Ruby，照样使用。只是必须先[安装Ruby](http://www.ruby-lang.org/zh_cn/downloads/)，然后再安装SASS。

如果你已经安装好了Ruby，接着在命令行输入下面的命令：
> gem install sass

这样就安装好啦

## 基本用法

### 在html文件中使用

SASS文件就是普通的文本文件，里面可以直接使用CSS语法。文件后缀名是.scss，意思为Sassy CSS。

1. 下面的命令，可以在屏幕上显示.scss文件转化的css代码。要先cd到你要转化的scss的文件夹中（假设文件名为style。）

> sass style.scss

2. 如果要将显示结果保存成文件，后面再跟一个.css文件名。

> sass style.scss style.css

3. SASS提供四个编译风格的选项：

* nested：嵌套缩进的css代码，它是默认值。
* expanded：没有缩进的、扩展的css代码。
* compact：简洁格式的css代码。
* compressed：压缩后的css代码。

4. 生产环境当中，一般使用最后一个选项:

> sass --style compressed style.scss style.css

5. 可以让SASS监听某个文件或目录，一旦源文件有变动，就自动生成编译后的版本。

> sass --watch style.scss:style.css

### vue中使用sass

首先先安装sass

> npm install node-sass --save-dev
  npm install sass-loader --save-dev

之后在使用的时候声明一下

```
<style lang="scss"></style>
```

## 基本语法

语法的解释我就不按照文档的顺序来排列了，我把我个人觉的比较重要的，经常用到的，放在前面

### 嵌套属性

#### 标签支持嵌套

```
header {
  margin-top: 50px;
  nav {
    color: blue;
  }
}
```

#### 属性也支持嵌套,但是要加:

```
nav {
  background: {
    color: $header-color;
  };
}
```

### 嵌套代码中使用&

> 在嵌套的代码块内，可以使用&引用父元素。比如a:hover伪类

```
a {
  color: aqua;
  &:hover {
    color: antiquewhite;
  }
}
```

### 变量的用法

#### 所有变量以$开头

```
$header-color: red;
.header{
  color: $header-color;
}
```

#### 字符串中使用变量

如果变量需要镶嵌在字符串之中，就必须需要写在#{}之中。

```
$side: left;
.header {
  margin-#{$side}: 50px;
}
```

### 计算功能

/ 尽量把括号加上去

```
.hp-two-span {
  margin-#{$side}: (100px/2);
  padding-#{$side}: 25px + 25px;
  padding-top: 25px * 2;
}
```

### 代码的重用

#### 继承(@extend)

这是一个非常好用的方法，假如一个类想用另一个类的样式，就可以直接继承过来

```
.main-title {
  background: {
    color: aquamarine;
  };
}
```
main-text要继承main-title，就要使用@extend命令：
```
.main-text {
  @extend .main-title;
  color: darkorange;
}
```

#### 定义方法(Mixin)

使用@mixin命令，定义一个代码块。这个代码块可以重复使用,有点类似定义一个方法,可以传入参数

```
@mixin cart($vcolor,$vwidth) {
  display: inline-block;
  width: 25%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: {
    color: $vcolor;
  };
  border: $vwidth solid red;
}
```
使用的时候要@include
```
.main-ul {
  list-style: none;
  font-size: 0;
    li {
      font-size: 10px * 2;
      &:nth-of-type(1){
        @include cart(yellow,2px);
      }
    }
}
```

### 代码注释

#### 单行注释

```
// 单行注释，只保留在SASS源文件中，编译后被省略。
```
#### 多行注释

```
/* 标准的CSS注释,会保留到编译后的文件 */
```
#### 重要注释

```
/*! 后面加一个感叹号，表示这是"重要注释"。即使是压缩模式编译，也会保留这行注释，通常可以用于声明版权信息。 */
```

### 导入外部样式,这个和css一样

@import "react.css";

> 一定记得加分号

### 颜色函数

SASS提供了一些内置的颜色函数，以便生成系列颜色。

```
lighten(#cc3, 10%) // #d6d65c
darken(#cc3, 10%) // #a3a329
grayscale(#cc3) // #808080
complement(#cc3) // #33c
```

## 高级用法

### 条件语句

@if可以用来判断：
```
p {
  @if 1 + 1 == 2 { border: 1px solid; }
  @if 5 < 3 { border: 2px dotted; }
}
```
配套的还有@else命令：
```
@if lightness($color) > 30% {
　　background-color: #000;
} @else {
　　background-color: #fff;
}
```

### 循环语句

#### for循环

```
@for $i from 1 to 10 {
  .border-#{$i} {
    border: #{$i}px solid blue;
  }
}
```

#### while循环

```
$i: 6;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}
```

#### each命令，作用与for类似

```
@each $member in a, b, c, d {
  .#{$member} {
    background-image: url("/image/#{$member}.jpg");
  }
}
```

### 自定义函数

和之前的Mixin有点类似

```
@function double($n) {
  @return $n * 2;
}
#sidebar {
  width: double(5px);
}
```

差不多经常用的内容就是这些啦，还有一些零散的知识点没有用到，大家可以去SASS的官方去看看文档

好了，以上就是我对sass的一些理解，如果文章由于我学识浅薄，导致您发现有严重谬误的地方，请一定在评论中指出，我会在第一时间修正我的博文，以避免误人子弟。