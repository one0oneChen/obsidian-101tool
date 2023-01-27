import { App, Modal, Setting } from "obsidian";
import { createApp } from "vue"
import naive输入弹窗 from "./naive输入弹窗.vue" //导入vue组件为naive按钮

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

// 创建对话框类并设置导出其他ts文件使用
export class vue输入弹窗 extends Modal {
    // 输入1:string
    // 输入2:string
    // 输入3:string

    constructor(app: App, 
            // 输入1:string, 输入2:string, 输入3:string, 
            ) {
        super(app);
        // this.输入1=输入1
        // this.输入2=输入2
        // this.输入3=输入3
    }

    onOpen() {
        let { containerEl } = this
        containerEl.empty()
        const vue输入弹窗容器=containerEl.createEl('div');
        const vueapp = createApp(naive输入弹窗,) // 创建按钮vue实例
        vueapp.provide('对话框配置', [
            {id:0, 标题:"父级标题1", 描述:"输入1提示信息: ", 默认文本:"描述xxx"},
            {id:1, 标题:"父级标题2", 描述:"输入2提示信息: ", 默认文本:"描述xxx"},
            {id:2, 标题:"父级标题3", 描述:"输入3提示信息: ", 默认文本:"描述xxx"},
        ])
        vueapp.mount(vue输入弹窗容器) // 将vue按钮实例挂载到容器元素
        
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


    constructor(app: App, onSubmit: (result: string) => void,
                输入1标题: string, 输入1提示: string, ) {
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

