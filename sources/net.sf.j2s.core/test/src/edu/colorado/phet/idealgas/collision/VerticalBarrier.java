// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 47772 $
 * Date modified : $Date: 2011-01-07 13:53:07 -0600 (Fri, 07 Jan 2011) $
 */
package edu.colorado.phet.idealgas.collision;

import java.awt.geom.Rectangle2D;

/**
 * VerticalBarrier
 *
 * @author Ron LeMaster
 * @version $Revision: 47772 $
 */
public class VerticalBarrier extends Wall {
    private double minHeight;

    public VerticalBarrier( Rectangle2D bounds, Rectangle2D movementBounds ) {
        super( bounds, movementBounds, false );       
    }

    public double getMinHeight() {
        return minHeight;
    }

    public void setMinHeight( double minHeight ) {
        this.minHeight = minHeight;
    }

    @Override
		public void setBounds( Rectangle2D bounds ) {
        if( bounds.getHeight() >= minHeight ) {
            super.setBounds( bounds );
        }
    }

}
