---
title: uni-app使用echart
categories:
  - uni-app
tags:
  - uni-app
copyright: true
comments: true
abbrlink: 51df15d8
date: 2021-11-02 20:31:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> echart我们在web端都使用过很多次了,看看在uni-app的项目中要怎么使用echart

<!--more-->

uni-app推荐使用uchart,但是个人认为没有echart的功能多,所以还是想要用echart来实现

一开始的时候,我以为和web端一样,正常的引入进来就可以使用了,打开浏览器调试一下,完美,真机运行发现,一片空白

百度之后发现,运行的平台不一样,渲染层也不同,所以针对不同的运行环境,需要不同的方法

上代码

```
<template> 
  <view class="trend-box" style="height: 415rpx;">
      <!-- #ifdef  MP-WEIXIN -->
      <uniEcCanvas class="uni-ec-canvas" :force-use-old-canvas="true" canvas-id="multi-charts-bar" :ec="dealEc"></uniEcCanvas>
      <!-- #endif -->
      <!-- #ifdef H5||APP-PLUS -->
      <h5echart style="height: 100%" :option="dealEc.option"></h5echart>
      <!-- #endif -->
  </view>
</template> 
<script>
	import uniEcCanvas from '@/components/uni-ec-canvas/uni-ec-canvas'
  import h5echart from '@/components/h5-echart/echarts.vue'
	export default {
		components: {
			uniEcCanvas,
      h5echart
		},
  }
</script>
```

> 用法和echart一样的,需要注意的是,一个入参传入option,一个传入整个数据


### ec-canvas

这个组件是为了适配小程序的

首先，下载 GitHub 上的 [ecomfe/echarts-for-weixin](https://github.com/ecomfe/echarts-for-weixin%5D) 项目。

ec-canvas 目录下有一个 echarts.js，可以改成自己需要的。

### h5-echart

因为APP上没有办法操作dom,所以需要设置 script 节点的 lang 为 renderjs,在视图层操作dom

大致的用法如下

```
<script module="echarts" lang="renderjs">
    let myChart
    export default {
        mounted() {
            if (typeof window.echarts === 'function') {
                myChart = echarts.init(document.getElementById('echarts'))
                // 观测更新的数据在 view 层可以直接访问到
                myChart.setOption(this.option)
            } else {
                // 动态引入较大类库避免影响页面展示
                const script = document.createElement('script')
                // view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
                script.src = 'static/echarts.js'
                //script标签的onload事件都是在外部js文件被加载完成并执行完成后才被触发的
                script.onload = ()=>{
                    myChart = echarts.init(document.getElementById('echarts'),)
                    myChart.setOption(this.option)
                }
                document.head.appendChild(script)
            }
        },
        methods: {
            
        }
    }
</script>
```

这两个插件上百度搜都有,没有找到的,可以去我的网盘上下载

链接: https://pan.baidu.com/s/12jNg3Qs53Gl1PcNFGyFUlA 

是我对uni-app使用echart的一些理解,如果文章由于我学识浅薄,导致您发现有严重谬误的地方,请一定在评论中指出,我会在第一时间修正我的博文,以避免误人子弟。