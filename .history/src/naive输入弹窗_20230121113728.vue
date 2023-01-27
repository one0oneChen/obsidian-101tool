<template>
    <n-radio-group
        v-model:value="size"
        name="left-size"
        style="margin-bottom: 12px">
        <n-radio-button value="small">
            小
        </n-radio-button>
        <n-radio-button value="medium">
            中
        </n-radio-button>
        <n-radio-button value="large">
            大
        </n-radio-button>
    </n-radio-group>
    <n-form
        ref="formRef"
        inline
        :label-width="80"
        :model="formValue"
        :rules="rules" >
        <n-form-item label="姓名" path="user.name">
            <n-input v-model:value="formValue.user.name" placeholder="输入姓名" />
        </n-form-item>
        <n-form-item label="年龄" path="user.age">
            <n-input v-model:value="formValue.user.age" placeholder="输入年龄" />
        </n-form-item>
        <n-form-item label="电话号码" path="phone">
            <n-input v-model:value="formValue.phone" placeholder="电话号码" />
        </n-form-item>
        <n-form-item>
            <n-button attr-type="button" @click="handleValidateClick">
                验证
            </n-button>
        </n-form-item>
    </n-form>

    <!-- <pre>{{ JSON.stringify(formValue, null, 2) }}
    </pre> -->
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue'
    import { FormInst, useMessage } from 'naive-ui'


    export default defineComponent({
        name:"Naive输入弹窗",
        // components:{ FormInst },

        setup () {
            const formRef = ref<FormInst | null>(null)
            const message = useMessage()
            return {
                formRef,
                formValue: ref({
                    user: {
                        name: '',
                        age: ''
                    },
                    phone: ''
                }),
                rules: {
                    user: {
                        name: {
                            required: true,
                            message: '请输入姓名',
                            trigger: 'blur'
                        },
                        age: {
                            required: true,
                            message: '请输入年龄',
                            trigger: ['input', 'blur']
                        }
                    },
                    phone: {
                        required: true,
                        message: '请输入电话号码',
                        trigger: ['input']
                    },
                    handleValidateClick (e: MouseEvent) {
                        e.preventDefault()
                        formRef.value?.validate((errors) => {
                        if (!errors) {
                            message.success('Valid')
                        } else {
                            console.log(errors)
                            message.error('Invalid')
                        }
                        })
                    }
                }
            }
        },

        methods:{
            点击提交 () {
                console.log(this.formValue)
            }
        }
    })
</script>

<style scoped lang="scss">
// $颜色_橙色:#f60;
// $颜色_绿色:rgb(0, 255, 0);
// .vue_button {
//     color: $颜色_橙色;
//     background: $颜色_绿色;
// }
// p{
//     color: $颜色_绿色;
//     background: $颜色_橙色;
// }
</style>