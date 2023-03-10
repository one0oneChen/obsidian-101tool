import { App, Editor, MarkdownView, Notice, Plugin, WorkspaceLeaf } from 'obsidian';
import { Vue101tool设置页 } from "./setting插件设置"
import { 消息弹窗, 输入弹窗, vue输入弹窗 } from "./modal对话框";
import { View101_通用,VIEW_101_通用, } from './view通用编辑器视图';
import { VIEW_101_3Deditor页面,View101_3Deditor页面 } from './view3D视图';


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

function modal_消息弹窗(app实例: App, msg:string){
    new 消息弹窗(app实例, msg).open();
}

function modal_输入弹窗(app实例: App, 输入标题:string, 输入描述数组:Array<any>, 
                        回调函数:(array: Array<any>)=>any){

    new 输入弹窗(app实例, 回调函数, 输入标题, 输入描述数组).open();
}


// 注册插件的各参数变量
interface MyPluginSettings {
    fileEnds: string;
    默认语言: string;
    默认主题: string;
    默认字体?: string;
    默认亮色主题背景?: string
    默认3D编辑器: string
}
const DEFAULT_SETTINGS: MyPluginSettings = {
    fileEnds: 'txt,py,json,html,vue,ts,js,c,cpp,h,xml,java,bat,csv',
    默认语言: 'cpp',
    默认主题: 'dark',
    默认字体: "'FiraCode NF'",
    默认亮色主题背景: "#FFFAEE",
    默认3D编辑器: "SketchUp",
}



// 注册插件
export default class Vue101tool extends Plugin {
    settings!: MyPluginSettings;
    editor!: Editor

    async onload() { //* 在用户激活插件和插件更新时触发, 插件初始化基础功能的主要地方
        this.addSettingTab(new Vue101tool设置页(this.app, this)) //* 注册一个插件设置页
        await this.设置插件默认参数();

        //------------------------ 注册自定义的编辑器视图-----------------------------
        // this.registerView(VIEW_101_CSV, (leaf: WorkspaceLeaf)=> new View101_CSV(leaf))
        this.registerView(VIEW_101_通用, (leaf: WorkspaceLeaf)=> new View101_通用(leaf, this))
        // 使用插件设置的后缀参数来 关联后缀与自定义编辑器
        const 支持文件后缀列表=this.settings.fileEnds.split(',')
        for (let i of 支持文件后缀列表){
            this.registerExtensions([i], VIEW_101_通用);
        }

        this.registerView(VIEW_101_3Deditor页面, (leaf: WorkspaceLeaf)=> new View101_3Deditor页面(leaf, this))
        this.registerExtensions(['fbx'], VIEW_101_3Deditor页面);

        //------------------------ 左侧图标按钮-------------------------
        this.addRibbonIcon('box', '打开101tool3Deditor', (evt: MouseEvent) => {
            // 当用户单击图标时调用
            this.打开3Deditor视图()
        });

        //----------------------- 注册命令到命令面板 ----------------------
        this.addCommand({ //* 这将添加一个编辑器命令，可以对当前编辑器实例执行某些操作
            id: '101tool_转wiki为标准链接',
            name: '101tool_转wiki为标准链接',
            editorCallback: editor_替换wiki链接 })

        this.addCommand({ //* 打开对话框
            id: '101tool_消息弹窗',
            name: '101tool_消息弹窗',
            callback: () => {
                modal_消息弹窗(this.app, "提示消息"); }})

        this.addCommand({ //* 打开可输入对话框
            id: '101tool_dataview汇总',
            name: '101tool_dataview汇总',
            editorCallback: (editor:Editor) => {
                const 点击提交按钮 = (array: Array<any>) => {
                    print(`输入的值是: ${array}`)
                    // editor.replaceSelection(`${array}`);
                    let 字符串拼接=""
                    for (let i of array){
                        字符串拼接+=`${i}`
                    }
                    editor.replaceSelection(字符串拼接)
                };
                modal_输入弹窗(this.app, "101tool_dataview汇总", 
                    ['输入要汇总的文件/文件夹路径(例如:"02Note"):', 
                    '输入要汇总的文件名关键词用,号隔开(eg:"代办","测试"):', 
                    '输入要汇总的行文本的开头字符串多个用,号隔开(eg:"#","- ["):',
                    '输入要汇总的行内文本的关键词多个用,号隔开(eg:"2023-01","板砖"):'
                    ], 点击提交按钮) 
            },
        })

        // this.addCommand({ //* 打开vue可输入对话框
        //     id: '101tool_vue输入弹窗',
        //     name: '101tool_vue输入弹窗',
        //     editorCallback: (editor:Editor) => {
        //         const 回调函数 = (array: Array<any>)=>{
        //             print(`输入的值是: ${array}`)
        //             // editor.replaceSelection(`${array}`);
        //             let 字符串拼接=""
        //             for (let i of array){
        //                 字符串拼接+=`${i}`
        //             }
        //             editor.replaceSelection(字符串拼接)
        //         }

        //         modal_vue输入弹窗(this.app, [
        //             {id:0, 标题:"父级标题1", 描述:"输入1提示信息: ", 默认文本:"描述xxx"},
        //             {id:1, 标题:"父级标题2", 描述:"输入2提示信息: ", 默认文本:"描述xxx"},
        //             {id:2, 标题:"父级标题3", 描述:"输入3提示信息: ", 默认文本:"描述xxx"},
        //         ], 回调函数);
        //     },
        // })

        // 如果这个插件连接了任何全局DOM事件(在应用程序中不属于这个插件的部分)，当这个插件被禁用时，使用这个函数将自动删除事件监听器。
        this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
            console.log('click', evt);
        });

        // 当注册间隔时，当插件被禁用时，这个函数将自动清除间隔。
        this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
    }

    onunload() { //* 插件被禁用时触发的函数
        this.app.workspace.detachLeavesOfType(VIEW_101_通用);
        this.app.workspace.detachLeavesOfType(VIEW_101_3Deditor页面);
    }

    async 打开3Deditor视图(){
        this.app.workspace.detachLeavesOfType(VIEW_101_3Deditor页面); //根据视图名称字符串卸载视图
        // await this.app.workspace.getRightLeaf(false).setViewState({ //getRightLeaf(真假值) 值为真时新建的视图窗口会跑到右侧栏的最底部,为假时则在上部
        //     type: VIEW_101_3Deditor页面,
        //     active: true,
        // });
        print(`正在打开3Deditor:${this.settings.默认3D编辑器},请耐心等待...`)
        await this.app.workspace.getLeaf(true).setViewState({ //getLeaf(真假值) 值为真时新建视图窗口
            type: VIEW_101_3Deditor页面,
            active: true,
        });
        this.app.workspace.revealLeaf( //展示视图输入参数为视图对象
            this.app.workspace.getLeavesOfType(VIEW_101_3Deditor页面)[0] //根据视图名称来返回leaf视图对象
        );
    }

    async 设置插件默认参数() {
        let datajson=await this.loadData()
        this.settings = Object.assign({}, DEFAULT_SETTINGS, datajson);
    }

    async 保存设置参数() {
        await this.saveData(this.settings);
    }
}


// export { print, modal_消息弹窗, modal_输入弹窗}