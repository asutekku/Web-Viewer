define(["three", "container"], function (THREE, container) {
    container.innerHTML = "";
    var renderer = new THREE.WebGLRenderer({
        clearColor: 0x000000
    });
    renderer.sortObjects = false;
    renderer.autoClear = false;
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapCullFace = THREE.CullFaceFront;
    container.appendChild(renderer.domElement);

    var updateSize = function () {
        renderer.setSize(container.offsetWidth, container.offsetHeight);
    };
    window.addEventListener('resize', updateSize, false);
    updateSize();

    return renderer;
});
