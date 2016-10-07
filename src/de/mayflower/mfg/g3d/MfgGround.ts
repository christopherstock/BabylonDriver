
    /************************************************************************************
    *   Represents the ground.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ************************************************************************************/
    class MfgGround
    {
        public                          scene                       :any                        = null;
        public                          world                       :any                        = null;
        public                          groundPath                  :any                        = null;
        public                          groundMesh                  :any                        = null;
        public                          groundMaterial              :any                        = null;
        public                          width                       :any                        = null;
        public                          height                      :any                        = null;
        public                          depth                       :any                        = null;
        public                          trunksMaterial              :any                        = null;
        public                          treesMaterial               :any                        = null;
        public                          outlineMaterial             :any                        = null;
        public                          outlineMeshes               :any                        = null;
        public                          groundTexture               :any                        = null;
        public                          waterLevel                  :any                        = null;
        public                          groundCollisionFilterGroup  :any                        = null;
        public                          groundCollisionFilterMask   :any                        = null;
        public                          scaleFactor                 :any                        = null;
        public                          buildingsScale              :any                        = null;
        public                          buildingBaseHeight          :any                        = null;
        public                          outlineShaderDeltaHeight    :any                        = null;
        public                          solidBuildingsPath          :any                        = null;
        public                          solidBuildingsName          :any                        = null;
        public                          buildingsPath               :any                        = null;
        public                          buildingsName               :any                        = null;
        public                          particlesPath               :any                        = null;
        public                          particlesName               :any                        = null;
        public                          buildingCelShading          :any                        = null;
        public                          shadowGenerator             :any                        = null;
        public                          onLoadFinished              :any                        = null;
        public                          subdivision                 :any                        = null;
        public                          shadowRenderList            :any                        = null;
        public                          buildingsShaderMaterials    :any                        = null;
        public                          flagShaderMaterials         :any                        = null;
        public                          time                        :any                        = null;
        public                          minSizeBranch               :any                        = null;
        public                          maxSizeBranch               :any                        = null;
        public                          minSizeTrunk                :any                        = null;
        public                          maxSizeTrunk                :any                        = null;
        public                          minRadius                   :any                        = null;
        public                          maxRadius                   :any                        = null;
        public                          ground                      :BABYLON.GroundMesh         = null;
        public                          groundBody                  :any                        = null;
        public                          water                       :any                        = null;

        public constructor()
        {
            var e:number = 50;

            // TODO prune this!
            var r:any = {
                groundTexture: "./res/paris/plan.png",
                groundCollisionFilterGroup: MfgWorld.GROUP1,
                groundCollisionFilterMask:  MfgWorld.GROUP2,
                scaleFactor: e,
                buildingBaseHeight: e,
                solidBuildingsPath: "./res/paris/",
                solidBuildingsName: "paris_solid_buildings.babylon",
                buildingsPath: "./res/paris/",
                buildingsName: "paris_3D_buildings.babylon",
                particlesPath: "./res/paris/",
                particlesName: "paris_particles.babylon",
                buildingCelShading: !0,
                outlineShaderDeltaHeight: .15 * (e / 50),
                shadowGenerator: MfgInit.app.mfgScene.shadowGenerator,
                onLoadFinished: MfgInit.app.onGroundLoaded
            };

            this.scene = MfgInit.app.mfgScene.scene;
            this.world = MfgInit.app.mfgScene.world.world;
            this.groundPath = "./res/paris/";
            this.groundMesh = "paris_heightmap.babylon";
            this.groundMaterial = MfgInit.app.mfgScene.world.groundMaterial;

            this.width = 300;
            this.depth = 300;

            this.groundTexture = "string" == typeof r.groundTexture ? r.groundTexture : null;
            this.waterLevel = "number" == typeof r.waterLevel ? r.waterLevel : null;
            this.groundCollisionFilterGroup = "number" == typeof r.groundCollisionFilterGroup ? r.groundCollisionFilterGroup : 0;
            this.groundCollisionFilterMask = "number" == typeof r.groundCollisionFilterMask ? r.groundCollisionFilterMask : 0;
            this.scaleFactor = "number" == typeof r.scaleFactor ? r.scaleFactor : 1;
            this.buildingsScale = new BABYLON.Vector3(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            this.buildingBaseHeight = "number" == typeof r.buildingBaseHeight ? r.buildingBaseHeight : 0;

            this.outlineShaderDeltaHeight = "number" == typeof r.outlineShaderDeltaHeight ? r.outlineShaderDeltaHeight : 0;
            this.solidBuildingsPath = "string" == typeof r.solidBuildingsPath ? r.solidBuildingsPath : null;
            this.solidBuildingsName = "string" == typeof r.solidBuildingsPath ? r.solidBuildingsName : null;
            this.buildingsPath = "string" == typeof r.buildingsPath ? r.buildingsPath : null;
            this.buildingsName = "string" == typeof r.buildingsName ? r.buildingsName : null;
            this.particlesPath = "string" == typeof r.particlesPath ? r.particlesPath : null;
            this.particlesName = "string" == typeof r.particlesName ? r.particlesName : null;
            this.buildingCelShading = "boolean" == typeof r.buildingCelShading ? r.buildingCelShading : !1;
            this.shadowGenerator = "object" == typeof r.shadowGenerator ? r.shadowGenerator : null;
            this.onLoadFinished = "function" == typeof r.onLoadFinished ? r.onLoadFinished : null;
            this.subdivision = 64;
            this.shadowRenderList = null;
            this.buildingsShaderMaterials = [];
            this.flagShaderMaterials = [];
            this.time = 0;
            this.minSizeBranch = 15;
            this.maxSizeBranch = 20;
            this.minSizeTrunk = 10;
            this.maxSizeTrunk = 15;
            this.minRadius = 2;
            this.maxRadius = 4;

            this.outlineMeshes = [];

            var d:BABYLON.Color3 = BABYLON.Color3.FromInts(145, 73, 10);
            this.trunksMaterial = new BABYLON.StandardMaterial("trunk", this.scene);
            this.trunksMaterial.diffuseColor = new BABYLON.Color3(d.r, d.g, d.b);
            this.trunksMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

            var h:BABYLON.Color3 = BABYLON.Color3.FromInts(5, 116, 5);
            this.treesMaterial = new BABYLON.StandardMaterial("tree", this.scene);
            this.treesMaterial.diffuseColor = new BABYLON.Color3(h.r, h.g, h.b);
            this.treesMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

            var l:BABYLON.Color3 = BABYLON.Color3.FromInts(24, 25, 28);
            this.outlineMaterial = new BABYLON.StandardMaterial("outline", this.scene);
            this.outlineMaterial.diffuseColor = new BABYLON.Color3(l.r, l.g, l.b);
            this.outlineMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
            this.outlineMaterial.backFaceCulling = !0;
        }

        public init()
        {
            MfgInit.preloader.setLoadingMessage("creating landscape");
            var e = this;
            BABYLON.SceneLoader.ImportMesh(
                "",
                this.groundPath,
                this.groundMesh,
                this.scene,
                this.onHeightmapLoaded
            )
        }

        public onHeightmapLoaded=( t:BABYLON.Mesh[] )=>
        {
            for ( var i:number = 0; i < t.length; i++ )
            {
                var o:BABYLON.Mesh = t[i];

                MfgDebug.bugfix.log( "Mesh parsed [" + o.name + "]" );



                if ( o.name != "Ground" )
                {
                    continue;
                }



                (-1 !== o.name.indexOf( "Water"   ) && ( o.receiveShadows = !0 ) );
                (-1 !== o.name.indexOf( "Support" ) && ( o.receiveShadows = !0 ) );

                if (null !== o.getVerticesData(BABYLON.VertexBuffer.PositionKind))
                {
                    if (o.name === "Ground")
                    {
                        this.ground = new BABYLON.GroundMesh("", this.scene);
                        this.ground._setReady(!1);
                        this.ground._subdivisions = this.subdivision;

                        var a = BABYLON.VertexData.CreateGround(this.width, this.depth, this.subdivision);
                        if (null !== this.groundTexture) {
                            var n = new BABYLON.StandardMaterial("", this.scene);
                            n.diffuseTexture = new BABYLON.Texture(this.groundTexture, this.scene);
                            n.backFaceCulling = !0;
                            this.ground.material = n;
                        }
                        var r = a.positions, d = o.getVerticesData(BABYLON.VertexBuffer.PositionKind), h = d.length / 3, l = this.width / this.scaleFactor;
                        for (var s:number = 0; h > s; s++) {
                            var c = d[3 * s] * o.scaling.x, p = d[3 * s + 1] * o.scaling.y, u = d[3 * s + 2] * o.scaling.z, g = Math.round((c + l / 2) * this.subdivision / l), f = Math.round((u + l / 2) * this.subdivision / l), m = g, w = this.subdivision - f, B = m + (this.subdivision + 1) * w;
                            r[3 * B + 1] = p * this.scaleFactor + this.buildingBaseHeight
                        }
                        var C = a.normals, y = a.indices;
                        BABYLON.VertexData.ComputeNormals(r, y, C);
                        a.applyToMesh(this.ground, !1);
                        this.ground._setReady(!0);
                        o.dispose();
                        this.ground.receiveShadows = !0;

                        this._createCannonHeightfield();
                    }
                    else
                    {
                        this._moveAndScaleMesh(o);
                        o.convertToFlatShadedMesh();
                    }
                }
                else
                {
                    this._testEmptyMesh(o)
                }
            }
        };

        public _addOutlineMesh( t, addOutlineMesh:boolean, s )
        {
            var o = new BABYLON.Mesh("Outline", this.scene, s);
            o.material = this.outlineMaterial;
            o.position = t.position;
            o.rotation = t.rotation;
            o.scaling = t.scaling;
            o.computeWorldMatrix( !0 );
            var a = new BABYLON.VertexData;
            a.positions = [];
            a.indices = [];
            a.normals = [];
            a.uvs = [];
            var n = o.getWorldMatrix().clone();
            n.setTranslation(BABYLON.Vector3.Zero());
            var r = o.getWorldMatrix().clone();
            r.invert();
            var h, d = t.getVerticesData(BABYLON.VertexBuffer.PositionKind), l = BABYLON.Vector3.Zero();
            for ( h = 0; h < d.length; h += 3 ) {
                BABYLON.Vector3.FromArrayToRef(d, h, l);
                var c = BABYLON.Vector3.TransformCoordinates(l, n), p = BABYLON.Vector3.TransformCoordinates(l, o.getWorldMatrix());
                c.x >= 0 ? p.x += .06 * this.scaleFactor / 50 : p.x -= .06 * this.scaleFactor / 50;
                c.y >= 0 ? p.y += .06 * this.scaleFactor / 50 : p.y -= .06 * this.scaleFactor / 50;
                c.z >= 0 ? p.z += .06 * this.scaleFactor / 50 : p.z -= .06 * this.scaleFactor / 50;
                var u = BABYLON.Vector3.TransformCoordinates(p, r);
                a.positions.push(u.x);
                a.positions.push(u.y);
                a.positions.push(u.z);
            }
            var g = t.getVerticesData(BABYLON.VertexBuffer.NormalKind);
            for (h = 0; h < g.length; h++)a.normals.push(g[h]);
            var f = t.getIndices();
            for (h = 0; h < f.length / 3; h++)
            {
                a.indices.push(f[3 * h + 1]);
                a.indices.push(f[3 * h]);
                a.indices.push(f[3 * h + 2]);
            }
            a.applyToMesh(o);

            if (addOutlineMesh)
            {
                for ( h = 0; h < this.scene.meshes.length; h++ )
                {
                    var m = this.scene.meshes[h];
                    m.parent === t && this._addOutlineMesh(m, !1, o)
                }
            }
            this.outlineMeshes.push(o)
        }

        public _mergeOutlineMeshes()
        {
            this.outlineMeshes.length > 0 && BABYLON.Mesh.MergeMeshes(this.outlineMeshes, !0, !0)
        }

        public _moveAndScaleMesh(e)
        {
            e.position.scaleInPlace(this.scaleFactor);
            e.position.y += this.buildingBaseHeight;
            e.scaling.scaleInPlace(this.scaleFactor);
            e.computeWorldMatrix(!0);
        }

        public _addDeltaHeight(e)
        {
            e.position.y += this.outlineShaderDeltaHeight;
            e.computeWorldMatrix( !0 );
        }

        public _createCannonHeightfield()
        {
            var t, a, n, s = this.ground.getVerticesData(BABYLON.VertexBuffer.PositionKind), o = [];
            for (a = 0; a <= this.subdivision; a++)for (o.push([]), n = 0; n <= this.subdivision; n++) {
                var r = a + (this.subdivision + 1) * (this.subdivision - n);
                t = s[3 * r + 1];
                o[a].push(t);
            }

            var d = new CANNON.Heightfield(o, {elementSize: this.width / this.subdivision});
            this.groundBody = new CANNON.Body({
                mass: 0,
                material: this.groundMaterial
            });
            this.groundBody.addShape(d);
            this.groundBody.position.set(-this.width / 2, -this.depth / 2, 0);
            this.groundBody.collisionFilterGroup = this.groundCollisionFilterGroup;
            this.groundBody.collisionFilterMask = this.groundCollisionFilterMask;

            this.world.add(this.groundBody);

            if ( MfgSetting.FEATURE_WATER )
            {
                this.addWater();
            }

            if ( MfgSetting.FEATURE_SOLID_BUILDINGS )
            {
                this.loadSolidBuildings();
            }
            else
            {
                this.onSolidBuildingsLoaded( [] );
            }
        }

        public _testEmptyMesh( e )
        {
            var t, i = !1;
            for (t = 0; t < this.scene.meshes.length; t++) {
                var s = this.scene.meshes[t];
                if (s.parent === e) {
                    i = !0;
                    break
                }
            }
            i ? e.setEnabled(!0) : e.dispose()
        }

        public loadSolidBuildings()
        {
            MfgInit.preloader.setLoadingMessage("constructing buildings");
            BABYLON.SceneLoader.ImportMesh(
                "",
                this.solidBuildingsPath,
                this.solidBuildingsName,
                this.scene,
                this.onSolidBuildingsLoaded
            )
        }

        public onSolidBuildingsLoaded=( t:BABYLON.Mesh[] )=>
        {
            var o, i = [], s = [];
            for (o = 0; o < t.length; o++) {
                var a:BABYLON.Mesh = t[o];
                null !== a.getVerticesData(BABYLON.VertexBuffer.PositionKind) ? (this._moveAndScaleMesh(a), this.buildingCelShading && this._addDeltaHeight(a), this._createCannonBuilding(a), a.isVisible !== !1 ? (this.buildingCelShading && this._addOutlineMesh(a, null, null), a.convertToFlatShadedMesh(), a.parent && (-1 !== a.parent.name.indexOf("Building") && i.push(a), -1 !== a.parent.name.indexOf("Bridges") && s.push(a))) : a.dispose()) : this._testEmptyMesh(a)
            }
            if (i.length > 0) {
                null !== this.shadowGenerator && this._setShadowImpostor(i);
                var n = BABYLON.Mesh.MergeMeshes(i, !0, !1);
                this.buildingCelShading && this._setCellShading(n, !0)
            }
            if (s.length > 0) {
                var r = BABYLON.Mesh.MergeMeshes(s, !0, !1);
                this.buildingCelShading && this._setCellShading(r, !0);
                null !== this.shadowGenerator && this.shadowGenerator.getShadowMap().renderList.push(r);
            }

            if ( MfgSetting.FEATURE_3D_BUILDINGS )
            {
                this.load3dBuildings();
            }
            else
            {
                this.on3dBuildingsLoaded( [] );
            }
        };

        public _createCannonBuilding(e)
        {
            var n, r, d, h, l, c, p, t = function (e, t, i) {
                return new CANNON.Quaternion(-e.w * t * i.x + e.x * -i.w + e.z * i.y - e.y * i.z, -e.w * t * i.z + e.z * -i.w + e.y * i.x - e.x * i.y, -e.w * t * i.y + e.y * -i.w + e.x * i.z - e.z * i.x, -e.w * t * -i.w - e.x * i.x - e.z * i.z - e.y * i.y)
            }, i = e.getVerticesData(BABYLON.VertexBuffer.PositionKind), s = i.length / 3, o = e.getIndices(), a = o.length / 3, u = [];
            for (n = 0; a > n; n++)r = o[3 * n], d = o[3 * n + 1], h = o[3 * n + 2], l = new BABYLON.Vector3(i[3 * d] - i[3 * r], i[3 * d + 1] - i[3 * r + 1], i[3 * d + 2] - i[3 * r + 2]), c = new BABYLON.Vector3(i[3 * h] - i[3 * r], i[3 * h + 1] - i[3 * r + 1], i[3 * h + 2] - i[3 * r + 2]), p = BABYLON.Vector3.Normalize(BABYLON.Vector3.Cross(l, c)), u.push(p);
            var g = e.scaling.x, f = e.scaling.y, m = e.scaling.z, w = [];
            for (n = 0; s > n; n++) {
                var B = new CANNON.Vec3(i[3 * n] * g, i[3 * n + 2] * m, i[3 * n + 1] * f);
                w.push(B)
            }
            var C, y, N = [];
            for (n = 0; a > n; n++)for (C = n + 1; a > C; C++)if (l = u[n], c = u[C], BABYLON.Vector3.Cross(l, c).length() < 1e-4) {
                r = o[3 * n], d = o[3 * n + 1], h = o[3 * n + 2], y = -1, o[3 * C] !== r && o[3 * C] !== d && o[3 * C] !== h ? y = o[3 * C] : o[3 * C + 1] !== r && o[3 * C + 1] !== d && o[3 * C + 1] !== h ? y = o[3 * C + 1] : o[3 * C + 2] !== r && o[3 * C + 2] !== d && o[3 * C + 2] !== h && (y = o[3 * C + 2]);
                var b = new BABYLON.Vector3(i[3 * y] - i[3 * r], i[3 * y + 1] - i[3 * r + 1], i[3 * y + 2] - i[3 * r + 2]);
                if (b = BABYLON.Vector3.Normalize(b), BABYLON.Vector3.Dot(b, l) < 1e-4) {
                    var k = [r, d, h, y];
                    N.push(k)
                }
            }
            var L = new CANNON.ConvexPolyhedron(w, N), O = new CANNON.Body({mass: 0, material: this.groundMaterial});
            O.addShape(L);
            O.position.set(e.position.x, e.position.z, e.position.y);

            var A = BABYLON.Quaternion.RotationYawPitchRoll(e.rotation.y, e.rotation.x, e.rotation.z);
            O.quaternion = t(A, 1, new CANNON.Quaternion(0, 0, 0, -1));
            O.collisionFilterGroup = this.groundCollisionFilterGroup;
            O.collisionFilterMask = this.groundCollisionFilterMask;
            this.world.add( O );
        }

        public load3dBuildings()
        {
            MfgInit.preloader.setLoadingMessage("creating special buildings and monuments (non-collidable)");
            BABYLON.SceneLoader.ImportMesh(
                "",
                this.buildingsPath,
                this.buildingsName,
                this.scene,
                this.on3dBuildingsLoaded
            )
        }

        public on3dBuildingsLoaded=( t:BABYLON.Mesh[] )=>
        {
            var o, a, n, i = [], s = [];
            for (o = 0; o < t.length; o++)
            {
                a = t[o], null !== a.getVerticesData(BABYLON.VertexBuffer.PositionKind) ? (this._moveAndScaleMesh(a), -1 === a.name.indexOf("Flag") ? (this.buildingCelShading && (this._addDeltaHeight(a), this._addOutlineMesh(a, null, null)), -1 === t[o].name.indexOf("Sphere") && -1 === t[o].name.indexOf("Sacre") && t[o].convertToFlatShadedMesh(), n = !0, a.parent && -1 !== a.parent.name.indexOf("no shadow") && (n = !1), null !== this.shadowGenerator ? i.push(a) : s.push(a)) : this._setFlagShader(a)) : this._testEmptyMesh(a);
            }

            if (i.length > 0) {
                null !== this.shadowGenerator && this._setShadowImpostor(i);
                var r = BABYLON.Mesh.MergeMeshes(i, !0, !0);
                this.buildingCelShading && this._setCellShading(r, !0)
            }
            if (s.length > 0)
            {
                BABYLON.Mesh.MergeMeshes(s, !0, !1);
            }

            if (MfgSetting.FEATURE_TREES)
            {
                MfgTree.loadTrees();
            }
            else
            {
                this.onTreesLoaded();
            }
        };

        public onTreesLoaded()
        {
            if (MfgSetting.FEATURE_PARTICLE_SYSTEM)
            {
                this.loadParticleSystems();
            }
            else
            {
                this.onLoadFinished();
            }
        }

        public _createCannonTrunk(e, t)
        {
            var i = e.getBoundingInfo().boundingBox, s = i.minimumWorld, o = i.maximumWorld, a = s.negate().add(o);
            a.scaleInPlace(.5), a.x = Math.abs(a.x), a.y = Math.abs(a.y), a.z = Math.abs(a.z), a.scaleInPlace(.3);
            var n = new CANNON.Box(new CANNON.Vec3(a.x, a.z, a.y)), r = new CANNON.Body({
                mass: 0,
                material: this.groundMaterial
            });
            r.addShape(n), r.collisionFilterGroup = this.groundCollisionFilterGroup, r.collisionFilterMask = this.groundCollisionFilterMask, r.position.set(t.x, t.z + a.z / 2, t.y), this.world.add(r)
        }

        public loadParticleSystems()
        {
            MfgInit.preloader.setLoadingMessage( "creating particle systems" );

            BABYLON.SceneLoader.ImportMesh(
                "",
                this.particlesPath,
                this.particlesName,
                this.scene,
                this.onParticleSystemsLoaded
            )
        }

        public onParticleSystemsLoaded=( s:BABYLON.Mesh[] )=>
        {
            var e, t, i = this;

            for (t = 0; t < s.length; t++)
            {
                if (e = s[t], null !== e.getVerticesData(BABYLON.VertexBuffer.PositionKind)) {
                    i._moveAndScaleMesh(e);
                    var o = new BABYLON.ParticleSystem("particles", 4e3, i.scene);
                    o.disposeOnStop = !0, o.targetStopDuration = 0, o.emitter = e.position, e.parent && (-1 !== e.parent.name.indexOf("Smoke") && (o.particleTexture = new BABYLON.Texture("res/image/misc/smoke.png", i.scene), o.minAngularSpeed = -1.5, o.maxAngularSpeed = 4, o.minSize = .1, o.maxSize = .5, o.minLifeTime = .5, o.maxLifeTime = 2, o.minEmitPower = .1, o.maxEmitPower = .3, o.emitRate = 400, o.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD, o.direction1 = new BABYLON.Vector3(-.1, 25, -.1), o.direction2 = new BABYLON.Vector3(.2, 12, .2), o.color1 = new BABYLON.Color4(.2, .2, .2, .5), o.color2 = new BABYLON.Color4(.6, .6, .6, .1), o.colorDead = new BABYLON.Color4(.8, .8, .8, .2), o.gravity = new BABYLON.Vector3(-.5, .5, .5), o.start()), -1 !== e.parent.name.indexOf("Fountain") && (o.particleTexture = new BABYLON.Texture("res/image/misc/water.png", i.scene), o.minAngularSpeed = -1.5, o.maxAngularSpeed = 1.5, o.minSize = .1, o.maxSize = .5, o.minLifeTime = .5, o.maxLifeTime = 2, o.minEmitPower = .5, o.maxEmitPower = 1, o.emitRate = 300, o.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD, o.direction1 = new BABYLON.Vector3(-2, 8, -2), o.direction2 = new BABYLON.Vector3(2, 8, 2), o.color1 = new BABYLON.Color4(54 / 255, 159 / 255, 207 / 255, .9), o.color2 = new BABYLON.Color4(22 / 255, 106 / 255, 145 / 255, .8), o.colorDead = new BABYLON.Color4(1, 1, 1, 1), o.gravity = new BABYLON.Vector3(0, -9, 0), o.start())), e.dispose()
                } else i._testEmptyMesh(e);
            }

            i.onLoadFinished();
        };

        public _setShadowImpostor(e)
        {
            var t, i, s = [];
            for (t = 0; t < e.length; t++)
            {
                i = LibMath3D.copyMesh(this.scene, e[t], "copy", new BABYLON.Vector3(.98, .98, .98));
                i.computeWorldMatrix(!0);
                s.push(i);
            }
            var o = BABYLON.Mesh.MergeMeshes(s, !0, !0);
            this.shadowGenerator.getShadowMap().renderList.push(o);
            o.visibility = 0;
        }

        public _setCellShading(e, t)
        {
            var i = null !== e.material ? e.material.diffuseColor : null;
            if (i) {
                var s = new BABYLON.ShaderMaterial("", this.scene, "./res/shader/cellShading", {
                    attributes: ["position", "normal"],
                    uniforms: ["world", "view", "worldViewProjection", "lightMatrix", "light0Pos"]
                });
                s.setTexture("shadowSampler", this.shadowGenerator.getShadowMapForRendering()), s.setVector3("diffuseColor", new BABYLON.Vector3(i.r, i.g, i.b)), s.backFaceCulling = !0, e.material = s, this.buildingsShaderMaterials.push(s)
            }
        }

        public _setFlagShader(e)
        {
            var t = new BABYLON.ShaderMaterial("", this.scene, "./res/shader/flag", {
                attributes: ["position", "uv"],
                uniforms: ["worldViewProjection"]
            }), i = new BABYLON.Texture("./res/image/misc/flag.png", this.scene);
            t.setFloat("pole_x", -.053);
            t.setTexture("textureSampler", i);
            t.setFloat("time", 0);
            t.backFaceCulling = !1;
            e.material = t;
            this.flagShaderMaterials.push(t);
        }

        public addWater()
        {
            this.water = BABYLON.Mesh.CreateGround("", this.width, this.width, 1, this.scene);
            this.water.position = new BABYLON.Vector3(0, this.waterLevel, 0);
            var e = new BABYLON.StandardMaterial("", this.scene);
            e.diffuseColor = new BABYLON.Color3( .2, .3, 1 );
            this.water.material = e;
            this.water.receiveShadows = !0;
        }

        public updateShaders( e )
        {
            var t;
            for (t = 0; t < this.buildingsShaderMaterials.length; t++)
            {
                this.buildingsShaderMaterials[t].setMatrix("lightMatrix", this.shadowGenerator.getTransformMatrix());
                this.buildingsShaderMaterials[t].setVector3("light0Pos", this.shadowGenerator.getLight().position);
            }

            for (t = 0; t < this.flagShaderMaterials.length; t++)
            {
                this.flagShaderMaterials[t].setFloat("time", this.time);
                this.time += .02;
            }
        }
    }
