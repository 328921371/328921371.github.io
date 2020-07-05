---
title: Web Storage监听
categories:
  - javaScript
tags:
  - javaScript
copyright: true
comments: true
abbrlink: 84e9e844
date: 2018-12-20 16:03:24
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 项目中有一个需求，需要在两个页面进行传值操作并实时更新，想到了用Storage，原理就不解释了，直接上代码

<!--more-->

## 实时监听的页面

```
<!DOCTYPE html>
<html>

  <head>
    <meta charset="UTF-8">
    <title>利用storage事件实时监视Web Storage中的数据</title>
  </head>

  <body>
    <script type="text/javascript">
      //利用storage事件实时监视wev Storage中的数据
      window.addEventListener('storage', function(e) { //e只是一个传参
        console.log(e)
        //获取被修改的键值
        if(e.key == 'test') {
          //获取将要被添加内容的元素
          var output = document.getElementById('output');
          //将获取到的修改值在元素中输出
          output.innerHTML = '原有值：' + e.oldValue;
          output.innerHTML += '<br />新值:' + e.newValue;
          output.innerHTML += '<br />变动页面地址：' + e.url;

          //分别打印会发现内容一致
          console.log(e.storageArea);
          console.log(localStorage);
          //此行代码只在Chrome浏览器中有效
          console.log(e.storageArea === localStorage); //输出true

        }
      }, false);

    </script>
    <output id="output"></output>
  </body>

</html>
```

## 被监听的代码

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>用于修改localStorage 中数据的页面的代码</title>
  </head>

  <body>
    <span>请输入一些值：</span><input type="text" id="text1" />
    <button onclick="setLOcalStorage()">设置</button>
  </body>
  <script type="text/javascript">
    function setLOcalStorage() {
      localStorage.clear();
      //设置test键值下的内容等于input框中的内容
      localStorage.test = document.getElementById('text1').value;
    }
  </script>
</html>
```