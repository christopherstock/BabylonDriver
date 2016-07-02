
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

        /** The canvas where all drawing operations appear. */
        public                      canvas                  :HTMLCanvasElement              = null;

        /** The singleton instance of the Babylon.js engine. */
        public                      engine                  :BABYLON.Engine                 = null;
        /** The shadow light. */
        public                      shadowLight             :BABYLON.Light                  = null;
        /** The shadow generator. */
        public                      shadowGenerator         :BABYLON.ShadowGenerator        = null;
        /** All meshes to be rendered by the shadow generator. */
        public                      shadowRenderList        :BABYLON.AbstractMesh[]         = null;
        /** The arc rotating camera. */
        public                      arcCamera               :BABYLON.ArcRotateCamera        = null;
        /** The car follow camera. */
        public                      followCamera            :BABYLON.FollowCamera           = null;
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
        }

        public startDriving()
        {
            $("#title_bar").toggle();
            $("#tdb_back").toggle();
            $("#tdb").toggle();

            this.checkpoints.isEnabled() && ( this.checkpointsStatusUpdate(), this.initTimer(), this.initFailed() );
            this.activateCamera( this.followCamera );

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

        public displayDirection(e)
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

            this.createLights();
            this.createShadowGenerator( this.shadowLight );
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
                    shadowGenerator: this.shadowGenerator,
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
                    shadowGenerator: this.shadowGenerator,
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

        public createPostProcessPipeline()
        {
            var e = new BABYLON.PostProcessRenderPipeline(this.engine, "standardPipeline"), t = this.engine, i = new BABYLON.PostProcessRenderEffect(this.engine, "fxaa", function() {
                return new BABYLON.FxaaPostProcess("antialias", 2, null, BABYLON.Texture.TRILINEAR_SAMPLINGMODE, t, !0)
            });
            e.addEffect(i);
            this.mfgScene.scene.postProcessRenderPipelineManager.addPipeline(e)
        }

        public disablePostProcessPipeline()
        {
            this.mfgScene.scene.postProcessRenderPipelineManager.detachCamerasFromRenderPipeline("standardPipeline", this.arcCamera), this.mfgScene.scene.postProcessRenderPipelineManager.detachCamerasFromRenderPipeline("standardPipeline", this.followCamera)
        }

        public enablePostProcessPipeline()
        {
            this.mfgScene.scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("standardPipeline", this.arcCamera), this.mfgScene.scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("standardPipeline", this.followCamera)
        }

        public createLights()
        {
            var e, t, i;
            e = new BABYLON.DirectionalLight(
                "dir01",
                new BABYLON.Vector3( .2, -1, -.6 ),
                this.mfgScene.scene
            );
            e.position = new BABYLON.Vector3(-200, 1e3, 600);
            e.diffuse  = new BABYLON.Color3(1, 1, 1);
            e.specular = new BABYLON.Color3(1, 1, 1);
            e.intensity = .7;
            t = BABYLON.Mesh.CreateSphere("sphere", 10, 20, this.mfgScene.scene);
            t.position = e.position;
            t.position.scaleInPlace( .5 );
            t.material = new BABYLON.StandardMaterial("light", this.mfgScene.scene);
            t.material.emissiveColor = new BABYLON.Color3(1, 1, 0);
            i = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, -1, 0), this.mfgScene.scene);
            i.diffuse = new BABYLON.Color3(1, 1, 1);
            i.specular = new BABYLON.Color3(.5, .5, .4);
            i.groundColor = new BABYLON.Color3(1, 1, 1);
            i.intensity = .8;
            this.shadowLight = e;
        }

        public createShadowGenerator(e)
        {
            this.shadowGenerator = new BABYLON.ShadowGenerator(4096, e), this.shadowGenerator.useVarianceShadowMap = !0, this.shadowGenerator.usePoissonSampling = !0, this.shadowGenerator.setTransparencyShadow(!0), this.shadowGenerator.bias = 1e-5
        }

        public disableShadows()
        {
            null !== this.shadowGenerator && (this.shadowRenderList = this.shadowGenerator.getShadowMap().renderList, this.shadowGenerator.getShadowMap().renderList = [])
        }

        public enableShadows()
        {
            null !== this.shadowRenderList && (this.shadowGenerator.getShadowMap().renderList = this.shadowRenderList, this.mfgScene.scene.shadowsEnabled = !0)
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

        public createArcCamera() : BABYLON.ArcRotateCamera
        {
            var e, t, i;
            e = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0, 0, 0, new BABYLON.Vector3(0, 10, 0), this.mfgScene.scene);
            e.setPosition(new BABYLON.Vector3(200, 150, 200));
            e.lowerAlphaLimit = e.upperAlphaLimit = 0;
            e.lowerBetaLimit = 2;
            e.upperBetaLimit = 1;
            e.lowerRadiusLimit = e.upperRadiusLimit = e.radius;
            t = this.mfgScene.scene;
            i = MfgApp.singleton.ground;
            this.mfgScene.scene.registerBeforeRender(
                function() {
                    if (t.isReady())
                    {
                        i.updateShaders(t.activeCamera.position);
                        t.activeCamera.alpha += .002;
                    }
                }
            );
            e.viewport = new BABYLON.Viewport(0, 0, 1, 1);

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

        public hideCar()
        {
            this.car.setPosition(
                new CANNON.Vec3(
                    0,
                    0,
                    0
                )
            );
            this.car.update();
        }

        public leaveGame()
        {
            this.mfgScene.scene.unregisterBeforeRender(this.registerBeforeRender);
            window.removeEventListener("keydown", this.keydownHandler);
            window.removeEventListener("keyup", this.keyupHandler);
            $("#title_bar").toggle();
            $("#tdb_back").toggle();
            $("#tdb").toggle();
            this.activateCamera(this.arcCamera);
            this.hideCar();
            if (this.checkpoints.isEnabled())
            {
                this.checkpoints.resetSprites();
                this.checkpoints.enableSprites();
            }
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

            this.createPostProcessPipeline();

            this.enablePostProcessPipeline();

            this.fpsMeter = new FPSMeter(
                null,
                {
                    graph: 1,
                    decimals: 0,
                    position: "absolute",
                    zIndex: 10,
                    right: "5px",
                    top: "auto",
                    left: "auto",
                    bottom: "5px",
                    margin: "0 0 0 0"
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

                BABYLON.Tools.QueueNewFrame( newFrameTick )
            };

            BABYLON.Tools.QueueNewFrame(newFrameTick);

            this.arcCamera = this.createArcCamera();
            this.followCamera = this.car.createFollowCamera();

            this.activateCamera(this.arcCamera);
            MfgPreloader.singleton.hidePreloader();

            $("#menus").toggle();

            this.startDriving();
        }
    }
