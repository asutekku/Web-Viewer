define(["three", "MTLLoader", 'OBJLoader'], function (THREE, MTLLoader, OBJLoader) {
    return {
        model: 'il',
        baseLoader: new THREE.MTLLoader(),
        houseLoader: new THREE.MTLLoader(),


        /*baseLoader.setPath('models/')
        baseLoader.load('base.mtl', function (materials) {
            materials.preload()
            var loader = new THREE.OBJLoader();
            loader.setMaterials(materials)
            loader.setPath('models/')
            loader.load('base.obj', function (object) {
                object.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.receiveShadow = true
                    }
                })
                scene.add(object)
            })
        }),

        houseLoader.setPath('models/')
        houseLoader.load(model + '.mtl', function (materials) {
            materials.preload();
            var loader = new THREE.OBJLoader()
            loader.setMaterials(materials)
            loader.setPath('models/')
            loader.load(model + '.obj', function (object) {
                object.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.castShadow = true
                        child.receiveShadow = true
                    }
                })
                scene.add(object)
            })
        })*/

    }
})
