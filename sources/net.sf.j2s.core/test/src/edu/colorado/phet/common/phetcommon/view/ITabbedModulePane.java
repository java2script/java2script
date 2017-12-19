// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 54200 $
 * Date modified : $Date: 2011-07-18 19:45:40 -0500 (Mon, 18 Jul 2011) $
 */
package edu.colorado.phet.common.phetcommon.view;

import javax.swing.JComponent;

import edu.colorado.phet.common.phetcommon.application.Module;
import edu.colorado.phet.common.phetcommon.application.ModuleEvent;
import edu.colorado.phet.common.phetcommon.application.ModuleObserver;
import edu.colorado.phet.common.phetcommon.application.PhetApplication;

/**
 * ITabbedModulePane
 * <p/>
 * The interface for tabbed panes that contain and switch between module views
 *
 * @author Ron LeMaster
 * @version $Revision: 54200 $
 */
public interface ITabbedModulePane extends ModuleObserver {
    public void init( final PhetApplication application, final Module[] modules );

    public void addTab( Module module );

    @Override
		public void moduleAdded( ModuleEvent event );

    public void removeTab( Module module );

    @Override
		public void activeModuleChanged( ModuleEvent event );

    public int getTabCount();

    @Override
		public void moduleRemoved( ModuleEvent event );

    public ModulePanel getModulePanel( int i );

    public JComponent getComponent();

    public void setLogoVisible( boolean logoVisible );

    public boolean getLogoVisible();
}
