import { App, Modal } from "obsidian";


// 创建对话框类并设置导出其他ts文件使用
export class 消息弹窗 extends Modal {
    提示消息!: string

    constructor(app: App) {
        super(app);
    }

    onOpen() {
        let { contentEl } = this;
        contentEl.setText(this.提示消息);
    }

    onClose() {
        let { contentEl } = this;
        contentEl.empty();
    }
}