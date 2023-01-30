import { ItemView, WorkspaceLeaf } from "obsidian";
import { createApp } from "vue"
import mitt from "mitt"
import Vue101tool from "./main"
import vue3deditor from "./vues/3Deditor页面.vue"
// import vuethreedemo from "./vues/threedemo.vue"


export const VIEW_101_3Deditor页面 = "101tool3Deditor页面";
export class View101_3Deditor页面 extends ItemView { //注册成Itemview类,打开视图时会自动跑到侧边栏右下角或右上角
    plugin: any; 
    
    // 构造函数，当创建 "View101_通用" 实例时需要从外面传入一个 "View101tool" 实例
    constructor(leaf: WorkspaceLeaf, plugin: Vue101tool, ) {
        super(leaf); //! 访问派生类的构造函数中的 "this" 前，必须调用 "super"
        this.plugin = plugin
    }
    
    async onOpen() {
        this.containerEl.empty();
        //* 载入插件目录下的data.json文件,  
        this.plugin.settings = Object.assign({}, await this.plugin.loadData());

        const emitter = mitt()
        emitter.on("emit监听3D编辑器修改", async (value:any)=>{
            // 保存默认3D编辑器设置
            this.plugin.settings.默认3D编辑器=value
            this.plugin.saveData(this.plugin.settings)
            this.plugin.settings = Object.assign({}, await this.plugin.loadData());
        })

        if (!Boolean(this.plugin.settings.默认3D编辑器)){
            this.plugin.settings.默认3D编辑器='SketchUp'
        }
        let app注入数据={
            默认编辑器:this.plugin.settings.默认3D编辑器,
            mitt触发器:emitter,
        }
        let vue3deditorapp=createApp(vue3deditor)
        vue3deditorapp.provide('app注入数据',  app注入数据)
        vue3deditorapp.mount(this.containerEl)
    }



    async onClose() {
        // Nothing to clean up.
    }
    getViewType() {
        return VIEW_101_3Deditor页面;
    }

    getDisplayText(): string {
        return VIEW_101_3Deditor页面 //新视图的标题名称
    }
}


