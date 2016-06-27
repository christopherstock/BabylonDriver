/*****************************************************************************
*   Handles different level sets.
*
*   @author     Christopher Stock
*   @version    0.0.1
*****************************************************************************/
var MfgLevel = (function () {
    function MfgLevel(cameraStartup, cameraTarget, clearColor) {
        MfgCamera.init(cameraStartup, cameraTarget);
        MfgScene.scene.clearColor = clearColor;
        MfgScene.scene.gravity = new BABYLON.Vector3(0, MfgSettings.GRAVITY, 0);
    }
    return MfgLevel;
})();
//# sourceMappingURL=MfgLevel.js.map