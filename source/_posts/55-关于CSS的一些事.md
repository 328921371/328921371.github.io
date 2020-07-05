---
title: 关于CSS的一些事(一)
categories:
  - CSS
tags:
  - CSS
copyright: true
comments: true
abbrlink: 523dd94e
date: 2018-02-24 14:19:22
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 今天来聊一聊CSS

<!--more-->

我的博客始终没有讲到css,不是因为它不重要,而是太杂了,知识点零碎的太多了,今天说一些容易混淆的知识点

### display:none 和 visibility:hidden的区别？

display:none  隐藏对应的元素，在文档布局中不再给它分配空间，它各边的元素会合拢，就当他从来不存在。

visibility:hidden  隐藏对应的元素，但是在文档布局中仍保留原来的空间。

需要注意一点,绑定元素监听的时候,display:none是可以监听到的,在vue中,v-show就是动态切换display属性,所以需要监听的元素不要使用v-if

### CSS中 link 和@import 的区别是？

1. link属于HTML标签，而@import是CSS提供的; 
2. 页面被加载的时，link会同时被加载，而@import引用的CSS会等到页面被加载完再加载;
3. import只在IE5以上才能识别，而link是HTML标签，无兼容问题; 
4. link方式的样式的权重 高于@import的权重.

### position:absolute和float属性的异同

A：共同点：
对内联元素设置`float`和`absolute`属性，可以让元素脱离文档流，并且可以设置其宽高。

B：不同点：
float仍会占据位置，position会覆盖文档流中的其他元素。

### box-sizing属性

box-sizing属性主要用来控制元素的盒模型的解析模式。默认值是content-box。

content-box：让元素维持W3C的标准盒模型。元素的宽度/高度由border + padding + content的宽度/高度决定，设置width/height属性指的是content部分的宽/高

border-box：让元素维持IE传统盒模型（IE6以下版本和IE6~7的怪异模式）。设置width/height属性指的是border + padding + content

标准浏览器下，按照W3C规范对盒模型解析，一旦修改了元素的边框或内距，就会影响元素的盒子尺寸，就不得不重新计算元素的盒子尺寸，从而影响整个页面的布局。

### CSS 选择符有哪些？哪些属性可以继承？优先级算法如何计算？ CSS3新增伪类有那些？

1. id选择器（ # myid）
2. 类选择器（.myclassname）
3. 标签选择器（div, h1, p）
4. 相邻选择器（h1 + p）
5. 子选择器（ul > li）
6. 后代选择器（li a）
7. 通配符选择器（ * ）
8. 属性选择器（a[rel = "external"]）
9. 伪类选择器（a: hover, li:nth-child）

> 哪些属性可以继承

* 可继承的样式： font-size font-family color, text-indent;

* 不可继承的样式：border padding margin width height ;

* 优先级就近原则，同权重情况下样式定义最近者为准;

* 载入样式以最后载入的定位为准;

> 优先级

!important > 内联 > id > class > tag  

> CSS3新增伪类举例

* p:first-of-type 选择属于其父元素的首个 <p> 元素的每个 <p> 元素。
* p:last-of-type  选择属于其父元素的最后 <p> 元素的每个 <p> 元素。
* p:only-of-type  选择属于其父元素唯一的 <p> 元素的每个 <p> 元素。
* p:only-child    选择属于其父元素的唯一子元素的每个 <p> 元素。
* p:nth-child(2)  选择属于其父元素的第二个子元素的每个 <p> 元素。
* :enabled  :disabled 控制表单控件的禁用状态。
* :checked        单选框或复选框被选中。

### inline-block对齐问题

出现这个问题的原因归根结底就是inline-block的特性，两个inline-block之间的布局类似两个行内元素，但是可以设置width，height，上下margin。。。
类似行内元素布局，两个inline-block元素并排时，没有写明vertical-align时，默认是以baseline对齐的，
而inlineblock元素的baseline在哪里就要分有文字和没文字的情况，没有文字的情况baseline就是“margin-bottom的那条线”
有文字的情况baseline就是“最后一行文本的baseline”

### 父子元素顶部重合

不知道大家有没有试过,子元素写`margin-top:100px;`,父级元素却下移了

当父元素没有设置padding值以及border值时，出现了一个bug--父元素的上方与子元素的上方完全重合在了一起，无法分开。所以才会导致上述这种父元素和子元素同时向下的情况。

对于这种问题解决方法有下面几种：

* 给父元素添加padding-top值
* 给父元素添加border值
* 给父元素添加属性overflow:hidden;
* 给父元素或者子元素声明浮动float
* 使父元素或子元素声明为绝对定位：position:absolute;
* 给父元素添加属性 overflow:auto; positon:relative；

### CSS3有哪些新特性

CSS3实现圆角（border-radius），阴影（box-shadow），
对文字加特效（text-shadow、），线性渐变（gradient），旋转（transform）
transform:rotate(9deg) scale(0.85,0.90) translate(0px,-30px) skew(-9deg,0deg);//旋转,缩放,定位,倾斜
增加了更多的CSS选择器  多背景 rgba 
在CSS3中唯一引入的伪元素是::selection.
媒体查询，多栏布局
border-image

### BFC规范

BFC，块级格式化上下文，一个创建了新的BFC的盒子是独立布局的，盒子里面的子元素的样式不会影响到外面的元素。
在同一个BFC中的两个毗邻的块级盒在垂直方向（和布局方向有关系）的margin会发生折叠。 
（W3C CSS 2.1 规范中的一个概念，它决定了元素如何对其内容进行布局，以及与其他元素的关系和相互作用。）

### css中常见的兼容性问题

* png24位的图片在iE6浏览器上出现背景，解决方案是做成PNG8.也可以引用一段脚本处理.

* 浏览器默认的margin和padding不同。解决方案是加一个全局的*{margin:0;padding:0;}来统一。

* IE6双边距bug:块属性标签float后，又有横行的margin情况下，在ie6显示margin比设置的大。 

* 浮动ie产生的双倍距离（IE6双边距问题：在IE6下，如果对元素设置了浮动，同时又设置了margin-left或margin-right，margin值会加倍。）
  `#box{ float:left; width:10px; margin:0 0 0 100px;} `

 这种情况之下IE会产生20px的距离，解决方案是在float的标签样式控制中加入`_display:inline;`将其转化为行内属性。(_这个符号只有ie6会识别)

*  渐进识别的方式，从总体中逐渐排除局部。 

  首先，巧妙的使用“\9”这一标记，将IE游览器从所有情况中分离出来。 
  接着，再次使用“+”将IE8和IE7、IE6分离开来，这样IE8已经独立识别。
```
  .bb{
    background-color:#f1ee18;/*所有识别*/
    .background-color:#00deff\9; /*IE6、7、8识别*/
    +background-color:#a200ff;/*IE6、7识别*/
    _background-color:#1e0bd1;/*IE6识别*/ 
  } 
```
*  IE下,可以使用获取常规属性的方法来获取自定义属性,
   也可以使用getAttribute()获取自定义属性;
   Firefox下,只能使用getAttribute()获取自定义属性. 
   解决方法:统一通过getAttribute()获取自定义属性.

* IE下,event对象有x,y属性,但是没有pageX,pageY属性; 
  Firefox下,event对象有pageX,pageY属性,但是没有x,y属性.

* 解决方法：（条件注释）缺点是在IE浏览器下可能会增加额外的HTTP请求数。

* Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示, 
  可通过加入 CSS 属性 -webkit-text-size-adjust: none; 解决.

* 超链接访问过后hover样式就不出现了 被点击访问过的超链接样式不在具有hover和active了解决方法是改变CSS属性的排列顺序:
L-V-H-A :  a:link {} a:visited {} a:hover {} a:active {}

* 怪异模式问题：漏写DTD声明，Firefox仍然会按照标准模式来解析网页，但在IE中会触发怪异模式。为避免怪异模式给我们带来不必要的麻烦，最好养成书写DTD声明的好习惯。现在可以使用[html5](http://www.w3.org/TR/html5/single-page.html)推荐的写法：`<doctype html>`

* 上下margin重合问题
ie和ff都存在，相邻的两个div的margin-left和margin-right不会重合，但是margin-top和margin-bottom却会发生重合。
解决方法，养成良好的代码编写习惯，同时采用margin-top或者同时采用margin-bottom。

* ie6对png图片格式支持不好(引用一段脚本处理)


### CSS3画图形

```
<div>
  <!-- css3画三角形 -->
  <div class="sanjiao"></div>
  <!-- 画对话框 -->
  <div class="duihua">你好啊</div>
  <!-- 画菱形 -->
  <div class="lingxing"></div>
  <!-- 画平行四边形 -->
  <div class="pingxing"></div>
  <!-- 画五角星 -->
  <div class="star"></div>
  <!-- 鸡蛋 -->
  <div class='egg'></div>
</div>

// 三角形
  .sanjiao {
    border-top: 50px solid transparent;
    border-bottom: 50px solid transparent;
    border-left: 0px solid yellow;
    border-right: 50px solid blue;
    height: 0px;
    width: 0px;
    margin: 50px auto;
  }
  // 对话框
  .duihua {
    width:300px;
    height:36px;
    line-height: 36px;
    text-align: center;
    background-color: #a60;
    border-radius: 6px;
    color:#fff;
    margin: 50px auto;
    position: relative;
  }
  .duihua::before {
    content: '';
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 0px solid #a60;
    border-right: 10px solid #a60;
    position: absolute;
    left:-10px;
    top:8px;
  }
  
  // 菱形
  .lingxing {
    width:100px;
    height:100px;
    background-color: orangered;
    margin: 50px auto;
    transform: rotate(45deg)
  }
  
  // 平行四边形
  .pingxing {
    width:150px;
    height:100px;
    background-color: firebrick;
    margin: 50px auto;
    // 第一个是X轴倾斜的角度，第二个是Y轴倾斜的角度
    transform: skew(20deg,20deg)
  }
  
  // 五角星
  .star {
    position: relative;
    border-top: 0px solid transparent;
    border-bottom: 70px solid red;
    border-left: 100px solid transparent;
    border-right: 100px solid transparent;
    height: 0px;
    width: 0px;
    margin: 50px auto;
    transform: rotate(35deg)
  }
  .star::before {
    content: '';
    border-top: 0px solid transparent;
    border-bottom: 80px solid red;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    height: 0px;
    width: 0px;
    position: absolute;
    top: -45px;
    left: -65px;
    transform: rotate(-35deg)
  }
  .star::after {
    content: '';
    border-top: 0px solid transparent;
    border-bottom: 70px solid red;
    border-left: 100px solid transparent;
    border-right: 100px solid transparent;
    height: 0px;
    width: 0px;
    position: absolute;
    top: 3px;
    left: -105px;
    transform: rotate(-70deg)
  }
  // 鸡蛋
  .egg {
    width: 126px;
    height: 180px;
    background-color: #fa3;
    // 斜杠之前的是设置X轴的，后面是设置Y轴的
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  }


```
