define(["three", "camera", "controls", "geometry", "light", "material", "renderer", "scene", "MTLLoader"],
    function (THREE, camera, controls, geometry, light, material, renderer, scene, MTLLoader) {
        var app = {
            //var composer, renderPass, saoPass, copyPass;
            //var group;
            /*var params = {
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
            */
            init: function () {
                //scene.add(baseLoader);
            },
            animate() {
                renderer.render(scene, camera);
            }

        }
        return app;
    });
/*container = document.createElement('div');
                document.body.appendChild(container);

                hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
                hemiLight.color.setHSL(0.6, 1, 0.6);
                hemiLight.groundColor.setHSL(0.095, 1, 0.75);
                hemiLight.position.set(0, 50, 0);

                scene.add(hemiLight);

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
*/
