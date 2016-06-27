/*****************************************************************************
*   Specifies the paramount part of the game logic.
*
*   @author     Christopher Stock
*   @version    0.0.1
*****************************************************************************/
var MfgCamera = (function () {
    function MfgCamera() {
    }
    /*****************************************************************************
    *   Sets up the scene camera.
    *
    *   @param  startupPosition     The camera startup position.
    *   @param  startupTarget       The camera startup target.
    *****************************************************************************/
    MfgCamera.init = function (startupPosition, startupTarget) {
        MfgCamera.camera = new BABYLON.FreeCamera("Camera", startupPosition, MfgScene.scene);
        MfgCamera.camera.setTarget(startupTarget);
        MfgCamera.camera.checkCollisions = true;
        MfgCamera.camera.applyGravity = true;
        //Set the ellipsoid around the camera (e.g. your player's size)
        MfgCamera.camera.ellipsoid = new BABYLON.Vector3(MfgSettings.PLAYER_SIZE_XZ, MfgSettings.PLAYER_SIZE_Y, MfgSettings.PLAYER_SIZE_XZ);
    };
    MfgCamera.camera = null;
    return MfgCamera;
})();
//# sourceMappingURL=MfgCamera.js.map