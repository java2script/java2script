// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.view.controls.valuecontrol;

import java.awt.event.ActionEvent;
import java.awt.event.KeyEvent;

import javax.swing.AbstractAction;
import javax.swing.JSlider;
import javax.swing.KeyStroke;

/**
 * AbstractSlider is the base class for all extensions of JSlider that provide
 * a mapping between slider values (integer precision) and model values (double precision).
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public abstract class AbstractSlider extends JSlider {

    private static final String INCREMENT_ACTION_MAP_KEY = "INCREMENT_ACTION";
    private static final String DECREMENT_ACTION_MAP_KEY = "DECREMENT_ACTION";

    private AbstractMappingStrategy _strategy;
    private double _upDownArrowDelta;

    protected AbstractSlider( AbstractMappingStrategy strategy ) {
        super();
        _strategy = strategy;
        setMinimum( _strategy.getSliderMin() );
        setMaximum( _strategy.getSliderMax() );
        _upDownArrowDelta = getModelRange() / 100;

        // Up and Right arrows increment
        getInputMap().put( KeyStroke.getKeyStroke( KeyEvent.VK_RIGHT, 0, false ), INCREMENT_ACTION_MAP_KEY );
        getInputMap().put( KeyStroke.getKeyStroke( KeyEvent.VK_UP, 0, false ), INCREMENT_ACTION_MAP_KEY );
        AbstractAction incrementAction = new AbstractAction() {
            @Override
						public void actionPerformed( ActionEvent e ) {
                setValue( AbstractSlider.this.getValue() + _strategy.modelToSliderDelta( _upDownArrowDelta ) );
            }
        };
        getActionMap().put( INCREMENT_ACTION_MAP_KEY, incrementAction );

        // Down and Left arrows decrement
        getInputMap().put( KeyStroke.getKeyStroke( KeyEvent.VK_LEFT, 0, false ), DECREMENT_ACTION_MAP_KEY );
        getInputMap().put( KeyStroke.getKeyStroke( KeyEvent.VK_DOWN, 0, false ), DECREMENT_ACTION_MAP_KEY );
        AbstractAction decrementAction = new AbstractAction() {
            @Override
						public void actionPerformed( ActionEvent e ) {
                setValue( AbstractSlider.this.getValue() - _strategy.modelToSliderDelta( _upDownArrowDelta ) );
            }
        };
        getActionMap().put( DECREMENT_ACTION_MAP_KEY, decrementAction );
    }

    public void setUpDownArrowDelta( double upDownArrowDelta ) {
        _upDownArrowDelta = upDownArrowDelta;
    }

    public void setModelRange( double min, double max ) {
        _strategy.setModelRange( min, max );
        setMinimum( _strategy.getSliderMin() );
        setMaximum( _strategy.getSliderMax() );
    }

    public void setModelValue( double modelValue ) {
        int sliderValue = _strategy.modelToSlider( modelValue );
        setValue( sliderValue );
    }

    public double getModelValue() {
        int sliderValue = getValue();
        return sliderToModel( sliderValue );
    }

    public double getModelMin() {
        return _strategy.getModelMin();
    }

    public double getModelMax() {
        return _strategy.getModelMax();
    }

    public double getModelRange() {
        return _strategy.getModelRange();
    }

    public int getSliderMin() {
        return _strategy.getSliderMin();
    }

    public int getSliderMax() {
        return _strategy.getSliderMax();
    }

    public int getSliderRange() {
        return _strategy.getSliderRange();
    }

    public double sliderToModel( int sliderValue ) {
        return _strategy.sliderToModel( sliderValue );
    }

    public int modelToSlider( double modelValue ) {
        return _strategy.modelToSlider( modelValue );
    }
}
