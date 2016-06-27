function PhysicsWorld() {
    "use strict";
    this.world = new CANNON.World, this.world.solver.iterations = 10, this.world.gravity.set(0, 0, -9.82), this.world.broadphase = new CANNON.NaiveBroadphase, this.worldstep = 2, this.timeStep = 1 / 60, this.GROUP1 = 1, this.GROUP2 = 2, this.groundMaterial = new CANNON.Material("groundMaterial"), this.carBodyMaterial = new CANNON.Material("carBodyMaterial"), this.bodyGroundContactMaterial = new CANNON.ContactMaterial(this.groundMaterial, this.carBodyMaterial, {
        friction: .01,
        restitution: 0
    }), this.world.addContactMaterial(this.bodyGroundContactMaterial)
}
function Demo() {
    "use strict";
    BABYLON.Engine.isSupported() && (this.canvas = document.getElementById("renderCanvas"), this.message = document.getElementById("message"), this.engine = new BABYLON.Engine(this.canvas, !0), this.initUI(), this.createScene())
}
var skybox = function (e) {
    "use strict";
    var t = BABYLON.Mesh.CreateBox("skyBox", 1e3, e), i = new BABYLON.StandardMaterial("skyBox", e);
    i.backFaceCulling = !1, i.reflectionTexture = new BABYLON.CubeTexture("skybox/skybox", e), i.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE, i.diffuseColor = new BABYLON.Color3(0, 0, 0), i.specularColor = new BABYLON.Color3(0, 0, 0), t.material = i
};
Demo.prototype.loadingMessage = function (e) {
    "use strict";
    $("#loading #message").text(e)
}, Demo.prototype.toggleLoadingMessage = function () {
    "use strict";
    $("#loading").toggle(), $("#title").css("color", "#000000"), $("#subtitle").css("color", "#000000")
}, Demo.prototype.initUI = function () {
    "use strict";
    var e = this;
    $("#start_btn").click(function () {
        $("#title_bar").toggle(), $("#tdb_back").toggle(), $("#tdb").toggle(), e.checkpoints.isEnabled() && (e.checkpointsStatusUpdate(), e.initTimer(), e.initFailed()), e.activateCamera(e.followCamera), e.ds3.setPosition(new CANNON.Vec3(-19, -14, 60)), e.ds3.update(), e.registerMoves()
    }), $("#options input").iCheck({
        handle: "checkbox",
        checkboxClass: "icheckbox_flat-blue"
    }), $('#options input[name="shadows"]').iCheck("check"), $('#options input[name="antialias"]').iCheck("uncheck"), $('#options input[name="shadows"]').on("ifChecked", function (t) {
        e.enableShadows()
    }), $('#options input[name="shadows"]').on("ifUnchecked", function (t) {
        e.disableShadows()
    }), $('#options input[name="antialias"]').on("ifChecked", function (t) {
        e.enablePostProcessPipeline()
    }), $('#options input[name="antialias"]').on("ifUnchecked", function (t) {
        e.disablePostProcessPipeline()
    }), $("#game_options input").iCheck({
        handle: "radio",
        radioClass: "iradio_flat-blue"
    }), $('#game_options input[value="checkpoints"]').on("ifChecked", function (t) {
        e.checkpoints.enableSprites(), $("#tdb #tdb_checkpoints").toggle()
    }), $('#game_options input[value="free_ride"]').on("ifChecked", function (t) {
        e.checkpoints.disableSprites(), $("#tdb #tdb_checkpoints").toggle()
    })
}, Demo.prototype.displayDirection = function (e) {
    "use strict";
    1 === e ? $("#direction").text("") : $("#direction").text("R")
}, Demo.prototype.updateTdB = function () {
    "use strict";
    $("#speed span").text(Math.round(this.ds3.getSpeed()))
}, Demo.prototype.checkpointsStatusUpdate = function () {
    "use strict";
    $("#tdb #tdb_checkpoints #remaining span").text(this.checkpoints.getNbCheckPoints())
}, Demo.prototype.failedStatusUpdate = function () {
    "use strict";
    this.failed += 1, $("#tdb #tdb_checkpoints #failed span").text(this.failed)
}, Demo.prototype.initFailed = function () {
    "use strict";
    this.failed = 0
}, Demo.prototype.initTimer = function () {
    "use strict";
    this.timer = Date.now()
}, Demo.prototype.updateTimer = function () {
    "use strict";
    if (this.checkpoints.getNbCheckPoints() > 0) {
        var e = Date.now() - this.timer, t = Math.floor(e / 6e4), i = Math.floor((e - 6e4 * t) / 1e3), s = Math.floor((e - 6e4 * t - 1e3 * i) / 10), o = "", a = "", n = "";
        10 > t && (o = "0"), 10 > i && (a = "0"), 10 > s && (n = "0"), $("#tdb #tdb_checkpoints #timer span").text(o + t + ":" + a + i + ":" + n + s)
    }
}, Demo.prototype.createScene = function () {
    "use strict";
    this.physicsWorld = new PhysicsWorld, this.scene = new BABYLON.Scene(this.engine), this.scene.clearColor = new BABYLON.Color3(.8, .8, .8), this.createLights(), this.createShadowGenerator(this.shadowLight), skybox(this.scene), this.loadGround()
}, Demo.prototype.loadGround = function () {
    "use strict";
    var e = 50;
    this.ground = new Ground(this.scene, this.physicsWorld.world, "./paris/", "paris_heightmap.babylon", "Ground", 6 * e, this.physicsWorld.groundMaterial, {
        groundTexture: "./paris/plan.png",
        groundCollisionFilterGroup: this.physicsWorld.GROUP1,
        groundCollisionFilterMask: this.physicsWorld.GROUP2,
        scaleFactor: e,
        buildingBaseHeight: e,
        solidBuildingsPath: "./paris/",
        solidBuildingsName: "paris_solid_buildings.babylon",
        buildingsPath: "./paris/",
        buildingsName: "paris_3D_buildings.babylon",
        treesPath: "./paris/",
        treesName: "paris_trees.babylon",
        particlesPath: "./paris/",
        particlesName: "paris_particles.babylon",
        buildingCelShading: !0,
        outlineShaderDeltaHeight: .15 * (e / 50),
        shadowGenerator: this.shadowGenerator,
        msgCallback: this.loadingMessage.bind(this),
        onLoadFinished: this.loadCar.bind(this)
    }), this.ground.load()
}, Demo.prototype.loadCar = function () {
    "use strict";
    this.ds3 = new Car(this.scene, this.physicsWorld.world, "./ds3/caisse/", "DS3_caisse.babylon", "./ds3/roue/", "DS3_roue.babylon", this.physicsWorld.carBodyMaterial, this.physicsWorld.wheelMaterial, new CANNON.Vec3(1.31, .76, -.6), new CANNON.Vec3(1.31, -.7, -.6), new CANNON.Vec3(-1.13, .76, -.6), new CANNON.Vec3(-1.13, -.7, -.6), {
        scaleFactor: .001,
        invertX: !0,
        bodyMass: 2e3,
        bodyCollisionFilterGroup: this.physicsWorld.GROUP2,
        bodyCollisionFilterMask: this.physicsWorld.GROUP1,
        shadowGenerator: this.shadowGenerator,
        msgCallback: this.loadingMessage.bind(this),
        onLoadSuccess: this.loadCheckpoints.bind(this)
    }), this.ds3.load()
}, Demo.prototype.loadCheckpoints = function () {
    "use strict";
    this.checkpoints = new Chekpoints(this.scene, this.ds3.getCarMainMesh(), this.ground, "./paris/", "paris_poi.babylon", "./pics/poi.png", 9, 512, {
        msgCallback: this.loadingMessage.bind(this),
        chekpointsCallback: this.checkpointsStatusUpdate.bind(this),
        onLoadFinished: this.start.bind(this)
    }), this.checkpoints.load()
}, Demo.prototype.createPostProcessPipeline = function () {
    "use strict";
    var e = new BABYLON.PostProcessRenderPipeline(this.engine, "standardPipeline"), t = this.engine, i = new BABYLON.PostProcessRenderEffect(this.engine, "fxaa", function () {
        return new BABYLON.FxaaPostProcess("antialias", 2, null, BABYLON.Texture.TRILINEAR_SAMPLINGMODE, t, !0)
    });
    e.addEffect(i), this.scene.postProcessRenderPipelineManager.addPipeline(e)
}, Demo.prototype.disablePostProcessPipeline = function () {
    "use strict";
    this.scene.postProcessRenderPipelineManager.detachCamerasFromRenderPipeline("standardPipeline", this.arcCamera), this.scene.postProcessRenderPipelineManager.detachCamerasFromRenderPipeline("standardPipeline", this.followCamera)
}, Demo.prototype.enablePostProcessPipeline = function () {
    "use strict";
    this.scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("standardPipeline", this.arcCamera), this.scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("standardPipeline", this.followCamera)
}, Demo.prototype.createLights = function () {
    "use strict";
    var e, t, i;
    e = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(.2, -1, -.6), this.scene), e.position = new BABYLON.Vector3(-200, 1e3, 600), e.diffuse = new BABYLON.Color3(1, 1, 1), e.specular = new BABYLON.Color3(1, 1, 1), e.intensity = .7, t = BABYLON.Mesh.CreateSphere("sphere", 10, 20, this.scene), t.position = e.position, t.position.scaleInPlace(.5), t.material = new BABYLON.StandardMaterial("light", this.scene), t.material.emissiveColor = new BABYLON.Color3(1, 1, 0), i = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, -1, 0), this.scene), i.diffuse = new BABYLON.Color3(1, 1, 1), i.specular = new BABYLON.Color3(.5, .5, .4), i.groundColor = new BABYLON.Color3(1, 1, 1), i.intensity = .8, this.shadowLight = e
}, Demo.prototype.createShadowGenerator = function (e) {
    "use strict";
    this.shadowGenerator = new BABYLON.ShadowGenerator(4096, e), this.shadowGenerator.useVarianceShadowMap = !0, this.shadowGenerator.usePoissonSampling = !0, this.shadowGenerator.setTransparencyShadow(!0), this.shadowGenerator.bias = 1e-5
}, Demo.prototype.disableShadows = function () {
    "use strict";
    null !== this.shadowGenerator && (this.shadowRenderList = this.shadowGenerator.getShadowMap().renderList, this.shadowGenerator.getShadowMap().renderList = [])
}, Demo.prototype.enableShadows = function () {
    "use strict";
    null !== this.shadowRenderList && (this.shadowGenerator.getShadowMap().renderList = this.shadowRenderList, this.scene.shadowsEnabled = !0)
}, Demo.prototype.createTestCamera = function () {
    "use strict";
    var e, t, i;
    return e = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(5, 5, 55), this.scene), e.setTarget(BABYLON.Vector3.Zero()), t = this.scene, i = this.ground, this.scene.registerBeforeRender(function () {
        t.isReady() && i.updateShaders(t.activeCamera.position)
    }), e
}, Demo.prototype.createArcCamera = function () {
    "use strict";
    var e, t, i;
    return e = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0, 0, 0, new BABYLON.Vector3(0, 10, 0), this.scene), e.setPosition(new BABYLON.Vector3(200, 150, 200)), e.lowerAlphaLimit = e.upperAlphaLimit = 0, e.lowerBetaLimit = 2, e.upperBetaLimit = 1, e.lowerRadiusLimit = e.upperRadiusLimit = e.radius, t = this.scene, i = this.ground, this.scene.registerBeforeRender(function () {
        t.isReady() && (i.updateShaders(t.activeCamera.position), t.activeCamera.alpha += .002)
    }), e.viewport = new BABYLON.Viewport(0, 0, 1, 1), e
}, Demo.prototype.activateCamera = function (e) {
    "use strict";
    this.scene.activeCamera = e, e.attachControl(this.canvas, !1)
}, Demo.prototype.registerMoves = function () {
    "use strict";
    window.addEventListener("keydown", this.keydownHandler), window.addEventListener("keyup", this.keyupHandler), this.scene.registerBeforeRender(this.registerBeforeRender)
}, Demo.prototype.resetCarPosition = function () {
    "use strict";
    this.ds3.setPosition(new CANNON.Vec3(-19, -14, 60)), this.checkpoints.isEnabled() && this.failedStatusUpdate()
}, Demo.prototype.hideCar = function () {
    "use strict";
    this.ds3.setPosition(new CANNON.Vec3(0, 0, 0)), this.ds3.update()
}, Demo.prototype.leaveGame = function () {
    "use strict";
    this.scene.unregisterBeforeRender(this.registerBeforeRender), window.removeEventListener("keydown", this.keydownHandler), window.removeEventListener("keyup", this.keyupHandler), $("#title_bar").toggle(), $("#tdb_back").toggle(), $("#tdb").toggle(), this.activateCamera(this.arcCamera), this.hideCar(), this.checkpoints.isEnabled() && (this.checkpoints.resetSprites(), this.checkpoints.enableSprites())
}, Demo.prototype.start = function () {
    "use strict";
    var e, t, i, s, o, a, n, r, d;
    e = {left: 0, right: 0, forward: 0, back: 0, changeDir: 0}, t = this, this.keydownHandler = function (i) {
        37 === i.keyCode && (e.left = 1), 38 === i.keyCode && (e.forward = 1), 39 === i.keyCode && (e.right = 1), 40 === i.keyCode && (e.back = 1), 16 === i.keyCode && (e.changeDir = 1), 27 === i.keyCode && t.leaveGame(), 32 === i.keyCode && t.ds3.getSpeed() < 2 && t.resetCarPosition()
    }, this.keyupHandler = function (t) {
        37 === t.keyCode && (e.left = 0), 38 === t.keyCode && (e.forward = 0), 39 === t.keyCode && (e.right = 0), 40 === t.keyCode && (e.back = 0)
    }, i = this.ds3, s = this.scene, o = this.physicsWorld, a = this.ground, this.registerBeforeRender = function () {
        s.isReady() && (i.moves(e.forward, e.back, e.left, e.right, e.changeDir), 1 === e.changeDir && (t.displayDirection(i.getDirection()), e.changeDir = 0), o.world.step(o.timeStep), i.getAltitude() < 47 && t.resetCarPosition(), a.updateShaders(s.activeCamera.position), i.update(), t.updateTdB(), t.checkpoints.isEnabled() && t.updateTimer())
    }, this.createPostProcessPipeline(), n = new FPSMeter({
        graph: 1,
        decimals: 0,
        position: "absolute",
        zIndex: 10,
        right: "5px",
        top: "auto",
        left: "auto",
        bottom: "5px",
        margin: "0 0 0 0"
    }), r = this.engine, window.addEventListener("resize", function () {
        r.resize()
    }), d = function () {
        n.tickStart(), r.beginFrame(), s.render(), r.endFrame(), n.tick(), BABYLON.Tools.QueueNewFrame(d)
    }, BABYLON.Tools.QueueNewFrame(d), this.arcCamera = this.createArcCamera(), this.followCamera = this.ds3.createFollowCamera(), this.activateCamera(this.arcCamera), this.toggleLoadingMessage(), $("#menus").toggle()
};
