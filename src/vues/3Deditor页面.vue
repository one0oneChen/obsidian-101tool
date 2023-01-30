<template>
    <div>
        <n-dropdown trigger="hover" :options="url下拉列表项目" 
                    @select="处理url下拉列表选择">
        <n-button class="nbtn" secondary type="primary">平台: {{默认编辑器}}</n-button>
    </n-dropdown>
    </div>
    <iframe ref="iframe" :src="编辑器url" frameborder="0"></iframe>
</template>


<script lang="ts" setup>
import { Notice } from "obsidian";
import { ref, inject, } from "vue";
import { NButton, NDropdown, } from "naive-ui"


const app注入数据:any = inject('app注入数据')
let 默认编辑器=ref(app注入数据.默认编辑器)

const url字典: {[key:string]:any}={
    'SketchUp':'https://app.sketchup.com/app',
    'threejs':'https://threejs.org/editor/',
    '酷大师':'https://www.kudashi.com/pub/tool/geom-modeling/design',
}
const 编辑器url=ref(url字典[默认编辑器.value])

const url名称列表=['SketchUp', 'threejs', '酷大师']

const url下拉列表项目:any[]=[]
for (let i of url名称列表){
    url下拉列表项目.push({label: i, key: i, })
}

function 处理url下拉列表选择(_value:string){
    new Notice(`切换3Deditor至:${_value},请耐心等待...`);
    默认编辑器.value=_value
    编辑器url.value=url字典[_value] //通过修改value来修改监听变量的值
    app注入数据.mitt触发器.emit("emit监听3D编辑器修改", _value)
}

</script>



<style lang="scss" scoped>
iframe {
    width: 100%;
    height: 100%;
}

</style>