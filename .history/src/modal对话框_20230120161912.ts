import { App, Modal } from "obsidian";


// 创建对话框类并设置导出其他ts文件使用
export class 示例对话框 extends Modal {
    constructor(app: App) {
        super(app);
    }

    onOpen() {
        let { contentEl } = this;
        contentEl.setText("Look at me, I'm a modal! 👀");
    }

    onClose() {
        let { contentEl } = this;
        contentEl.empty();
    }
}