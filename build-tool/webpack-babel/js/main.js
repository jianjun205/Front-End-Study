//引入相关css
import '../../../mui/dist/css/mui.css';
//在页面中需要使用<span标签 并制定类名

import '../css/index.less'; //引入css文件
import cal from './cal';

var btnEle = document.getElementById('btn');

//添加点击事件
btnEle.onclick = function() {
    //获取第一个和第二个数字
    var n1 = document.getElementById('n1').value - 0;
    var n2 = document.getElementById('n2').value - 0;
    var sum = cal.add(n1, n2); //接着过去声明这个对象的函数
    document.getElementById('result').value = sum;
}
