// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.simsharing.components;

import java.awt.event.MouseEvent;

import javax.swing.event.MouseInputAdapter;

import edu.colorado.phet.common.phetcommon.simsharing.SimSharingManager;
import edu.colorado.phet.common.phetcommon.simsharing.messages.IUserComponent;
import edu.colorado.phet.common.phetcommon.simsharing.messages.IUserComponentType;
import edu.colorado.phet.common.phetcommon.simsharing.messages.UserComponentTypes;

import static edu.colorado.phet.common.phetcommon.simsharing.messages.ParameterKeys.interactive;
import static edu.colorado.phet.common.phetcommon.simsharing.messages.ParameterSet.parameterSet;
import static edu.colorado.phet.common.phetcommon.simsharing.messages.UserActions.pressed;

/**
 * Standard event listener to use when a Swing component is non-interactive,
 * so we can see if/when they are clicked on.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class NonInteractiveEventListener extends MouseInputAdapter {

    private final IUserComponent userComponent;
    private final IUserComponentType userComponentType;

    // Convenience constructor, since many (most?) such components are sprites.
    public NonInteractiveEventListener( IUserComponent userComponent ) {
        this( userComponent, UserComponentTypes.sprite );
    }

    public NonInteractiveEventListener( IUserComponent userComponent, IUserComponentType userComponentType ) {
        this.userComponent = userComponent;
        this.userComponentType = userComponentType;
    }

    @Override public void mousePressed( MouseEvent event ) {
        //SimSharingManager.sendUserMessage( userComponent, userComponentType, pressed, parameterSet( interactive, false ) );
        super.mousePressed( event );
    }
}
