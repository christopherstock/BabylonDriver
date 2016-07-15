    /************************************************************************************
    *   Represents the checkpoints.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ************************************************************************************/
    class MfgCheckpoint
    {
        public                scene                             :BABYLON.Scene        = null;
        public                carBox                            :BABYLON.AbstractMesh = null;
        public                ground                            :MfgGround            = null;
        public                poiPath                           :string               = null;
        public                poiMeshName                       :string               = null;
        public                spriteFile                        :string               = null;
        public                nbSprites                         :number               = null;
        public                spriteSize                        :number               = null;
        public                checkpointsCallback               :() => void           = null;
        public                onLoadFinished                    :() => void           = null;
        public                enabled                           :boolean              = null;
        public                spriteArray                       :any                  = null;
        public                nbCheckPoints                     :number               = null;

        public constructor( scene:BABYLON.Scene, carMesh:BABYLON.AbstractMesh, ground:MfgGround, poiPath:string, poiMeshName:string, file:string, nbSprites:number, spriteSize:number, h )
        {
            h = h || {};
            this.scene = scene;
            this.carBox = carMesh;
            this.ground = ground;
            this.poiPath = poiPath;
            this.poiMeshName = poiMeshName;
            this.spriteFile = file;
            this.nbSprites = nbSprites;
            this.spriteSize = spriteSize;
            this.checkpointsCallback = "function" == typeof h.checkpointsCallback ? h.checkpointsCallback : null;
            this.onLoadFinished = "function" == typeof h.onLoadFinished ? h.onLoadFinished : null;
            this.enabled = !1;
            this.carBox.actionManager = null
        }

        public load()
        {
            var sm          :BABYLON.SpriteManager,
                sprite      :BABYLON.Sprite,
                self        :MfgCheckpoint              = this;

            MfgPreloader.singleton.setLoadingMessage("placing checkpoints");

            this.spriteArray = [];
            this.nbCheckPoints = 0;
            
            sm = new BABYLON.SpriteManager("POImanager", this.spriteFile, this.nbSprites, this.spriteSize, this.scene);
            BABYLON.SceneLoader.ImportMesh(
                "", 
                this.poiPath, 
                this.poiMeshName, 
                this.scene, 
                function (meshes :BABYLON.AbstractMesh[]) {
                    for (var index = 0; index < meshes.length; index += 1) {
                        if (null !== meshes[index].getVerticesData(BABYLON.VertexBuffer.PositionKind)) {
                            self.ground._moveAndScaleMesh(meshes[index]);
                            sprite = new BABYLON.Sprite("poi", sm); 
                            sprite.size = 0;
                            sprite.position = meshes[index].position;
                            self.spriteArray.push([meshes[index], sprite]);
                            self.nbCheckPoints += 1;  
                        } 
                    }
                    self.onLoadFinished()
                }
            );
        }

        public isEnabled()
        {
            return this.enabled
        }

        public enableSprites() {
            var mesh        :BABYLON.AbstractMesh, 
                sprite      :BABYLON.Sprite, 
                self        :MfgCheckpoint              = this, 
                action      :BABYLON.ExecuteCodeAction, 
                callback    :() => void;

            if (null !== this.carBox.actionManager) {
                this.carBox.actionManager.dispose();
            }
            this.carBox.actionManager = new BABYLON.ActionManager(this.scene);
            
            callback = function () {
                var e = this.triggerOptions.parameter;
                if (self.spriteArray[e.index][1].size > 0) {
                    self.spriteArray[e.index][1].size = 0; 
                    self.nbCheckPoints -= 1;
                    self.checkpointsCallback();
                }
            };
            this.nbCheckPoints = 0;

            for (var index = 0; index < this.spriteArray.length; index += 1) {
                mesh = this.spriteArray[index][0]; 
                sprite = this.spriteArray[index][1]; 
                mesh.index = index; 
                sprite.size = 10; 
                action = new BABYLON.ExecuteCodeAction({
                        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
                        parameter: mesh
                    }, 
                    callback
                );
                this.carBox.actionManager.registerAction(action); 
                self.nbCheckPoints += 1;
            }
            this.enabled = !0
        }

        public disableSprites()
        {
            var sprite :BABYLON.Sprite;
            
            if (null !== this.carBox.actionManager) {
                this.carBox.actionManager.dispose();
            }
            this.carBox.actionManager = null;
            
            for (var index = 0; index < this.spriteArray.length; index += 1) {
                sprite = this.spriteArray[index][1]; 
                sprite.size = 0;
            }
            this.enabled = !1;
            this.nbCheckPoints = 0;
        }

        public resetSprites() 
        {
            var mesh :BABYLON.AbstractMesh, 
                i :number;
            
            for (var index = 0; index < this.carBox._intersectionsInProgress.length; index += 1) {
                mesh = this.carBox._intersectionsInProgress[index];
                i = mesh._intersectionsInProgress.indexOf(this);
                mesh._intersectionsInProgress.splice(i, 1);
            }
            this.carBox._intersectionsInProgress = [];
        }

        public getNbCheckPoints()
        {
            return this.nbCheckPoints
        }
    }
