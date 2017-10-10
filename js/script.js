var renderer;
var scene;
var camera;
var depthMaterial, saoMaterial, saoModulateMaterial, normalMaterial, vBlurMaterial, hBlurMaterial, copyMaterial;
var depthRenderTarget, normalRenderTarget, saoRenderTarget, beautyRenderTarget, blurIntermediateRenderTarget;
var composer, renderPass, saoPass, copyPass;
var group;
var params = {
    output: 0,
    saoBias: 1,
    saoIntensity: 0.05,
    saoScale: 256,
    saoKernelRadius: 100,
    saoMinResolution: 0,
    saoBlur: true,
    saoBlurRadius: 12,
    saoBlurStdDev: 6,
    saoBlurDepthCutoff: 0.01
}
var supportsDepthTextureExtension = false;
var isWebGL2 = false;

init();
animate();

function init() {
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapCullFace = THREE.CullFaceFront;
    container = document.createElement('div');
    document.body.appendChild(container);

    scene = new THREE.Scene();
    scene.background = new THREE.Color().setHSL(0.6, 0, 1);
    scene.fog = new THREE.Fog(scene.background, 1, 5000);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.z = -800;

    dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(-50, 100, 80);
    dirLight.position.multiplyScalar(30);

    dirLight.castShadow = true;
    dirLight.shadowCameraVisible = true;

    var lightResolution = 2048;

    dirLight.shadowMapWidth = lightResolution;
    dirLight.shadowMapHeight = lightResolution;

    var d = 512;

    dirLight.shadowCameraLeft = -d;
    dirLight.shadowCameraRight = d;
    dirLight.shadowCameraTop = d;
    dirLight.shadowCameraBottom = -d;

    dirLight.shadowCameraNear = 0;
    dirLight.shadowCameraFar = 10000;
    dirLight.shadowDarkness = 0;

    scene.add(dirLight);

    hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 50, 0);

    scene.add(hemiLight);


    var material = new THREE.MeshPhongMaterial({
        color: 0x696969,
        flatShading: false
    });

    //Skydome

    var vertexShader = document.getElementById('vertexShader').textContent;
    var fragmentShader = document.getElementById('fragmentShader').textContent;
    var uniforms = {
        topColor: {
            value: new THREE.Color(0x0077ff)
        },
        bottomColor: {
            value: new THREE.Color(0xffffff)
        },
        offset: {
            value: 33
        },
        exponent: {
            value: 0.6
        }
    };

    uniforms.topColor.value.copy(hemiLight.color);
    scene.fog.color.copy(uniforms.bottomColor.value);
    var skyGeo = new THREE.SphereGeometry(4000, 32, 15);
    var skyMat = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: uniforms,
        side: THREE.BackSide
    });
    var sky = new THREE.Mesh(skyGeo, skyMat);
    scene.add(sky);

    //Models

    var houseLoader = new THREE.MTLLoader();
    houseLoader.load('models/il.mtl', function (materials) {
        materials.preload();
        var loader = new THREE.OBJLoader();
        loader.setMaterials(materials);
        loader.setPath('models/');
        loader.load('il.obj', function (object) {
            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            scene.add(object);
        });
    });

    var baseLoader = new THREE.MTLLoader();
    baseLoader.load('models/base.mtl', function (materials) {
        materials.preload();
        var loader = new THREE.OBJLoader();
        loader.setMaterials(materials);
        loader.setPath('models/');
        loader.load('base.obj', function (object) {
            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.receiveShadow = true;
                }
            });
            scene.add(object);
        });
    });

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;

    /// COMPOSER

    composer = new THREE.EffectComposer(renderer);
    renderPass = new THREE.RenderPass(scene, camera);
    composer.addPass(renderPass);
    saoPass = new THREE.SAOPass(scene, camera, false, true);
    saoPass.params = params;
    saoPass.renderToScreen = true;
    composer.addPass(saoPass);

    container.appendChild(renderer.domElement);

    var gui = new dat.GUI();
    gui.add(saoPass.params, "output", {
        'AO': THREE.SAOPass.OUTPUT.BEAUTY,
        'Normal': THREE.SAOPass.OUTPUT.Default,
    })

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    composer.setSize(width, height);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    //renderer.render(scene, camera);
    composer.render();
}
