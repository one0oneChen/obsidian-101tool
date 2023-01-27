<template>
    <div id="editor"></div>
</template>


<!--代码源地址 https://blog.csdn.net/qq_43203949/article/details/128107891 -->
<script lang="ts" setup>
//@ts-ignore
import {onMounted} from 'vue'
import {EditorState,Extension, Compartment,StateEffect} from "@codemirror/state"
import {EditorView} from "@codemirror/view"
import {basicSetup} from "codemirror"
//语言包描述
import {LanguageDescription} from "@codemirror/language"
//语言包
import {languages} from "@codemirror/language-data"
/**
 * 创建一个compartment,并和对其修改的run函数
 * @param view 
 * @returns 
 */
// https://codemirror.net/examples/config/
// https://github.com/uiwjs/react-codemirror/blob/22cc81971a/src/useCodeMirror.ts#L144
// https://gist.github.com/s-cork/e7104bace090702f6acbc3004228f2cb
const createEditorCompartment = () => {
    const compartment = new Compartment()
    const run = (extension: Extension,view: EditorView) => {
        if(compartment.get(view.state)){
            //动态地重新配置插件
            view.dispatch({ effects: compartment.reconfigure(extension) }) // reconfigure
        }else{
            //向编辑器注入某一个插件
            view.dispatch({ effects: StateEffect.appendConfig.of(compartment.of(extension)) })// inject
        }
    }
    return { compartment, run }
}

//动态语言包函数
let {compartment, run } = createEditorCompartment()
let editor:any = null
const updateLang = (lang:string) => {
    //根据语言名称匹配语言描述信息
    const languageDescription:any = LanguageDescription.matchLanguageName(languages, "java", true);
    //注入高亮插件
    languageDescription.load().then((support: Extension)=>{
        run(support,editor)
    })
}

//挂载
onMounted(() => {
    let element = document.getElementById("editor")
    let state = EditorState.create({
        doc: "hello!!!",  //这是文本
        extensions:[basicSetup]  //传入的插件数组
    })
    let view = new EditorView({
        state:state, //编辑器状态，编辑器视图创建时初始化的状态
        parent:(element) //挂载的dom，可以通过parent挂载到指定的div块
    })
    editor = view
})

</script>

