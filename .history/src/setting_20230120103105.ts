import { App, PluginSettingTab } from "obsidian"
import Vue101Plugin from "./main"

//* 注册插件设置页
export class Vue101PluginSettingTab extends PluginSettingTab {
    plugin: Vue101Plugin
    constructor(app: App, plugin: Vue101Plugin) {
        super(app, plugin)
        this.plugin = plugin
    }
    //* 当插件设置页被激活时显示的内容
    display() {
        const { containerEl } = this
        containerEl.empty()
    }
}