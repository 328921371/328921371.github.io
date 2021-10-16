---
title: hexo使用Valine评论
categories:
  - hexo
tags:
  - hexo
copyright: true
comments: true
abbrlink: a6cca8b8
date: 2020-07-29 21:19:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 关于这个评论系统,前前后后换了三四个,今天又换了一个,哎,评论又要被清空了

<!--more-->

最早使用的是来必力的,还不错,就是有点卡顿,还需要登录,后来不知道怎么回事,用不来了,就换了一个 

之后就换成了畅言,也是一个不错的评论系统,但是会给博客塞一些广告,一气之下,又换了一个

换成了git官方的一个插件,gitalk,可以在git仓库中看到评论,但是也是需要git登录之后才可以评论

于是换成了现在的Valine

Valine用的是LeanCloud作为数据,所以我们需要先打开LeanCloud去注册LeanCloud并创建一个开发版应用（免费）

[戳我戳我,一键跳转](https://leancloud.cn/dashboard/applist.html#/apps)

之后在LeanCloud -> 存储 -> 创建Class -> 无限制的Class, class名称为：Comment

在LeanCloud-设置-把除数据存储其他选项都关闭。

然后再底下的安全域名中添加域名

之后在Next模板下的_config.yml搜索Valine进行填写appid和appkey

OK了,大功告成,就是这么简单,图我就不放出来了,相信大家都能找得到

感叹代码的进步,换评论系统一次比一次简单了,当初换个畅言评论,折腾了许久,又要备案,又要审核

哪里不懂的就在评论中提出来,我会不定时的看一看