import { TextFileView } from "obsidian";
import { createApp } from "vue"
import naive按钮 from "./naive按钮.vue" //导入vue组件为naive按钮



function 挂载vue组件(容器元素:any){
    //* 挂载vue实例
    容器元素.createEl('h1', {text: 'Vue3-Naive组件'});
    const vue组件容器=容器元素.createEl('div', { cls: "vue_div"});
    const naive按钮实例1 = createApp(naive按钮) // 创建按钮vue实例
    naive按钮实例1.mount(vue组件容器) // 将vue按钮实例挂载到容器元素
}

export const VIEW_101_通用 = "101tool通用文件视图";
export class View101_通用 extends TextFileView {
    getViewData() { //返回当前数据状态。Obsidian 使用此方法在写入文件前将视图数据解码成纯文本内容。
        return this.data; //返回当前文件的纯文本数据
    }

    setViewData(data: string, clear: boolean) { //* 设置编辑器视图如何显示 */
        this.data = data;

        this.containerEl.empty()
        挂载vue组件(this.containerEl)
        this.containerEl.createDiv({text: this.data}) // 用div标签来包裹要显示的文本内容
    }   

    clear() { //方法会在 Obsidian 卸载文件时重置视图。
        this.data = ""; //清空data变量
    }

    getViewType() {
        return VIEW_101_通用;
    }
}

export const VIEW_101_CSV = "101toolCSV文件视图";
export class View101_CSV extends TextFileView {
    tableData!: string[][];
    纯文本数据!: string
    tableEl!: HTMLElement;

    getViewData() { //返回当前数据状态。Obsidian 使用此方法在写入文件前将视图数据解码成纯文本内容。
        let 表格数据=this.tableData.map((row) => row.join(",")).join("\n");
        this.纯文本数据=this.data
        return 表格数据
    }

    setViewData(data: string, clear: boolean) { //* 当文件被修改就执行此函数/
        this.tableData = data.split("\n").map((line) => line.split(","));
        this.刷新CSV编辑器视图() //刷新视图
    }   

    async onOpen() {
        this.contentEl.createEl("p", {text: "以下是纯文本显示:"});
        this.contentEl.createDiv({text: this.纯文本数据}) // 用div标签来包裹要显示的文本内容
        
        this.contentEl.createEl("p", {text: "以下是table标签显示:"});
        this.tableEl = this.contentEl.createEl("table", );
        this.contentEl.createEl("style", { text: "table {  border-collapse: collapse;} \
            table,td {border: 1px solid var(--background-modifier-border); }" });
        
        
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
                rowEl.createEl("td", { text: "" }) //添加td标签, 渲染单元格
                    .createEl("input", {attr : { value: cell } })  //td标签中再嵌入input标签, 并设置input标签的value值
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
