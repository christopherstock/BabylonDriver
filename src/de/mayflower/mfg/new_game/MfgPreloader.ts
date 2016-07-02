
    /************************************************************************************
    *   The preloading system being shown before the application starts up.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ************************************************************************************/
    class MfgPreloader
    {
        /** The singleton instance of this class. */
        public          static              singleton               :MfgPreloader               = null;

        /** The preloader div container. */
        public                              divPreloader            :HTMLDivElement             = null;
        /** The loading message div container. */
        public                              divLoadingMessage       :JQuery                     = null;

        /************************************************************************************
        *   Instanciates the preloading system.
        ************************************************************************************/
        public constructor()
        {
            this.divPreloader      = <HTMLDivElement>document.getElementById( "preloader"      );
            this.divLoadingMessage = $( "#loadingMessage" );
        }

        /************************************************************************************
        *   Hides the preloader.
        ************************************************************************************/
        public hidePreloader()
        {
            this.divPreloader.hidden = true;
        }

        /************************************************************************************
        *   Sets the specified text as the current loading message.
        *
        *   @param msg The text to set as the current loading message.
        ************************************************************************************/
        public setLoadingMessage( msg:string )
        {
            this.divLoadingMessage.text( msg );
        }
    }
