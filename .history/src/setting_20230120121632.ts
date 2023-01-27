import { App, PluginSettingTab } from "obsidian"
import Vue101tool from "./main"
import { createApp } from "vue"
import naive按钮 from "./naive按钮.vue" //导入vue组件为naive按钮

//* 注册插件设置页
export class Vue101toolsetpage extends PluginSettingTab {
    plugin: Vue101tool
    constructor(app: App, plugin: Vue101tool) {
        super(app, plugin)
        this.plugin = plugin
    }
    //* 当插件设置页被激活时显示的内容
    display() {
        const { containerEl } = this
        containerEl.empty()
        const naive按钮实例1 = createApp(naive按钮) // 创建按钮vue实例
        naive按钮实例1.mount(containerEl) // 将vue按钮实例挂载到容器元素
    }
}