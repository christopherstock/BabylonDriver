
    /*****************************************************************************
    *   Specifies all adjustments and balancings for the application.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class MfgSetting
    {
        /** The switch that enables debug mode. */
        public      static      DEBUG_MODE                                  :boolean            = true;

        /** The application's internal name. */
        public      static      TITLE                                       :string             = "Babylon.js Driver, (c) 2016 Mayflower GmbH, v.0.0.1";

        /** The size of the skypox. */
        public      static      SIZE_SKYBOX                                 :number             = 2000;

        /** The relative path from index.html where all images the app makes use of reside. */
        public      static      PATH_IMAGE_SKYBOX                           :string             = "res/image/skybox/";

        /** Car startup position X. */
        public      static      CAR_STARTUP_X                               :number             = -19.0;
        /** Car startup position Y. */
        public      static      CAR_STARTUP_Y                               :number             = -14.0;
        /** Car startup position Z. */
        public      static      CAR_STARTUP_Z                               :number             = 60.0;

        /** The gravity z of the physical world. */
        public      static      WORLD_GRAVITY_Z                             :number             = -9.82;

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

        public      static      FEATURE_3D_GROUND                           :boolean            = true;
        public      static      FEATURE_3D_BUILDINGS                        :boolean            = false;
        public      static      FEATURE_TREES                               :boolean            = false;
        public      static      FEATURE_PARTICLE_SYSTEM                     :boolean            = false;
        public      static      FEATURE_SOLID_BUILDINGS                     :boolean            = false;
        public      static      FEATURE_WATER                               :boolean            = false;
        public      static      FEATURE_CHECKPOINTS                         :boolean            = false;
    }
