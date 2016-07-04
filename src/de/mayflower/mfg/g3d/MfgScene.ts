
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

        /** The skybox that surrounds the scene. */
        private             skyBox                  :MfgSkyBox                      = null;

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
    }