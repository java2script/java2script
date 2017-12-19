// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.application;

import java.awt.Dialog;
import java.awt.Frame;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

import javax.swing.JComponent;
import javax.swing.JDialog;
import javax.swing.Timer;

/**
 * This dialog attempts to paint its content pane immediately using a Timer.
 * Use this in situations where your dialog doesn't paint in a timely manner (or at all).
 * <p/>
 * Workaround was originally developed in response to Unfuddle #89.
 * See #2072 for redesign to fix performance problems.
 * <p/>
 * TODO: This is unnecessary in Java 6.
 */
public class PaintImmediateDialog extends JDialog {

    /*
    * Enables/disables the workaround, for testing purposes.
    * true -> workaround enabled, timer paints contentPane while visible,
    * false -> workaround disabled, behaves exactly like a JDialog.
    */
    private static final boolean WORKAROUND_ENABLED = true;

    // Enables/disables debug output on System.out, for testing purposes.
    private static final boolean DEBUG_OUTPUT_ENABLED = false;

    private static final int TIMER_DELAY = 250; // ms, initial delay and between-event delay

    private PaintImmediateTimer timer;

    public PaintImmediateDialog() {
        super();
        initPaintImmediateDialog();
    }

    public PaintImmediateDialog( Frame frame ) {
        super( frame );
        initPaintImmediateDialog();
    }

    public PaintImmediateDialog( Frame frame, String title ) {
        super( frame, title );
        initPaintImmediateDialog();
    }

    public PaintImmediateDialog( Dialog owner ) {
        super( owner );
        initPaintImmediateDialog();
    }

    public PaintImmediateDialog( Dialog owner, String title ) {
        super( owner, title );
        initPaintImmediateDialog();
    }

    public PaintImmediateDialog( Frame owner, boolean modal ) {
        super( owner, modal );
        initPaintImmediateDialog();
    }

    public PaintImmediateDialog( Dialog owner, boolean modal ) {
        super( owner, modal );
        initPaintImmediateDialog();
    }

    public PaintImmediateDialog( Frame owner, String title, boolean modal ) {
        super( owner, title, modal );
        initPaintImmediateDialog();
    }

    public PaintImmediateDialog( Dialog owner, String title, boolean modal ) {
        super( owner, title, modal );
        initPaintImmediateDialog();
    }

    /*
    * Initialization specific to this class.
    */
    private void initPaintImmediateDialog() {

        // Timer that periodically calls paintImmediately on the dialog's content pane
        timer = new PaintImmediateTimer( this );

        // We confirmed that WindowEvents are received in a timely manner, so a listener approach works.
        addWindowListener( new WindowAdapter() {

            // Start the timer when the dialog is opened.
            @Override
            public void windowOpened( WindowEvent e ) {
                timer.start();
            }

            // Stop the timer when the dialog is closed.
            @Override
            public void windowClosed( WindowEvent e ) {
                timer.stop();
            }

            /* 
             * NOTE: We considered overriding windowIconified and windowDeiconified
             * to stop and start the timer, but found that JDialogs cannot be iconified. 
             * They are iconified/deiconified with their parent, and do not received WindowEvents.
             */
        } );
    }

    /*
    * A timer that periodically repaints some component.
    */
    private static class PaintImmediateTimer extends Timer {

        public PaintImmediateTimer( final JDialog dialog ) {
            super( TIMER_DELAY, new ActionListener() {
                @Override
								public void actionPerformed( ActionEvent e ) {
                    // Get the content pane on demand, in case the client changes it.
                    JComponent component = (JComponent) dialog.getContentPane();
                    component.paintImmediately( 0, 0, component.getWidth(), component.getHeight() );
                    if ( DEBUG_OUTPUT_ENABLED ) {
                        System.out.println( "PaintImmediateTimer: paintImmediately" );
                    }
                }
            } );
            setRepeats( true ); // yes, this intentionally repeats, see #2072
        }

        @Override
        public void start() {
            if ( WORKAROUND_ENABLED ) {
                super.start();
                if ( DEBUG_OUTPUT_ENABLED ) {
                    System.out.println( "PaintImmediateTimer: timer started" );
                }
            }
        }

        @Override
        public void stop() {
            if ( WORKAROUND_ENABLED ) {
                super.stop();
                if ( DEBUG_OUTPUT_ENABLED ) {
                    System.out.println( "PaintImmediateTimer: timer stopped" );
                }
            }
        }
    }

}
