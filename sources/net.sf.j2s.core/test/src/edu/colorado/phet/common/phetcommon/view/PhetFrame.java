// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.view;

import static edu.colorado.phet.common.phetcommon.simsharing.messages.ParameterKeys.height;
import static edu.colorado.phet.common.phetcommon.simsharing.messages.ParameterKeys.width;
import static edu.colorado.phet.common.phetcommon.simsharing.messages.UserComponentChain.chain;
import static edu.colorado.phet.common.phetcommon.simsharing.messages.UserComponents.fileMenu;
import static edu.colorado.phet.common.phetcommon.simsharing.messages.UserComponents.loadMenuItem;
import static edu.colorado.phet.common.phetcommon.simsharing.messages.UserComponents.saveMenuItem;

import java.awt.Container;
import java.awt.Dimension;
import java.awt.HeadlessException;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ComponentAdapter;
import java.awt.event.ComponentEvent;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

import javax.swing.JComponent;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;

import edu.colorado.phet.common.phetcommon.application.Module;
import edu.colorado.phet.common.phetcommon.application.ModuleEvent;
import edu.colorado.phet.common.phetcommon.application.ModuleObserver;
import edu.colorado.phet.common.phetcommon.application.PhetApplication;
import edu.colorado.phet.common.phetcommon.resources.PhetCommonResources;
import edu.colorado.phet.common.phetcommon.simsharing.SimSharingManager;
import edu.colorado.phet.common.phetcommon.simsharing.components.SimSharingJMenuItem;
import edu.colorado.phet.common.phetcommon.simsharing.messages.ParameterSet;
import edu.colorado.phet.common.phetcommon.simsharing.messages.SystemActions;
import edu.colorado.phet.common.phetcommon.simsharing.messages.SystemComponentTypes;
import edu.colorado.phet.common.phetcommon.simsharing.messages.SystemComponents;
import edu.colorado.phet.common.phetcommon.view.menu.DeveloperMenu;
import edu.colorado.phet.common.phetcommon.view.menu.HelpMenu;
import edu.colorado.phet.common.phetcommon.view.menu.PhetFileMenu;
import edu.colorado.phet.common.phetcommon.view.util.SwingUtils;

/**
 * The PhetFrame is the JFrame for the PhetApplication.
 *
 * @author ?
 * @version $Revision:14677 $
 */
@SuppressWarnings("serial")
public class PhetFrame extends JFrame {

    private PhetApplication application;
    private Container contentPanel;
    private Module lastAdded;

    private JMenu defaultFileMenu;
    private JMenu developerMenu;
    private HelpMenu helpMenu;

    //Store the previous size in component listener so we only notify about changes
    private Dimension prevSize = new Dimension( -1, -1 );
    
    /**
     * Constructs a PhetFrame for the specified PhetApplication.
     *
     * @param application the application that own the PhetFrame
     */
    public PhetFrame( final PhetApplication application ) throws HeadlessException {
        super( application.getSimInfo().getName() + " (" + application.getSimInfo().getVersion().formatForTitleBar() + ")" );
        this.application = application;

        addWindowListener( new WindowAdapter() {
            @Override
						public void windowClosing( WindowEvent e ) {
            	
                //SimSharingManager.sendSystemMessage( SystemComponents.phetFrame, SystemComponentTypes.window, SystemActions.windowClosing );
                application.pause(); // BH
                application.exit();
            }
        } );
        this.addWindowListener( new WindowAdapter() {

            // Pause the clock if the simulation window is iconified.
            @Override
						public void windowIconified( WindowEvent e ) {

                //SimSharingManager.sendSystemMessage( SystemComponents.phetFrame, SystemComponentTypes.window, SystemActions.iconified );
                application.pause();
            }

            // Restore the clock state if the simulation window is deiconified.
            @Override
						public void windowDeiconified( WindowEvent e ) {

                //SimSharingManager.sendSystemMessage( SystemComponents.phetFrame, SystemComponentTypes.window, SystemActions.deiconified );
                application.resume();
            }

            @Override public void windowActivated( WindowEvent e ) {
                //SimSharingManager.sendSystemMessage( SystemComponents.phetFrame, SystemComponentTypes.window, SystemActions.activated );
            }

            @Override public void windowDeactivated( WindowEvent e ) {
                //SimSharingManager.sendSystemMessage( SystemComponents.phetFrame, SystemComponentTypes.window, SystemActions.deactivated );
            }
        } );

        //Send an event when the window resizes.  This will tell us the initial size and whenever the user changes the size.
        //The initial size is valuable so we know how many students are running at less than 1024x768
        addComponentListener( new ComponentAdapter() {
            @Override public void componentResized( ComponentEvent e ) {
                if ( !getSize().equals( prevSize ) ) {
                    //SimSharingManager.sendSystemMessage( SystemComponents.phetFrame, SystemComponentTypes.window, SystemActions.resized,
                     //                                    ParameterSet.parameterSetLong( width, getWidth() ).with( height, getHeight() ) );
                    prevSize = new Dimension( getSize() );
                }
            }
        } );

        // menu bar, also indicates whether connected to sim sharing
        JMenuBar menuBar = 
        		//SimSharingManager.getInstance().isEnabled() ? new SimSharingJMenuBar() : 
        	new JMenuBar();
        setJMenuBar( menuBar );

        // File menu
        defaultFileMenu = new PhetFileMenu( this, application.getSimInfo() );
        menuBar.add( defaultFileMenu );
        // Developer menu
        developerMenu = new DeveloperMenu( application );
        if ( application.isDeveloperControlsEnabled() ) {
            menuBar.add( developerMenu );
        }

        // Help menu
        helpMenu = new HelpMenu( application, this );
        menuBar.add( helpMenu );

        application.addModuleObserver( new ModuleObserver() {
            @Override
						public void moduleAdded( ModuleEvent event ) {
                addModule( event.getModule() );
            }

            @Override
						public void activeModuleChanged( ModuleEvent event ) {
            }

            @Override
						public void moduleRemoved( ModuleEvent event ) {
                removeModule( event.getModule() );
            }

        } );


//        if ( getApplication().getSimInfo().isDev() ) {
//            addF8ToClearPreferencesFile();
//        }
    }

//    private void addF8ToClearPreferencesFile() {
//        final String mapKey = "reset-preferences-file";
//        getRootPane().getInputMap( JComponent.WHEN_IN_FOCUSED_WINDOW ).put( KeyStroke.getKeyStroke( KeyEvent.VK_F8, 0 ), mapKey );
//
//        getRootPane().getActionMap().put( mapKey, new AbstractAction() {
//            public void actionPerformed( java.awt.event.ActionEvent e ) {
//                try {
////                    String path = PhetPreferences.getPreferencesFile().getParentFile().getAbsolutePath();
////                    System.out.println( "Preferences=" + PhetPreferences.getInstance().toString() );
////                    System.out.println( "Resetting preferences file." );
////                    PhetPreferences.clear();
////
////                    System.out.println( "Clearing session counts." );
////                    SessionCounter.getInstance().clear();
////                    PhetOptionPane.showMessageDialog( PhetFrame.this, "Preferences file and session counts cleared, press OK to exit.\nFile is " + path + "" );
//                    System.exit( 0 );
//                }
//                catch ( Throwable t ) {
//                    t.printStackTrace();
//                    System.out.println( "Could not clear preferences, t=" + t );
//                    PhetOptionPane.showMessageDialog( PhetFrame.this, "Couldn't clear preferences, perhaps you are not running with permission to do so." );
//                }
//            }
//        } );
//    }

    /**
     * Sets the <code>contentPane</code> property.
     *
     * @param contentPane the <code>contentPane</code> object for this frame
     * @throws java.awt.IllegalComponentStateException
     *          (a runtime exception) if the content pane parameter is <code>null</code>
     */
    @Override
		public void setContentPane( Container contentPane ) {
        super.setContentPane( contentPane );
        this.contentPanel = contentPane;
    }

    private void addModule( Module module ) {
        setContentPane( addToContentPane( module ) );
        this.lastAdded = module;
    }

    /**
     * Adds the specified module to the content pane, returning the new content pane.
     *
     * @param module the module to add.
     * @return the new content pane.
     */
    private JComponent addToContentPane( Module module ) {
        if ( contentPanel == null ) {
            return module.getModulePanel();
        }
        else if ( contentPanel instanceof ModulePanel ) {
        	/**
        	 * @j2sNative
        	 * 
        	 * alert("PhetFrame: JTabbedPane has not been implemented");
        	 * 
        	 */
        	{}
        	
        	// BH note: JTabbedPane is not implemented in SwingJS
            ITabbedModulePane tabbedModulePane = application.getTabbedModulePane();
            tabbedModulePane.init( application, new Module[] { lastAdded, module } );
            return tabbedModulePane.getComponent();
        }
        else if ( contentPanel instanceof ITabbedModulePane ) {
            ITabbedModulePane tabbedModulePane = (ITabbedModulePane) contentPanel;
            tabbedModulePane.addTab( module );
            return (JComponent) tabbedModulePane;
        }
        else {
            throw new RuntimeException( "Illegal type for content pane: " + contentPanel );
        }
    }

    /**
     * Returns the ITabbedModulePane for this PhetFrame, if it has one; otherwise null.
     * That means it must have been created, usually by adding more than one module.
     *
     * @return
     */
    public ITabbedModulePane getTabbedModulePane() {
        if ( contentPanel instanceof ITabbedModulePane ) {
            return (ITabbedModulePane) contentPanel;
        }
        else {
            return null;
        }
    }

    private void removeModule( Module module ) {
        setContentPane( removeFromContentPane( module ) );
    }

    private Container removeFromContentPane( Module module ) {
        if ( contentPanel == null ) {
            throw new RuntimeException( "Cannot remove module: " + module + ", from contentPane=" + contentPanel );
        }
        else if ( contentPanel == module.getModulePanel() ) {
            return new JLabel( "No modules" );
        }
        else if ( contentPanel instanceof ITabbedModulePane ) {
            ITabbedModulePane tabbedModulePane = (ITabbedModulePane) contentPanel;
            tabbedModulePane.removeTab( module );
            if ( tabbedModulePane.getTabCount() > 1 ) {
                return (Container) tabbedModulePane;
            }
            else if ( tabbedModulePane.getTabCount() == 1 ) {
                return tabbedModulePane.getModulePanel( 0 );
            }
        }
        throw new RuntimeException( "Illegal module/tab state" );
    }

    /**
     * Gets the PhetApplication associated with this PhetFrame.
     *
     * @return the PhetApplication associated with this PhetFrame.
     */
    public PhetApplication getApplication() {
        return application;
    }

    //----------------------------------------------------------------
    // Menu setup methods
    //----------------------------------------------------------------

    /**
     * Adds a JMenu before the Help Menu.
     *
     * @param menu
     */
    public void addMenu( JMenu menu ) {
        SwingUtils.addMenuAt( menu, getJMenuBar(), getJMenuBar().getMenuCount() - 1 );
    }

    /**
     * Adds a menu separator to the File menu, just before the Exit menu item.
     */
    public void addFileMenuSeparator() {
        defaultFileMenu.insertSeparator( defaultFileMenu.getMenuComponentCount() - 1 );
    }

    /**
     * Adds a menu separator to the File menu after a specified menu item
     *
     * @param menuItem
     */
    public void addFileMenuSeparatorAfter( JMenuItem menuItem ) {
        JMenu fileMenu = getFileMenu();
        if ( fileMenu != null ) {
            for ( int i = 0; i < fileMenu.getItemCount(); i++ ) {
                if ( fileMenu.getItem( i ) == menuItem ) {
                    fileMenu.insertSeparator( i + 1 );
                    return;
                }
            }
        }
    }

    /**
     * Adds a menu separator to the File menu before a specified menu item
     *
     * @param menuItem
     */
    public void addFileMenuSeparatorBefore( JMenuItem menuItem ) {
        JMenu fileMenu = getFileMenu();
        if ( fileMenu != null ) {
            for ( int i = 0; i < fileMenu.getItemCount(); i++ ) {
                if ( fileMenu.getItem( i ) == menuItem ) {
                    fileMenu.insertSeparator( i );
                    return;
                }
            }
        }
    }

    /**
     * Adds a menu item to the File menu, just before the Exit menu item.
     *
     * @param menuItem
     */
    public void addFileMenuItem( JMenuItem menuItem ) {
        defaultFileMenu.insert( menuItem, defaultFileMenu.getMenuComponentCount() - 1 );
    }

    /**
     * Removes a menu item from the File menu
     *
     * @param menuItem
     */
    public void removeFileMenuItem( JMenuItem menuItem ) {
        JMenu testMenu = getJMenuBar().getMenu( 0 );
        if ( testMenu != null && testMenu instanceof PhetFileMenu ) {
            getJMenuBar().remove( testMenu );
        }
        getJMenuBar().add( defaultFileMenu, 0 );
    }

    /**
     * Sets a specified menu in the leftmost postition of the menu bar
     *
     * @param defaultFileMenu
     */
    public void setFileMenu( PhetFileMenu defaultFileMenu ) {
        JMenu testMenu = getJMenuBar().getMenu( 0 );
        if ( testMenu != null && testMenu instanceof PhetFileMenu ) {
            getJMenuBar().remove( testMenu );
        }
        getJMenuBar().add( defaultFileMenu, 0 );
    }

    /**
     * Returns the leftmost menu on the menu bar
     *
     * @return the leftmost menu on the menu bar
     */
    private PhetFileMenu getFileMenu() {
        JMenu testMenu = getJMenuBar().getMenu( 0 );
        if ( testMenu != null && testMenu instanceof PhetFileMenu ) {
            return (PhetFileMenu) testMenu;
        }
        return null;
    }

    public JMenu getDeveloperMenu() {
        return developerMenu;
    }

    /**
     * Gets the HelpMenu for this PhetFrame.
     *
     * @return the HelpMenu for this PhetFrame.
     */
    public HelpMenu getHelpMenu() {
        return helpMenu;
    }

    /**
     * Removes the specified JMenu from the JMenuBar.
     *
     * @param menu
     */
    public void removeMenu( JMenu menu ) {
        getJMenuBar().remove( menu );
    }

    /**
     * Adds the File->Save and File->Load menu items, and wires them up to the application.
     * These menu items are not present by default, since many sims do not implement save/load.
     */
    public void addFileSaveLoadMenuItems() {

        JMenuItem saveItem = new SimSharingJMenuItem( chain( fileMenu, saveMenuItem ), PhetCommonResources.getString( "Common.FileMenu.Save" ) );
        saveItem.setMnemonic( PhetCommonResources.getChar( "Common.FileMenu.Save.mnemonic", 'S' ) );
        saveItem.addActionListener( new ActionListener() {
            @Override
						public void actionPerformed( ActionEvent e ) {
                application.save();
            }
        } );

        JMenuItem loadItem = new SimSharingJMenuItem( chain( fileMenu, loadMenuItem ), PhetCommonResources.getString( "Common.FileMenu.Load" ) );
        loadItem.setMnemonic( PhetCommonResources.getChar( "Common.FileMenu.Load.mnemonic", 'L' ) );
        loadItem.addActionListener( new ActionListener() {
            @Override
						public void actionPerformed( ActionEvent e ) {
                application.load();
            }
        } );

        addFileMenuItem( saveItem );
        addFileMenuItem( loadItem );
        addFileMenuSeparator();
    }

}
