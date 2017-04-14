<template>
    <!-- 在vue1.0的时候，此时结构随便你写，在2.0中，只能以一个根节点的形式来写 -->
    <div class="tmpl">
        {{text}}
    </div>
</template>
<script>
//固定格式
export default {
    data: function () {
        //在单文件的方式中，data是一个函数，和库的方式是对象，不一样
        return {
            text: 'hello vue!'
        }
    }
}
</script>
<style scoped>
.tmpl {
    background-color: blue;
}
</style>
