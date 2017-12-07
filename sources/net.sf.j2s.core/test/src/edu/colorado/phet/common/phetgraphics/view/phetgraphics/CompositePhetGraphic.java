// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 54200 $
 * Date modified : $Date: 2011-07-18 19:45:40 -0500 (Mon, 18 Jul 2011) $
 */
package edu.colorado.phet.common.phetgraphics.view.phetgraphics;

import java.awt.Component;
import java.awt.Point;

/**
 * This is a type of GraphicLayer set that is different from GraphicLayerSet in
 * the way it handles interaction. Whereas a GraphicLayerSet responds to the
 * getHandler( Point p ) message by delegating it to the PhetGraphics it contains,
 * CompositePhetGraphic responds to the message itself.
 *
 * @author ?
 * @version $Revision: 54200 $
 */
public class CompositePhetGraphic extends GraphicLayerSet {

    public CompositePhetGraphic( Component component ) {
        super( component );
    }

    /**
     * Tells if this object contains a specified point, for purposes of
     * event handling.
     *
     * @param p The specified point.
     * @return The PhetGraphic responsible for handling the event.
     */
    @Override
		protected PhetGraphic getHandler( Point p ) {
        if ( getIgnoreMouse() == false && contains( p.x, p.y ) ) {
            return this;
        }
        else {
            return null;
        }
    }

    //---------------------------------------------------------
    // For Java Beans conformance
    //---------------------------------------------------------

    public CompositePhetGraphic() {
    }
}