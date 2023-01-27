<template>
    <n-button v-on:click="点击事件" class="vue_button">测试按钮</n-button>
</template>

<script lang="ts">
    import { Notice } from 'obsidian';
    import { defineComponent } from "vue"
    import { NButton } from "naive-ui"

    export default defineComponent({
        name:"Naive按钮",
        components:{ NButton},

        data() { return {
            返回值:"哈哈",
        }},
        methods:{
            点击事件(){
                let msg="按钮被点击了!"
                alert(msg)
                new Notice(msg);
            },
        }
    })


</script>


<style>
.vue_button {
    color: red;
}
</style>