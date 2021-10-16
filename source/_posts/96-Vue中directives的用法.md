---
title: Vue中directives的用法
categories:
  - vue-cli
tags:
  - vue-cli
copyright: true
comments: true
abbrlink: 86a45be2
date: 2019-09-19 09:08:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 在Vue-cli总结的时候我就聊到了directives的用法,今天把它用在实战里面

<!--more-->

在main.js中 

```
/** 权限指令,对按钮权限的控制 **/
Vue.directive('has', {
  bind: function(el, binding) {
    if (!Vue.prototype.$_has(binding.value)) {
			setTimeout(()=>{
				el.parentNode.removeChild(el)
			},0)
    }
  }
})
// 权限检查方法（且把该方法添加到vue原型中）
Vue.prototype.$_has = function(value) {
  let isExist = false
  // 从浏览器缓存中获取权限数组（该数组在登入成功后拉取用户的权限信息时保存在浏览器的缓存中
	
	var buttonpermsStr = JSON.parse(sessionStorage.getItem('ButtonList'))
	// console.log(buttonpermsStr)
  if (buttonpermsStr === undefined || buttonpermsStr == null) {
    return false
  }
  if (buttonpermsStr.indexOf(value) >= 0) {
    // 若在按钮中定义的权限字段能在后端返回的权限数组中能找到，则该按钮可显示
    isExist = true
  }
  return isExist
}
```

用的时候在页面中写

`<Button v-has="'这里写需要判断的值'" type="primary" size="large" @click="AddListButton">新增</Button>`


以上就是我对Vue中directives用法的一些理解，如果文章由于我学识浅薄，导致您发现有严重谬误的地方，请一定在评论中指出，我会在第一时间修正我的博文，以避免误人子弟。
