
function Tree( e, t, i, s )
{
    "use strict";

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
    var a = BABYLON.Mesh.CreateCylinder( "trunk", t, 1 > i - 2 ? 1 : i - 2, i, 7, 2, s );
    a.parent     = this;
    a.position.y = -e / 2 + 2 - t / 2;
    a.material   = new BABYLON.StandardMaterial( "trunk", s );

    a.material.diffuseColor  = BABYLON.Color3.FromInts( 0, 0, 0 );

    a.material.specularColor = BABYLON.Color3.Black();

    a.convertToFlatShadedMesh();

    this.trunk = a;

    //void 0 !== o && (o.getShadowMap().renderList.push( this ), o.getShadowMap().renderList.push(this.trunk))
}

Tree.prototype = Object.create(BABYLON.Mesh.prototype);

Tree.prototype.constructor = Tree;

Tree.prototype._init = function ( e )
{
    "use strict";
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
