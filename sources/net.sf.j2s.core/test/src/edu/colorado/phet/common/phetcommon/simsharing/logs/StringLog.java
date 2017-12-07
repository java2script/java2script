// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.simsharing.logs;

import edu.colorado.phet.common.phetcommon.model.property.Property;
import edu.colorado.phet.common.phetcommon.simsharing.Log;
import edu.colorado.phet.common.phetcommon.simsharing.SimSharingMessage;

/**
 * @author Sam Reid
 */
public class StringLog implements Log {
    public final Property<String> log = new Property<String>( "" ); // log events locally, as a fallback plan //TODO StringBuffer would be more efficient

    // Sends a message to the sim-sharing log.
    @Override
		public void addMessage( @SuppressWarnings("rawtypes") SimSharingMessage message ) {
        if ( log.get().length() != 0 ) {
            log.set( log.get() + "\n" );
        }
        log.set( log.get() + message );
    }

    @Override
		public String getName() {
        return "Internal buffer";
    }

    @Override
		public void shutdown() {
    }
}