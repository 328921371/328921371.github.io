---
title: electron-vue 调用dll时打包问题
categories:
  - electron-vue
tags:
  - electron-vue
copyright: true
comments: true
abbrlink: 5538443e
date: 2019-09-15 14:10:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 本以为调用DLL成功就万事大吉了,没想到打包实在令人头疼,前前后后花了两天的时间

<!--more-->

首先,直接`npm run build`,打包...报错了...

what,我看百度他们都是打包之后白屏的啊,怎么到我这里直接报错

报错内容,大致是node-gyp rebuild 出错了

原因是我们在执行npm run build的时候，是通过electron-rebuild 来build的，这时会再次执行node-gyp rebuild，
这里没有添加任何参数，所以打包出来的应用可能还是会失败，最直接的方式就是在项目根目录下添加一个npm安装配置文件.npmrc，里面包含了一下npm的运行需要注入的参数。

.npmrc:

```
# Electron 的版本。
set npm config --target=2.0.4
# Electron 的系统架构, 值为 ia32 或者 x64。
set npm config --arch=ia32
# 下载 Electron 的 headers。
eset npm config --disturl=https://npm.taobao.org/mirrors/atom/
# 告诉 node-pre-gyp 我们是在为 Electron 生成模块。
set npm config --runtime=electron
```

一切准备就绪,继续 `npm run build`

嗯?? 怎么还是报错...提示 not found python ?????

运行的时候环境配置不是弄的好好的吗,怎么打包的时候又不行了

再配一次吧

1. 查看命令行python是否可用，如果不可用，设置path.确定命令行可用。
2. 命令行可用。可以通过下面命令设置
 
`npm config set python C:\Users\CS\.windows-build-tools\python27\python.exe`

如果不行执行下面的

`node-gyp configure --python v2.7.3 --verbose`

现在再打包..应该就可以打包成功了...

就是白屏了...想打开控制台,发现打不开...继续配置

在主线程中添加下面这句话

`mainWindow.webContents.openDevTools()`

主线程和渲染进程我就不再说了,之前说过了

打开控制台后,发现错误126..就是DLL文件路径不对

打开json文件,配置一下extraResources,

```
"build": {
  "extraResources":  [ // 拷贝dll等静态文件到指定位置
    {
      "from": "./termb.dll",
      "to": "../",  // ./是放在app同级,../就放在根目录底下
    }
  ],
  "nsis": {
    "oneClick": false, // 一键安装
    "guid": "xxxx", //注册表名字，不推荐修改
    "perMachine": true, // 是否开启安装时权限限制（此电脑或当前用户）
    "allowElevation": true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
    "allowToChangeInstallationDirectory": true, // 允许修改安装目录
    "installerIcon": "./build/icons/aaa.ico", // 安装图标
    "uninstallerIcon": "./build/icons/bbb.ico", //卸载图标
    "installerHeaderIcon": "./build/icons/aaa.ico", // 安装时头部图标
    "createDesktopShortcut": true, // 创建桌面图标
    "createStartMenuShortcut": true, // 创建开始菜单图标
    "shortcutName": "xxxx" // 图标名称
  }
}
```

这里的termb.dll需要放在根目录下

调用的时候这么写

```
import SystemInformation from './LandingPage/SystemInformation'
  const ffi=require("ffi");
  var path = require('path');
  var dllPath = path.resolve('termb.dll');
  
  //__dirname 这个是指向当前目录的
  //__static 这个是指向static的,
  var testLib = ffi.Library(dllPath, {
    CloseComm:['int',[]],
  });

  var dllRet = testLib.CloseComm();
  // 返回-1
  console.log('ret => '+dllRet);
```

路径的问题每个人可能都不一样,这只是我自己的方法,如果有其他更好的方法也可以使用

以上就是我对electron-vue 调用dll时打包问题的一些理解，如果文章由于我学识浅薄，导致您发现有严重谬误的地方，请一定在评论中指出，我会在第一时间修正我的博文，以避免误人子弟。
