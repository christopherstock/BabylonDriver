
    /*****************************************************************************
    *   Formats strings in a specified way.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class LibStringFormat
    {
        /*****************************************************************************
        *   Returns a formatted timestamp of the current system date and time.
        *
        *   @return A formatted timestamp of the current system date and time.
        *****************************************************************************/
        public static getDateTimeString():string
        {
            var now:Date        = new Date();

            var year:string     = ( now.getFullYear()  ).toString();
            var month:string    = ( now.getMonth() + 1 ).toString();
            var day:string      = ( now.getDate()      ).toString();
            var hour:string     = ( now.getHours()     ).toString();
            var minute:string   = ( now.getMinutes()   ).toString();
            var second:string   = ( now.getSeconds()   ).toString();

            if ( month.toString().length  == 1 ) month  = '0' + month;
            if ( day.toString().length    == 1 ) day    = '0' + day;
            if ( hour.toString().length   == 1 ) hour   = '0' + hour;
            if ( minute.toString().length == 1 ) minute = '0' + minute;
            if ( second.toString().length == 1 ) second = '0' + second;

            return ( day + '.' + month + '.' + year + ' ' + hour + ':' + minute + ':' + second );
        }
    }
