---
title: html带拼音的标签
categories:
  - javaScript
tags:
  - javaScript
copyright: true
comments: true
abbrlink: 496c8a17
date: 2019-09-25 16:47:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 偶然逛知乎的时候看到的一个平时都注意不到的标签ruby

<!--more-->

用户也很简单

`<ruby>拼音<rt>pinyin</rt></ruby>`

![图](https://pic1.zhimg.com/80/v2-7392e83d29724f7313f3117a1aeaf834_hd.jpg)

就是文字上分的拼音要自己打,可是这样没有音标

于是用搜狗输入法，输入带声调的字母(软键盘中选择拼音字母)

`<ruby>拼音<rt>pīngyīng</rt></ruby>`

> ruby支持大多数新版浏览器

需要注意的是,拼音的长度不固定,所以可能和文字对不齐,可以这样

```
<ruby>拼<rt>pīng</rt></ruby>
<ruby>音<rt>yīng</rt></ruby>
```

功能很简单,可能项目中也不一定用得到,但是很有趣,做一个小小的记录