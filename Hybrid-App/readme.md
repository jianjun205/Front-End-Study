## 使用IONIC制作APP
    制作混合app 
## 环境搭建
 1. 系统环境搭建
     Android:
        1. Java jdk（android ADT需要）
        2. C++环境（Node需要）
        3. Android ADT（打包android应用的时候需要）
        4. Node（插件环境需要）
        5. Git（从github上下载模板，团队代码管理）

     IOS
        1. XCode（打包ios应用的时候需要）
        2. Node（插件环境需要）
        3. Git（从github上下载模板，团队代码管理）

 2. 项目依赖环境搭建
    1. cordova（打包工具）  npm install -g  cordova
    2. ionic（框架）        npm  install  -g  ionic
## 项目搭建 
 1. 创建项目模板
    Ionic start myApp
       1. Ionic start  myApp  blank
       2. Ionic start  myApp  tabs
       3. Ionic start  myApp  sidemenu
 2. 模拟器运行
        android
            ionic   emulate   android
        ios 
            ionic   emulate   ios
 3. 打包app
    1、添加项目平台
        android     ionic   platform  add   android
        ios         ionic   platform  add   ios
    2、打包
        android     ionic    build    android
        ios         ionic    build     ios
    3、直接运行在手机
        ionic  run   android
