---
title: Html5中的webApp适配
categories:
  - 前端适配
tags:
  - 前端适配
copyright: true
comments: true
abbrlink: c0002f78
date: 2018-02-14 14:10:22
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 适配一直都是前端比较重视的问题，今天主要是记录一下自己的学习过程

<!--more-->

之前总结过vue-cli中的适配问题，今天记录一下在html5中怎么使用

我们同样用到lib-flexible，可以[点击这里](https://codeload.github.com/amfe/lib-flexible/zip/master)下载相关文件。

在build文件夹中找到 flexible.css 和 flexible.js 导入进来

```
<link rel="stylesheet" href="css/flexible.css" />
<script src="js/flexible.js" charset="utf-8"></script>
```

也可以直接使用阿里CDN：

```
<script src="http://g.tbcdn.cn/mtb/lib-flexible/{{version}}/??flexible_css.js,flexible.js"></script>
```

这样就可以了使用lib-flexible，接下来就是如何换算px了，我的IDE用的是Hbuilder的，现在就简单的说一下怎么进行换算

一般是为某个项目单独设置的，我们找到项目，右键点击属性，打开代码助手设置，选中 启用px转rem提示，填写合适的 px转rem比例 和 rem小数点部分保留长度， 保存配置，记得勾选最上面的启用项目特定的配置。

好了，以上就是我对Html5的适配的一些理解，如果文章由于我学识浅薄，导致您发现有严重谬误的地方，请一定在评论中指出，我会在第一时间修正我的博文，以避免误人子弟。