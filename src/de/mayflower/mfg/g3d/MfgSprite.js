/*****************************************************************************
*   Specifies the sprite system.
*
*   @author     Christopher Stock
*   @version    0.0.1
*****************************************************************************/
var MfgSprite = (function () {
    function MfgSprite() {
    }
    /*****************************************************************************
    *   Initializes the sprite manager.
    *****************************************************************************/
    MfgSprite.init = function () {
        MfgSprite.spriteManager = new BABYLON.SpriteManager("treesManager", MfgSettings.PATH_IMAGE_TEXTURE + "tree.png", 100, 357, MfgScene.scene);
    };
    MfgSprite.spriteManager = null;
    return MfgSprite;
}());
//# sourceMappingURL=MfgSprite.js.map