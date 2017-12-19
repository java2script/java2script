// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.simsharing.components;

import java.awt.AWTEvent;
import java.awt.event.ActionEvent;
import java.awt.event.MouseEvent;

import javax.swing.Action;
import javax.swing.Icon;
import javax.swing.JButton;

import edu.colorado.phet.common.phetcommon.simsharing.SimSharingManager;
import edu.colorado.phet.common.phetcommon.simsharing.messages.IUserComponent;
import edu.colorado.phet.common.phetcommon.simsharing.messages.ParameterSet;

import static edu.colorado.phet.common.phetcommon.simsharing.messages.ParameterKeys.enabled;
import static edu.colorado.phet.common.phetcommon.simsharing.messages.ParameterKeys.interactive;
import static edu.colorado.phet.common.phetcommon.simsharing.messages.ParameterSet.parameterSet;
import static edu.colorado.phet.common.phetcommon.simsharing.messages.UserActions.pressed;
import static edu.colorado.phet.common.phetcommon.simsharing.messages.UserComponentTypes.button;

/**
 * Swing button that sends sim-sharing events.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class SimSharingJButton extends JButton {

    private final IUserComponent userComponent;

    public SimSharingJButton( IUserComponent userComponent ) {
        this.userComponent = userComponent;
        enableMouseEvents();
    }

    public SimSharingJButton( IUserComponent userComponent, Icon icon ) {
        super( icon );
        this.userComponent = userComponent;
        enableMouseEvents();
    }

    public SimSharingJButton( IUserComponent userComponent, String text ) {
        super( text );
        this.userComponent = userComponent;
        enableMouseEvents();
    }

    public SimSharingJButton( IUserComponent userComponent, Action a ) {
        super( a );
        this.userComponent = userComponent;
        enableMouseEvents();
    }

    public SimSharingJButton( IUserComponent userComponent, String text, Icon icon ) {
        super( text, icon );
        this.userComponent = userComponent;
        enableMouseEvents();
    }

    //Make sure processMouseEvent gets called even if no listeners registered.  See http://www.dickbaldwin.com/java/Java102.htm#essential_ingredients_for_extending_exis
    private void enableMouseEvents() {
        enableEvents( AWTEvent.MOUSE_EVENT_MASK );
    }

    //When mouse is pressed, send a simsharing event if the component is disabled.  Safer to override than add listener, since the listener could be removed with removeAllListeners().
    //Only works if enableEvents has been called.  See #3218
    @Override protected void processMouseEvent( MouseEvent e ) {
        if ( e.getID() == MouseEvent.MOUSE_PRESSED && !isEnabled() ) {
            sendUserMessage( parameterSet( enabled, isEnabled() ).with( interactive, isEnabled() ) );
        }
        super.processMouseEvent( e );
    }

    //If the user clicks the button and it is enabled, send a pressed message
    @Override protected void fireActionPerformed( ActionEvent event ) {
        sendUserMessage( new ParameterSet() );
        super.fireActionPerformed( event );
    }

    private void sendUserMessage( ParameterSet parameterSet ) {
        //SimSharingManager.sendUserMessage( userComponent, button, pressed, parameterSet );
    }
}
