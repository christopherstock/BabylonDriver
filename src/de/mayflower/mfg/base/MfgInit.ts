
    /*****************************************************************************
    *   Specifies the initialization part of the game logic.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class MfgInit
    {
        /** The preloading system. */
        public          static              preloader               :MfgPreloader               = null;

        /** The app instance. */
        public          static              app                     :MfgApp                     = null;

        /*****************************************************************************
        *   Inits this app from scratch.
        *****************************************************************************/
        public static init()
        {
            //acclaim debug console and set the document title
            MfgDebug.acclaim.log( MfgSettings.TITLE );
            document.title = MfgSettings.TITLE;

            //create preloader and app
            MfgInit.preloader = new MfgPreloader();
            MfgInit.app = new MfgApp();

            //create the app scene
            MfgInit.app.createScene();
        }
    }
