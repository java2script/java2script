// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author:samreid $
 * Revision : $Revision:14677 $
 * Date modified : $Date:2007-04-17 03:40:29 -0500 (Tue, 17 Apr 2007) $
 */
package edu.colorado.phet.common.phetcommon.application;

import java.awt.Color;
import java.awt.Window;
import java.util.ArrayList;
import java.util.EventListener;

import javax.swing.JComponent;
import javax.swing.SwingUtilities;
import javax.swing.text.JTextComponent;

import edu.colorado.phet.common.phetcommon.model.BaseModel;
import edu.colorado.phet.common.phetcommon.model.ModelElement;
import edu.colorado.phet.common.phetcommon.model.Resettable;
import edu.colorado.phet.common.phetcommon.model.clock.ClockAdapter;
import edu.colorado.phet.common.phetcommon.model.clock.ClockEvent;
import edu.colorado.phet.common.phetcommon.model.clock.IClock;
import edu.colorado.phet.common.phetcommon.model.clock.ModuleClockAdapter;
import edu.colorado.phet.common.phetcommon.simsharing.messages.IUserComponent;
import edu.colorado.phet.common.phetcommon.simsharing.messages.UserComponents;
import edu.colorado.phet.common.phetcommon.view.ClockControlPanel;
import edu.colorado.phet.common.phetcommon.view.ControlPanel;
import edu.colorado.phet.common.phetcommon.view.HelpPanel;
import edu.colorado.phet.common.phetcommon.view.LogoPanel;
import edu.colorado.phet.common.phetcommon.view.ModulePanel;
import edu.colorado.phet.common.phetcommon.view.util.SwingUtils;

/**
 * The Module is the fundamental unit of a phet simulation.
 * It entails graphics, controls and a model.
 */

public abstract class Module implements Resettable {

    //----------------------------------------------------------------------------
    // Instance data
    //----------------------------------------------------------------------------

    private String name;

    private BaseModel model;
    private IClock clock;

    private boolean active = false;
    private boolean clockRunningWhenActive = true;
    private ClockAdapter moduleRunner;

    private ModulePanel modulePanel;
    private ArrayList<EventListener> listeners = new ArrayList<EventListener>();

    //----------------------------------------------------------------------------
    // Constructors
    //----------------------------------------------------------------------------

    /**
     * Initialize a Module.
     * By default, the clock will be running when the module is activated.
     *
     * @param name  the name for this Module
     * @param clock a clock to model passage of time for this Module.  Should be unique to this module (non-shared).
     */
    public Module( String name, IClock clock ) {
        this( name, clock, false );
    }

    /**
     * Initializes a Module.
     *
     * @param name
     * @param clock
     * @param startsPaused
     */
    public Module( String name, IClock clock, boolean startsPaused ) {
        this.name = name;
        this.clock = clock;
        setModel( new BaseModel() );

        this.modulePanel = new ModulePanel();
        setClockControlPanel( createClockControlPanel( clock ) );
        setLogoPanel( new LogoPanel() );
        setHelpPanel( new HelpPanel( this ) );

        moduleRunner = new ModuleClockAdapter() {
            @Override
						public void clockTicked( ClockEvent clockEvent ) {
                handleClockTick( clockEvent );
            }
        };
        clock.addClockListener( moduleRunner );
        this.clockRunningWhenActive = !startsPaused;
        updateHelpPanelVisible();
    }

    protected JComponent createClockControlPanel( IClock clock ) {
        return new ClockControlPanel( clock );
    }

    //----------------------------------------------------------------------------
    // Clock
    //----------------------------------------------------------------------------

    /**
     * Get the clock associated with this Module.
     *
     * @return the clock
     */
    public IClock getClock() {
        return clock;
    }

    /**
     * During a clock tick, the Module will handle user input, step the model, and update the graphics.
     *
     * @param event
     */
    protected void handleClockTick( ClockEvent event ) {
        handleUserInput();
        model.update( event );
        updateGraphics( event );
    }

    /**
     * Determines whether an inactive module's clock will be running when it's activated.
     * This is useful when saving/loading the state of a simulation.
     *
     * @param b
     */
    public void setClockRunningWhenActive( boolean b ) {
        clockRunningWhenActive = b;
        if ( isActive() ) {
            if ( clockRunningWhenActive ) {
                clock.start();
            }
            else {
                clock.pause();
            }
        }
    }

    /**
     * Will this module's clock be running when it's activated?
     * This is useful when saving/loading the state of a simulation.
     *
     * @return
     */
    public boolean getClockRunningWhenActive() {
        if ( isActive() ) {
            clockRunningWhenActive = clock.isRunning(); // normally not refreshed until deactivate is called
        }
        return clockRunningWhenActive;
    }

    //----------------------------------------------------------------------------
    // Model
    //----------------------------------------------------------------------------

    /**
     * Sets the base model.
     *
     * @param model
     */
    public void setModel( BaseModel model ) {
        this.model = model;
    }

    /**
     * Gets the base model.
     *
     * @return the model
     */
    public BaseModel getModel() {
        return model;
    }

    /**
     * Adds a ModelElement to the BaseModel of this Module.
     *
     * @param modelElement
     */
    protected void addModelElement( final ModelElement modelElement ) {
        getModel().addModelElement( modelElement );
    }

    //----------------------------------------------------------------------------
    // Panel Accessors
    //----------------------------------------------------------------------------

    /**
     * Get the ModulePanel, which contains all the subpanels for the module.
     *
     * @return the ModulePanel.
     */
    public ModulePanel getModulePanel() {
        return modulePanel;
    }

    /**
     * Sets the monitor panel.
     *
     * @param panel, possibly null
     */
    public void setMonitorPanel( JComponent panel ) {
        modulePanel.setMonitorPanel( panel );
    }

    /**
     * Sets the simulation panel.
     *
     * @param panel, possibly null
     */
    protected void setSimulationPanel( JComponent panel ) {
        modulePanel.setSimulationPanel( panel );

        //Setting the simulation panel often requires invalidation/validation/doLayout if the simulation is already running (not if this happens during startup), see #2812
        //First make sure the panel is non-null (it is null is Glaciers, see #2812)
        if ( panel != null ) {
            Window window = SwingUtilities.getWindowAncestor( panel );

            //Only proceed if the panel was already in a window
            if ( window != null ) {
                window.invalidate();
                window.validate();
                window.doLayout();
            }
        }
    }

    /**
     * Gets the simulation panel.
     *
     * @return the simulation panel
     */
    public JComponent getSimulationPanel() {
        return modulePanel.getSimulationPanel();
    }

    /**
     * Sets the clock control panel.
     *
     * @param panel
     */
    protected void setClockControlPanel( JComponent panel ) {
        modulePanel.setClockControlPanel( panel );
    }

    /**
     * Gets the clock control panel.
     * If you have replaced the standard ClockControlPanel,
     * then use getModulePanel().getClockControlPanel().
     *
     * @return ClockControlPanel
     */
    public JComponent getClockControlPanel() {
        return modulePanel.getClockControlPanel();
    }

    /**
     * Sets the logo panel.
     *
     * @param panel
     */
    protected void setLogoPanel( JComponent panel ) {
        modulePanel.setLogoPanel( panel );
    }

    /**
     * Gets the logo panel.
     * If you have replaced the standard LogoPanel,
     * then use getModulePanel().getLogoPanel().
     *
     * @return LogoPanel
     */
    public LogoPanel getLogoPanel() {
        LogoPanel logoPanel = null;
        JComponent panel = modulePanel.getLogoPanel();
        if ( panel != null && panel instanceof LogoPanel ) {
            logoPanel = (LogoPanel) panel;
        }
        return logoPanel;
    }

    /**
     * Sets the control panel.
     *
     * @param panel
     */
    protected void setControlPanel( JComponent panel ) {
        modulePanel.setControlPanel( panel );
    }

    /**
     * Gets the control panel.
     * If you have replaced the standard ControlPanel,
     * then use getModulePanel().getControlPanel().
     *
     * @return ControlPanel
     */
    public ControlPanel getControlPanel() {
        ControlPanel controlPanel = null;
        JComponent panel = modulePanel.getControlPanel();
        if ( panel != null && panel instanceof ControlPanel ) {
            controlPanel = (ControlPanel) panel;
        }
        return controlPanel;
    }

    /**
     * Sets the help panel.
     *
     * @param panel
     */
    protected void setHelpPanel( JComponent panel ) {
        modulePanel.setHelpPanel( panel );
    }

    /**
     * Gets the help panel.
     * If you have replaced the standard HelpPanel,
     * then use getModulePanel().getHelpPanel().
     *
     * @return HelpPanel
     */
    public HelpPanel getHelpPanel() {
        HelpPanel helpPanel = null;
        JComponent panel = modulePanel.getHelpPanel();
        if ( panel != null && panel instanceof HelpPanel ) {
            helpPanel = (HelpPanel) panel;
        }
        return helpPanel;
    }

    //----------------------------------------------------------------------------
    // Help
    //----------------------------------------------------------------------------

    /**
     * Tells whether this module has on-screen help; note: this method is called from Module's constructor; so
     * subclasses shouldn't rely on any state initialized in subclass constructors when they override this method.
     * See #1726
     *
     * @return whether this module has on-screen help
     */
    public boolean hasHelp() {
        return false;
    }

    /**
     * This must be overriden by subclasses that have megahelp to return true.
     *
     * @return whether there is megahelp
     */
    public boolean hasMegaHelp() {
        return false;
    }

    /**
     * Determines whether help is visible.
     * If you replace HelpPanel with a different type of help panel,
     * then you will need to override this method.
     *
     * @param enabled
     */
    public void setHelpEnabled( boolean enabled ) {
        HelpPanel helpPanel = getHelpPanel();
        if ( helpPanel != null ) {
            helpPanel.setHelpEnabled( enabled );
        }
    }

    /**
     * Gets whether help is currently visible for this Module.
     * If you replace HelpPanel with a different type of help panel,
     * then you will need to override this method.
     *
     * @return help
     */
    public boolean isHelpEnabled() {
        boolean enabled = false;
        HelpPanel helpPanel = getHelpPanel();
        if ( helpPanel != null ) {
            enabled = helpPanel.isHelpEnabled();
        }
        return enabled;
    }

    /**
     * This must be overrideen by subclasses that have MegaHelp.
     */
    public void showMegaHelp() {
    }

    //----------------------------------------------------------------------------
    // Logo
    //----------------------------------------------------------------------------

    /**
     * Shows/hides the PhET logo.
     *
     * @param visible
     */
    public void setLogoPanelVisible( boolean visible ) {
        JComponent logoPanel = modulePanel.getLogoPanel();
        if ( logoPanel != null ) {
            logoPanel.setVisible( visible );
        }
    }

    /**
     * Is the PhET logo visible?
     *
     * @return true or false
     */
    public boolean isLogoPanelVisible() {
        boolean visible = false;
        JComponent logoPanel = modulePanel.getLogoPanel();
        if ( logoPanel != null ) {
            visible = logoPanel.isVisible();
        }
        return visible;
    }

    //----------------------------------------------------------------------------
    // Activation
    //----------------------------------------------------------------------------

    /**
     * Activates the Module, starting it, if necessary.
     */
    public void activate() {
        if ( !isWellFormed() ) {
            throw new RuntimeException( "Module missing important data, module=" + this );
        }
        if ( clockRunningWhenActive ) {
            clock.start();
        }
        updateHelpPanelVisible();
        active = true;
        for ( int i = 0; i < listeners.size(); i++ ) {
            ( (Listener) listeners.get( i ) ).activated();
        }
    }

    protected void updateHelpPanelVisible() {
        JComponent helpPanel = getHelpPanel();
        if ( helpPanel != null ) {
            helpPanel.setVisible( hasHelp() );
        }
    }

    public void addListener( Listener listener ) {
        listeners.add( listener );
    }

    public void removeListener( Listener listener ) {
        listeners.remove( listener );
    }

    //some junk is leftover from the previous panel unless we explicitly paint over it
    //This problem has only appeared in the Rotation simulation, but doesn't appear to be correlated with
    //Rotation's new repaint manager
    // TODO: Add protection against calling this method multiple times
    protected void addRepaintOnActivateBehavior() {
        addListener( new Listener() {
            @Override
						public void activated() {
                getModulePanel().paintImmediately( 0, 0, getModulePanel().getWidth(), getModulePanel().getHeight() );
            }

            @Override
						public void deactivated() {
            }
        } );
    }

    //Sims using simsharing should use SimSharingPiccoloModule to override this default dummy value (which is provided to prevent nullpointer exceptions in the tab node code).
    public IUserComponent getTabUserComponent() {
        return UserComponents.tab;
    }

    public static interface Listener extends EventListener {
        void activated();

        void deactivated();
    }

    /**
     * Deactivates this Module (pausing it).
     */
    public void deactivate() {
        this.clockRunningWhenActive = getClock().isRunning();
        clock.pause();
        active = false;
        for ( int i = 0; i < listeners.size(); i++ ) {
            ( (Listener) listeners.get( i ) ).deactivated();
        }
    }

    /**
     * Determine if the Module is currently an active module.
     *
     * @return true or false
     */
    public boolean isActive() {
        return active;
    }

    /**
     * Determine whether the Module has all the necessary information to run.
     *
     * @return true if the Module is ready to run.
     */
    public boolean isWellFormed() {
        boolean result = true;
        result &= this.getModel() != null;
        result &= this.getSimulationPanel() != null;
        return result;
    }

    //----------------------------------------------------------------------------
    // Misc.
    //----------------------------------------------------------------------------

    public void setName( String name ) {
        this.name = name;
    }

    /**
     * Get the name of the Module.
     *
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * Returns a String to represent the Module.
     *
     * @return a string
     */
    @Override
		public String toString() {
        return "name=" + name + ", model=" + model + ", simulationPanel=" + getSimulationPanel();
    }

    /**
     * Notifies the Module that this is the reference (default) size for rendering.
     */
    public void setReferenceSize() {
    }

    /**
     * Any specific user input code may go here (no-op in base class).
     */
    protected void handleUserInput() {
    }

    /**
     * Any module that wants to do some graphics updating that isn't handled through
     * model element/observer mechanisms can overide this method
     *
     * @param event
     */
    public void updateGraphics( ClockEvent event ) {
    }

    public void setControlPanelBackground( Color color ) {
        if ( getControlPanel() != null ) {
            Class<?>[] excludedClasses = { JTextComponent.class }; // default excluded classes, what we want in most cases
            setControlPanelBackground( color, excludedClasses );
        }
    }

    public void setControlPanelBackground( Color color, Class<?>[] excludedClasses ) {
        if ( getControlPanel() != null ) {
            SwingUtils.setBackgroundDeep( getControlPanel(), color, excludedClasses, false /* processContentsOfExcludedContainers */ );
        }
    }

    public void setClockControlPanelBackground( Color color ) {
        if ( getClockControlPanel() != null ) {
            Class<?>[] excludedClasses = { JTextComponent.class }; // default excluded classes, what we want in most cases
            setClockControlPanelBackground( color, excludedClasses );
        }
    }

    public void setClockControlPanelBackground( Color color, Class<?>[] excludedClasses ) {
        if ( getClockControlPanel() != null ) {
            SwingUtils.setBackgroundDeep( getClockControlPanel(), color, excludedClasses, false /* processContentsOfExcludedContainers */ );
        }
    }

    public void setHelpPanelBackground( Color color ) {
        if ( getHelpPanel() != null ) {
            Class<?>[] excludedClasses = { JTextComponent.class }; // default excluded classes, what we want in most cases
            setHelpPanelBackground( color, excludedClasses );
        }
    }

    public void setHelpPanelBackground( Color color, Class<?>[] excludedClasses ) {
        if ( getHelpPanel() != null ) {
            SwingUtils.setBackgroundDeep( getHelpPanel(), color, excludedClasses, false /* processContentsOfExcludedContainers */ );
        }
    }

    //----------------------------------------------------------------------------
    // Resettable implementation
    //----------------------------------------------------------------------------

    @Override
		public void reset() {
        // default implementation does nothing
    }
}