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
import javax.swing.JTabbedPane;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

import edu.colorado.phet.common.phetcommon.application.Module;
import edu.colorado.phet.common.phetcommon.application.ModuleEvent;
import edu.colorado.phet.common.phetcommon.application.PhetApplication;

/**
 * An on-screen container for the modules in an application.  It is only used for applications
 * that have more than one module. This class uses JTabbedPane as its base, and is intended for
 * use primarilly for simulations that do not use Piccolo.
 *
 * @author Sam and Ron
 * @version $Revision: 54200 $
 */
public class JTabbedModulePane extends JTabbedPane implements ITabbedModulePane {
    private Module current;
    private PhetApplication application;

    public JTabbedModulePane() {
    }

    @Override
		public void init( final PhetApplication application, final Module[] modules ) {
        this.application = application;
        addChangeListener( new ChangeListener() {
            @Override
						public void stateChanged( ChangeEvent e ) {
                int selectedIdx = getSelectedIndex();
                if ( selectedIdx >= 0 && application.numModules() > 0 ) {
                    current = application.moduleAt( selectedIdx );
                    application.setActiveModule( selectedIdx );
                }
            }
        } );
        application.addModuleObserver( this );
        for ( int i = 0; i < modules.length; i++ ) {
            Module module = modules[i];
            addTab( module );
        }
        setOpaque( true );
    }

    @Override
		public void addTab( Module module ) {
        addTab( module.getName(), module.getModulePanel() );
    }

    @Override
		public void moduleAdded( ModuleEvent event ) {
    }

    @Override
		public void removeTab( Module module ) {
        for ( int i = 0; i < getTabCount(); i++ ) {
            if ( getTitleAt( i ).equals( module.getName() ) && getComponent( i ).equals( module.getModulePanel() ) ) {
                removeTabAt( i );
                break;
            }
        }
    }

    @Override
		public void activeModuleChanged( ModuleEvent event ) {
        if ( current != event.getModule() ) {
            int index = application.indexOf( event.getModule() );
            int numTabs = getTabCount();
            if ( index < numTabs ) {
                setSelectedIndex( index );
            }
            else {
                throw new RuntimeException( "Requested illegal tab: tab count=" + numTabs + ", requestedIndex=" + index );
            }
        }
    }

    @Override
		public void moduleRemoved( ModuleEvent event ) {
    }

    @Override
		public ModulePanel getModulePanel( int i ) {
        return (ModulePanel) getComponent( i );
    }

    @Override
		public JComponent getComponent() {
        return this;
    }

    @Override
		public void setLogoVisible( boolean logoVisible ) {
        //no-op for JTabbedModulePane
    }

    @Override
		public boolean getLogoVisible() {
        return false;
    }
}
