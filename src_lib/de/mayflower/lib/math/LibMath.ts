
    /*****************************************************************************
    *   Offers general arithmetic functionality.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class LibMath
    {
        /*****************************************************************************
        *   Returns an integer number of the specified range.
        *
        *   @param  from    Start of the range.
        *   @param  to      End of the range.
        *   @return         An integer number in between the specified range.
        *****************************************************************************/
        public static getRandomInt( from:number, to:number ):number
        {
            return Math.floor( ( Math.random() * ( to - from ) ) + from );
        }

        public static toEulerAngles( e )
        {
            // fix this gnarly syntax!
            var t, i, s, o, n, h, a, r, l, c, d, p;
            return t = BABYLON.Vector3.Zero(), i = e.x, s = e.y, o = e.z, n = e.w, h = i * i, a = s * s, r = o * o, l = Math.atan2(2 * (s * n - i * o), 1 - 2 * (a + r)), c = Math.asin(2 * (i * s + o * n)), d = Math.atan2(2 * (i * n - s * o), 1 - 2 * (h + r)), p = i * s + o * n, p > .499 ? (l = 2 * Math.atan2(i, n), d = 0) : -.499 > p && (l = -2 * Math.atan2(i, n), d = 0), t.x = c, t.y = l, t.z = d, t
        }

        public static getMinMaxBox( e )
        {
            var s, o, n, h, a, r, t = null, i = null;
            for (s = 1; s < e.length; s += 1)o = e[s], n = o.getBoundingInfo().boundingBox, h = BABYLON.Matrix.RotationYawPitchRoll(o.rotation.y, o.rotation.x, o.rotation.z), a = BABYLON.Vector3.TransformCoordinates(n.minimumWorld, h), r = BABYLON.Vector3.TransformCoordinates(n.maximumWorld, h), t ? (t.MinimizeInPlace(a), i.MaximizeInPlace(r)) : (t = a, i = r);
            return [ t, i ]
        }
    }
