import { App, Modal, Setting, Editor } from "obsidian";
import { createApp } from "vue"
import html输入弹窗 from "./html输入弹窗.vue" //导入vue组件为naive按钮

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
    对话框配置: Array<object>
    editor!: Editor;
    输入对话框返回值!: Array<any>;
    // 构造函数，当创建一个 vue输入弹窗 实例时，需要传入 app 和 对话框配置 参数，同时通过 回调函数 返回值
    回调函数!: (输入对话框返回值: any[]) => void

    constructor(app: App, 对话框配置: Array<object>, 
            回调函数: (输入对话框返回值: any[]) => void) {
        super(app);
        this.对话框配置=对话框配置
        this.回调函数=回调函数
    }

    onOpen() {
        let { containerEl } = this
        containerEl.empty() //不可以省略

        //把html原生div使用vue组件方式渲染
        const vue输入弹窗容器=containerEl.createEl('div'); 
        const vueapp = createApp({
            methods:{
                获取返回值(value:any){
                    this.回调函数(value);
                    this.close();
                }
            },
            template:`<div> <html输入弹窗 @emit监听="获取返回值" /> </div>`
        }) // 创建按钮vue实例
        vueapp.provide('对话框配置', this.对话框配置) //将对话款配置参数下传
        vueapp.mount(vue输入弹窗容器) // 将vue按钮实例挂载到容器元素
        vueapp.config.globalProperties.vue全局对话框返回值 = ["这是vueapp的全局变量"] //vueapp全局属性
        // let 输入对话框返回值=vueapp.config.globalProperties.vue全局对话框返回值

        // new Setting(vue输入弹窗容器).addButton((btn) =>
        //     btn.setButtonText("提交编辑器").setCta()
        //     .onClick(() => {
        //         console.log(`输入对话框返回值: ${弹窗返回值}`)
        //         this.回调函数(弹窗返回值);
        //         this.close();
        //     }));
    }
    
    onClose() {
        let { contentEl } = this;
        // 当弹窗被关闭时释放所有资源
        contentEl.empty();
    }
}


export class 输入弹窗 extends Modal {
    result!: Array<any>;
    输入标题!: string;
    输入提示数组!:Array<any>;

    父线程的回调函数: (result: Array<any>) => any;

    constructor(app: App, 回调函数: (result: Array<any>) => any, 输入标题: string, 
        输入提示数组:Array<any>,  ) {
        super(app);
        this.输入标题 = 输入标题;
        this.输入提示数组=输入提示数组;
        this.result=[]
        this.父线程的回调函数 = 回调函数;
    }

    onOpen() {
        const { contentEl } = this;

        contentEl.createEl("h1", { text: this.输入标题 });
        
        for (let i in this.输入提示数组){
            new Setting(contentEl)
            .setName(this.输入提示数组[i])
            .addText((text) =>
                text.onChange((value) => {
                    this.result[i]=value
                }));
        }

        new Setting(contentEl)
        .addButton((btn) =>
            btn
            .setButtonText("提交")
            .setCta()
            .onClick(() => {
                this.父线程的回调函数(this.result);
                this.close();
            }));
    }

    onClose() {
        let { contentEl } = this;
        contentEl.empty();
    }
}

