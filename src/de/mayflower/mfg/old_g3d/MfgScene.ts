
    /*****************************************************************************
    *   Specifies the game scene.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class MfgScene
    {
        public          static                  scene                   :BABYLON.Scene              = null;

        /*****************************************************************************
        *   Constructs and fills the scene.
        *****************************************************************************/
        public static createScene()
        {
            //create scene
            MfgScene.scene            = new BABYLON.Scene( MfgInit.engine );
        }

        /*****************************************************************************
        *   Being invoked when the scene is set up.
        *****************************************************************************/
        public static initSceneCompleted()
        {
            MfgDebug.init.log( "> Init scene completed" );

            MfgInit.canvas.style.opacity = "1";

            //NOW hide the loading UI!
            MfgInit.engine.hideLoadingUI();

            //assign controls
            MfgScene.scene.activeCamera.attachControl( MfgInit.canvas );
            MfgScene.scene.onPointerDown = MfgPointer.assignPointerDown;

            //launch render loop ?? required ??
            MfgDebug.init.log( "Starting the render loop." );
            MfgInit.engine.runRenderLoop( MfgGame.render );
        }
    }
