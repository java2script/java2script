// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.util;

import java.awt.Color;

import edu.colorado.phet.common.phetcommon.view.util.ColorUtils;

/**
 * Range for a color, with interpolation.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class ColorRange {

    private final Color min, max;

    public ColorRange( Color min, Color max ) {
        this.min = min;
        this.max = max;
    }

    public Color getMin() {
        return min;
    }

    public Color getMax() {
        return max;
    }

    /**
     * Performs a linear interpolation between min and max colors in RGBA colorspace.
     *
     * @param distance 0-1 (0=min, 1=max)
     * @return
     */
    public Color interpolateLinear( double distance ) {
        if ( distance < 0 || distance > 1 ) {
            throw new IllegalArgumentException( "distance out of range: " + distance );
        }
        return ColorUtils.interpolateRBGA( min, max, distance );
    }
}
