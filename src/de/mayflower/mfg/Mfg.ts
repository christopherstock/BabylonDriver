
    /************************************************************************************
    *   The main class contains the application's points of entry and termination.
    *
    *   TODO ASAP   Replace all 'any' types with the correct Type!
    *   TODO HIGH   Remove unused startup / intro / hud control and set default settings.
    *   TODO INIT   Checkout .babylon 3d format?
    *   TODO INIT   Own car(s)?
    *   TODO INIT   Own driving physics?
    *   TODO INIT   Own level data?
    *
    *   DONE        Added MF-carsign and altered car texture.
    *   DONE        Refactored and extracted key system.
    *   DONE        Removed '"use strict"' at all locations.
    *   DONE        Removed all unused libs.
    *   DONE        Cleaned up index.html html code.
    *   DONE        Refactored ALL JS sources to TypeScript.
    *   DONE        Removed JS function randomColor.
    *   DONE        Imported own TypeScript (BabylonJS) library.
    *   DONE        Refactored and tidied all files and resources in file system.
    *   DONE        Removed all unused components.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ************************************************************************************/
    class Mfg
    {
        /*****************************************************************************
        *   This method is invoked when the application starts.
        *****************************************************************************/
        public static main():void
        {
            //init game engine
            MfgInit.init();
        }
    }

    /*****************************************************************************
    *   This is the application's point of entry.
    *****************************************************************************/
    window.onload = function()
    {
        //invoke main method
        Mfg.main();
    };

    /*****************************************************************************
    *   This is the application's point of termination.
    *****************************************************************************/
    window.onunload = function()
    {
    };
