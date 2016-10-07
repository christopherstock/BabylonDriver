
    /************************************************************************************
    *   Represents the custom ground.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ************************************************************************************/
    class MfgGroundSimple
    {
        public          static      box1                :BABYLON.Mesh           = null;

        /*****************************************************************************
        *   Initializes the custom ground.
        *****************************************************************************/
        public static init()
        {
            var materialGround:BABYLON.StandardMaterial = new BABYLON.StandardMaterial( "groundMat", MfgInit.app.mfgScene.scene );
            materialGround.diffuseColor = new BABYLON.Color3( 0.5, 0.5, 0.5 );
            materialGround.emissiveColor = new BABYLON.Color3( 0.2, 0.2, 0.2 );
            materialGround.backFaceCulling = false;

            MfgGroundSimple.box1 = LibMath3D.createBox
            (
                "Box1",
                -25.0,
                50.0,
                -20.0,
                10.0,
                1.0,
                10.0,
                materialGround,
                MfgInit.app.mfgScene.scene
            );

            MfgInit.app.onGroundLoaded();
        }
    }
