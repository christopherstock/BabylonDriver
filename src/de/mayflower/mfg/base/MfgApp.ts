
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

        /** The checkpoint system. */
        public                      checkpoints             :MfgCheckpoint                  = null;
        /** The car to control. */
        public                      car                     :MfgCar                         = null;
        /** The scene to render. */
        public                      mfgScene                :MfgScene                       = null;
        /** The cameras being used. */
        public                      camera                  :MfgCamera                      = null;
        /** The game logic. */
        public                      game                    :MfgGame                        = null;
        /** The HUD. */
        public                      hud                     :MfgHUD                         = null;

        /** The canvas where all drawing operations appear. */
        public                      canvas                  :HTMLCanvasElement              = null;

        /** The singleton instance of the Babylon.js engine. */
        public                      engine                  :BABYLON.Engine                 = null;




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
            if ( this.checkpoints.isEnabled() )
            {
                this.hud.checkpointsStatusUpdate();
                this.game.initTimer();
                this.game.initFailed();
            }

            this.activateCamera( this.camera.followCamera );

            this.car.setPosition(
                new CANNON.Vec3(
                    MfgSettings.CAR_STARTUP_X,
                    MfgSettings.CAR_STARTUP_Y,
                    MfgSettings.CAR_STARTUP_Z
                )
            );
            this.car.update();

            this.registerMoves();
        }

        public createScene()
        {
            MfgDebug.init.log( "Creating scene.." );

            this.mfgScene = new MfgScene( this.engine );

            MfgDebug.init.log( "Creating world.." );

            MfgWorld.singleton = new MfgWorld();

            MfgDebug.init.log( "Creating lights.." );

            this.mfgScene.createLights();
            this.mfgScene.createShadowGenerator();

            MfgDebug.init.log( "Creating ground.." );

            this.mfgScene.loadGround();
        }

        public onGroundLoaded()
        {
            MfgDebug.init.log( "onGroundLoaded.." );

            MfgApp.singleton.loadCar();
        }

        public loadCar()
        {
            MfgDebug.init.log( "loadCar.." );

            this.car = new MfgCar(
                MfgApp.singleton.mfgScene.scene,
                MfgWorld.singleton.world,
                "./res/ds3/caisse/",
                "DS3_caisse.babylon",
                "./res/ds3/roue/",
                "DS3_roue.babylon",
                MfgWorld.singleton.carBodyMaterial,
                MfgWorld.singleton.wheelMaterial,
                new CANNON.Vec3(1.31, .76, -.6),
                new CANNON.Vec3(1.31, -.7, -.6),
                new CANNON.Vec3(-1.13, .76, -.6),
                new CANNON.Vec3(-1.13, -.7, -.6),
                {
                    scaleFactor: .001,
                    invertX: !0,
                    bodyMass: 2e3,
                    bodyCollisionFilterGroup: MfgWorld.GROUP2,
                    bodyCollisionFilterMask:  MfgWorld.GROUP1,
                    shadowGenerator: MfgApp.singleton.mfgScene.shadowGenerator,
                    onLoadSuccess: MfgApp.singleton.onCarLoaded
                }
            );
            this.car.load()
        }

        public onCarLoaded()
        {
            MfgDebug.init.log( "onCarLoaded.." );

            MfgApp.singleton.loadCheckpoints()
        }

        public loadCheckpoints()
        {
            MfgDebug.init.log( "load checkpoints" );

            this.checkpoints = new MfgCheckpoint(
                MfgApp.singleton.mfgScene.scene,
                MfgApp.singleton.car.getCarMainMesh(),
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
            MfgApp.singleton.checkpoints.load()
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
            this.car.setPosition(
                new CANNON.Vec3(
                    MfgSettings.CAR_STARTUP_X,
                    MfgSettings.CAR_STARTUP_Y,
                    MfgSettings.CAR_STARTUP_Z
                )
            );

            if ( this.checkpoints.isEnabled() )
            {
                this.game.failedStatusUpdate();
            }
        }

        public start()
        {
            MfgDebug.init.log( "start().." );

            // enable feature 'checkpoints' on!
            this.checkpoints.enableSprites();
            $( "#tdb_checkpoints" ).toggle();

            MfgKey.resetKeys();

            this.keydownHandler = MfgKey.onKeyDown;
            this.keyupHandler   = MfgKey.onKeyUp;

            this.registerBeforeRender = function()
            {
                if (MfgApp.singleton.mfgScene.scene.isReady())
                {
                    MfgApp.singleton.car.moves(MfgKey.forward, MfgKey.back, MfgKey.left, MfgKey.right, MfgKey.changeDir);
                    if ( 1 === MfgKey.changeDir )
                    {
                        MfgApp.singleton.hud.displayDirection(MfgApp.singleton.car.getDirection());
                        MfgKey.changeDir = 0;
                    }
                    MfgWorld.singleton.world.step(MfgWorld.singleton.timeStep);
                    MfgApp.singleton.car.getAltitude() < 47 && MfgApp.singleton.resetCarPosition();
                    MfgApp.singleton.mfgScene.ground.updateShaders(
                        MfgApp.singleton.mfgScene.scene.activeCamera.position
                    );
                    MfgApp.singleton.car.update();
                    MfgApp.singleton.hud.updateTdB();
                    MfgApp.singleton.checkpoints.isEnabled() && MfgApp.singleton.game.updateTimer();
                }
            };

            this.camera = new MfgCamera( this.mfgScene.scene, this.car.b_bodyRoot );

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
