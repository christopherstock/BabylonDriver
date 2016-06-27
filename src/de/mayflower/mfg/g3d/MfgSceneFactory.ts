
    /*****************************************************************************
    *   Constructs scene objects.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class MfgSceneFactory
    {
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



            //ground.rotate( rotationAxis, rotationAmount, BABYLON.Space.WORLD );
/*
            ground.setPhysicsState
            (
                BABYLON.PhysicsEngine.BoxImpostor,
                {
                    mass:        0,
                    friction:    0.5,
                    restitution: 0.7
                }
            );
*/
            return box;
        }

        /*****************************************************************************
        *   Creates a box the OLD style.
        *****************************************************************************/
        public static createOldBox
        (
            id              :string,
            position        :BABYLON.Vector3,
            scaling         :BABYLON.Vector3,
            rotationAxis    :BABYLON.Vector3,
            rotationAmount  :number,
            material        :BABYLON.Material,
            scene           :BABYLON.Scene
        )
        :BABYLON.Mesh
        {
            var ground:BABYLON.Mesh = BABYLON.Mesh.CreateBox( id, 1, scene );

            ground.position         = position;
            ground.scaling          = scaling;
            ground.checkCollisions  = true;
            ground.material         = material;
            ground.receiveShadows   = true;

            ground.rotate( rotationAxis, rotationAmount, BABYLON.Space.WORLD );
            ground.setPhysicsState
            (
                BABYLON.PhysicsEngine.BoxImpostor,
                {
                    mass:        0,
                    friction:    0.5,
                    restitution: 0.7
                }
            );

            return ground;
        }
    }
