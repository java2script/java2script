// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.simsharing;

import edu.colorado.phet.common.phetcommon.simsharing.messages.IMessageType;
import edu.colorado.phet.common.phetcommon.simsharing.messages.ParameterSet;

import static edu.colorado.phet.common.phetcommon.simsharing.SimSharingManager.DELIMITER;

/**
 * Sim-sharing message.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 * @author Sam Reid
 */
public class SimSharingMessage<T, U, V> {

    enum MessageType implements IMessageType {user, system, model}

    public final IMessageType messageType;
    public final T component;
    public final U componentType;
    public final V action;
    public final ParameterSet parameters;
    public final long time = System.currentTimeMillis();

    public SimSharingMessage( IMessageType messageType, T component, U componentType, V action, final ParameterSet parameters ) {
        this.messageType = messageType;
        this.component = component;
        this.componentType = componentType;
        this.action = action;
        this.parameters = parameters;
    }

    @Override
		public String toString() {
        return time + DELIMITER + messageType + DELIMITER + component + DELIMITER + componentType + DELIMITER + action + DELIMITER + parameters.toString( DELIMITER );
    }
}