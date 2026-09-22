// Three.js Setup
let scene, camera, renderer, bottleGroup;
const bottleInstances = {};

function initHeroScene() {
    const container = document.getElementById('three-container');
    if (!container) return;
    
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);

    // Camera
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 3;

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowShadowMap;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xd4af37, 1.5, 100);
    pointLight1.position.set(5, 10, 7);
    pointLight1.castShadow = true;
    pointLight1.shadow.mapSize.width = 2048;
    pointLight1.shadow.mapSize.height = 2048;
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.8, 100);
    pointLight2.position.set(-5, -10, 5);
    scene.add(pointLight2);

    // Create perfume bottle
    bottleGroup = createPerfumeBottle();
    scene.add(bottleGroup);

    // Handle resize
    window.addEventListener('resize', onWindowResize);

    // Animation loop
    animate();
}

function createPerfumeBottle() {
    const group = new THREE.Group();

    // Bottle body
    const bodyGeometry = new THREE.CylinderGeometry(0.6, 0.7, 1.5, 32);
    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        metalness: 0.7,
        roughness: 0.2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // Bottle cap/top
    const capGeometry = new THREE.CylinderGeometry(0.4, 0.5, 0.3, 32);
    const capMaterial = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.9,
        roughness: 0.1
    });
    const cap = new THREE.Mesh(capGeometry, capMaterial);
    cap.position.y = 1.0;
    cap.castShadow = true;
    cap.receiveShadow = true;
    group.add(cap);

    // Neck
    const neckGeometry = new THREE.CylinderGeometry(0.35, 0.5, 0.4, 32);
    const neckMaterial = new THREE.MeshStandardMaterial({
        color: 0x0a0a0a,
        metalness: 0.6,
        roughness: 0.3
    });
    const neck = new THREE.Mesh(neckGeometry, neckMaterial);
    neck.position.y = 0.65;
    neck.castShadow = true;
    neck.receiveShadow = true;
    group.add(neck);

    // Liquid inside
    const liquidGeometry = new THREE.CylinderGeometry(0.55, 0.65, 1.2, 32);
    const liquidMaterial = new THREE.MeshStandardMaterial({
        color: 0x4a3728,
        metalness: 0.5,
        roughness: 0.4,
        transparent: true,
        opacity: 0.6
    });
    const liquid = new THREE.Mesh(liquidGeometry, liquidMaterial);
    liquid.position.y = -0.1;
    liquid.castShadow = true;
    liquid.receiveShadow = true;
    group.add(liquid);

    return group;
}

function createBottleForCard(containerId, productId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const cardScene = new THREE.Scene();
    cardScene.background = null;

    // Camera
    const cardCamera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    cardCamera.position.z = 2.5;

    // Renderer
    const cardRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    cardRenderer.setSize(width, height);
    cardRenderer.setPixelRatio(window.devicePixelRatio);
    cardRenderer.shadowMap.enabled = true;
    container.appendChild(cardRenderer.domElement);

    // Lights
    const ambLight = new THREE.AmbientLight(0xffffff, 0.5);
    cardScene.add(ambLight);

    const pointLight = new THREE.PointLight(0xd4af37, 1.2, 100);
    pointLight.position.set(3, 5, 3);
    pointLight.castShadow = true;
    cardScene.add(pointLight);

    // Create bottle
    const cardBottle = createPerfumeBottle();
    cardScene.add(cardBottle);

    // Store instance
    bottleInstances[productId] = {
        scene: cardScene,
        camera: cardCamera,
        renderer: cardRenderer,
        bottle: cardBottle,
        container: container
    };

    // Animation
    const animateCard = () => {
        requestAnimationFrame(animateCard);
        cardBottle.rotation.y += 0.01;
        cardBottle.rotation.x += 0.005;
        cardRenderer.render(cardScene, cardCamera);
    };

    animateCard();

    // Handle resize
    const handleResize = () => {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        cardCamera.aspect = newWidth / newHeight;
        cardCamera.updateProjectionMatrix();
        cardRenderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);
}

function animate() {
    requestAnimationFrame(animate);

    if (bottleGroup) {
        bottleGroup.rotation.y += 0.005;
        bottleGroup.rotation.x += 0.002;
    }

    renderer.render(scene, camera);
}

function onWindowResize() {
    const container = document.getElementById('three-container');
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initHeroScene();

    // Initialize bottle scenes for product cards
    setTimeout(() => {
        createBottleForCard('bottle-1', '1');
        createBottleForCard('bottle-2', '2');
        createBottleForCard('bottle-3', '3');
    }, 100);
});
