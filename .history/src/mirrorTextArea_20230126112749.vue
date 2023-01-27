<template>
    <!-- :indent-with-tab="true" 是否自动获取焦点-->
    <Codemirror 
        ref="cm"
        v-model="code" 
        :options="cm配置"
        @change="Change"
    />
</template>
<!-- @ready="ready('ready', $event)"
        @change="Change('change', $event)" 
        @focus="focus('focus', $event)" @blur="blur('blur', $event)" -->
<script lang="ts" setup>
    import { Codemirror } from "vue-codemirror";
    import { oneDark } from "@codemirror/theme-one-dark";
    // 语法高亮等语言支持
    import { javascript } from "@codemirror/lang-javascript";
    import { cpp } from "@codemirror/lang-cpp";
    import { python } from "@codemirror/lang-python";
    import { java } from "@codemirror/lang-java";
    // 导入主题自定义配置的模块
    import { EditorView } from "@codemirror/view"
    import { ref,inject,AppConfig } from "vue";


    let myTheme = EditorView.theme({
        // 输入的字体颜色
        "&": {
            color: "#0052D9",
            backgroundColor: "#ccc"
        },
        ".cm-content": {
            caretColor: "#0052D9",
        },
        // 激活行背景色
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
    const app注入数据:any = inject('app注入数据')
    
    const cm配置={
        placeholder:"输入点什么...",
        style:"{ height: '100%' }" ,
        autofocus:"true",
        tabSize:"4" ,
        extensions:[javascript(), oneDark] ,
    }
    
    const code = ref(app注入数据.文件初始文本);

    const Change = () => { //当 code 被修改时就触发返回code的值并存储
        app注入数据.mitt触发器.emit("emit监听", code.value)
    }
</script>