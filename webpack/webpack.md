# webpack

### 安装初始化项目webpack

​在全局安装webpack       `npm install webpack -g`

当然如果常规项目还是把依赖写入 package.json 包去更人性化

然后初始化文件目录，`npm init`   配置文件夹环境  `npm install webpack --save-dev`



### 使用webpack打包文件

打包基本命令`webpack filename.js changefilename.bundle.js`

webpack最基本的只能打包js文件，而如果要去打包其他的文件，我们需要引入其他的loader

加入loader  `npm install css-loader style-loader --save-dev`

js引入其他文件  `require ("./world.js")`

配置loader方式有

1. 在html中引入loder的方式`require ("style-loader!css-loader!./style.css")`
2. 在命令行中` webpack hello.js hello.bundle.js --module-bind 'css=style-loader!css-loader'`里面的参数有  `--watch` 监视文件变化，变化了直接自动打包，`--display-modules` 查看打包了哪些模块，`--progress`查看打包进度，`--display-reasons`可以看到为什么打包这些模块

### 实际使用场景

我们首先要去配置我们的webpack配置文件`webpack.config.js`

然后安装`npm install html-webpack-plugin --save-dev`





