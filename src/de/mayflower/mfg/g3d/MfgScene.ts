
    /************************************************************************************
    *   Manages the app's scene.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ************************************************************************************/
    class MfgScene
    {
        /** The native scene representation. */
        public              scene                   :BABYLON.Scene                  = null;

        /** The ground to render. */
        public              ground                  :MfgGround                      = null;
        /** The ground to render. */
        public              world                   :MfgWorld                       = null;
        /** The skybox that surrounds the scene. */
        private             skyBox                  :MfgSkyBox                      = null;
        /** The car to control. */
        public              car                     :MfgCar                         = null;

        /** The shadow light. */
        public              shadowLight             :BABYLON.DirectionalLight       = null;
        /** The shadow generator. */
        public              shadowGenerator         :BABYLON.ShadowGenerator        = null;
        /** All meshes to be rendered by the shadow generator. */
        public              shadowRenderList        :BABYLON.AbstractMesh[]         = null;

        /************************************************************************************
        *   Creates a new instance of the scene.
        ************************************************************************************/
        public constructor( engine:BABYLON.Engine )
        {
            this.scene = new BABYLON.Scene( engine );
            this.scene.clearColor = new BABYLON.Color3( .8, .8, .8 );

            this.skyBox = new MfgSkyBox( this.scene );

            this.world = new MfgWorld();
        }

        /************************************************************************************
        *   Creates and initializes the post processing pipeline.
        ************************************************************************************/
        public createPostProcessPipeline( engine:BABYLON.Engine )
        {
            var e = new BABYLON.PostProcessRenderPipeline( engine, "standardPipeline" );
            var t = engine;
            var i = new BABYLON.PostProcessRenderEffect(
                engine,
                "fxaa",
                function()
                {
                    return new BABYLON.FxaaPostProcess( "antialias", 2, null, BABYLON.Texture.TRILINEAR_SAMPLINGMODE, t, !0 );
                }
            );
            e.addEffect( i );
            this.scene.postProcessRenderPipelineManager.addPipeline( e )
        }

        /************************************************************************************
        *   Enables the post processing pipeline.
        ************************************************************************************/
        public enablePostProcessPipeline()
        {
            this.scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline(
                "standardPipeline",
                MfgApp.singleton.camera.followCamera
            );
        }

        /************************************************************************************
        *   Disabled the post processing pipeline.
        ************************************************************************************/
        public disablePostProcessPipeline()
        {
            this.scene.postProcessRenderPipelineManager.detachCamerasFromRenderPipeline(
                "standardPipeline",
                MfgApp.singleton.camera.followCamera
            );
        }

        /************************************************************************************
        *   Creates the lights for this scene.
        ************************************************************************************/
        public createLights()
        {
            var e, t, i;
            e = new BABYLON.DirectionalLight(
                "dir01",
                new BABYLON.Vector3( .2, -1, -.6 ),
                this.scene
            );
            e.position = new BABYLON.Vector3(-200, 1e3, 600);
            e.diffuse  = new BABYLON.Color3(1, 1, 1);
            e.specular = new BABYLON.Color3(1, 1, 1);
            e.intensity = .7;
            t = BABYLON.Mesh.CreateSphere("sphere", 10, 20, this.scene);
            t.position = e.position;
            t.position.scaleInPlace( .5 );
            t.material = new BABYLON.StandardMaterial("light", this.scene);
            t.material.emissiveColor = new BABYLON.Color3(1, 1, 0);
            i = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, -1, 0), this.scene);
            i.diffuse = new BABYLON.Color3(1, 1, 1);
            i.specular = new BABYLON.Color3(.5, .5, .4);
            i.groundColor = new BABYLON.Color3(1, 1, 1);
            i.intensity = .8;

            this.shadowLight = e;
        }

        public createShadowGenerator()
        {
            this.shadowGenerator = new BABYLON.ShadowGenerator( 4096, this.shadowLight );
            this.shadowGenerator.useVarianceShadowMap = !0;
            this.shadowGenerator.usePoissonSampling = !0;
            this.shadowGenerator.setTransparencyShadow( !0 );
            this.shadowGenerator.bias = 1e-5;
        }

        public disableShadows()
        {
            null !== this.shadowGenerator && (this.shadowRenderList = this.shadowGenerator.getShadowMap().renderList, this.shadowGenerator.getShadowMap().renderList = [])
        }

        public enableShadows()
        {
            null !== this.shadowRenderList && (this.shadowGenerator.getShadowMap().renderList = this.shadowRenderList, this.scene.shadowsEnabled = !0)
        }

        public loadGround()
        {
            MfgDebug.init.log( "Load ground" );

            var e = 50;
            this.ground = new MfgGround(
                MfgApp.singleton.mfgScene.scene,
                MfgApp.singleton.mfgScene.world.world,
                "./res/paris/",
                "paris_heightmap.babylon",
                "Ground",
                6 * e,
                MfgApp.singleton.mfgScene.world.groundMaterial,
                {
                    groundTexture: "./res/paris/plan.png",
                    groundCollisionFilterGroup: MfgWorld.GROUP1,
                    groundCollisionFilterMask:  MfgWorld.GROUP2,
                    scaleFactor: e,
                    buildingBaseHeight: e,
                    solidBuildingsPath: "./res/paris/",
                    solidBuildingsName: "paris_solid_buildings.babylon",
                    buildingsPath: "./res/paris/",
                    buildingsName: "paris_3D_buildings.babylon",
                    treesPath: "./res/paris/",
                    treesName: "paris_trees.babylon",
                    particlesPath: "./res/paris/",
                    particlesName: "paris_particles.babylon",
                    buildingCelShading: !0,
                    outlineShaderDeltaHeight: .15 * (e / 50),
                    shadowGenerator: MfgApp.singleton.mfgScene.shadowGenerator,
                    onLoadFinished: MfgApp.singleton.onGroundLoaded
                }
            );
            this.ground.load()
        }

        public loadCar()
        {
            MfgDebug.init.log( "loadCar.." );

            this.car = new MfgCar(
                MfgApp.singleton.mfgScene.scene,
                MfgApp.singleton.mfgScene.world.world,
                "./res/ds3/caisse/",
                "DS3_caisse.babylon",
                "./res/ds3/roue/",
                "DS3_roue.babylon",
                this.world.carBodyMaterial,
                this.world.wheelMaterial,
                new CANNON.Vec3( 1.31,  .76, -.6 ),
                new CANNON.Vec3( 1.31,  -.7, -.6 ),
                new CANNON.Vec3( -1.13, .76, -.6 ),
                new CANNON.Vec3( -1.13, -.7, -.6 ),
                {
                    scaleFactor: .001,
                    invertX: !0,
                    bodyMass: 2e3,
                    bodyCollisionFilterGroup: MfgWorld.GROUP2,
                    bodyCollisionFilterMask:  MfgWorld.GROUP1,
                    shadowGenerator: MfgApp.singleton.mfgScene.shadowGenerator,
                    onLoadSuccess: MfgApp.singleton.onCarLoaded
                }
            );
            this.car.load()
        }
    }
