<template>
    <n-button v-on:click="点击事件" class="vue_button">测试按钮</n-button>
</template>

<script lang="ts">
    import { defineComponent } from "vue"
    import { 消息弹窗 } from "./modal对话框"
    import { NButton } from "naive-ui"

    export default defineComponent({
        components:{ NButton}
    })

    function 点击事件(){
        alert("按钮被点击了!")
        
    }

</script>