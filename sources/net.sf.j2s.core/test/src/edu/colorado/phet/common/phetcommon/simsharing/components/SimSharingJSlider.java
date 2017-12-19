// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.simsharing.components;

import java.awt.AWTEvent;
import java.awt.event.MouseEvent;

import javax.swing.BoundedRangeModel;
import javax.swing.JSlider;

import edu.colorado.phet.common.phetcommon.simsharing.SimSharingManager;
import edu.colorado.phet.common.phetcommon.simsharing.messages.IUserComponent;
import edu.colorado.phet.common.phetcommon.simsharing.messages.ParameterKeys;
import edu.colorado.phet.common.phetcommon.simsharing.messages.ParameterSet;

import static edu.colorado.phet.common.phetcommon.simsharing.messages.ParameterKeys.enabled;
import static edu.colorado.phet.common.phetcommon.simsharing.messages.ParameterKeys.interactive;
import static edu.colorado.phet.common.phetcommon.simsharing.messages.ParameterSet.parameterSetLong;
import static edu.colorado.phet.common.phetcommon.simsharing.messages.UserActions.drag;
import static edu.colorado.phet.common.phetcommon.simsharing.messages.UserComponentTypes.slider;

/**
 * TODO: Not done yet, needs to be implemented.
 *
 * @author Sam Reid
 */
public class SimSharingJSlider extends JSlider {
    private final IUserComponent userComponent;

    public SimSharingJSlider( IUserComponent userComponent ) {
        this.userComponent = userComponent;
        enableMouseEvents();
    }

    public SimSharingJSlider( IUserComponent userComponent, int orientation ) {
        super( orientation );
        this.userComponent = userComponent;
        enableMouseEvents();
    }

    public SimSharingJSlider( IUserComponent userComponent, int min, int max ) {
        super( min, max );
        this.userComponent = userComponent;
        enableMouseEvents();
    }

    public SimSharingJSlider( IUserComponent userComponent, int min, int max, int value ) {
        super( min, max, value );
        this.userComponent = userComponent;
        enableMouseEvents();
    }

    public SimSharingJSlider( IUserComponent userComponent, int orientation, int min, int max, int value ) {
        super( orientation, min, max, value );
        this.userComponent = userComponent;
        enableMouseEvents();
    }

    public SimSharingJSlider( IUserComponent userComponent, BoundedRangeModel brm ) {
        super( brm );
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
            sendUserMessage( parameterSetLong( ParameterKeys.value, getValue() ).with( enabled, isEnabled() ).with( interactive, isEnabled() ) );
        }
        super.processMouseEvent( e );
    }

    //TODO: add messages for startDrag, endDrag actions (via a MouseListener?)

    @Override protected void fireStateChanged() {
        sendUserMessage( parameterSetLong( ParameterKeys.value, getValue() ) );
        super.fireStateChanged();
    }

    private void sendUserMessage( ParameterSet parameterSet ) {
        //SimSharingManager.sendUserMessage( userComponent, slider, drag, parameterSet );
    }
}