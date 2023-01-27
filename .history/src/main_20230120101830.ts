import { Plugin } from "obsidian"
import { VueSamplePluginSettingTab } from "./setting"

// 函数区


export default class VueSamplePlugin extends Plugin {
    onload() {
        this.addSettingTab(new VueSamplePluginSettingTab(this.app, this))
    }
    onunload() {
    }
}