// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 54200 $
 * Date modified : $Date: 2011-07-18 19:45:40 -0500 (Mon, 18 Jul 2011) $
 */
package edu.colorado.phet.common.phetcommon.model.clock;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JFrame;
import javax.swing.Timer;

/**
 * This extension of Clock uses a Swing Timer for tick notification.
 */
public class SwingClock extends Clock {
    private Timer timer;

    /**
     * Constructs a SwingClock with specified wall time delay between events
     * and constant simulation time change per tick.  The same dt is used for stepClockWhilePaused().
     *
     * @param delay time between clock ticks, in wall time
     * @param dt    time per clock tick, in simulation time
     */
    public SwingClock( int delay, double dt ) {
        this( delay, new TimingStrategy.Constant( dt ) );
    }

    /**
     * Constructs a SwingClock with a specified wall time between clock ticks,
     * and a TimingStrategy for determining elapsed simulation time.
     * <p/>
     *
     * @param delay          time between clock ticks, in wall time
     * @param timingStrategy calculates simulation time change based on wall time change
     */
    public SwingClock( int delay, TimingStrategy timingStrategy ) {
        super( timingStrategy );
        ActionListener actionListener = new ActionListener() {
            @Override
						public void actionPerformed( ActionEvent e ) {
                if ( !isPaused() ) {
                    doTick();
                }
            }
        };
        timer = new Timer( delay, actionListener );
    }

    /**
     * Sets whether the underlying Timer should coalesce events.
     * <p/>
     * When the amount of work done in the action listener is nearly the same value as the wait time
     * on the clock (or more), the delay before next tick is unnecessarily high.
     * <p/>
     * The solution to this problem is to setCoalesce(false) on the clock.
     * Since this may have unintended impact on existing simulations in terms of UI responsiveness,
     * or other aspects of the simulation, this is to be turned-on on a simulation-by-simulation basis.
     *
     * @param coalesce true if the underlying timer should coalesce events
     * @see edu.colorado.phet.common.phetcommon.tests.TestSwingTimer
     */
    public void setCoalesce( boolean coalesce ) {
        timer.setCoalesce( coalesce );
    }

    /**
     * Starts the Clock.
     */
    @Override
		public void start() {
        if ( isPaused() ) {
            timer.start();
            super.notifyClockStarted();
        }
    }

    /**
     * Pauses the Clock.
     */
    @Override
		public void pause() {
        if ( isRunning() ) {
            timer.stop();
            super.notifyClockPaused();
        }
    }

    /**
     * Get whether the clock is paused.
     *
     * @return whether the clock is paused.
     */
    @Override
		public boolean isPaused() {
        return !timer.isRunning();
    }

    /**
     * Get whether the clock is running.
     *
     * @return whether the clock is running.
     */
    @Override
		public boolean isRunning() {
        return timer.isRunning();
    }

    /**
     * Sets the requested wall time delay between ticks.
     *
     * @param delay
     */
    public void setDelay( int delay ) {
        timer.setDelay( delay );
    }

    /**
     * Gets the requested wall time delay between ticks.
     *
     * @return the delay
     */
    public int getDelay() {
        return timer.getDelay();
    }

    /**
     * Gets the Swing Timer used to generate ticks.
     *
     * @return the Swing Timer used to generate ticks.
     */
    protected Timer getTimer() {
        return timer;
    }

    public static void main( String[] args ) {

        final long startTime = System.currentTimeMillis();
        Timer timer = new Timer( 1000, new ActionListener() {
            @Override
						public void actionPerformed( ActionEvent e ) {
                System.out.println( "System.currentTimeMillis() = " + ( System.currentTimeMillis() - startTime ) );
                try {
                    Thread.sleep( 1100 );
                }
                catch ( InterruptedException e1 ) {
                    e1.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                }
            }
        } );
        timer.setCoalesce( false );//should be false
        timer.start();
        new JFrame().setVisible( true );
    }
}