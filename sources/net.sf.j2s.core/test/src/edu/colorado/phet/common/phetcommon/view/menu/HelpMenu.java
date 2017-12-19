// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author:samreid $
 * Revision : $Revision:14677 $
 * Date modified : $Date:2007-04-17 03:40:29 -0500 (Tue, 17 Apr 2007) $
 */
package edu.colorado.phet.common.phetcommon.view.menu;

import static edu.colorado.phet.common.phetcommon.simsharing.messages.UserComponents.aboutMenuItem;
import static edu.colorado.phet.common.phetcommon.simsharing.messages.UserComponents.helpMenu;
import static edu.colorado.phet.common.phetcommon.simsharing.messages.UserComponents.helpMenuItem;
import static edu.colorado.phet.common.phetcommon.simsharing.messages.UserComponents.megaHelpMenuItem;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JMenuItem;

import edu.colorado.phet.common.phetcommon.application.Module;
import edu.colorado.phet.common.phetcommon.application.ModuleEvent;
import edu.colorado.phet.common.phetcommon.application.ModuleObserver;
import edu.colorado.phet.common.phetcommon.application.PhetApplication;
import edu.colorado.phet.common.phetcommon.resources.PhetCommonResources;
import edu.colorado.phet.common.phetcommon.simsharing.components.SimSharingJCheckBoxMenuItem;
import edu.colorado.phet.common.phetcommon.simsharing.components.SimSharingJMenu;
import edu.colorado.phet.common.phetcommon.simsharing.components.SimSharingJMenuItem;
import edu.colorado.phet.common.phetcommon.view.PhetFrame;
import edu.colorado.phet.common.phetcommon.view.util.PhetOptionPane;
//import edu.colorado.phet.common.phetcommon.updates.ManualUpdatesManager;

/**
 * HelpMenu
 *
 * @author ?
 * @version $Revision:14677 $
 */
public class HelpMenu extends SimSharingJMenu implements ModuleObserver {
    private final JMenuItem onscreenHelp;

    public HelpMenu( final PhetApplication phetApplication, PhetFrame phetFrame ) {
        super( helpMenu, PhetCommonResources.getInstance().getLocalizedString( "Common.HelpMenu.Title" ) );
        this.setMnemonic( PhetCommonResources.getInstance().getLocalizedString( "Common.HelpMenu.TitleMnemonic" ).charAt( 0 ) );
        phetApplication.addModuleObserver( this );

        //----------------------------------------------------------------------
        // "Help" menu item
        onscreenHelp = new SimSharingJCheckBoxMenuItem( helpMenuItem, PhetCommonResources.getInstance().getLocalizedString( "Common.HelpMenu.Help" ) );
        onscreenHelp.setMnemonic( PhetCommonResources.getInstance().getLocalizedString( "Common.HelpMenu.HelpMnemonic" ).charAt( 0 ) );
        onscreenHelp.addActionListener( new ActionListener() {
            @Override
						public void actionPerformed( ActionEvent e ) {
                phetApplication.getActiveModule().setHelpEnabled( onscreenHelp.isSelected() );
            }
        } );
        onscreenHelp.setEnabled( phetApplication.getActiveModule() != null && phetApplication.getActiveModule().hasHelp() );
        add( onscreenHelp );

        //----------------------------------------------------------------------
        // "MegaHelp" menu item
        final JMenuItem megaHelpItem = new SimSharingJMenuItem( megaHelpMenuItem, PhetCommonResources.getInstance().getLocalizedString( "Common.HelpMenu.MegaHelp" ) );
        megaHelpItem.setMnemonic( PhetCommonResources.getInstance().getLocalizedString( "Common.HelpMenu.MegaHelpMnemonic" ).charAt( 0 ) );
        megaHelpItem.addActionListener( new ActionListener() {
            @Override
						public void actionPerformed( ActionEvent e ) {
                if ( phetApplication.getActiveModule().hasMegaHelp() ) {
                    phetApplication.getActiveModule().showMegaHelp();
                }
                else {
                    PhetOptionPane.showMessageDialog( PhetApplication.getInstance().getPhetFrame(),
                                                      "No MegaHelp available for this module." );
                }
            }
        } );
        phetApplication.addModuleObserver( new ModuleObserver() {
            @Override
						public void moduleAdded( ModuleEvent event ) {
            }

            @Override
						public void activeModuleChanged( ModuleEvent event ) {
                megaHelpItem.setVisible( event.getModule().hasMegaHelp() );
            }

            @Override
						public void moduleRemoved( ModuleEvent event ) {
            }
        } );
        megaHelpItem.setVisible( phetApplication.getActiveModule() != null && phetApplication.getActiveModule().hasMegaHelp() );
        add( megaHelpItem );

//        //If in sim sharing, show a menu item that allows the user to access the event log in case they need to send it manually
//        if ( SimSharingManager.getInstance().isEnabled() ) {
//            addSeparator();
//            add( new SimSharingLogMenuItem( phetFrame ) );
//        }
//
        //----------------------------------------------------------------------
        // Separator
        addSeparator();
//        if ( phetApplication.getSimInfo().isUpdatesFeatureIncluded() ) {
//            add( new CheckForSimUpdateMenuItem() );
//        }

        //----------------------------------------------------------------------
        // "About" menu item
        final JMenuItem about = new SimSharingJMenuItem( aboutMenuItem, PhetCommonResources.getInstance().getLocalizedString( "Common.HelpMenu.About" ) );
        about.setMnemonic( PhetCommonResources.getInstance().getLocalizedString( "Common.HelpMenu.AboutMnemonic" ).charAt( 0 ) );
        about.addActionListener( new ActionListener() {
            @Override
						public void actionPerformed( ActionEvent e ) {
                phetApplication.showAboutDialog();
            }
        } );
        add( about );
    }

    /**
     * Sets the state of the Help menu item.
     * This is used to keep the menubar's Help menu item
     * in sync with the control panel's Help button.
     *
     * @param selected
     */
    public void setHelpSelected( boolean selected ) {
        onscreenHelp.setSelected( selected );
    }

    //----------------------------------------------------------------
    // ModuleObserver implementation
    //----------------------------------------------------------------
    @Override
		public void moduleAdded( ModuleEvent event ) {
        //noop
    }

    @Override
		public void activeModuleChanged( ModuleEvent event ) {
        Module module = event.getModule();
        if ( module != null ) {
            onscreenHelp.setEnabled( module.hasHelp() );
            onscreenHelp.setSelected( module.isHelpEnabled() );
        }
    }

    @Override
		public void moduleRemoved( ModuleEvent event ) {
        //noop
    }
//
//    private class CheckForSimUpdateMenuItem extends SimSharingJMenuItem {
//        private CheckForSimUpdateMenuItem() {
//            super( checkForSimulationUpdateMenuItem, PhetCommonResources.getInstance().getLocalizedString( "Common.updates.checkForSimUpdate" ) );
//            addActionListener( new ActionListener() {
//                public void actionPerformed( ActionEvent e ) {
//                    ManualUpdatesManager.getInstance().checkForSimUpdates();
//                }
//            } );
//        }
//    }
}
