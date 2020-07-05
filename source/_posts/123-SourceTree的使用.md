---
title: SourceTree的使用
categories:
  - GitHub
tags:
  - GitHub
copyright: true
comments: true
abbrlink: 6f1edaa3
date: 2020-05-01 10:00:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 之前介绍了git命令行操作,今天介绍一下git的可视化工具SourceTree的操作

<!--more-->

### 安装

先去官网下载一下[戳我戳我](https://www.sourcetreeapp.com)

之后直接开始安装,安装的时候需要一个Bitbucket的账号,安装他的步骤一步步注册就行,这里就不强调了

### clone

安装成功之后,我们就可以打开clone页面了,可以选择一个地址进行clone,假设这个地址是正确的,就会有提示

![SourceTree页面](https://csblogimage.oss-cn-hangzhou.aliyuncs.com/123-1-SourceTree.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,size_16,text_Qnku6ZmI5YWI55Sf55qE5bCP5YmN56uv,color_FFFFFF,shadow_50,t_100,g_se,x_10,y_10)

选择一个文件夹开始clone

成功clone下来后,当前默认实在master主分支上,显示这个页面,并且可以显示这个项目之前的流程节点

![SourceTree历史记录页面](https://csblogimage.oss-cn-hangzhou.aliyuncs.com/123-2-SourceTree.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,size_16,text_Qnku6ZmI5YWI55Sf55qE5bCP5YmN56uv,color_FFFFFF,shadow_50,t_100,g_se,x_10,y_10)

### 新建分支

项目clone下来后,就可以开始敲代码了,但是,最好不要直接在主分支上修改代码,我们应该新建一个分支去写代码

现在来看看如何在SourceTree页面上新建分支

点击上面的分支按钮,就会弹出这样的界面

![SourceTree新建分支](https://csblogimage.oss-cn-hangzhou.aliyuncs.com/123-3-SourceTree.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,size_16,text_Qnku6ZmI5YWI55Sf55qE5bCP5YmN56uv,color_FFFFFF,shadow_50,t_100,g_se,x_10,y_10)

点击创建分支,当分支新建好之后,会自动帮我们切换到我们刚刚新建的分支上,这时候我们就可以开始写代码了

### 提交

现在我们开始写代码了,比如我新增一个A.txt文件,随便写一点东西

![SourceTree新](https://csblogimage.oss-cn-hangzhou.aliyuncs.com/123-4-SourceTree.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,size_16,text_Qnku6ZmI5YWI55Sf55qE5bCP5YmN56uv,color_FFFFFF,shadow_50,t_100,g_se,x_10,y_10)

这时候我写的内容,还只是在本地的工作区中,我们需要提交并推送到远程的分支上

![SourceTree新](https://csblogimage.oss-cn-hangzhou.aliyuncs.com/123-5-SourceTree.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,size_16,text_Qnku6ZmI5YWI55Sf55qE5bCP5YmN56uv,color_FFFFFF,shadow_50,t_100,g_se,x_10,y_10)

先点击上方的提交按钮,告诉SourceTree我们准备提交了,然后将工作区中有修改的文件全部暂存,在下方写好我们这次提交的内容,就可以点击提交了

### 推送

现在,我们需要把已经提交好的推送到远程分支上,点击上方的推送按钮

![SourceTree新](https://csblogimage.oss-cn-hangzhou.aliyuncs.com/123-6-SourceTree.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,size_16,text_Qnku6ZmI5YWI55Sf55qE5bCP5YmN56uv,color_FFFFFF,shadow_50,t_100,g_se,x_10,y_10)

由于是第一次推送到远程分支上,所以SourceTree并没有给你一个你需要推送的提示,如果是后续的话,当你提交成功后,他就会提示你需要推送了

### 获取他人上传的代码

假如我们要看看其他人的代码呢,我们先将上面的步骤重复一遍,模拟一个B

现在B也推送了他自己的分支,叫B_dev,我们首先点击上方获取的按钮

![SourceTree新](https://csblogimage.oss-cn-hangzhou.aliyuncs.com/123-7-SourceTree.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,size_16,text_Qnku6ZmI5YWI55Sf55qE5bCP5YmN56uv,color_FFFFFF,shadow_50,t_100,g_se,x_10,y_10)

可以看到,当前我们看到的远程分支中并没有B_dev,现在我们点击一下确定,将所有的远程分支获取下来

![SourceTree新](https://csblogimage.oss-cn-hangzhou.aliyuncs.com/123-8-SourceTree.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,size_16,text_Qnku6ZmI5YWI55Sf55qE5bCP5YmN56uv,color_FFFFFF,shadow_50,t_100,g_se,x_10,y_10)

我们看到已经有B_dev分支了,点击右键,检出到本地分支中

这时候你们可以自己切换两个分支,看看文件的变化

### 合并

假设这时候A的代码写完了,需要合并到主分支,应该怎么操作呢

我们先切换到master主分支上,右键cs_dev,选择合并到当前分支就可以了

![SourceTree新](https://csblogimage.oss-cn-hangzhou.aliyuncs.com/123-9-SourceTree.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,size_16,text_Qnku6ZmI5YWI55Sf55qE5bCP5YmN56uv,color_FFFFFF,shadow_50,t_100,g_se,x_10,y_10)

### 解决冲突

假设A和B都已经获取到master上最新的代码了,两个人都有A,B 两个文件了,于是他们同时修改了A文件,一个全是写AAA,一个全是写BBB

当A推送之后当然没有冲突,可是当B提交的时候,需要先拉取A提交的代码,这时候,就发生冲突了

![SourceTree新](https://csblogimage.oss-cn-hangzhou.aliyuncs.com/123-10-SourceTree.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,size_16,text_Qnku6ZmI5YWI55Sf55qE5bCP5YmN56uv,color_FFFFFF,shadow_50,t_100,g_se,x_10,y_10)

有冲突我们就解决对吧,右键点击冲突的文件,选择一个进行修改


到这里,SourceTree的使用就差不多了,至于上面的Git工作流,有兴趣可以先研究一下,我下次再一起分享

以上就是我对SourceTree的一些理解,如果文章由于我学识浅薄,导致您发现有严重谬误的地方,请一定在评论中指出,我会在第一时间修正我的博文,以避免误人子弟。
