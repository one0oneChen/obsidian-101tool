import { App, Modal } from "obsidian";


// 注册对话框类
export class ExampleModal extends Modal {
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