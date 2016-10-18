
    /************************************************************************************
    *   Represents the checkpoint system .. not a single checkpoint!
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ************************************************************************************/
    class MfgCheckpoint
    {
        private static      nbCheckPoints                   :number                     = null;

        public              scene                           :BABYLON.Scene              = null;
        public              carBox                          :BABYLON.AbstractMesh       = null;
        public              ground                          :MfgGround3D                = null;
        public              poiPath                         :string                     = null;
        public              poiMeshName                     :string                     = null;
        public              spriteFile                      :string                     = null;
        public              nbSprites                       :number                     = null;
        public              spriteSize                      :number                     = null;
        public              checkpointsCallback             :() => void                 = null;
        public              onLoadFinished                  :() => void                 = null;
        public              enabled                         :boolean                    = null;

        //TODO separate into separate mesh and sprite arrays
        private             spriteArray                     :any                        = null;

        public constructor(
            scene:BABYLON.Scene,
            carMesh:BABYLON.AbstractMesh,
            poiPath:string,
            poiMeshName:string,
            file:string,
            nbSprites:number,
            spriteSize:number,
            h
        )
        {
            h = h || {};
            this.scene = scene;
            this.carBox = carMesh;
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

            MfgInit.preloader.setLoadingMessage("placing checkpoints");

            this.spriteArray = [];
            MfgCheckpoint.nbCheckPoints = 0;
            
            sm = new BABYLON.SpriteManager("POImanager", this.spriteFile, this.nbSprites, this.spriteSize, this.scene);
            BABYLON.SceneLoader.ImportMesh(
                "", 
                this.poiPath, 
                this.poiMeshName, 
                this.scene, 
                function (meshes :BABYLON.AbstractMesh[]) {
                    for ( var i = 0; i < meshes.length; i += 1 )
                    {
                        if ( null !== meshes[i].getVerticesData( BABYLON.VertexBuffer.PositionKind ) )
                        {
                            MfgInit.app.mfgScene.ground3D._moveAndScaleMesh(meshes[i]);
                            sprite = new BABYLON.Sprite("poi", sm); 
                            sprite.size = 0;
                            sprite.position = meshes[i].position;
                            self.spriteArray.push([meshes[i], sprite]);
                            MfgCheckpoint.nbCheckPoints += 1;
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

        public enableSprites()
        {
            var mesh        :BABYLON.AbstractMesh;
            var sprite      :BABYLON.Sprite;
            var self        :MfgCheckpoint             = this;
            var action      :BABYLON.ExecuteCodeAction;
            var callback    :() => void;

            if (null !== this.carBox.actionManager) {
                this.carBox.actionManager.dispose();
            }
            this.carBox.actionManager = new BABYLON.ActionManager(this.scene);
            
            callback = function ()
            {
                var e = this.triggerOptions.parameter;
                if ( self.spriteArray[ e.index ][ 1 ].size > 0 )
                {
                    self.spriteArray[ e.index ][ 1 ].size = 0;
                    MfgCheckpoint.nbCheckPoints -= 1;
                    self.checkpointsCallback();
                }
            };
            MfgCheckpoint.nbCheckPoints = 0;

            for ( var i = 0; i < this.spriteArray.length; i += 1 )
            {
                mesh   = this.spriteArray[ i ][ 0 ];
                sprite = this.spriteArray[ i ][ 1 ];


                // property 'index' does not exist!
                mesh.index = i;


                sprite.size = 10;
                action = new BABYLON.ExecuteCodeAction(
                    {
                        trigger:   BABYLON.ActionManager.OnIntersectionEnterTrigger,
                        parameter: mesh
                    }, 
                    callback
                );
                this.carBox.actionManager.registerAction(action); 
                MfgCheckpoint.nbCheckPoints += 1;
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
            
            for (var index = 0; index < this.spriteArray.length; index += 1)
            {
                sprite = this.spriteArray[ index ][ 1 ];
                sprite.size = 0;
            }
            this.enabled = !1;
            MfgCheckpoint.nbCheckPoints = 0;
        }

        public resetSprites() 
        {
            var mesh:BABYLON.AbstractMesh;

            for ( var i:number = 0; i < this.carBox._intersectionsInProgress.length; i += 1 )
            {
                mesh = this.carBox._intersectionsInProgress[ i ];

                var foundIndex = mesh._intersectionsInProgress.indexOf( this );

                mesh._intersectionsInProgress.splice( foundIndex, 1 );
            }
            this.carBox._intersectionsInProgress = [];
        }

        public static getNbCheckPoints()
        {
            return MfgCheckpoint.nbCheckPoints
        }
    }
