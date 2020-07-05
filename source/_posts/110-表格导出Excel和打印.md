---
title: 表格导出Excel和打印
categories:
  - Vue
tags:
  - Vue
copyright: true
comments: true
abbrlink: 162b9df0
date: 2019-12-09 11:34:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 上一篇说到了转PDF格式,今天说一下表格的打印和导出

<!--more-->

先说一下导出到Excel

首先安装相关依赖 `npm install --save xlsx file-saver`

然后导入

```
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
```

可以开始使用了

```
daochu() {
  let name = this.titleName + '.xlsx'
  var xlsxParam = { raw: true };//转换成excel时，使用原始的格式
  /* generate workbook object from table */
  var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'),xlsxParam)
  /* get binary string as output */
  var wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'array'
  })
  try {
    FileSaver.saveAs(new Blob([wbout], {
      type: 'application/octet-stream;charset=utf-8'
    }), name)
  } catch (e) {
    if (typeof console !== 'undefined') console.log(e, wbout)
  }
  return wbout
},
```

将需要导出的table表格设置一个id就可以了


再来看看打印,打印就比较简单了

在main.js中导入

```
// 打印插件
import MyPlugin from '@/util/print.js'
Vue.use(MyPlugin)
```

`print.js`的源码如下

```
// 打印类属性、方法定义
/* eslint-disable */
const Print = function(dom, options) {
  if (!(this instanceof Print)) return new Print(dom, options);

  this.options = this.extend({
    'noPrint': '.no-print'
  }, options);

  if ((typeof dom) === "string") {
    this.dom = document.querySelector(dom);
  } else {
    this.isDOM(dom)
    this.dom = this.isDOM(dom) ? dom : dom.$el;
  }

  this.init();
};
Print.prototype = {
  init: function() {
    var content = this.getStyle() + this.getHtml();
    this.writeIframe(content);
  },
  extend: function(obj, obj2) {
    for (var k in obj2) {
      obj[k] = obj2[k];
    }
    return obj;
  },

  getStyle: function() {
    var str = "",
      styles = document.querySelectorAll('style,link');
    for (var i = 0; i < styles.length; i++) {
      str += styles[i].outerHTML;
    }
    str += "<style>" + (this.options.notPrint ? this.options.notPrint : '.no-print') + "{display:none;}</style>";
     
    return str;
  },

  getHtml: function() {
    var inputs = document.querySelectorAll('input');
    var textareas = document.querySelectorAll('textarea');
    var selects = document.querySelectorAll('select');
    var canvass = document.querySelectorAll('canvas');
    for (var k = 0; k < inputs.length; k++) {
      if (inputs[k].type == "checkbox" || inputs[k].type == "radio") {
        if (inputs[k].checked == true) {
          inputs[k].setAttribute('checked', "checked")
        } else {
          inputs[k].removeAttribute('checked')
        }
      } else if (inputs[k].type == "text") {
        inputs[k].setAttribute('value', inputs[k].value)
      } else {
        inputs[k].setAttribute('value', inputs[k].value)
      }
    }

    for (var k2 = 0; k2 < textareas.length; k2++) {
      if (textareas[k2].type == 'textarea') {
        textareas[k2].innerHTML = textareas[k2].value
      }
    }

    for (var k3 = 0; k3 < selects.length; k3++) {
      if (selects[k3].type == 'select-one') {
        var child = selects[k3].children;
        for (var i in child) {
          if (child[i].tagName == 'OPTION') {
            if (child[i].selected == true) {
              child[i].setAttribute('selected', "selected")
            } else {
              child[i].removeAttribute('selected')
            }
          }
        }
      }
    }
    //canvass echars图表转为图片
    for (var k4 = 0; k4 < canvass.length; k4++) {
      var imageURL = canvass[k4].toDataURL("image/png");
      var img = document.createElement("img");
      img.src = imageURL;
      img.setAttribute('style', 'max-width: 100%;');
      img.className = 'isNeedRemove'
      // canvass[k4].style.display = 'none'
      // canvass[k4].parentNode.style.width = '100%'
      // canvass[k4].parentNode.style.textAlign = 'center'
      canvass[k4].parentNode.insertBefore(img, canvass[k4].nextElementSibling);
    }
    //做分页
    //style="page-break-after: always"
//     var pages = document.querySelectorAll('.result');
//     for (var k5 = 0; k5 < pages.length; k5++) {
//       pages[k5].setAttribute('style', 'page-break-after: always');
//     }
    return this.dom.outerHTML;
  },

  writeIframe: function(content) {
    var w, doc, iframe = document.createElement('iframe'),
      f = document.body.appendChild(iframe);
    iframe.id = "myIframe";
    iframe.style = "position:absolute;width:0;height:0;top:-10px;left:-10px;";
    
    // 判断是否需要chart
    if(document.querySelector('.myChart') !== null){
      iframe.setAttribute('style', 'position:absolute;width:' + document.querySelector('.myChart').clientWidth + 'px;height:0;top:-10px;left:-10px;');
    }
    
    w = f.contentWindow || f.contentDocument;
    doc = f.contentDocument || f.contentWindow.document;
    doc.open();
    doc.write(content);
    doc.close();

    var removes = document.querySelectorAll('.isNeedRemove');
    for (var k = 0; k < removes.length; k++) {
      removes[k].parentNode.removeChild(removes[k]);
    }

    var _this = this
    iframe.onload = function() {
      _this.toPrint(w);
      setTimeout(function() {
        document.body.removeChild(iframe)
      }, 100)
    }
  },

  toPrint: function(frameWindow) {
    try {
      setTimeout(function() {
        frameWindow.focus();
        try {
          if (!frameWindow.document.execCommand('print', false, null)) {
            frameWindow.print();
          }
        } catch (e) {
          frameWindow.print();
        }
        frameWindow.close();
      }, 10);
    } catch (err) {
      console.log('err', err);
    }
  },
  isDOM: (typeof HTMLElement === 'object') ?
    function(obj) {
      return obj instanceof HTMLElement;
    } : function(obj) {
      return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
    }
};
const MyPlugin = {}
MyPlugin.install = function(Vue, options) {
  // 4. 添加实例方法
  Vue.prototype.$print = Print
}
export default MyPlugin
```

在页面中使用的时候,将需要打印的div设置一个id就可以了

```
//打印页面内容
printContent() {
  this.$print(document.querySelector('#printPage'))
},
```



以上就是我对导出和打印的一些理解，如果文章由于我学识浅薄，导致您发现有严重谬误的地方，请一定在评论中指出，我会在第一时间修正我的博文，以避免误人子弟。





