// Copyright 2002-2012, University of Colorado
package edu.colorado.phet.common.phetcommon.simsharing.components;

import java.awt.AWTEvent;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.FocusEvent;
import java.awt.event.FocusListener;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.awt.event.MouseEvent;

import javax.swing.JCheckBox;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.WindowConstants;
import javax.swing.text.Document;

import edu.colorado.phet.common.phetcommon.simsharing.SimSharingManager;
import edu.colorado.phet.common.phetcommon.simsharing.messages.IUserAction;
import edu.colorado.phet.common.phetcommon.simsharing.messages.IUserComponent;
import edu.colorado.phet.common.phetcommon.simsharing.messages.ParameterKeys;
import edu.colorado.phet.common.phetcommon.simsharing.messages.ParameterSet;
import edu.colorado.phet.common.phetcommon.simsharing.messages.UserActions;
import edu.colorado.phet.common.phetcommon.simsharing.messages.UserComponent;

import static edu.colorado.phet.common.phetcommon.simsharing.messages.ParameterKeys.enabled;
import static edu.colorado.phet.common.phetcommon.simsharing.messages.ParameterKeys.interactive;
import static edu.colorado.phet.common.phetcommon.simsharing.messages.ParameterSet.parameterSet;
import static edu.colorado.phet.common.phetcommon.simsharing.messages.UserComponentTypes.textField;

/**
 * Swing text field that sends sim-sharing messages.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
@SuppressWarnings("serial")
public class SimSharingJTextField extends JTextField {

    private final IUserComponent userComponent; // user component that will appear in all messages
    private final ActionListener dummyActionListener = new ActionListener() {  // workaround, see enableFireActionPerformed
        @Override
				public void actionPerformed( ActionEvent e ) {}
    };

    private boolean focusMessagesEnabled = true; // Enabled by default because we typically commit text field values on focusLost.
    private boolean keyPressedMessagesEnabled = false; // Disabled by default because this verbosity isn't typically needed.

    public SimSharingJTextField( IUserComponent userComponent ) {
        super();
        this.userComponent = userComponent;
        init();
    }

    public SimSharingJTextField( IUserComponent userComponent, String text ) {
        super( text );
        this.userComponent = userComponent;
        init();
    }

    public SimSharingJTextField( IUserComponent userComponent, String text, int columns ) {
        super( text, columns );
        this.userComponent = userComponent;
        init();
    }

    public SimSharingJTextField( IUserComponent userComponent, int columns ) {
        super( columns );
        this.userComponent = userComponent;
        init();
    }

    public SimSharingJTextField( IUserComponent userComponent, Document doc, String text, int columns ) {
        super( doc, text, columns );
        this.userComponent = userComponent;
        init();
    }

    // Non-final initialization common to all constructors
    private void init() {
        enableFireActionPerformed();
        enableMouseEvents();
    }

    // Determines whether messages are sent for focus changes.
    public void setFocusMessagesEnabled( boolean enabled ) {
        focusMessagesEnabled = enabled;
    }

    public boolean isFocusMessagesEnabled() {
        return focusMessagesEnabled;
    }

    // Determines whether messages are sent for key presses.
    public void setKeyPressedMessagesEnabled( boolean enabled ) {
        keyPressedMessagesEnabled = enabled;
    }

    public boolean isKeyPressedMessagesEnabled() {
        return keyPressedMessagesEnabled;
    }

    // fireActionPerformed is only called if there is at least one registered ActionListener, so register one that does nothing.
    private void enableFireActionPerformed() {
        addActionListener( dummyActionListener );
    }

    // Prevent clients from sabotaging the workaround installed by enableFireActionPerformed.
    @Override public void removeActionListener( ActionListener l ) {
        if ( l != dummyActionListener ) {
            super.removeActionListener( l );
        }
    }

    /*
    * Make sure processMouseEvent gets called even if no listeners registered.
    * See http://www.dickbaldwin.com/java/Java102.htm#essential_ingredients_for_extending_exis
    */
    private void enableMouseEvents() {
        enableEvents( AWTEvent.MOUSE_EVENT_MASK );
    }

    /*
     * Called when the user presses enter/return.
     * This could have been treated as a keyPressed action (see processKeyEvent), but
     * (a) the primary way that a text field is committed is by registering an ActionListener (not a KeyListener), and
     * (b) keyPressed messages are disabled by default, because they are verbose.
     */
    @Override protected void fireActionPerformed() {
        sendUserMessage( UserActions.enterPressed, getParameters() );
        super.fireActionPerformed();
    }

    // Called when focus changes
    @Override protected void processFocusEvent( FocusEvent e ) {
        if ( focusMessagesEnabled ) {
            if ( e.getID() == FocusEvent.FOCUS_LOST ) {
                sendUserMessage( UserActions.focusLost, getParameters() );
            }
            else if ( e.getID() == FocusEvent.FOCUS_GAINED ) {
                sendUserMessage( UserActions.focusGained, getParameters() );
            }
        }
        super.processFocusEvent( e );
    }

    // Called when a key is pressed. Enter is ignored so we don't have duplication with fireActionPerformed.
    @Override protected void processKeyEvent( KeyEvent e ) {
        if ( keyPressedMessagesEnabled && e.getID() == KeyEvent.KEY_PRESSED && e.getKeyCode() != KeyEvent.VK_ENTER ) {
            sendUserMessage( UserActions.keyPressed, getParameters().with( ParameterKeys.key, KeyEvent.getKeyText( e.getKeyCode() ) ) );
        }
        super.processKeyEvent( e );
    }

    /*
     * When mouse is pressed, send a message if the component is disabled.
     * Safer to override than add listener, since the listener could be removed with removeAllListeners().
     * Only works if enableEvents has been called. See #3218.
     */
    @Override protected void processMouseEvent( MouseEvent e ) {
        if ( e.getID() == MouseEvent.MOUSE_PRESSED && !isEnabled() ) {
            sendUserMessage( UserActions.pressed, parameterSet( enabled, isEnabled() ).with( interactive, isEnabled() ) );
        }
        super.processMouseEvent( e );
    }

    // Parameters that are common to all messages
    protected ParameterSet getParameters() {
        return new ParameterSet().with( ParameterKeys.text, getText() );
    }

    // All messages are sent via this method, so that they all have the same component and component type.
    private void sendUserMessage( IUserAction action, ParameterSet parameterSet ) {
        //SimSharingManager.sendUserMessage( userComponent, textField, action, parameterSet );
    }

    /*
     * To test:
     *
     * - change check boxes to enable/disable message types
     * - press Enter/Return in text field to demonstrate enterPressed message
     * - type in text field to demonstrate keyPressed messages
     * - tab through components to demonstrate focus messages
     * - note that registered listeners are notified after messages are sent
     */
    public static void main( String[] args ) {

        //SimSharingManager.init();

        final SimSharingJTextField textField = new SimSharingJTextField( new UserComponent( "myTextField" ), "SimSharingJTextField", 20 );
        textField.setKeyPressedMessagesEnabled( true );

        // Add listeners to verify that messages occur before listeners are notified.
        textField.addActionListener( new ActionListener() {
            @Override
						public void actionPerformed( ActionEvent e ) {
                System.out.println( "actionPerformed" );
            }
        } );
        textField.addFocusListener( new FocusListener() {
            @Override
						public void focusGained( FocusEvent e ) {
                System.out.println( "focusGained" );
            }

            @Override
						public void focusLost( FocusEvent e ) {
                System.out.println( "focusLost" );
            }
        } );
        textField.addKeyListener( new KeyAdapter() {
            @Override public void keyPressed( KeyEvent e ) {
                System.out.println( "keyPressed" );
            }
        } );

        // check box for turning keyPress messages on/off
        final JCheckBox keyPressCheckBox = new JCheckBox( "keyPressed messages", textField.isKeyPressedMessagesEnabled() );
        keyPressCheckBox.addActionListener( new ActionListener() {
            @Override
						public void actionPerformed( ActionEvent e ) {
                textField.setKeyPressedMessagesEnabled( keyPressCheckBox.isSelected() );
            }
        } );

        // check box for turning focus messages on/off
        final JCheckBox focusCheckBox = new JCheckBox( "focus messages", textField.isFocusMessagesEnabled() );
        focusCheckBox.addActionListener( new ActionListener() {
            @Override
						public void actionPerformed( ActionEvent e ) {
                textField.setFocusMessagesEnabled( focusCheckBox.isSelected() );
            }
        } );

        JFrame frame = new JFrame() {{
            setContentPane( new JPanel() {{
                add( keyPressCheckBox );
                add( focusCheckBox );
                add( textField );
            }} );
            pack();
            setDefaultCloseOperation( WindowConstants.EXIT_ON_CLOSE );
        }};
        frame.setVisible( true );
    }
}
