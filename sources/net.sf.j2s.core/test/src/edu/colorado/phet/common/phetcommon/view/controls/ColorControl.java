// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.view.controls;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Frame;
import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.event.MouseEvent;
import java.awt.image.BufferedImage;

import javax.swing.Box;
import javax.swing.ImageIcon;
import javax.swing.JDialog;
import javax.swing.JLabel;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;
import javax.swing.event.EventListenerList;
import javax.swing.event.MouseInputAdapter;
import javax.swing.event.MouseInputListener;

import edu.colorado.phet.common.phetcommon.dialogs.ColorChooserFactory;
import edu.colorado.phet.common.phetcommon.view.HorizontalLayoutPanel;
import edu.colorado.phet.common.phetcommon.view.util.RectangleUtils;

/**
 * ColorControl is a control for setting a color.
 * Clicking on the control opens a color chooser dialog.
 * ChangeListeners are notified when the color is changed.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class ColorControl extends HorizontalLayoutPanel {

    //----------------------------------------------------------------------------
    // Class<?> data
    //----------------------------------------------------------------------------

    private static final Dimension DEFAULT_CHIP_SIZE = new Dimension( 15, 15 );

    //----------------------------------------------------------------------------
    // Instance data
    //----------------------------------------------------------------------------

    private Frame parentFrame;
    private String labelString; // label that appear to left of color chip
    private JLabel colorChip; // color chip, show the current color, click to open color chooser
    private Dimension chipSize;
    private Color color;
    private JDialog colorChooserDialog;
    private EventListenerList listenerList; // ChangeListeners are notified of color changes

    //----------------------------------------------------------------------------
    // Constructors
    //----------------------------------------------------------------------------

    /**
     * Constructor, creates a control with a default color chip size.
     *
     * @param labelString
     * @param color
     */
    public ColorControl( Frame parentFrame, String labelString, Color color ) {
        this( parentFrame, labelString, color, DEFAULT_CHIP_SIZE );
    }

    /**
     * Constructor.
     *
     * @param labelString
     * @param color
     * @param chipSize
     */
    public ColorControl( Frame parentFrame, String labelString, Color color, Dimension chipSize ) {
        super();

        this.parentFrame = parentFrame;
        this.labelString = labelString;
        this.chipSize = new Dimension( chipSize );
        listenerList = new EventListenerList();

        MouseInputListener mouseInputListener = new MouseInputAdapter() {
            @Override
						public void mouseClicked( MouseEvent event ) {
                openColorChooser();
            }
        };

        JLabel label = new JLabel( labelString );
        label.addMouseListener( mouseInputListener );

        colorChip = new JLabel();
        colorChip.addMouseListener( mouseInputListener );

        add( label );
        add( Box.createHorizontalStrut( 5 ) );
        add( colorChip );

        setColor( color );
    }

    //----------------------------------------------------------------------------
    // Setters & getters
    //----------------------------------------------------------------------------

    /**
     * Sets the color. ChangeListeners are notified.
     *
     * @param color
     */
    public void setColor( Color color ) {
        if ( !color.equals( this.color ) ) {
            this.color = color;
            updateColorChip( color );
            fireChangeEvent( new ChangeEvent( this ) );
        }
    }

    /**
     * Gets the color.
     *
     * @return Color
     */
    public Color getColor() {
        return color;
    }

    /*
    * Updates the color chip.
    */
    private void updateColorChip( Color color ) {
        Rectangle r = new Rectangle( 0, 0, chipSize.width, chipSize.height );
        BufferedImage image = new BufferedImage( r.width, r.height, BufferedImage.TYPE_INT_RGB );
        Graphics2D g2 = image.createGraphics();
        g2.setColor( color );
        RectangleUtils.fillRect(g2, r);
        g2.setStroke( new BasicStroke( 1f ) );
        g2.setColor( Color.BLACK );
        RectangleUtils.drawRect(g2, r );
        colorChip.setIcon( new ImageIcon( image ) );
    }

    //----------------------------------------------------------------------------
    // Color Chooser
    //----------------------------------------------------------------------------

    /*
    * Opens the color chooser dialog.
    */
    private void openColorChooser() {
        closeColorChooser();
        ColorChooserFactory.Listener listener = new ColorChooserFactory.Listener() {
            @Override
						public void colorChanged( Color color ) {
                setColor( color );
            }

            @Override
						public void ok( Color color ) {
                setColor( color );
            }

            @Override
						public void cancelled( Color originalColor ) {
                setColor( originalColor );
            }
        };
        colorChooserDialog = ColorChooserFactory.createDialog( labelString, parentFrame, color, listener );
        colorChooserDialog.setVisible( true );
    }

    /*
    * Closes the color chooser dialog.
    */
    private void closeColorChooser() {
        if ( colorChooserDialog != null ) {
            colorChooserDialog.dispose();
        }
    }

    //----------------------------------------------------------------------------
    // Event handling
    //----------------------------------------------------------------------------

    /**
     * Adds a ChangeListener.
     *
     * @param listener the listener
     */
    public void addChangeListener( ChangeListener listener ) {
        listenerList.add( ChangeListener.class, listener );
    }

    /**
     * Removes a ChangeListener.
     *
     * @param listener the listener
     */
    public void removeChangeListener( ChangeListener listener ) {
        listenerList.remove( ChangeListener.class, listener );
    }

    /**
     * Fires a ChangeEvent.
     *
     * @param event the event
     */
    private void fireChangeEvent( ChangeEvent event ) {
        Object[] listeners = listenerList.getListenerList();
        for ( int i = 0; i < listeners.length; i += 2 ) {
            if ( listeners[i] == ChangeListener.class ) {
                ( (ChangeListener) listeners[i + 1] ).stateChanged( event );
            }
        }
    }
}
