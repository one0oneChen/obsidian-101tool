<template>
    
</template>

<script lang="ts">
    //Naive
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

<style scoped lang="scss">
$颜色_橙色:#f60;
$颜色_绿色:rgb(0, 255, 0);
.vue_button {
    color: $颜色_橙色;
    background: $颜色_绿色;
}
p{
    color: $颜色_绿色;
    background: $颜色_橙色;
}
</style>