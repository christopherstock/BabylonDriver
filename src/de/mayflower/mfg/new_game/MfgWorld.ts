
    /************************************************************************************
    *   Specifies the global physical ambience.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ************************************************************************************/
    class MfgWorld
    {
        public      static      physicsWorld                :MfgWorld                   = null;

        public                  world                       :CANNON.World               = null;
        public                  worldstep                   :number                     = 0;
        public                  timeStep                    :number                     = 0;
        public                  GROUP1                      :number                     = 0;
        public                  GROUP2                      :number                     = 0;
        public                  groundMaterial              :CANNON.Material            = null;
        public                  carBodyMaterial             :CANNON.Material            = null;
        public                  bodyGroundContactMaterial   :CANNON.ContactMaterial     = null;

        /************************************************************************************
        *   Creates a constant instance of the physical ambience.
        ************************************************************************************/
        public constructor()
        {
            this.world                      = new CANNON.World;
            this.world.broadphase           = new CANNON.NaiveBroadphase;

            this.world.solver.iterations    = 10;
            this.world.gravity.set( 0, 0, -9.82 );

            this.worldstep                  = 2;
            this.timeStep                   = 1 / 60;
            this.GROUP1                     = 1;
            this.GROUP2                     = 2;
            this.groundMaterial             = new CANNON.Material( "groundMaterial"  );
            this.carBodyMaterial            = new CANNON.Material( "carBodyMaterial" );
            this.bodyGroundContactMaterial  = new CANNON.ContactMaterial(
                this.groundMaterial,
                this.carBodyMaterial,
                {
                    friction:    .01,
                    restitution: 0
                }
            );
            this.world.addContactMaterial( this.bodyGroundContactMaterial );
        }
    }
