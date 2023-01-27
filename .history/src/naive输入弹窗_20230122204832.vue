<template>
    <div class="vue_div">
        <input v-model="text" placeholder="Type here">
        <p>{{ text }}</p>
    </div>
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
$颜色_橙色:rgb(255, 163, 102);
$颜色_灰色:rgb(59, 59, 59);
.vue_div {
    height: 200px;
    width: 600px;
    
}
input{
    color: $颜色_橙色;
    background: $颜色_灰色;
    margin: 5px;
}
p{
    color: $颜色_橙色;
}
</style>