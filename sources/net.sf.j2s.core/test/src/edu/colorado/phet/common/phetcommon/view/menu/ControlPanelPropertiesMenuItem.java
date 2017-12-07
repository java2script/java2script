// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.view.menu;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

import javax.swing.JCheckBoxMenuItem;
import javax.swing.JDialog;

import edu.colorado.phet.common.phetcommon.application.PhetApplication;

/**
 * Menu item that provides access to controls for properties related to a Module's standard control panels.
 * This menu item is intended to be added to the Developer menu, and is therefore not internationalized.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class ControlPanelPropertiesMenuItem extends JCheckBoxMenuItem {

    private static final String ITEM_LABEL = "Control Panel properties..."; // developer control, i18n not required

    private JDialog dialog;

    public ControlPanelPropertiesMenuItem( final PhetApplication app ) {
        super( ITEM_LABEL );
        addActionListener( new ActionListener() {
            @Override
						public void actionPerformed( ActionEvent event ) {
                handleAction( app );
            }
        } );
    }

    private void handleAction( PhetApplication app ) {
        if ( isSelected() ) {
            dialog = new ControlPanelPropertiesDialog( app );
            dialog.setVisible( true );
            dialog.addWindowListener( new WindowAdapter() {

                @Override
								public void windowClosed( WindowEvent e ) {
                    cleanup();
                }

                @Override
								public void windowClosing( WindowEvent e ) {
                    cleanup();
                }

                private void cleanup() {
                    setSelected( false );
                    dialog = null;
                }
            } );
        }
        else {
            dialog.dispose();
        }
    }
}
