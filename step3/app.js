import * as THREE from "three/build/three.module"

window.addEventListener("load", init);
function init() {
  const size = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  const threeCanvas = document.getElementById("three-canvas");
  const renderer = new THREE.WebGLRenderer({ canvas: threeCanvas });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(size.width, size.height);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, size.width / size.height);
  camera.position.set(0, 1000, 1000);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  const geometry = new THREE.BoxGeometry(400, 400, 400);
  const material = new THREE.MeshNormalMaterial();
  const box = new THREE.Mesh(geometry, material);
  scene.add(box);

  const grid = new THREE.GridHelper(2000);
  scene.add(grid);
  const axis = new THREE.AxesHelper(500);
  scene.add(axis);

  tick();

  function tick() {
    box.rotation.y += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }

  window.addEventListener("resize", () => {
      (size.width = window.innerWidth), (size.height = window.innerHeight);
      camera.aspect = size.width / size.height;
      camera.updateProjectionMatrix();
      renderer.setSize(size.width, size.height);
  })
}
