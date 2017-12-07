// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.view.util;

import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.text.DecimalFormat;

import javax.swing.JComponent;
import javax.swing.JDialog;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

import edu.colorado.phet.common.phetcommon.math.DoubleSeries;
import edu.colorado.phet.common.phetcommon.model.clock.ClockAdapter;
import edu.colorado.phet.common.phetcommon.model.clock.ClockEvent;
import edu.colorado.phet.common.phetcommon.model.clock.ConstantDtClock;
import edu.colorado.phet.common.phetcommon.view.VerticalLayoutPanel;
import edu.colorado.phet.common.phetcommon.view.controls.valuecontrol.LinearValueControl;

/**
 * This developer utility displays actual frame rate for a running ConstantDTClock, and includes a control for setting the dt.
 * This class is still under development, and its interface and implementation are subject to change.
 *
 * @author Sam Reid
 */
public class ClockProfiler {
    private JDialog frame;
    private ConstantDtClock clock;
    private JLabel frameRate;
    private int NUM_SAMPLES = 20;
    private DoubleSeries delaySeries = new DoubleSeries( NUM_SAMPLES );
    private long lastTickTime = 0;
    private LinearValueControl linearValueControl;
    private ClockAdapter tickListener;

    public ClockProfiler( JFrame parentFrame, String moduleName, final ConstantDtClock clock ) {
        this.clock = clock;
        this.frame = new JDialog( parentFrame, "Profiler: " + moduleName, false );
        tickListener = new ClockAdapter() {
            @Override
						public void clockTicked( ClockEvent clockEvent ) {
                delaySeries.add( System.currentTimeMillis() - lastTickTime );
                lastTickTime = System.currentTimeMillis();
                updateLabels();
            }
        };
        this.clock.addClockListener( tickListener );
        frameRate = new JLabel( "Waiting for data..." );
        frameRate.setOpaque( true );

        JPanel contentPane = new VerticalLayoutPanel();
        contentPane.add( frameRate );

        linearValueControl = new LinearValueControl( 5, 100, "Clock Delay", "0.0", "ms" );
        updateDelayControl();
        linearValueControl.addChangeListener( new ChangeListener() {
            @Override
						public void stateChanged( ChangeEvent e ) {
                if ( ClockProfiler.this.clock != null ) {
                    ClockProfiler.this.clock.setDelay( (int) linearValueControl.getValue() );
                }
            }
        } );
        contentPane.add( linearValueControl );

        frame.setContentPane( contentPane );
        updateLabels();
        frame.pack();
        frame.addWindowListener( new WindowAdapter() {
            @Override
						public void windowClosing( WindowEvent e ) {
                frame.dispose();
            }
        } );

        frame.setSize( frame.getWidth() + 100, frame.getHeight() );
    }

    private void updateDelayControl() {
        if ( this.clock != null ) {
            linearValueControl.setValue( this.clock.getDelay() );
        }
    }

    private void updateLabels() {
        if ( delaySeries.getSampleCount() >= NUM_SAMPLES ) {
            frameRate.setText( "Frame Rate=" + format( 1000.0 / delaySeries.average() ) + " Hz, delay=" + format( delaySeries.average() ) + " millis" );
            frameRate.paintImmediately( 0, 0, frameRate.getWidth(), frameRate.getHeight() );//paint immediately in case app is consuming too many resources to do it itself
        }
    }

    private String format( double v ) {
        return new DecimalFormat( "0.0" ).format( v );
    }

    public void show() {
        frame.setVisible( true );
        if ( frame.getContentPane() instanceof JComponent ) {
            JComponent jComponent = (JComponent) frame.getContentPane();
            jComponent.paintImmediately( 0, 0, jComponent.getWidth(), jComponent.getHeight() );
        }
    }

    public void setModule( String title, ConstantDtClock clock ) {
        this.clock.removeClockListener( tickListener );
        this.clock = clock;
        this.clock.addClockListener( tickListener );
        updateDelayControl();
        delaySeries.clear();
        frameRate.setText( "Switched modules, Waiting for data..." );
        frameRate.paintImmediately( 0, 0, frameRate.getWidth(), frameRate.getHeight() );
        frame.setTitle( "Profiler: " + title );
    }
}
