// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.view;

import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.image.BufferedImage;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;

import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JComponent;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;

import edu.colorado.phet.common.phetcommon.resources.PhetCommonResources;
import edu.colorado.phet.common.phetcommon.view.util.SwingUtils;

/**
 * TimeControlPanel implements a Swing component for controlling the clock in PhET simulations.
 *
 * @author Chris Malley, Sam Reid
 */
public class TimeControlPanel extends JPanel {

    public static final NumberFormat DEFAULT_TIME_FORMAT = new DecimalFormat( "0" );
    public static final int DEFAULT_TIME_COLUMNS = 8;

    private JButton playPauseButton;
    private JButton stepButton;
    private JButton restartButton;
    private ImageIcon playIcon;
    private ImageIcon pauseIcon;
    private String playString;
    private String pauseString;
    private JTextField timeTextField;
    private JLabel unitsLabel;
    private JPanel buttonPanel;
    private JPanel timeDisplayPanel;

    private NumberFormat timeFormat;
    private double time;
    private boolean paused;
    private JPanel userPanel;

    private ArrayList<TimeControlListener> listeners = new ArrayList<TimeControlListener>();

    public TimeControlPanel() {

        time = 0;
        paused = false;
        timeFormat = DEFAULT_TIME_FORMAT;

        // Play/Pause
        playString = PhetCommonResources.getInstance().getLocalizedString( PhetCommonResources.STRING_CLOCK_PLAY );
        pauseString = PhetCommonResources.getInstance().getLocalizedString( PhetCommonResources.STRING_CLOCK_PAUSE );
        BufferedImage playImage = PhetCommonResources.getInstance().getImage( PhetCommonResources.IMAGE_PLAY );
        BufferedImage pauseImage = PhetCommonResources.getInstance().getImage( PhetCommonResources.IMAGE_PAUSE );
        playIcon = new ImageIcon( playImage );
        pauseIcon = new ImageIcon( pauseImage );
        playPauseButton = new JButton();
        Dimension maxSize = SwingUtils.getMaxDimension( playPauseButton, playString, playIcon, pauseString, pauseIcon );
        playPauseButton.setPreferredSize( maxSize );

        // Step
        String stepString = PhetCommonResources.getInstance().getLocalizedString( PhetCommonResources.STRING_CLOCK_STEP );
        BufferedImage stepImage = PhetCommonResources.getInstance().getImage( PhetCommonResources.IMAGE_STEP_FORWARD );
        ImageIcon stepIcon = new ImageIcon( stepImage );
        stepButton = new JButton( stepString, stepIcon );

        // Restart
        String restartString = PhetCommonResources.getInstance().getLocalizedString( PhetCommonResources.STRING_CLOCK_RESTART );
        BufferedImage restartImage = PhetCommonResources.getInstance().getImage( PhetCommonResources.IMAGE_RESTART );
        ImageIcon restartIcon = new ImageIcon( restartImage );
        restartButton = new JButton( restartString, restartIcon );

        // Put all the buttons in a button panel
        buttonPanel = new JPanel( new FlowLayout( FlowLayout.CENTER ) );
        buttonPanel.add( restartButton );
        buttonPanel.add( playPauseButton );
        buttonPanel.add( stepButton );

        // Time display, time value & units
        timeTextField = new JTextField();
        timeTextField.setColumns( DEFAULT_TIME_COLUMNS );
        timeTextField.setEditable( false );
        timeTextField.setHorizontalAlignment( JTextField.RIGHT );
        unitsLabel = new JLabel();
        timeDisplayPanel = new JPanel( new FlowLayout( FlowLayout.CENTER ) );
        timeDisplayPanel.add( timeTextField );
        timeDisplayPanel.add( unitsLabel );

        // User panel, for stuff between the time display and buttons
        userPanel = new JPanel( new FlowLayout( FlowLayout.CENTER ) );

        // for backward compatibility with existing sims
        restartButton.setVisible( false );
        timeTextField.setVisible( false );
        unitsLabel.setVisible( false );

        // Workaround for Macintosh
        SwingUtils.fixButtonOpacity( playPauseButton );
        SwingUtils.fixButtonOpacity( stepButton );

        // Layout the button panel
        setLayout( new FlowLayout( FlowLayout.CENTER ) );
        add( timeDisplayPanel );
        add( userPanel );
        add( buttonPanel );

        // Adapter methods for event dispatch
        playPauseButton.addActionListener( new ActionListener() {
            @Override
						public void actionPerformed( ActionEvent e ) {
                paused = !paused;
                updateButtons();
                if ( paused ) {
                    notifyPausePressed();
                }
                else {
                    notifyPlayPressed();
                }
            }
        } );
        stepButton.addActionListener( new ActionListener() {
            @Override
						public void actionPerformed( ActionEvent e ) {
                notifyStepPressed();
            }
        } );
        restartButton.addActionListener( new ActionListener() {
            @Override
						public void actionPerformed( ActionEvent e ) {
                notifyRestartPressed();
            }
        } );

        updateButtons();
    }

    /**
     * Sets the text for the step button to the specified value.
     *
     * @param text the label text to display on the step button
     */
    public void setStepButtonText( String text ) {
        stepButton.setText( text );
    }

    /**
     * Sets the visibility of the Restart button.
     * This button is invisible by default for backward compatibility with existing sims.
     *
     * @param visible
     */
    public void setRestartButtonVisible( boolean visible ) {
        restartButton.setVisible( visible );
    }

    /**
     * Sets the visibility of the time display.
     * This display is invisible by default for backward compatibility with existing sims.
     *
     * @param visible
     */
    public void setTimeDisplayVisible( boolean visible ) {
        timeTextField.setVisible( visible );
        unitsLabel.setVisible( visible );
        if ( visible ) {
            updateTimeDisplay();
        }
    }

    /**
     * Convenience method for adding a component to the left of this panel.
     *
     * @param component
     */
    public void addToLeft( JComponent component ) {
        add( component, 0 );
    }

    /**
     * Adds component between the time display and the buttons.
     * <p/>
     * TODO: This is a hack, currently used by some sims to add a clock speed control.
     * We should figure out a better way to add components to the layout, or
     * add a standard clock speed control to this control panel.
     *
     * @param component
     */
    public void addBetweenTimeDisplayAndButtons( JComponent component ) {
        userPanel.add( component );
    }

    /**
     * Sets whether this TimeControlPanel should treat time as paused.
     *
     * @param paused
     */
    public void setPaused( boolean paused ) {
        this.paused = paused;
        updateButtons();
    }

    /**
     * Enables or disables the clock control panel.
     * When disabled, all buttons (play/pause/step) are also disabled.
     * When enabled, the buttons are enabled to correspond to the clock state.
     *
     * @param enabled true or false
     */
    @Override
		public void setEnabled( boolean enabled ) {
        super.setEnabled( enabled );
        updateButtons();
    }

    /**
     * Gets the "Restart" component, used for attaching help items.
     *
     * @return
     */
    public JComponent getRestartComponent() {
        return restartButton;
    }

    /**
     * Sets the format of the time display.
     * See DecimalFormat for specification of pattern syntax.
     *
     * @param formatPattern
     */
    public void setTimeFormat( String formatPattern ) {
        setTimeFormat( new DecimalFormat( formatPattern ) );
    }

    /**
     * Sets the format of the time display.
     *
     * @param format
     */
    public void setTimeFormat( NumberFormat format ) {
        timeFormat = format;
        updateTimeDisplay();
    }

    /**
     * Sets the font used to display the time.
     *
     * @param font
     */
    public void setTimeFont( Font font ) {
        timeTextField.setFont( font );
    }

    /**
     * Sets the number of columns used to display the time.
     *
     * @param columns
     */
    public void setTimeColumns( int columns ) {
        timeTextField.setColumns( columns );
    }

    /**
     * Sets the time units.
     *
     * @param units
     */
    public void setUnits( String units ) {
        unitsLabel.setText( units );
    }

    /**
     * Sets the font for the time units.
     *
     * @param font
     */
    public void setUnitsFont( Font font ) {
        unitsLabel.setFont( font );
    }

    /**
     * Sets the time displayed.
     */
    public void setTimeDisplay( double time ) {
        if ( time != this.time ) {
            this.time = time;
            updateTimeDisplay();
        }
    }

    /*
    * Updates the time display.
    */
    private void updateTimeDisplay() {
        if ( timeTextField.isVisible() ) {
            String sValue = timeFormat.format( time );
            timeTextField.setText( sValue );
        }
    }

    /*
     * Updates the state of the play/pause and step buttons to reflect whether the control is paused and/or enabled.
     */
    private void updateButtons() {
        playPauseButton.setText( paused ? playString : pauseString );
        playPauseButton.setIcon( paused ? playIcon : pauseIcon );
        playPauseButton.setEnabled( isEnabled() );
        stepButton.setEnabled( isEnabled() && paused );
        restartButton.setEnabled( isEnabled() );
    }

    public void addTimeControlListener( TimeControlListener listener ) {
        listeners.add( listener );
    }

    public void removeTimeControlListener( TimeControlListener listener ) {
        listeners.remove( listener );
    }

    private void notifyStepPressed() {
        for ( int i = 0; i < listeners.size(); i++ ) {
            listeners.get( i ).stepPressed();
        }
    }

    private void notifyPlayPressed() {
        for ( int i = 0; i < listeners.size(); i++ ) {
            listeners.get( i ).playPressed();
        }
    }

    private void notifyPausePressed() {
        for ( int i = 0; i < listeners.size(); i++ ) {
            listeners.get( i ).pausePressed();
        }
    }

    private void notifyRestartPressed() {
        for ( int i = 0; i < listeners.size(); i++ ) {
            listeners.get( i ).restartPressed();
        }
    }

    /**
     * Returns the component responsible for handling play/pause button presses.
     *
     * @return the play/pause button
     */
    public JComponent getPlayPauseButton() {
        return playPauseButton;
    }

    public static void main( String[] args ) {
        JFrame frame = new JFrame();
        TimeControlPanel pane = new TimeControlPanel();
        pane.setRestartButtonVisible( true );
        pane.addTimeControlListener( new TimeControlListener() {
            @Override
						public void stepPressed() {
                System.out.println( "TimeControlPanel.stepPressed" );
            }

            @Override
						public void playPressed() {
                System.out.println( "TimeControlPanel.playPressed" );
            }

            @Override
						public void pausePressed() {
                System.out.println( "TimeControlPanel.pausePressed" );
            }

            @Override
						public void restartPressed() {
                System.out.println( "TimeControlPanel.restartPressed" );
            }

            @Override
						public void stepBackPressed() {
                System.out.println( "TimeControlPanel.stepBackPressed" );
            }
        } );
        frame.setContentPane( pane );
        frame.pack();
        frame.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE );
        SwingUtils.centerWindowOnScreen( frame );
        frame.setVisible( true );
    }
}
