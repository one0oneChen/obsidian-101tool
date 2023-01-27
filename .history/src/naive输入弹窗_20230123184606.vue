
<template>
    <div class="vue_div">
        <ol>
            <li v-for="提示 in 输入提示列表" :key="提示.id" :ref="setItemRef">
                <p class="标题">{{ 提示.标题 }} #id:{{提示.id}}</p>
                <span class="描述">{{提示.描述}}</span> 
                <input type="text" :ref="input" :placeholder="提示.默认文本" />
                <!-- <input type="text" @input="获取输入值($event, 提示.id)" :placeholder="提示.默认文本" /> -->
                <!-- <input type="text" :placeholder="提示.默认文本" /> -->
            </li>
        </ol>
        <button @click="获取输入值">get输入</button><br />
        输入值列表: {{输入值列表}}
    </div>
</template>

<script lang="ts">
    import { ref } from 'vue'
    let id=0;

    export default {
        // props:["输入提示列表", ],
        setup() {
            const 输入提示列表=[
                { id:id++, 标题:"输入1:", 描述:"输入1提示信息: ", 默认文本:"xxx" },
                { id:id++, 标题:"输入2:", 描述:"输入2提示信息: ", 默认文本:"哈哈哈" },
            ]

            const itemRefs: any[] = []
            const setItemRef = (el: any) => {
                if (el) {
                    itemRefs.push(el)
                }
            }

            const 输入值列表= ref([])
            function 获取输入值(){
                itemRefs.forEach((item, index) => {
                    // item 即为对应的组件ref
                    // 可通过 item 获取对应组件上的属性或方法
                    输入值列表.value.push({index:item.value})
                })
            }
            
            
            return {
                setItemRef
            }
        },

        // data() { return {
        //     输入提示列表:[
        //         { id:id++, 标题:"输入1:", 描述:"输入1提示信息: ", 默认文本:"xxx" },
        //         { id:id++, 标题:"输入2:", 描述:"输入2提示信息: ", 默认文本:"哈哈哈" },
        //     ],
        //     // text:"",
        //     输入值列表:[]
        // }},
        // methods:{
        //     获取输入值(event:any, 输入id:number){
        //         this.输入值列表[输入id]=event.target.value;
        //         console.log(`id:${id} 输入值列表:${this.输入值列表}`);
        //     }
        // }   
    }
</script>

<style scoped lang="scss">
    $颜色_橙色:rgb(255, 163, 102);
    $颜色_暗橙色:rgb(179, 140, 114);
    $颜色_灰色:rgb(59, 59, 59);
    .vue_div {
        background: $颜色_灰色;
        height: 200px;
        width: 600px;
        
    }
    input{
        height: 40px;
        width: 400px;
        color: $颜色_橙色;
        background: $颜色_灰色;
        // margin: 5px;
    }
    p.标题{
        color: $颜色_橙色;
        font-weight: bold;
    }
    span.描述{
        color: $颜色_暗橙色;
    }
</style>