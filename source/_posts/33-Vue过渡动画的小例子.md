---
title: Vue过渡动画的demo
categories:
  - Vue
tags:
  - Vue
copyright: true
comments: true
abbrlink: 8bf717f6
date: 2017-05-10 16:50:02
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 上一篇的博客写了Vue的过渡动画，今天写几个小demo来实践一下

<!--more-->

demo实现三原色的配比，废话不多说，直接上代码,复制可以直接使用

```javascript
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>取色</title>
		<script src="https://unpkg.com/vue"></script>
		<style type="text/css">
			body{
				text-align: center;
			}
			#colordiv{
				width: 500px;
				height: 500px;
				margin: 0 auto;
			}
			input[type=range] {
			    -webkit-appearance: none;
			    width: 400px;
			    border-radius: 10px; /*这个属性设置使填充进度条时的图形为圆角*/
			}
			input[type=range]::-webkit-slider-runnable-track {
			    height: 15px;
			    border-radius: 10px; /*将轨道设为圆角的*/
			    box-shadow: 0 1px 1px #def3f8, inset 0 .125em .125em #0d1112; /*轨道内置阴影效果*/
			}  
			input[type=range]:focus {
			    outline: none; 
			    /*滑动时去掉外边框*/
			}
			input[type=range]::-webkit-slider-thumb {
			    -webkit-appearance: none;
			    height: 25px;
			    width: 25px;
			    margin-top: -5px;/*使滑块超出轨道部分的偏移量相等*/
			    background: #ffffff;
			    border-radius: 50%; /*外观设置为圆形*/
			    border: solid 0.125em rgba(205, 224, 230, 0.5); /*设置边框*/
			    box-shadow: 0 .125em .125em #3b4547; /*添加底部阴影*/
			}
		</style>
	</head>
	<body>
		<div id="app">
			<div id="colordiv" :style="color"></div>
			<br /><br />
			红色配比:{{ Math.floor( hong / 255 * 100) }}%<input v-model="hong" type="range" name="range" id="range" value="hong" max="255" step="1" :style="redcolor" />
			<br /><br />
			绿色配比:{{ Math.floor( lv / 255 * 100) }}%<input v-model="lv" type="range" name="range" id="range" value="lv" max="255" step="1" :style="lvcolor"/>
			<br /><br />
			蓝色配比:{{ Math.floor( lan / 255 * 100) }}%<input v-model="lan" type="range" name="range" id="range" value="lan" max="255" step="1" :style="lancolor"/>
		</div>
	</body>
	<script type="text/javascript">
		
		var div = document.getElementById('colordiv');		
		
		var app = new Vue({
			el:'#app',
			data:{
				hong:0,
				lv:0,
				lan:0,
				color:{
					background:'black'
				},
				redcolor:{
					background: '-webkit-linear-gradient(red,red) no-repeat',
					backgroundSize:' 0% 100%'
				},
				lvcolor:{
					background: '-webkit-linear-gradient(green,green) no-repeat',
					backgroundSize:' 0% 100%'
				},
				lancolor:{
					background: '-webkit-linear-gradient(blue,blue) no-repeat',
					backgroundSize:'0% 100%'
				}
			},
			methods:{
				
			},
			computed:{
				change(){
					this.color.background = "rgb(" + Number(this.hong) + ","+ Number(this.lv) +","+ Number(this.lan) +")";
					this.redcolor.backgroundSize = Math.floor( this.hong / 255 * 100) + '% 100%';
					this.lvcolor.backgroundSize = Math.floor( this.lv / 255 * 100) + '% 100%';
					this.lancolor.backgroundSize = Math.floor( this.lan / 255 * 100) + '% 100%';
				}
			},
			updated(){
				this.change
			}
			
		})
		
	</script>
</html>
```


这个demo实现81个单元格随机变化位置，样式,使用到lodash库

```javascript
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Vue</title>
		<meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no">
		<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
		<script src="https://unpkg.com/vue"></script>
		<!-- 导入 lodash库-->
		<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js"></script>
		<style type="text/css">
			.list-box {
				width: 540px;
				height: 540px;
				margin: 0 auto;
				margin-top: 30px;
			}
			
			.list-box span {
				display: inline-block;
				float: left;
				border: 1px solid #ccc;
				width: 59px;
				height: 59px;
				margin-left: -1px;
				margin-top: -1px;
				text-align: center;
				line-height: 59px;
			}
			/* 平移动画 */
			
			.list-move {
				transition: all 1s linear;
			}
		</style>
	</head>

	<body>
		<div id="app">
			<button @click="shuffle">打乱</button>
			<transition-group name="list" tag="div" class="list-box">
				<span v-for="num in nums" :key="num" :style="{background: colors[num]}">{{num + 1}}</span>
			</transition-group>
		</div>
	</body>
	<script type="text/javascript">
		var app = new Vue({
			el: '#app',
			data: {
				message: 'Hello Vue!',
				nums: new Array(81).fill(1).map((v, i) => i),
				colors: []
			},
			methods: {
				shuffle() {
					this.nums = _.shuffle(this.nums)
				}
			},
			created() {
				// 修改颜色
				this.colors = new Array(81).fill(1).map(() => {
					var r = Math.floor(Math.random() * 128 + 128)
					var g = Math.floor(Math.random() * 128 + 128)
					var b = Math.floor(Math.random() * 128 + 128)
					return `rgb(${r},${g},${b})`
				})
			},
			mounted() {
				console.log(this.colors);
				setInterval(() => {
					this.shuffle()
				}, 2000)
			}
		})
	</script>

</html>
```

