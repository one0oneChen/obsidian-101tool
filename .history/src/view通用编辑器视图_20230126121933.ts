import { TextFileView } from "obsidian";
import { createApp } from "vue"
import mitt from "mitt"
import naive按钮 from "./naive按钮.vue" //导入vue组件为naive按钮
import codemirror from "./mirrorTextArea.vue"


function 挂载vue组件(vue组件:any, 容器元素:any){
    //* 挂载vue实例
    // 容器元素.createEl('h1', {text: 'Vue3-Naive组件'});
    const vueapp = createApp(vue组件) // 创建按钮vue实例
    vueapp.mount(容器元素) // 将vue按钮实例挂载到容器元素
    return vueapp
}

export const VIEW_101_通用 = "101tool通用文件视图";
export class View101_通用 extends TextFileView {
    textareaEl:any=""
    vueapp:any=null

    getViewData() { //返回当前数据状态。Obsidian 使用此方法在写入文件前将视图数据解码成纯文本内容。
        return this.data; //返回当前文件的纯文本数据
    }

    setViewData(data: string, clear: boolean) { //* 设置编辑器视图如何显示 */
        this.data = data;

        this.containerEl.empty();
        this.vueapp = createApp(codemirror) // 创建按钮vue实例
        
        const emitter = mitt()
        // vueapp.config.globalProperties.$emitter = emitter
        emitter.on("emit监听", (value:any)=>{
            this.data =value
            // console.log(`修改后的文本:${this.data}`)
            this.save()
        })

        this.vueapp.provide('app注入数据', { mitt触发器:emitter, 
            文件初始文本:this.data  }) //将对话款配置参数下传
        this.vueapp.mount(this.containerEl) // 将vue按钮实例挂载到容器元素
        
    }

    clear() { //方法会在 Obsidian 卸载文件时重置视图。
        this.data = ""; //清空data变量
        this.vueapp.unmount(this.containerEl) 
    }

    getViewType() {
        return VIEW_101_通用;
    }
}

export const VIEW_101_CSV = "101toolCSV文件视图";
export class View101_CSV extends TextFileView {
    tableData!: string[][];
    tableEl!: HTMLElement;
    纯文本数据!: any

    getViewData() { //返回当前数据状态。Obsidian 使用此方法在写入文件前将视图数据解码成纯文本内容。
        this.tableData.map((row) => row.join(",")).join("\n");
        return this.data
    }

    setViewData(data: string, clear: boolean) { //* 当文件被修改就执行此函数/
        this.data=data
        this.contentEl.empty()
        this.tableData = data.split("\n").map((line) => line.split(","));
        
        console.log(`纯文本数据: ${this.data}`)
        this.contentEl.createEl("p", {text: "以下是纯文本显示:"});
        this.contentEl.createEl("div", {text: this.data}) // 用div标签来包裹要显示的文本内容
        
        this.contentEl.createEl("p", {text: "以下是table标签显示:"});
        this.tableEl = this.contentEl.createEl("table", );
        this.contentEl.createEl("style", { text: "table {  border-collapse: collapse;} \
            table,td {border: 1px solid var(--background-modifier-border); }" });
        
        this.刷新CSV编辑器视图() //刷新视图
    }   

    async onOpen() {
    }



    async onClose() {
        this.contentEl.empty();
    }

    刷新CSV编辑器视图() {
        // Remove previous data.
        this.tableEl.empty();
        
        const bodyEl = this.tableEl.createEl("tbody");
        
        this.tableData.forEach((row, i) => {
            const rowEl = bodyEl.createEl("tr"); //添加tr标签, 渲染表格行
        
            row.forEach((cell, j) => { // 遍历每行的单元格, 
                const inputEl=rowEl
                    .createEl("td", { text: "" }) //添加td标签, 渲染单元格
                    .createEl("input", {attr : { value: cell } });  //td标签中再嵌入input标签, 并设置input标签的value值

                inputEl.oninput = (ev) => { // 触发input元素的修改事件来保存文件
                    if (ev.currentTarget instanceof HTMLInputElement) {
                        this.tableData[i][j] = ev.currentTarget.value;
                        this.save();
                    }};
            });
        });
    }

    clear() { //方法会在 Obsidian 卸载文件时重置视图。
        this.data = ""; //清空data变量
    }

    getViewType() {
        return VIEW_101_通用;
    }
}
