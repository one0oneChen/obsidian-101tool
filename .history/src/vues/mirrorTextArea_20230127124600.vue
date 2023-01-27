<template>
    <!-- :indent-with-tab="true" 是否自动获取焦点-->
    <n-dropdown trigger="hover" :options="语言下拉列表项目" 
                @select="处理语言下拉列表选择">
        <n-button class="nbtn" type="tertiary">语言: {{当前语言字符串}}</n-button>
    </n-dropdown>
    <n-dropdown trigger="hover" :options="主题下拉列表项目"
        @select="处理主题下拉列表选择">
        <n-button class="nbtn" type="tertiary">主题: {{当前主题字符串}}</n-button>
    </n-dropdown>
    <!-- <div>
    </div> -->

    <Codemirror class="codemirror"
        ref="cm"
        v-model="code" 
        placeholder="输入点什么..."
        :autofocus="true"
        :tabSize="tabSize"
        :style="style"
        :indent-with-tab="indentWithTab"
        :spellcheck="spellcheck"
        :extensions="extensions"
        @change="Change"
        @blur="Change" 
        />
    </template>

<!--    
    @update="Change"
    :options="cm配置"
    :mode="mode"
    :theme="theme"
    @ready="ready('ready', $event)"
    @change="Change('change', $event)" 
    @focus="focus('focus', $event)" @blur="blur('blur', $event)" 
-->
<script lang="ts" setup>
    import { Codemirror } from "vue-codemirror";
    import { basicSetup } from "codemirror"
    import { oneDark } from "@codemirror/theme-one-dark";
    // 语法高亮等语言支持
    import { python } from "@codemirror/lang-python";
    import { cpp } from "@codemirror/lang-cpp";
    import { java } from "@codemirror/lang-java";
    import { vue } from "@codemirror/lang-vue";
    import { angular } from "@codemirror/lang-angular";
    import { wast } from "@codemirror/lang-wast";
    import { lezer } from "@codemirror/lang-lezer";
    import { markdown } from "@codemirror/lang-markdown";
    import { xml } from "@codemirror/lang-xml";
    import { rust } from "@codemirror/lang-rust";
    import { html } from "@codemirror/lang-html";
    import { css } from "@codemirror/lang-css";
    import { javascript } from "@codemirror/lang-javascript";
    import { php } from "@codemirror/lang-php";
    import { json } from "@codemirror/lang-json";
    import { sql } from "@codemirror/lang-sql";
    
    // 高级编辑功能
    // 搜索功能
    // find:Ctrl-F (PC), Cmd-F (Mac)
    // findNext:Ctrl-G (PC), Cmd-G (Mac)
    // findPrev:Shift-Ctrl-G (PC), Shift-Cmd-G (Mac)
    // replace:Shift-Ctrl-F (PC), Cmd-Alt-F (Mac)
    // replaceAll:Shift-Ctrl-R (PC), Shift-Cmd-Alt-F (Mac)
    import { EditorState } from '@codemirror/state';
    // import '@codemirror/autocomplete'
    import '@codemirror/search'
    // import '@codemirror/merge'

    // 导入主题自定义配置的模块
    import { EditorView } from "@codemirror/view"
    import { ref,inject, } from "vue";
    // naive组件
    import { NButton, NDropdown } from "naive-ui"

    // vue-codemirror目前么有亮色主题, 所以自定义亮色主题
    let myTheme = EditorView.theme({
        // 输入的字体颜色
        "&": {
            color: "#0052D9",
            backgroundColor: "rgb(255, 251, 231)"
        },
        ".cm-content": {
            caretColor: "#0052D9",
        },
        // 激活行背景色
        ".cm-activeLine": {
            backgroundColor: "rgb(241, 231, 180)"
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
            color:'#999'
        },
        // 左侧侧边栏的颜色
        ".cm-gutters": {
            backgroundColor: "#ffeaa6",
            color: "#777", //侧边栏文字颜色
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

    // 编辑器配置
    let spellcheck=ref(true)
    let indentWithTab=ref(true)
    let style=ref({ height: '100%' })
    let tabSize=ref(4)

    let 当前语言=ref(app注入数据.使用语言)
    let 当前语言字符串=当前语言.value
    let 当前主题=ref(app注入数据.主题)
    let 当前主题字符串=当前主题.value
    const 语言字典: {[key:string]:any}={
        'python':python(),
        'cpp':cpp(),
        'java':java(),
        'vue':vue(),
        'angular':angular(),
        'wast':wast(),
        'lezer':lezer(),
        'markdown':markdown(),
        'xml':xml(),
        'rust':rust(),
        'html':html(),
        'css':css(),
        'javascript':javascript(),
        'php':php(),
        'json':json(),
        'sql':sql(),
    }
    const 主题字典: {[key:string]:any}={
        'dark': oneDark,
        'light': myTheme,
    }
    let extensions=[语言字典[当前语言字符串], 主题字典[当前主题字符串], basicSetup]


    // 设置代码初始文本
    const code = ref(app注入数据.文件初始文本);

    let 当前选择:any=ref("")
    function Change(){ //当 code 被修改时就触发返回code的值并存储
        // console.log('101tool>View101_通用>vueapp>codemirror>change')
        app注入数据.mitt触发器.emit("emit监听文件修改", code.value)
        // 
        // let 编辑器状态=EditorState.create()
        // 当前选择=编辑器状态.selection
    }
    
    //----------------------- 下拉列表 ----------------------
    let 支持语言列表=['python', 'cpp', 'java', 'vue', 'angular', 'wast',
                'lezer', 'markdown', 'xml', 'rust', 'html', 'css', 
                'javascript', 'php', 'json','sql']
    const 语言下拉列表项目:any[]=[]
    for (let i of 支持语言列表){
        语言下拉列表项目.push({label: i, key: i, })
    }
    
    let 支持主题列表=['dark', 'light']
    const 主题下拉列表项目:any[]=[]
    for (let i of 支持主题列表){
        主题下拉列表项目.push({label: i, key: i, })
    }

    function 处理语言下拉列表选择(key: string|number){
        当前语言字符串=String(key)
        app注入数据.mitt触发器.emit("emit监听语言主题切换", [当前语言字符串, 当前主题字符串])
    }
    function 处理主题下拉列表选择(key: string|number){
        当前主题字符串=String(key)
        app注入数据.mitt触发器.emit("emit监听语言主题切换", [当前语言字符串, 当前主题字符串])
    }

    // 配置编辑器高级功能
    // Codemirror EditorView instance ref

</script>

<style lang="scss" scoped>
$颜色_橙色:#df8d56;
$颜色_绿色:#00ff00;
$yanse: #b1a16d;


.nbtn {
    color: $颜色_橙色;
    // border: 1px solid $颜色_橙色;
    border: none;
}

</style>