// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 47772 $
 * Date modified : $Date: 2011-01-07 13:53:07 -0600 (Fri, 07 Jan 2011) $
 */
package edu.colorado.phet.idealgas.coreadditions;

import edu.colorado.phet.common.phetcommon.model.BaseModel;
import edu.colorado.phet.common.phetcommon.model.ModelElement;
import edu.colorado.phet.common.phetcommon.model.clock.ClockEvent;
import edu.colorado.phet.common.phetcommon.model.clock.ClockListener;
import edu.colorado.phet.common.phetcommon.util.EventChannel;
import edu.colorado.phet.common.phetcommon.view.util.PhetFont;
import edu.colorado.phet.idealgas.IdealGasResources;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.EventListener;
import java.util.EventObject;

/**
 * A stopwatch panel.
 * <p/>
 * The panel has its own clock that has the same dt as the clock provided as a parameter in the constructor.
 */
public class StopwatchPanel extends JPanel implements ClockListener, ModelElement {

    private JTextField clockTF = new JTextField();
    private NumberFormat clockFormat = new DecimalFormat( "0.00" );
    private String[] startStopStr;
    private EventChannel stopwatchEventChannel = new EventChannel( StopwatchListener.class );
    private StopwatchListener stopwatchListenerProxy = (StopwatchListener)stopwatchEventChannel.getListenerProxy();
    private JButton resetBtn;
    // Time scale factor
    private double scaleFactor = 1;
    private double runningTime = 0;
    private boolean isRunning = false;
    private JLabel timeUnitsLabel;
    private JButton startStopBtn;
    private StartStopActionListener startStopActionListener;

    /**
     * @param model
     */
    public StopwatchPanel( BaseModel model ) {
        this( model, "", 1 );
    }

    /**
     * @param model
     * @param timeUnits
     * @param scaleFactor Time scale factor
     */
    public StopwatchPanel( BaseModel model, String timeUnits, double scaleFactor ) {

        model.addModelElement( this );
        setBackground( new Color( 237, 225, 113 ) );

        this.scaleFactor = scaleFactor;

        // Clock readout
        setBorder( BorderFactory.createRaisedBevelBorder() );
        clockTF = new JTextField( 5 );
//        Font clockFont = clockTF.getFont();
        clockTF.setFont( new PhetFont( 16,true) );
        clockTF.setEditable( false );
        clockTF.setHorizontalAlignment( JTextField.RIGHT );

        // Initialize the contents of the clockTF
        resetClock();

        // Start/stop button
        startStopStr = new String[2];
        startStopStr[0] = IdealGasResources.getString( "stopwatch.start" );
        startStopStr[1] = IdealGasResources.getString( "stopwatch.stop" );
        startStopBtn = new JButton( startStopStr[0] );
        startStopActionListener = new StartStopActionListener();
        startStopBtn.addActionListener( startStopActionListener );

        // Reset button
        resetBtn = new JButton( IdealGasResources.getString( "stopwatch.reset" ) );
        resetBtn.addActionListener( new ActionListener() {
            @Override
						public void actionPerformed( ActionEvent e ) {
                resetClock();
            }
        } );

        // Lay out the panel
        this.setLayout( new FlowLayout() );
        add( startStopBtn );
        add( resetBtn );
        add( clockTF );
        timeUnitsLabel = new JLabel( timeUnits );
        add( timeUnitsLabel );

        // Clear the clock
        resetClock();
    }

    private void resetClock() {
        runningTime = 0;
        displayRunningTime();
        StopwatchEvent event = new StopwatchEvent( this );
        event.setReset( true );
        event.setRunning( false );
        stopwatchListenerProxy.reset( event );
    }

    public void setClockPanelVisible( boolean isVisible ) {
        setVisible( isVisible );
    }

    public void setTimeUnits( String timeUnits ) {
        timeUnitsLabel.setText( timeUnits );
    }

    public boolean isClockPanelVisible() {
        return isVisible();
    }

    public void reset() {
        resetClock();
        if( isRunning ) {
            startStopActionListener.actionPerformed( null );
        }
    }

    /**
     * Private inner class that manages the state of the stopwatch
     * when buttons are clicked
     */
    private class StartStopActionListener implements ActionListener {
        int startStopState = 0;

        public StartStopActionListener() {
        }

        @Override
				public void actionPerformed( ActionEvent e ) {
            if( startStopState == 0 ) {
                StopwatchEvent event = new StopwatchEvent( this );
                event.setRunning( true );
                stopwatchListenerProxy.start( event );
                resetBtn.setEnabled( false );
                isRunning = true;
            }
            else {
                StopwatchEvent event = new StopwatchEvent( this );
                event.setRunning( false );
                stopwatchListenerProxy.stop( event );
                resetBtn.setEnabled( true );
                isRunning = false;
            }

            // Set the proper text for the button, and do a bunch of messing arround to
            // set the size so it doesn't change when the text changes.
            startStopState = ( startStopState + 1 ) % 2;
            Dimension prevSize = startStopBtn.getSize();
            startStopBtn.setText( startStopStr[startStopState] );
            Dimension currSize = startStopBtn.getSize();
            Dimension newSize = new Dimension( Math.max( prevSize.width, currSize.width ), currSize.height );
            startStopBtn.setPreferredSize( newSize );
        }
    }

    private void displayRunningTime() {
        String s = clockFormat.format( runningTime * scaleFactor );
        clockTF.setText( s );
    }

    //----------------------------------------------------------------
    // Event handling
    //----------------------------------------------------------------
    boolean savedResetState;

    @Override
		public void clockTicked( ClockEvent clockEvent ) {
        String s = clockFormat.format( clockEvent.getSimulationTime() );
        clockTF.setText( s );
    }

    @Override
		public void clockStarted( ClockEvent clockEvent ) {
        resetBtn.setEnabled( savedResetState );
    }

    @Override
		public void clockPaused( ClockEvent clockEvent ) {
        savedResetState = resetBtn.isEnabled();
        resetBtn.setEnabled( true );
    }

    @Override
		public void simulationTimeChanged( ClockEvent clockEvent ) {

    }

    @Override
		public void simulationTimeReset( ClockEvent clockEvent ) {

    }

    /**
     * Responds to state changes in the simulation clock
     *
     * @param event
     */
//    public void stateChanged( ClockStateEvent event ) {
//        if( event.getIsPaused() ) {
//            savedResetState = resetBtn.isEnabled();
//            resetBtn.setEnabled( true );
//        }
//        else {
//            resetBtn.setEnabled( savedResetState );
//        }
//    }

    /**
     * Responds to ticks of the stopwatch clock
     *
     * @param event
     */
//    public void clockTicked( ClockTickEvent event ) {
//        Clock c = (Clock)event.getSource();
//        // TODO: scale factor goes here
//        String s = clockFormat.format( c.getRunningTime() );
//        clockTF.setText( s );
//    }
    @Override
		public void stepInTime( double dt ) {
        if( isRunning ) {
            runningTime += dt;
            displayRunningTime();
        }
    }

    //-----------------------------------------------------------------
    // Event and Listener definitions
    //-----------------------------------------------------------------
    public interface StopwatchListener extends EventListener {
        void start( StopwatchEvent event );

        void stop( StopwatchEvent event );

        void reset( StopwatchEvent event );
    }

    public class StopwatchEvent extends EventObject {
        boolean isRunning = true;
        boolean isReset;

        public StopwatchEvent( Object source ) {
            super( source );
        }

        public boolean isRunning() {
            return isRunning;
        }

        public void setRunning( boolean running ) {
            isRunning = running;
        }

        public boolean isReset() {
            return isReset;
        }

        public void setReset( boolean reset ) {
            isReset = reset;
        }
    }

    public void addListener( StopwatchListener listener ) {
        stopwatchEventChannel.addListener( listener );
    }

    public void removeListener( StopwatchListener listener ) {
        stopwatchEventChannel.removeListener( listener );
    }
    
		@Override
		public int getType() {
			return TYPE_OTHER;
		}

}
