// Copyright 2002-2012, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: olsonj $
 * Revision : $Revision: 66113 $
 * Date modified : $Date: 2012-07-21 04:27:33 -0500 (Sat, 21 Jul 2012) $
 */
package edu.colorado.phet.common.mechanics;

import java.awt.geom.Point2D;

import edu.colorado.phet.common.phetcommon.math.vector.MutableVector2D;

/**
 * DefaultBody
 * <p/>
 * A concrete extension of Body that provides default implementations
 * of teh abstract methods in Body.
 *
 * @author Ron LeMaster
 * @version $Revision: 66113 $
 */
public class DefaultBody extends Body {

    protected DefaultBody() {
        super();
    }

    protected DefaultBody( Point2D location, MutableVector2D velocity, MutableVector2D acceleration, double mass, double charge ) {
        super( location, velocity, acceleration, mass, charge );
    }

    @Override
		public Point2D getCM() {
        return null;
    }

    @Override
		public double getMomentOfInertia() {
        return 0;
    }
}
