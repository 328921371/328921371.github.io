---
title: Html转PDF
categories:
  - javaScript
tags:
  - javaScript
copyright: true
comments: true
abbrlink: b6bb9de3
date: 2018-11-29 11:12:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 有时候,我们需要将html转化为pdf,在此记录一下

<!--more-->

用到了两个插件 html2canvas与 jspdf,重要的策略就是讲html转化为图片,再将图片转化为pdf

其他的没有了,我也是在网上找的例子

```
<!DOCTYPE html>
<html>

  <head>
    <title>转PDF</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">

    <!-- .pdf文件下载  download -->
    <script src="https://cdn.bootcss.com/html2canvas/0.5.0-beta4/html2canvas.js"></script>
    <script src="https://cdn.bootcss.com/jspdf/1.3.4/jspdf.debug.js"></script>
    <!-- jQuery 2.2.3 -->
    <script src="/plugins/jQuery/jquery-2.2.3.min.js"></script>
    <style type="text/css">
      #pdfDom{
        text-align: center;
        border: 1px solid blue;
      }
    </style>
  </head>

  <body>
    <div class="right-aside" id="pdfDom" class="right-aside">
      <div>点击下面的按钮，内容将会被导出为pdf.</div>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="MyFilter" filterUnits="userSpaceOnUse" x="0" y="0" width="200" height="120">
            <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur"></feGaussianBlur>
            <feOffset in="blur" dx="4" dy="4" result="offsetBlur"></feOffset>
            <feSpecularLighting in="blur" surfaceScale="5" specularConstant=".75" specularExponent="20" lighting-color="#bbbbbb" result="specOut">
              <fePointLight x="-5000" y="-10000" z="20000"></fePointLight>
            </feSpecularLighting>
            <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut"></feComposite>
            <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint"></feComposite>
            <feMerge>
              <feMergeNode in="offsetBlur"></feMergeNode>
              <feMergeNode in="litPaint"></feMergeNode>
            </feMerge>
          </filter>
        </defs>
        <rect x="1" y="1" width="198" height="118" fill="#cccccc"></rect>
        <g filter="url(#MyFilter)">
          <path fill="none" stroke="#D90000" stroke-width="10" d="M50,90 C0,90 0,30 50,30 L150,30 C200,30 200,90 150,90 z"></path>
          <text fill="#FFFFFF" stroke="black" font-size="45" font-family="Verdana" x="52" y="76">SVG</text>
        </g>
      </svg>
    </div>
    <button onclick="makeMpdf('测试')">导出PDF文件</button>
  </body>
  <script type="text/javascript">
    //将html页面导出.pdf格式文件(适用于jQuery、vue库)  -- cs 2018/11/28
    function makeMpdf(pdfName) {
      if(confirm("您确认下载该PDF文件吗?")) {
        var target = document.getElementsByClassName("right-aside")[0];
        target.style.background = "#FFFFFF";
        if(pdfName == '' || pdfName == undefined) pdfName = getNowFormatDate();

        html2canvas(target, {
          onrendered: function(canvas) {
            var contentWidth = canvas.width;
            var contentHeight = canvas.height;

            //一页pdf显示html页面生成的canvas高度;
            var pageHeight = contentWidth / 592.28 * 841.89;
            //未生成pdf的html页面高度
            var leftHeight = contentHeight;
            //页面偏移
            var position = 0;
            //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
            var imgWidth = 595.28;
            var imgHeight = 592.28 / contentWidth * contentHeight;

            var pageData = canvas.toDataURL('image/jpeg', 1.0);
            //p：横向，a4：纸张大小，默认是a4;
            var pdf = new jsPDF('', 'pt', 'a4');

            //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
            //当内容未超过pdf一页显示的范围，无需分页
            if(leftHeight < pageHeight) {
              pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
            } else {
              while(leftHeight > 0) {
                pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                leftHeight -= pageHeight;
                position -= 841.89;
                //避免添加空白页
                if(leftHeight > 0) {
                  pdf.addPage();
                }
              }
            }
            pdf.save(pdfName + ".pdf");
          }
        })
      }
    }
  </script>

</html>
```


以上就是我对Html转PDF的一些理解，如果文章由于我学识浅薄，导致您发现有严重谬误的地方，请一定在评论中指出，我会在第一时间修正我的博文，以避免误人子弟。