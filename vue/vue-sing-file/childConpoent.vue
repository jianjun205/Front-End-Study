<template>
    <div class="tmpl">
        我是子组件 {{cmsg}}
        <button @click='getMsg'>点击获取父层prop传入的数据</button>
    
        <!--子组件和父组件通讯-->
        <button @click='sendMsg'>点击开始触发父层的事件并向父层发送数据</button>
    </div>
</template>

<script>
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
            // text: 'hello vue'
        }
    },
    props: ['ctext', 'cmsg'],
    methods: {
        // 获取
        getMsg: function () {
            console.log(this.$parent.text + this.$parent.msg);
        },
        sendMsg() {
            this.$parent.$emit('receiveMsg', '我是子组件发来的数据')
        }
    }

}
</script>
<style scoped>
.tmpl {
    width: 100%;
    height: 200px;
    background-color: red;
}
</style>
