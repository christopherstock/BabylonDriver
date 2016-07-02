
    /************************************************************************************
    *   Manages the app's scene.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ************************************************************************************/
    class MfgScene
    {
        /************************************************************************************
        *   The native scene representation.
        ************************************************************************************/
        public              scene                   :BABYLON.Scene              = null;

        /** The skybox that surrounds the scene. */
        private             skyBox                  :MfgSkyBox                  = null;

        /************************************************************************************
        *   Creates a new instance of the scene.
        ************************************************************************************/
        public constructor( engine:BABYLON.Engine )
        {
            this.scene = new BABYLON.Scene( engine );
            this.scene.clearColor = new BABYLON.Color3( .8, .8, .8 );

            this.skyBox = new MfgSkyBox( this.scene );



        }


    }
