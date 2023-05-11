import * as THREE from 'three'; 
import './style.css'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

//scene
const scene = new THREE.Scene();

//create test object
const geometry = new THREE.SphereGeometry(3,64,64)
const material = new THREE.MeshStandardMaterial({
    color: "#00ff83"
})
const mesh = new THREE.Mesh(geometry,material);
//scene.add(mesh)
const gltfLoader = new GLTFLoader();
gltfLoader.load('./assets/CardFinal.glft', (gltfScene) => {

    gltfScene.scene.position.y = 3;
    gltfScene.scene.scale.set(10,10,10);
    scene.add(gltfScene.scene);

});
scene.add(gltfLoader.scene)
//sizes
const sizes ={
    height: window.innerHeight,
    width: window.innerWidth
}
//light
const light = new THREE.PointLight(0xffffff,1,100)
light.position.set(0,10,10)
scene.add(light)
//Camera
const camera = new THREE.PerspectiveCamera(45,sizes.width/sizes.height, 0.1,100)
camera.position.z=10
scene.add(camera)




//Renderer
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width,sizes.height)
renderer.render(scene,camera)

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)

})

//Controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true
//optional disables to controls
controls.enablePan = false
controls.autoRotate = true

const loop = () => {
    controls.update()    
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}
loop()