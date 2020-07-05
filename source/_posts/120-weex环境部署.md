---
title: weex环境部署
categories:
  - weex
tags:
  - weex
copyright: true
comments: true
abbrlink: a091b1f6
date: 2020-01-30 10:17:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 在家无聊,打算把跨端的Flutter,RN和weex都看一遍,记录一下weex

<!--more-->

配置环境是一件很麻烦的事情,我安装了两三个小时,可能是网速或者没有翻墙的问题

### node，npm，git

需要安装的 node，npm，git,这个三个我就不说了,一般的前端都安装好了,没有安装的去我之前的博客搜一下就有

### java环境

安装java环境 下载地址：http://www.java.com/zh_CN/

### weex-toolkit

安装weex-toolkit  npm install weex-toolkit -g   检查一下weex -v

安装 webpack npm install webpack -g 检查一下 webpack -v

安装前先检查一下，如果有的话就不用安装了 

### android-studio

安装 android-studio 记住那个sdk的路径，默认安装在 

C:\Users\CS\AppData\Local\Android\Sdk

### 配置环境变量

配置环境变量：打开环境变量路径：控制面板->系统和安全->系统->高级系统设置->环境变量。

新建：ANDROID_HOME 并把我们刚才赋值的sdk路径作为值插入。

添加platform-tools和tools到path下

AndroidStudio配置：在AndroidStudio的欢迎界面，你需要点击右下方的Configure进行老版本的SDK tool配置，

步骤：Configure->SDKManager->SDK Tools->勾选show Package Details ->勾选23.0.2

然后进入安装。

### 初始化构建weex项目

初始化构建项目 weex create helloWeex，一路自己选择，和vue-cli差不多

添加Android应用支持： weex platform add android

### AVD虚拟机

AVD虚拟机的安装： 菜单栏上有一个 AVD，鼠标悬停显示，找一找，然后点击Create Virtual Device

选择一个适合的分辨率，推荐480*800的 不会太大，然后选一个安卓版本下载，下载后选择安装完成，安装完成后点击运行就可以了


到这里,weex环境搭建,weex与android-studio创建联系,都已经完成了




