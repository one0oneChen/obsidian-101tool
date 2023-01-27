import { Plugin } from "obsidian"
import { VueSamplePluginSettingTab } from "./setting"

// 函数区



// 注册插件
export default class Vue101Plugin extends Plugin {
    onload() { //* 在用户激活插件和插件更新时触发, 插件初始化基础功能的主要地方
        this.addSettingTab(new VueSamplePluginSettingTab(this.app, this))
    }
    onunload() { //* 插件被禁用时触发的函数
    }
}