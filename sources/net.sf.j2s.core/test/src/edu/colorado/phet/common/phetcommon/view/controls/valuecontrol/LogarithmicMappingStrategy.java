// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.view.controls.valuecontrol;


/**
 * LogarithmicMappingStrategy performs a logarithmic (base 10)
 * mapping between slider and model coordinates.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class LogarithmicMappingStrategy extends AbstractMappingStrategy {

    private final double _logMin, _logMax, _logRange;
    private final double _scalingFactor;

    /**
     * Constructor.
     *
     * @param modelMin
     * @param modelMax
     * @param sliderMin
     * @param sliderMax
     * @throws IllegalArgumentException if modelMin and modelMax have different signs
     */
    public LogarithmicMappingStrategy( double modelMin, double modelMax, int sliderMin, int sliderMax ) {
        super( modelMin, modelMax, sliderMin, sliderMax );

        if ( modelMin < 0 && modelMax > 0 || modelMin > 0 && modelMax < 0 ) {
            throw new IllegalArgumentException( "modelMin and modelMax must have the same sign" );
        }

        /* 
        * This implementation is well-behaved for abs(modelMin) >= 1.
        * To support cases where abs(modelMin) < 1, we'll use a
        * scaling factor to adjust the model range and results.
        */
        _scalingFactor = ( Math.abs( modelMin ) < 1 ) ? ( 1 / Math.abs( modelMin ) ) : 1;

        _logMin = adjustedLog10( modelMin * _scalingFactor );
        _logMax = adjustedLog10( modelMax * _scalingFactor );
        _logRange = _logMax - _logMin;
    }

    /**
     * Converts from slider to model coordinates.
     *
     * @param sliderValue slider value
     * @return model value
     */
    @Override
		public double sliderToModel( int sliderValue ) {
        double modelValue = 0;
        // Handle min and max specially to avoid precision errors
        if ( sliderValue == getSliderMin() ) {
            modelValue = getModelMin();
        }
        else if ( sliderValue == getSliderMax() ) {
            modelValue = getModelMax();
        }
        else {
            int resolution = getSliderMax() - getSliderMin();
            double ratio = _logRange / resolution;
            double pos = ( sliderValue - getSliderMin() ) * ratio;
            double adjustedPos = _logMin + pos;
            if ( adjustedPos >= 0 ) {
                modelValue = Math.pow( 10.0, adjustedPos ) / _scalingFactor;
            }
            else {
                modelValue = -Math.pow( 10.0, -adjustedPos ) / _scalingFactor;
            }
            if ( modelValue < getModelMin() ) {
                modelValue = getModelMin();
                System.err.println( "WARNING: LogarithmicSliderStrategy.sliderToModel, modelValue too small, clamping to " + modelValue );
            }
            else if ( modelValue > getModelMax() ) {
                modelValue = getModelMax();
                System.err.println( "WARNING: LogarithmicSliderStrategy.sliderToModel, modelValue too big, clamping to " + modelValue );
            }
        }
        return modelValue;
    }

    /**
     * Converts from model to slider coordinates.
     *
     * @param modelValue model value
     * @return slider value
     */
    @Override
		public int modelToSlider( double modelValue ) {
        int sliderValue = 0;
        // Handle min and max specially to avoid precision errors
        if ( modelValue == getModelMin() ) {
            sliderValue = getSliderMin();
        }
        else if ( modelValue == getModelMax() ) {
            sliderValue = getSliderMax();
        }
        else {
            int resolution = getSliderMax() - getSliderMin();
            double logModelValue = adjustedLog10( modelValue * _scalingFactor );
            sliderValue = getSliderMin() + (int) ( ( resolution * ( logModelValue - _logMin ) / _logRange ) );
            if ( sliderValue < getSliderMin() ) {
                sliderValue = getSliderMin();
                System.err.println( "WARNING: LogarithmicSliderStrategy.modelToSlider, sliderValue too small, clamping to " + sliderValue );
            }
            else if ( sliderValue > getSliderMax() ) {
                sliderValue = getSliderMax();
                System.err.println( "WARNING: LogarithmicSliderStrategy.modelToSlider, sliderValue too big, clamping to " + sliderValue );
            }
        }
        return sliderValue;
    }

    /* Handles log10 of zero and negative values. */
    private static double adjustedLog10( double d ) {
        double value = 0;
        if ( d > 0 ) {
            value = log10( d );
        }
        else if ( d < 0 ) {
            value = -log10( -d );
        }
        return value;
    }

    /* Log base 10 */
    private static double log10( double d ) {
        return Math.log( d ) / Math.log( 10.0 );
    }
}