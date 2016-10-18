
    /*****************************************************************************
    *   Offers arithmetic functionality for 3D operations.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class LibMath3D
    {
        /*****************************************************************************
        *   Creates a copy of the specified mesh.
        *
        *   @param scene The scene for the new mesh to appear in.
        *   @param e     The original mesh to copy.
        *   @param t     The new name for the copied mesh.
        *   @param i     The initial scaling for the new mesh.
        *****************************************************************************/
        public static copyMesh( scene:BABYLON.Scene, e:BABYLON.Mesh, t:string, i:BABYLON.Vector3 )
        {
            var s = new BABYLON.Mesh( t, scene, e.parent );
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
            x               :number,
            y               :number,
            z               :number,
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

            box.position = new BABYLON.Vector3( x, y, z );

            box.position.x += width  / 2;
            box.position.y += height / 2;
            box.position.z += depth  / 2;

            box.checkCollisions = true;
            box.material        = material;
            box.receiveShadows  = false;

            //box.rotate( rotationAxis, rotationAmount, BABYLON.Space.WORLD );

            var cannonBox  = new CANNON.Box( new CANNON.Vec3( width / 2, depth / 2, height / 2 ) );
            var cannonBody = new CANNON.Body(
                {
                    mass:       0,
//                    material:   MfgInit.app.mfgScene.world.groundMaterial
                }
            );
            cannonBody.addShape(cannonBox);
            cannonBody.collisionFilterGroup = MfgWorld.GROUP1;
            cannonBody.collisionFilterMask  = MfgWorld.GROUP2;
            cannonBody.position.set( x + width / 2, z + depth / 2, y + height / 2 );

            MfgInit.app.mfgScene.world.world.addBody( cannonBody );

            return box;
        }
    }
