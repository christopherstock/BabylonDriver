
    /*****************************************************************************
    *   Specifies the 'first person' level.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class MfgLevelFirstPerson extends MfgLevel
    {
        private                                 light1                  :BABYLON.DirectionalLight   = null;

        /*****************************************************************************
        *   Sets up the 'bunny' level.
        *****************************************************************************/
        constructor()
        {
            super
            (
                new BABYLON.Vector3( -10.0, 10.0, -10.0 ),
                new BABYLON.Vector3( 0,     0,    0     ),
                LibUI.COLOR_DARK_GREY
            );

            this.setupLights();
            this.setupGround();

            MfgInit.onInitCompleted();
        }

        /*****************************************************************************
        *   Sets up all lights.
        *****************************************************************************/
        private setupLights()
        {
            //setup lights
            this.light1           = new BABYLON.DirectionalLight( "dir01", new BABYLON.Vector3( 0.0, -1.0, 0.0 ), MfgScene.scene );
            this.light1.intensity = 1.0;
            this.light1.position  = new BABYLON.Vector3( 0.0, 0.0, 0.0 );
        }

        /*****************************************************************************
        *   Sets up the ground for the scene.
        *****************************************************************************/
        private setupGround():void
        {
            MfgSceneFactory.createBox
            (
                "Ground1",
                new BABYLON.Vector3( 0.0,   0.0,  0.0   ),
                10.0,
                0.5,
                10.0,
                new BABYLON.Vector3( 0.0,   0.0,  0.0   ),
                0.0,
                MfgMaterial.materialTest1,
                MfgScene.scene
            );
        }
    }
