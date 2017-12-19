// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.view.controls.valuecontrol;


/**
 * AbstractMappingStrategy is the base class for all classes that provide a mapping
 * between slider values (integer precision) and model values (double precision).
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public abstract class AbstractMappingStrategy {

    private double _modelMin, _modelMax;
    private final int _sliderMin, _sliderMax; // immutable

    /**
     * Constructor.
     *
     * @param modelMin
     * @param modelMax
     * @param sliderMin
     * @param sliderMax
     */
    public AbstractMappingStrategy( double modelMin, double modelMax, int sliderMin, int sliderMax ) {
        if ( !( sliderMin < sliderMax ) ) {
            throw new IllegalArgumentException( "sliderMin (" + sliderMin + ") must be < sliderMax (" + sliderMax + ")" );
        }
        setModelRange( modelMin, modelMax );
        _sliderMin = sliderMin;
        _sliderMax = sliderMax;
    }

    public void setModelRange( double modelMin, double modelMax ) {
        if ( !( modelMin < modelMax ) ) {
            throw new IllegalArgumentException( "modelMin (" + modelMin + ") must be < modelMax (" + modelMax + ")" );
        }
        _modelMin = modelMin;
        _modelMax = modelMax;
    }

    public double getModelRange() {
        return _modelMax - _modelMin;
    }

    public double getModelMin() {
        return _modelMin;
    }

    public double getModelMax() {
        return _modelMax;
    }

    public int getSliderMin() {
        return _sliderMin;
    }

    public int getSliderMax() {
        return _sliderMax;
    }

    public int getSliderRange() {
        return _sliderMax - _sliderMin;
    }

    @Override
		public String toString() {
        return getClass().getName() +
               " modelMin=" + _modelMin + " modelMax=" + _modelMax +
               " sliderMin=" + _sliderMin + " sliderMax=" + _sliderMax;
    }

    public int modelToSliderDelta( double modelDelta ) {
        return modelToSlider( modelDelta ) - modelToSlider( 0 );
    }

    /**
     * Converts from slider value to model value.
     *
     * @param sliderValue slider value
     * @return model value
     */
    public abstract double sliderToModel( int sliderValue );


    /**
     * Converts from model value to slider value.
     *
     * @param modelValue model value
     * @return slider value
     */
    public abstract int modelToSlider( double modelValue );
}
