import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
/**
 * loading textures
 */


const gui = new dat.GUI()

const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matCapTextures = textureLoader.load('/textures/matcaps/3.png')
const gradientTextures = textureLoader.load('/textures/gradients/5.jpg')


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
/**
 * light
 */


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Objects
 */
// const material = new THREE.MeshBasicMaterial()

// const material = new THREE.MeshNormalMaterial();
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matCapTextures
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.45;
material.roughness = 0.46;

material.map = doorColorTexture

// material.gradientMap = gradientTextures;

// gradientTextures.minFilter = THREE.NearestFilter;
// gradientTextures.magFilter = THREE.NearestFilter;
// gradientTextures.generateMipmaps = false;
// material.alphaMap = doorAlphaTexture
// material.transparent = true
// material.map = doorColorTexture
// material.side = THREE.DoubleSide

const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1), material)

plane.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
);
material.aoMap = doorAmbientTexture;
material.displacementMap = doorHeightTexture;
material.transparent = true;
material.alphaMap = doorAlphaTexture;

material.metalnessMap = doorMetalnessTexture;
material.roughnessMap = doorRoughnessTexture;
material.normalMap = doorNormalTexture;
material.metalness = 0
material.roughness = 1
material.aoMapIntensity = 1;




scene.add(plane)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;

gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "roughness").min(0).max(1).step(0.0001);
scene.add(ambientLight);
scene.add(pointLight)
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3;
camera.lookAt(plane.position)

scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    //update objects
    
    plane.rotation.y = 0.1 * elapsedTime
   
    plane.rotation.x= 0.15 * elapsedTime
  
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()