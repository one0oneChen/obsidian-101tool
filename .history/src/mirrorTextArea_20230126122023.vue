<template>
    <!-- :indent-with-tab="true" 是否自动获取焦点-->
    <Codemirror 
        ref="cm"
        v-model="code" 
        placeholder="输入点什么..."
        :autofocus="true"
        :indent-with-tab="true"
        :style="{ height: '100%' }"
        :tabSize="4"
        :extensions="extensions"
        @change="Change"
        />
</template>
<!--    :options="cm配置"
    :mode="mode"
    :spellcheck="spellcheck"
        @ready="ready('ready', $event)"
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
    // 高级编辑功能
    // 搜索功能
    // find：Ctrl-F (PC), Cmd-F (Mac)
    // findNext：Ctrl-G (PC), Cmd-G (Mac)
    // findPrev：Shift-Ctrl-G (PC), Shift-Cmd-G (Mac)
    // replace：Shift-Ctrl-F (PC), Cmd-Alt-F (Mac)
    // replaceAll：Shift-Ctrl-R (PC), Shift-Cmd-Alt-F (Mac)

    // 导入主题自定义配置的模块
    import { EditorView } from "@codemirror/view"
    import { ref,inject } from "vue";


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

    // 编辑器配置
    let spellcheck=ref(true)
    let indentWithTab=ref(true)
    let style=ref({ height: '100%' })
    let tabSize=ref(4)
    let mode=ref("text/x-c++src")  //语言及语法模式
    let extensions=[cpp(), oneDark] //语法高亮与主题

    // 从父级直接注入的数据
    const app注入数据:any = inject('app注入数据')
    const code = ref(app注入数据.文件初始文本);
    const Change = () => { //当 code 被修改时就触发返回code的值并存储
        app注入数据.mitt触发器.emit("emit监听", code.value)
    }
</script>