
    /************************************************************************************
    *   Represents the tree model.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ************************************************************************************/
    class MfgTree extends BABYLON.Mesh
    {
        public                      material                    :BABYLON.StandardMaterial           = null;
        public                      trunk                       :BABYLON.Mesh                       = null;

        /************************************************************************************
        *   Creates a new tree mesh.
        ************************************************************************************/
        public constructor( e, t, i, s )
        {
            //this will be replaced by extending BABYLON.Mesh
            //Tree.prototype = Object.create(BABYLON.Mesh.prototype);


            super( 'tree', s, null, null);

            BABYLON.Mesh.call( this, "tree", s );

            this._init( e );

            // colors that don't appear?
            this.material = new BABYLON.StandardMaterial(
                "mat",
                s
            );

            this.material.diffuseColor = BABYLON.Color3.FromInts( 0, 0, 0 );

            this.material.specularColor = BABYLON.Color3.Black();

            this.position.y = t + e / 2 - 2;

            this.trunk = BABYLON.Mesh.CreateCylinder( "trunk", t, 1 > i - 2 ? 1 : i - 2, i, 7, 2, s );
            this.trunk.parent     = this;
            this.trunk.position.y = -e / 2 + 2 - t / 2;

            var standardMaterial:BABYLON.StandardMaterial = new BABYLON.StandardMaterial( "trunk", s );
            standardMaterial.diffuseColor  = BABYLON.Color3.FromInts( 0, 0, 0 );
            standardMaterial.specularColor = BABYLON.Color3.Black();

            this.trunk.material = standardMaterial;

            this.trunk.convertToFlatShadedMesh();

            //void 0 !== o && (o.getShadowMap().renderList.push( this ), o.getShadowMap().renderList.push(this.trunk))
        }

        /************************************************************************************
        *   Seems to initialize all trees..?
        ************************************************************************************/
        public _init( e ) : void
        {
            var t = BABYLON.VertexData.CreateSphere( 2, e );
            t.applyToMesh( this, !1 );
            var a, i = this.getVerticesData(BABYLON.VertexBuffer.PositionKind), s = this.getIndices(), o = i.length / 3, n = [], r = [], h = [];
            for (a = 0; o > a; a++) {
                var l = new BABYLON.Vector3(i[3 * a], i[3 * a + 1], i[3 * a + 2]);
                l.y >= e / 2 && r.push(l);
                var c, d = !1;
                for (c = 0; c < n.length && !d; c++) {
                    h = n[c];
                    var u = h[0];
                    (u.equals(l) || u.subtract(l).lengthSquared() < .01) && (h.push(3 * a), d = !0)
                }
                d || (h = [], h.push(l, 3 * a), n.push(h))
            }

            var p = function (e, t) {
                if (e === t)return e;
                var i = Math.random();
                return i * (t - e) + e
            };

            n.forEach(
                function (t)
                {
                    var s, o = -e / 10, n = e / 10, r = p(o, n), a = p(o, n), h = p(o, n);
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
