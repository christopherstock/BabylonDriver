
    /************************************************************************************
    *   Represents the whole application.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ************************************************************************************/
    class MfgApp
    {
        /** The scene to render. */
        public                      mfgScene                :MfgScene                       = null;

        /** The canvas where all drawing operations appear. */
        private                     canvas                  :HTMLCanvasElement              = null;
        /** The Babylon.js engine. */
        private                     engine                  :BABYLON.Engine                 = null;
        /** The game logic. */
        private                     game                    :MfgGame                        = null;
        /** The HUD. */
        private                     hud                     :MfgHUD                         = null;
        /** The user interface. */
        private                     ui                      :MfgUI                          = null;

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
                MfgGroundSimple.init();
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

        private loadCheckpoints()
        {
            MfgDebug.init.log( "load checkpoints" );

            this.game.checkpoints = new MfgCheckpoint(
                this.mfgScene.scene,
                this.mfgScene.car.getCarMainMesh(),
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

        private onCheckpointsLoaded=()=>
        {
            MfgDebug.init.log( "onCheckpointsLoaded.." );

            this.start();
        };

        /************************************************************************************
        *   Starts the driving simulation process.
        ************************************************************************************/
        private startDriving()
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

            MfgKey.init();

            this.mfgScene.scene.registerBeforeRender(
                this.tick
            );
        }

        private activateCamera( e )
        {
            this.mfgScene.scene.activeCamera = e;
            e.attachControl(this.canvas, !1);
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

        private start()
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

        private tick=()=>
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

                if ( MfgInit.app.mfgScene.car.getAltitude() < MfgSetting.CAR_ALTITUDE_RESET )
                {
                    MfgInit.app.resetCarPosition();
                }

                if ( MfgSetting.FEATURE_3D_GROUND )
                {
                    MfgInit.app.mfgScene.ground3D.updateShaders(
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
