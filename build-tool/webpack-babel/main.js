//结合了cal.js 和index.js的功能
//并且还要描述index.js依赖cal.js的这样一件事

//引入cal.js

//commonjs模块化写法
// var cal = require('./cal.js'); 
import cal from './cal.js';

var btnEle = document.getElementById('btn');

//添加点击事件
btnEle.onclick = function() {
    //获取第一个和第二个数字
    var n1 = document.getElementById('n1').value - 0;
    var n2 = document.getElementById('n2').value - 0;
    var sum = cal.add(n1, n2); //接着过去声明这个对象的函数
    document.getElementById('result').value = sum;
}
