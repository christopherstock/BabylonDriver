
    /*****************************************************************************
    *   Handles different level sets.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class MfgLevel
    {
        constructor( cameraStartup:BABYLON.Vector3, cameraTarget:BABYLON.Vector3, clearColor:BABYLON.Color3 )
        {
            MfgCamera.init( cameraStartup, cameraTarget );

            MfgScene.scene.clearColor = clearColor;
            MfgScene.scene.gravity    = new BABYLON.Vector3( 0, MfgSettings.GRAVITY, 0 );
        }
    }
