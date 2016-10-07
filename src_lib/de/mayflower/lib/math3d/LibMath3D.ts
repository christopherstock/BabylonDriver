
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

        /*****************************************************************************
        *   Creates a box.
        *****************************************************************************/
        public static createBox
        (
            id              :string,
            position        :BABYLON.Vector3,
            width           :number,
            height          :number,
            depth           :number,
            material        :BABYLON.Material,
            scene           :BABYLON.Scene
        )
        :BABYLON.Mesh
        {
            var box:BABYLON.Mesh = BABYLON.Mesh.CreateBox
            (
                id,
                {
                    width:  width,
                    height: height,
                    depth:  depth,
                },
                scene
            );

            box.position        = position;

            box.position.x += width  / 2;
            box.position.y += height / 2;
            box.position.z += depth  / 2;

            box.checkCollisions = true;
            box.material        = material;
            box.receiveShadows  = false;

            //box.rotate( rotationAxis, rotationAmount, BABYLON.Space.WORLD );

            return box;
        }
    }
