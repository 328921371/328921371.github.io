---
title: hexo添加看板娘
categories:
  - hexo
tags:
  - hexo
copyright: true
comments: true
abbrlink: 761a011e
date: 2020-07-27 21:10:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 何如给我们的博客添加一个会说话的看板娘呢

<!--more-->

### 简易版

先安装插件

npm install --save hexo-helper-live2d

[看板娘模型选择](https://github.com/summerscar/live2dDemo)

选择一个看板娘的模型,继续下载 `npm install live2d-widget-model-z16 --save`

然后在根目录下的_config.yml下配置live2d

```
live2d:
  enable: true
  scriptFrom: local
  pluginRootPath: live2dw/
  pluginJsPath: lib/
  pluginModelPath: assets/
  tagMode: false
  debug: false
  model:
    use: live2d-widget-model-z16
    # live2d-widget-model-wanko
    # live2d-widget-model-z16
  display:
    position: left
    width: 150
    height: 300
  mobile:
    show: true
```

重新运行一下就好啦

### 豪华版

把之前的live2d卸载掉 `npm uninstall hexo-helper-live2d`

下载大神的配置[戳我戳我](https://github.com/stevenjoezhang/live2d-widget)

下载好之后,在主目录\themes\next\source目录下新建目录live2d-widget

然后修改autoload.js文件，将路径改为绝对路径

```
// 注意：live2d_path 参数应使用绝对路径
//const live2d_path = "https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/";
const live2d_path = "/live2d-widget/";
```

之后就是引入链接了

有一些主题,路径在`/themes/主题名字/layout/_partial/head.ejs`目录下
我的next主题,是在`/themes/next/layout/_layout.swing`目录下

添加

```
<script src="https://fastly.jsdelivr.net/npm/jquery/dist/jquery.min.js"></script>
<link rel="stylesheet" href="https://fastly.jsdelivr.net/npm/font-awesome/css/font-awesome.min.css"/>
<script src="/live2d-widget/autoload.js"></script>
```

想修改看板娘大小、位置、格式、文本内容等，可查看并修改 waifu-tips.js 、 waifu-tips.json 、waifu.css文件。

这样就有一个会说话,会换装的看板娘了,还可以召唤小飞机按空格键发射子弹