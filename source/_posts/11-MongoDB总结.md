---
title: MongoDB 的安装与使用
categories:
  - MongoDB
tags:
  - MongoDB
copyright: true
comments: true
abbrlink: 8fa9b9b9
date: 2016-12-10 17:13:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

>最近准备研究一下非关系型数据库 MongoDB,其实官网等一下介绍的也挺详细的,我在这里介绍一下 MongoDB的安装及基本的使用,还有安装在win10系统上踩过的坑

<!--more-->

### 下载

下载就到官网上下载就可以了[MongoDB下载地址](https://www.mongodb.com/download-center#community)

### 配置mongoDB数据库

先安装之前下载好的mongoDB.根据提示选择安装就可以了

启动数据库

* 创建一个文件夹，作为数据库存放目录(文件夹位置不限),推荐放在bin目录底下，比较好找.
* 打开cmd,cd到mongoDB/bin中。
* 执行 mongod.exe --dbpath "数据库目录（该目录为第一项创建的目录）"  端口号：27017

连接数据库。(需要打开windows自带服务功能：.netframework)

mongo.exe是mongoDB自带的数据库连接查看工具.使用mongo.exe可以自动连接mongo数据库。

使用mongo数据库

* 打开新的终端窗口，原窗口不要关闭
* cd到bin目录中去
* 执行mongo命令，可以直接连接mongo数据库

到这里就可以在你的命令行中使用MongoDB数据库啦

### 常用命令
1. show dbs 查看数据库

2. use h5-7  使用数据库，如果没有就新建并且切换

3. db.dorpDatabase() 删除数据库--前提是先进入当前的数据库中

4. db.createCollection("test") 创建表，这个命令不常用(也可以通过 db.表名.insert() 使用表时，如果不存在，会创建)

5. show collections  展示表

6. db.people.insert({name:'小黄'})  创建表，并且插入一条数据

7. db.people.save({name:'小黄'}) 这样也可以插入数据

8. db.people.find() 查询某个表中所有数据

9. db.people.count() 查询条数

10. db.people.find({age:25}) 插入查询条件

11. db.people.find({age:{$lt:25}}) 查询大于(gt)或者小于

12. db.people.find({age:{$lte:25}}) 查询大于等于($gte)或者小于等于

13. db.people.find({age:{$ne:25}}) 除了他本身的

14. db.people.find({age:22,name:'小黑'}) 查询符合所有条件的数据

15. db.people.find({$or:[{age:22},{name:'小黄'}]});查询符合任意一个条件的数据

16. 查询条件支持正则表达式：

	db.people.find({name:/四/})             查找姓名包含：四 的人
	
	db.people.find({name:/^张/})            查找姓 张 的人
	
	db.people.find({name:/^张.$/})          查找姓 张 的人并且不能以空格结束
	
	db.people.find({},{name:1,_id:0})       只查找name这一列（field）

17. db.people.sort({排序的键:1或-1}) 把查询结果按照某个字段进行排序。1为升序，-1为降序
 
18. db.people.find().sort({age:1}).limit(n)  从查询结果中取前n条数据。

19. db.people.find().sort({age:1}).skip(n)  跳过(删除)查询结果中前n条数据。

20. db.people.find().skip(n).limit(n) 可以实现从第几条开始，往后查多少条。

21. db.people.update({查询条件},{$set:{修改内容}})  

	例:把姓名为：小黄 的年龄改为：18	

	db.people.update({name:'小黄'},{age:18})  不太理想 这样只能修改age一个值
	
	db.people.update({name:'小黄'},{$set:{age:18}})  可以采用，可以添加多个对象进行修改
	
22. db.people.remove({查询条件})

	db.people.remove({name:'张三'}) //删除表中满足条件的数据。

	db.people.remove({_id:ObjectId("5805c346574a5365e955ecd9")})  //一般用id删除数据，更加精确和准确

### 使用代码控制数据库

之前讲的都是在命令行对数据库进行操作,那么如何在代码js页中链接数据库进行数据处理呢?

首先先导入导入 mongoose 模块

```javascript
	var mongoose = require('mongoose')
```

然后设置链接数据库地址，csing为数据库的名字，没有这个数据库就会自动创建

```javascript
	mongoose.connect('mongodb://localhost:27017/csing');
```

开始链接数据库

```javascript
	var db = mongoose.connection;
```

监听数据库链接的状态：成功 ：open 失败：error

```javascript
	db.on('open',function(){
		console.log('数据库链接成功')
	})
	db.on('error',function(){
		console.log('数据库链接失败')
	})
```

获取schema对象(图表结构对象)，这里的Schema是一个构造函数

```javascript
	var Schema = mongoose.Schema;
```

创建一个数据结构(参数1：集合的结构  参数2：集合的名字,参数1中需要什么值，就传入什么值)

```javascript
	var userSchema = new Schema({
	name:String,
	psw:Number
	},{collection:'cssss'});
```

根据数据集合 userSchema, 获取一行数据的构造函数
var User = mongoose.model('csing',userSchema);

以下是增删改查的操作:

#### 增加:

```javascript
	app.get('/add',function(req,res){
		var user = new User({name:req.query.name,age:req.query.age})//根据 User 构造函数 ，创建一个 user 对象
		//有数据了，但是没有保存，下一步要保存
		user.save(function(err,data,status){//status 1 为成功
			if(!err){
				res.send('保存成功');
			}
			else{
				res.send('保存失败');
			}
		});
	});
```

#### 查询:

查询有两种方法 find()findOne()

User.find({这里的括号写查询的条件})  只要满足条件，都能查到

User.findOne()只查找一个，从第一个开始找，找到一个就结束

模糊查询 通过name：{$regex:关键字}实现模糊查询 

```javascript
	app.get('/select',function(req,res){
		if(req.query.name){ //有条件查询，如果需要什么条件，可以在最后打点
			User.find({name:req.query.name},function(err,data){
				if(!err && data.length>0){	//这里一定要主要，err不一定报错 ，所以建议用data.length>0
					res.send(data);//查询成功
				}
			});
		}
		else{
			User.find(function(err,data){//无条件插件，查询出全部内容
				if(!err){
					res.send(data);//查询成功
				}
			});
		}
	})
```

#### 修改:

multi: 是否修改多条 true为全部修改

```javascript
	app.get('/update', function(req, res) {
		//将名字为req.query.name 的     age  改为 req.query.age
		User.update({name: req.query.name}, {age: req.query.age}, {multi: true}, function(err, result) {
			if(!err) {//如果数据库中没有修改的值，加上判断	
				if(result.nModified > 0) {
					res.send('修改成功');
				} else {
					res.send('修改的值一致');
				}
			} else {
				res.send('修改失败');
			}
		})
	})
```

#### 删除

假设我们删除年龄最大的

```javascript
	app.get('/remove', function(req, res) {
		User.find(function(err, data) {//第一步 先找到年龄最大的
			var obj = data[0]//找到最大的，获取到数组的第一个
			User.remove({
				_id: obj._id
			}, function(err) {
				if(!err) {
					res.send('删除年龄最大的成果')
				}
			})
		}).sort({
			age: -1
		}).limit(1);
	})
```

以上就是数据库基本的增删改查的操作了,如有错误,欢迎各位大牛指出
