import { App, PluginSettingTab, Setting } from "obsidian"
import Vue101tool from "./main"


//* 注册插件设置页
export class Vue101tool设置页 extends PluginSettingTab {
    plugin: Vue101tool
    
    constructor(app: App, plugin: Vue101tool) {
        super(app, plugin)
        this.plugin = plugin
    }

    //* 当插件设置页被激活时显示的内容
    display() {
        const { containerEl } = this
        containerEl.empty()

        //* 挂载原生界面元素
        containerEl.createEl('h2', {text: '101tool通用编辑器设置'});
        new Setting(containerEl)
            .setName('支持文件后缀') // 设置项的栏目名
            .setDesc('输入指定后缀(比如jpg,png)文件将以101tool编辑器打开(需重启插件):') // 对设置项的描述文字
            .addTextArea(text => text //使用addTextArea元素而非addText以支持文本框输入
                .setPlaceholder('txt,py,json,html,vue,ts,js,c,h,xml,...') //输入框内默认文本
                .setValue(this.plugin.settings.fileEnds)
                .onChange(async (value) => {
                    console.log('用户输入: ' + value);
                    this.plugin.settings.fileEnds = value;
                    await this.plugin.保存设置参数();
                }));

    }
}

