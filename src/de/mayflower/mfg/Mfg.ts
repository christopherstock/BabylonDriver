
    /************************************************************************************
    *   The main class contains the application's points of entry and termination.
    *
    *   TODO HIGH   Turn all 'public' fields and methods to 'private' where possible.
    *
    *   TODO HIGH   Prune ALL constructors!
    *
    *   TODO HIGH   Remove ALL compiler errors.
    *   TODO HIGH   Detect collision with obstacles? (Crash car in this case!)
    *   TODO HIGH   Implement reluctant obstacles!
    *   TODO ASAP   Extract level data to own class.
    *   TODO HIGH   Remove unused startup / intro / hud control and set default settings.
    *   TODO INIT   Checkout .babylon 3d format.
    *   TODO INIT   Own car(s).
    *   TODO INIT   Enrich documentation for all fields and methods.
    *   TODO WEAK   Move menu hud initilization to MfgUI ?
    *   TODO WEAK   Own driving physics!
    *   TODO WEAK   Own level data!
    *
    *   DONE        Moved all features to separate classes.
    *   DONE        Removed all compiler warnings.
    *   DONE        Feature toggle for all features.
    *   DONE        Pruned init system.
    *   DONE        Pruned all 'singletons'.
    *   DONE        Replaced all 'any' types with the correct Type.
    *   DONE        Extracted scene class.
    *   DONE        Created MfgCamera class.
    *   DONE        Extracted UI class.
    *   DONE        Extracted preloader class.
    *   DONE        Improved loading messages.
    *   DONE        Removed all compiler errors.
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
