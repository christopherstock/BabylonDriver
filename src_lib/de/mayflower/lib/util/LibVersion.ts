
    /*****************************************************************************
    *   Represents one specific project version.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class LibVersion
    {
        /** Version's specifier. */
        private                 version                 :string             = null;
        /** Version's internal codename. */
        private                 codename                :string             = null;
        /** Version's completion date. */
        private                 date                    :string             = null;
        /** Version's changelog. */
        private                 log                     :string             = null;

        /*****************************************************************************
        *   Creates a project version.
        *
        *   @param version     The version specifier.
        *   @param codename    The internal codename.
        *   @param date        The completion date.
        *   @param log         The changelog.
        *****************************************************************************/
        constructor( version:string, codename:string, date:string, log:string )
        {
            this.version  = version;
            this.codename = codename;
            this.date     = date;
            this.log      = log;
        }

        /**************************************************************************************
        *   Delivers all information of this version.
        *
        *   @return A representation of the current project's version with it's timestamp.
        **************************************************************************************/
        public getVersionDescriptor():string
        {
            return ( "v. " + this.version + ", " + this.date );
        }
    }
