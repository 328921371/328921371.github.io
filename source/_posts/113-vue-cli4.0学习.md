---
title: vue-cli 4.0学习
categories:
  - vue-cli
tags:
  - vue-cli
copyright: true
comments: true
abbrlink: '82943414'
date: 2019-12-18 11:52:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 什么都不能阻挡我吐槽前端更新的速度了 ! ! !

<!--more-->

最近公司的项目终于到了空闲期，而闲不住的我终于打算研究一下Vue-cli 3了,本篇文章就是主要记录Vue-cli3.0 的搭建过程

### 升级本地环境

因为 vue-cli3.0 要 nodeJs ≧ 8.9（官方推荐 8.11.0+），所以我们先去升级一下Node

我安装的是 node8.12.0的版本,怎么安装node选择版本在我之前的博客有说

之后就可以升级vue-cli了

都说要把之前的卸载,其实不卸载也是可以的

直接安装

`npm install -g @vue/cli`

由于我的项目还有很多是vue-cli 2 的..所以我希望在vue-cli3的版本也可以使用它,再安装一个桥接工具插件

`npm install -g @vue/cli-init`

好了,输入 `vue -V` 查看版本

![版本号](https://csblogimage.oss-cn-hangzhou.aliyuncs.com/113-vue4.0.jpg?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,size_16,text_Qnku6ZmI5YWI55Sf55qE5bCP5YmN56uv,color_FFFFFF,shadow_50,t_100,g_se,x_10,y_10)

我草草草草草草... 最近只顾着看技术了，没发现10月16日官方已经宣布 vue-cli4.0 已经正式发布了! ! !

有没有搞错，我 vue-cli3.0 都还没用,已经升级到 4.0了,那就直接开始搞 vue-cli4.0 吧!

### 搭建项目

vue-cli3.0 以后项目创建的命令变成了下面这样

`vue create <Project Name> //文件名 不支持驼峰（含大写字母）`

动手开始输入

`vue create myapp`

emmmmm.......

怎么和网上的教程不一样,我怎么第一步就报错了

提示 Vue packages version mismatch 报错

上百度找一下原因..原来是vue版本不匹配,和`vue-template-compiler`的版本不同

看一下自己命令行里面的版本是多少,然后修改vue的版本

`npm install vue@2.6.10 --save -g` 就可以解决了

开始正式的创建项目

输入 `vue create myapp`

出现了两个选项

default 是使用默认配置

Manually select features 是自定义配置

选择第二个自己配置

我的自定义配置如下,配置一样,图片是网上找的

![https://img-blog.csdnimg.cn/20191025111842872.png](https://img-blog.csdnimg.cn/20191025111842872.png)

选择是否使用路由 history router，其实直白来说就是是否路径带 # 号，建议选择 N，否则服务器还要进行配置

![https://img-blog.csdnimg.cn/20191025112058459.png](https://img-blog.csdnimg.cn/20191025112058459.png)

css 的预处理器我选择的是 Sass/SCSS(with dart-sass) 。node-sass是自动编译实时的，dart-sass需要保存后才会生效

sass 官方目前主力推 dart-sass 最新的特性都会在这个上面先实现

![https://img-blog.csdnimg.cn/20191025112439146.png](https://img-blog.csdnimg.cn/20191025112439146.png)

选择 ESLint 代码校验规则，提供一个插件化的javascript代码检测工具，ESLint + Prettier 使用较多

![https://img-blog.csdnimg.cn/20191025112705635.png](https://img-blog.csdnimg.cn/20191025112705635.png)

然后选择什么时候进行代码校验，Lint on save 保存就检查，Lint and fix on commit   fix 或者 commit 的时候检查，建议第一个

![https://img-blog.csdnimg.cn/20191025112927950.png](https://img-blog.csdnimg.cn/20191025112927950.png)

下面就是如何存放配置了，In dedicated config files 存放到独立文件中，In package.json 存放到 package.json 中

本着项目结构简单的想法，我选择了第二个

![https://img-blog.csdnimg.cn/20191025113213668.png](https://img-blog.csdnimg.cn/20191025113213668.png)

最后就是是否保存本次的配置了，N 不记录，如果选择 Y 需要输入保存名字

![https://img-blog.csdnimg.cn/20191025113436834.png](https://img-blog.csdnimg.cn/20191025113436834.png)

然后就等待创建项目

创建好之后,就cd进入文件夹,`npm run serve`启动项目

> 这里有一个小黑科技,输入 vue ui 可以启动vue的启动图形化界面

### 配置

由于vue4.0取消了以前的那些配置文件,所以我们需要在根目录自己创建一个`vue.config.js`

配置项很多,可以去[官网](https://cli.vuejs.org/zh/config/#全局-cli-配置)看看,我这里就不再细说了,贴一个我自己的配置.


```
const path = require('path');

module.exports = {
  publicPath: './',
  // 输出文件目录,默认就是dist
  outputDir: process.env.NODE_ENV === "test" ? 'distTest' : 'distPro',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // 配置es-link true,'error'
  lintOnSave: true,
  css: {  // 一次配置，全局使用，这个scss 因为每个文件都要引入
    loaderOptions: {
      sass: {
        prependData: `@import "./src/assets/css/index.scss";`
      }
    }
  },
  // webpack-dev-server 相关配置
  devServer: {
    // 可以通过设置让浏览器 overlay 同时显示警告和错误：
    overlay: {
      warnings: false,
      errors: false
    },
    open: false,
    host: 'localhost',
    port: 8080,
    https: false,
    proxy: {
      '/mgr': {
        target: 'https://api.douban.com',
        ws: true,
        changeOrigin: true,
        pathRewrite:{
          '^/mgr': ''
        }
      }
    }
  },
  configureWebpack:{  // 覆盖webpack默认配置的都在这里
    resolve:{   // 配置解析别名
      alias:{
        '@': path.resolve(__dirname, './src')
      } 
    }
  }
}

```

> 启动的时候报错了,终于在查了很久之后发现这里的一个坑,就是在使用最新版本的sass-loader(version>=8.0.0)的时候 data 这个配置已经不再支持，这里是本次更新的issus(https://github.com/webpack-contrib/sass-loader/issues/760 ),而是使用 prependData 代替

以上就是我对vue-cli4.0的一些理解,如果文章由于我学识浅薄,导致您发现有严重谬误的地方,请一定在评论中指出,我会在第一时间修正我的博文,以避免误人子弟。





