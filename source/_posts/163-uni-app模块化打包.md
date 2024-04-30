---
title: uni-app模块化打包配置
categories:
  - uniApp
tags:
  - uniApp
copyright: true
comments: true
abbrlink: cb1947a6
date: 2023-01-27 23:17:33
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 如何实现一套代码，部署多个微信小程序

<!--more-->

有些时候会遇到一个需求，同一个项目，但是有一些模块不同，打包到不同的小程序，这是我们就可以通过配置来解决

微信小程序的限制我们都知道，不可以动态的新增tabBar，而且appid的配置，都是在manifest.json 中进行配置的

所以我们只要通过js脚本来修改这两个文件就可以了

新增一个`manifest.js`文件

```
// 读取 manifest.json ，修改后重新写入
// 读取 pages.json ，修改后重新写入
const fs = require('fs')
const manifestPath = './manifest.json'
const pagesPath = './pages.json'
let Manifest = fs.readFileSync(manifestPath, { encoding: 'utf-8' })
let Pages = fs.readFileSync(pagesPath, { encoding: 'utf-8' })

function replaceManifest(path, value) {
  const arr = path.split('.')
  const len = arr.length
  const lastItem = arr[len - 1]

  let i = 0
  let ManifestArr = Manifest.split(/\n/)

  for (let index = 0; index < ManifestArr.length; index++) {
    const item = ManifestArr[index]
    if (new RegExp(`"${arr[i]}"`).test(item)) ++i;
    if (i === len) {
      const hasComma = /,/.test(item)
      ManifestArr[index] = item.replace(new RegExp(`"${lastItem}"[\\s\\S]*:[\\s\\S]*`), `"${lastItem}": ${value}${hasComma ? ',' : ''}`)
      break;
    }
  }

  Manifest = ManifestArr.join('\n')
}

function replacePages(path, value) {
  const arr = path.split('.')
  const len = arr.length
  const lastItem = arr[len - 1]
  let i = 0
  let PagesArr = Pages.split(/\n/)
  for (let index = 0; index < PagesArr.length; index++) {
    const item = PagesArr[index]
    if (new RegExp(`"${arr[i]}"`).test(item)) ++i;
    if (i === len) {
      const hasComma = /,/.test(item)
      PagesArr[index] = item.replace(new RegExp(`"${lastItem}"[\\s\\S]*:[\\s\\S]*`), `"${lastItem}": ${value}${hasComma ? '' : ''}`)
      break;
    }
  }

  Pages = PagesArr.join('\n')
}

// 配置appid
const config = require('./config.js');
replaceManifest('appid', config.config.appid)
replaceManifest('name', config.config.name)
replaceManifest('mp-weixin.appid', config.config.weixinAppid)
// 配置tabBar
replacePages('tabBar.list', JSON.stringify(config.config.list))

console.log(config.config.name + '配置成功,可以开始打包......')

fs.writeFileSync(manifestPath, Manifest, {
  "flag": "w"
})

fs.writeFileSync(pagesPath, Pages, {
  "flag": "w"
})

```

自己需要的配置可以写在`config.js` 中

```
var NODE_ENV = '项目A'
// var NODE_ENV = '项目B'

var config = {}

switch (NODE_ENV) {
  case '项目A':
    config = {
      title: '项目A', // 全局通用标题
      appid: '"__UNI__XXXX"', // 打包的appid
      weixinAppid: '"XXXXXX"',
      name: '"A"', // 应用名称
      list: [
      	{
      		"pagePath": "pages/index/index",
      		"iconPath": "static/tab/tab-member.png",
      		"selectedIconPath": "static/tab/tab-member-current.png",
      		"text": "我的"
      	},{
      		"pagePath": "pages/member/member",
      		"iconPath": "static/tab/tab-member.png",
      		"selectedIconPath": "static/tab/tab-member-current.png",
      		"text": "商户"
      	},{
      		"pagePath": "pages/activity/activity",
      		"iconPath": "static/tab/tab-member.png",
      		"selectedIconPath": "static/tab/tab-member-current.png",
      		"text": "活动"
      	}
      ]
    }
    break;
  case '项目B':
    config = {
      title: '项目B', // 全局通用标题
      appid: '"__UNI__XXXXXX"', // 打包的appid
      weixinAppid: '"xxxxxx"',
      name: '"B"', // 应用名称
      list: [
        {
          "pagePath": "pages/index/index",
          "iconPath": "static/tab/tab-member.png",
          "selectedIconPath": "static/tab/tab-member-current.png",
          "text": "我的"
        },{
          "pagePath": "pages/activity/activity",
          "iconPath": "static/tab/tab-member.png",
          "selectedIconPath": "static/tab/tab-member-current.png",
          "text": "活动"
        }
      ]
    }
    break;
  default:
    break;
}

module.exports = {
  config
}

```

> 运行或者发布之前，执行一下manifest.js文件

这上面，是使用hbuilder创建项目，可以这样弄，如果uni-app的项目是通过命令行来创建的，那就可以全自动化了，在命令中选择要启动的版本是哪个

命令行的配置和vue-cli模块化的配置是一样的，下次再一起学习

以上就是我对uni-app模块化打包的一些理解,如果文章由于我学识浅薄,导致您发现有严重谬误的地方,请一定在评论中指出,我会在第一时间修正我的博文,以避免误人子弟。

