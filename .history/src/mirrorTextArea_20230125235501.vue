<template>
    <!-- :indent-with-tab="true" 是否自动获取焦点-->
    <Codemirror 
        v-model="code" 
        placeholder="Code gose here..." 
        :style="{ height: '100%' }" 
        :autofocus="true"
        :tabSize="4" 
        :extensions="extensions" 
        @change="Change"
    />
</template>
<!-- @ready="ready('ready', $event)"
        @change="Change('change', $event)" @focus="focus('focus', $event)" @blur="blur('blur', $event)" -->
<script lang="ts" setup>
    import { Codemirror } from "vue-codemirror";
    import { javascript } from "@codemirror/lang-javascript";
    import { cpp } from "@codemirror/lang-cpp";
    import { python } from "@codemirror/lang-python";
    import { oneDark } from "@codemirror/theme-one-dark";
    import { ref,inject,AppConfig } from "vue";
    import { EditorView } from "@codemirror/view"


    let myTheme = EditorView.theme({
        // 输入的字体颜色
        "&": {
            color: "#0052D9",
            backgroundColor: "#FFFFFF"
        },
        ".cm-content": {
            caretColor: "#0052D9",
        },
        // 激活背景色
        ".cm-activeLine": {
            backgroundColor: "#FAFAFA"
        },
        // 激活序列的背景色
        ".cm-activeLineGutter": {
            backgroundColor: "#FAFAFA"
        },
        //光标的颜色
        "&.cm-focused .cm-cursor": {
            borderLeftColor: "#0052D9"
        },
        // 选中的状态
        "&.cm-focused .cm-selectionBackground, ::selection": {
            backgroundColor: "#0052D9",
            color:'#FFFFFF'
        },
        // 左侧侧边栏的颜色
        ".cm-gutters": {
            backgroundColor: "#FFFFFF",
            color: "#ddd", //侧边栏文字颜色
            border: "none"
        }
    }, { dark: true })


    interface IProps {
        height?: string,
    }
    // 接受的参数
    const props = withDefaults(defineProps<IProps>(), {
        height: '400px'
    })

    // 从父级直接注入的数据
    const cm配置 = inject('cm配置')


    const code = ref(cm配置.文件初始文本);

    const extensions = [javascript(), oneDark];
    const Change = () => {
        cm配置.mitt触发器.emit("emit监听", code)
    }
</script>