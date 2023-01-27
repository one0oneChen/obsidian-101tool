import { TextFileView } from "obsidian";
import { createApp } from "vue"
import naive按钮 from "./naive按钮.vue" //导入vue组件为naive按钮


export const VIEW_TYPE_101 = "101tool通用文件视图";

export class View101_CSV extends TextFileView {
    getViewData() { //返回当前数据状态。Obsidian 使用此方法在写入文件前将视图数据解码成纯文本内容。
        return this.data; //返回当前文件的纯文本数据
    }

    setViewData(data: string, clear: boolean) { //* 设置编辑器视图如何显示 */
        this.data = data;

        this.containerEl.empty()


        this.containerEl.createDiv({text: this.data}) // 用div标签来包裹要显示的文本内容
    }   

    clear() { //方法会在 Obsidian 卸载文件时重置视图。
        this.data = ""; //清空data变量
    }

    getViewType() {
        return VIEW_TYPE_101;
    }
}
