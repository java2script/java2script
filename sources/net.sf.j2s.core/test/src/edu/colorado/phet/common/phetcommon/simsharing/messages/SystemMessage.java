// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.simsharing.messages;

import edu.colorado.phet.common.phetcommon.simsharing.SimSharingMessage;

/**
 * Message for events performed automatically by the system, like startup.
 *
 * @author Sam Reid
 */
public class SystemMessage extends SimSharingMessage<ISystemComponent, ISystemComponentType, ISystemAction> {
    public SystemMessage( IMessageType messageType, ISystemComponent component, ISystemComponentType componentType, ISystemAction systemAction, ParameterSet parameters ) {
        super( messageType, component, componentType, systemAction, parameters );
    }
}
