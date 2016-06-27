/*****************************************************************************
*   Represents a debug group whose logging can be enabled or disabled.
*
*   @author     Christopher Stock
*   @version    0.0.1
*****************************************************************************/
var LibDebug = (function () {
    /*****************************************************************************
    *   Constructs a new debug group.
    *
    *   @param  debugEnabled    Flags if this debug group should log messages.
    *****************************************************************************/
    function LibDebug(debugEnabled) {
        /** The flag that enables or disables logging for this debug group. */
        this.debugEnabled = false;
        this.debugEnabled = debugEnabled;
    }
    /*****************************************************************************
    *   Logs a line of output to the default console. Will only generate output
    *   if the debug for this debug group is enabled.
    *
    *   @param msg The message to log to the default console.
    *****************************************************************************/
    LibDebug.prototype.log = function (msg) {
        if (this.debugEnabled) {
            console.log('[' + LibStringFormat.getDateTimeString() + '] ' + msg);
        }
    };
    return LibDebug;
})();
//# sourceMappingURL=LibDebug.js.map