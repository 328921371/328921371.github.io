---
title: github的部署
categories:
  - GitHub
tags:
  - GitHub
copyright: true
comments: true
abbrlink: '2926e007'
date: 2019-11-13 11:12:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> GitHub很早之前就已经写过了命令,但是有些小伙伴问我具体的流程,在这里做这记录

<!--more-->

1. 首先 进入Github首页，点击New repository新建一个项目,填写相应的数据就好了

2. 然后 Clone or dowload会出现一个地址，复制这个地址。(旧项目同理)

3. 把github上面的仓库克隆到本地,命令可以在之前的博客中找到

> git clone git@github.com:328921371/cs.git

4. 克隆后进入文件夹,当命令行那边的文件目录出现master

5. git add . （注：别忘记后面的）

6. git commit  -m  "提交信息" （注释）

7. git push -u origin master （将内容推送到远程仓库里，第一次要加-u,此步骤需要你输入帐号和密码）


到这里,代码就部署到github上面了,更多的操作命令搜索我之前的博客[戳这里](http://www.chensheng.group/2016/12/20/12-git的使用/)


以上就是我对github的一些理解，如果文章由于我学识浅薄，导致您发现有严重谬误的地方，请一定在评论中指出，我会在第一时间修正我的博文，以避免误人子弟。





