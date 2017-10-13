/*require.config({
    paths: {
        threejs: 'threejs/build/three',
        MTLLoader: 'threejs/loaders/MTLLoader',
        OBJLoader: 'threejs/loaders/OBJLoader',
        OrbitControls: 'threejs/controls/OrbitControls',
        EffectComposer: 'threejs/postprocessing/EffectComposer',
        RenderPass: 'threejs/postprocessing/RenderPass',
        ShaderPass: 'threejs/postprocessing/ShaderPass',
        SAOPass: 'threejs/postprocessing/SAOPass',
        CopyShader: 'threejs/shaders/CopyShader',
        SAOShader: 'threejs/shaders/SAOShader',
        DepthLimitedBlurShader: 'threejs/shaders/DepthLimitedBlurShader',
        UnpackDepthRGBAShader: 'threejs/shaders/UnpackDepthRGBAShader',
        statsMin: 'threejs/Detector',
        datguimin: 'threejs/loaders/OBJLoader',
    }
});

requirejs(['app']);

<script src="js/threejs/shaders/DepthLimitedBlurShader.js"></script>
<script src="js/threejs/shaders/UnpackDepthRGBAShader.js"></script>
<script src="js/threejs/Detector.js"></script>
<script src="js/threejs/libs/stats.min.js"></script>
<script src='js/threejs/libs/dat.gui.min.js'></script>
<script type="x-shader/x-vertex" id="vertexShader">
    varying vec3 vWorldPosition; void main() { vec4 worldPosition = modelMatrix * vec4( position, 1.0 ); vWorldPosition = worldPosition.xyz; gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); }
</script>
<script type="x-shader/x-fragment" id="fragmentShader">
    uniform vec3 topColor; uniform vec3 bottomColor; uniform float offset; uniform float exponent; varying vec3 vWorldPosition; void main() { float h = normalize( vWorldPosition + offset ).y; gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h , 0.0), exponent ), 0.0 ) ), 1.0 ); }
</script>
<script src="js/script.js"></script>*/
// Start the app
require(['detector', 'app', 'container'], function (Detector, app, container) {
    if (!Detector.webgl) {
        Detector.addGetWebGLMessage();
        container.innerHTML = "";
    }

    app.init();
    app.animate();
});
