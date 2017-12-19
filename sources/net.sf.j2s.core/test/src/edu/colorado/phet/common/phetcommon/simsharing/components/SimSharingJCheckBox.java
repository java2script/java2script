// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.simsharing.components;

import static edu.colorado.phet.common.phetcommon.simsharing.messages.ParameterKeys.enabled;
import static edu.colorado.phet.common.phetcommon.simsharing.messages.ParameterKeys.interactive;
import static edu.colorado.phet.common.phetcommon.simsharing.messages.UserActions.pressed;
import static edu.colorado.phet.common.phetcommon.simsharing.messages.UserComponentTypes.checkBox;

import java.awt.AWTEvent;
import java.awt.event.ActionEvent;
import java.awt.event.MouseEvent;
import java.util.ArrayList;

import javax.swing.Action;
import javax.swing.Icon;
import javax.swing.JCheckBox;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.WindowConstants;

import edu.colorado.phet.common.phetcommon.simsharing.SimSharingManager;
import edu.colorado.phet.common.phetcommon.simsharing.messages.IUserComponent;
import edu.colorado.phet.common.phetcommon.simsharing.messages.ParameterKeys;
import edu.colorado.phet.common.phetcommon.simsharing.messages.ParameterSet;
import edu.colorado.phet.common.phetcommon.simsharing.messages.UserComponent;
import edu.colorado.phet.common.phetcommon.util.function.Function0;

/**
 * Swing check box that sends sim-sharing events.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class SimSharingJCheckBox extends JCheckBox {

    private final IUserComponent userComponent;

    // By default there are no custom parameters
    private ArrayList<Function0<ParameterSet>> customParameterFunctions = new ArrayList<Function0<ParameterSet>>();

    public SimSharingJCheckBox( IUserComponent userComponent ) {
        this.userComponent = userComponent;
        enableMouseEvents();
    }

    public SimSharingJCheckBox( IUserComponent userComponent, Icon icon ) {
        super( icon );
        this.userComponent = userComponent;
        enableMouseEvents();
    }

    public SimSharingJCheckBox( IUserComponent userComponent, Icon icon, boolean selected ) {
        super( icon, selected );
        this.userComponent = userComponent;
        enableMouseEvents();
    }

    public SimSharingJCheckBox( IUserComponent userComponent, String text ) {
        super( text );
        this.userComponent = userComponent;
        enableMouseEvents();
    }

    public SimSharingJCheckBox( IUserComponent userComponent, Action a ) {
        super( a );
        this.userComponent = userComponent;
        enableMouseEvents();
    }

    public SimSharingJCheckBox( IUserComponent userComponent, String text, boolean selected ) {
        super( text, selected );
        this.userComponent = userComponent;
        enableMouseEvents();
    }

    public SimSharingJCheckBox( IUserComponent userComponent, String text, Icon icon ) {
        super( text, icon );
        this.userComponent = userComponent;
        enableMouseEvents();
    }

    public SimSharingJCheckBox( IUserComponent userComponent, String text, Icon icon, boolean selected ) {
        super( text, icon, selected );
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
            sendUserMessage( getParameters().with( enabled, isEnabled() ).with( interactive, isEnabled() ) );
        }
        super.processMouseEvent( e );
    }

    @Override protected void fireActionPerformed( ActionEvent event ) {
        sendUserMessage( getParameters() );
        super.fireActionPerformed( event );
    }

    // Gets parameters. Custom parameters are added following standard parameters.
    private ParameterSet getParameters() {
        return new ParameterSet().with( ParameterKeys.isSelected, isSelected() ).with( getCustomParameters() );
    }

    // Override this is you want to add custom parameters via subclassing.
    protected ParameterSet getCustomParameters() {
        ParameterSet parameterSet = new ParameterSet();
        for ( Function0<ParameterSet> function : customParameterFunctions ) {
            parameterSet.with( function.apply() );
        }
        return parameterSet;
    }

    // Use this if you want to add custom parameters, but can't use subclassing.
    public void addCustomParametersFunction( Function0<ParameterSet> function ) {
        customParameterFunctions.add( function );
    }

    private void sendUserMessage( ParameterSet parameterSet ) {
        //SimSharingManager.sendUserMessage( userComponent, checkBox, pressed, parameterSet );
    }

    // demonstrate usage
    public static void main( String[] args ) {

        //SimSharingManager.init();

        // check box that uses subclassing to provide custom parameters
        final JCheckBox checkBox1 = new SimSharingJCheckBox( new UserComponent( "checkBox1" ), "subclassing" ) {
            @Override protected ParameterSet getCustomParameters() {
                return ParameterSet.parameterSet( ParameterKeys.text, "I use subclassing." );
            }
        };

        // check box that uses mutation to provide custom parameters
        final JCheckBox checkBox2 = new SimSharingJCheckBox( new UserComponent( "checkBox2" ), "mutation" ) {{
            addCustomParametersFunction( new Function0<ParameterSet>() {
                @Override
								public ParameterSet apply() {
                    return ParameterSet.parameterSet( ParameterKeys.text, "I use mutation." );
                }
            } );
        }};

        JFrame frame = new JFrame() {{
            setContentPane( new JPanel() {{
                add( checkBox1 );
                add( checkBox2 );
            }} );
            pack();
            setDefaultCloseOperation( WindowConstants.EXIT_ON_CLOSE );
        }};
        frame.setVisible( true );
    }
}
