// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 47760 $
 * Date modified : $Date: 2011-01-07 11:42:54 -0600 (Fri, 07 Jan 2011) $
 */
package edu.colorado.phet.common.phetcommon.util;

import edu.colorado.phet.common.phetcommon.model.clock.ClockAdapter;
import edu.colorado.phet.common.phetcommon.model.clock.ClockEvent;
import edu.colorado.phet.common.phetcommon.model.clock.IClock;

/**
 * A utility that prints, to the console, the number of rames per second an AbstractClock is ticking off. Useful
 * for monitoring the performance of simulations.
 * <p/>
 * To use, simply instantiate the class.
 *
 * @author Ron LeMaster
 * @version $Revision: 47760 $
 */
public class FrameRateReporter {

    /**
     * Constructs and starts the FrameRateReporter.
     *
     * @param clock The clock that is driving the simulation you want to monitor
     */
    public FrameRateReporter( IClock clock ) {
        clock.addClockListener( new ClockAdapter() {
            int frameCnt = 0;
            long lastTickTime = System.currentTimeMillis();
            long averagingTime = 1000;

            @Override
						public void clockTicked( ClockEvent event ) {
                frameCnt++;
                long currTime = System.currentTimeMillis();
                if ( currTime - lastTickTime > averagingTime ) {
                    double rate = frameCnt * 1000 / ( currTime - lastTickTime );
                    lastTickTime = currTime;
                    frameCnt = 0;
                    System.out.println( "rate = " + rate );
                }
            }
        } );
    }
}
