
    /************************************************************************************
    *   Encapsulated all cameras being used in the app.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ************************************************************************************/
    class MfgCamera
    {
        /** The arc rotating camera. */
        public                      arcCamera               :BABYLON.ArcRotateCamera        = null;
        /** The car follow camera. */
        public                      followCamera            :BABYLON.FollowCamera           = null;

        /************************************************************************************
        *   Instanciates the cameras being used in the app.
        ************************************************************************************/
        public constructor( scene:BABYLON.Scene, target:BABYLON.Mesh )
        {
            this.arcCamera    = this.createArcCamera(    scene );
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

        private createArcCamera( scene:BABYLON.Scene ) : BABYLON.ArcRotateCamera
        {
            var e, t, i;
            e = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0, 0, 0, new BABYLON.Vector3(0, 10, 0), scene);
            e.setPosition(new BABYLON.Vector3(200, 150, 200));
            e.lowerAlphaLimit = e.upperAlphaLimit = 0;
            e.lowerBetaLimit = 2;
            e.upperBetaLimit = 1;
            e.lowerRadiusLimit = e.upperRadiusLimit = e.radius;
            t = scene;
            i = MfgApp.singleton.ground;
            scene.registerBeforeRender(
                function() {
                    if (t.isReady())
                    {
                        i.updateShaders(t.activeCamera.position);
                        t.activeCamera.alpha += .002;
                    }
                }
            );
            e.viewport = new BABYLON.Viewport(0, 0, 1, 1);

            return e;
        }
    }
