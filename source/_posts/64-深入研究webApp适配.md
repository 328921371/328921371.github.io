---
title: 深入研究webApp适配
categories:
  - 前端适配
tags:
  - 前端适配
  - scss
copyright: true
comments: true
abbrlink: 2461ded0
date: 2018-11-21 16:29:22
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 前面的博客我们有研究过webApp的页面适配以及sass的用法,已经知道怎么做了,我们就来讨论一下,为什么这么做
<!--more-->

首页,webApp的适配大致分为两种

* 宽度百分比,高度定死

* 宽高都是百分比

做法是各有好处,但是虽然页面越来越复杂,定高的设计已经不满足我们的需求了,所以宽高都是根据比例来动态适配的。之前也有谈过,大部分流行的还是Flexible来实现适配,那为什么UI稿给是750px按照iPhone6为基准呢?

首先先说一下为什么用750px,手机碎屏化越来越严重,如何兼容现在这么多分辨率的设备就是一个问题了,这时候iPhone6的实际分辨率750就被关注到,向上兼容和向下兼容都不会怎么失真,是一个比较完美的折中方案.

再来说说iPhone6明明宽度的像素是375,为什么UI稿是两倍的像素也就是750px.

这里就是对于像素的定义了,750px是iPhone6的物理像素，也叫屏幕分辨率,就是设备屏幕上的实际像素。也就是说这个手机被出厂造出来的时候，这个屏幕上有多少个像素点，他的物理像素就是多少.

而谷歌模拟器上的375像素叫做设备独立像素,也叫做逻辑像素,对于前端来说，和我们的css像素是一样的,在viewport为ideal-viewport模式时,如iPhone6此时的viewport为375px,也就是说,iPhone6的设备宽度和高度为375pt \* 667pt,可以理解为设备的独立像素,而其dpr为2，我们可以很轻松得知其物理像素为750pt \* 1334pt。所以设计师给我们的UI为750px.

在手淘的设计师和前端开发协作过程中：手淘设计师常选择iPhone6作为基准设计尺寸，交付给前端的设计尺寸是按750px * 1334px为准(高度会随着内容多少而改变)。前端开发人员通过一套适配规则自动适配到其他的尺寸。

![我是图片](http://www.w3cplus.com/sites/default/files/blogs/2015/1511/rem-6.jpg)


接下来说说在项目中的具体实现

### 手淘flexible

之前有讨论过sass,现在来看看sass与flexible怎么结合

首先先安装sass

> cnpm install node-sass –-save
  cnpm install sass-loader –-save

然后再之后在使用的时候声明一下 <style lang="scss"></style>

sass的功能我们都知道,有一个自定义函数的功能,我们可以通过这个,来使我们的px转化为rem

```
@function px2rem($px) {
  $rem : 75px;
  @return ($px / $rem) + rem;
}
```

将这个sass文件放在全局中,在每个样式中就可以直接px2rem(675px)去使用了,可是要怎么引入呢

首先安装一下插件

> cnpm install sass-resources-loader --save

在build文件下的utils.js中修改sass

```
return {
  css: generateLoaders(),
  postcss: generateLoaders(),
  less: generateLoaders('less'),
  sass: generateLoaders('sass', { indentedSyntax: true }),
  scss: generateLoaders('sass').concat(
  {
    loader: 'sass-resources-loader',
    options: {
      resources: path.resolve(__dirname, '../src/assets/style/index.scss')
    }
  }),
  stylus: generateLoaders('stylus'),
  styl: generateLoaders('stylus')
}
```

将自己的全局sass文件的文件替换一下

接下来就是安装 flexible

> cnpm install lib-flexible --save

在main.js中 导入就OK啦 import 'lib-flexible'

### VW来适配页面

接下来我们说说最近流行起来的vw适配页面

```
@function vw($px) {
  @return ($px / 750) * 100vw;
}
```

UI稿的比例是多少,就写多少,但是需要注意的是字体

假如 字体我们设置的是 font-size: 3vw; 意味着在一个屏幕宽度为320px的设备(移动)上，文本大小将为10px,这种字体明显太小了,而在1440px的笔记本屏幕上,字体又太大了,所以我们应该这样写

` font-size: calc(18px + 0.25vw) `

这样既不会让字体太小,也不会让字体太大,可是在 Mac上的Safari并不通用,可以换一种办法

` font-size: calc(112.5% + 0.5vw) `

我以为这样就可以了,就完成了页面适配,直到我今天看到了大漠老师的文章,豁然开朗  [戳我戳我](https://www.w3cplus.com/mobile/vw-layout-in-vue.html)

> 下回再说,先让我研究一下


好了，以上就是我对webApp适配的一些理解，如果文章由于我学识浅薄，导致您发现有严重谬误的地方，请一定在评论中指出，我会在第一时间修正我的博文，以避免误人子弟。