
    /************************************************************************************
    *   Represents the tree model.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ************************************************************************************/
    class MfgTree extends BABYLON.Mesh
    {
        /** The material. */
        public                      material                    :BABYLON.StandardMaterial           = null;

        /** The mesh model. */
        public                      trunk                       :BABYLON.Mesh                       = null;

        /************************************************************************************
        *   Creates a new tree mesh.
        ************************************************************************************/
        public constructor( sizeBranch:number, sizeTrunk:number, sizeRadius:number, scene:BABYLON.Scene )
        {
            super( 'tree', scene, null, null);

            BABYLON.Mesh.call( this, "tree", scene );

            this._init( sizeBranch );

            // colors that don't appear?
            this.material = new BABYLON.StandardMaterial(
                "mat",
                scene
            );

            this.material.diffuseColor = BABYLON.Color3.FromInts( 0, 0, 0 );
            this.material.specularColor = BABYLON.Color3.Black();

            this.position.y = sizeTrunk + sizeBranch / 2 - 2;

            this.trunk = BABYLON.Mesh.CreateCylinder( "trunk", sizeTrunk, 1 > sizeRadius - 2 ? 1 : sizeRadius - 2, sizeRadius, 7, 2, scene );
            this.trunk.parent     = this;
            this.trunk.position.y = -sizeBranch / 2 + 2 - sizeTrunk / 2;

            var standardMaterial:BABYLON.StandardMaterial = new BABYLON.StandardMaterial( "trunk", scene );
            standardMaterial.diffuseColor  = BABYLON.Color3.FromInts( 0, 0, 0 );
            standardMaterial.specularColor = BABYLON.Color3.Black();

            this.trunk.material = standardMaterial;

            this.trunk.convertToFlatShadedMesh();

            //void 0 !== o && (o.getShadowMap().renderList.push( this ), o.getShadowMap().renderList.push(this.trunk))
        }

        /************************************************************************************
        *   Initialize all trees.
        *
        *   @param sizeBranch The size of the branch.
        ************************************************************************************/
        private _init( sizeBranch:number ) : void
        {
            var t = BABYLON.VertexData.CreateSphere( 2, sizeBranch );
            t.applyToMesh( this, !1 );
            var a, i = this.getVerticesData(BABYLON.VertexBuffer.PositionKind), s = this.getIndices(), o = i.length / 3, n = [], r = [], h = [];
            for (a = 0; o > a; a++) {
                var l = new BABYLON.Vector3(i[3 * a], i[3 * a + 1], i[3 * a + 2]);
                l.y >= sizeBranch / 2 && r.push(l);

                var d = false;
                for (var c = 0; c < n.length && !d; c++) {
                    h = n[c];
                    var u = h[0];
                    if (u.equals(l) || u.subtract(l).lengthSquared() < .01)
                    {
                        h.push(3 * a);
                        d = true;
                    }
                }
                if (d)
                {
                    h = [];
                    h.push(l, 3 * a);
                    n.push(h);
                }
            }

            var p = function (e, t) {
                if (e === t)return e;
                var i = Math.random();
                return i * (t - e) + e
            };

            n.forEach(
                function (t)
                {
                    var s, o = -sizeBranch / 10, n = sizeBranch / 10, r = p(o, n), a = p(o, n), h = p(o, n);
                    for (s = 1; s < t.length; s++) {
                        var l = t[s];
                        i[l] += r;
                        i[l + 1] += a;
                        i[l + 2] += h
                    }
                }
            );

            this.setVerticesData( BABYLON.VertexBuffer.PositionKind, i );
            var f = [];

            BABYLON.VertexData.ComputeNormals( i, s, f );

            this.setVerticesData( BABYLON.VertexBuffer.NormalKind, f );
            this.convertToFlatShadedMesh();
        };
    }
