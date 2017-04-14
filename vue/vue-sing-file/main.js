//1:引入Vue实例对象
import Vue from 'vue'; //逐级向上查找node_modules/vue文件夹的入口

import App from './app.vue';





new Vue({
    el: '#app',
    // data:这个属性留给app.vue来使用
    render: function(creater) { //创建元素的对象，是一个函数
        return creater(App); //创建一个元素，并且返回，让vue知道，我们要render什么东西
    }
});
