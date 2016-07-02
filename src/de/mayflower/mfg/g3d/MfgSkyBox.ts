
    /************************************************************************************
    *   Represents the surrounding SkyBox.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ************************************************************************************/
    class MfgSkyBox
    {
        /** The box mesh. */
        private                     box                     :BABYLON.Mesh                   = null;

        /************************************************************************************
        *   Creates the skybox with a constant setting.
        *
        *   @param scene The scene to add the skybox to.
        ************************************************************************************/
        public constructor( scene:BABYLON.Scene )
        {
            this.box = BABYLON.Mesh.CreateBox( "skyBox", MfgSettings.SIZE_SKYBOX, scene );
            this.createBoxMaterial( scene );
        }

        /************************************************************************************
        *   Creates and sets the material for the skybox.
        *
        *   @param scene The scene to add the skybox to.
        ************************************************************************************/
        private createBoxMaterial( scene:BABYLON.Scene )
        {
            var boxMaterial:BABYLON.StandardMaterial = new BABYLON.StandardMaterial( "skyBox",      scene );

            boxMaterial.backFaceCulling                   = false;
            boxMaterial.reflectionTexture                 = new BABYLON.CubeTexture(
                MfgSettings.PATH_IMAGE_SKYBOX + "skybox",
                scene
            );
            boxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
            boxMaterial.diffuseColor                      = new BABYLON.Color3( 0, 0, 0 );
            boxMaterial.specularColor                     = new BABYLON.Color3( 0, 0, 0 );

            this.box.material = boxMaterial;
        }
    }
