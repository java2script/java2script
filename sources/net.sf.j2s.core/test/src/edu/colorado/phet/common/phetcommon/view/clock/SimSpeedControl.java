// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.view.clock;

import java.awt.Color;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.util.Hashtable;

import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

import edu.colorado.phet.common.phetcommon.model.clock.ConstantDtClock;
import edu.colorado.phet.common.phetcommon.model.property.ObservableProperty;
import edu.colorado.phet.common.phetcommon.model.property.Property;
import edu.colorado.phet.common.phetcommon.resources.PhetCommonResources;
import edu.colorado.phet.common.phetcommon.util.function.VoidFunction1;
import edu.colorado.phet.common.phetcommon.view.controls.valuecontrol.LinearValueControl;
import edu.colorado.phet.common.phetcommon.view.controls.valuecontrol.SliderOnlyLayoutStrategy;

/**
 * Simulation speed slider.  The slider changes the dt on a ConstantDtClock and updates when the clock dt changes by other means.
 *
 * @author Sam Reid
 */
public class SimSpeedControl extends JPanel {
    private final LinearValueControl linearSlider;

    public SimSpeedControl( double min, double max, final ConstantDtClock defaultClock ) {
        this( min, max, defaultClock, PhetCommonResources.getString( "Common.sim.speed" ) );
    }

    public SimSpeedControl( double min, double max, final ConstantDtClock defaultClock, String title ) {
        this( min, max, defaultClock, title, Color.BLACK );
    }

    public SimSpeedControl( double min, double max, final ConstantDtClock defaultClock, String title, final Color textColor ) {
        this( min, max, defaultClock, title, new Property<Color>( textColor ) );//just create a constant Property<Color>
    }

    public SimSpeedControl( double min, double max, final ConstantDtClock defaultClock, String title, final ObservableProperty<Color> textColor ) {
        // title
        final JLabel titleLabel = new TimeSpeederLabel( title, textColor );

        // slider
        linearSlider = new LinearValueControl( min, max, "", "", "", new SliderOnlyLayoutStrategy() );
        Hashtable<Number, JLabel> table = new Hashtable<Number, JLabel>();
        table.put( new Double( min ), new TimeSpeederLabel( PhetCommonResources.getString( "Common.time.slow" ), textColor ) );
        table.put( new Double( max ), new TimeSpeederLabel( PhetCommonResources.getString( "Common.time.fast" ), textColor ) );
        linearSlider.setTickLabels( table );
        defaultClock.addConstantDtClockListener( new ConstantDtClock.ConstantDtClockAdapter() {
            @Override
            public void dtChanged( ConstantDtClock.ConstantDtClockEvent event ) {
                update( defaultClock );
            }
        } );
        update( defaultClock );

        // layout, title centered above slider
        setLayout( new GridBagLayout() );
        GridBagConstraints c = new GridBagConstraints();
        c.gridx = 0;
        c.anchor = GridBagConstraints.CENTER;
        add( titleLabel, c );
        add( linearSlider, c );

        //As of 6-25-2011, automatically add a change listener to set the clock dt when the slider is dragged, see #2798
        linearSlider.addChangeListener( new ChangeListener() {
            @Override
						public void stateChanged( ChangeEvent e ) {
                defaultClock.setDt( getValue() );
            }
        } );
    }

    private void update( ConstantDtClock defaultClock ) {
        linearSlider.setValue( defaultClock.getTimingStrategy().getSimulationTimeChangeForPausedClock() );
    }

    public LinearValueControl getLinearSlider() {
        return linearSlider;
    }

    public double getValue() {
        return linearSlider.getValue();
    }

    public double getMin() {
        return linearSlider.getMinimum();
    }

    public double getMax() {
        return linearSlider.getMaximum();
    }

    public void setValue( double dt ) {
        linearSlider.setValue( dt );
    }

    private static class TimeSpeederLabel extends JLabel {
        public TimeSpeederLabel( String text, ObservableProperty<Color> textColor ) {
            super( text );
            textColor.addObserver( new VoidFunction1<Color>() {
                @Override
								public void apply( Color color ) {
                    setForeground( color );
                }
            } );
        }
    }

    public static void main( String[] args ) {
        JFrame testFrame = new JFrame();
        testFrame.add( new SimSpeedControl( 0, 100, new ConstantDtClock( 10, 10 ) ) );
        testFrame.pack();
        testFrame.setVisible( true );
    }
}
