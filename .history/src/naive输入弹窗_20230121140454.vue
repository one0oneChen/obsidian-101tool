<template>
    <input v-model="text" placeholder="Type here">
    <p>{{ text }}</p>
</template>

<script lang="ts">
    export default {
        data() {
            return {
            text: ''
            }
        },
    }

</script>

<style scoped lang="scss">
// $颜色_橙色:#f60;
// $颜色_绿色:rgb(0, 255, 0);
// .vue_button {
//     color: $颜色_橙色;
//     background: $颜色_绿色;
// }
// p{
//     color: $颜色_绿色;
//     background: $颜色_橙色;
// }
</style>