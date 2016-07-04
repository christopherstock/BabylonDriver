
    /************************************************************************************
    *   Represents the car model.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ************************************************************************************/
    class MfgCar
    {
        public              scene                           :BABYLON.Scene                  = null;

        public              world                           :CANNON.World                   = null;
        public              bodyMeshPath                    :any                            = null;
        public              bodyMeshName                    :any                            = null;
        public              wheelMeshPath                   :any                            = null;
        public              wheelMeshName                   :any                            = null;
        public              bodyMaterial                    :any                            = null;
        public              wheelMaterial                   :any                            = null;
        public              wheel_rl_position               :any                            = null;
        public              wheel_rr_position               :any                            = null;
        public              wheel_fl_position               :any                            = null;
        public              wheel_fr_position               :any                            = null;
        public              wheelsOptions                   :any                            = null;
        public              lenk                            :any                            = null;
        public              dyn                             :any                            = null;
        public              direction                       :any                            = null;
        public              scaleFactor                     :any                            = null;
        public              shadowGenerator                 :any                            = null;
        public              bodyMass                        :any                            = null;
        public              firstPos                        :any                            = null;
        public              bodyCollisionFilterGroup        :any                            = null;
        public              bodyCollisionFilterMask         :any                            = null;
        public              onLoadSuccess                   :any                            = null;
        public              scale                           :any                            = null;
        public              b_bodyRoot                      :BABYLON.Mesh                   = null;
        public              approxBox                       :any                            = null;
        public              c_bodyRoot                      :any                            = null;
        public              b_wheels                        :any                            = null;
        public              vehicle                         :any                            = null;

        public constructor( e, t, i, s, o, n, h, a, r, l, c, d, p )
        {
            p = p || {};

            this.scene = e;
            this.world = t;
            this.bodyMeshPath = i;
            this.bodyMeshName = s;
            this.wheelMeshPath = o;
            this.wheelMeshName = n;
            this.bodyMaterial = h;
            this.wheelMaterial = a;
            this.wheel_rl_position = r;
            this.wheel_rr_position = l;
            this.wheel_fl_position = c;
            this.wheel_fr_position = d;
            this.wheelsOptions = {
                directionLocal: new CANNON.Vec3(0, 0, -1),
                suspensionStiffness: 30,
                suspensionRestLength: .1,
                frictionSlip: 5,
                dampingRelaxation: 2.3,
                dampingCompression: 4.4,
                maxSuspensionForce: 1e5,
                rollInfluence: .01,
                axleLocal: new CANNON.Vec3(0, 1, 0),
                chassisConnectionPointLocal: new CANNON.Vec3(1, 1, 0),
                maxSuspensionTravel: .3,
                customSlidingRotationalSpeed: -30,
                useCustomSlidingRotationalSpeed: !0
            };
            this.lenk = 0;
            this.dyn = 0;
            this.direction = 1;
            this.scaleFactor = "number" == typeof p.scaleFactor ? p.scaleFactor : 1;

            var u = "boolean" == typeof p.invertX ? p.invertX : !1;
            u ? this.scale = new BABYLON.Vector3(-this.scaleFactor, this.scaleFactor, this.scaleFactor) : this.scale = new BABYLON.Vector3(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            this.shadowGenerator = "object" == typeof p.shadowGenerator ? p.shadowGenerator : null;
            this.bodyMass = "number" == typeof p.bodyMass ? p.bodyMass : 0;
            this.firstPos = "CANNON.Vec3" == typeof p.firstPos ? p.firstPos : new CANNON.Vec3(0, 0, 0);
            this.bodyCollisionFilterGroup = "number" == typeof p.bodyCollisionFilterGroup ? p.bodyCollisionFilterGroup : 0;
            this.bodyCollisionFilterMask = "number" == typeof p.bodyCollisionFilterMask ? p.bodyCollisionFilterMask : 0;
            this.onLoadSuccess = "function" == typeof p.onLoadSuccess ? p.onLoadSuccess : null;
        }

        public _babylon_addBody(e)
        {
            var t, i, s;
            for (this.b_bodyRoot = e[0], this.b_bodyRoot.name = this.bodyMeshName, t = BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(0, 1, 0), Math.PI / 2), i = LibMath.toEulerAngles(t), s = 1; s < e.length; s += 1)e[s].rotationQuaternion = t, e[s].rotation = new BABYLON.Vector3(i.x, i.y, i.z);
            if (this.b_bodyRoot.scaling = this.scale, null !== this.shadowGenerator)for (s = 1; s < e.length; s += 1)this.shadowGenerator.getShadowMap().renderList.push(e[s]);
            this.approxBox = e[1]
        }

        public _cannon_addBody(e)
        {
            var t, i;
            t = e[0].negate().add(e[1]);
            t.scaleInPlace(.5);
            t.x = Math.abs(t.x);
            t.y = Math.abs(t.y);
            t.z = Math.abs(t.z);
            t.scaleInPlace(this.scaleFactor);
            i = new CANNON.Box(new CANNON.Vec3(t.x, t.z, t.y));
            this.c_bodyRoot = new CANNON.Body(
                {
                    mass: this.bodyMass,
                    material: this.bodyMaterial
                }
            );
            this.c_bodyRoot.addShape(i);
            0 !== this.bodyCollisionFilterGroup && (this.c_bodyRoot.collisionFilterGroup = this.bodyCollisionFilterGroup, this.c_bodyRoot.collisionFilterMask = this.bodyCollisionFilterMask);
            this.c_bodyRoot.position.set(this.firstPos.x, this.firstPos.y, this.firstPos.z);

            this.world.addBody(this.c_bodyRoot);

            this.vehicle = new CANNON.RaycastVehicle({chassisBody: this.c_bodyRoot});
        }

        public _loadWheels()
        {
            var e = this;
            BABYLON.SceneLoader.ImportMesh(
                "",
                this.wheelMeshPath,
                this.wheelMeshName,
                this.scene,
                function (t) {
                    e._babylon_addWheels(t);
                    e._cannon_addWheels( LibMath.getMinMaxBox(t) );
                }
            )
        }

        public _babylon_addWheels(e)
        {
            var t, i, s, o, n, h, a;
            if (t = e[0], t.scaling = this.scale, null !== this.shadowGenerator)for (a = 1; a < e.length; a += 1)this.shadowGenerator.getShadowMap().renderList.push(e[a]);
            for (n = BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(0, 1, 0), Math.PI / 2), a = 1; a < e.length; a += 1)e[a].rotationQuaternion = n;
            for (i = new BABYLON.Mesh("", this.scene), a = 1; a < e.length; a += 1)h = e[a].createInstance(""), h.parent = i, null !== this.shadowGenerator && this.shadowGenerator.getShadowMap().renderList.push(h);
            for (i.scaling = this.scale, s = new BABYLON.Mesh("", this.scene), a = 1; a < e.length; a += 1)h = e[a].createInstance(""), h.parent = s, null !== this.shadowGenerator && this.shadowGenerator.getShadowMap().renderList.push(h);
            for (s.scaling = this.scale, o = new BABYLON.Mesh("", this.scene), a = 1; a < e.length; a += 1)h = e[a].createInstance(""), h.parent = o, null !== this.shadowGenerator && this.shadowGenerator.getShadowMap().renderList.push(h);
            o.scaling = this.scale, this.b_wheels = [], this.b_wheels.push(o), this.b_wheels.push(s), this.b_wheels.push(i), this.b_wheels.push(t);
        }

        public _cannon_addWheels(e)
        {
            var t = Math.abs(e[0].y - e[1].y) / 2 * this.scaleFactor;
            this.wheelsOptions.radius = t, this.wheelsOptions.chassisConnectionPointLocal.set(this.wheel_fr_position.x, this.wheel_fr_position.y, this.wheel_fr_position.z), this.vehicle.addWheel(this.wheelsOptions), this.wheelsOptions.chassisConnectionPointLocal.set(this.wheel_fl_position.x, this.wheel_fl_position.y, this.wheel_fl_position.z), this.vehicle.addWheel(this.wheelsOptions), this.wheelsOptions.chassisConnectionPointLocal.set(this.wheel_rr_position.x, this.wheel_rr_position.y, this.wheel_rr_position.z), this.vehicle.addWheel(this.wheelsOptions), this.wheelsOptions.chassisConnectionPointLocal.set(this.wheel_rl_position.x, this.wheel_rl_position.y, this.wheel_rl_position.z), this.vehicle.addWheel(this.wheelsOptions), this.vehicle.addToWorld(this.world), null !== this.onLoadSuccess && this.onLoadSuccess()
        }

        public load()
        {
            MfgPreloader.singleton.setLoadingMessage( "importing MF vehicle" );
            var e = this;
            BABYLON.SceneLoader.ImportMesh(
                "",
                this.bodyMeshPath,
                this.bodyMeshName,
                this.scene,
                function( t )
                {
                    e._babylon_addBody( t );
                    var i = LibMath.getMinMaxBox( t );
                    e._cannon_addBody(i);
                    e._loadWheels();
                }
            )
        }

        public update()
        {
            var e, t, i, s;
            e = function (e, t, i) {
                return new BABYLON.Quaternion(-e.w * t * i.x + e.x * -i.w + e.z * i.y - e.y * i.z, -e.w * t * i.z + e.z * -i.w + e.y * i.x - e.x * i.y, -e.w * t * i.y + e.y * -i.w + e.x * i.z - e.z * i.x, -e.w * t * -i.w - e.x * i.x - e.z * i.z - e.y * i.y)
            }, t = BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(0, 0, 1), Math.PI), i = this.vehicle.chassisBody, this.b_bodyRoot.position = new BABYLON.Vector3(i.position.x, i.position.z, i.position.y - .02), this.b_bodyRoot.rotationQuaternion = e(i.quaternion, 1, new BABYLON.Quaternion(0, 0, 0, -1)), this.vehicle.updateWheelTransform(0), i = this.vehicle.getWheelTransformWorld(0), this.b_wheels[0].position = new BABYLON.Vector3(i.position.x, i.position.z, i.position.y), this.b_wheels[0].rotationQuaternion = e(i.quaternion, 1, new BABYLON.Quaternion(0, 0, 0, -1)), this.vehicle.updateWheelTransform(1), i = this.vehicle.getWheelTransformWorld(1), this.b_wheels[1].position = new BABYLON.Vector3(i.position.x, i.position.z, i.position.y), this.b_wheels[1].rotationQuaternion = e(i.quaternion, 1, t), this.vehicle.updateWheelTransform(2), i = this.vehicle.getWheelTransformWorld(2), this.b_wheels[2].position = new BABYLON.Vector3(i.position.x, i.position.z, i.position.y), this.b_wheels[2].rotationQuaternion = e(i.quaternion, 1, new BABYLON.Quaternion(0, 0, 0, -1)), this.vehicle.updateWheelTransform(3), i = this.vehicle.getWheelTransformWorld(3), this.b_wheels[3].position = new BABYLON.Vector3(i.position.x, i.position.z, i.position.y), this.b_wheels[3].rotationQuaternion = e(i.quaternion, 1, t), s = LibMath.toEulerAngles(this.b_bodyRoot.rotationQuaternion), this.b_bodyRoot.rotation = new BABYLON.Vector3(s.x, s.y, s.z)
        }

        public setPosition( e )
        {
            this.vehicle.chassisBody.position.set(e.x, e.y, e.z), this.vehicle.chassisBody.quaternion.set(0, 0, 0, 1), this.vehicle.chassisBody.angularVelocity.set(0, 0, 0), this.vehicle.chassisBody.velocity.set(0, 0, 0)
        }

        public steering( e )
        {
            this.vehicle.setSteeringValue( e, 0 );
            this.vehicle.setSteeringValue( e, 1 );
        }

        public brake( e )
        {
            this.vehicle.applyEngineForce(0, 0), this.vehicle.applyEngineForce(0, 1), this.vehicle.setBrake(e, 0), this.vehicle.setBrake(e, 1), this.vehicle.setBrake(e, 2), this.vehicle.setBrake(e, 3)
        }

        public accelerate( e )
        {
            this.vehicle.setBrake(0, 0), this.vehicle.setBrake(0, 1), this.vehicle.setBrake(0, 2), this.vehicle.setBrake(0, 3), this.vehicle.applyEngineForce(e, 0), this.vehicle.applyEngineForce(e, 1)
        }

        public moves( e, t, i, s, o )
        {
            if (1 === s && this.lenk >= -.5 && (this.lenk -= .01, this.steering(this.lenk)), 1 === i && this.lenk <= .5 && (this.lenk += .01, this.steering(this.lenk)), 0 === i && 0 === s && (this.lenk < 0 ? (this.lenk += .01, this.steering(this.lenk)) : this.lenk > 0 && (this.lenk -= .01, this.steering(this.lenk)), Math.abs(this.lenk) < .01 && (this.lenk = 0, this.steering(this.lenk))), 1 === e && 1 === this.direction ? (this.getSpeed() < 50 ? this.dyn = 8e3 : this.getSpeed() < 100 ? this.dyn = 7e3 : this.getSpeed() < 150 ? this.dyn = 6e3 : this.getSpeed() < 230 ? this.dyn = 4e3 : this.dyn = 0, this.accelerate(this.dyn)) : 1 === e && -1 === this.direction ? (this.getSpeed() < 50 ? this.dyn = -2e3 : this.dyn = 0, this.accelerate(this.dyn)) : this.accelerate(0), 1 === o && this.getSpeed() < 5 && (this.direction *= -1), 1 === t) {
                this.dyn = 0;
                var n = 50;
                this.brake(n)
            }
        }

        public getSpeed()
        {
            return 3.6 * this.c_bodyRoot.velocity.norm()
        }

        public getLenk()
        {
            return this.lenk
        }

        public getDirection()
        {
            return this.direction
        }

        public getAltitude()
        {
            return this.c_bodyRoot.position.z
        }

        public getCarMainMesh()
        {
            return this.approxBox
        }
    }
