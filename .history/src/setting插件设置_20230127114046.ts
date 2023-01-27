import { App, PluginSettingTab, Setting } from "obsidian"
import Vue101tool from "./main"
import { createApp } from "vue"
import naive按钮 from "./vues/naive按钮.vue" //导入vue组件为naive按钮

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
        containerEl.createEl('h2', {text: '101tool通用编辑器支持文件后缀'});
        new Setting(containerEl)
            .setName('wiki链接转html<img>标签') // 设置项的栏目名
            .setDesc('输入指定后缀的wiki链接(比如jpg,png),将链接转换为html的img标签:') // 对设置项的描述文字
            .addText(text => text
                .setPlaceholder('txt,py,json,html,vue,ts,js,c,h,xml,...') //输入框内默认文本
                .setValue(this.plugin.settings.mySetting)
                .onChange(async (value) => {
                    console.log('用户输入: ' + value);
                    this.plugin.settings.mySetting = value;
                    await this.plugin.保存设置参数();
                }));

        //* 挂载vue实例
        containerEl.createEl('h2', {text: 'Vue3-Naive组件'});
        const vue组件容器=containerEl.createEl('div', { cls: "vue_div"});
        const naive按钮实例1 = createApp(naive按钮) // 创建按钮vue实例
        naive按钮实例1.mount(vue组件容器) // 将vue按钮实例挂载到容器元素
    }
}

