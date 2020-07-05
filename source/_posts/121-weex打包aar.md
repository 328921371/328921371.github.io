---
title: weex打包.apk或.aar
categories:
  - weex
tags:
  - weex
copyright: true
comments: true
abbrlink: a2482346
date: 2020-01-31 09:17:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> weex打包成apk我就不说了,android-studio的build上面可以构建,现在记录一下打包成.arr需要哪些步骤,也就是我们通常说的sdk

<!--more-->

首先,在文件夹project-app-build-outputs-apk中删除.apk

因为android-studio在运行的时候默认就生成了一个.apk的安装包

### 相关文件改造

#### build.gradle文件改造

把构建插件由

apply plugin: 'com.android.application'

换成

apply plugin:'com.android.library'

如果定义 applicationId ,也要注释掉


将下面一段代码也注释掉

```
//    applicationVariants.all { variant ->
//        variant.outputs.each { output ->
//            def outputFile = output.outputFile
//            if (outputFile != null && outputFile.name.equals('app-debug.apk')) {
//                def fileName = outputFile.name.replace("app-debug.apk", "weex-app.apk")
//                output.outputFile = new File(outputFile.parent, fileName)
//            }
//        }
//    }
```

#### AndroidManifest.xml文件改造

在文件夹project-app-src-main-AndroidManifest.xml

主窗口调用按需要去掉，不去会在桌面多出一个快捷方式，直接调用aar原来主窗口

去掉Application 中icon,label,theme,name属性，防止跟调用应用冲突

主入口也要注释,就是注释下面这段

```
 <intent-filter>
	<action android:name="android.intent.action.MAIN"/>
	<category android:name="android.intent.category.LAUNCHER"/>
</intent-filter>
```


该页面上面的android:name="com.weex.app.SplashActivity"的SplashActivity,就是以后调用这个aar的包名

去掉switch

在project-app-src-main-java-com.weex.app-WXPageActivity.java中,去掉switch,改成if else,改成这样

```
if(item.getItemId()==R.id.action_refresh){
    createWeexInstance();
    renderPage();
  }else if(item.getItemId()==R.id.action_scan){
    IntentIntegrator integrator = new IntentIntegrator(this);
    integrator.setDesiredBarcodeFormats(IntentIntegrator.QR_CODE_TYPES);
    integrator.setPrompt("Scan a barcode");
    //integrator.setCameraId(0);  // Use a specific camera of the device
    integrator.setBeepEnabled(true);
    integrator.setOrientationLocked(false);
    integrator.setBarcodeImageEnabled(true);
    integrator.setPrompt(getString(R.string.capture_qrcode_prompt));
    integrator.initiateScan();
  }else if(item.getItemId()==R.id.home){
    finish();
  }
```

### 遇到的问题 weex_plugin does not exist.

将 apply plugin: 'com.taobao.android.weex.plugin.gradle' 也注释掉

这样android调用我们weex的插件,需要自己再手动添加依赖


以上就是我对weex打包成.arr的一些理解,如果文章由于我学识浅薄,导致您发现有严重谬误的地方,请一定在评论中指出,我会在第一时间修正我的博文,以避免误人子弟。



