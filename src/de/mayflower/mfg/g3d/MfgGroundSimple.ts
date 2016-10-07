
    /************************************************************************************
    *   Represents the custom ground.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ************************************************************************************/
    class MfgGroundSimple
    {
        /*****************************************************************************
        *   Initializes the custom ground.
        *****************************************************************************/
        public static init()
        {
            var materialGround:BABYLON.StandardMaterial = new BABYLON.StandardMaterial( "groundMat", MfgInit.app.mfgScene.scene );
            materialGround.diffuseColor = new BABYLON.Color3( 0.5, 0.5, 0.5 );
            materialGround.emissiveColor = new BABYLON.Color3( 0.2, 0.2, 0.2 );
            materialGround.backFaceCulling = false;

            var x:number      = -25.0;
            var y:number      = 50.0;
            var z:number      = -20.0;
            var width:number  = 10.0;
            var height:number = 1.0;
            var depth:number  = 10.0;

            var babylonGround:BABYLON.Mesh = LibMath3D.createBox
            (
                "Ground1",
                new BABYLON.Vector3( x, y, z ),
                width,
                height,
                depth,
                materialGround,
                MfgInit.app.mfgScene.scene
            );

            var cannonBox  = new CANNON.Box( new CANNON.Vec3( width / 2, depth / 2, height / 2 ) );
            var cannonBody = new CANNON.Body(
                {
                    mass: 0,
                    material: MfgInit.app.mfgScene.world.groundMaterial
                }
            );
            cannonBody.addShape(cannonBox);
            cannonBody.collisionFilterGroup = MfgWorld.GROUP1;
            cannonBody.collisionFilterMask  = MfgWorld.GROUP2;
            cannonBody.position.set( x + width / 2, z + depth / 2, y + height / 2 );

            MfgInit.app.mfgScene.world.world.addBody( cannonBody );

            MfgInit.app.onGroundLoaded();
        }
    }
