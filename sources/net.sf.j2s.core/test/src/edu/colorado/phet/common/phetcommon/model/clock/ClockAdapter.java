// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 47760 $
 * Date modified : $Date: 2011-01-07 11:42:54 -0600 (Fri, 07 Jan 2011) $
 */
package edu.colorado.phet.common.phetcommon.model.clock;

/**
 * Implements the ClockListener interface with empty implementations for convenience.
 *
 * @author Sam Reid
 */

public class ClockAdapter implements ClockListener {

    /**
     * Invoked when the clock ticks.
     *
     * @param clockEvent
     */
    @Override
		public void clockTicked( ClockEvent clockEvent ) {
    }

    /**
     * Invoked when the clock starts.
     *
     * @param clockEvent
     */
    @Override
		public void clockStarted( ClockEvent clockEvent ) {
    }

    /**
     * Invoked when the clock is paused.
     *
     * @param clockEvent
     */
    @Override
		public void clockPaused( ClockEvent clockEvent ) {
    }

    /**
     * Invoked when the running time of the simulation has changed.
     *
     * @param clockEvent
     */
    @Override
		public void simulationTimeChanged( ClockEvent clockEvent ) {
    }

    /**
     * Invoked when the clock's simulation time is reset.
     *
     * @param clockEvent
     */
    @Override
		public void simulationTimeReset( ClockEvent clockEvent ) {
    }
}