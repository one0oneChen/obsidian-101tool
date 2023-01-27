import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { Vue101tool设置页 } from "./setting"

// 函数区
function print(msg: any){
    new Notice(`${msg}`);
}

function len(msg: any):number{
    // if typeof()
    let 长度:number = msg.length;
    return 长度;
}


// 注册插件
export default class Vue101tool extends Plugin {
    async onload() { //* 在用户激活插件和插件更新时触发, 插件初始化基础功能的主要地方
        await this.addSettingTab(new Vue101tool设置页(this.app, this)) // 加载插件设置页
    }
    async onunload() { //* 插件被禁用时触发的函数
    }
}