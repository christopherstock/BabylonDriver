
    /*****************************************************************************
    *   Offers arithmetic functionality for 3D operations.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class LibMath3D
    {
        public static copyMesh(scene, e, t, i )
        {
            var s = new BABYLON.Mesh(t, scene, e.parent);
            s.position = new BABYLON.Vector3(e.position.x, e.position.y, e.position.z);
            s.rotation = new BABYLON.Vector3(e.rotation.x, e.rotation.y, e.rotation.z);
            s.scaling = new BABYLON.Vector3(e.scaling.x * i.x, e.scaling.y * i.y, e.scaling.z * i.z);
            s.computeWorldMatrix(!0);
            var o = new BABYLON.VertexData;
            o.positions = [];
            o.indices = [];
            o.normals = [];
            o.uvs = [];
            var a, n = e.getVerticesData(BABYLON.VertexBuffer.PositionKind);
            for (a = 0; a < n.length; a++)o.positions.push(n[a]);
            var r = e.getIndices();
            for (a = 0; a < r.length; a++)o.indices.push(r[a]);
            var d = e.getVerticesData(BABYLON.VertexBuffer.NormalKind);
            for (a = 0; a < d.length; a++)o.normals.push(d[a]);
            o.applyToMesh(s);
            return s;
        }
    }
