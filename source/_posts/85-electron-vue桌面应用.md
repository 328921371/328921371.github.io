---
title: electron-vue 桌面应用
categories:
  - electron-vue
tags:
  - electron-vue
copyright: true
comments: true
abbrlink: 39b9d5f6
date: 2019-04-15 14:34:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 最近项目需要一个桌面应用,于是初步了解了一下electron-vue来打造桌面应用

<!--more-->

# electron

什么是 electron? 官网里这么说：Electron提供了一个Nodejs的运行时，专注于构建桌面应用，同时使用web页面来作为应用的GUI，你可以将其看作是一个由JavaScript控制的迷你版的Chromium浏览器。

本质上，electron 就是一个带了 Chrome 浏览器的壳子（无需考虑兼容性的问题）。

具有两个进程，分别是主进程，以及渲染进程。

* 主进程：运行 package.json 里面 main 脚本的进程成为主进程。

* 渲染进程： 每个 electron 的页面都运行着自己的进程，称为渲染进程。

我们主要的页面代码就是放在渲染进程里面的

# electron-vue

electron-vue 是一个结合 vue-cli 与 electron 的项目，主要避免了使用 vue 手动建立起 electron 应用程序，很方便。

## 安装

假设电脑已经安装node.js,并且已经全局搭建好vue-cli脚手架

cd 到需要安装的目录下, vue init simulatedgreg/electron-vue project

一路回车

之后就是安装依赖了,推荐使用yarn,可以避免打包时候的一些报错

> 路径千万不能有中文!!

### 项目结构树

```
  my-project
  ├─ .electron-vue                    <=  配置文件
  │  └─ <build/development>.js files
  ├─ build                            <=  打包的icon,以及打包后的文件
  │  └─ icons/
  ├─ dist                             <=  编译打包
  │  ├─ electron/
  │  └─ web/
  ├─ node_modules/                    <=  node包
  ├─ src
  │  ├─ main                          <=  主进程配置
  │  │  ├─ index.dev.js
  │  │  └─ index.js
  │  ├─ renderer                      <=  渲染进程文件
  │  │  ├─ components/
  │  │  ├─ router/
  │  │  ├─ store/
  │  │  ├─ App.vue
  │  │  └─ main.js
  │  └─ index.ejs
  ├─ static/                          <=  静态资源文件
  ├─ test
  │  ├─ e2e
  │  │  ├─ specs/
  │  │  ├─ index.js
  │  │  └─ utils.js
  │  ├─ unit
  │  │  ├─ specs/
  │  │  ├─ index.js
  │  │  └─ karma.config.js
  │  └─ .eslintrc
  ├─ .babelrc
  ├─ .eslintignore
  ├─ .eslintrc.js
  ├─ .gitignore
  ├─ package.json
  └─ README.md
```

### 技术栈

 * [x] Vue

 * [x] VueRouter

 * [x] Vuex

 * [x] Vue-Electron

 * [x] iView

 * [x] Eslint

 * [x] Babel

 * [x] Webpack

 * [x] Nodejs

## 运行

npm run dev 就可以开始运行了

这里贴一下基本的主进程的配置

```
  mainWindow = new BrowserWindow({
    width: 1200,
    minWidth: 1200,
    height: 720,
    minHeight: 720,
    resizable: true, // 窗口是否可调整大小
    movable: true, // 窗口是否可移动
    skipTaskbar: false, // 是否在任务栏中显示窗口。
    center: true, // 在屏幕中心显示窗口
    useContentSize: true, // 实际窗口的大小将包括窗口框架的大小并略大
    transparent: false, // 使窗口透明
    frame: false, //创建一个无框窗口
    titleBarStyle: "hidden",
    webPreferences: {
      webSecurity: false, // 跨域
      plugins: true
    }
  })
```

这个主要是配置窗口的事件,更多的配置欢迎去官网查询

## 自定义窗口事件(最小化到托盘)

### 渲染进程中

```
  // 设置点击和发送

  let ipc = require('electron').ipcRenderer;

  document.getElementById('minWin').addEventListener('click', () => {
    ipc.send('window-min');
  })
  document.getElementById('maxWin').addEventListener('click', () => {
    ipc.send('window-max');
    // this.windowMax = !this.windowMax;
  })
  document.getElementById('closeWin').addEventListener('click', () => {
    ipc.send('window-close');
  })

  ipc.on('main-maximize', (event, arg) => {
    this.windowMax = true
  });

  ipc.on('main-unmaximize', (event, arg) => {
    this.windowMax = false
  });
```

### 主进程中

```

  import { app, BrowserWindow, Tray, Menu } from 'electron'

  const path = require('path');
  const electron = require('electron')
  let tray = null

  // 在 createWindow 中监听发送

  function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 1200,
    minWidth: 1200,
    height: 720,
    minHeight: 720,
    resizable: true, // 窗口是否可调整大小
    movable: true, // 窗口是否可移动
    skipTaskbar: false, // 是否在任务栏中显示窗口。
    center: true, // 在屏幕中心显示窗口
    useContentSize: true, // 实际窗口的大小将包括窗口框架的大小并略大
    transparent: false, // 使窗口透明
    frame: false, //创建一个无框窗口
    titleBarStyle: "hidden",
    webPreferences: {
      webSecurity: false, // 跨域
      plugins: true
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // 像渲染进程发送指令
  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('main-maximize');
  })
  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('main-unmaximize');
  })

  // 自定义创建监听缩小放大关闭
  const ipc = electron.ipcMain
  //窗口最小化
  ipc.on('window-min',function(){
    mainWindow.minimize();
  })
  //窗口最大化
  ipc.on('window-max',function(){
    if(mainWindow.isMaximized()){
        mainWindow.restore();
    }else{
        mainWindow.maximize();
    }
  })

  // 当我们点击关闭时触发close事件，我们按照之前的思路在关闭时，隐藏窗口，隐藏任务栏窗口
  // event.preventDefault(); 禁止关闭行为(非常必要，因为我们并不是想要关闭窗口，所以需要禁止默认行为)
  ipc.on('window-close',(event)=>{
    // mainWindow.close();
    mainWindow.hide();
    mainWindow.setSkipTaskbar(true);
    event.preventDefault();

  })

  //创建系统通知区菜单
  tray = new Tray(path.join(__dirname, '/static/icon.ico'));
  const contextMenu = Menu.buildFromTemplate([
      {label: '退出', click: () => {mainWindow.destroy()}},//我们需要在这里有一个真正的退出（这里直接强制退出）
  ])
  tray.setToolTip('易家健康管理')
  tray.setContextMenu(contextMenu)
  tray.on('click', ()=>{ //我们这里模拟桌面程序点击通知区图标实现打开关闭应用的功能
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    mainWindow.isVisible() ? mainWindow.setSkipTaskbar(false):mainWindow.setSkipTaskbar(true);
  })

}
```

### 自定义拖动事件

当默认的窗口框被关闭时,就要自己去设置拖动了.

在需要拖动的地方设置 `style="-webkit-app-region: drag"`

在点击的地方禁止拖动 `style="-webkit-app-region: no-drag;"`

在拖动的地方设置禁止选取文字 `style="-webkit-user-select: none;"`

## 打包发布

npm run build

打包这个东西,尽人事听天命...

> 如提示缺少vue组建，是因为registry的问题，因为国内taobao镜像没有Electron的依赖环境。应该删掉node包,重新yarn一下

打包好后,就在build文件夹底下了

后面在研究一下自动更新..

以上就是我对vue-electron 桌面应用的一些理解，如果文章由于我学识浅薄，导致您发现有严重谬误的地方，请一定在评论中指出，我会在第一时间修正我的博文，以避免误人子弟。