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

import java.awt.Graphics2D;
import java.awt.RenderingHints;

/**
 * Convenience class for common rendering options.
 *
 * @author ?
 * @version $Revision: 54200 $
 */
public class BasicGraphicsSetup implements GraphicsSetup {
    RenderingHints renderingHints;

    public BasicGraphicsSetup() {
        this.renderingHints = new RenderingHints( null );
        setAntialias( true );
        setBicubicInterpolation();
    }

    public void setAntialias( boolean antialias ) {
        if ( antialias ) {
            renderingHints.put( RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON );
        }
        else {
            renderingHints.put( RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_OFF );
        }
    }

    public void setBicubicInterpolation() {
        renderingHints.put( RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BICUBIC );
    }

    public void setNearestNeighborInterpolation() {
        renderingHints.put( RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_NEAREST_NEIGHBOR );
    }

    public void setBilinearInterpolation() {
        renderingHints.put( RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR );
    }

    public void setRenderQuality( boolean quality ) {
        if ( quality ) {
            renderingHints.put( RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY );
        }
        else {
            renderingHints.put( RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_SPEED );
        }
    }

    @Override
		public void setup( Graphics2D graphics ) {
        graphics.setRenderingHints( renderingHints );
    }

}
