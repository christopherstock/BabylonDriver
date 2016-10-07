
    /************************************************************************************
    *   Represents the ground.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ************************************************************************************/
    class MfgGroundSimple
    {
        public static init()
        {
            var materialGround:BABYLON.StandardMaterial = new BABYLON.StandardMaterial( "groundMat", MfgInit.app.mfgScene.scene );
            materialGround.diffuseColor = new BABYLON.Color3( 0.5, 0.5, 0.5 );
            materialGround.emissiveColor = new BABYLON.Color3( 0.2, 0.2, 0.2 );
            materialGround.backFaceCulling = false;

            var babylonGround:BABYLON.Mesh = MfgGroundSimple.createBox
            (
                "Ground1",
                new BABYLON.Vector3( -25.0, 50.0, -20.0 ),
                10.0,
                1.0,
                10.0,
                new BABYLON.Vector3( 0.0, 0.0, 0.0 ),
                0.0,
                materialGround,
                MfgInit.app.mfgScene.scene
            );

            var boundingBox = babylonGround.getBoundingInfo().boundingBox;
            var minVec3 = boundingBox.minimumWorld;
            var maxVec3 = boundingBox.maximumWorld;

            var cannonBox  = new CANNON.Box( new CANNON.Vec3( 10.0, 10.0, 1.0 ) );
            var cannonBody = new CANNON.Body(
                {
                    mass: 0,
                    material: MfgInit.app.mfgScene.world.groundMaterial
                }
            );
            cannonBody.addShape(cannonBox);
            cannonBody.collisionFilterGroup = MfgWorld.GROUP1;
            cannonBody.collisionFilterMask  = MfgWorld.GROUP2;
            cannonBody.position.set( -25.0, -20.0, 50.0 );

            MfgInit.app.mfgScene.world.world.addBody( cannonBody );


/*
            var cannonPlane:CANNON.Plane = new CANNON.Plane();
            var shapeBody:CANNON.Body    = new CANNON.Body( { mass: 30 } );
            shapeBody.addShape( cannonPlane );

            //var pos = new CANNON.Vec3( -25.0, 50.0, -20.0 );
            shapeBody.position.set( -25.0, 50.0, -20.0 );
            //shapeBody.
            shapeBody.velocity.set( 0, 0, 0 );
            shapeBody.angularVelocity.set( 0, 0, 0 );

            MfgInit.app.mfgScene.world.world.addBody( shapeBody );
*/

/*
            var groundBodyBox:CANNON.Box = new CANNON.Box( new CANNON.Vec3( 100.0, 100.0, 100.0 ) );
            var groundBody:CANNON.Body   = new CANNON.Body(
                {
                    mass:     1.0
                }
            );
            groundBody.addShape( groundBodyBox, new CANNON.Vec3( -50.0, -50.0, -25.0 ));

            MfgInit.app.mfgScene.world.world.addBody( groundBody );
*/

/*
            var groundBodyBox:CANNON.Box = new CANNON.Box( new CANNON.Vec3( 100.0, 100.0, 100.0 ) );
            var groundBody = new CANNON.Body(
                {
                    mass:     0
                }
            );
            groundBody.addShape( groundBodyBox );
            groundBody.position.set( -50.0, -50.0, -25.0 );

            MfgInit.app.mfgScene.world.world.addBody( groundBody );
*/
            MfgInit.app.onGroundLoaded();
        }

        /*****************************************************************************
        *   Creates a box.
        *****************************************************************************/
        public static createBox
        (
            id              :string,
            position        :BABYLON.Vector3,
            width           :number,
            height          :number,
            depth           :number,
            rotationAxis    :BABYLON.Vector3,
            rotationAmount  :number,
            material        :BABYLON.Material,
            scene           :BABYLON.Scene
        )
        :BABYLON.Mesh
        {
            var box:BABYLON.Mesh = BABYLON.Mesh.CreateBox
            (
                id,
                {
                    width:  width,
                    height: height,
                    depth:  depth,
                },
                scene
            );

            box.position        = position;

            box.position.x += width  / 2;
            box.position.y += height / 2;
            box.position.z += depth  / 2;

            box.checkCollisions = true;
            box.material        = material;
            box.receiveShadows  = false;

            //box.rotate( rotationAxis, rotationAmount, BABYLON.Space.WORLD );

            return box;
        }
    }
