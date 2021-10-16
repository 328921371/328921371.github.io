---
title: Vue-cli的入门
categories:
  - vue-cli
tags:
  - vue-cli
copyright: true
comments: true
abbrlink: f3edbb6
date: 2017-10-02 11:22:25
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 在实际的项目开发中，大多都是使用vue的脚手架来搭好主体的框架，一起讨论一下吧

<!--more-->

有些小伙伴可能不了解什么是脚手架，vue的脚手架相当于帮你将项目的结构定义好，webpack的打包工具也帮你配置好，方便你写项目

在安装脚手架之前，要先安装好npm，可以在命令行输入npm -v 来检测时候安装了npm和npm的版本，这里我就不细讲了。

## 安装cli

首先，在命令行输入 npm install vue-cli -g 

>g :代表全局安装。如果你安装时报错，一般是网络问题，你可以尝试用cnpm来进行安装。安装完成后，可以用vue -V来进行查看 vue-cli的版本号。

## 初始化项目

输入 vue init webpack demo

>webpack 表示模板名称，vue-cli官方提供了5种模板：

1. webpack-一个全面的webpack+vue-loader的模板，功能包括热加载，linting,检测和CSS扩展。

2. webpack-simple-一个简单webpack+vue-loader的模板，不包含其他功能，让你快速的搭建vue的开发环境。

3. browserify-一个全面的Browserify+vueify 的模板，功能包括热加载，linting,单元检测。

4. browserify-simple-一个简单Browserify+vueify的模板，不包含其他功能，让你快速的搭建vue的开发环境。

5. simple-一个最简单的单页应用模板。

>demo是你给自己的项目取的名字

输入命令后，会询问我们几个简单的选项，我们根据自己的需要进行填写就可以了。

* Project name :项目名称 ，如果不需要更改直接回车就可以了。注意：这里不能使用大写
* Project description:项目描述，默认为A Vue.js project。
* Author：作者，如果你有配置git的作者，他会读取。
* Install  vue-router? 是否安装vue的路由插件。
* Use ESLint to lint your code? 是否用ESLint来限制你的代码错误和风格。最好是进行配置。
* setup unit tests with  Karma + Mocha? 是否需要安装单元测试工具Karma+Mocha。
* Setup e2e tests with Nightwatch?是否安装e2e来进行用户行为模拟测试。

都输入完成之后，cd到我们的项目中，npm install进行安装，安装完成后会提示你的域名和端口，在浏览器输入就好啦，vue-cli 2.9.1 之前的版本会自动打开浏览器

好了，以上就是我对vue-cli入门的一些理解，如果文章由于我学识浅薄，导致您发现有严重谬误的地方，请一定在评论中指出，我会在第一时间修正我的博文，以避免误人子弟。