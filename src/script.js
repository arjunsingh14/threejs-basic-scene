import './style.css'
import * as THREE from 'three'

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

//resize the page

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
//Cursor
const cursor = {x: 0, y: 0}
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = - (event.clientY / sizes.height - 0.5);

    console.log(cursor.x, cursor.y);
})

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// const aspectRatio = sizes.height / sizes.width
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100)
camera.position.z = 3
scene.add(camera)

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true
// controls.autoRotate = true
// controls.autoRotateSpeed = 10.0

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  //updates the cameras aspect ratio
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene, camera);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});


window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement){
      canvas.requestFullscreen()
  }
  else {
    document.exitFullscreen()
  }
});

// gsap.to(mesh.position, {duration: 1, delay: 1, x: 2})
// gsap.to(mesh.position, {duration: 1, delay: 2, x: 0})

//animations
const clock = new THREE.Clock()
const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
    // camera.position.y = cursor.y * 3;
    //  camera.lookAt(mesh.position);
    // mesh.rotation.y = elapsedTime 
    // mesh.rotation.x = elapsedTime
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()