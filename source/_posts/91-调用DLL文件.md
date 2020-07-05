---
title: electron-vue 调用C++动态链接库（DLL）
categories:
  - electron-vue
tags:
  - electron-vue
copyright: true
comments: true
abbrlink: df51f470
date: 2019-09-12 15:11:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 项目中需要调用到DLL,这里做一下记录,以免日后忘记

<!--more-->

废话不多说,DLL和ffi我也就不介绍了,反正也没人看,先说一下注意点,直接上步骤

1. 如果dll是32位的nodejs和electron都要使用对应的版本才可以使用,
2. nodejs版本建议不要太高,我用的是8.x的

打开cmd控制台,使用管理员打开,一定要管理员

### 下载electron-vue

拉取electron-vue没什么好说的,之前也都说过

vue init simulatedgreg/electron-vue project

cd project  cnpm install

在安装一下 `electron-rebuild`

cnpm install --save-dev electron-rebuild

### 安装ffi

安装ffi之前需要安装node-gyp

而node-gyp又需要下面几个环境

1. python2.x 这里我用的是2.7版本,(3.x不支持); 安装完成以后需要将python设置为环境变量
2. .net framework 4.5.1
3. visual C++ Build Tools,或者 （vs2015以上（包含15))

> 可以执行cnpm install --global --production windows-build-tools 一键安装上面所需的依赖

全部安装好了就是这个样子,会显示 ALL down,耐心等待一下,之后敲一下python,看看环境变量是否已经配置好了,如果没有的话,就要手动配置了

![图片](https://csblogimage.oss-cn-hangzhou.aliyuncs.com/91-python.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,size_16,text_Qnku6ZmI5YWI55Sf55qE5bCP5YmN56uv,color_FFFFFF,shadow_50,t_100,g_se,x_10,y_10)


#### 安装node-gyp

接下来就可以安装 node-gyp

> cnpm install node-gyp -g

#### 正式安装ffi了

> cnpm install ffi --save

![ffi错误警告](https://csblogimage.oss-cn-hangzhou.aliyuncs.com/91-2-ffiWaring.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,size_16,text_Qnku6ZmI5YWI55Sf55qE5bCP5YmN56uv,color_FFFFFF,shadow_50,t_100,g_se,x_10,y_10)

出现这一些黄色警告,也不知道以后会不会有影响

在项目中导入一下ffi

> const ffi=require("ffi");

咦..报错?? Uncaught Error: A dynamic link library (DLL) initialization routine failed.

事实上electron在使用c++模时还需要根据electron的版本等信息重新编译一下，这样在electron中才能执行，我们需要进入ffi模块执行重新编译的命令，并注入参数。

cd进入node_modules/ffi目录执行如下

> node-gyp rebuild -target=2.0.4  -arch=x64 -dist-url=https://npm.taobao.org/mirrors/atom/
或
> node-gyp rebuild -target=2.0.4  -arch=ia32 -dist-url=https://npm.taobao.org/mirrors/atom/

* arget：electron的版本号
* arch ： 计算机的架构（x64或者ia32），如果node环境是32位，那么这里就是ia32，如果是node环境是64位，那么这里就是x64。
* dist-url ：文件的下载地址，编译的时候回去这个地址上下载一些额外的文件，具体作用我不是很清楚。这里使用的是国内镜像，不是官方给出的地址，至于为什么，太慢了。

结果!!! node-gyp rebuild 不成功???

各种找原因,最后发现是node-gyp版本问题5.0.3的不可以

于是下载稳定一点的 `cnpm install node-gyp@3.7.0 -g`

继续rebuild一下,成功的时候会出现`已完成代码的生成` 这样的字眼

然后我们在项目`根目录`下需要执行如下命令

> .\node_modules\.bin\electron-rebuild.cmd

成功的时候会有个打钩的Rebuild Complete

这时候再运行一下,就可以调用ffi了

### 调用ffi

```
  const ffi=require("ffi");
  const User32 =  ffi.Library('user32', {
    'GetWindowLongPtrW': ['int', ['int', 'int']],
    'SetWindowLongPtrW': ['int', ['int', 'int', 'long']],
    'GetSystemMenu': ['int', ['int', 'bool']],
    'DestroyWindow': ['bool', ['int']]
  })
  console.log(User32.DestroyWindow);
  
  测试调用本地的ffi
```


### 其他遇到的报错问题

Q: Uncaught Error: Could not locate the bindings file.

A: ffi没有编译,需要node-gyp rebuild 一下

Q: 安装ffi时报错 not found python

A: python 环境变量没有配置好

Q: Uncaught Error: Dynamic Linking Error: Win32 error 126

A: Dll引用的路径不对,检查路径是否书写正确,需要用绝对路径

Q: Uncaught Error: Dynamic Linking Error: Win32 error 193

A: dll 位数不对应，例如electron/nodejs是32位的dll是64位的

Q: Uncaught Error: Dynamic Linking Error: Win32 error 127

A: DLL中没有找到对应名称的函数，需要检查头文件定义的函数名是否与DLL调用时写的函数名是否相同。

> 至此,运行调用Dll文件没有问题

以上就是我对electron-vue 调用dll 的一些理解，如果文章由于我学识浅薄，导致您发现有严重谬误的地方，请一定在评论中指出，我会在第一时间修正我的博文，以避免误人子弟。
