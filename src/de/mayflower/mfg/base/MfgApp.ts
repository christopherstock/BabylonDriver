
    /************************************************************************************
    *   Represents the whole application.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ************************************************************************************/
    class MfgApp
    {
        /** The canvas where all drawing operations appear. */
        public                      canvas                  :HTMLCanvasElement              = null;
        /** The Babylon.js engine. */
        public                      engine                  :BABYLON.Engine                 = null;

        /** The scene to render. */
        public                      mfgScene                :MfgScene                       = null;
        /** The game logic. */
        public                      mfgGame                 :MfgGame                        = null;
        /** The HUD. */
        public                      mfgHud                  :MfgHUD                         = null;
        /** The user interface. */
        public                      mfgUi                   :MfgUI                          = null;

        /************************************************************************************
        *   Instanciates the demo application.
        ************************************************************************************/
        public constructor()
        {
            MfgDebug.init.log( "MfgApp constructor passed" );

            this.canvas = <HTMLCanvasElement>document.getElementById("driverCanvas");
            this.engine = new BABYLON.Engine( this.canvas, !0 );

            //create game
            this.mfgGame = new MfgGame();

            //create HUD
            this.mfgHud = new MfgHUD();

            //create UI
            this.mfgUi = new MfgUI();
            this.mfgUi.initMenuUI();
        }

        /************************************************************************************
        *   Creates the 3D scene.
        ************************************************************************************/
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

        /************************************************************************************
        *   Starts the driving simulation process.
        ************************************************************************************/
        public startDriving()
        {
            if ( this.mfgGame.checkpoints.isEnabled() )
            {
                this.mfgHud.checkpointsStatusUpdate();
                this.mfgGame.initTimer();
                this.mfgGame.initFailed();
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

        public onGroundLoaded()
        {
            MfgDebug.init.log( "onGroundLoaded.." );

            MfgInit.app.mfgScene.loadCar();
        }

        public onCarLoaded()
        {
            MfgDebug.init.log( "onCarLoaded.." );

            MfgInit.app.loadCheckpoints()
        }

        public loadCheckpoints()
        {
            MfgDebug.init.log( "load checkpoints" );

            this.mfgGame.checkpoints = new MfgCheckpoint(
                MfgInit.app.mfgScene.scene,
                MfgInit.app.mfgScene.car.getCarMainMesh(),
                MfgInit.app.mfgScene.ground,
                "./res/paris/",
                "paris_poi.babylon",
                "./res/image/misc/poi.png",
                9,
                512,
                {
                    checkpointsCallback: MfgInit.app.mfgHud.checkpointsStatusUpdate.bind( this ),
                    onLoadFinished:     MfgInit.app.onCheckpointsLoaded
                }
            );
            MfgInit.app.mfgGame.checkpoints.load()
        }

        public onCheckpointsLoaded()
        {
            MfgDebug.init.log( "onCheckpointsLoaded.." );

            MfgInit.app.start();
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
                MfgKey.onKeyDown
            );

            window.addEventListener(
                "keyup",
                MfgKey.onKeyUp
            );

            this.mfgScene.scene.registerBeforeRender(
                MfgInit.app.tick
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

            if ( this.mfgGame.checkpoints.isEnabled() )
            {
                this.mfgGame.failedStatusUpdate();
            }
        }

        public start()
        {
            MfgDebug.init.log( "start().." );

            // enable feature 'checkpoints' on!
            this.mfgGame.checkpoints.enableSprites();
            $( "#tdb_checkpoints" ).toggle();

            MfgKey.resetKeys();

            this.mfgScene.camera = new MfgCamera( this.mfgScene.scene, this.mfgScene.car.b_bodyRoot );

            this.mfgScene.createPostProcessPipeline( this.engine );
            this.mfgScene.enablePostProcessPipeline();

            window.addEventListener(
                "resize",
                function()
                {
                    MfgInit.app.engine.resize()
                }
            );

            var newFrameTick = function()
            {
                MfgInit.app.mfgHud.fpsMeter.tickStart();
                MfgInit.app.engine.beginFrame();
                MfgInit.app.mfgScene.scene.render();
                MfgInit.app.engine.endFrame();
                MfgInit.app.mfgHud.fpsMeter.tick();

                BABYLON.Tools.QueueNewFrame( newFrameTick );
            };

            BABYLON.Tools.QueueNewFrame( newFrameTick );

            MfgInit.preloader.hidePreloader();

            this.startDriving();
        }

        public tick() : void
        {
            if (MfgInit.app.mfgScene.scene.isReady())
            {
                MfgInit.app.mfgScene.car.moves(MfgKey.forward, MfgKey.back, MfgKey.left, MfgKey.right, MfgKey.changeDir);
                if ( 1 === MfgKey.changeDir )
                {
                    MfgInit.app.mfgHud.displayDirection( MfgInit.app.mfgScene.car.getDirection() );
                    MfgKey.changeDir = 0;
                }
                MfgInit.app.mfgScene.world.world.step( MfgInit.app.mfgScene.world.timeStep );
                MfgInit.app.mfgScene.car.getAltitude() < 47 && MfgInit.app.resetCarPosition();
                MfgInit.app.mfgScene.ground.updateShaders(
                    MfgInit.app.mfgScene.scene.activeCamera.position
                );
                MfgInit.app.mfgScene.car.update();
                MfgInit.app.mfgHud.updateTdB();
                MfgInit.app.mfgGame.checkpoints.isEnabled() && MfgInit.app.mfgGame.updateTimer();
            }
        };
    }
