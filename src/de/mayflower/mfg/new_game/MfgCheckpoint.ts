
    /************************************************************************************
    *   Represents the checkpoints.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ************************************************************************************/
    class MfgCheckpoint
    {
        public                scene                             :any                    = null;
        public                carBox                            :any                    = null;
        public                ground                            :any                    = null;
        public                poiPath                           :any                    = null;
        public                poiMesh                           :any                    = null;
        public                spriteFile                        :any                    = null;
        public                nbSprites                         :any                    = null;
        public                spriteSize                        :any                    = null;
        public                msgCallback                       :any                    = null;
        public                chekpointsCallback                :any                    = null;
        public                onLoadFinished                    :any                    = null;
        public                enabled                           :any                    = null;
        public                spriteArray                       :any                    = null;
        public                nbCheckPoints                     :any                    = null;

        public constructor( e, t, i, s, o, n, r, a, h )
        {
            h = h || {};
            this.scene = e;
            this.carBox = t;
            this.ground = i;
            this.poiPath = s;
            this.poiMesh = o;
            this.spriteFile = n;
            this.nbSprites = r;
            this.spriteSize = a;
            this.msgCallback = "function" == typeof h.msgCallback ? h.msgCallback : null;
            this.chekpointsCallback = "function" == typeof h.chekpointsCallback ? h.chekpointsCallback : null;
            this.onLoadFinished = "function" == typeof h.onLoadFinished ? h.onLoadFinished : null;
            this.enabled = !1;
            this.carBox.actionManager = null
        }

        public load()
        {
            var e, t, i, s, o;
            this.msgCallback && this.msgCallback("place checkpoints..."), this.spriteArray = [], this.nbCheckPoints = 0, e = new BABYLON.SpriteManager("POImanager", this.spriteFile, this.nbSprites, this.spriteSize, this.scene), t = this, BABYLON.SceneLoader.ImportMesh("", this.poiPath, this.poiMesh, this.scene, function (n) {
                for (i = 0; i < n.length; i += 1)s = n[i].getVerticesData(BABYLON.VertexBuffer.PositionKind), null !== s && (t.ground._moveAndScaleMesh(n[i]), o = new BABYLON.Sprite("poi", e), o.size = 0, o.position = n[i].position, t.spriteArray.push([n[i], o]), t.nbCheckPoints += 1);
                t.onLoadFinished()
            })
        }

        public isEnabled()
        {
            return this.enabled
        }

        public enableSprites()
        {
            var e, t, i, s, o, n;
            for (null !== this.carBox.actionManager && this.carBox.actionManager.dispose(), this.carBox.actionManager = new BABYLON.ActionManager(this.scene), n = function () {
                var e = this.triggerOptions.parameter;
                s.spriteArray[e.index][1].size > 0 && (s.spriteArray[e.index][1].size = 0, s.nbCheckPoints -= 1, s.chekpointsCallback())
            }, this.nbCheckPoints = 0, e = 0; e < this.spriteArray.length; e += 1)t = this.spriteArray[e][0], i = this.spriteArray[e][1], t.index = e, i.size = 10, s = this, o = new BABYLON.ExecuteCodeAction({
                trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
                parameter: t
            }, n), this.carBox.actionManager.registerAction(o), s.nbCheckPoints += 1;
            this.enabled = !0
        }

        public disableSprites()
        {
            var e, t;
            for (null !== this.carBox.actionManager && (this.carBox.actionManager.dispose(), this.carBox.actionManager = null), e = 0; e < this.spriteArray.length; e += 1)t = this.spriteArray[e][1], t.size = 0;
            this.enabled = !1, this.nbCheckPoints = 0
        }

        public resetSprites()
        {
            var e, t, i;
            for (e = 0; e < this.carBox._intersectionsInProgress.length; e += 1)t = this.carBox._intersectionsInProgress[e], i = t._intersectionsInProgress.indexOf(this), t._intersectionsInProgress.splice(i, 1);
            this.carBox._intersectionsInProgress = []
        }

        public getNbCheckPoints()
        {
            return this.nbCheckPoints
        }
    }
