
    /************************************************************************************
    *   The preloading system being shown before the application starts up.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ************************************************************************************/
    class MfgPreloader
    {
        /** The preloader div container. */
        private                              divPreloader            :HTMLDivElement             = null;
        
        /** The loading message div container. */
        private                             divLoadingMessage       :JQuery                     = null;

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
