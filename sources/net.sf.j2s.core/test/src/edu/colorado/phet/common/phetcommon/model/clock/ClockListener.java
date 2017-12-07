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

import java.util.EventListener;

/**
 * Listens to changes in both Clock state (running, paused)
 * and clock ticks  (in both wall time and simulation time).
 */

public interface ClockListener extends EventListener {
    /**
     * Invoked when the clock ticks.
     *
     * @param clockEvent
     */
    void clockTicked( ClockEvent clockEvent );

    /**
     * Invoked when the clock starts.
     *
     * @param clockEvent
     */
    void clockStarted( ClockEvent clockEvent );

    /**
     * Invoked when the clock is paused.
     *
     * @param clockEvent
     */
    void clockPaused( ClockEvent clockEvent );

    /**
     * Invoked when the running time of the simulation has changed.
     *
     * @param clockEvent
     */
    void simulationTimeChanged( ClockEvent clockEvent );

    /**
     * Invoked when the clock's simulation time is reset.
     *
     * @param clockEvent
     */
    void simulationTimeReset( ClockEvent clockEvent );
}