// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.simsharing.components;

import java.awt.AWTEvent;
import java.awt.Component;
import java.awt.event.FocusAdapter;
import java.awt.event.FocusEvent;
import java.awt.event.FocusListener;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.text.ParseException;

import javax.swing.JButton;
import javax.swing.JComponent;
import javax.swing.JFormattedTextField;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JSpinner;
import javax.swing.SpinnerModel;
import javax.swing.SpinnerNumberModel;
import javax.swing.WindowConstants;

import edu.colorado.phet.common.phetcommon.simsharing.SimSharingManager;
import edu.colorado.phet.common.phetcommon.simsharing.messages.IParameterValue;
import edu.colorado.phet.common.phetcommon.simsharing.messages.IUserAction;
import edu.colorado.phet.common.phetcommon.simsharing.messages.IUserComponent;
import edu.colorado.phet.common.phetcommon.simsharing.messages.ParameterKeys;
import edu.colorado.phet.common.phetcommon.simsharing.messages.ParameterSet;
import edu.colorado.phet.common.phetcommon.simsharing.messages.ParameterValues;
import edu.colorado.phet.common.phetcommon.simsharing.messages.UserActions;
import edu.colorado.phet.common.phetcommon.simsharing.messages.UserComponent;

import static edu.colorado.phet.common.phetcommon.simsharing.messages.ParameterKeys.*;
import static edu.colorado.phet.common.phetcommon.simsharing.messages.ParameterSet.parameterSet;
import static edu.colorado.phet.common.phetcommon.simsharing.messages.UserComponentTypes.spinner;

/**
 * Swing spinner that sends sim-sharing events.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class SimSharingJSpinner extends JSpinner {

    private final IUserComponent userComponent;
    private boolean buttonPressed, enterPressed, focusLost, upPressed, downPressed;
    private KeyListener keyListener;
    private FocusListener focusListener;

    public SimSharingJSpinner( IUserComponent userComponent, SpinnerModel model ) {
        super( model );
        this.userComponent = userComponent;
        init();
    }

    public SimSharingJSpinner( IUserComponent userComponent ) {
        this.userComponent = userComponent;
        init();
    }

    // Initialization common to all constructors.
    private void init() {
        initListeners();
        enableMouseEvents();
    }

    //TODO since this approach relies on listeners, there may be issues with message synchronization
    /*
     * User interaction and program calls both result in calls to fireStateChanged.
     * This method registers listeners that will set flags that indicate that various
     * types of user interactions have been performed. The flags allow us to differentiate
     * between user and program initiated actions.
     */
    private void initListeners() {

        // up/down buttons
        MouseListener mouseListener = new MouseAdapter() {
            @Override public void mousePressed( MouseEvent e ) {
                buttonPressed = true;
            }

            @Override public void mouseReleased( MouseEvent e ) {
                buttonPressed = false;
            }
        };
        for ( Component child : getComponents() ) {
            if ( child instanceof JButton ) {
                ( (JButton) child ).addMouseListener( mouseListener );
            }
        }

        // text field
        {
            // Enter key
            keyListener = new KeyAdapter() {
                @Override public void keyPressed( KeyEvent e ) {
                    if ( e.getKeyCode() == KeyEvent.VK_ENTER ) {
                        enterPressed = true;
                    }
                    else if ( e.getKeyCode() == KeyEvent.VK_UP ) {
                        upPressed = true;
                    }
                    else if ( e.getKeyCode() == KeyEvent.VK_DOWN ) {
                        downPressed = true;
                    }
                }
            };
            // Focus lost
            focusListener = new FocusAdapter() {
                @Override public void focusLost( FocusEvent e ) {
                    focusLost = true;
                }
            };
            JComponent editor = getEditor();
            if ( editor instanceof DefaultEditor ) {
                final JFormattedTextField textField = ( (DefaultEditor) editor ).getTextField();
                textField.addKeyListener( keyListener );
                textField.addFocusListener( focusListener );
            }
        }
    }

    // Guard against corner case where focusLost=true because fireStateChanged hasn't been called.
    @Override public void setEnabled( boolean enabled ) {
        focusLost = focusLost && enabled;
        super.setEnabled( enabled );
    }

    // Rewire the text field listeners
    @Override public void setEditor( JComponent editor ) {
        JComponent currentEditor = getEditor();
        // remove listeners from previous text field
        if ( currentEditor instanceof DefaultEditor ) {
            final JFormattedTextField textField = ( (DefaultEditor) currentEditor ).getTextField();
            textField.removeKeyListener( keyListener );
            textField.removeFocusListener( focusListener );
        }
        // add listeners to new text field
        if ( editor instanceof DefaultEditor ) {
            final JFormattedTextField textField = ( (DefaultEditor) editor ).getTextField();
            textField.addKeyListener( keyListener );
            textField.addFocusListener( focusListener );
        }
        super.setEditor( editor );
    }

    //Make sure processMouseEvent gets called even if no listeners registered.  See http://www.dickbaldwin.com/java/Java102.htm#essential_ingredients_for_extending_exis
    private void enableMouseEvents() {
        enableEvents( AWTEvent.MOUSE_EVENT_MASK );
    }

    //When mouse is pressed, send a simsharing event if the component is disabled.  Safer to override than add listener, since the listener could be removed with removeAllListeners().
    //Only works if enableEvents has been called.  See #3218
    //TODO: this might not work right since spinner is composite
    @Override protected void processMouseEvent( MouseEvent e ) {
        if ( e.getID() == MouseEvent.MOUSE_PRESSED && !isEnabled() ) {
            sendMessage( UserActions.mousePressed, getCommonParameters().with( enabled, isEnabled() ).with( interactive, isEnabled() ) );
        }
        super.processMouseEvent( e );
    }

    // Sends a message if this was called as the result of some user interaction, as indicated by flags.
    @Override protected void fireStateChanged() {
        if ( buttonPressed ) {
            sendMessage( UserActions.buttonPressed );
            // don't change buttonPressed, this will be handled by the MouseListener
        }
        else if ( enterPressed ) {
            sendTextFieldCommittedMessage( ParameterValues.enterKey );
            enterPressed = false;
        }
        else if ( focusLost ) {
            sendTextFieldCommittedMessage( ParameterValues.focusLost );
            focusLost = false;
        }
        else if ( upPressed ) {
            sendTextFieldCommittedMessage( ParameterValues.upKey );
            upPressed = false;
        }
        else if ( downPressed ) {
            sendTextFieldCommittedMessage( ParameterValues.downKey );
            downPressed = false;
        }
        super.fireStateChanged();
    }

    private void sendTextFieldCommittedMessage( IParameterValue commitAction ) {
        sendMessage( UserActions.textFieldCommitted, ParameterSet.parameterSet( ParameterKeys.commitAction, commitAction ).with( getCommonParameters() ) );
    }

    // Parameters that are common to all messages.
    protected ParameterSet getCommonParameters() {
        return parameterSet( value, getValue().toString() );
    }

    // Sends a message with common parameters.
    protected void sendMessage( IUserAction action ) {
        sendMessage( action, getCommonParameters() );
    }

    // Sends a message with custom parameters.
    protected void sendMessage( IUserAction action, ParameterSet parameterSet ) {
        //SimSharingManager.sendUserMessage( userComponent, spinner, action, parameterSet );
    }

    // test
    public static void main( String[] args ) {

        //SimSharingManager.init();

        // integer spinner
        final SimSharingJSpinner spinner = new SimSharingJSpinner( new UserComponent( "testSpinner" ) ) {{
            setModel( new SpinnerNumberModel( 0, 0, 100, 1 ) );
            final NumberEditor editor = new NumberEditor( this );
            setEditor( editor );
            editor.getTextField().addKeyListener( new KeyAdapter() {
                @Override public void keyPressed( KeyEvent e ) {
                    if ( e.getKeyCode() == KeyEvent.VK_ENTER ) {
                        try {
                            commitEdit();
                        }
                        catch ( ParseException pe ) {
                            pe.printStackTrace();
                        }
                        System.out.println( "client: enter pressed, value=" + getValue() ); // this should happen after message is sent
                    }
                }
            } );
            editor.getTextField().addFocusListener( new FocusAdapter() {
                @Override public void focusLost( FocusEvent e ) {
                    try {
                        commitEdit();
                    }
                    catch ( ParseException pe ) {
                        pe.printStackTrace();
                    }
                    System.out.println( "client: focus lost, value=" + getValue() ); // this should happen after message is sent
                }
            } );
        }};

        // A button, so we have something else that can get focus.
        final JButton button = new JButton( "button" );

        // frame
        JFrame frame = new JFrame() {{
            setContentPane( new JPanel() {{
                add( spinner );
                add( button );
            }} );
            pack();
            setDefaultCloseOperation( WindowConstants.EXIT_ON_CLOSE );
        }};
        frame.setVisible( true );
    }
}
