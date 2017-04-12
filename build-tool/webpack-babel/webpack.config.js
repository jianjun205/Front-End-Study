module.exports = { //必须有的结构
    //所有配置都在{}内部
    //指定入口文件
    entry: {
        // file1:'./a.js' 可以指定多个入口
        // main: './main.js', //只针对一个入口的情况
        mian:'./src/js/main.js'
    },
    //指定出口文件
    output: {
        // filename: './build.js', //在当前目录下生成一个build.js
        path:__dirname+'/dist',
        filename:'build.js'//在当前目录下生成一个build.js
    },
    module: {
        loaders: [
            {
                test: /.js$/, //正则表达式，指定以.js后缀结尾的文件由我这个loader来处理
                loader: 'babel-loader',
                options: {
                    presets: ['es2015'],
                    plugins: ['transform-runtime'], //解析es6 函数
                }
            },
            {
                test: /.css$/, //solve css 
                loader: 'style-loader!css-loader'
            }
        ]
    }

}
