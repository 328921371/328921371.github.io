---
title: hexo搭建个人博客
categories:
  - hexo
tags:
  - hexo
copyright: true
comments: true
abbrlink: 64e2e0e2
date: 2019-09-30 15:18:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 一直没有去介绍hexo,久而久之自己也有点忘记当初的步骤了,今天回顾以下其他大佬的文章,做一个记录

<!--more-->

网上关于Hexo的教程其实已经有挺多了,我也是选取了几篇文章,再结合自己的记忆,写下这边文章

首先先看看准备工作

### 搭建环境

1. 搭建Node.js

[node下载地址](https://nodejs.org/download/release/v8.9.4/)

`版本号需要改成自己想要的版本`

安装好了之后,cmd打开,`node -v` 看看有没有版本号

2. 配置Git环境

安装地址[戳我](https://git-scm.com/downloads),打开一路确定安装就可以了

安装好了之后,cmd打开,`git --version` 看看有没有版本号

3. gitHub账户的配置

注册一个gitHub,填写完邮箱之后要去邮件确认一下,不然没办法使用page服务

登陆之后，点击页面右上角的加号，选择New repository, 新建一个仓库

之后进入代码库创建页面：

在Repository name下填写yourname.github.io,这个yourname就是你想写什么写什么了

然后我们继续配置page服务,在Settings里面,向下滚动,有一个GitHub Pages,点击那个都是英文的按钮,Github会自动替你创建出一个pages的页面,你的yourname.github.io就可以正常访问了

除了gitHub,我们还可以部署在coding上,步骤也都是一样的

好了,开始正式的安装hexo

### 安装Hexo

创建一个文件夹,cd到这个文件夹里面,开始搭建脚手架

`npm install hexo-cli -g`

继续 `npm install hexo -g`

然后 `hexo -v`一下

看到下图的图片,就说明安装成功了

![版本图片](https://csblogimage.oss-cn-hangzhou.aliyuncs.com/103-hexo.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,size_16,text_Qnku6ZmI5YWI55Sf55qE5bCP5YmN56uv,color_FFFFFF,shadow_50,t_100,g_se,x_10,y_10)

### 初始化Hexo

既然安装好了脚手架,现在开始初始化一下

`hexo init` 之后再 `npm install`

感觉怎么和搭建vue-cli一样......

继续操作 `hexo g`

然后可以启动啦 `hexo s`,命令行会提示`INFO Hexo is running at http://0.0.0.0:4000/. Press Ctrl+C to stop.`

我们打开本地的`http://0.0.0.0:4000`就可以看到页面了

### hexo同步git

1. 设置Git的user name和email：(如果是第一次的话)

```
git config --global user.name "csing"
git config --global user.email "328911111@qq.com"
```

这里记得替换成自己的

2. 生成密钥

`ssh-keygen -t rsa -C "gdutxiaoxu@163.com"`

接着配置一下 Deployment

在_config.yml文件中，找到Deployment，然后按照如下修改：

```
deploy:
  type: git
  repo: git@github.com:yourname/yourname.github.io.git
  branch: master
```

repo 替换成自己的

### 创建md文件

cmd中输入命令 `hexo new post "text"`

在 `F:\blog\source\ _posts 将会看到 text.md`

用MarDown语法就可以开始写博客啦

然后就是发布了

发布之前先安装`npm install hexo-deployer-git --save`

然后直接`hexo clean && hexo g && hexo d` 意思就是清理,生成,部署

如果报错提示有`publickey`字眼,就是ssh公钥没有配置好了

### 配置Next主体

我的主体用的是Next,简约大方

在 Hexo 中有两份主要的配置文件，其名称都是 _config.yml。 其中，一份位于站点根目录下，主要包含 Hexo 本身的配置；另一份位于主题目录下，这份配置由主题作者提供，主要用于配置主题相关的选项。

为了描述方便，在以下说明中，将前者称为 站点配置文件， 后者称为 主题配置文件。

1. 下载next主题文件

```
cd 你的文件夹
git clone https://github.com/iissnan/hexo-theme-next themes/next
```

2. 启用主题

打开站点配置文件 ,修改 `theme: next`

3. 主题配置

```
# Schemes # 三种布局
#scheme: Muse
scheme: Mist
#scheme: Pisces
#scheme: Gemini
```

默认有三种布局方式,选择一种去掉#注释即可

4. 配置语言

站点配置文件 ,修改 `language: zh-Hans`,简体中文

5. 设置 菜单

```
menu: # 菜单栏设置
  home: / || home
  categories: /categories/ || th
  tags: /tags/ || tags
  archives: /archives/ || archive
  about: /about/ || user
  #schedule: /schedule/ || calendar
  #sitemap: /sitemap.xml || sitemap
  #commonweal: /404/ || heartbeat
```

因为默认是英文,如果有新增的,我们需要去配置文件改成相应的中文 打开`languages/zh-Hans.yml`

```
menu:
  home: 首页
  archives: 归档
  categories: 分类
  tags: 标签
  about: 关于
  search: 搜索
  schedule: 日程表
  sitemap: 站点地图
  commonweal: 公益404
```

至于菜单图标,可要可不要,看个人喜好

```
menu_icons: # 菜单项图标
  enable: true
  #KeyMapsToMenuItemKey: NameOfTheIconFromFontAwesome
  home: home
  about: user
  categories: th
  schedule: calendar
  tags: tags
  archives: archive
  sitemap: sitemap
  commonweal: heartbeat
```

需要注意的是,标签和分类的页面需要hexo生成

```
 hexo new page tags 生成标签页 路径
 hexo new page categories  生成分类页面
```

主题差不多介绍完了,更多的去我接下来的链接中找,接下来说说SEO的优化

### SEO优化

emmmm....我自己的博客在百度的SEO优化也不是很好,感觉并没有什么资格讲这个,等以后再说吧

### 记录一下hexo的命令

以下转载至[这里](https://segmentfault.com/a/1190000002632530)
想要看全部配置的[戳这里](https://blog.csdn.net/lemonxq/article/details/72676005)
优化next主题的[戳这里](https://www.jianshu.com/p/9f0e90cc32c2)

#### hexo

npm install hexo -g #安装  
npm update hexo -g #升级  
hexo init #初始化

#### 简写

hexo n "我的博客" == hexo new "我的博客" #新建文章
hexo p == hexo publish
hexo g == hexo generate#生成
hexo s == hexo server #启动服务预览
hexo d == hexo deploy#部署

#### 服务器

hexo server #Hexo 会监视文件变动并自动更新，您无须重启服务器。
hexo server -s #静态模式
hexo server -p 5000 #更改端口
hexo server -i 192.168.1.1 #自定义 IP

hexo clean #清除缓存 网页正常情况下可以忽略此条命令
hexo g #生成静态网页
hexo d #开始部署

#### 监视文件变动

hexo generate #使用 Hexo 生成静态文件快速而且简单
hexo generate --watch #监视文件变动

#### 完成后部署

两个命令的作用是相同的
hexo generate --deploy
hexo deploy --generate










