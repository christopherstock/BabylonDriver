
    /************************************************************************************
    *   Wraps all UI elements and according tasks.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ************************************************************************************/
    class MfgUI
    {
        /** The singleton instance of this class. */
        public      static          singleton               :MfgUI                          = null;

        /** The button that starts the game in the menu screen. */
        public                      buttonStart             :JQuery                         = null;

        /************************************************************************************
        *   Instanciates the UI system.
        ************************************************************************************/
        public constructor()
        {
            this.buttonStart = $("#start_btn");
        }

        /************************************************************************************
        *   Inits the UI that is shown in the overview screen.
        ************************************************************************************/
        public initMenuUI()
        {
            this.buttonStart.click(
                function()
                {
                    MfgApp.singleton.startDriving();
                }
            );
        }






    }
