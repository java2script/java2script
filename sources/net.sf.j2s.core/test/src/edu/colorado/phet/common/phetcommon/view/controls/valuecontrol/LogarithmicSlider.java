// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.view.controls.valuecontrol;

/**
 * LogarithmicSlider is a JSlider with that provides a logarithmic mapping to model values.
 * <p/>
 * Setting tick marks for this control can be challenging and (unfortunately)
 * requires an understanding of the underlying slider implementation.
 * The underlying slider is based on JSlider, which only supports
 * linearly-spaced tick marks.  So you are limited to using tick marks
 * and labels that are linearly spaced.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class LogarithmicSlider extends AbstractSlider {

    private static final int DEFAULT_SLIDER_RESOLUTION = 1000;

    public LogarithmicSlider( double min, double max ) {
        this( min, max, DEFAULT_SLIDER_RESOLUTION );
    }

    public LogarithmicSlider( double min, double max, int resolution ) {
        super( new LogarithmicMappingStrategy( min, max, 0, resolution ) );
    }
}
