// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 54200 $
 * Date modified : $Date: 2011-07-18 19:45:40 -0500 (Mon, 18 Jul 2011) $
 */

package edu.colorado.phet.common.phetgraphics.application;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.Timer;

import edu.colorado.phet.common.phetcommon.model.clock.ClockAdapter;
import edu.colorado.phet.common.phetcommon.model.clock.ClockEvent;


/**
 * ClockPausedHandler periodically "refreshes" an active Module while
 * the clock is paused. It does nothing if the clock is running or the
 * Module is inactive.
 * <p/>
 * This functionality was introduced to solve two problems:
 * <br>
 * (1) When the clock is paused, changes made in the control panel were
 * not reflected in the apparatus panel until the mouse cursor was moved
 * into the apparatus panel, forcing a redraw.
 * <br>
 * (2) When the clock is paused, dirty PhetJComponents were never
 * repainted, and the list of dirty compononents would grow excessively
 * (and unnecessarilty) large.
 * <p/>
 * Repainting the above things is handled by Module.refresh.
 * If your Module needs to refresh other things, then override
 * Module.refresh.
 * <p/>
 * Since "refreshing" the Module involves painting Swing components,
 * we use a javax.swing.Timer to avoid synchronization issues.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 * @version $Revision: 54200 $
 */
class ClockPausedHandler extends ClockAdapter {

    private static int DEFAULT_DELAY = 500; // time between refreshes, in milliseconds

    private PhetGraphicsModule module; // the Module that we're associated with
    private Timer timer;

    /**
     * Creates a ClockPausedHandler with a default delay.
     *
     * @param module
     */
    public ClockPausedHandler( PhetGraphicsModule module ) {
        this( module, DEFAULT_DELAY );
    }

    /**
     * Creates a ClockPausedHandler with a specific delay.
     *
     * @param module
     * @param delay  the delay, in milliseconds
     */
    public ClockPausedHandler( PhetGraphicsModule module, int delay ) {
        this.module = module;
        timer = new Timer( delay, new ActionListener() {
            @Override
						public void actionPerformed( ActionEvent event ) {
                refresh( event );
            }
        } );
    }

    /**
     * ActionListener implementation.
     * Anything that needs to be refreshed should be done here.
     * The module will be refreshed only while it is active.
     */
    private void refresh( ActionEvent event ) {
        if ( event.getSource() == timer && this.module.isActive() ) {
            this.module.refresh();
        }
    }

    @Override
		public void clockPaused( ClockEvent clockEvent ) {
        timer.start();
    }

    @Override
		public void clockStarted( ClockEvent clockEvent ) {
        timer.stop();
    }

}
