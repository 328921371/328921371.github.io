---
title: axios封装
categories:
  - axios
tags:
  - axios
copyright: true
comments: true
abbrlink: 876a38c0
date: 2018-02-25 17:50:22
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> vue中也推荐使用axios来调数据

<!--more-->

新建一个axios.js文件

```
/* 配置axios拦截器 */
import axios from 'axios'
import router from '@/router'

// 创建axios实例
const service = axios.create({
  //baseURL: process.env.BASE_API, // api的base_url
  timeout: 60000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // 假如有Tn,就加入
  if (getToken()) {
    config.headers['tn'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  //console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(response => {
  /**
   * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
   * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
   */

  return response
}, error => {	
	var errorObj = {
		message: 'c1000',
		data: []
	}
	
	if (error && error.response) {
		switch (error.response.status) {
			case 400: errorObj.message = '(c1400)' ; break; // 请求错误
			case 401: errorObj.message = '(c1401)'; break; // 未授权
			case 403: errorObj.message = '(c1403)'; break; // 拒绝访问
			case 404: errorObj.message = '(c1404)'; break; // 请求出错
			case 408: errorObj.message = '(c1408)'; break; // 请求超时
			case 500: errorObj.message = '(c1500)'; break; // 服务器错误
			case 501: errorObj.message = '(c1501)'; break; // 服务未实现
			case 502: errorObj.message = '(c1502)'; break; // 网络错误
			case 503: errorObj.message = '(c1503)'; break; // 服务不可用
			case 504: errorObj.message = '(c1504)'; break; // 网络超时
			case 505: errorObj.message = '(c1505)'; break; // HTTP版本不受支持
			default: errorObj.message = `连接出错(${error.response.status})!`;  // 连接出错
		}
	}else{
		errorObj.message = '(c3289)'
	}
	
	Notice.error({
		title: '网络繁忙,请稍后再试' + errorObj.message,
		duration: 5
	});
  // Do something with request error
  //console.log(error) // for debug
  Promise.reject(error)
	return errorObj
})

export default service

```

在 store 中 新建一个 request.js

```
/* 请求后台接口数据模块*/
import request from '@/util/axios'

var state = {}

var mutations = {}

var getters = {}

var actions = {
  // action只接受一个参数,所以url与请求参数需要放在一个对象里面

  //post请求
  Post({ commit, state },obj){
    return new Promise((resolve, reject) => {
      request({
        url: obj.url,
        method: 'post',
        data: obj.PostData
      }).then(response => {
        resolve(response.data)
      })
    });
  },

  //get请求
  Get({ commit, state },obj){
    return new Promise((resolve, reject) => {
      request({
        url: obj.url,
        method: 'get',
        params: obj.PostData,
      }).then(response => {
        resolve(response.data)
      })
    });
  },
	
}

//将这些对象引入后导出到总的状态管理当中
export default {
  state,
  mutations,
  getters,
  actions
}

```

使用的时候直接派发

```
let sendMessage = {
  url: this.$api.List,
  PostData: {}
}
		
this.$store.dispatch('Post', sendMessage).then((data) => {
  
})
```

>可能遇到的问题

发送的数据后端收不到...

解决方案引入qs库

`npm install qs --save`

在main.js中

```
import qs from 'qs'
/* 注入vue全局中，这样我们可以在组件内或者JS内通过使用this.$qs来使用qs库*/
Vue.prototype.$qs = qs
```

使用的时候,用qs包裹住参数
```
 this.$qs.stringify(data)
```

问题解决了,我们来看一下是为什么

在之前公司做项目时，也是用axios发送的数据，且并未修改过什么东西，但是为什么现在后端接收不到我们的json类型的参数呢？

通过翻看axios的文档得知：在axios使用Post发送数据时，默认是直接把json放到请求体中提交到后端的，而后端获取数据的方式有两种，一种是@RequestParam（通过字符串中解析出参数）,另一种是@ResponseBody（从请求体中取参数），很显然，后端用了第一种方式。

那么，既然知道了原因，兄弟们，懒得改前端代码的话，就怼回去吧( ‵▽′)ψ