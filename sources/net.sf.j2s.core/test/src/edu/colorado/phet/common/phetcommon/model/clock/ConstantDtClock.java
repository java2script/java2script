// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.model.clock;


import java.util.EventListener;
import java.util.EventObject;

import javax.swing.event.EventListenerList;


/**
 * ConstantDtClock is a clock with a constant dt.
 * This implementation inherits most of its behavior from SwingClock.
 * Changes to delay and dt are handled via a new listener/event pair.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class ConstantDtClock extends SwingClock {

    // Clock used for testing, delay=1 so that tests will run as fast as possible
    public static final ConstantDtClock TEST = new ConstantDtClock( 1, 1 );
    public static final double DEFAULT_FRAMES_PER_SECOND = 30.0;

    //----------------------------------------------------------------------------
    // Instance data
    //----------------------------------------------------------------------------

    private EventListenerList listenerList;

    //----------------------------------------------------------------------------
    // Constructors
    //----------------------------------------------------------------------------


    /**
     * Creates a ConstantDtClock that with the default frame rate (30 frames per second),
     * with simulation time equal to wall time.
     */
    public ConstantDtClock() {
        this( DEFAULT_FRAMES_PER_SECOND );
    }

    /**
     * Creates a ConstantDTClock based on a number of requested frames per second.
     * This uses the same value for elapsed simulation time, and should be used for simulations
     * that run in real time (e.g. one sim time second equals one wall clock second)
     *
     * @param framesPerSecond the number of frames per second
     */
    public ConstantDtClock( double framesPerSecond ) {
        //time between frames in seconds = 1 / framesPerSecond
        //time between frames in milliseconds = 1000 / framesPerSecond
        this( (int) ( 1000 / framesPerSecond ), 1 / framesPerSecond );
    }

    /**
     * Constructor.
     *
     * @param delay desired wall time change between ticks
     * @param dt    constant simulation time change between ticks
     */
    public ConstantDtClock( int delay, double dt ) {
        super( delay, dt );
        listenerList = new EventListenerList();
    }

    //----------------------------------------------------------------------------
    // Setters and getters
    //----------------------------------------------------------------------------

    /**
     * Sets the desired wall time change between ticks.
     *
     * @param delay
     */
    @Override
		public void setDelay( int delay ) {
        if ( delay != getDelay() ) {
            super.setDelay( delay );
            fireDelayChanged( new ConstantDtClockEvent( this ) );
        }
    }

    /**
     * Sets the constant simulation time change (dt) between ticks.
     *
     * @param dt
     */
    public void setDt( double dt ) {
        if ( dt != getDt() ) {
            setTimingStrategy( new TimingStrategy.Constant( dt ) );
        }
    }

    /**
     * Gets the constant simulation time change (dt) between ticks.
     *
     * @return dt
     */
    public double getDt() {
        return ( (TimingStrategy.Constant) getTimingStrategy() ).getSimulationTimeChange();
    }

    /**
     * Convenience method for setting the running state.
     *
     * @param running
     */
    public void setRunning( boolean running ) {
        if ( running ) {
            start();
        }
        else {
            pause();
        }
    }

    /**
     * Convenience method for setting the paused state.
     *
     * @param paused
     */
    public void setPaused( boolean paused ) {
        setRunning( !paused );
    }

    //----------------------------------------------------------------------------
    // SwingClock overrides
    //----------------------------------------------------------------------------

    /**
     * Sets the timing strategy for the clock.
     * Only constant timing strategies are allowed.
     * It is preferrable to call setDt.
     *
     * @param timingStrategy
     * @throws IllegalArgumentException if timingStrategy is not of type TimingStrategy.Constant
     */
    @Override
		public void setTimingStrategy( TimingStrategy timingStrategy ) {
        if ( !( timingStrategy instanceof TimingStrategy.Constant ) ) {
            throw new IllegalArgumentException( "timingStrategy must be of type TimingStrategy.Constant" );
        }
        super.setTimingStrategy( timingStrategy );
        fireDtChanged( new ConstantDtClockEvent( this ) );
    }

    //----------------------------------------------------------------------------
    // ConstantDtClockListener
    //----------------------------------------------------------------------------

    /**
     * Adds a ConstantDtClockListener.
     *
     * @param listener
     */
    public void addConstantDtClockListener( ConstantDtClockListener listener ) {
        listenerList.add( ConstantDtClockListener.class, listener );
    }

    /**
     * Removes a ConstantDtClockListener.
     *
     * @param listener
     */
    public void removeConstantDtClockListener( ConstantDtClockListener listener ) {
        listenerList.remove( ConstantDtClockListener.class, listener );
    }

    /**
     * Interface implemented by listeners who are interested in changes to delay or dt.
     */
    public static interface ConstantDtClockListener extends EventListener {

        public void delayChanged( ConstantDtClockEvent event );

        public void dtChanged( ConstantDtClockEvent event );
    }

    /**
     * Adapter for ConstantDtClockListener.
     */
    public static abstract class ConstantDtClockAdapter implements ConstantDtClockListener {

        @Override
				public void delayChanged( ConstantDtClockEvent event ) {
        }

        @Override
				public void dtChanged( ConstantDtClockEvent event ) {
        }
    }

    /**
     * Event indicating that one of the properties specific to
     * ConstantDtClock has changed.
     */
    public static class ConstantDtClockEvent extends EventObject {

        public ConstantDtClockEvent( ConstantDtClock source ) {
            super( source );
        }

        public ConstantDtClock getClock() {
            return (ConstantDtClock) getSource();
        }
    }

    /*
     * Fires an event indicating that the clock's delay has changed.
     */
    private void fireDelayChanged( ConstantDtClockEvent event ) {
        Object[] listeners = listenerList.getListenerList();
        for ( int i = 0; i < listeners.length; i += 2 ) {
            if ( listeners[i] == ConstantDtClockListener.class ) {
                ( (ConstantDtClockListener) listeners[i + 1] ).delayChanged( event );
            }
        }
    }

    /*
     * Fires an event indicating that the clock's dt has changed.
     */
    private void fireDtChanged( ConstantDtClockEvent event ) {
        Object[] listeners = listenerList.getListenerList();
        for ( int i = 0; i < listeners.length; i += 2 ) {
            if ( listeners[i] == ConstantDtClockListener.class ) {
                ( (ConstantDtClockListener) listeners[i + 1] ).dtChanged( event );
            }
        }
    }
}
