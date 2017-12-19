// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.view.menu;


import javax.swing.JMenu;

import edu.colorado.phet.common.phetcommon.application.PhetApplication;

/**
 * DeveloperMenu is the "Developer" menu that appears in the menu bar.
 * This menu contains global developer-only features for tuning and debugging.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class DeveloperMenu extends JMenu {

    public DeveloperMenu( PhetApplication app ) {
        super( "Developer" );
        add( new ControlPanelPropertiesMenuItem( app ) );
    }
}
