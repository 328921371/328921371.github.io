---
title: Vue转PDF模糊问题
categories:
  - Vue
tags:
  - Vue
copyright: true
comments: true
abbrlink: ea8c32c0
date: 2019-12-09 10:48:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 很早之前就写了html转PDF的博客了,今天来说一下模糊的问题

<!--more-->

首先 先安装插件,然后引入

```
npm install --save html2canvas 
npm install jspdf --save

import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'

```

接下来的写法和html基本一样

```
PDF() {
  let title = this.titleName;
  let dom = document.querySelector('#printPage')
  
  let width = dom.offsetWidth
  let height = dom.offsetHeight
  
  let canvas = document.createElement("canvas")
  let scale = 2
  
  canvas.width = width * scale; //定义canvas 宽度 * 缩放
  canvas.height = height * scale ; //定义canvas高度 *缩放
  canvas.style.width = width * scale + "px";
  canvas.style.height = height * scale + "px";
  
  canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
  
  var opts = {
    //allowTaint: true, //允许污染
    taintTest: false, //在渲染前测试图片
    background: "#fff",
    scale: 1,
    canvas: canvas,
    width: width, //dom 原始宽度
    height: height,
    useCORS: true, // 【重要】开启跨域配置
    //logging: true, //日志开关，便于查看html2canvas的内部执行流程
  }
  
  html2Canvas(dom, opts).then((canvas)=> {
    
    var context = canvas.getContext('2d');
    // 【重要】关闭抗锯齿
    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;
    
    let contentWidth = canvas.width
    let contentHeight = canvas.height
    
    //未生成pdf的html页面高度
    let leftHeight = contentHeight
    //页面偏移
    let position = 0
    
    
    //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
    if(this.direction == '纵'){
      //一页pdf显示html页面生成的canvas高度;
      var pageHeight = contentWidth / 592.28 * 841.89
      var imgWidth = 595.28
      var imgHeight = 592.28 / contentWidth * contentHeight
      var pathAway = 'p'
    }else{
      var pageHeight = contentWidth / 841.89  * 592.28; // 横向
      var imgWidth = 841.89;  // 横向
      var imgHeight = 841.89/contentWidth * contentHeight; // 横向
      var pathAway = 'l'
    }
    
    let pageData = canvas.toDataURL('image/jpeg', 1.0)
    
    //p：纵向，l为横向 a4：纸张大小，默认是a4;
    let PDF = new JsPDF(pathAway, 'pt', 'a4')
    //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
    //当内容未超过pdf一页显示的范围，无需分页
    if (leftHeight < pageHeight) {
      PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
    } else {
      while (leftHeight > 0) {
        PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
        leftHeight -= pageHeight
        // position -= 841.89
        position -= 592.28 // 横向
        //避免添加空白页
        if (leftHeight > 0) {
          PDF.addPage()
        }
      }
    }
    PDF.save(title + '.pdf')
  })
}

```

将需要转化为PDF的内容设定一个id

对于模糊的问题,做法和大家一样,先扩大两倍,再缩小

还有设定就是横向打印还是纵向打印,这些都是看具体需求的

以上就是我对PDF模糊问题的一些理解，如果文章由于我学识浅薄，导致您发现有严重谬误的地方，请一定在评论中指出，我会在第一时间修正我的博文，以避免误人子弟。





