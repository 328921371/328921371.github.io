---
title: hexo 部署报错
categories:
  - hexo
tags:
  - hexo
copyright: true
comments: true
abbrlink: e12db8e8
date: 2018-03-15 08:56:29
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 今年的1月份还一切正常,二月份的时候,当我部署当github上时,发现报错了:fatal: could not read Username for 'GitHub'

<!--more-->

解决办法:

修改配置文件：

根目录下的_config.yml，修改deploy节点。

> 原来的配置为：

```
deploy:
  type: git
  repo: https://github.com/yourname/yourname.github.io.git
  branch: master
```

> 修改为如下：

```
deploy:
  type: git
  repo: https://yourname:yourpassword@github.com/yourname/yourname.github.io.git
  branch: master
```



好了，成功,如果不行,再去找找其他的解决办法把