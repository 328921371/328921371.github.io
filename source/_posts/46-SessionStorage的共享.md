---
title: SessionStorage的共享
categories:
  - Storage
tags:
  - SessionStorage
  - LocalStorage
copyright: true
comments: true
abbrlink: cbebe10d
date: 2017-11-23 22:05:55
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 在之前，保存用户信息大多数都是放在Cookie中，但是安全性太低了，随着Html5的诞生，Web Storage也进入我们的视野，于是存储信息都转入到SessionStorage，今天就分享一下SessionStorage的共享问题

<!--more-->

在之前的博客中有提到Cookie和Web Storage的区别与使用，但是使用起来并没有我们想象的那么顺心，Cookie使用起来，不同标签页可以共享，但是安全性不高，SessionStorage安全性是稍微好一些，但是在不同的标签页中又不能共享数据。百度一会，发现国外有一个大神对于这个问题提出了一个解决的方案，我总结了一下

### 现有的浏览器存储机制

1. localStorage：~5MB，数据永久保存直到用户手动删除
2. sessionStorage：~5MB，数据只在当前标签页有效，当用户关闭浏览器时删除
3. cookie：~4KB，可以设置成永久有效，当用户关闭浏览器时删除

### 安全的认证token保存

一些重要的系统会要求当用户关闭标签页时会话立刻到期。

为了达到这个目的，绝对不应该使用cookies来保存任何敏感信息（例如认证token）。

这些问题就使得我们在保存认证token时应使用内存或sessionStorage。sessionStorage的好处是它允许跨多个页面保存数据，并且也支持浏览器刷新操作。这样用户就可以在多个页面之间跳转或刷新页面而保持登录状态。

Good。我们将token保存在sessionStorage，并在每次请求服务器时将token放在请求头中来完成用户的身份认证。当用户关闭标签页，token会立即过期。

### 但多标签页怎么办？

即便是在单页面应用中也有一个很常见的情况，用户经常希望打开多个标签页。而此场景下将token保存在sessionStorage中将会带来很差的用户体验，每次开启一个标签页都会要求用户重新登录。没错，sessionStorage不支持跨标签页共享数据。

### 利用localStorage事件来跨标签页共享sessionStorage

当用户新开一个标签页时，我们先来询问其它已经打开的标签页是不是有需要给我们共享的sessionStorage数据。如果有，现有的标签页会通过localStorage事件来传递数据到新打开的标签页中，我们只需要复制一份到本地sessionStorage即可。

>传递过来的sessionStorage绝对不会保存在localStorage，从localStorage事件将数据中复制并保存到sessionStorage，这个流程是在同一个调用中完成，没有中间状态。而且数据是对应事件携带的，并不在localStorage中。这样就确保了数据的安全性。

直接上代码：在代码中解释

```javascript
// 为了简单明了删除了对IE的支持
(function() {
	if (!sessionStorage.length) {
		// 这个调用能触发目标事件，从而达到共享数据的目的
		localStorage.setItem('getSessionStorage', Date.now());
	};
	// 该事件是核心,调用监听事件
	window.addEventListener('storage', function(event) {
		if (event.key == 'getSessionStorage') {
			// 已存在的标签页会收到这个事件
			localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
			localStorage.removeItem('sessionStorage');
		} else if (event.key == 'sessionStorage' && !sessionStorage.length) {
			// 新开启的标签页会收到这个事件
			var data = JSON.parse(event.newValue),
					value;
			for (key in data) {
				sessionStorage.setItem(key, data[key]);
			}
		}
	});
})();
```

>代码其实不难理解，当打开新的页面，新页面的sessionStorage.length会空，于是就会调用localStorage.setItem()，其他标签页会判断event.key是否与刚刚保存的key值一致，若一致，说明改页面不是新的页面，则将页面中的session保存至localStorage，新打开的页面监听到有新的值，就将值通过event.newValue取出后赋给自己的SessionStorage，就实现了SessionStorage的共享。

有些小伙伴对storage事件实时监听可能不太了解，这里稍微解释一下,后面会专门给出一个demo

在事件处理函数中，触发事件的事件对象（event参数值）具有如下几个属性

1. event.key 属性：属性值为在 session 或 localStorage 中被修改的数据键值。 
2. event.oldValue 属性：属性值为在 sessionStorage 或 localStorage 中被修改的值。 
3. event.newValue 属性：属性值为在 sessionStorage 或 localStorage 中被修改后的值 
4. event.url 属性：属性值为修改 sessionStorage 或 localStorage 中值的页面的URL地址 
5. event.storageArea 属性 : 属性值为被变动的 sessionStorage 对象或 localStorage 对象

给出一个监听的小demo，好好研究一下吧，复制就可以使用

### 实时监听的页面

```javascript
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>利用storage事件实时监视Web Storage中的数据</title>
    </head>
    <body>
        <script type="text/javascript">

            //利用storage事件实时监视wev Storage中的数据
            window.addEventListener('storage',function (e) {//e只是一个传参
                //获取被修改的键值
                if (e.key == 'test') {
                    //获取将要被添加内容的元素
                    var output = document.getElementById('output');
                    //将获取到的修改值在元素中输出
                    output.innerHTML = '原有值：' + e.oldValue;
                    output.innerHTML += '<br />新值:' + e.newValue;
                    output.innerHTML += '<br />变动页面地址：' + utf8_decode(unescape(e.url));

                    //分别打印会发现内容一致
                    console.log(e.storageArea);
                    console.log(localStorage);
                    //此行代码只在Chrome浏览器中有效
                    console.log(e.storageArea === localStorage);//输出true

                }
            },false);
            function utf8_decode (utftext) {
                var string = '';
                var i = c = c1 = c2 = 0;
                //获取URL所有字符
                while (i < utftext.length) {
                    //获取URL并将URL中所有 Unicode 编码获取
                    c = utftext.charCodeAt(i);
                    //对 Unicode 编码进行处理转化成字符串
                    if (c < 128) {
                        string += String.fromCharCode(c);
                        i++;
                    }
                    else if ((c < 191) && (c < 224)) {
                        c2 = utftext.charCodeAt(i + 1);
                        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                        i += 2;
                    }
                    else {
                        c2 = utftext.charCodeAt(i + 1);
                        c3 = utftext.charCodeAt(i + 2);
                        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                        i += 3;
                    }
                }
                return string;
            }
        </script>
        <output id="output"></output>
    </body>
</html>
```

### 被监听的页面
```javascript
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>用于修改localStorage 中数据的页面的代码</title>
    </head>
    <body>
                    请输入一些值：<input type="text" id="text1" />
        <button onclick="setLOcalStorage()">设置</button>
    </body>
    <script type="text/javascript">
        function setLOcalStorage () {
            //设置test键值下的内容等于input框中的内容
            localStorage.test = document.getElementById('text1').value;
        }
    </script>
</html>
```

以上就是我对SessionStorage共享的一些理解看法，十分感觉各位大神对代码无私的分享