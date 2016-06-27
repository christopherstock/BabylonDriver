/*****************************************************************************
*   Represents one specific project version.
*
*   @author     Christopher Stock
*   @version    0.0.1
*****************************************************************************/
var LibVersion = (function () {
    /*****************************************************************************
    *   Creates a project version.
    *
    *   @param version     The version specifier.
    *   @param codename    The internal codename.
    *   @param date        The completion date.
    *   @param log         The changelog.
    *****************************************************************************/
    function LibVersion(version, codename, date, log) {
        /** Version's specifier. */
        this.version = null;
        /** Version's internal codename. */
        this.codename = null;
        /** Version's completion date. */
        this.date = null;
        /** Version's changelog. */
        this.log = null;
        this.version = version;
        this.codename = codename;
        this.date = date;
        this.log = log;
    }
    /**************************************************************************************
    *   Delivers all information of this version.
    *
    *   @return A representation of the current project's version with it's timestamp.
    **************************************************************************************/
    LibVersion.prototype.getVersionDescriptor = function () {
        return ("v. " + this.version + ", " + this.date);
    };
    return LibVersion;
})();
//# sourceMappingURL=LibVersion.js.map