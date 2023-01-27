import { App,TextFileView, WorkspaceLeaf } from "obsidian";
import { createApp } from "vue"
import mitt from "mitt"
import codemirror from "./vues/mirrorTextArea.vue"
import  Vue101tool  from "./main"


export const VIEW_101_通用 = "101tool通用文件视图";
export class View101_通用 extends TextFileView {
    plugin: any; 

    // 构造函数，当创建 "View101_通用" 实例时需要从外面传入一个 "View101tool" 实例
    constructor(leaf: WorkspaceLeaf, plugin: Vue101tool, ) {
        super(leaf); //! 访问派生类的构造函数中的 "this" 前，必须调用 "super"。
        // 将外面传入的 "View101tool" 实例赋给变量 plugin
        this.plugin = plugin
    }

    getViewData() { //返回当前数据状态。Obsidian 使用此方法在写入文件前将视图数据解码成纯文本内容。
        return this.data; //返回当前文件的纯文本数据
    }

    async setViewData(data: string, clear: boolean) { //* 设置编辑器视图如何显示 */
        this.data = data;
        this.containerEl.empty();
        //* 载入插件目录下的data.json文件,  
        this.plugin.settings = Object.assign({}, await this.plugin.loadData());

        const emitter = mitt()
        // vueapp.config.globalProperties.$emitter = emitter
        emitter.on("emit监听文件修改", (value:any)=>{
            this.data =value
            // console.log(`emitter文件修改:${value}`)
            this.save()
        })

        emitter.on("emit监听语言主题切换", async (value:any)=>{
            console.log(`emit监听语言主题切换`)
            this.初始化vueApp({ mitt触发器:emitter, 
                文件初始文本:this.data, 使用语言:value[0], 主题:value[1] })
        })

        this.初始化vueApp({ mitt触发器:emitter, 
            文件初始文本:this.data, 
            使用语言: this.plugin.settings.默认语言,         //this.plugin.settings.语言
            主题: this.plugin.settings.默认主题})              //this.plugin.settings.语言

    }

    初始化vueApp( app注入数据:object ){ //* 需要写在函数里,这样div容器和vueapp都是一次性的
        this.containerEl.innerHTML=""
        let 临时容器=this.containerEl.createEl('div',);
        临时容器.style.height='100%' //不加这句会导致codemirror滚动条消失
        // console.log(`临时容器div的style: ${临时容器.style}`)
        let vueapp = createApp(codemirror) // 创建按钮vue实例
        vueapp.provide('app注入数据', app注入数据 ) //将对话款配置参数下传
        // vueapp.mount(this.containerEl) // 将vue按钮实例挂载到容器元素
        vueapp.mount(临时容器) //! 将vue按钮实例挂载到div元素codemirror会出错
        // return vueapp
    }
    
    async clear() { //方法会在 Obsidian 卸载文件时重置视图。
        this.containerEl.empty();
        this.data=""
    }

    getViewType() {
        return VIEW_101_通用;
    }
}
