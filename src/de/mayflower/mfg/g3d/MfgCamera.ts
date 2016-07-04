
    /************************************************************************************
    *   Encapsulated all cameras being used in the app.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ************************************************************************************/
    class MfgCamera
    {
        /** The car follow camera. */
        public                      followCamera            :BABYLON.FollowCamera           = null;

        /************************************************************************************
        *   Instanciates the cameras being used in the app.
        ************************************************************************************/
        public constructor( scene:BABYLON.Scene, target:BABYLON.Mesh )
        {
            this.followCamera = this.createFollowCamera( scene, target );
        }

        private createFollowCamera( scene:BABYLON.Scene, target:BABYLON.Mesh ) : BABYLON.FollowCamera
        {
            var e = new BABYLON.FollowCamera(
                "FollowCam",
                new BABYLON.Vector3(
                    0,
                    15,
                    -45
                ),
                scene
            );
            e.target = target;
            e.radius = 8;
            e.heightOffset = 2;
            e.rotationOffset = 90;
            e.cameraAcceleration = .05;
            e.maxCameraSpeed = 20;

            return e;
        }
    }
