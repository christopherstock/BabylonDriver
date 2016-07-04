
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
        /** The ground to render. */
        public                      ground                  :MfgGround                      = null;
        /** The cameras being used. */
        public                      camera                  :MfgCamera                      = null;
        /** The game logic. */
        public                      game                    :MfgGame                        = null;

        /** The canvas where all drawing operations appear. */
        public                      canvas                  :HTMLCanvasElement              = null;

        /** The singleton instance of the Babylon.js engine. */
        public                      engine                  :BABYLON.Engine                 = null;

        /** The FramesPerSecond meter. */
        public                      fpsMeter                :FPSMeter                       = null;

        /** Number of failed checkpoints. */
        public                      failed                  :number                         = null;
        /** The current timer. */
        public                      timer                   :number                         = null;

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
            this.canvas = <HTMLCanvasElement>document.getElementById("driverCanvas");
            this.engine = new BABYLON.Engine( this.canvas, !0 );

            //create game
            this.game = new MfgGame();



        }

        /************************************************************************************
        *   Starts the driving simulation process.
        ************************************************************************************/
        public startDriving()
        {
            this.checkpoints.isEnabled() && ( this.checkpointsStatusUpdate(), this.initTimer(), this.initFailed() );
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
            $("#speed_span").text( Math.round( this.car.getSpeed() ).toString() )
        }

        public checkpointsStatusUpdate()
        {
            $("#remaining_span").text( this.checkpoints.getNbCheckPoints() )
        }

        public failedStatusUpdate()
        {
            this.failed += 1;
            $("#failed_span").text( this.failed.toString() );
        }

        public initFailed()
        {
            this.failed = 0
        }

        public initTimer()
        {
            this.timer = Date.now()
        }

        public updateTimer()
        {
            if (this.checkpoints.getNbCheckPoints() > 0) {
                var e = Date.now() - this.timer, t = Math.floor(e / 6e4), i = Math.floor((e - 6e4 * t) / 1e3), s = Math.floor((e - 6e4 * t - 1e3 * i) / 10), o = "", a = "", n = "";
                10 > t && (o = "0"), 10 > i && (a = "0"), 10 > s && (n = "0");
                $("#timer_span").text(o + t + ":" + a + i + ":" + n + s)
            }
        }





        public createScene()
        {
            this.mfgScene = new MfgScene( this.engine );

            MfgWorld.singleton = new MfgWorld();

            this.mfgScene.createLights();
            this.mfgScene.createShadowGenerator();
            this.loadGround();
        }

        public loadGround()
        {
            var e = 50;
            this.ground = new MfgGround(
                this.mfgScene.scene,
                MfgWorld.singleton.world,
                "./res/paris/",
                "paris_heightmap.babylon",
                "Ground",
                6 * e,
                MfgWorld.singleton.groundMaterial,
                {
                    groundTexture: "./res/paris/plan.png",
                    groundCollisionFilterGroup: MfgWorld.GROUP1,
                    groundCollisionFilterMask:  MfgWorld.GROUP2,
                    scaleFactor: e,
                    buildingBaseHeight: e,
                    solidBuildingsPath: "./res/paris/",
                    solidBuildingsName: "paris_solid_buildings.babylon",
                    buildingsPath: "./res/paris/",
                    buildingsName: "paris_3D_buildings.babylon",
                    treesPath: "./res/paris/",
                    treesName: "paris_trees.babylon",
                    particlesPath: "./res/paris/",
                    particlesName: "paris_particles.babylon",
                    buildingCelShading: !0,
                    outlineShaderDeltaHeight: .15 * (e / 50),
                    shadowGenerator: this.mfgScene.shadowGenerator,
                    onLoadFinished: this.loadCar.bind(this)
                }
            );
            this.ground.load()
        }

        public loadCar()
        {
            this.car = new MfgCar(
                this.mfgScene.scene,
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
                    shadowGenerator: this.mfgScene.shadowGenerator,
                    onLoadSuccess: this.loadCheckpoints.bind(this)
                }
            );
            this.car.load()
        }

        public loadCheckpoints()
        {
            this.checkpoints = new MfgCheckpoint(
                this.mfgScene.scene,
                this.car.getCarMainMesh(),
                this.ground,
                "./res/paris/",
                "paris_poi.babylon",
                "./res/image/misc/poi.png",
                9,
                512,
                {
                    chekpointsCallback: this.checkpointsStatusUpdate.bind(this),
                    onLoadFinished: this.start.bind(this)
                }
            );
            this.checkpoints.load()
        }

        public createTestCamera()
        {
            var e, t, i;
            e = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(5, 5, 55), this.mfgScene.scene);
            e.setTarget(BABYLON.Vector3.Zero());
            t = this.mfgScene.scene;
            i = MfgApp.singleton.ground;
            this.mfgScene.scene.registerBeforeRender(
                function()
                {
                    t.isReady() && i.updateShaders(t.activeCamera.position)
                }
            );
            return e;
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
            this.checkpoints.isEnabled() && this.failedStatusUpdate();
        }

        public start()
        {
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
                        MfgApp.singleton.displayDirection(MfgApp.singleton.car.getDirection());
                        MfgKey.changeDir = 0;
                    }
                    MfgWorld.singleton.world.step(MfgWorld.singleton.timeStep);
                    MfgApp.singleton.car.getAltitude() < 47 && MfgApp.singleton.resetCarPosition();
                    MfgApp.singleton.ground.updateShaders(
                        MfgApp.singleton.mfgScene.scene.activeCamera.position
                    );
                    MfgApp.singleton.car.update();
                    MfgApp.singleton.updateTdB();
                    MfgApp.singleton.checkpoints.isEnabled() && MfgApp.singleton.updateTimer();
                }
            };

            this.camera = new MfgCamera( this.mfgScene.scene, this.car.b_bodyRoot );

            this.mfgScene.createPostProcessPipeline( this.engine );

            this.mfgScene.enablePostProcessPipeline();

            this.fpsMeter = new FPSMeter(
                null,
                {
                    graph:    1,
                    decimals: 2,
                    position: "absolute",
                    zIndex:   10,
                    right:    "5px",
                    top:      "auto",
                    left:     "auto",
                    bottom:   "5px",
                    margin:   "0"
                }
            );

            window.addEventListener(
                "resize",
                function()
                {
                    MfgApp.singleton.engine.resize()
                }
            );

            var newFrameTick = function()
            {
                MfgApp.singleton.fpsMeter.tickStart();
                MfgApp.singleton.engine.beginFrame();
                MfgApp.singleton.mfgScene.scene.render();
                MfgApp.singleton.engine.endFrame();
                MfgApp.singleton.fpsMeter.tick();

                BABYLON.Tools.QueueNewFrame( newFrameTick );
            };

            BABYLON.Tools.QueueNewFrame( newFrameTick );

            MfgPreloader.singleton.hidePreloader();

            this.startDriving();
        }
    }
