import { App, PluginSettingTab } from "obsidian"
import VueSamplePlugin from "./main"

export class VueSamplePluginSettingTab extends PluginSettingTab {
    plugin: VueSamplePlugin
    constructor(app: App, plugin: VueSamplePlugin) {
        super(app, plugin)
        this.plugin = plugin
    }
    display() {
        const { containerEl } = this
        containerEl.empty()
    }
}