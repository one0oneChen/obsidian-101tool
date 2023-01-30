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
            .addTextArea((text) => {
                text.inputEl.style.width = "500px";
                text.inputEl.style.height = "100px";
                return text
                    .setPlaceholder('txt,py,json,html,vue,ts,js,c,h,xml,...') //输入框内默认文本
                    .setValue(this.plugin.settings.fileEnds)
                    .onChange(async (value) => {
                        console.log('用户输入: ' + value);
                        this.plugin.settings.fileEnds = value;
                        await this.plugin.保存设置参数();
                    })
                });

        let 设置字体:any =this.plugin.settings.默认字体
        new Setting(containerEl)
            .setName('设置默认字体') // 设置项的栏目名
            .setDesc('设置编辑器默认字体(eg:\'FiraCode NF\',黑体,宋体):') // 对设置项的描述文字
            .addText(text => text //使用addTextArea元素而非addText以支持文本框输入
            .setValue(设置字体)
            .onChange(async (value) => {
                console.log('用户输入: ' + value);
                this.plugin.settings.默认字体 = value;
                await this.plugin.保存设置参数();
            }));
        
        new Setting(containerEl)
            .setName('设置默认语言') // 设置项的栏目名
            .setDesc('设置编辑器默认语言:') // 对设置项的描述文字
            //使用addTextArea元素而非addText以支持文本框输入
            .addDropdown((text) => {
                // text.selectEl.textContent=this.plugin.settings.默认语言
                return text
                    .addOptions({
                        'python':'python', //下拉列表会一直显示这个值,其实值不是这个
                        'cpp':'cpp',
                        'rust':'rust',
                        'sql':'sql',
                        'json':'json',
                        'html':'html',
                        'css':'css',
                        'javascript':'javascript',
                        'php':'php',
                        'xml':'xml',
                        'vue':'vue',
                        'angular':'angular',
                        'wast':'wast',
                        'lezer':'lezer',
                        'markdown':'markdown',
                    })
                    .setValue(this.plugin.settings.默认语言)
                    .onChange(async (value) => {
                        console.log('用户输入: ' + value);
                        this.plugin.settings.默认语言 = value;
                        await this.plugin.保存设置参数();
                    })
                }
        );

        new Setting(containerEl)
            .setName('设置默认主题') // 设置项的栏目名
            .setDesc('设置编辑器默认主题:') // 对设置项的描述文字
            .addDropdown(text => text //使用addTextArea元素而非addText以支持文本框输入
            .addOptions({
                'dark':'dark',
                'light':'light',
                })
            .setValue(this.plugin.settings.默认主题)
            .onChange(async (value) => {
                console.log('用户输入: ' + value);
                this.plugin.settings.默认主题 = value;
                await this.plugin.保存设置参数();
            }));
        
        let 亮色模式背景色:any =this.plugin.settings.默认亮色主题背景
        new Setting(containerEl)
            .setName('设置亮色模式背景色') // 设置项的栏目名
            .setDesc('设置编辑器亮色模式背景色(eg:#777777):') // 对设置项的描述文字
            .addText(text => text //使用addTextArea元素而非addText以支持文本框输入
            .setValue(亮色模式背景色)
            .onChange(async (value) => {
                console.log('用户输入: ' + value);
                this.plugin.settings.默认亮色主题背景 = String(value);
                await this.plugin.保存设置参数();
            }));
        
        containerEl.createEl('h2', {text: '101tool3D编辑器设置'});
        new Setting(containerEl)
        .setName('设置默认3D编辑器') // 设置项的栏目名
        .setDesc('设置编辑器默认3D编辑器:') // 对设置项的描述文字
        .addDropdown(text => text //使用addTextArea元素而非addText以支持文本框输入
        .addOptions({
            'SketchUp':'SketchUp',
            'threejs':'threejs',
            '酷大师':'酷大师',
            })
        .setValue(this.plugin.settings.默认3D编辑器)
        .onChange(async (value) => {
            console.log('用户输入: ' + value);
            this.plugin.settings.默认3D编辑器 = value;
            await this.plugin.保存设置参数();
        }));
        // let madiv=containerEl.createEl('div')
        // let 打赏说明='如果你觉得插件有价值,想要打赏,可用微信扫描打赏码,\n感谢您的认可,祝您生活愉快~'
        // let imgsrc='https://gitee.com/one0oneChen/obsidian-101tool/blob/master/src/%E9%BC%93%E5%8A%B1.jpg'
        // madiv.createEl('p',{text: 打赏说明})
        // let imgEl=madiv.createEl('div',{attr:{  }})

    }
}

