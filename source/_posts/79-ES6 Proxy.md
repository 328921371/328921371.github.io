---
title: ECMAScript 6 Proxy
categories:
  - ECMAScript 6
tags:
  - ECMAScript 6
copyright: true
comments: true
abbrlink: 72c1ea62
date: 2019-02-18 14:17:05
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 用过vue-cli的都配置过跨域处理,对Proxy应该也不陌生,准确的来说,Proxy 可以理解成,在目标对象之前架设一层“拦截”,外界对该对象的访问,都必须先通过这层拦截,因此提供了一种机制,可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理,用在这里表示由它来“代理”某些操作,可以译为“代理器”。

<!--more-->

文章主要参考阮一峰老师的 ECMAScript 6入门,站在巨人的肩膀上看世界...

用new的方法对Proxy进行声明`new Proxy（{},{}）`

`var proxy = new Proxy(target, handler);`

Proxy 对象的所有用法，都是上面这种形式，不同的只是handler参数的写法。其中，new Proxy()表示生成一个Proxy实例，target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。

需要注意的是这里是两个花括号，第一个花括号就相当于我们方法的主体，后边的花括号就是Proxy代理处理区域，相当于我们写钩子函数的地方。

现在写两个例子作为比较

首先是我们最基础的创建对象

```
  var obj={
    add: function(val){
      return val + 5;
    },
    name: 'I am csing'
  };
  console.log(obj.add(5));
  console.log(obj.name);
```

把上边的obj对象改成Proxy形式。

```
  var pro = new Proxy({
    add: function (val) {
      return val + 5;
    },
    name: 'I am csing'
  }, {
    get:function(target,key,property){
      // target：得到的目标值
      // key：目标的key值，相当于对象的属性
      // property：这个不太常用，用法还在研究中，还请大神指教。

      console.log('come in Get');
      return target[key];
    },
    set:function(target,key,value,receiver){

      // target:目标值。
      // key：目标的Key值。
      // value：要改变的值。
      // receiver：改变前的原始值。

      console.log(`setting ${key} = ${value}`);
      return target[key] = value;
    }
  });
  console.log(pro.name);
  // 可以在控制台看到结果，先输出了come in Get。相当于在方法调用前的钩子函数。
```

刚刚已经说过了,前面的一个花括号是方法的主题,后面一个是处理区域,区域中有13中属性,有两个属性是最常用的,get属性和set属性,理解起来也很容易

* get属性是在你得到某对象属性值时预处理的方法，他接受三个参数

 * target：得到的目标值
 * key：目标的key值，相当于对象的属性
 * property：这个不太常用，用法还在研究中，还请大神指教。

* set属性是值你要改变Proxy属性值时，进行的预先处理。它接收四个参数。

 * target:目标值。
 * key：目标的Key值。
 * value：要改变的值。
 * receiver：改变前的原始值。


这里先介绍两种最经常用的,多了我也记不住

这因为Proxy的特性,所以它很合适用来写 Web 服务的客户端。

```
  const service = createWebService('http://example.com/data');

  service.employees().then(json => {
    const employees = JSON.parse(json);
    // ···
  });
```

上面代码新建了一个 Web 服务的接口，这个接口返回各种数据。Proxy 可以拦截这个对象的任意属性，所以不用为每一种数据写一个适配方法，只要写一个 Proxy 拦截就可以了。

```
  function createWebService(baseUrl) {
    return new Proxy({}, {
      get(target, propKey, receiver) {
        return () => httpGet(baseUrl+'/' + propKey);
      }
    });
  }
```


以上就是我对ECMAScript 6 Proxy的一些理解，如果文章由于我学识浅薄，导致您发现有严重谬误的地方，请一定在评论中指出，我会在第一时间修正我的博文，以避免误人子弟。