// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.view.controls.valuecontrol;


/**
 * LinearMappingStrategy performs a linear mapping between slider and model coordinates.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class LinearMappingStrategy extends AbstractMappingStrategy {

    /**
     * Constructor.
     *
     * @param modelMin
     * @param modelMax
     * @param sliderMin
     * @param sliderMax
     */
    public LinearMappingStrategy( double modelMin, double modelMax, int sliderMin, int sliderMax ) {
        super( modelMin, modelMax, sliderMin, sliderMax );
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
            double ratio = ( sliderValue - getSliderMin() ) / (double) ( getSliderMax() - getSliderMin() );
            modelValue = getModelMin() + ( ratio * ( getModelMax() - getModelMin() ) );
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
            double ratio = ( modelValue - getModelMin() ) / ( getModelMax() - getModelMin() );
            sliderValue = getSliderMin() + (int) ( ratio * ( getSliderMax() - getSliderMin() ) );
        }
        return sliderValue;
    }
}
