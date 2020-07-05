---
title: vuex模块化封装
categories:
  - Vue
tags:
  - Vue
copyright: true
comments: true
abbrlink: 174581a
date: 2018-02-27 10:47:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 之前已经写过vuex的相关知识了,模块化操作也说了一点,但是感觉过于的繁琐,于是学着electron-vue那样封装了一层

<!--more-->

之前的模块化封装,每一个文件,都要在index中写一次导入,太过于麻烦,于是封装了一下


首先在根目录下创建一个story,里面的结构是这样的

story
  |--modules
      |--index.js
  |--index.js


最外面的index.js内容: 

```
import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules
})

```

这样会默认导入modules中的index.js

重点就在里层的index.js了

```
/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */

const files = require.context('.', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
  if (key === './index.js') return
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default modules

```

> 这么写,他会默认去找所有路径底下除了index.js的其他js文件,然后将名字作为文件名输出出来,就不用我们一个个写了


使用的时候就在modules文件中新建一个.js,然后正常使用

```
var state = {}

var mutations = {}

var getters = {}

var actions = {}

//将这些对象引入后导出到总的状态管理当中
export default {
  state,
  mutations,
  getters,
  actions
}

```


以上就是我对vuex模块化封装的一些理解，如果文章由于我学识浅薄，导致您发现有严重谬误的地方，请一定在评论中指出，我会在第一时间修正我的博文，以避免误人子弟。