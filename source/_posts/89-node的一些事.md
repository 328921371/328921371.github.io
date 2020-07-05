---
title: Node的一些事
categories:
  - Node
tags:
  - Node
copyright: true
comments: true
abbrlink: 790f2ac
date: 2019-09-08 13:12:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 作为一个前端切图仔,Node知识是一定要会的,稍后在做详细的介绍,这里记录一下Node经常会错的点

<!--more-->

写了这么多篇的博客,我好像还没有去更为详细的介绍Node用来做mark的假数据应该怎么写,只是在其他的博客中零零散散的提到一点,今天也先不写,以后有时间再写,今天记录一下Node的一些容易忘记的东西

首先在使用 electron-vue的时候,node版本不能大于12.x 的版本,需要回退版本,但是node的中文官网只能下载最新的版本,这里记录一下可以下载其他版本的官网

[node下载地址](https://nodejs.org/download/release/v8.9.4/)

`版本号需要改成自己想要的版本`

安装node的时候,如果是低版本下安装高版本,Node会直接覆盖掉,如果是高版本要回退到低版本,直接安装是会报错的

![Node报错图](https://img.mukewang.com/58881e4b000150c305000379.jpg)

这时候需要卸载Node,直接在.msi安装文件点击右键,再点击卸载就可以了

如果是MAC的电脑,可以去安装 n 来用作node的版本管理,window系统的就去安装nvm,因为要先卸载node,所以我也还没有试过

安装完之后,需要去配置环境变量

这里的环境配置主要配置的是npm安装的全局模块所在的路径,以及缓存cache的路径,之所以要配置,是因为以后在执行类似:npm install express [-g] 的安装语句时,会默认到C盘。所以我配置到D盘去

我安装在`D:\Program Files\nodejs`


所以在在我安装的文件夹【D:\Program Files\nodejs】下创建两个文件夹【node_global】及【node_cache】

创建完两个空文件夹之后，打开cmd命令窗口，输入

```
npm config set prefix "D:\Program Files\nodejs\node_global"
npm config set cache "D:\Program Files\nodejs\node_cache"
```
接下来设置环境变量，关闭cmd窗口，“我的电脑”-右键-“属性”-“高级系统设置”-“高级”-“环境变量”

进入环境变量对话框，在【系统变量】下新建【NODE_PATH】,输入【D:\Program Files\nodejs\node_global\node_modules】
将【用户变量】下的【Path】修改为【D:\Program Files\nodejs\node_global】

至此node安装好了,但是由于国内的比较慢,所以我们一般用淘宝镜像来弄

安装 `npm install -g cnpm --registry=https://registry.npm.taobao.org`

此篇只作为记录一下,以免以后要去百度....