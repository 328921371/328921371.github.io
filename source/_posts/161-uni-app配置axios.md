---
title: uni-app配置axios
categories:
  - uniApp
tags:
  - uniApp
copyright: true
comments: true
abbrlink: 218c72a8
date: 2022-11-12 13:14:23
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> axios我们都使用过，怎么在uni-app中使用呢

<!--more-->

uni-app的官网提供了 `uni.request` 作为请求网络的API，但是我们如果习惯了使用axios，那就要在uni-app中引入了

首先，在项目中引入 axios的包是必不可少的 `npm install` 安装即可

然后在工具包中新建一个`request.js`的文件，用来封装我们的axios

```
import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 60000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use((config) => {
    try{
      config.data = JSON.parse(config.data)
    }catch(e){
      //TODO handle the exception
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
(response) => {
    return new Promise((resolve, reject) => {
      const res = response.data 
      // 正常数据返回
      resolve(response.data)
    })
  },
  (error) => {
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
      default: errorObj.message = `连接出错(${error.response.status})!` // 连接出错
      }
    }else{
      errorObj.message = '(c3289)'
    }
    uni.hideToast();
    uni.showToast({
      title: '网络繁忙,请稍后再试',
      duration: 2000,
      icon: 'none'
    });
    Promise.reject(error)
    return errorObj
  }
)
//用来适配uniapp的语法
axios.defaults.adapter = function(config) {
	return new Promise((resolve, reject) => {
		var settle = require('axios/lib/core/settle');
		var buildURL = require('axios/lib/helpers/buildURL');
		uni.request({
			method: config.method.toUpperCase(),
			url: buildURL(config.url, config.params, config.paramsSerializer),
			// url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: config.sslVerify,
			complete: function complete(response) {
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.errMsg,
					header: response.header,
					config: config
				};
				settle(resolve, reject, response);
			}
		})
	})
}

export default service

```

> 踩坑! ! ! 一开始以为和vue一样使用,直接引入axios后,就可以开始请求接口,接口一直报错,百度后找到了解决办法

其实看上半部分，和vue中配置的很像，但是最重要的就是下面那个用来适配uniapp的语法的函数

然后把文件在`main.js`中引入

```
import axios from './common/request.js'
Vue.prototype.$axios = axios;
```

页面中就可以开始使用啦

```
  this.$axios.request({
    url: https://xxx.com,
    method: 'POST',
    data: {}
  }).then(response => {});
```

以上就是我对uni-app配置axios的一些理解,如果文章由于我学识浅薄,导致您发现有严重谬误的地方,请一定在评论中指出,我会在第一时间修正我的博文,以避免误人子弟。

