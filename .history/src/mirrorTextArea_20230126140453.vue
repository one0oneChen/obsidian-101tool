<template>
    <!-- :indent-with-tab="true" 是否自动获取焦点-->
    <!-- <span class="nbutton">
        <n-dropdown trigger="hover" :options="下拉列表项目" class=""
            @select="处理下拉列表选择">
            <n-button >当前语言:{{当前语言}}</n-button>
        </n-dropdown>
    </span> -->
    <!-- <div>
    </div> -->
    <Codemirror class="codemirror"
        ref="cm"
        v-model="code" 
        placeholder="输入点什么..."
        :autofocus="true"
        :tabSize="tabSize"
        :extensions="extensions"
        @change="Change"
    />
</template>
<!--    :options="cm配置"
    :style="style"
    :indent-with-tab="indentWithTab"
    :spellcheck="spellcheck"
    :mode="mode"
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
    // naive组件
    // import { NButton, NDropdown } from "naive-ui"


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
    // let mode=ref("text/x-c++src")  //语言及语法模式
    let extensions=[python(),oneDark] //语法高亮与主题

    
    // 从父级直接注入的数据
    const app注入数据:any = inject('app注入数据')
    const code = ref(app注入数据.文件初始文本);
    function Change(){ //当 code 被修改时就触发返回code的值并存储
        app注入数据.mitt触发器.emit("emit监听", code.value)
    }
    
    //----------------------- 下拉列表配置 ----------------------
    let 当前语言='python'
    const 下拉列表项目=[
        {   label: 'python',
            key: 'python',  },
        {   label: 'c',
            key: "c"        },
        {   label: 'c++',
            key: 'cpp'      },
        {   label: 'java',
            key: 'java'     },
        {   label: 'javascript',
            key: 'javascript'     },
        {   label: 'typescript',
            key: 'typescript'     },
    ]
    function 处理下拉列表选择(key: string | number){
        当前语言=String(key)
        switch (key){
            case 'python':{ extensions[0]=python(); break;}
            case 'c':{ extensions[0]=cpp(); break;}
            case 'c++':{ extensions[0]=cpp(); break;}
            case 'java':{ extensions[0]=java(); break;}
            case 'javascript':{ extensions[0]=javascript(); break;}
            // case 'typescript':{ extensions[0]=typescript(); break;}
        }

    }

</script>

<style lang="scss" scoped>
$颜色_橙色:#f60;
$颜色_绿色:rgb(0, 255, 0);
.nbutton {

    width: 100px;
    color: $颜色_橙色;
    // background: $颜色_绿色;
}
.codemirror {
    // width: 100%;
    height: 800px;
}

</style>