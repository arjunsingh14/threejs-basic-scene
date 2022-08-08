import "./style.css";
import * as THREE from "three";

// Scene
const axesHelper = new THREE.AxesHelper(2);
const scene = new THREE.Scene();
scene.add(axesHelper);

// Object
const group = new THREE.Group();
group.scale.y = 2;
group.rotation.y = 0.2;
group.rotation.x = 0.8
scene.add(group);
const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "red" })
);
cube1.position.x = -1
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "red" })
);
cube2.position.x = 1
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "red" })
);

cube3.position.x = 3
group.add(cube1);
group.add(cube2);
group.add(cube3);
// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.lookAt(group.position)
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector(".webgl"),
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
