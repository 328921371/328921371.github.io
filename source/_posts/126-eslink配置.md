---
title: eslink配置记录
categories:
  - eslink
tags:
  - eslink
copyright: true
comments: true
abbrlink: c543b61f
date: 2020-05-23 22:32:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 项目中都有使用到eslink,怎么安装我就不说了,现在vue-cli4.0初始化的时候,都会提示你是否直接安装

<!--more-->

本篇记录一下自己经常用到的一些eslink的配置,一些vue风格的没有配置,类似规定组件大小写之类的,有兴趣的可以自己加上

```
const isPro = process.env.NODE_ENV === "production";
module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion:true
  },
  env: {
    browser: true,
    es6: true,
  },
  extends: ['plugin:vue/essential'],
  plugins: ["vue"],
  // "off"或者0    关闭规则关闭
  // "warn"或者1   在打开的规则作为警告（不影响退出代码）
  // "error"或者2  把规则作为一个错误（退出代码触发时为1）
  rules: {
    // 代码风格规范
    "quotes": [2, "single"], //字符串使用单引号
    "space-infix-ops": 2, // 操作符周围要有空格
    "spaced-comment": 2, //注释风格要有空格
    "comma-spacing": 2, //逗号后要有空格
    "comma-style": [2, "last"], //逗号风格，换行时在行首还是行尾
    "consistent-this": [2, "_this"], //this别名
    "curly": [2, "all"], //必须使用 if(){} 中的{}
    "brace-style": [2, "1tbs"], // 大括号和关键字在同一行
    "no-unused-vars": [0, {"vars": "all", "args": "after-used"}], //不能有声明后未被使用的变量或参数
    "no-use-before-define": 0, //未定义前不能使用
    "arrow-parens": 2, //箭头函数用小括号括起来
    "no-multiple-empty-lines": [1, {"max": 2}], //空行最多不能超过2行
    "operator-linebreak": [2, "after"], //换行时运算符在行尾还是行首
    "indent": [2, 2], //缩进风格,缩进两格
    "comma-dangle": [2, "never"], //对象字面量项尾不能有逗号
    "dot-location": 2, //对象访问符的位置，换行的时候在行首还是行尾
    "func-call-spacing": 2, //函数调用不要空格
    "key-spacing": [2, { "afterColon": true, "mode": "strict" }], // key的冒号后面要有空格
    "no-dupe-keys": 2,//在创建对象字面量时不允许键重复 {a:1,a:1}
    "no-duplicate-case": 2,//switch中的case标签不能重复
    "no-floating-decimal": 2,//禁止省略浮点数中的0 .5 3.
    "no-multi-spaces": 2,//不能用多余的空格
    "no-multi-str": 2, //字符串不能用\换行
    "object-property-newline": 2, //对象属性换行时注意统一代码风格。
    "padded-blocks": 0,//块语句内行首行尾是否要空行
    "vue/v-bind-style": ["error", "shorthand"],
    "vue/v-on-style": ["error", "shorthand"],
    "prefer-destructuring": 0,
    "class-methods-use-this": 0,
    "no-mixed-operators": 0,
    "max-len": 0, //字符串最大长度
    "no-unused-expressions": 2, //禁止无用的表达式
    "import/no-dynamic-require": 0,
    "func-names": 0, //函数表达式必须有名字
    "no-underscore-dangle": 0, //标识符不能以_开头或结尾
    "no-restricted-properties": 0,
    "no-restricted-syntax": 0,
    "no-prototype-builtins": 0,
    "no-plusplus": 0, //禁止使用++，--
    "one-var": 0, //连续声明
    "no-tabs": 0,
    "prefer-const": 0, //首选const
    "global-require": 0,
    "guard-for-in": 0, //for in循环要用if语句过滤
    "import/extensions":0,
    "no-console": 0,
    "no-return-assign": 0, //return 语句中不能有赋值表达式
    "no-param-reassign": 0, //禁止给参数重新赋值
    "no-nested-ternary": 0, //禁止使用嵌套的三目运算
    "camelcase": 0, //强制驼峰法命名
    "eqeqeq": 0,//必须使用全等
    "import/no-extraneous-dependencies": 0,
    "no-debugger": isPro ? "error" : "off"
  }
}
```

以上就是我对eslink配置的一些理解,如果文章由于我学识浅薄,导致您发现有严重谬误的地方,请一定在评论中指出,我会在第一时间修正我的博文,以避免误人子弟。
