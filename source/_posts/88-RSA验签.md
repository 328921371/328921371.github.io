---
title: RSA验签
categories:
  - RSA
tags:
  - RSA
copyright: true
comments: true
abbrlink: b4f6a942
date: 2019-06-28 14:33:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 上篇讲到了支付,这里讲一下支付中传递参数时候对后台参数进行验证

<!--more-->

规定的是使用RSA,来看看具体怎么使用的吧

首先导入 jsrsasign

```
<script src="https://cdn.bootcss.com/jsrsasign/8.0.12/jsrsasign-all-min.js"></script>
```

假设objString 就是后台让我们要验证的东西
```
  let objString = ****
	// 验证Java的签名
	// 这里 prvkeypem 放公钥pem看起来有点怪, 但是这是可行的, 内部还是使用的上文经常出现的 KEYUTIL.getKey(pk) 来生成公钥实例的
	// 初始化构建Signature实例
	var sign4Java = new KJUR.crypto.Signature({alg:"SHA1withRSA",prvkeypem:pk});
	sign4Java.updateString(objString);
	// Java生成签名
	var signByJava = sign;
	var b2 = sign4Java.verify(b64utohex(signByJava));
		
  return b2
```

那么这里的b2就是true or false,判断是否通过

参考文章 [戳这里](https://www.jianshu.com/p/b32fc387d8ad)

以上就是我对支付的一些理解，如果文章由于我学识浅薄，导致您发现有严重谬误的地方，请一定在评论中指出，我会在第一时间修正我的博文，以避免误人子弟。