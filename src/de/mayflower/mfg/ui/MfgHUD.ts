
    /************************************************************************************
    *   Manages the Heads Up Display.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ************************************************************************************/
    class MfgHUD
    {
        /** The FramesPerSecond meter. */
        public                      fpsMeter                :FPSMeter                       = null;

        /************************************************************************************
        *   Instanciates the HUD.
        ************************************************************************************/
        public constructor()
        {
            this.fpsMeter = new FPSMeter(
                null,
                {
                    graph:    1,
                    decimals: 2,
                    position: "absolute",
                    zIndex:   10,
                    right:    "5px",
                    top:      "auto",
                    left:     "auto",
                    bottom:   "5px",
                    margin:   "0"
                }
            );
        }

        /************************************************************************************
        *   Displays the direction in the HUD.
        ************************************************************************************/
        public displayDirection( e )
        {
            var directionDiv = $("#direction");
            1 === e ? directionDiv.text("") : directionDiv.text("R")
        }

        /************************************************************************************
        *   Updates the speed in the HUD.
        ************************************************************************************/
        public updateTdB()
        {
            $("#speed_span").text( Math.round( MfgInit.app.mfgScene.car.getSpeed() ).toString() )
        }

        /************************************************************************************
        *   Updates remaining checkpoint count in the HUD.
        ************************************************************************************/
        public checkpointsStatusUpdate=()=>
        {
            if ( MfgSetting.FEATURE_CHECKPOINTS )
            {
                // TODO what was the right solution to cast a numnber into a string again?
                $("#remaining_span").text( "" + MfgCheckpoint.getNbCheckPoints() );
            }
        };
    }
