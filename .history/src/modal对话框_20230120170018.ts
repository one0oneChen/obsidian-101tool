import { App, Modal } from "obsidian";
import Vue101tool from "./main"

let g消息:string=""
function 弹窗_纯消息(msg: string){
    g消息=msg
    new 消息弹窗().onOpen()
}

// 创建对话框类并设置导出其他ts文件使用
export class 消息弹窗 extends Modal {
    constructor(app: App) {
        super(app);
    }

    onOpen() {
        let { contentEl } = this;
        contentEl.setText(g消息);
    }

    onClose() {
        let { contentEl } = this;
        contentEl.empty();
    }
}