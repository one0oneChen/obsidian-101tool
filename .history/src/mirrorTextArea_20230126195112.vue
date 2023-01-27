<template>
    <!-- :indent-with-tab="true" 是否自动获取焦点-->
    <span class="nbutton">
        <n-dropdown trigger="hover" :options="语言下拉列表项目" 
                    @select="处理语言下拉列表选择">
            <n-button >当前语言:{{当前语言字符串}}</n-button>
        </n-dropdown>
    </span>
    <span class="nbutton">
        <n-dropdown trigger="hover" :options="主题下拉列表项目"
            @select="处理主题下拉列表选择">
            <n-button >主题:{{当前主题字符串}}</n-button>
        </n-dropdown>
    </span>
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
    />
</template>

<!--    
    :options="cm配置"
    :mode="mode"
    :theme="theme"
    @ready="ready('ready', $event)"
    @change="Change('change', $event)" 
    @focus="focus('focus', $event)" @blur="blur('blur', $event)" 
-->
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
    // find:Ctrl-F (PC), Cmd-F (Mac)
    // findNext:Ctrl-G (PC), Cmd-G (Mac)
    // findPrev:Shift-Ctrl-G (PC), Shift-Cmd-G (Mac)
    // replace:Shift-Ctrl-F (PC), Cmd-Alt-F (Mac)
    // replaceAll:Shift-Ctrl-R (PC), Shift-Cmd-Alt-F (Mac)

    // 导入主题自定义配置的模块
    import { EditorView } from "@codemirror/view"
    import { ref,inject } from "vue";
    // naive组件
    import { NButton, NDropdown } from "naive-ui"


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
        'c':cpp(),
        'c++':cpp(),
        'java':java(),
        'javascript':javascript(),
    }
    const 主题字典: {[key:string]:any}={
        'dark': oneDark,
        'light': myTheme,
    }
    let extensions=[语言字典[当前语言字符串], 主题字典[当前主题字符串]]
    
    // 设置代码初始文本
    const code = ref(app注入数据.文件初始文本);

    function Change(){ //当 code 被修改时就触发返回code的值并存储
        console.log('change')
        app注入数据.mitt触发器.emit("emit监听文件修改", code.value)
    }
    
    //----------------------- 下拉列表 ----------------------
    const 语言下拉列表项目=[
        {   label: 'python',
            key: 'python',  },
        {   label: 'c',
            key: "c"        },
        {   label: 'c++',
            key: 'c++'      },
        {   label: 'java',
            key: 'java'     },
        {   label: 'javascript',
            key: 'javascript'     },
        {   label: 'typescript',
            key: 'typescript'     },
    ]
    const 主题下拉列表项目=[
        {   label: 'dark',
            key: 'dark',  },
        {   label: 'light',
            key: "light"        },
    ]
    function 处理语言下拉列表选择(key: string|number){
        当前语言字符串=String(key)
        app注入数据.mitt触发器.emit("emit监听语言主题切换", [当前语言字符串, 当前主题字符串])
    }
    function 处理主题下拉列表选择(key: string|number){
        当前主题字符串=String(key)
        app注入数据.mitt触发器.emit("emit监听语言主题切换", [当前语言字符串, 当前主题字符串])
    }

</script>

<style lang="scss" scoped>
$颜色_橙色:#f60;
$颜色_绿色:rgb(0, 255, 0);
.nbutton {

    width: 200px;
    color: $颜色_橙色;
    // background: $颜色_绿色;
}
// .codemirror {
//     // width: 100%;
//     height: 800px;
// }

</style>