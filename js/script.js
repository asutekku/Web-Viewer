var scene = new THREE.Scene();
scene.background = new THREE.Color().setHSL(0.6, 0, 1);
scene.fog = new THREE.Fog(scene.background, 1, 5000);

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.z = -800;

var webglRenderer = new THREE.WebGLRenderer();
webglRenderer.shadowMap.enabled = true;
webglRenderer.shadowMapSoft = true;
webglRenderer.setSize(window.innerWidth, window.innerHeight);
webglRenderer.shadowMapCullFace = THREE.CullFaceFront

controls = new THREE.OrbitControls(camera, webglRenderer.domElement);
controls.enableZoom = true;

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

document.body.appendChild(webglRenderer.domElement);

//var geometry = new THREE.SphereGeometry(10, 32, 16);
//var geometry = new THREE.CylinderGeometry(0, 10, 30, 4, 1);
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

function animate() {
    requestAnimationFrame(animate);
    webglRenderer.render(scene, camera);
}
animate();
