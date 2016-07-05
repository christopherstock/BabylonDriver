
    /************************************************************************************
    *   Represents the whole application.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ************************************************************************************/
    class MfgApp
    {
        /** The singleton instance of this demo app. */
        public      static          singleton               :MfgApp                        = null;

        /** The singleton instance of the Babylon.js engine. */
        public                      engine                  :BABYLON.Engine                 = null;
        /** The canvas where all drawing operations appear. */
        public                      canvas                  :HTMLCanvasElement              = null;

        /** The scene to render. */
        public                      mfgScene                :MfgScene                       = null;
        /** The game logic. */
        public                      game                    :MfgGame                        = null;
        /** The HUD. */
        public                      hud                     :MfgHUD                         = null;

        /** The handler for the keyUp event. */
        public                      keyupHandler            :any                            = null;
        /** The handler for the keyDown event. */
        public                      keydownHandler          :any                            = null;
        /** Unknown by now. */
        public                      registerBeforeRender    :any                            = null;

        /************************************************************************************
        *   Instanciates the demo application.
        ************************************************************************************/
        public constructor()
        {
            MfgDebug.init.log( "MfgApp constructor passed" );

            this.canvas = <HTMLCanvasElement>document.getElementById("driverCanvas");
            this.engine = new BABYLON.Engine( this.canvas, !0 );

            //create game
            this.game = new MfgGame();

            //create HUD
            this.hud = new MfgHUD();
        }

        /************************************************************************************
        *   Starts the driving simulation process.
        ************************************************************************************/
        public startDriving()
        {
            if ( this.game.checkpoints.isEnabled() )
            {
                this.hud.checkpointsStatusUpdate();
                this.game.initTimer();
                this.game.initFailed();
            }

            this.activateCamera( this.mfgScene.camera.followCamera );

            this.mfgScene.car.setPosition(
                new CANNON.Vec3(
                    MfgSettings.CAR_STARTUP_X,
                    MfgSettings.CAR_STARTUP_Y,
                    MfgSettings.CAR_STARTUP_Z
                )
            );
            this.mfgScene.car.update();

            this.registerMoves();
        }

        public createScene()
        {
            MfgDebug.init.log( "Creating scene.." );

            this.mfgScene = new MfgScene( this.engine );

            MfgDebug.init.log( "Creating world.." );

            MfgDebug.init.log( "Creating lights.." );

            this.mfgScene.createLights();
            this.mfgScene.createShadowGenerator();

            MfgDebug.init.log( "Creating ground.." );

            this.mfgScene.loadGround();
        }

        public onGroundLoaded()
        {
            MfgDebug.init.log( "onGroundLoaded.." );

            MfgApp.singleton.mfgScene.loadCar();
        }

        public onCarLoaded()
        {
            MfgDebug.init.log( "onCarLoaded.." );

            MfgApp.singleton.loadCheckpoints()
        }

        public loadCheckpoints()
        {
            MfgDebug.init.log( "load checkpoints" );

            this.game.checkpoints = new MfgCheckpoint(
                MfgApp.singleton.mfgScene.scene,
                MfgApp.singleton.mfgScene.car.getCarMainMesh(),
                MfgApp.singleton.mfgScene.ground,
                "./res/paris/",
                "paris_poi.babylon",
                "./res/image/misc/poi.png",
                9,
                512,
                {
                    chekpointsCallback: MfgApp.singleton.hud.checkpointsStatusUpdate.bind( this ),
                    onLoadFinished:     MfgApp.singleton.onCheckpointsLoaded
                }
            );
            MfgApp.singleton.game.checkpoints.load()
        }

        public onCheckpointsLoaded()
        {
            MfgDebug.init.log( "onCheckpointsLoaded.." );

            MfgApp.singleton.start();
        }

        public activateCamera( e )
        {
            this.mfgScene.scene.activeCamera = e;
            e.attachControl(this.canvas, !1);
        }

        public registerMoves()
        {
            window.addEventListener(
                "keydown",
                this.keydownHandler
            );

            window.addEventListener(
                "keyup",
                this.keyupHandler
            );

            this.mfgScene.scene.registerBeforeRender(
                this.registerBeforeRender
            );
        }

        public resetCarPosition()
        {
            this.mfgScene.car.setPosition(
                new CANNON.Vec3(
                    MfgSettings.CAR_STARTUP_X,
                    MfgSettings.CAR_STARTUP_Y,
                    MfgSettings.CAR_STARTUP_Z
                )
            );

            if ( this.game.checkpoints.isEnabled() )
            {
                this.game.failedStatusUpdate();
            }
        }

        public start()
        {
            MfgDebug.init.log( "start().." );

            // enable feature 'checkpoints' on!
            this.game.checkpoints.enableSprites();
            $( "#tdb_checkpoints" ).toggle();

            MfgKey.resetKeys();

            this.keydownHandler = MfgKey.onKeyDown;
            this.keyupHandler   = MfgKey.onKeyUp;

            this.registerBeforeRender = function()
            {
                if (MfgApp.singleton.mfgScene.scene.isReady())
                {
                    MfgApp.singleton.mfgScene.car.moves(MfgKey.forward, MfgKey.back, MfgKey.left, MfgKey.right, MfgKey.changeDir);
                    if ( 1 === MfgKey.changeDir )
                    {
                        MfgApp.singleton.hud.displayDirection( MfgApp.singleton.mfgScene.car.getDirection() );
                        MfgKey.changeDir = 0;
                    }
                    MfgApp.singleton.mfgScene.world.world.step( MfgApp.singleton.mfgScene.world.timeStep );
                    MfgApp.singleton.mfgScene.car.getAltitude() < 47 && MfgApp.singleton.resetCarPosition();
                    MfgApp.singleton.mfgScene.ground.updateShaders(
                        MfgApp.singleton.mfgScene.scene.activeCamera.position
                    );
                    MfgApp.singleton.mfgScene.car.update();
                    MfgApp.singleton.hud.updateTdB();
                    MfgApp.singleton.game.checkpoints.isEnabled() && MfgApp.singleton.game.updateTimer();
                }
            };

            this.mfgScene.camera = new MfgCamera( this.mfgScene.scene, this.mfgScene.car.b_bodyRoot );

            this.mfgScene.createPostProcessPipeline( this.engine );
            this.mfgScene.enablePostProcessPipeline();

            window.addEventListener(
                "resize",
                function()
                {
                    MfgApp.singleton.engine.resize()
                }
            );

            var newFrameTick = function()
            {
                MfgApp.singleton.hud.fpsMeter.tickStart();
                MfgApp.singleton.engine.beginFrame();
                MfgApp.singleton.mfgScene.scene.render();
                MfgApp.singleton.engine.endFrame();
                MfgApp.singleton.hud.fpsMeter.tick();

                BABYLON.Tools.QueueNewFrame( newFrameTick );
            };

            BABYLON.Tools.QueueNewFrame( newFrameTick );

            MfgPreloader.singleton.hidePreloader();

            this.startDriving();
        }
    }
