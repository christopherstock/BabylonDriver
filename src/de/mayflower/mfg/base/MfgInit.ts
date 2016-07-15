
    /*****************************************************************************
    *   Specifies the initialization part of the game logic.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class MfgInit
    {
        /*****************************************************************************
        *   Inits this app from scratch.
        *****************************************************************************/
        public static init()
        {
            //acclaim debug console and set the document title
            MfgDebug.acclaim.log( MfgSettings.TITLE );
            document.title = MfgSettings.TITLE;

            //create preloader
            MfgPreloader.singleton = new MfgPreloader();

            MfgDebug.init.log( "Creating app .." );

            //create app
            MfgApp.singleton = new MfgApp();

            MfgDebug.init.log( "Creating UI .." );


            //create UI
            MfgApp.singleton.ui = new MfgUI();
            MfgApp.singleton.ui.initMenuUI();

            //create the app scene
            MfgApp.singleton.createScene();


/*
            //reference canvas element and fps counter div
            MfgInit.canvas = <HTMLCanvasElement>document.getElementById( "driverCanvas" );
            MfgInit.divFps = <HTMLDivElement>   document.getElementById( "fps"          );

            //setup canvas size
            MfgInit.canvas.width  = MfgSettings.CANVAS_WIDTH;
            MfgInit.canvas.height = MfgSettings.CANVAS_HEIGHT;

            //init Babylon.js engine
            MfgDebug.init.log( "Initializing the BABYLON engine." );
            MfgInit.engine = new BABYLON.Engine( MfgInit.canvas, true );

            //add resize event listener
            window.addEventListener(
                "resize",
                function () {
                    MfgInit.engine.resize();
                }
            );

            MfgDebug.init.log( "Displaying the loading UI" );
            MfgInit.engine.displayLoadingUI();

            //create the scene
            MfgDebug.init.log( "Creating the Scene" );
            MfgScene.createScene();

            //init materials
            MfgDebug.init.log( "Init all materials" );
            MfgMaterial.initMaterials( MfgScene.scene );

            //init sprite manager
            MfgDebug.init.log( "Init the sprite manager" );
            MfgSprite.init();

            //setup physics
            MfgDebug.init.log( "Setup all physics" );
            MfgScene.scene.enablePhysics( null, new BABYLON.OimoJSPlugin() );

            //setup the level
            MfgDebug.init.log( "Setup the level" );
            MfgGame.currentLevel = new MfgLevelFirstPerson();
*/
        }

        /*****************************************************************************
        *   Being invoked when all items are initialized and loaded.
        *****************************************************************************/
        public static onInitCompleted()
        {
            MfgDebug.init.log( "onInitCompleted" );
/*
            MfgScene.scene.executeWhenReady
            (
                MfgScene.initSceneCompleted
            );
*/
        }
    }
