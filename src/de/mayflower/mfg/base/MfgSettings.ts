
    /*****************************************************************************
    *   Specifies all adjustments and balancings for the application.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class MfgSettings
    {
        /** Determines the app's operation mode. */
        public      static      MODE                                        :number             = MfgDebugSettings.MODE_DEBUG;

        /** The application's internal name. */
        public      static      TITLE                                       :string             = "Babylon.js Driver, (c) 2016 Mayflower GmbH, v. [" + MfgVersion.CURRENT_VERSION.getVersionDescriptor() + "]";

        /** The size of the skypox. */
        public      static      SIZE_SKYBOX                                 :string             = 750;

        /** The relative path from index.html where all images the app makes use of reside. */
        public      static      PATH_IMAGE_SKYBOX                           :string             = "res/image/skybox/";








        /** The desired canvas3D width. */
        public      static      CANVAS_WIDTH                                :number             = 800;
        /** The desired canvas3D height. */
        public      static      CANVAS_HEIGHT                               :number             = 600;
        /** The scene's gravity. */
        public      static      GRAVITY                                     :number             = 0.0;      //-0.01;
        /** The relative path from index.html where all sounds the app makes use of reside. */
        public      static      PATH_SOUND                                  :string             = "res/sound/";
        /** The relative path from index.html where all 3d model files the app makes use of reside. */
        public      static      PATH_3DS                                    :string             = "res/3ds/";
        /** The player's x and z dimension (radius). */
        public      static      PLAYER_SIZE_XZ                              :number             = 1.0;
        /** The player's y dimension (height). */
        public      static      PLAYER_SIZE_Y                               :number             = 2.0;








    }
