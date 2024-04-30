---
title: uni-app分包
categories:
  - uniApp
tags:
  - uniApp
copyright: true
comments: true
abbrlink: 5936e8a4
date: 2022-10-01 13:14:23
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 不知不觉又是一个国庆了，记录一下uni-app分包的学习过程

<!--more-->

不知道大家是不是都有遇到过，当微信小程序准备发布的时候，结果提示超过了2M的限制，于是赶紧开始优化代码，实在是令人头痛，现在，我们就使用分包来解决这个事情

首先先来看看分包有哪些限制

### 大小限制

* 微信小程序每个分包的大小是2M，总体积一共不能超过20M。
* 百度小程序每个分包的大小是2M，总体积一共不能超过8M。
* 支付宝小程序每个分包的大小是2M，总体积一共不能超过8M。
* QQ小程序每个分包的大小是2M，总体积一共不能超过24M。
* 字节小程序每个分包的大小是2M，总体积一共不能超过16M（字节小程序基础库 1.88.0 及以上版本开始支持，字节小程序开发者工具请使用大于等于 2.0.6 且小于 3.0.0 的版本）

这里我们以微信小程序为例

### 打包原则

* 声明 subpackages 后，将按 subpackages 配置路径进行打包，subpackages 配置路径外的目录将被打包到主包中
* 主包也可以有自己的 pages，即最外层的 pages 字段。
* subpackage 的根目录不能是另外一个 subpackage 内的子目录
* tabBar 页面必须在主包内

> pages里定义的是 主包的路径，subPackages里定义的是 分包的路径

### 引用原则

packageA 无法 require packageB JS 文件，但可以 require 主包、packageA 内的 JS 文件
packageA 无法 import packageB 的 template，但可以 require 主包、packageA 内的 template
packageA 无法使用 packageB 的资源，但可以使用主包、packageA 内的资源

> 简单的来说，分包只能使用或引用分包自身的内容

### 项目配置 

先贴个图看看我的demo目录是什么样的 

![uni-app分包结构](https://csblogimage.oss-cn-hangzhou.aliyuncs.com/160-%E5%88%86%E5%8C%85%E6%A8%A1%E6%9D%BF.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,size_16,text_Qnku6ZmI5YWI55Sf55qE5bCP5YmN56uv,color_FFFFFF,shadow_50,t_100,g_se,x_10,y_10)

大体上我们了四个文件夹(pages, pagesActivity,pangesIndex,pagesMember)，这个主要是看项目需要，这里只是一个demo

其中，pages就是作为我们的主包，里面的内容存放的是 tabBar 的页面，其他三个就是分包的内容，可以理解为子页面的存放

各种的子包文件中，可以创建一个static用于存放静态文件，毕竟每个子包的资源是不共享的

再看看pages.json是怎么写的

```
{
  "easycom": {
    "^u-(.*)": "@/uview-ui/components/u-$1/u-$1.vue"
  },
  "pages": [{
    "path": "pages/index/index",
    "style": {
      "navigationBarTitleText": "首页",
      "enablePullDownRefresh": false
    }
  }, {
    "path": "pages/member/member",
    "style": {
      "navigationBarTitleText": "商户",
      "enablePullDownRefresh": false
    }
  }, {
    "path": "pages/activity/activity",
    "style": {
      "navigationBarTitleText": "活动",
      "enablePullDownRefresh": false
    }
  }],
  // 分包加载配置 root-子包的根目录   pages-页面路径 name-分包别名 independent-是否为独立分包 最后两个属性用的比较少
  "subPackages": [{
    "root": "pagesIndex",
    "pages": [{
      "path": "indexChild/indexChild",
      "style": {}
    }]
  }, {
    "root": "pagesMember",
    "pages": [{
      "path": "memberChild/memberChild",
      "style": {}
    }]
  }, {
    "root": "pagesActivity",
    "pages": [{
      "path": "games/card/card",
      "style": {}
    }]
  }],
  // 分包预加载配置  对象中的key-页面路径 packages-预下载的root名  network-在什么指定网络环境下可以预加载，all是所有网络，wifi是wifi网络
  "preloadRule": {
    "pages/index/index": {
      "network": "all",
      "packages": ["pagesIndex"]
    },
    "pages/member/member": {
      "network": "all",
      "packages": ["pagesMember"]
    },
    "pages/activity/activity": {
      "network": "all",
      "packages": ["pagesActivity"]
    }
  },
  "globalStyle": {
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "uni-app",
    "navigationBarBackgroundColor": "#ffffff",
    "backgroundColor": "#F8F8F8"
  },
  "tabBar": {
    "color": "#666666",
    "selectedColor": "#f01022",
    "borderStyle": "white",
    "backgroundColor": "#ffffff",
    "list": [{"pagePath":"pages/index/index","iconPath":"static/tab/tab-member.png","selectedIconPath":"static/tab/tab-member-current.png","text":"我的"},{"pagePath":"pages/member/member","iconPath":"static/tab/tab-member.png","selectedIconPath":"static/tab/tab-member-current.png","text":"商户"},{"pagePath":"pages/activity/activity","iconPath":"static/tab/tab-member.png","selectedIconPath":"static/tab/tab-member-current.png","text":"活动"}]
  }
}

```

可以看到， subPackages 的配置就是用来配置分包文件的路由的，注释也都在代码里面

> 到这里，分包就已经搭建完了，大家的项目结构如何和我的不同，也没有关系，有一些文件是其他的配置，不必在意

如果分包完之后，主包还是大，只需要3步

1. 在manifest.json里源码视图的mp-weixin加上   "optimization":{"subPackages":true}

2. 在编译器里勾选运行时压缩代码

3. 上传代码时压缩css

然后重新运行一下项目即可

以上就是我对uni-app分包的一些理解,如果文章由于我学识浅薄,导致您发现有严重谬误的地方,请一定在评论中指出,我会在第一时间修正我的博文,以避免误人子弟。

