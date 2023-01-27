<template>
    <div>
        <Codemirror
            ref="cm"
            v-model="code"
            :options="cmOptions"
            @input="inputChange"
        />
    </div>
</template>

<script lang="ts">
    // 全局引入vue-codemirror
    import {Codemirror} from 'vue-codemirror';
    // 引入css文件
    import 'codemirror/lib/codemirror.css'
    // 引入主题 可以从 codemirror/theme/ 下引入多个
    import 'codemirror/theme/idea.css'
    // 引入语言模式 可以从 codemirror/mode/ 下引入多个
    import 'codemirror/mode/sql/sql.js';

    export default {
        name: 'Simple',
        components: {Codemirror},
        data() {
            return {
            code: 'select a from table1 where b = 1',
            cmOptions: {
                // 语言及语法模式
                mode: 'text/x-sql',
                // 主题
                theme: 'idea',
                // 显示函数
                line: true,
                lineNumbers: true,
                // 软换行
                lineWrapping: true,
                // tab宽度
                tabSize: 4,
            }
            }
        },
        methods: {
            inputChange(content:any) {
            this.$nextTick(() => {
                console.log("code:" + this.code);
                console.log("content:" + content)
            });
            },
        },
    }
</script>