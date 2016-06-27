/*****************************************************************************
*   The debug system, specifying switchable debug groups
*   that generate output to the screen console.
*
*   @author     Christopher Stock
*   @version    0.0.1
*****************************************************************************/
var MfgDebug = (function () {
    function MfgDebug() {
    }
    /** A primal debug group for general debug purposes. */
    MfgDebug.bugfix = new LibDebug(true && MfgSettings.MODE == MfgDebugSettings.MODE_DEBUG);
    /** The debug group for the startup acclaim message. */
    MfgDebug.acclaim = new LibDebug(true && MfgSettings.MODE == MfgDebugSettings.MODE_DEBUG);
    /** The debug group for the startup initialization messages. */
    MfgDebug.init = new LibDebug(true && MfgSettings.MODE == MfgDebugSettings.MODE_DEBUG);
    /** The debug group for the key system. */
    MfgDebug.key = new LibDebug(false && MfgSettings.MODE == MfgDebugSettings.MODE_DEBUG);
    /** The debug group for the image system. */
    MfgDebug.imageLoader = new LibDebug(false && MfgSettings.MODE == MfgDebugSettings.MODE_DEBUG);
    /** The debug group for the sound system. */
    MfgDebug.soundLoader = new LibDebug(false && MfgSettings.MODE == MfgDebugSettings.MODE_DEBUG);
    /** The debug group for the canvas3D system. */
    MfgDebug.canvas3D = new LibDebug(false && MfgSettings.MODE == MfgDebugSettings.MODE_DEBUG);
    /** The debug group for the text file loading system. */
    MfgDebug.textLoader = new LibDebug(false && MfgSettings.MODE == MfgDebugSettings.MODE_DEBUG);
    /** The debug group for the 3ds max .ase file parser. */
    MfgDebug.res3ds = new LibDebug(false && MfgSettings.MODE == MfgDebugSettings.MODE_DEBUG);
    return MfgDebug;
})();
//# sourceMappingURL=MfgDebug.js.map