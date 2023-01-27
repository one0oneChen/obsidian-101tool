import { TextFileView } from "obsidian";
import { createApp } from "vue"
import naive按钮 from "./naive按钮.vue" //导入vue组件为naive按钮


export const VIEW_TYPE_101 = "101tool通用文件视图";

function 挂载vue组件(容器元素:any){
    //* 挂载vue实例
    容器元素.createEl('h1', {text: 'Vue3-Naive组件'});
    const vue组件容器=容器元素.createEl('div', { cls: "vue_div"});
    const naive按钮实例1 = createApp(naive按钮) // 创建按钮vue实例
    naive按钮实例1.mount(vue组件容器) // 将vue按钮实例挂载到容器元素
}

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
        return VIEW_TYPE_101;
    }
}


export class View101_CSV extends TextFileView {
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
        return VIEW_TYPE_101;
    }
}
