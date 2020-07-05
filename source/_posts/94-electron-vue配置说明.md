---
title: electron-vue 配置说明
categories:
  - electron-vue
tags:
  - electron-vue
copyright: true
comments: true
abbrlink: af680a88
date: 2019-09-16 14:54:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 花了大约两周的时间,使用electron-vue了解如果调用DLL,现在说一下electron-vue中的配置文件都是干嘛用的

<!--more-->

贴一下electron-vue的[官方文档](https://simulatedgreg.gitbooks.io/electron-vue/content/cn/)

本文参考一只小蚂蚁的[文章](https://juejin.im/post/5d6517a7f265da03e5234401),感谢大佬无私奉献

### build.js

打包的入口文件为build.js

```
'use strict'
// 环境说明
process.env.NODE_ENV = 'production'
// 一个对console.log字体修饰的库，dev的时候，会出现一个花式输出Electron-vue
const { say } = require('cfonts')
// 终端输出字符串样式，字体样式，字体颜色，背景颜色
const chalk = require('chalk')
// 一个使用globs删除文件和目录的模块， del模块支持多个文件删除[数组]，这是node的原生模块
const del = require('del')
// node原生模块，用来创建子进程
const { spawn } = require('child_process')
// webpack
const webpack = require('webpack')
// 多个cli滚轮，比如同时安装多个模块，然后在终端会显示滚轮，类似于进度显示
const Multispinner = require('multispinner')
// 需要的配置文件
const mainConfig = require('./webpack.main.config')
const rendererConfig = require('./webpack.renderer.config')
const webConfig = require('./webpack.web.config')
const doneLog = chalk.bgGreen.white(' DONE ') + ' '
const errorLog = chalk.bgRed.white(' ERROR ') + ' '
const okayLog = chalk.bgBlue.white(' OKAY ') + ' '
const isCI = process.env.CI || false
// 除了clean|web命令，是执行自己的操作，其他指令都是使用build()
if (process.env.BUILD_TARGET === 'clean') clean()
else if (process.env.BUILD_TARGET === 'web') web()
else build()
// 同步删除build文件
function clean () {
  del.sync(['build/*', '!build/icons', '!build/icons/icon.*'])
  console.log(`\n${doneLog}\n`)
  process.exit()
}
function build () {
  greeting()
  del.sync(['dist/electron/*', '!.gitkeep'])
  const tasks = ['main', 'renderer']
  const m = new Multispinner(tasks, {
    preText: 'building',
    postText: 'process'
  })
  let results = ''
  m.on('success', () => {
    process.stdout.write('\x1B[2J\x1B[0f')
    console.log(`\n\n${results}`)
    console.log(`${okayLog}take it away ${chalk.yellow('`electron-builder`')}\n`)
    process.exit()
  })
  // 打包主进程
  pack(mainConfig).then(result => {
    results += result + '\n\n'
    m.success('main')
  }).catch(err => {
    m.error('main')
    console.log(`\n  ${errorLog}failed to build main process`)
    console.error(`\n${err}\n`)
    process.exit(1)
  })
  // 打包渲染进程
  pack(rendererConfig).then(result => {
    results += result + '\n\n'
    m.success('renderer')
  }).catch(err => {
    m.error('renderer')
    console.log(`\n  ${errorLog}failed to build renderer process`)
    console.error(`\n${err}\n`)
    process.exit(1)
  })
}
function pack (config) {
  return new Promise((resolve, reject) => {
    config.mode = 'production'
    webpack(config, (err, stats) => {
      if (err) reject(err.stack || err)
      else if (stats.hasErrors()) {
        let err = ''
        stats.toString({
          chunks: false,
          colors: true
        })
        .split(/\r?\n/)
        .forEach(line => {
          err += `    ${line}\n`
        })
        reject(err)
      } else {
        resolve(stats.toString({
          chunks: false,
          colors: true
        }))
      }
    })
  })
}
// 先删除dist目录，除了.gitkeep文件
function web () {
  del.sync(['dist/web/*', '!.gitkeep'])
  webConfig.mode = 'production'
  webpack(webConfig, (err, stats) => {
    if (err || stats.hasErrors()) console.log(err)
    console.log(stats.toString({
      chunks: false,
      colors: true
    }))
    process.exit()
  })
}
// 致意信息 映入眼帘
function greeting () {
  const cols = process.stdout.columns
  let text = ''
  if (cols > 85) text = 'lets-build'
  else if (cols > 60) text = 'lets-|build'
  else text = false
  if (text && !isCI) {
    say(text, {
      colors: ['yellow'],
      font: 'simple3d',
      space: false
    })
  } else console.log(chalk.yellow.bold('\n  lets-build'))
  console.log()
}
```

### build.runner.js

开发环境使用的配置文件是build.runner.js

build.runner.js 主进程 + 渲染进程 打包
Electron-vue修改了对开发环境的优化，包括了于开发环境的配置文件隔离，主进程和渲染进程配置文件隔离，编译过程提示等功能

```
'use strict'
const chalk = require('chalk')
const electron = require('electron')
const path = require('path')
const { say } = require('cfonts')
const { spawn } = require('child_process')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackHotMiddleware = require('webpack-hot-middleware')
const mainConfig = require('./webpack.main.config')
const rendererConfig = require('./webpack.renderer.config')
let electronProcess = null
let manualRestart = false
let hotMiddleware
function logStats (proc, data) {
  let log = ''
  log += chalk.yellow.bold(`┏ ${proc} Process ${new Array((19 - proc.length) + 1).join('-')}`)
  log += '\n\n'
  if (typeof data === 'object') {
    data.toString({
      colors: true,
      chunks: false
    }).split(/\r?\n/).forEach(line => {
      log += '  ' + line + '\n'
    })
  } else {
    log += `  ${data}\n`
  }
  log += '\n' + chalk.yellow.bold(`┗ ${new Array(28 + 1).join('-')}`) + '\n'
  console.log(log)
}
// 启动渲染进程
// 整体作用：将dev-client.js和renderer/main.js合并到webpack entry字段，输出到根目录下的/dist/electron/main.js文件中
function startRenderer () {
  // 加载webpack配置
  return new Promise((resolve, reject) => {
    rendererConfig.entry.renderer = [path.join(__dirname, 'dev-client')].concat(rendererConfig.entry.renderer)
    rendererConfig.mode = 'development'
    
    // 创建webpack
    const compiler = webpack(rendererConfig)
    
    // 创建webpack热加载
    // webpackHotMiddleware的heartbeat的参数作用并不是检测文件的频率，而是保持服务器链接存活的心跳频率
    hotMiddleware = webpackHotMiddleware(compiler, {
      log: false,
      heartbeat: 2500
    })
    // 编译状态监控
    # 监听的是 compilation事件
    compiler.hooks.compilation.tap('compilation', compilation => {
      compilation.hooks.htmlWebpackPluginAfterEmit.tapAsync('html-webpack-plugin-after-emit', (data, cb) => {
        // 钩子函数，检测webpack的编译状态，把其中的html-webpack-plugin-after-emit状态，发布到webpackHotMiddleware中
        hotMiddleware.publish({ action: 'reload' })
        cb()
      })
    })
    // 输出打包编译过程
    compiler.hooks.done.tap('done', stats => {
      logStats('Renderer', stats)
    })
    // 创建webpack-dev-server
    const server = new WebpackDevServer(
      compiler,
      {
        contentBase: path.join(__dirname, '../'),
        quiet: true,
        before (app, ctx) {
          // 使用webpackHotMiddleware
          app.use(hotMiddleware)
          ctx.middleware.waitUntilValid(() => {
            resolve()
          })
        }
      }
    )
    // 监听窗口
    server.listen(9080)
  })
}
// 启动主进程 - 过程与渲染进程是类似的
// 创建webpack，实时发布hotMiddleware，主代码热更新
function startMain () {
  // 导入index.dev.js，该文件主要安装electron-debug工具，同时也安装了vue-devtools工具
  // webpack.config.main.js与render相比，main不需要去去处理vue，图片， css，html等，只需要对js处理
  return new Promise((resolve, reject) => {
    mainConfig.entry.main = [path.join(__dirname, '../src/main/index.dev.js')].concat(mainConfig.entry.main)
    mainConfig.mode = 'development'
    
    // 创建主进程的 webpack
    const compiler = webpack(mainConfig)
    # 监听的是watch-run事件
    compiler.hooks.watchRun.tapAsync('watch-run', (compilation, done) => {
      logStats('Main', chalk.white.bold('compiling...'))
      hotMiddleware.publish({ action: 'compiling' })
      done()
    })
    // 与render不同，没有使用WebpackDevServer的方式自动更新界面，而是通过webpack的watch模式，不断重新启动程序，类似于electron-forge start
    compiler.watch({}, (err, stats) => {
      if (err) {
        console.log(err)
        return
      }
      logStats('Main', stats)
      if (electronProcess && electronProcess.kill) {
        manualRestart = true
        process.kill(electronProcess.pid)
        electronProcess = null
        // 重新启动项目
        startElectron()
        setTimeout(() => {
          manualRestart = false
        }, 5000)
      }
      resolve()
    })
  })
}
// 启动electron
function startElectron () {
  var args = [
    '--inspect=5858',
    path.join(__dirname, '../dist/electron/main.js')
  ]
  // detect yarn or npm and process commandline args accordingly
  if (process.env.npm_execpath.endsWith('yarn.js')) {
    args = args.concat(process.argv.slice(3))
  } else if (process.env.npm_execpath.endsWith('npm-cli.js')) {
    args = args.concat(process.argv.slice(2))
  }
  // 创建主进程执行特别命令
  electronProcess = spawn(electron, args)
  
  electronProcess.stdout.on('data', data => {
    electronLog(data, 'blue')
  })
  electronProcess.stderr.on('data', data => {
    electronLog(data, 'red')
  })
  electronProcess.on('close', () => {
    if (!manualRestart) process.exit()
  })
}
function electronLog (data, color) {
  let log = ''
  data = data.toString().split(/\r?\n/)
  data.forEach(line => {
    log += `  ${line}\n`
  })
  if (/[0-9A-z]+/.test(log)) {
    console.log(
      chalk[color].bold('┏ Electron -------------------') +
      '\n\n' +
      log +
      chalk[color].bold('┗ ----------------------------') +
      '\n'
    )
  }
}
// electron-vue Log输出
function greeting () {
  const cols = process.stdout.columns
  let text = ''
  if (cols > 104) text = 'electron-vue'
  else if (cols > 76) text = 'electron-|vue'
  else text = false
  if (text) {
    say(text, {
      colors: ['yellow'],
      font: 'simple3d',
      space: false
    })
  } else console.log(chalk.yellow.bold('\n  electron-vue'))
  console.log(chalk.blue('  getting ready...') + '\n')
}
// 初始函数
function init () {
  greeting()
  // 主进程和渲染进程都启动完毕
  Promise.all([startRenderer(), startMain()])
    .then(() => {
      startElectron()
    })
    .catch(err => {
      console.error(err)
    })
}
init()
```

### dev.client.js

```
const hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')
// 注册webpack-hot-middleware监听器
hotClient.subscribe(event => {
  // 处理Main进程发送的"compiling"的事件
  // 实际上在Render进程中还发送了"reload"的消息
  if (event.action === 'compiling') {
    document.body.innerHTML += `
      <style>
        #dev-client {
          background: #4fc08d;
          border-radius: 4px;
          bottom: 20px;
          box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
          color: #fff;
          font-family: 'Source Sans Pro', sans-serif;
          left: 20px;
          padding: 8px 12px;
          position: absolute;
        }
      </style>
      <div id="dev-client">
        Compiling Main Process...
      </div>
    `
  }
})
```

页面会显示Compiling Main Process…
render webpack打包过程中，hotMiddleware.publish将各种编译状态发送给了hotClient.subscribe。
整个webpack-hot-middleware编译过程中发送的编译消息，将会在界面展示一个提示框提示开发者，当然这里也可以自定义订阅事件。

### 页面渲染

页面的渲染都是通过渲染进程完成的，通过webpack.renderer.config.js可以看到渲染进程的入口文件是src/renderer/main.js
在普通的electron文件，主进程main.js通过mainWindow.loadURL()标识出渲染进程的html文件，也可以在渲染进程中调用Node的API。
在webpack.renderer.config,js中，可以看到使用了一个plugins html-webpack-plugin，这个插件将src/index.ejs模板生成首页的html文件。


