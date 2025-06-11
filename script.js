const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xFDB813 })
);
scene.add(sun);

const planetsData = [
  { name: 'Mercury', color: 0xaaaaaa, size: 0.3, distance: 5, speed: 0.04 },
  { name: 'Venus', color: 0xffcc00, size: 0.5, distance: 7, speed: 0.03 },
  { name: 'Earth', color: 0x0000ff, size: 0.6, distance: 9, speed: 0.025 },
  { name: 'Mars', color: 0xff0000, size: 0.5, distance: 11, speed: 0.02 },
  { name: 'Jupiter', color: 0xffa500, size: 1.1, distance: 15, speed: 0.015 },
  { name: 'Saturn', color: 0xffff00, size: 1.0, distance: 18, speed: 0.012 },
  { name: 'Uranus', color: 0x00ffff, size: 0.9, distance: 21, speed: 0.01 },
  { name: 'Neptune', color: 0x0000ff, size: 0.8, distance: 24, speed: 0.008 },
];

const planets = [];
const planetSpeeds = {};

planetsData.forEach(data => {
  const geometry = new THREE.SphereGeometry(data.size, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color: data.color });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = data.distance;
  mesh.userData = { angle: 0, speed: data.speed, distance: data.distance };
  scene.add(mesh);
  planets.push(mesh);
  planetSpeeds[data.name] = data.speed;

  const label = document.createElement('label');
  label.innerText = data.name;
  const input = document.createElement('input');
  input.type = 'range';
  input.min = 0.001;
  input.max = 0.1;
  input.step = 0.001;
  input.value = data.speed;
  input.oninput = (e) => {
    mesh.userData.speed = parseFloat(e.target.value);
  };
  document.getElementById('controls').appendChild(label);
  document.getElementById('controls').appendChild(input);
});

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 2, 100);
scene.add(pointLight);

camera.position.z = 35;

function animate() {
  requestAnimationFrame(animate);

  planets.forEach(planet => {
    planet.userData.angle += planet.userData.speed;
    planet.position.x = planet.userData.distance * Math.cos(planet.userData.angle);
    planet.position.z = planet.userData.distance * Math.sin(planet.userData.angle);
  });

  renderer.render(scene, camera);
}
animate();
