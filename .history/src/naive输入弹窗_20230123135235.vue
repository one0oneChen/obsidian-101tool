<template>
    <div class="vue_div">
        <input v-model="text" placeholder="Type here">
        <p>{{ text }}</p>
    </div>
</template>

<script lang="ts">
    export default {
        props:["输入提示字典", ],
        data() {
            return {
                输入提示字典:{
                    "输入1标题":"输入1提示信息:",
                }
            }
        },
    }
</script>

// <style scoped lang="scss">
// $颜色_橙色:rgb(255, 163, 102);
// $颜色_灰色:rgb(59, 59, 59);
// .vue_div {
//     background: $颜色_灰色;
//     height: 200px;
//     width: 600px;
    
// }
// input{
//     height: 20px;
//     width: 200px;
//     color: $颜色_橙色;
//     background: $颜色_灰色;
//     // margin: 5px;
// }
// p{
//     color: $颜色_橙色;
// }
// </style>