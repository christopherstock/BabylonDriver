var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/*****************************************************************************
*   Specifies the 'first person' level.
*
*   @author     Christopher Stock
*   @version    0.0.1
*****************************************************************************/
var MfgLevelFirstPerson = (function (_super) {
    __extends(MfgLevelFirstPerson, _super);
    /*****************************************************************************
    *   Sets up the 'bunny' level.
    *****************************************************************************/
    function MfgLevelFirstPerson() {
        _super.call(this, new BABYLON.Vector3(-10.0, 10.0, -10.0), new BABYLON.Vector3(0, 0, 0), LibUI.COLOR_DARK_GREY);
        this.light1 = null;
        this.setupLights();
        this.setupGround();
        MfgInit.onInitCompleted();
    }
    /*****************************************************************************
    *   Sets up all lights.
    *****************************************************************************/
    MfgLevelFirstPerson.prototype.setupLights = function () {
        //setup lights
        this.light1 = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0.0, -1.0, 0.0), MfgScene.scene);
        this.light1.intensity = 1.0;
        this.light1.position = new BABYLON.Vector3(0.0, 0.0, 0.0);
    };
    /*****************************************************************************
    *   Sets up the ground for the scene.
    *****************************************************************************/
    MfgLevelFirstPerson.prototype.setupGround = function () {
        MfgSceneFactory.createBox("Ground1", new BABYLON.Vector3(0.0, 0.0, 0.0), 10.0, 0.5, 10.0, new BABYLON.Vector3(0.0, 0.0, 0.0), 0.0, MfgMaterial.materialTest1, MfgScene.scene);
    };
    return MfgLevelFirstPerson;
})(MfgLevel);
//# sourceMappingURL=MfgLevelFirstPerson.js.map