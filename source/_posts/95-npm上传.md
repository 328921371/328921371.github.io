---
title: npm上传自定义vue组件
categories:
  - npm
tags:
  - npm
copyright: true
comments: true
abbrlink: d21bd678
date: 2019-09-18 13:15:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 很久之前就想把自己的组件抽离出来,作成一个单独的组件上传到npm中,今天来记录一下

<!--more-->

### 新建项目

虽然是用vue-cli搭的项目,当我们上传组件的时候就不在原来的项目上做了,新建一个项目来弄

`vue init webpack-simple ruler(项目名)`

项目的基本结构如下

![项目结构图](https://csblogimage.oss-cn-hangzhou.aliyuncs.com/95-rule.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,size_16,text_Qnku6ZmI5YWI55Sf55qE5bCP5YmN56uv,color_FFFFFF,shadow_50,t_100,g_se,x_10,y_10)

### 本地调试

在App.vue中直接引入本地的组件

```
  import ruler from './page/ruler.vue'
```

本地调试有一个要注意的地方,`webpack-simple`的项目,在index.html默认引入一个`<script src="/dist/build.js"></script>`

这里的名字与你打包之后的js名字不一样的话,需要修改


### 改造成vue插件

在组件的文件夹下创建一个index.js文件

这个文件作用是将组件导出

```
// 引入组件
import CsingRuler from './ruler.vue'

CsingRuler.install = Vue => Vue.component(CsingRuler.name, CsingRuler); //这里的name是.vue文件里面定义的

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(CsingRuler);
}

export default CsingRuler

```

在与APP.vue同级下创建一个index.js的文件(一个包下可能有多个组件)

导入刚刚写好的index.js组件

```
// 写好的组件
import CsingRuler from './page/index.js';

const components = [
  CsingRuler,
]

const install = function(Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component); //到时候项目使用组件名,就是这个component.name
  })
}

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  CsingRuler,
}
```

### 修改package.json文件

```
{
  "name": "cs-ruler", //模块名,不能重复
  "description": "刻度尺组件",
  "version": "1.0.4", //版本号,每次要更新
  "author": "chensheng",
  "license": "MIT", // 开源协议
  "private": false, // 因为组件包是公用的，所以private为false
  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack-dev-server --open --hot",
    "build": "cross-env NODE_ENV=production webpack --progress --hide-modules"
  },
  "main": "dist/csingruler.js", // 配置main结点，如果不配置，我们在其他项目中就不用import XX from '包名'来引用了，只能以包名作为起点来指定相对的路径
  "dependencies": {
    "vue": "^2.5.11"
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ],
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-preset-env": "^1.6.0",
    "babel-preset-stage-3": "^6.24.1",
    "better-scroll": "^1.15.2",
    "cross-env": "^5.0.5",
    "css-loader": "^0.28.7",
    "file-loader": "^1.1.4",
    "less": "^3.9.0",
    "less-loader": "^5.0.0",
    "vue-loader": "^13.0.5",
    "vue-template-compiler": "^2.4.4",
    "webpack": "^3.6.0",
    "webpack-dev-server": "^2.9.1"
  },
  // 指定代码所在的仓库地址
  "repository": {
    "type": "git",
    "url": "git+https://github.com/328921371/ruler.git"
  },
  // bug在哪里提
  "bugs": {
  	"url": "https://github.com/328921371/ruler/issues"
  },
  // 项目官网的地址
  "homepage": "https://github.com/328921371/ruler#readme",
   // 指定打包后,包中存在的文件夹
  "files": [
    "dist",
    "src"
  ],
  // 指定关键词
  "keywords": [
    "vue",
    "ruler"
  ]
}

```

### 修改.gitignore文件

因为要用dist文件夹，所以在.gitignore文件中把dist/去掉。最后长这样

```
.DS_Store
node_modules/
npm-debug.log
yarn-error.log

# Editor directories and files
.idea
*.suo
*.ntvs*
*.njsproj
*.sln

```

### 修改webpack.config.js文件

主要还是改输出部分,打包成自己想要的js文件

```
output: {
  path: path.resolve(__dirname, './dist'),
  publicPath: '/dist/',
  filename: 'csingruler.js',
  library: 'csingruler',
  libraryTarget: 'umd',
  umdNamedDefine: true
},
```

### 本地打包

npm run build

npm pack

然后在本地生成一个cs-ruler-1.0.1.tgz的包

### 发布到npm上(注意镜像地址要指向npm的地址)

`npm login`

登录自己的npm账号,输入姓名,密码,邮箱

然后注意一下返回的字段

`Logged in as 你的名字 on https://registry.npmjs.org/.`

这样说明是登录成功的

如果是`Logged in as 你的名字 on https://registry.npm.taobao.org/.`

说明你登录的是淘宝的镜像..后面提交会报403的错误

可以输入一下命令查看当前的登录源：`npm config get registry`

淘宝源，需要切回到npmjs源，输入以下命令： `npm config set registry=http://registry.npmjs.org`

最后再 npm publish 一下就可以了

### 后话

这个[刻度尺组件](https://www.npmjs.com/package/cs-ruler?activeTab=dependencies)就是我打包上传的组件,有需要的可以安装使用


以上就是我对npm上传vue组件的一些理解，如果文章由于我学识浅薄，导致您发现有严重谬误的地方，请一定在评论中指出，我会在第一时间修正我的博文，以避免误人子弟。
