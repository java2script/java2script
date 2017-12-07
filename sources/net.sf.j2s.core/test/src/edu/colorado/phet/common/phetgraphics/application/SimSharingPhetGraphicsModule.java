// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetgraphics.application;

import edu.colorado.phet.common.phetcommon.model.clock.IClock;
import edu.colorado.phet.common.phetcommon.simsharing.messages.IUserComponent;

/**
 * Phetgraphics module with sim-sharing messages for tab presses.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class SimSharingPhetGraphicsModule extends PhetGraphicsModule {

    private final IUserComponent tabUserComponent;

    public SimSharingPhetGraphicsModule( IUserComponent tabUserComponent, String name ) {
        super( name );
        this.tabUserComponent = tabUserComponent;
    }

    protected SimSharingPhetGraphicsModule( IUserComponent tabUserComponent, String name, IClock clock ) {
        super( name, clock );
        this.tabUserComponent = tabUserComponent;
    }

    //Used in Tab node code for sim sharing, to have a good ID for the tab associated with this module.
    @Override public IUserComponent getTabUserComponent() {
        return tabUserComponent;
    }
}
