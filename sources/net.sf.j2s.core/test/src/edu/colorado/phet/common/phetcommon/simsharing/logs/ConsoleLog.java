// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.simsharing.logs;

import edu.colorado.phet.common.phetcommon.simsharing.Log;
import edu.colorado.phet.common.phetcommon.simsharing.SimSharingMessage;

/**
 * @author Sam Reid
 */
public class ConsoleLog implements Log {
    @Override
		@SuppressWarnings("rawtypes")
		public void addMessage( SimSharingMessage message ) {
        System.out.println( message );
    }

    @Override
		public String getName() {
        return "Java Console";
    }

    @Override
		public void shutdown() {
    }
}
