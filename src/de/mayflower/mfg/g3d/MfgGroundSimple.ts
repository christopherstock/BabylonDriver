
    /************************************************************************************
    *   Represents the custom ground.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ************************************************************************************/
    class MfgGroundSimple
    {
        public          static      box1                :BABYLON.Mesh           = null;
        public          static      box2                :BABYLON.Mesh           = null;

        /*****************************************************************************
        *   Initializes the custom ground.
        *****************************************************************************/
        public static init()
        {
            var materialGround1:BABYLON.StandardMaterial = new BABYLON.StandardMaterial(
                "groundMat",
                MfgInit.app.mfgScene.scene
            );
            materialGround1.diffuseColor    = new BABYLON.Color3( 0.5, 0.5, 0.5 );
            materialGround1.emissiveColor   = new BABYLON.Color3( 0.2, 0.2, 0.2 );
            materialGround1.backFaceCulling = false;

            var materialGround2:BABYLON.StandardMaterial = new BABYLON.StandardMaterial(
                "groundMat",
                MfgInit.app.mfgScene.scene
            );
            materialGround2.diffuseColor    = new BABYLON.Color3( 0.25, 0.25, 0.25 );
            materialGround2.emissiveColor   = new BABYLON.Color3( 0.2, 0.2, 0.2 );
            materialGround2.backFaceCulling = false;

            MfgGroundSimple.box1 = LibMath3D.createBox
            (
                "Box1",
                -25.0,
                50.0,
                -20.0,
                10.0,
                1.0,
                10.0,
                materialGround1,
                MfgInit.app.mfgScene.scene
            );

            MfgGroundSimple.box2 = LibMath3D.createBox
            (
                "Box2",
                -55.0,      // in front of car
                49.75,       // height over floor
                -25.0,      // side of car
                30.0,
                1.0,
                15.0,
                materialGround2,
                MfgInit.app.mfgScene.scene
            );


            MfgInit.app.mfgScene.shadowGenerator.getShadowMap().renderList.push( MfgGroundSimple.box1 );
            MfgInit.app.mfgScene.shadowGenerator.getShadowMap().renderList.push( MfgGroundSimple.box2 );


            MfgInit.app.onGroundLoaded();
        }
    }
