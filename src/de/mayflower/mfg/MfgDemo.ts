
    /************************************************************************************
    *   Represents the whole demo.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ************************************************************************************/
    class MfgDemo
    {
        public                      canvas                  :HTMLCanvasElement              = null;
        public                      message                 :HTMLDivElement                 = null;
        public                      engine                  :BABYLON.Engine                 = null;
        public                      checkpoints             :Chekpoints                     = null;
        public                      arcCamera               :any                            = null;
        public                      followCamera            :any                            = null;
        public                      ds3                     :Car                            = null;
        public                      failed                  :number                         = null;
        public                      timer                   :number                         = null;
        public                      scene                   :BABYLON.Scene                  = null;
        public                      shadowLight             :BABYLON.Light                  = null;
        public                      shadowGenerator         :BABYLON.ShadowGenerator        = null;



        /************************************************************************************
        *   Creates a new instance of the demo application.
        ************************************************************************************/
        public constructor()
        {
            "use strict";
            if ( BABYLON.Engine.isSupported() )
            {
                this.canvas  = <HTMLCanvasElement>document.getElementById("driverCanvas");
                this.message = <HTMLDivElement>document.getElementById("message");
                this.engine  = new BABYLON.Engine( this.canvas, !0 );

                this.initUI();
                this.createScene();
            }
        }

        public loadingMessage( e:string )
        {
            "use strict";
            $("#loadingMessage").text( e ) ;
        };

        public toggleLoadingMessage()
        {
            "use strict";
            $("#loading").toggle();
            $("#title").css("color", "#000000");
            $("#subtitle").css("color", "#000000");
        };

        public initUI()
        {
            "use strict";
            var e = this;
            $("#start_btn").click(
                function()
                {
                    e.startDriving();
                }
            );
        };

        public startDriving()
        {
            $("#title_bar").toggle();
            $("#tdb_back").toggle();
            $("#tdb").toggle();

            this.checkpoints.isEnabled() && ( this.checkpointsStatusUpdate(), this.initTimer(), this.initFailed() );
            this.activateCamera( this.followCamera );

            this.ds3.setPosition( new CANNON.Vec3( -19, -14, 60 ) );
            this.ds3.update();

            this.registerMoves();
        };

        public displayDirection(e)
        {
            "use strict";
            1 === e ? $("#direction").text("") : $("#direction").text("R")
        };

        public updateTdB()
        {
            "use strict";
            $("#speed span").text( Math.round( this.ds3.getSpeed() ).toString() )
        };

        public checkpointsStatusUpdate()
        {
            "use strict";
            $("#tdb #tdb_checkpoints #remaining span").text(this.checkpoints.getNbCheckPoints())
        };

        public failedStatusUpdate()
        {
            "use strict";
            this.failed += 1;
            $("#tdb #tdb_checkpoints #failed span").text( this.failed.toString() );
        };

        public initFailed()
        {
            "use strict";
            this.failed = 0
        };

        public initTimer()
        {
            "use strict";
            this.timer = Date.now()
        };

        public updateTimer()
        {
            "use strict";
            if (this.checkpoints.getNbCheckPoints() > 0) {
                var e = Date.now() - this.timer, t = Math.floor(e / 6e4), i = Math.floor((e - 6e4 * t) / 1e3), s = Math.floor((e - 6e4 * t - 1e3 * i) / 10), o = "", a = "", n = "";
                10 > t && (o = "0"), 10 > i && (a = "0"), 10 > s && (n = "0");
                $("#tdb #tdb_checkpoints #timer span").text(o + t + ":" + a + i + ":" + n + s)
            }
        };

        public createScene()
        {
            MfgWorld.physicsWorld = new MfgWorld();

            this.scene = new BABYLON.Scene(this.engine);
            this.scene.clearColor = new BABYLON.Color3(.8, .8, .8);
            this.createLights();
            this.createShadowGenerator( this.shadowLight );

            MfgSkyBox.skyBox = new MfgSkyBox( this.scene );

            this.loadGround();
        };

        public loadGround()
        {
            "use strict";
            var e = 50;
            this.ground = new Ground(this.scene, MfgWorld.physicsWorld.world, "./res/paris/", "paris_heightmap.babylon", "Ground", 6 * e, MfgWorld.physicsWorld.groundMaterial, {
                groundTexture: "./res/paris/plan.png",
                groundCollisionFilterGroup: MfgWorld.physicsWorld.GROUP1,
                groundCollisionFilterMask:  MfgWorld.physicsWorld.GROUP2,
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
                msgCallback: this.loadingMessage.bind(this),
                onLoadFinished: this.loadCar.bind(this)
            });
            this.ground.load()
        };

        public loadCar()
        {
            "use strict";
            this.ds3 = new Car(this.scene, MfgWorld.physicsWorld.world, "./res/ds3/caisse/", "DS3_caisse.babylon", "./res/ds3/roue/", "DS3_roue.babylon", MfgWorld.physicsWorld.carBodyMaterial, MfgWorld.physicsWorld.wheelMaterial, new CANNON.Vec3(1.31, .76, -.6), new CANNON.Vec3(1.31, -.7, -.6), new CANNON.Vec3(-1.13, .76, -.6), new CANNON.Vec3(-1.13, -.7, -.6), {
                scaleFactor: .001,
                invertX: !0,
                bodyMass: 2e3,
                bodyCollisionFilterGroup: MfgWorld.physicsWorld.GROUP2,
                bodyCollisionFilterMask:  MfgWorld.physicsWorld.GROUP1,
                shadowGenerator: this.shadowGenerator,
                msgCallback: this.loadingMessage.bind(this),
                onLoadSuccess: this.loadCheckpoints.bind(this)
            });
            this.ds3.load()
        };

        public loadCheckpoints()
        {
            "use strict";
            this.checkpoints = new Chekpoints(this.scene, this.ds3.getCarMainMesh(), this.ground, "./res/paris/", "paris_poi.babylon", "./res/image/misc/poi.png", 9, 512, {
                msgCallback: this.loadingMessage.bind(this),
                chekpointsCallback: this.checkpointsStatusUpdate.bind(this),
                onLoadFinished: this.start.bind(this)
            });
            this.checkpoints.load()
        };

        public createPostProcessPipeline()
        {
            "use strict";
            var e = new BABYLON.PostProcessRenderPipeline(this.engine, "standardPipeline"), t = this.engine, i = new BABYLON.PostProcessRenderEffect(this.engine, "fxaa", function() {
                return new BABYLON.FxaaPostProcess("antialias", 2, null, BABYLON.Texture.TRILINEAR_SAMPLINGMODE, t, !0)
            });
            e.addEffect(i);
            this.scene.postProcessRenderPipelineManager.addPipeline(e)
        };

        public disablePostProcessPipeline()
        {
            "use strict";
            this.scene.postProcessRenderPipelineManager.detachCamerasFromRenderPipeline("standardPipeline", this.arcCamera), this.scene.postProcessRenderPipelineManager.detachCamerasFromRenderPipeline("standardPipeline", this.followCamera)
        };

        public enablePostProcessPipeline()
        {
            "use strict";
            this.scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("standardPipeline", this.arcCamera), this.scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("standardPipeline", this.followCamera)
        };

        public createLights()
        {
            "use strict";
            var e, t, i;
            e = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(.2, -1, -.6), this.scene), e.position = new BABYLON.Vector3(-200, 1e3, 600), e.diffuse = new BABYLON.Color3(1, 1, 1), e.specular = new BABYLON.Color3(1, 1, 1), e.intensity = .7, t = BABYLON.Mesh.CreateSphere("sphere", 10, 20, this.scene), t.position = e.position, t.position.scaleInPlace(.5), t.material = new BABYLON.StandardMaterial("light", this.scene), t.material.emissiveColor = new BABYLON.Color3(1, 1, 0), i = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, -1, 0), this.scene), i.diffuse = new BABYLON.Color3(1, 1, 1), i.specular = new BABYLON.Color3(.5, .5, .4), i.groundColor = new BABYLON.Color3(1, 1, 1), i.intensity = .8, this.shadowLight = e
        };

        public createShadowGenerator(e)
        {
            "use strict";
            this.shadowGenerator = new BABYLON.ShadowGenerator(4096, e), this.shadowGenerator.useVarianceShadowMap = !0, this.shadowGenerator.usePoissonSampling = !0, this.shadowGenerator.setTransparencyShadow(!0), this.shadowGenerator.bias = 1e-5
        };

        public disableShadows()
        {
            "use strict";
            null !== this.shadowGenerator && (this.shadowRenderList = this.shadowGenerator.getShadowMap().renderList, this.shadowGenerator.getShadowMap().renderList = [])
        };

        public enableShadows()
        {
            "use strict";
            null !== this.shadowRenderList && (this.shadowGenerator.getShadowMap().renderList = this.shadowRenderList, this.scene.shadowsEnabled = !0)
        };

        public createTestCamera()
        {
            "use strict";
            var e, t, i;
            return e = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(5, 5, 55), this.scene), e.setTarget(BABYLON.Vector3.Zero()), t = this.scene, i = this.ground, this.scene.registerBeforeRender(function() {
                t.isReady() && i.updateShaders(t.activeCamera.position)
            }), e
        };

        public createArcCamera()
        {
            "use strict";
            var e, t, i;
            return e = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0, 0, 0, new BABYLON.Vector3(0, 10, 0), this.scene), e.setPosition(new BABYLON.Vector3(200, 150, 200)), e.lowerAlphaLimit = e.upperAlphaLimit = 0, e.lowerBetaLimit = 2, e.upperBetaLimit = 1, e.lowerRadiusLimit = e.upperRadiusLimit = e.radius, t = this.scene, i = this.ground, this.scene.registerBeforeRender(function() {
                t.isReady() && (i.updateShaders(t.activeCamera.position), t.activeCamera.alpha += .002)
            }), e.viewport = new BABYLON.Viewport(0, 0, 1, 1), e
        };

        public activateCamera( e )
        {
            "use strict";
            this.scene.activeCamera = e;
            e.attachControl(this.canvas, !1);
        };

        public registerMoves()
        {
            "use strict";
            window.addEventListener(
                "keydown",
                this.keydownHandler
            );

            window.addEventListener(
                "keyup",
                this.keyupHandler
            );

            this.scene.registerBeforeRender(
                this.registerBeforeRender
            );
        };

        public resetCarPosition()
        {
            "use strict";
            this.ds3.setPosition(new CANNON.Vec3(-19, -14, 60));
            this.checkpoints.isEnabled() && this.failedStatusUpdate();
        };

        public hideCar()
        {
            "use strict";
            this.ds3.setPosition(new CANNON.Vec3(0, 0, 0));
            this.ds3.update();
        };

        public leaveGame()
        {
            "use strict";
            this.scene.unregisterBeforeRender(this.registerBeforeRender), window.removeEventListener("keydown", this.keydownHandler), window.removeEventListener("keyup", this.keyupHandler), $("#title_bar").toggle(), $("#tdb_back").toggle(), $("#tdb").toggle(), this.activateCamera(this.arcCamera), this.hideCar(), this.checkpoints.isEnabled() && (this.checkpoints.resetSprites(), this.checkpoints.enableSprites())
        };

        public start()
        {
            // set feature 'checkpoints' on!
            this.checkpoints.enableSprites();
            $("#tdb #tdb_checkpoints").toggle();

            var e, t, i, s, o, a, n, r, d;

            e = {left: 0, right: 0, forward: 0, back: 0, changeDir: 0};
            t = this;

            this.keydownHandler = function(i)
            {
                37 === i.keyCode && (e.left = 1), 38 === i.keyCode && (e.forward = 1), 39 === i.keyCode && (e.right = 1), 40 === i.keyCode && (e.back = 1), 16 === i.keyCode && (e.changeDir = 1), 27 === i.keyCode && t.leaveGame(), 32 === i.keyCode && t.ds3.getSpeed() < 2 && t.resetCarPosition()
            };

            this.keyupHandler = function(t)
            {
                37 === t.keyCode && (e.left = 0), 38 === t.keyCode && (e.forward = 0), 39 === t.keyCode && (e.right = 0), 40 === t.keyCode && (e.back = 0)
            };

            i = this.ds3;
            s = this.scene;
            a = this.ground;

            this.registerBeforeRender = function()
            {
                s.isReady() && (i.moves(e.forward, e.back, e.left, e.right, e.changeDir), 1 === e.changeDir && (t.displayDirection(i.getDirection()), e.changeDir = 0), MfgWorld.physicsWorld.world.step(MfgWorld.physicsWorld.timeStep), i.getAltitude() < 47 && t.resetCarPosition(), a.updateShaders(s.activeCamera.position), i.update(), t.updateTdB(), t.checkpoints.isEnabled() && t.updateTimer())
            };

            this.createPostProcessPipeline();

            this.enablePostProcessPipeline();

            n = new FPSMeter(
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

            r = this.engine;

            window.addEventListener(
                "resize",
                function()
                {
                    r.resize()
                }
            );

            d = function()
            {
                n.tickStart();
                r.beginFrame();
                s.render();
                r.endFrame();
                n.tick();

                BABYLON.Tools.QueueNewFrame( d )
            };

            BABYLON.Tools.QueueNewFrame(d);

            this.arcCamera = this.createArcCamera();
            this.followCamera = this.ds3.createFollowCamera();

            this.activateCamera(this.arcCamera);
            this.toggleLoadingMessage();

            $("#menus").toggle();

            this.startDriving();
        };
    }
