gsap.registerPlugin(ScrollTrigger);

// HERO ANIMATION
gsap.from(".main-title", {
  duration: 1,
  y: 50,
  opacity: 0,
  stagger: 0.2,
  ease: "power3.out"
});
gsap.from(".hero-subtitle", {
  duration: 1,
  y: 30,
  opacity: 0,
  delay: 0.5,
  ease: "power3.out"
});

// SECTION HEADERS
gsap.utils.toArray('.section-title').forEach(title => {
  gsap.from(title, {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power3.out",
    scrollTrigger: {
      trigger: title,
      start: "top 85%"
    }
  });
});

// PROJECT CARD ANIMATION
gsap.utils.toArray('.project-card').forEach(card => {
  gsap.from(card, {
    duration: 0.8,
    y: 100,
    opacity: 0,
    ease: "power3.out",
    scrollTrigger: {
      trigger: card,
      start: "top 90%"
    }
  });
});

// SCROLL PROGRESS BAR
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = scrollPercent + "%";
});

// ---- 3D SCENE ---- //
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('three-bg'),
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// LIGHT
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

// GLOBE
const globeGeometry = new THREE.SphereGeometry(1, 64, 64);
const globeMaterial = new THREE.MeshStandardMaterial({
  color: 0x007BFF,
  roughness: 0.4,
  metalness: 0.6
});
const globe = new THREE.Mesh(globeGeometry, globeMaterial);
scene.add(globe);

// PARTICLES
const particleCount = 1000;
const particlesGeometry = new THREE.BufferGeometry();
const positions = [];

for (let i = 0; i < particleCount; i++) {
  const x = (Math.random() - 0.5) * 10;
  const y = (Math.random() - 0.5) * 10;
  const z = (Math.random() - 0.5) * 10;
  positions.push(x, y, z);
}

particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

const particlesMaterial = new THREE.PointsMaterial({
  color: 0x00bfff,
  size: 0.02,
  transparent: true,
  opacity: 0.7
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// ANIMATE
function animate() {
  requestAnimationFrame(animate);

  globe.rotation.y += 0.002;
  particles.rotation.y += 0.0005;

  renderer.render(scene, camera);
}
animate();

// RESIZE
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
