// 1:引入Vue实例对象
// 逐级向上查找node_modules/vue文件夹的入口
import Vue from 'vue';

import App from './app.vue';


// 引入vue-router 对象
import VueRouter from 'vue-router';
import Home from './home.vue';
import Login from './login.vue';

// install vue-router plugin

Vue.use(VueRouter);

// 配置路由规则
// 1(构造的方式)
// let router = new VueRouter({
//     routes: [
//         //每一个数组元素都是一条路由规则，也是一个对象
//         { name: 'xxxx', path: '/', component: Home },
//         { name: 'xxxxx', path: '/login', component: Login }
//     ]
// });
// 2 函数
let router = new VueRouter();
router.addRoutes([
    { name: 'xx', path: '/', component: Home },
    { name: 'xxx', path: '/login', component: Login }
]);

new Vue({
    el: '#app',
    // data:这个属性留给app.vue来使用
    // render: function(creater) { //创建元素的对象，是一个函数
    //     return creater(App); //创建一个元素，并且返回，让vue知道，我们要render什么东西
    // }
    render: c => c(App),
    router,
});
