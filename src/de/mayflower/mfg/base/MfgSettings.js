/*****************************************************************************
*   Specifies all adjustments and balancings for the application.
*
*   @author     Christopher Stock
*   @version    0.0.1
*****************************************************************************/
var MfgSettings = (function () {
    function MfgSettings() {
    }
    /** Determines the app's operation mode. */
    MfgSettings.MODE = MfgDebugSettings.MODE_DEBUG;
    /** The application's internal name. */
    MfgSettings.TITLE = "Babylon.js primer, (c) 2016 Mayflower GmbH, v. [" + MfgVersion.CURRENT_VERSION.getVersionDescriptor() + "]";
    /** The desired canvas3D width. */
    MfgSettings.CANVAS_WIDTH = 800;
    /** The desired canvas3D height. */
    MfgSettings.CANVAS_HEIGHT = 600;
    /** The scene's gravity. */
    MfgSettings.GRAVITY = 0.0; //-0.01;
    /** The relative path from index.html where all images the app makes use of reside. */
    MfgSettings.PATH_IMAGE_TEXTURE = "res/image/texture/";
    /** The relative path from index.html where all sounds the app makes use of reside. */
    MfgSettings.PATH_SOUND = "res/sound/";
    /** The relative path from index.html where all 3d model files the app makes use of reside. */
    MfgSettings.PATH_3DS = "res/3ds/";
    /** The player's x and z dimension (radius). */
    MfgSettings.PLAYER_SIZE_XZ = 1.0;
    /** The player's y dimension (height). */
    MfgSettings.PLAYER_SIZE_Y = 2.0;
    /** The player's speed in world coordinate per tick. */
    MfgSettings.PLAYER_SPEED_MOVE = 10;
    /** The player's turning speed in degrees per tick. */
    MfgSettings.PLAYER_SPEED_TURN = 5.0;
    /** The player's looking up/down speed in degrees per tick. */
    MfgSettings.PLAYER_SPEED_LOOK_UP_DOWN = 2.5;
    /** The player's maximum looking up/down in degrees. */
    MfgSettings.PLAYER_MAX_LOOK_UP_DOWN = 60.0;
    /** The player's speed for centering the up/down view aim in degrees per tick. */
    MfgSettings.PLAYER_SPEED_CENTER_VIEW_AIM = 5.0;
    return MfgSettings;
})();
//# sourceMappingURL=MfgSettings.js.map