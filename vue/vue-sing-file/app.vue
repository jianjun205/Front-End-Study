<template>
    <div class="tmpl" >
        {{text}}
        <br>
        <input type="text" v-model='text'>
         <br> 过滤器的使用: {{text | reverse}}
        <childVue :cmsg='msg'
                  ctext='text'></childVue>
        <button @click='receiveMsg'>开始接受子组件的触发事件发送的数据</button>
        <hr>
        <p>这是路由的使用</p>
        <router-link to='/'>home</router-link>
         <router-link to='/login'>login</router-link>
         <p>这是动态路要显示的页面</p>
         <router-view></router-view>
    </div>

</template>

<script>
import childVue from './childConpoent.vue';
// 固定格式
export default {
    // data: function () {
    //     // 在单文件的方式中，data是一个函数，和库的方式是对象，不一样
    //     return {
    //         text: 'hello vue!'
    //     }
    // }
    data() {
        return {
            text: 'hello vue',
            msg: '这是上层传下的数据' //父传子
        }
    },

    components: {
        childVue
    },
    methods: {
        // 给父级组件绑定事件，获取子组件触发该事件传入的参数
        receiveMsg() {
            this.$on('receiveMsg', function (msg) {
                alert('这是子组件触发父层事件，传入的参数：' + msg)
            })
        }
    },
    filters: {
        reverse(str){
            return (str+'').split('').reverse().join('')
        }
    }
}
</script>
<style scoped>
.tmpl {
    background-color: lightgreen;
}
</style>
