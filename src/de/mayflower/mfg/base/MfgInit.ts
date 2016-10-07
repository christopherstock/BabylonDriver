
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
            MfgDebug.acclaim.log( MfgSetting.TITLE );
            document.title = MfgSetting.TITLE;

            //create preloader
            MfgInit.preloader = new MfgPreloader();

            //create app and it's scene
            MfgInit.app = new MfgApp();
            MfgInit.app.createScene();
        }
    }
