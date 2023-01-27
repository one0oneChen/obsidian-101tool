<template>
    <n-button v-on:click="点击事件" class="vue_button">测试按钮</n-button>
</template>

<script lang="ts">
    import { defineComponent } from "vue"
    import { modal_消息弹窗 } from "./main"
    import { NButton } from "naive-ui"

    export default defineComponent({
        components:{ NButton}
    })

    function 点击事件(){
        alert("按钮被点击了!")
    }

</script>