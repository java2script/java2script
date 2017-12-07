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

import java.awt.geom.Line2D;
import java.awt.geom.Point2D;
import java.awt.geom.Rectangle2D;

/**
 * WallDescriptor
 * <p/>
 * Describes the contact bounds of a wall, and line segments that constitute those bounds
 * <p/>
 * The descriptor contains line segments that represent a rectangle around the wall that
 * a particle's center of mass would be inside of if the particle were to be in contact
 * with the wall. The line segments are labeled according to the corners of that rectangle
 * that they connect.
 * A is the upper left corner of the wall
 * B is the upper right corner of the wall
 * C is the lower right corner of the wall
 * D is the lower left corner of the wall
 *
 * @author Ron LeMaster
 * @version $Revision: 47772 $
 */
class WallDescriptor implements Wall.ChangeListener {
    Rectangle2D.Double contactBounds;
    Line2D.Double AB;
    Line2D.Double BC;
    Line2D.Double CD;
    Line2D.Double AD;
    private double contactRadius;

    /**
     * @param wall
     * @param contactRadius The radius of the particles that are hitting the wall
     */
    WallDescriptor( Wall wall, double contactRadius ) {
        this.contactRadius = contactRadius;
        computeDescriptor( wall );
        wall.addChangeListener( this );
    }

    private void computeDescriptor( Wall wall ) {
        contactBounds = new Rectangle2D.Double( wall.getBoundsNoCopy().getMinX() - contactRadius,
                                                wall.getBoundsNoCopy().getMinY() - contactRadius,
                                                wall.getBoundsNoCopy().getWidth() + 2 * contactRadius,
                                                wall.getBoundsNoCopy().getHeight() + 2 * contactRadius );
        Point2D A = new Point2D.Double( contactBounds.getMinX(),
                                        contactBounds.getMinY() );
        Point2D B = new Point2D.Double( contactBounds.getMaxX(),
                                        contactBounds.getMinY() );
        Point2D C = new Point2D.Double( contactBounds.getMaxX(),
                                        contactBounds.getMaxY() );
        Point2D D = new Point2D.Double( contactBounds.getMinX(),
                                        contactBounds.getMaxY() );

        AB = new Line2D.Double( A, B );
        BC = new Line2D.Double( B, C );
        CD = new Line2D.Double( C, D );
        AD = new Line2D.Double( A, D );
    }

    @Override
		public void wallChanged( Wall.ChangeEvent event ) {
        computeDescriptor( event.getWall() );
    }

}
