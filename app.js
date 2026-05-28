// ============================================================================
// 1. SYSTEM CORE: MOMENTUM RENDER ENGINE (LENIS)
// ============================================================================
const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.1,
    infinite: false,
});

function scrollUpdate(time) {
    lenis.raf(time);
    requestAnimationFrame(scrollUpdate);
}
requestAnimationFrame(scrollUpdate);

// Integrate Lenis smoothly with GSAP ScrollTrigger structural updates
gsap.registerPlugin(ScrollTrigger);
lenis.on('scroll', ScrollTrigger.update);

ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
        return arguments.length ? lenis.scrollTo(value, { immediate: true }) : lenis.scroll;
    },
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    }
});

// ============================================================================
// 2. INTERACTIVE COMPONENT: CYBERNETIC MOUSE TRACKING MATRIX
// ============================================================================
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
let mousePos = { x: 0, y: 0 };
let dotPos = { x: 0, y: 0 };
let ringPos = { x: 0, y: 0 };

window.addEventListener('mousemove', (e) => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
});

// Animation Frame Loop for Mouse Tracking Parity
function renderCursor() {
    // Linear interpolation for ultra-smooth easing
    dotPos.x += (mousePos.x - dotPos.x) * 0.25;
    dotPos.y += (mousePos.y - dotPos.y) * 0.25;
    ringPos.x += (mousePos.x - ringPos.x) * 0.12;
    ringPos.y += (mousePos.y - ringPos.y) * 0.12;

    cursorDot.style.left = `${dotPos.x}px`;
    cursorDot.style.top = `${dotPos.y}px`;
    cursorRing.style.left = `${ringPos.x}px`;
    cursorRing.style.top = `${ringPos.y}px`;

    requestAnimationFrame(renderCursor);
}
requestAnimationFrame(renderCursor);

// Magnetic Interactive Hover States for System Links & Buttons
const interactables = document.querySelectorAll('a, button, select, input, .spatial-card');
interactables.forEach((item) => {
    item.addEventListener('mouseenter', () => {
        cursorDot.style.width = '12px';
        cursorDot.style.height = '12px';
        cursorDot.style.backgroundColor = '#ffffff';
        cursorRing.style.borderColor = '#facc15';
        cursorRing.style.transform = 'translate(-50%, -50%) scale(1.6)';
    });
    item.addEventListener('mouseleave', () => {
        cursorDot.style.width = '6px';
        cursorDot.style.height = '6px';
        cursorDot.style.backgroundColor = '#facc15';
        cursorRing.style.borderColor = 'rgba(250, 204, 21, 0.3)';
        cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// ============================================================================
// 3. BACKGROUND MATRIX: THREE.JS INTERACTIVE DATA GRID
// ============================================================================
const canvasContainer = document.getElementById('canvas-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
canvasContainer.appendChild(renderer.domElement);

// Construct mathematical grid network matching standard safety scan models
const gridGeometry = new THREE.BufferGeometry();
const gridRows = 35;
const gridCols = 35;
const totalPoints = gridRows * gridCols;
const positions = new Float32Array(totalPoints * 3);

let index = 0;
for (let i = 0; i < gridRows; i++) {
    for (let j = 0; j < gridCols; j++) {
        // Space points evenly across virtual coordinates
        positions[index++] = (i - gridRows / 2) * 0.25; // X Axis
        positions[index++] = (j - gridCols / 2) * 0.25; // Y Axis
        positions[index++] = 0;                          // Z Axis (Depth)
    }
}

gridGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const gridMaterial = new THREE.PointsMaterial({
    size: 0.018,
    color: 0xfacc15,
    transparent: true,
    opacity: 0.4
});

const dataGridMesh = new THREE.Points(gridGeometry, gridMaterial);
scene.add(dataGridMesh);
camera.position.z = 5;

// Mouse vectors to compute localized warp field alterations
let targetMouseX = 0, targetMouseY = 0;
let currentMouseX = 0, currentMouseY = 0;

window.addEventListener('mousemove', (event) => {
    targetMouseX = (event.clientX - window.innerWidth / 2) * 0.002;
    targetMouseY = (event.clientY - window.innerHeight / 2) * 0.002;
});

const clock = new THREE.Clock();

function animateScene() {
    requestAnimationFrame(animateScene);
    const timeDelta = clock.getElapsedTime();

    // Smooth inertia translation for structural background grid rotations
    currentMouseX += (targetMouseX - currentMouseX) * 0.05;
    currentMouseY += (targetMouseY - currentMouseY) * 0.05;

    dataGridMesh.rotation.y = currentMouseX * 0.3;
    dataGridMesh.rotation.x = -currentMouseY * 0.3;

    // Direct structural displacement pass on matrix coordinates
    const posAttribute = gridGeometry.attributes.position;
    for (let i = 0; i < totalPoints; i++) {
        const xPos = posAttribute.getX(i);
        const yPos = posAttribute.getY(i);
        
        // Compute structural micro-sinusoidal variance waves matching continuous spatial readings
        const zDisplacement = Math.sin(xPos + timeDelta) * 0.12 + Math.cos(yPos + timeDelta) * 0.12;
        posAttribute.setZ(i, zDisplacement);
    }
    posAttribute.needsUpdate = true;

    renderer.render(scene, camera);
}
animateScene();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ============================================================================
// 4. FUNCTIONAL ROUTING: INTERACTIVE ACTION MODALS (FIXES DEAD LINKS)
// ============================================================================
const triggerOverlayBtn = document.getElementById('trigger-overlay');
const triggerOverlayAltBtn = document.querySelector('.trigger-overlay-alt');
const closeOverlayBtn = document.getElementById('close-overlay');
const deploymentOverlay = document.getElementById('deployment-overlay');
const overlayForm = document.getElementById('overlay-form');

function openDeploymentCenter() {
    deploymentOverlay.classList.add('active');
    gsap.to(deploymentOverlay, { opacity: 1, duration: 0.4, ease: "power2.out" });
    lenis.stop(); // Freeze background scrolling framework to maintain execution position
}

function closeDeploymentCenter() {
    gsap.to(deploymentOverlay, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
            deploymentOverlay.classList.remove('active');
            lenis.start(); // Restore scrolling tracking components
        }
    });
}

triggerOverlayBtn.addEventListener('click', openDeploymentCenter);
if (triggerOverlayAltBtn) triggerOverlayAltBtn.addEventListener('click', openDeploymentCenter);
closeOverlayBtn.addEventListener('click', closeDeploymentCenter