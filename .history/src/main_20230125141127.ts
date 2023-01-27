import { App, Editor, MarkdownView, Notice, Plugin, WorkspaceLeaf } from 'obsidian';
import { Vue101tool设置页 } from "./setting插件设置"
import { 消息弹窗, 输入弹窗, vue输入弹窗 } from "./modal对话框";
import { View101_通用,VIEW_101_通用, View101_CSV, VIEW_101_CSV } from './view通用编辑器视图';


// 函数区
function print(msg: any){
    new Notice(`${msg}`);
}

function editor_替换wiki链接(editor: Editor, view: MarkdownView){
    // console.log(editor.getSelection());
    let 初始选择文本: string = editor.getSelection() 
    let 匹配结果: any = 初始选择文本.match(/\[\[.*?\]\]/g) //正则语法与js一样 https://www.runoob.com/jsref/jsref-obj-regexp.html
    // print(`获取的文本: ${初始选择文本}\n 匹配结果: ${匹配结果}`) 
    
    let 替换后文本=初始选择文本
    let 提取链接数组=[]
    let 替换后链接数组=[]
    for (let i of 匹配结果){ //遍历语法 https://blog.csdn.net/qq_42712784/article/details/89556016
        let 提取链接: string = i.replace(/(\[\[|\]\])/g, "") // 这里的正则里面的 [|] 不能改为 [ | ]
        // print(`提取链接:${提取链接}`) 
        // 显示名称的判断
        let 显示名称=提取链接
        if (提取链接.contains('|')){ 
            let 链接分隔后部=提取链接.split('|')[1] // 用分割提取链接|后面的文本
            let 链接分隔前部=提取链接.split('|')[0] // 用分割提取链接|后面的文本
            let 链接前部后缀=""
            if (链接分隔前部.contains(".")){
                链接前部后缀=链接分隔前部.split('.')[1]
            }
            
            if (链接分隔后部.search(/\D/)!=-1){ //如果找到非数字的
                显示名称=链接分隔后部
            }
            提取链接=链接分隔前部
            // print(`链接前部后缀: ${链接前部后缀} 链接分隔后部:${链接分隔后部}\n显示名称:${显示名称}`) 
        }
        提取链接数组.push(提取链接)

        let 替换后链接:string = `[${显示名称}](${提取链接})`
        替换后链接数组.push(替换后链接)

        替换后文本 = 替换后文本.replace(i, 替换后链接)
    }
    print(`提取链接数组: ${提取链接数组}\n\n替换后链接数组: ${替换后链接数组}\n\n共 ${替换后链接数组.length} 个链接`)
    // print(替换后文本)
    editor.replaceSelection(替换后文本, 初始选择文本);
    return 替换后文本
}

function ribbon_创建侧边栏图标(父级: Plugin){
    // 这将在左侧ribbon中创建一个图标。
    const ribbonIconEl = 父级.addRibbonIcon('dice', '图标悬浮提示文本', (evt: MouseEvent) => {
        // 当用户单击图标时调用。
        print('This is a notice! 点击了图标!');
    });
    // 使用色带执行其他操作
    ribbonIconEl.addClass('my-plugin-ribbon-class');
}

function modal_消息弹窗(app实例: App, msg:string){
    new 消息弹窗(app实例, msg).open();
}

function modal_输入弹窗(app实例: App, editor: Editor, 输入标题:string, 
    输入描述数组:Array<any>, 回调函数:(array: Array<any>)=>any){

    new 输入弹窗(app实例, 回调函数, 输入标题, 输入描述数组).open();
}

function modal_vue输入弹窗(app实例: App, 对话框配置: Array<object> ) {
    // 函数使用说明文档
    let 返回值数组:any[] = []
    new vue输入弹窗(app实例, [
        {id:0, 标题:"父级标题1", 描述:"输入1提示信息: ", 默认文本:"描述xxx"},
        {id:1, 标题:"父级标题2", 描述:"输入2提示信息: ", 默认文本:"描述xxx"},
        {id:2, 标题:"父级标题3", 描述:"输入3提示信息: ", 默认文本:"描述xxx"},
    ], (输入对话框返回值) => { // 从 回调函数 取得返回值之后执行的内容
        返回值数组=输入对话框返回值
        print(`modal_vue输入弹窗函数里打印: ${返回值数组}`) 
    }).open()
    return 返回值数组
}

// 注册插件的设置
interface MyPluginSettings {
    mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
    mySetting: 'jpg,bmp,png,gif'
}


// 注册插件
export default class Vue101tool extends Plugin {
    settings!: MyPluginSettings;
    editor!: Editor

    async onload() { //* 在用户激活插件和插件更新时触发, 插件初始化基础功能的主要地方
        this.加载设置参数();
        ribbon_创建侧边栏图标(this)


        this.addCommand({ //* 这将添加一个编辑器命令，可以对当前编辑器实例执行某些操作
            id: '101tool_转wiki为标准链接',
            name: '101tool_转wiki为标准链接',
            editorCallback: editor_替换wiki链接 })

        this.addCommand({ //* 打开对话框
            id: '101tool_消息弹窗',
            name: '101tool_消息弹窗',
            callback: () => {
                modal_消息弹窗(this.app, "提示消息");
            }})

        this.addCommand({ //* 打开可输入对话框
            id: '101tool_输入弹窗',
            name: '101tool_输入弹窗',
            editorCallback: (editor:Editor) => {
                const 点击提交按钮 = (array: Array<any>) => {
                    print(`输入的值是: ${array}`)
                    // editor.replaceSelection(`${array}`);
                    editor.replaceSelection(`${array[0]}${array[1]}${array[2]}`)
                };
                modal_输入弹窗(this.app, editor, "addcommand测试标题", 
                    ["输入1", "输入2", "输入3"], 点击提交按钮)
            },

        })
        
        this.addCommand({ //* 打开可输入对话框
            id: '101tool_vue输入弹窗',
            name: '101tool_vue输入弹窗',
            callback: () => {
                let 返回值=modal_vue输入弹窗(this.app, [
                    {id:0, 标题:"父级标题1", 描述:"输入1提示信息: ", 默认文本:"描述xxx"},
                    {id:1, 标题:"父级标题2", 描述:"输入2提示信息: ", 默认文本:"描述xxx"},
                    {id:2, 标题:"父级标题3", 描述:"输入3提示信息: ", 默认文本:"描述xxx"},
                ]);
                print(`最终返回值: ${返回值[0]}`) //无法获取到返回值
            },
        })

        this.addSettingTab(new Vue101tool设置页(this.app, this)) //* 注册一个插件设置页
        
        // 如果这个插件连接了任何全局DOM事件(在应用程序中不属于这个插件的部分)，当这个插件被禁用时，使用这个函数将自动删除事件监听器。
        this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
            console.log('click', evt);
        });

        // 注册自定义的编辑器视图
        this.registerView(VIEW_101_CSV, (leaf: WorkspaceLeaf)=> new View101_CSV(leaf))
        this.registerExtensions(["csv"], VIEW_101_CSV);

        this.registerView(VIEW_101_通用, (leaf: WorkspaceLeaf)=> new View101_通用(leaf))
        this.registerExtensions(["py"], VIEW_101_通用);
        this.registerExtensions(["bat"], VIEW_101_通用);
        this.registerExtensions(["c"], VIEW_101_通用);
        this.registerExtensions(["h"], VIEW_101_通用);
        this.registerExtensions(["java"], VIEW_101_通用);
        this.registerExtensions(["txt"], VIEW_101_通用);

        // 当注册间隔时，当插件被禁用时，这个函数将自动清除间隔。
        this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
    }

    onunload() { //* 插件被禁用时触发的函数
    }

    async 加载设置参数() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async 保存设置参数() {
        await this.saveData(this.settings);
    }
}


// export { print, modal_消息弹窗, modal_输入弹窗}