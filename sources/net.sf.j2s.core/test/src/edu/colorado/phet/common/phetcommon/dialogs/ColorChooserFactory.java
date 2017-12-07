// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author$
 * Revision : $Revision$
 * Date modified : $Date$
 */

package edu.colorado.phet.common.phetcommon.dialogs;

import java.awt.Color;
import java.awt.Component;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JColorChooser;
import javax.swing.JDialog;
import javax.swing.colorchooser.AbstractColorChooserPanel;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

import edu.colorado.phet.common.phetcommon.view.util.SwingUtils;


/**
 * ColorChooserFactory creates non-modal color chooser dialogs.
 *
 * @author Sam Reid, Chris Malley (cmalley@pixelzoom.com)
 * @version $Revision$
 */
public class ColorChooserFactory {

    /**
     * ColorDialog.Listener is the interface that all client must implement.
     */
    public interface Listener {
        /**
         * Called when the user selects a color.
         */
        void colorChanged( Color color );

        /**
         * Called when the user presses the OK button.
         */
        void ok( Color color );

        /**
         * Called when the user pressed the Cancel button.
         */
        void cancelled( Color originalColor );
    }

    /* Not intended for instantiation */
    private ColorChooserFactory() {
    }

    public static JDialog createDialog( String title, Component parent,
                                        final Color initialColor, final Listener listener ) {
        return createDialog( title, parent, initialColor, listener, null );
    }

    /**
     * Creates a color chooser dialog.
     *
     * @param title
     * @param parent
     * @param initialColor
     * @param listener
     * @param panelOrder   optional argument, if non-null, specifies panel ordering, for example if the
     *                     HSB panel is to be shown first
     *                     see http://www.exampledepot.com/egs/javax.swing.colorchooser/MovePanels.html?l=rel
     */
    public static JDialog createDialog( String title, Component parent,
                                        final Color initialColor, final Listener listener, String[] panelOrder ) {

        final JColorChooser jcc = new JColorChooser( initialColor );

        if ( panelOrder != null ) {
            //see http://www.exampledepot.com/egs/javax.swing.colorchooser/MovePanels.html?l=rel
            AbstractColorChooserPanel[] newPanels = new AbstractColorChooserPanel[panelOrder.length];
            for ( int i = 0; i < newPanels.length; i++ ) {
                newPanels[i] = findPanel( jcc, panelOrder[i] );
            }
            jcc.setChooserPanels( newPanels );//TODO Error handling for missing panels?
        }

        jcc.getSelectionModel().addChangeListener( new ChangeListener() {
            @Override
						public void stateChanged( ChangeEvent e ) {
                listener.colorChanged( jcc.getColor() );
            }
        } );

        JDialog dialog = JColorChooser.createDialog( parent, title, false, jcc,
                                                     new ActionListener() {
                                                         @Override
																												public void actionPerformed( ActionEvent e ) {
                                                             listener.ok( jcc.getColor() );
                                                         }
                                                     },
                                                     new ActionListener() {
                                                         @Override
																												public void actionPerformed( ActionEvent e ) {
                                                             listener.cancelled( initialColor );
                                                         }
                                                     }
        );


        SwingUtils.centerDialogInParent( dialog );
        if ( parent == null ) {
            SwingUtils.centerWindowOnScreen( dialog );
        }
        return dialog;
    }

    /**
     * Creates a color chooser dialog and makes it visible.
     */
    public static void showDialog( String title, Component parent, final Color initialColor, final Listener listener ) {
        showDialog( title, parent, initialColor, listener, false );
    }

    /**
     * Creates a color chooser dialog and makes it visible.
     *
     * @param hsbFirst true if the HSB panel should be shown first, false if the Swing defaults should be used
     */
    public static void showDialog( String title, Component parent, final Color initialColor, final Listener listener, boolean hsbFirst ) {
        JDialog dialog = ColorChooserFactory.createDialog( title, parent, initialColor, listener, hsbFirst ? getHSBFirstPanelOrder() : null );
        dialog.show();
    }

    //see http://www.exampledepot.com/egs/javax.swing.colorchooser/GetPanels.html
    private static String[] getHSBFirstPanelOrder() {
        return new String[] { "javax.swing.colorchooser.DefaultHSBChooserPanel",
                "javax.swing.colorchooser.DefaultRGBChooserPanel",
                "javax.swing.colorchooser.DefaultSwatchChooserPanel"
        };
    }

    // Returns the panel instance with the specified name.
    // Returns null if not found.
    private static AbstractColorChooserPanel findPanel( JColorChooser chooser, String name ) {
        AbstractColorChooserPanel[] panels = chooser.getChooserPanels();

        for ( int i = 0; i < panels.length; i++ ) {
            String clsName = panels[i].getClass().getName();

            if ( clsName.equals( name ) ) {
                return panels[i];
            }
        }
        return null;
    }
}