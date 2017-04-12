### webpack启程
#### webpack优点
 * 模块来源广泛，支持包括npm/bower等等的各种主流模块安装／依赖解决方案
 * 模块规范支持全面，amd/cmd以及shimming等一应具全
 * 浏览器端足迹小，移动端友好，却对热加载乃至热替换有很好的支持
 * 插件机制完善，实现同样模块化，容易扩展
 
#### webpack基本操作
 * npm进行安装 
     - 全局安装方式 `npm install(i) webpack -g`
     - 1:进入到webpack需要进行分析打包的文件夹目录下
         + 命令 `webpack 入口文件 出口文件`
             * 在index.html文件中，直接引入出口文件
     
#### 使用webpack打包解决文件依赖关系
 - 基本操作方式: 
        + `webpack ./main.js ./build.js` -p(压缩混淆)
    
#### 使用webpack配置文件
 * webpack在命令行输入webpack命令的时候，首先会在当前的目录查看有没有webpack.config.js文件的存在，如果有，即读取该文件，按该文件的指令来做打包操作
    - 如果没有，才走命令

#### 总结
 * webpack可以运行的两种方式 cli option (命令行及设置)
 * 通过webpack.config.js文件运行 
     - 所有的配置属性都在module.exports = {内部配置} 
 
 ```javascript
  module.exports = {
     //指定入口文件
     entry :{
         //这里可以有多个入口
         main:'./main.js', //主入口
     },
     output:{ //出口
         filename:'./build.js'
     }
  }
  //最终我们到当前有webpack.config.js文件的目录来执行 webpack命令就可以了
 ```
#### babel语法转换器
 * js代码转换工具
     - ES6、ES7..react 语法的转换工具
         + 他本身自带转换cli ，你可以通过`npm install babel-cli -g` 的全局命令行工具，来完成单独的转化
         + 他也提供了别的工具使用的支持
             * 比如browserify babelify
             * 比如 webpack babel-core ......
         + 烦心: babel默认只提供了es6关键字的转换 let const
         + 如果涉及到es6或者es7函数，就需要特定的设置插件
 * 1:安装babel核心工具包
     - `babel-core`
 * 2:配置babel的预设? babel是一个语法转换器，包含es6/7/react，就是告诉babel要将什么转换成什么，告诉其转化ES6到ES5，预先设置
     - `babel-preset-es2015`
 * 3:babel不转换函数API,配置插件,`babel-plugin-transform-runtime`
 * 4: webpack需要一个`babel-loader`
 
 
 
#### webpack-ES6的处理总结
 * babel是什么？ 语法转换器
     - babel可以转化ES6、ES7、react
     - 默认只转换ES6、关键字
         + 提供预设转换ES6关键字 下载 `npm i babel-preset-es2015 --save-dev`
         + 在webpack中配置的方式: `presets:['es2015']`
     - 不转换函数 
         + 提供插件
             * 安装: `npm i babel-plugin-transform-runtime --save-dev`
             * 在webpack中配置的方式: `plugins:['transform-runtime']`
     - 还需要核心包 `babel-core` 只需要安装就可以了 `npm i babel-core --save-dev`
 * webpack要与babel结合就需要babel-loader
     - `npm i babel-loader --save-dev`
 
 * 配置方式
 
 ```javascript
 module.exports = {
     //入口
     entry:{
         main:'./main.js',
     },
     output:{//输出
         filename:'./build.js',
     },
     module:{
         loaders:[
             {
                 test:/.js$/,//正则表达式，指定以.js后缀结尾的文件由我这个loader来处理
                 loader:'babel-loader',
                 options:{
                     presets:['es2015'],
                     plugins:['transform-runtime'],
                 }
             }
         ]
     }
 }
 
 ```

#### 引入css
 * 原理：通过js代码动态创建css对象，再通过style标签，做动态插入
 * 具体操作:
     - 原来我们有es6的解析，此时，暂时把其移除了，
     - 留下的是通过require的方式引入css,
         + import './index.css' 也是一样的操作
 * 配置方式
 
 ```javascript
 
     module.exports = {
         //入口+ 出口
         module:{
             loaders:[
                 {
                     test:/.css$/,//需要操作的文件->正则
                     loader:'style-loader!css-loader'
                 }
             ]
         }
     }
 ```
 * 如何在main.js中使用某个css?
     - 不使用es6的方式，`require('./index.css');`
     - 使用ES6导入的方式 `import './index.css';`
#### css + autoprefixer
 * 1:安装包`npm i autoprefixer-loader -D`
 * 2: 在配置文件中加入 loaders内部加入一个对象:{ test: /.css$/,loader:'style-loader!css-loader!autoprefixer-loader'  
 }
#### less的使用
 * 和css前面的操作都一样
     * 提前编译less需要 less-loader 和less这两个包
     * 安装依赖包 `npm i less-loader less -D`
 * 配置文件的写法
 
 ```javascript
 module.exports = {
 
     module:{
         loaders:[
             {
                 test:/.less$/,
                 loader:'style-loader!css-loader!autoprefixer-loader!less-loader'
             }
         ]
     }
 }
 ```
 * 由于less-loader依赖于less 所以需要先下载less，再下载less-loader
 
#### 处理图片
 * 需要先下载：
 * 原理:会把依赖的图片生成一个url，通过该url去访问图片，由于需要读取图片，就需要操作文件,由此： 需要file-loader + url-loader   
     - url-loader不用在webpack中写出来，只用安装即可
 
 * 设置limit=1 的时候生成了一张图片，然后build.js大小是73kb
 * 设置limit=199182 的时候，大图片了一个字节，就不生成图片


#### base64编码
 * A-Za-Z0-9+/  共是64个
 * 他可以跟随css一起加载，减少请求次数到0
 * 不适合过大的图片，只能是小图片，频繁使用的小图片
 * 普遍用在邮件的发送中
 * 常规认为base64图片加密会增大个三分之一左右
 * __注意：其不是绝对为了加密的产生，可以编码也可以解码，但是可以将二进制的数据作为字符串传输__
 
#### base64 在node中的编码解码
 > Buffer.from('javascript').toString('base64');
 'amF2YXNjcmlwdA=='
 > Buffer.from('amF2YXNjcmlwdA==','base64').toString('utf8');
 'javascript'
#### yarn的使用

 * 安装全局命令行工具 `npm i yarn -g`
 * 安装对应的包
     - 安装一个包 `yarn add 包名@版本号 -S|-D`
     - 卸载一个包 `yarn remove 包名@ -S|-D`
     - 恢复所有package.json文件中依赖的包 `npm install [--production]`
         + 只恢复生产依赖的包，既-S的包
     - yarn中恢复包的命令就是 `yarn install [--production]`
     - 更新到最新 `yarn update 包名`
     

#### commonJS 和 ES6模块化方式区别
    - commonJS模块化中的使用方式
        + 导入: var xxx = require('模块路径ID');
        + 导出: module.exports = xxxx;
    - 导入: 
        + 导入文件不需要返回值:
            * import './文件路径';
        + 导入需要返回值:
            * import 变量名 from './文件路径.js';
        + 导出:
            * export default xxx;

#### MUI
 * http://dev.dcloud.net.cn/mui/

#### 生成html文件插件
 * webpack-html-plugin
 * 安装这个插件,这个插件依赖于webpack
     - webpack -> 在任意命令行使用webpack命令
     - 如果在js文件中，存在webpack对象的话，是不是必须让其作为项目的依赖
     - __该插件依赖于webpack__
 
 * 操作步骤:
     - 1：安装webpack和webpack-html-plugin插件
         + 在webpack.config.js文件中进行配置
 
 ```javascript
 三大属性:entry、output、module
 const webpackHtmlPlugin = require('webpack-html-plugin');
 plugins:[
     new webpackHtmlPlugin({
            filename:'index.html',//生成的文件名
            template:'./src/html/index.html',//参照的文件名
         })
 ]
 
 ```
 * 我们把相对路径都进行了更改，此时有些entry和output需要做一个改动，最好检查template:'./src/html/index.html'
 
#### webpack-dev-server
 * 这个工具包含前面提到热加载，热替换功能，
     - 修改css或者一些加载过程中的代码，立刻不通过刷新，直接改变
     - __只要是你上级包含非法符号，就会导致热替换不成功、无法监视你的文件改动，获取不了目录、{}()__  
 
 ```javascript
 module.exports = {
      module:{},
      plugins:[
         new webpackHtmlPlugin({
                filename:'index.html', //虚拟的html文件，供webpack-dev-server使用
                template:'./src/html/index.html'
             })
     ]
 }
 ```
 * 启动命令 ,.在package.json文件的目录下
     - 运行命令 yarn test
         + 实际运行的是scripts: test命令
             * ../node_modules/.bin/webpack-dev-server --inline --hot --open --port 9999
 * 相关命令：
     - inline 自动刷新
     - hot 热加载、热替换(不经过刷新，不重启程序)
     - open 自动打开浏览器
     - port 指定端口
 
 
#### 最终效果
 * 启动webpack命令 能在dist下面运行index.html
 * 在package.json文件的目录能运行yarn test 启动程序，修改代码实现热替换

#### ES6中的模块
 * import 对象 from './xxx.js';
 * 和按需加载 import {对象中的属性} from  './xxx.js';
 * __注意:一个默认导出，是不区分名称的,按需加载必须区分名称__
     - 按需加载 引入的时候 import { 接口名称} from './xx.js'
     - 导出：  
         + 1:声明式导出 export var add(接口名称) = function(){ }; //类似export {add}
         + 2: 在代码最终导出
             * export {接口名称||对象,多个... }
     - 按需的方式一定要名称对应
         
#### ES6中的代码变化
 * 函数的声明：
    - var obj = {  add:function(){ }  }
    - 简写: `var obj = {  add(){}     }`
    - 声明对象：var name='abc'; var obj = {name}  //obj的name属性的值就是abc



