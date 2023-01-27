import { App, PluginSettingTab } from "obsidian"
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
    }
}