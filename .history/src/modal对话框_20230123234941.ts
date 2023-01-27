import { App, Modal, Setting, Editor } from "obsidian";
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
export let 输入对话框返回值:any =[]
let vueapp:any=null
export class vue输入弹窗 extends Modal {
    对话框配置: Array<object>
    editor!: Editor;

    constructor(app: App, 对话框配置: Array<object>) {
        super(app);
        this.对话框配置=对话框配置
    }

    onOpen() {
        let { containerEl } = this
        containerEl.empty()
        const vue输入弹窗容器=containerEl.createEl('div', );
        vueapp = createApp(naive输入弹窗,) // 创建按钮vue实例
        vueapp.provide('对话框配置', this.对话框配置) //将对话款配置参数下传
        vueapp.mount(vue输入弹窗容器) // 将vue按钮实例挂载到容器元素
        vueapp.config.globalProperties.vue全局对话框返回值 = []
        // 输入对话框返回值=vueapp.config.globalProperties.vue全局对话框返回值
    }
    
    onClose() {
        let { contentEl } = this;
        contentEl.empty();
        输入对话框返回值=vueapp.config.globalProperties.vue全局对话框返回值
        // this.editor.replaceRange(`${输入对话框返回值}`, this.editor.getCursor())
    }
}

let id=0
export class 输入弹窗 extends Modal {
    result!: Array<object>;
    输入标题!: string;
    输入提示!: Array<object>;

    点击提交按钮: (result: string) => void;

    constructor(app: App, 点击按钮触发: (result: string) => void,
                输入标题: string, 输入提示列表: Array<object>, ) {
        super(app);
        this.输入标题 = 输入标题;
        this.输入提示 = 输入提示列表;

        this.点击提交按钮 = 点击按钮触发;
    }

    onOpen() {
        const { contentEl } = this;

        contentEl.createEl("h1", { text: this.输入标题 });
        
        for (let 提示 of this.输入提示){
            id=id++
            new Setting(contentEl)
            .setName(提示.提示名)
            .addText((text) =>
                text.onChange((value) => {
                this.result[id]={ `${提示.提示名}`: value }
                }));
        }
        

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

