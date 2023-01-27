import { TextFileView,Setting } from "obsidian";
import { createApp } from "vue"
import mitt from "mitt"
import codemirror from "./vues/mirrorTextArea.vue"
import  Vue101tool  from "./main"


export const VIEW_101_通用 = "101tool通用文件视图";
export class View101_通用 extends TextFileView {
    plugin!: Vue101tool
    textareaEl:any=""
    initconut:number=0

    getViewData() { //返回当前数据状态。Obsidian 使用此方法在写入文件前将视图数据解码成纯文本内容。
        return this.data; //返回当前文件的纯文本数据
    }

    setViewData(data: string, clear: boolean) { //* 设置编辑器视图如何显示 */
        this.data = data;
        this.containerEl.empty();

        const emitter = mitt()
        // vueapp.config.globalProperties.$emitter = emitter
        emitter.on("emit监听文件修改", (value:any)=>{
            this.data =value
            // console.log(`emitter文件修改:${value}`)
            this.save()
        })

        emitter.on("emit监听语言主题切换", (value:any)=>{
            console.log(`emit监听语言主题切换`)
            this.初始化vueApp({ mitt触发器:emitter, 
                文件初始文本:this.data, 使用语言:value[0], 主题:value[1] })
        })

        this.初始化vueApp({ mitt触发器:emitter, 
            文件初始文本:this.data, 
            使用语言:this.plugin.settings.默认语言, 
            主题: this.plugin.settings.默认主题})
        
        

    }

    初始化vueApp( app注入数据:object ){ //* 需要写在函数里,这样div容器和vueapp都是一次性的
        this.containerEl.innerHTML=""
        let 临时容器=this.containerEl.createEl('div');
        let vueapp = createApp(codemirror)// 创建按钮vue实例
        vueapp.provide('app注入数据', app注入数据 ) //将对话款配置参数下传
        vueapp.mount(临时容器) // 将vue按钮实例挂载到容器元素
    }

    clear() { //方法会在 Obsidian 卸载文件时重置视图。
        this.containerEl.empty();
        // this.data=""
    }

    getViewType() {
        return VIEW_101_通用;
    }
}
