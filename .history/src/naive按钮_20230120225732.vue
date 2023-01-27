<template>
    <n-button v-on:click="点击事件" class="vue_button">测试按钮</n-button>
</template>

<script lang="ts">
    import { Notice,App } from 'obsidian';
    import { defineComponent } from "vue"
    import { 消息弹窗 } from "./modal对话框"
    import { NButton } from "naive-ui"

    export default defineComponent({
        name:"Naive按钮",
        components:{ NButton},

        data() { return {
            返回值:"哈哈",
            app:new App,
        }},
        methods:{
            点击事件(){
                let msg="按钮被点击了!"
                alert(msg)
                new Notice(msg);
                // new 消息弹窗(this.app, msg);
            },
        }
    })




</script>

</script>


<style>
.vue_button {
    color: red;
}
</style>