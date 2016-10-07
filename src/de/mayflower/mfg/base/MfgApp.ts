
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
        public                      game                    :MfgGame                        = null;
        /** The HUD. */
        public                      hud                     :MfgHUD                         = null;
        /** The user interface. */
        public                      ui                      :MfgUI                          = null;

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

            //create UI
            this.ui = new MfgUI();
            this.ui.initMenuUI();
        }

        /************************************************************************************
        *   Creates the 3D scene.
        ************************************************************************************/
        public createScene()
        {
            MfgDebug.init.log( "Creating scene.." );
            this.mfgScene = new MfgScene( this.engine );

            MfgDebug.init.log( "Creating lights.." );
            this.mfgScene.createLights();

            MfgDebug.init.log( "Creating shadows.." );
            this.mfgScene.createShadowGenerator();

            MfgDebug.init.log( "Creating ground.." );

            if ( MfgSetting.FEATURE_3D_GROUND )
            {
                this.mfgScene.loadGround();
            }
            else
            {
                this.onGroundLoaded();
            }
        }

        public onGroundLoaded=()=>
        {
            MfgDebug.init.log( "onGroundLoaded.." );

            this.mfgScene.loadCar();
        };

        public onCarLoaded=()=>
        {
            MfgDebug.init.log( "onCarLoaded.." );

            if ( MfgSetting.FEATURE_CHECKPOINTS )
            {
                this.loadCheckpoints()
            }
            else
            {
                this.onCheckpointsLoaded();
            }
        };

        public loadCheckpoints()
        {
            MfgDebug.init.log( "load checkpoints" );

            this.game.checkpoints = new MfgCheckpoint(
                this.mfgScene.scene,
                this.mfgScene.car.getCarMainMesh(),
                this.mfgScene.ground,
                "./res/paris/",
                "paris_poi.babylon",
                "./res/image/misc/poi.png",
                9,
                512,
                {
                    checkpointsCallback: this.hud.checkpointsStatusUpdate.bind( this ),
                    onLoadFinished:      this.onCheckpointsLoaded
                }
            );
            this.game.checkpoints.load()
        }

        public onCheckpointsLoaded=()=>
        {
            MfgDebug.init.log( "onCheckpointsLoaded.." );

            this.start();
        };

        /************************************************************************************
        *   Starts the driving simulation process.
        ************************************************************************************/
        public startDriving()
        {
            if ( MfgSetting.FEATURE_CHECKPOINTS )
            {
                if ( this.game.checkpoints.isEnabled() )
                {
                    this.hud.checkpointsStatusUpdate();
                    this.game.initTimer();
                    this.game.initFailed();
                }
            }

            this.activateCamera( this.mfgScene.camera.followCamera );

            this.mfgScene.car.setPosition(
                new CANNON.Vec3(
                    MfgSetting.CAR_STARTUP_X,
                    MfgSetting.CAR_STARTUP_Y,
                    MfgSetting.CAR_STARTUP_Z
                )
            );
            this.mfgScene.car.update();

            this.registerMoves();
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
                this.tick
            );
        }

        public resetCarPosition()
        {
            this.mfgScene.car.setPosition(
                new CANNON.Vec3(
                    MfgSetting.CAR_STARTUP_X,
                    MfgSetting.CAR_STARTUP_Y,
                    MfgSetting.CAR_STARTUP_Z
                )
            );

            if ( MfgSetting.FEATURE_CHECKPOINTS )
            {
                if ( this.game.checkpoints.isEnabled() )
                {
                    this.game.failedStatusUpdate();
                }
            }
        }

        public start()
        {
            MfgDebug.init.log( "start() app .." );

            if ( MfgSetting.FEATURE_CHECKPOINTS )
            {
                //enable feature 'checkpoints'
                this.game.checkpoints.enableSprites();
                $( "#tdb_checkpoints" ).toggle();
            }

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
                MfgInit.app.hud.fpsMeter.tickStart();
                MfgInit.app.engine.beginFrame();
                MfgInit.app.mfgScene.scene.render();
                MfgInit.app.engine.endFrame();
                MfgInit.app.hud.fpsMeter.tick();

                BABYLON.Tools.QueueNewFrame( newFrameTick );
            };

            BABYLON.Tools.QueueNewFrame( newFrameTick );

            MfgInit.preloader.hidePreloader();

            this.startDriving();
        }

        public tick=()=>
        {
            if (MfgInit.app.mfgScene.scene.isReady())
            {
                MfgInit.app.mfgScene.car.moves(MfgKey.forward, MfgKey.back, MfgKey.left, MfgKey.right, MfgKey.changeDir);
                if ( 1 === MfgKey.changeDir )
                {
                    MfgInit.app.hud.displayDirection( MfgInit.app.mfgScene.car.getDirection() );
                    MfgKey.changeDir = 0;
                }
                MfgInit.app.mfgScene.world.world.step( MfgInit.app.mfgScene.world.timeStep );
                MfgInit.app.mfgScene.car.getAltitude() < 47 && MfgInit.app.resetCarPosition();

                if ( MfgSetting.FEATURE_3D_GROUND )
                {
                    MfgInit.app.mfgScene.ground.updateShaders(
                        MfgInit.app.mfgScene.scene.activeCamera.position
                    );
                }

                MfgInit.app.mfgScene.car.update();
                MfgInit.app.hud.updateTdB();

                if ( MfgSetting.FEATURE_CHECKPOINTS )
                {
                    MfgInit.app.game.checkpoints.isEnabled() && MfgInit.app.game.updateTimer();
                }
            }
        };
    }
