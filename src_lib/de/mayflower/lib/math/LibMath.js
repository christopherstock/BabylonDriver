/*****************************************************************************
*   Offers general arithmetic functionality.
*
*   @author     Christopher Stock
*   @version    0.0.1
*****************************************************************************/
var LibMath = (function () {
    function LibMath() {
    }
    /*****************************************************************************
    *   Returns an integer number of the specified range.
    *
    *   @param  from    Start of the range.
    *   @param  to      End of the range.
    *   @return         An integer number in between the specified range.
    *****************************************************************************/
    LibMath.getRandomInt = function (from, to) {
        return Math.floor((Math.random() * (to - from)) + from);
    };
    return LibMath;
})();
//# sourceMappingURL=LibMath.js.map