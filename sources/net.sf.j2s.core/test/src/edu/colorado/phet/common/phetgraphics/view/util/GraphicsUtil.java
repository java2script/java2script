// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 54200 $
 * Date modified : $Date: 2011-07-18 19:45:40 -0500 (Mon, 18 Jul 2011) $
 */
package edu.colorado.phet.common.phetgraphics.view.util;

import java.awt.AlphaComposite;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.geom.AffineTransform;
import java.awt.geom.Rectangle2D;

/**
 * GraphicsUtil
 *
 * @author ?
 * @version $Revision: 54200 $
 */
public class GraphicsUtil {

    /**
     * Sets the alpha for a Graphics2D
     *
     * @param g2
     * @param alpha
     */
    public static void setAlpha( Graphics2D g2, double alpha ) {
        g2.setComposite( AlphaComposite.getInstance( AlphaComposite.SRC_OVER, (float) alpha ) );
    }

    /**
     * Creates an AffineTransform that scales about a specified point
     *
     * @param scale
     * @param x
     * @param y
     * @return the scaled transform.
     */
    public static AffineTransform scaleInPlaceTx( double scale, double x, double y ) {
        AffineTransform atx = new AffineTransform();
        return scaleInPlaceTx( atx, scale, x, y );
    }

    /**
     * Sets up an AffineTransform to scale about a specified point
     *
     * @param atx
     * @param scale
     * @param x
     * @param y
     * @return the scaled transform.
     */
    public static AffineTransform scaleInPlaceTx( AffineTransform atx,
                                                  double scale, double x, double y ) {
        atx.setToIdentity();
        atx.translate( x, y );
        atx.scale( scale, scale );
        atx.translate( -x, -y );
        return atx;
    }

    /**
     * Sets anti-aliasing on for a specified Graphics2D
     *
     * @param g2
     * @return the Graphics2D with the hint set
     */
    public static Graphics2D setAntiAliasingOn( Graphics2D g2 ) {
        g2.setRenderingHint( RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON );
        return g2;
    }

    /**
     * Gets the bounding rectangle for a string
     *
     * @param str
     * @param g2
     * @return The bounding rectangle
     */
    public static Rectangle2D getStringBounds( String str, Graphics2D g2 ) {
        return g2.getFont().getStringBounds( str, g2.getFontRenderContext() );
    }
}
