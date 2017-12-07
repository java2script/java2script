// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.simsharing.messages;

import edu.colorado.phet.common.phetcommon.simsharing.SimSharingMessage;

/**
 * Message class for events performed by the user.
 *
 * @author Sam Reid
 */
public class UserMessage extends SimSharingMessage<IUserComponent, IUserComponentType, IUserAction> {
    public UserMessage( IMessageType messageType, IUserComponent userComponent, IUserComponentType userComponentType, IUserAction action, ParameterSet parameters ) {
        super( messageType, userComponent, userComponentType, action, parameters );
    }
}
