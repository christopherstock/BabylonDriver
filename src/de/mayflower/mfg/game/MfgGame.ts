
    /************************************************************************************
    *   Holds the game logic.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ************************************************************************************/
    class MfgGame
    {
        /** The checkpoint system. */
        public                      checkpoints             :MfgCheckpoint                  = null;

        /** Number of failed checkpoints. */
        public                      failed                  :number                         = null;
        /** The current timer. */
        public                      timer                   :number                         = null;

        /************************************************************************************
        *   Instanciates a new game instance.
        ************************************************************************************/
        public constructor()
        {
        }

        public initFailed()
        {
            this.failed = 0
        }

        public initTimer()
        {
            this.timer = Date.now()
        }

        public failedStatusUpdate()
        {
            this.failed += 1;
            $("#failed_span").text( this.failed.toString() );
        }

        public updateTimer()
        {
            if ( MfgSetting.FEATURE_CHECKPOINTS )
            {
                if ( this.checkpoints.getNbCheckPoints() > 0 )
                {
                    var e = Date.now() - this.timer, t = Math.floor(e / 6e4), i = Math.floor((e - 6e4 * t) / 1e3), s = Math.floor((e - 6e4 * t - 1e3 * i) / 10), o = "", a = "", n = "";
                    10 > t && (o = "0"), 10 > i && (a = "0"), 10 > s && (n = "0");
                    $("#timer_span").text(o + t + ":" + a + i + ":" + n + s)
                }
            }
        }
    }
