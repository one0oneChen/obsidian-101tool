<template>
    <!-- :indent-with-tab="true" 是否自动获取焦点-->
    <div style="{height:'36px'}">
        <n-dropdown trigger="hover" :options="语言下拉列表项目" 
                    @select="处理语言下拉列表选择">
            <n-button class="codemirror_nbtn" secondary type="primary">语言: {{当前语言}}</n-button>
        </n-dropdown>
        <n-dropdown trigger="hover" :options="主题下拉列表项目"
            @select="处理主题下拉列表选择">
            <n-button class="codemirror_nbtn" secondary type="primary">
                主题: {{当前主题}}</n-button>
        </n-dropdown>
        <span v-if="当前主题=='light'" class="codemirror_nbtn">
            背景色:
            <n-color-picker class="lightbgcolor"
                :swatches="['#FFFFFF','#18A058','#2080F0','#F0A020','#FFFAEE']" 
                :show-preview="true"
                :modes="['hex', 'rgb', 'hsl']"
                :default-value="当前亮色模式背景色"
                :on-update-value="改变亮色模式背景色"
                :placement="'bottom'"
            />
        </span>
        <!-- :style="{display:'inline'}" -->
        
    </div>
    
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
        @change="cmChange"
        @blur="cmChange" 
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
    import { syntaxHighlighting } from '@codemirror/language';
    import { oneDarkHighlightStyle } from "@codemirror/theme-one-dark";
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

    // import '@codemirror/merge'

    // 导入主题自定义配置的模块
    import { EditorView } from "@codemirror/view"
    import { ref,inject, } from "vue";
    // naive组件
    import { NButton, NDropdown, NColorPicker } from "naive-ui"


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
    let style={ height: `${window.innerHeight-(36*2)}px`,}
    let tabSize=ref(4)

    let 当前语言=ref(app注入数据.使用语言)
    let 当前主题=ref(app注入数据.主题)
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
    let 当前亮色模式背景色=app注入数据.亮色模式背景色

    // vue-codemirror目前么有亮色主题, 所以自定义亮色主题
    let myThemelight = EditorView.theme({
        // 输入的字体颜色
        "&": {
            color: "#383D46",
            backgroundColor: 当前亮色模式背景色
        },
        ".cm-content": {
            fontFamily: app注入数据.字体,
            caretColor: 当前亮色模式背景色,
        },
        // 激活行背景色
        ".cm-activeLine": {
            backgroundColor: "none"
        },
        // 激活序列的背景色
        ".cm-activeLineGutter": {
            backgroundColor: "#B3C3E67A"
        },
        //光标的颜色
        "&.cm-focused .cm-cursor": {
            borderLeftColor: "#2F3338"
        },
        // 选中的状态
        "&.cm-focused .cm-selectionBackground, ::selection": {
            backgroundColor: "#FFD95B",
            // color:'#383D46'
        },
        // 左侧侧边栏的颜色
        ".cm-gutters": {
            backgroundColor: "#ffeaa6",
            color: "#777777", //侧边栏文字颜色
            border: "none"
        }
    }, { dark: true })
    
    //----------------------- onedark ----------------------
    const ivory = "#abb2bf", stone = "#7d8799", // Brightened compared to original to increase contrast
        darkBackground = "#21252b", highlightBackground = "#2c313a", 
        background = "#282c34", tooltipBackground = "#353a42", 
        selection = "#3E4451", cursor = "#528bff";
    
    let myThemedark = EditorView.theme({
        "&": {
            color: ivory,
            backgroundColor: background
        },
        ".cm-content": {
            fontFamily: app注入数据.字体,
            caretColor: cursor
        },
        ".cm-cursor, .cm-dropCursor": { borderLeftColor: cursor },
        "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": { backgroundColor: selection },
        ".cm-panels": { backgroundColor: darkBackground, color: ivory },
        ".cm-panels.cm-panels-top": { borderBottom: "2px solid black" },
        ".cm-panels.cm-panels-bottom": { borderTop: "2px solid black" },
        ".cm-searchMatch": {
            backgroundColor: "#72a1ff59",
            outline: "1px solid #457dff"
        },
        ".cm-searchMatch.cm-searchMatch-selected": {
            backgroundColor: "#6199ff2f"
        },
        ".cm-activeLine": { backgroundColor: "#6699ff0b" },
        ".cm-selectionMatch": { backgroundColor: "#aafe661a" },
        "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
            backgroundColor: "#bad0f847",
            outline: "1px solid #515a6b"
        },
        ".cm-gutters": {
            backgroundColor: background,
            color: stone,
            border: "none"
        },
        ".cm-activeLineGutter": {
            backgroundColor: highlightBackground
        },
        ".cm-foldPlaceholder": {
            backgroundColor: "transparent",
            border: "none",
            color: "#ddd"
        },
        ".cm-tooltip": {
            border: "none",
            backgroundColor: tooltipBackground
        },
        ".cm-tooltip .cm-tooltip-arrow:before": {
            borderTopColor: "transparent",
            borderBottomColor: "transparent"
        },
        ".cm-tooltip .cm-tooltip-arrow:after": {
            borderTopColor: tooltipBackground,
            borderBottomColor: tooltipBackground
        },
        ".cm-tooltip-autocomplete": {
            "& > ul > li[aria-selected]": {
                backgroundColor: highlightBackground,
                color: ivory
            }
        }
    }, { dark: true });

    let themeLight=[myThemelight, syntaxHighlighting(oneDarkHighlightStyle)]
    let themeDark=[myThemedark, syntaxHighlighting(oneDarkHighlightStyle)]
    const 主题字典: {[key:string]:any}={
        'dark': themeDark,
        'light': themeLight,
    }
    let extensions=[语言字典[当前语言.value], 主题字典[当前主题.value]]


    // 设置代码初始文本
    const code = ref(app注入数据.文件初始文本);

    function cmChange(){ //当 code 被修改时就触发返回code的值并存储
        app注入数据.mitt触发器.emit("emit监听文件修改", code.value)
    }
    
    //----------------------- 下拉列表 ----------------------
    let 支持语言列表=[ 'python','cpp','rust','sql','json','html','css','javascript',
                    'php','xml','vue','angular','wast','lezer','markdown']

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
        当前语言.value=String(key)
        app注入数据.mitt触发器.emit("emit监听语言主题切换", [当前语言.value, 当前主题.value, 当前亮色模式背景色])
    }
    function 处理主题下拉列表选择(key: string|number){
        当前主题.value=String(key)
        app注入数据.mitt触发器.emit("emit监听语言主题切换", [当前语言.value, 当前主题.value, 当前亮色模式背景色])
    }
    function 改变亮色模式背景色(value: string){
        当前亮色模式背景色=value
        console.log(`当前亮色模式背景色:${当前亮色模式背景色}`)
        app注入数据.mitt触发器.emit("emit监听语言主题切换", [当前语言.value, 当前主题.value, 当前亮色模式背景色])
    }

    //----------------------- 处理颜色选择器 ----------------------


</script>

<style lang="scss" scoped>
$颜色_橙色:#b1a16d;
$颜色_绿色:#00ff00;
$yanse: #b1a16d;

.codemirror_nbtn {
    color: $颜色_橙色;
    // border: 1px solid $颜色_橙色;
    border: none;
}
.lightbgcolor {
    display: inline;
    height: 36px; 
    width: 50px;
    border: none;
    padding: 0px;
    margin: 0px;
}

</style>