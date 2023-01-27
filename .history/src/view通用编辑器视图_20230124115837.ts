import { TextFileView } from "obsidian";

export const VIEW_TYPE_101 = "csv-view";

export class View101 extends TextFileView {
    getViewData() {
        return this.data;
    }

    setViewData(data: string, clear: boolean) { //* 设置编辑器视图如何显示 */
        this.data = data;

        this.containerEl.empty()
        this.containerEl.createDiv({text: this.data}) // 用div标签来包裹要显示的文本内容
    }   

    clear() {
        this.data = "";
    }

    getViewType() {
        return VIEW_TYPE_101;
    }
    }
