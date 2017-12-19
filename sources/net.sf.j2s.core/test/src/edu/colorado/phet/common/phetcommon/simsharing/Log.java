// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.simsharing;

import java.io.IOException;

/**
 * Place where log messages can be sent, such as console, network or  file.
 *
 * @author Sam Reid
 */
public interface Log {
    @SuppressWarnings("rawtypes")
		public void addMessage( SimSharingMessage message ) throws IOException;

    //Name of the log which is shown in the list of logs.
    String getName();

    //When the sim is closing, perform any final events such as sending messages to the server
    void shutdown();
}