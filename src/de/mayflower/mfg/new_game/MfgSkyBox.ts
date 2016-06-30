
    /************************************************************************************
    *   Represents the surrounding SkyBox.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ************************************************************************************/
    class MfgSkyBox
    {
        /************************************************************************************
        *   The singleton instance of the skybox.
        ************************************************************************************/
        public          static      skyBox              :MfgSkyBox                      = null;

        /************************************************************************************
        *   Creates the skybox with a constant setting.
        ************************************************************************************/
        public constructor( scene:BABYLON.Scene )
        {
            var box      = BABYLON.Mesh.CreateBox(       "skyBox", 1e3, scene );
            var material = new BABYLON.StandardMaterial( "skyBox",      scene );

            material.backFaceCulling                   = !1;
            material.reflectionTexture                 = new BABYLON.CubeTexture( "res/image/skybox/skybox", scene );
            material.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
            material.diffuseColor                      = new BABYLON.Color3( 0, 0, 0 );
            material.specularColor                     = new BABYLON.Color3( 0, 0, 0 );

            box.material = material;
        };
    }
