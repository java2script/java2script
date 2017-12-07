// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.view.menu;

import java.awt.Color;
import java.awt.Component;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JDialog;

import edu.colorado.phet.common.phetcommon.dialogs.ColorChooserFactory;
import edu.colorado.phet.common.phetcommon.dialogs.ColorChooserFactory.Listener;
import edu.colorado.phet.common.phetcommon.model.property.Property;
import edu.colorado.phet.common.phetcommon.simsharing.components.SimSharingJMenuItem;
import edu.colorado.phet.common.phetcommon.simsharing.messages.IUserComponent;
import edu.colorado.phet.common.phetcommon.view.util.SwingUtils;

/**
 * This JMenuItem shows a Color dialog when selected so the user can change the color of the given color property.
 *
 * @author Sam Reid
 */
public class ColorDialogMenuItem extends SimSharingJMenuItem {
  final static JDialog[] dialog =  new JDialog[1]; // Optimized away
  // BH can't create a final null dialog, of course, so we opt for an array
  // BH this will have to be created in a nonmodal manner
  
  public ColorDialogMenuItem( IUserComponent component, final Component parent, final String title, final Property<Color> colorProperty ) {
        super( component, title );

        //Adapter to pass information from the ColorChooserFactory.Listener to the Property<Color>

        //Create the dialog


        //Show the dialog if/when the user presses the button
        addActionListener( new ActionListener() {
            @Override
						public void actionPerformed( ActionEvent e ) {
            	if (dialog[0] == null) 
            		dialog[0] = ColorChooserFactory.createDialog( title, parent, colorProperty.get(), 
            		 new Listener() {
                  @Override
      						public void colorChanged( Color color ) {
                      colorProperty.set( color );
                  }

                  @Override
      						public void ok( Color color ) {
                      colorProperty.set( color );
                  }

                  @Override
      						public void cancelled( Color originalColor ) {
                      colorProperty.set( originalColor );
                  }
              });
            	
                SwingUtils.centerInParent( dialog[0] );
                dialog[0].setVisible( true );
            }
        } );
    }
}
