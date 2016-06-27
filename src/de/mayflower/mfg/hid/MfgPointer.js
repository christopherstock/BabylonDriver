/*****************************************************************************
*   Pointer controls.
*
*   @author     Christopher Stock
*   @version    0.0.1
*****************************************************************************/
var MfgPointer = (function () {
    function MfgPointer() {
    }
    MfgPointer.assignPointerDown = function (evt, pickResult) {
        if (pickResult.hit) {
            var dir = pickResult.pickedPoint.subtract(MfgScene.scene.activeCamera.position);
            dir.normalize();
            pickResult.pickedMesh.applyImpulse(dir.scale(10), pickResult.pickedPoint);
        }
    };
    return MfgPointer;
})();
//# sourceMappingURL=MfgPointer.js.map