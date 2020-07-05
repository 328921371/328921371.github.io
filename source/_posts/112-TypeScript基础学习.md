---
title: TypeScript基础学习
categories:
  - TypeScript
tags:
  - TypeScript
copyright: true
comments: true
abbrlink: 65c0b936
date: 2019-12-16 17:52:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> TypeScript现在已经越来越受到前端的使用了,和ECMAScript 6一样,慢慢的普及开来了

<!--more-->

TypeScript和其他的区别和好处在哪里我就不说了,既然选择学习它,就一定有它的优点

本篇学习技术胖的视频...谢谢大佬的分享

### 安装和配置

命令窗口打开 

1. 安装插件: npm install typescript -g

2. 初始化项目: 进入你的编程文件夹后,可以使用npm init -y来初始化项目,生成package.json文件。

3. 创建tsconfig.json文件: 在终端中输入tsc --init

默认情况下,tsc会使用默认的编译配置编译目录中的所有.ts文件。通过书写tsconfig.json,我们可以配置tsc的编译行为,达到想要的结果：

```
{
  "compilerOptions": {
    "module": "commonjs",   //指定生成哪个模块系统代码
    "target": "es5",        //目标代码类型
    "noImplicitAny": false, //在表达式和声明上有隐含的'any'类型时报错。
    "sourceMap": false,     //用于debug   
    "rootDir":"./src",      //仅用来控制输出的目录结构--outDir。
    "outDir":"./build",     //重定向输出目录。   
    "watch":true            //在监视模式下运行编译器。会监视输出文件,在它们改变时重新编译。
  },
  "include":[
    "./src/**/*"
  ],
  "exclude":[
    "views",
    "static"
  ]
}
```

4. 安装@types/node:  npm install --save-dev @types/node,这个主要是解决模块的声明文件问题。

5. 写完ts文件,可以使用tsc Hello.ts 转化成 Hello.js,也可以在Vscode的任务菜单下,打开运行生成任务,然后选择tsc：构建-tsconfig.json


到此准备工作都已经做完了,现在开始正式的写ts

### 变量类型

TypeScript最大的一个特点就是变量是强类型的,也就是说,在声明变量的时候,我们必须给他一个类型。所以我们先来看一下有哪些类型

TypeScript中的数据类型有：

* Undefined : 未定义;
* Number:数值类型;
* string : 字符串类型;
* Boolean: 布尔类型；
* enum：枚举类型；
* any : 任意类型,一个牛X的类型；
* void：空类型；
* Array : 数组类型;
* Tuple : 元祖类型；
* Null ：空类型。

我们先来看一下怎样声明一个变量

普通的是这样的 `var name = 'csing' `

TypeScript声明时需要一个类型 `var name:string = 'csing'`

和vue组件中prop的概念有点类似,提前定义好变量类型

一些我们常用的变量类型就不说了,说一下上面我们不经常用到的几个类型


#### enum类型

枚举类型,我们用的比较少,什么场景下使用呢?有很多值是多个并且是固定的,比如：

一年的季节：春、夏、秋、冬 有四个结果。

```
enum JiJie{c,x,q,d}
console.log(JiJie.c) // 返回0,类似数组索引

// 也可以进行赋值
enum JiJie{
  c= '春',
  x= '夏',
  q= '秋',
  d= '冬'
}
console.log(JiJie.c) // 返回'春'这个字
```

#### any类型

既然ts需要提前定义好变量类型,为什么又要有any类型呢

因为一个写惯了前端的人,有时候不自觉的就分不清类型了。
这是个不好的习惯,也是前端的痛,就因为这个原因,JavaScript也多次被人诟病说大型项目不适合用JavaScript。
但是习惯一旦养成,改是需要时间和磨练的。TypeScript友好的为我们提供了一种特殊的类型any,比如我们在程序中不断变化着类型,又不想让程序报错,这时候就可以使用any了。


#### Tuple类型

元祖是一种特殊的数组,元祖类型允许表示一个已知元素数量和类型的数组,各元素的类型不必相同。
比如,你可以定义一对值分别为string和number类型的元祖。元祖在实际开发中使用的非常少,大家了解一下就可以了,不做过多介绍。
```
//声明一个元祖类型
let x : [string,number]
//正确的初始化
x = ['hello',10]
//错误的初始化方法
x = [10,'hello']
```

#### void类型

一般是用在函数里面的,学习过java的同学应该比较熟悉,当函数没有返回值的时候,就要定义一个void



### TypeScript的函数声明

函数的声明需要注意以下几点

1. 声明(定义)函数必须加 function 关键字
2. 函数名与变量名一样,命名规则按照标识符规则
3. 函数参数可有可无,多个参数之间用逗号隔开
4. 每个参数参数由名字与类型组成,之间用分号隔开
5. 函数的返回值可有可无,没有时,返回类型为 void
6. 大括号中是函数体。

举个例子,我要创建一个函数,来说明自己几岁

```
function speckAge(age:number):string{
  return '我现在'+age+'岁了' 
}
var age:number = 18
var result:string = speckAge(age)
console.log(result)
```

> 在函数调用的时候,我们需要按照形参的规则传递实参,有几个形参就要传递几个实参,并且每一个实参的类型要与对应的形参类型一致。

什么是形参? 函数定义的时候写的参数是形参。
什么是实参? 调用函数时传递的具体值就是实参。

#### 函数参数形式

TypeScript的函数参数是比较灵活的,函数的形参分为:可选形参、默认形参、剩余参数形参等。

##### 可选参数

可选参数,就是我们定义形参的时候,可以定义一个可传可不传的参数。这种参数,在定义函数的时候通过?标注。

`function speckAge(age:number,name?:string):string{}`

当name没有值传入的时候,会给一个默认是undefined


##### 默认参数

默认参数就更好理解了,就是我们不传递的时候,他会给我们一个默认值,而不是undefined了。

`function speckAge(age:number = 18,name?:string = 'csing'):string{}`

当没有值传入时使用默认值,当有值传入时,优先使用实参

##### 剩余参数

有时候我们有这样的需求,我传递给函数的参数个数不确定。例如：我要介绍自己很多兴趣。这时候你不能限制我,我要随心所欲。

剩余参数就是形参是一个数组,传递几个实参过来都可以直接存在形参的数组中。

```
function interest(...qui:string[]):string{
  let yy:string = '我喜欢'
  for(let key in qui){
    yy = yy + qui[key]
    if(parseInt(key) < qui.length - 1){
      yy=yy+'、'
    }
  }
}
var result:string  =  interest('唱','跳','rap','篮球','Music')
```

### 函数的三种声明方式

其实原理和我们之前的差不多

* 函数声明法

```
function add(n1:number,n2:number):number{
    return n1+n2
}
```

* 函数表达式法 ,声明了必须使用

```
var add2 = function(n1:number,n2:number):number{
    return n1+n2
}
```

* 箭头函数

```
var add3 = (n1:number,n2:number):number=>{
    return n1+n2
}
```

和之前的不同就是声明的时候需要定义好变量类型


### 函数中变量的作用域

这个和js的一样,没什么好说的,函数已经都介绍完了,接下来说一下数组

### 数组

声明数组的方法和我们之前差不多,区别在于声明数组的时候需要定义数组内的变量格式

```
let arr1:number[]     //声明一个数值类型的数组
let arr2:Array<string>  //声明一个字符串类型的数组
```

字面量赋值法: 

```
//定义一个数组时，直接给数组赋值
let arr2:number[] = [1,2,3,4,5]
//定义数组 的同事给数组赋值
let arr3:Array<string> = ['随便','一个','单词']
let arr4:Array<boolean> = [ true,false,false]

// 声明了什么类似,只能用这个类型
```

构造函数赋值法:

```
let arr1:number[] = new Array()
let ara2:number[] = new Array(1,2,3,4,5)
let arr3:Array<string> = new Array('随便','一个','单词')
let arr4:Array<boolean> = new Array(true,false,false)
```

### 字符串

```
let str1:string = '一个字符'
let str2:String = new String("另一个字符")
```

用法和js的一样,获取字符串长度,截取什么的

### 日期

```
let d:Date = new Date()
```

其他用法和js一样


### 正则表达式声明

创建正则表达式也提供了两种方法，一种是才采用new 关键字，另一种是采用字面量的方式。

```
// 构造函数法
let reg1:RegExp = new RegExp("csing")  //表示字符串规则里含有csing
let reg2:RegExp = new RegExp("csing",'gi')

// 字面量创建
let reg3:RegExp = /csing/
let reg4:RegExp = /csing/gi
```

#### RegExp常用方法

RegExp对象包含两个方法：test( )和exec( ),功能基本相似，用于测试字符串匹配。

test(string) ：在字符串中查找是否存在指定的正则表达式并返回布尔值，如果存在则返回 true，不存在则返回 false。
exec(string) : 用于在字符串中查找指定正则表达式，如果 exec() 方法执行成功，则返回包含该查找字符串的相关信息数组。如果执行失败，则返回 null。


### 类的声明和使用

关于类,在ES6中也有提到过,今天再学习一下类的使用

```
class CaiXuKun{
  name:string;
  age:number;
  constructor(name:string,age:number){
    this.name = name
    this.age = age 
  }
  say(){
    console.log('大家好,我是菜虚鲲')
  }
}
let kun:CaiXuKun = new CaiXuKun('菜虚鲲',18)
console.log(kun)
kun.say()
```

我们先用class关键字声明了一个类，并在里边声明了name和age属性。constructor为构造函数。构造函数的主要作用是给类中封装的属性进行赋值。

使用和定义类其实很简单，关键是理解类的思想。要有抽象逻辑的能力，这样才能复用和增强维护性。


#### 类的修饰符

TypeScript语言和后端的很像，类中属性的访问可以用访问修饰符来进行限制。访问修饰符分为：public、protected、private。

* public:公有修饰符，可以在类内或者类外使用public修饰的属性或者行为，默认修饰符。
* protected:受保护的修饰符，可以本类和子类中使用protected修饰的属性和行为。
* private : 私有修饰符，只可以在类内使用private修饰的属性和行为。

直接在代码中说话,还是刚刚那个代码

```
class CaiXuKun{
  public sex:string
  protected name:string
  private age:number
  public constructor(sex:string,name:string,age:number){
    this.sex=sex
    this.name=name
    this.age=age
  }
  public sayHello(){
    console.log('我的鲲们,你们好')
  }

  protected sayLove(){
    console.log('老虎油')
  }
}
let kun:CaiXuKun = new CaiXuKun('女','菜虚鲲',18)

console.log(kun.sex)
console.log(kun.name)   //报错
console.log(kun.age)    //报错
kun.sayHello()
kun.sayLove()    //报错
```

> public是都可以使用的,protected只能自己本类或者后面继承的子类可以使用,private只能自己本类使用


还有一个修饰符叫作只读修饰符,用的比较少,有点类似const

```
class Man{
  public readonly sex:string = '男'
}

var man:Man = new Man()
man.sex='女' //报错
```

### 类的继承和重写

#### 类方法继承

类的继承和ES6的相类似

首先创建一个父类

```
class CaiXuKun{
  public name:string
  public age : number
  public skill: string
  constructor(name:string,age:number,skill:string){
    this.name = name
    this.age = age
    this.skill = skill
  }
  public interest(){
    console.log('我是两年半的练习生')
  }
}

let cxk:CaiXuKun = new CaiXuKun('菜虚鲲',18,'唱,跳,rap,篮球,music')
cxk.interest()
```

这时候准备继承一下这个类,子类有父类所有的特点

```
class KunKun extends CaiXuKun{
  public xingxiang:string = '娘娘腔'
  public jineng(){
    console.log('人家用小拳拳打你胸口')
  }
}

let kk = new KunKun('菜虚鲲',18,'唱,跳,rap,篮球,music')
kk.interest()
kk.jineng()
```

#### 类方法重写

重写就是在子类中重写父类的方法

```
class KunKun extends CaiXuKun{
  public xingxiang:string = '娘娘腔'
  public interest(){
    super.interest()
    console.log('鸡你太美')
  }
  public jineng(){
    console.log('人家用小拳拳打你胸口')
  }
} 
```

重写过后,再调用`interest`这个方法,会将两个都输出出来

类的基础学习大概就这么多啦

### 接口

在通常情况下，接口是用来定义一些规范，使用这些接口，就必须实现按照接口中的规范来走。

定义接口的关键字是`interface`

```
interface KunKun {
  sex:string
  interest:string
}
let cxk:KunKun ={ sex:'女',interest:'鸡你太美'}
console.log(cxk)
```

如果有一些参数是可传可不传的,可以用?代替

```
interface KunKun {
  sex:string
  interest:string
  music?:Boolean
}
let cxk:KunKun ={ sex:'女',interest:'鸡你太美',music:true}
```


#### 规范函数类型接口

我们还可以使用接口来规范函数类型的接口，我们需要哪些资源，在函数中进行匹配，最后返回是否匹配成功。

```
interface  SearchMan{
    (source:string,subString:string):boolean
}

let mySearch:SearchMan

mySearch = function(source:string,subString:string):boolean{
    let flag =source.search(subString)
    return (flag != -1)
} 

console.log(mySearch('高、富、帅','胖'))  //false
```

### 命名空间

命名空间，又称内部模块，被用于组织有些具有内在联系的特性和对象。

```
namespace shuaiGe{
  export class Dehua{
    public name:string = '刘德华'
    talk(){
      console.log('我是帅哥刘德华')
    }
  }
}

namespace bajie{
  export class Dehua{
    public name:string = '马德华'
    talk(){
      console.log('我是二师兄马德华')
    }
  }
}

let dehua1:shuaiGe.Dehua = new shuaiGe.Dehua()
let dehua2:shuaiGe.Dehua = new bajie.Dehua()
dehua1.talk()
dehua2.talk()
```

如果你已经学到了这里，我建议你也学一下ES6的语法，因为Typescript的语法和ES6的有很多都一样，比如说promise，async/await所以我就不在这里讲述了。有兴趣的小伙伴可以学一下。


以上就是我对TypeScript基础的一些理解,如果文章由于我学识浅薄,导致您发现有严重谬误的地方,请一定在评论中指出,我会在第一时间修正我的博文,以避免误人子弟。





