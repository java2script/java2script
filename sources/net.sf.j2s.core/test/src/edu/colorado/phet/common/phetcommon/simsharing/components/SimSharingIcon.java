// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.simsharing.components;

import java.awt.AWTEvent;
import java.awt.event.MouseEvent;

import javax.swing.Icon;
import javax.swing.JLabel;

import edu.colorado.phet.common.phetcommon.simsharing.SimSharingManager;
import edu.colorado.phet.common.phetcommon.simsharing.messages.IUserComponent;
import edu.colorado.phet.common.phetcommon.util.function.VoidFunction0;

import static edu.colorado.phet.common.phetcommon.simsharing.messages.ParameterKeys.enabled;
import static edu.colorado.phet.common.phetcommon.simsharing.messages.ParameterKeys.interactive;
import static edu.colorado.phet.common.phetcommon.simsharing.messages.ParameterSet.parameterSet;
import static edu.colorado.phet.common.phetcommon.simsharing.messages.UserActions.pressed;
import static edu.colorado.phet.common.phetcommon.simsharing.messages.UserComponentTypes.icon;

/**
 * Clicking on this icon (label) sends a sim-sharing event and performs a function.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class SimSharingIcon extends JLabel {

    private final IUserComponent object;
    private final VoidFunction0 function;

    public SimSharingIcon( IUserComponent object, Icon icon, final VoidFunction0 function ) {
        super( icon );
        this.object = object;
        this.function = function;

        //Make sure processMouseEvent gets called even if no listeners registered.  See http://www.dickbaldwin.com/java/Java102.htm#essential_ingredients_for_extending_exis
        enableEvents( AWTEvent.MOUSE_EVENT_MASK );
    }

    //When mouse is pressed, send a simsharing event.  Safer to override than add listener, since the listener could be removed with removeAllListeners().
    //Only works if enableEvents has been called.  See #3218
    @Override protected void processMouseEvent( MouseEvent e ) {
        if ( e.getID() == MouseEvent.MOUSE_PRESSED ) {
            //SimSharingManager.sendUserMessage( object, icon, pressed, parameterSet( enabled, isEnabled() ).with( interactive, isEnabled() ) );
            function.apply();
        }
        super.processMouseEvent( e );
    }
}