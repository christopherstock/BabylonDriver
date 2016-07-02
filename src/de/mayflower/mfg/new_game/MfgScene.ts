
    /************************************************************************************
    *   Manages the app's scene.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ************************************************************************************/
    class MfgScene
    {
        /** The native scene representation. */
        public              scene                   :BABYLON.Scene              = null;

        /** The skybox that surrounds the scene. */
        private             skyBox                  :MfgSkyBox                  = null;

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
                MfgApp.singleton.arcCamera
            );
            this.scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline(
                "standardPipeline",
                MfgApp.singleton.followCamera
            );
        }

        /************************************************************************************
        *   Disabled the post processing pipeline.
        ************************************************************************************/
        public disablePostProcessPipeline()
        {
            this.scene.postProcessRenderPipelineManager.detachCamerasFromRenderPipeline(
                "standardPipeline",
                MfgApp.singleton.arcCamera
            );
            this.scene.postProcessRenderPipelineManager.detachCamerasFromRenderPipeline(
                "standardPipeline",
                MfgApp.singleton.followCamera
            );
        }
    }
