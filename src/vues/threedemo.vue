<template>
<div ref="threeRef">

</div>

</template>


<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { Scene, PerspectiveCamera, Color, WebGL1Renderer,
        AxesHelper, PlaneGeometry, BoxGeometry, SphereGeometry, 
        MeshBasicMaterial, Mesh
        } from 'three'


export default defineComponent({
    setup(){
        console.log(`这是threedemo.vue里面`)
        const threeRef=ref()
        function 初始化场景(){
            const scene场景 = new Scene()
            scene场景.rotateX(-0.5 * Math.PI) //旋转整个场景
            scene场景.rotateZ(-0.5 * Math.PI) //旋转整个场景

            //创建场景渲染器
            const renderer = new WebGL1Renderer()
            renderer.setClearColor(new Color(0xEEEEEE))
            renderer.setSize(window.innerWidth, window.innerHeight)

            //添加场景坐标系
            const axes = new AxesHelper(20)
            scene场景.add(axes)

            //添加平面几何体
            let plane网格=new PlaneGeometry(60, 40)
            let plane材质=new MeshBasicMaterial({
                color: 0x777777
            })
            let plane=new Mesh(plane网格, plane材质)
            scene场景.add(plane)


            //创建相机
            const 透视相机= new PerspectiveCamera(
                45, //相机初始角度
                window.innerWidth/window.innerHeight, //视图比例
                0.1, //相机最近距离
                2000, //相机最远距离
            )
            //相机的初始位置
            透视相机.position.x=-30;
            透视相机.position.y=40;
            透视相机.position.z=30;
            //相机镜头焦点的位置到场景原点
            透视相机.lookAt(scene场景.position) 
            //设置模板的div挂载渲染器
            threeRef.value.appendChild(renderer.domElement)
            renderer.render(scene场景, 透视相机)

        }
        onMounted (()=>{
            初始化场景()
        })
        return {
            threeRef
        }
    }

})


</script>

<style lang="scss" scoped>


</style>