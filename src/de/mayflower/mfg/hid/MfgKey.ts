
    /*****************************************************************************
    *   Handles all key controls.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class MfgKey
    {
        public          static          KEYCODE_ESCAPE              :number             = 27;
        public          static          KEYCODE_SPACE               :number             = 32;

        public          static          KEYCODE_LEFT                :number             = 37;
        public          static          KEYCODE_UP                  :number             = 38;
        public          static          KEYCODE_RIGHT               :number             = 39;
        public          static          KEYCODE_DOWN                :number             = 40;

        public          static          KEYCODE_R                   :number             = 82;

        public          static          left                        :number             = 0;
        public          static          right                       :number             = 0;
        public          static          forward                     :number             = 0;
        public          static          back                        :number             = 0;
        public          static          changeDir                   :number             = 0;

        /*****************************************************************************
        *   Resets all key states to the 'unpushed' state.
        *****************************************************************************/
        public static resetKeys()
        {
            MfgKey.left      = 0;
            MfgKey.right     = 0;
            MfgKey.forward   = 0;
            MfgKey.back      = 0;
            MfgKey.changeDir = 0;
        }

        /*****************************************************************************
        *   Being invoked when a key is down.
        *
        *   @param keyEvent The key event being passed when a keyDown event is recognized.
        *****************************************************************************/
        public static onKeyDown( keyEvent:KeyboardEvent )
        {
            if ( keyEvent.keyCode == MfgKey.KEYCODE_LEFT    ) MfgKey.left    = 1;
            if ( keyEvent.keyCode == MfgKey.KEYCODE_UP      ) MfgKey.forward = 1;
            if ( keyEvent.keyCode == MfgKey.KEYCODE_RIGHT   ) MfgKey.right   = 1;
            if ( keyEvent.keyCode == MfgKey.KEYCODE_DOWN    ) MfgKey.back    = 1;

            if ( keyEvent.keyCode == MfgKey.KEYCODE_R       ) MfgKey.changeDir = 1;
            if ( keyEvent.keyCode == MfgKey.KEYCODE_SPACE   )
            {
                // if ( MfgApp.singleton.car.getSpeed() < 2 )
                {
                    MfgInit.app.resetCarPosition();
                }
            }
        }
            
        /*****************************************************************************
        *   Being invoked when a key is up.
        *
        *   @param keyEvent The key event being passed when a keyUp event is recognized.
        *****************************************************************************/
        public static onKeyUp( keyEvent:KeyboardEvent )
        {
            if ( keyEvent.keyCode == MfgKey.KEYCODE_LEFT      ) MfgKey.left    = 0;
            if ( keyEvent.keyCode == MfgKey.KEYCODE_UP        ) MfgKey.forward = 0;
            if ( keyEvent.keyCode == MfgKey.KEYCODE_RIGHT     ) MfgKey.right   = 0;
            if ( keyEvent.keyCode == MfgKey.KEYCODE_DOWN      ) MfgKey.back    = 0;
        }
    }
