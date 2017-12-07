// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.view.controls.valuecontrol;

import javax.swing.JFrame;
import javax.swing.SwingUtilities;

import edu.colorado.phet.common.phetcommon.view.util.SwingUtils;

/**
 * LinearValueControl is for controlling values that have a linear scale.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class LinearValueControl extends AbstractValueControl {

    /**
     * Constructor that provides a default layout for the control.
     *
     * @param min
     * @param max
     * @param label
     * @param textFieldPattern
     * @param units
     */
    public LinearValueControl( double min, double max, String label, String textFieldPattern, String units ) {
        this( min, max, label, textFieldPattern, units, new DefaultLayoutStrategy() );
    }


    /**
     * Constructor that allows you to specify a layout for the control.
     *
     * @param min
     * @param max
     * @param label
     * @param textFieldPattern
     * @param units
     * @param layoutStrategy
     */
    public LinearValueControl( double min, double max, String label, String textFieldPattern, String units, ILayoutStrategy layoutStrategy ) {
        super( new LinearSlider( min, max ), label, textFieldPattern, units, layoutStrategy );
    }

    /**
     * Constructor that provides a default layout for the control as well as the default slider value
     *
     * @param min
     * @param max
     * @param label
     * @param textFieldPattern
     * @param units
     */
    public LinearValueControl( double min, double max, double value, String label, String textFieldPattern, String units ) {
        this( min, max, value, label, textFieldPattern, units, new DefaultLayoutStrategy() );
    }

    /**
     * Constructor that accepts a layout for the control as well as the default slider value
     *
     * @param min
     * @param max
     * @param label
     * @param textFieldPattern
     * @param units
     */
    public LinearValueControl( double min, double max, double value, String label, String textFieldPattern, String units, ILayoutStrategy layoutStrategy ) {
        this( min, max, label, textFieldPattern, units, layoutStrategy );
        setValue( value );
    }

    /**
     * Added sample usage and test
     *
     * @param args application args
     */
    public static void main( String[] args ) {
        SwingUtilities.invokeLater( new Runnable() {
            @Override
						public void run() {
                new JFrame( "Test: " + LinearValueControl.class.getName() ) {{
                    LinearValueControl control = new LinearValueControl( 0, 10, "test", "0.0", "units" );
                    control.setMajorTicksVisible( false );
                    control.setMinorTicksVisible( false );
                    setContentPane( control );
                    setDefaultCloseOperation( EXIT_ON_CLOSE );
                    pack();
                    SwingUtils.centerWindowOnScreen( this );
                    setVisible( true );
                }};
            }
        } );
    }

}
