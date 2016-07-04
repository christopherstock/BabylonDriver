
    /************************************************************************************
    *   Manages the Heads Up Display.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ************************************************************************************/
    class MfgHUD
    {
        /************************************************************************************
        *   Instanciates the HUD.
        ************************************************************************************/
        public constructor()
        {
        }

        /************************************************************************************
        *   Displays the direction in the HUD.
        ************************************************************************************/
        public displayDirection( e )
        {
            var directionDiv = $("#direction");
            1 === e ? directionDiv.text("") : directionDiv.text("R")
        }

        public updateTdB()
        {
            $("#speed_span").text( Math.round( MfgApp.singleton.car.getSpeed() ).toString() )
        }

        public checkpointsStatusUpdate()
        {
            $("#remaining_span").text( MfgApp.singleton.checkpoints.getNbCheckPoints() )
        }
    }
