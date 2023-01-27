import { App, Modal, Setting } from "obsidian";


// 创建对话框类并设置导出其他ts文件使用
export class 消息弹窗 extends Modal {
    消息:string

    constructor(app: App, 消息:string) {
        super(app);
        this.消息=消息
    }

    onOpen() {
        let { contentEl } = this;
        contentEl.setText(this.消息);
    }

    onClose() {
        let { contentEl } = this;
        contentEl.empty();
    }
}


export class 输入弹窗 extends Modal {
    result!: string;
    输入1标题!: string;
    输入1提示!: string;

    点击提交按钮: (result: string) => void;


    constructor(
        app: App, onSubmit: (result: string) => void,
        输入1标题: string,
        输入1提示: string,
        ) {
        super(app);
        this.输入1标题 = 输入1标题;
        this.输入1提示 = 输入1提示;
        this.点击提交按钮 = onSubmit;
    }

    onOpen() {
        const { contentEl } = this;

        contentEl.createEl("h1", { text: this.输入1标题 });
        new Setting(contentEl)
        .setName(this.输入1提示)
        .addText((text) =>
            text.onChange((value) => {
            this.result = value
            }));

        new Setting(contentEl)
        .addButton((btn) =>
            btn
            .setButtonText("提交")
            .setCta()
            .onClick(() => {
                this.close();
                this.点击提交按钮(this.result);
            }));
    }

    onClose() {
        let { contentEl } = this;
        contentEl.empty();
    }
}

