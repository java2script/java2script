// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.idealgas.model;

import edu.colorado.phet.common.phetcommon.model.clock.SwingClock;
import edu.colorado.phet.common.phetcommon.model.clock.TimingStrategy;

/**
 * IdealGasClock
 * <p/>
 * An adapter to provide an older interface for the newer SwingClock class. The older
 * interface is used throughout the simulation
 *
 * @author Ron LeMaster
 */
public class IdealGasClock extends SwingClock {
    private double dt;

    public IdealGasClock( int delay, double dt ) {
        super( delay, new TimingStrategy.Constant( dt ) );
        this.dt = dt;
    }

    public double getDt() {
        return dt;
    }
}
