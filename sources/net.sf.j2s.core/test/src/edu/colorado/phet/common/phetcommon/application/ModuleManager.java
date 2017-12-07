// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.application;

import java.util.ArrayList;

import edu.colorado.phet.common.phetcommon.model.clock.IClock;

/**
 * The ModuleManager keeps track of a list of Modules in a PhetApplication, and which one is active.
 * Notification events are sent to registered listeners when modules are added or removed, or when
 * the active module changes.  There is currently no support for setting the active module to null.
 * <p/>
 * Clients shouldn't use this class directly.  They should use the public interface published by
 * PhetApplication.
 *
 * @author Ron LeMaster & Sam Reid
 */
class ModuleManager {

    private ArrayList<Module> modules = new ArrayList<Module>();
    private Module activeModule;
    private PhetApplication phetApplication;
    private ArrayList<ModuleObserver> moduleObservers = new ArrayList<ModuleObserver>();
    private Module startModule; // module to be activated when the app starts, default to first module added

    /**
     * Constructs a ModuleManager for a PhetApplication.
     *
     * @param phetApplication
     */
    ModuleManager( PhetApplication phetApplication ) {
        this.phetApplication = phetApplication;
        startModule = null;
    }

    /**
     * Returns the specified module.
     *
     * @param i
     * @return the specified module.
     */
    Module moduleAt( int i ) {
        return modules.get( i );
    }

    /**
     * Returns the active module, or null if no module has been activated yet.
     *
     * @return the active module, or null if no module has been activated yet.
     */
    Module getActiveModule() {
        return activeModule;
    }

    /**
     * Gets the number of modules.
     *
     * @return the number of modules.
     */
    int numModules() {
        return modules.size();
    }

    /**
     * Add one module.
     *
     * @param module
     */
    void addModule( Module module ) {
        // first module added is the default start module
        if ( modules.size() == 0 ) {
            startModule = module;
        }
        modules.add( module );
        notifyModuleAdded( new ModuleEvent( getPhetApplication(), module ) );
    }

    /**
     * Removes the specified module.
     *
     * @param module
     */
    void removeModule( Module module ) {
        modules.remove( module );

        // If the module we're removing is the start module, set another start module.
        if ( module == startModule ) {
            startModule = null;
            if ( modules.size() > 0 ) {
                startModule = moduleAt( 0 );
            }
        }

        // If the module we are removing is the active module, we need to set another one active
        if ( getActiveModule() == module ) {
            setActiveModule( modules.size() == 0 ? null : (Module) modules.get( 0 ) );
        }

        // Notifiy listeners
        notifyModuleRemoved( new ModuleEvent( getPhetApplication(), module ) );
    }

    /**
     * Gets the index of the specified Module.
     *
     * @param m
     * @return the index of the specified Module, -1 if not found
     */
    int indexOf( Module m ) {
        return modules.indexOf( m );
    }

    /**
     * Removes all Modules in this ModuleManager and adds those specified in the array.
     *
     * @param modules
     */
    void setModules( Module[] modules ) {
        while ( numModules() > 0 ) {
            Module module = moduleAt( 0 );
            removeModule( module );
        }
        addAllModules( modules );
    }

    /**
     * Adds all specified Modules.
     *
     * @param modules
     */
    void addAllModules( Module[] modules ) {
        for ( int i = 0; i < modules.length; i++ ) {
            addModule( modules[i] );
        }
    }

    /**
     * Returns the array of the modules the module manager manages
     *
     * @return the array of the modules the module manager manages
     */
    Module[] getModules() {
        Module[] moduleArray = new Module[this.modules.size()];
        for ( int i = 0; i < modules.size(); i++ ) {
            moduleArray[i] = modules.get( i );
        }
        return moduleArray;
    }

    /**
     * Sets the ith indexed Module to be the active one.
     *
     * @param i
     */
    void setActiveModule( int i ) {
        setActiveModule( moduleAt( i ) );
    }

    /**
     * Sets the specified module to be the active one.
     *
     * @param module
     */
    void setActiveModule( Module module ) {
        if ( module == null ) {
            throw new RuntimeException( "Active module can't be null." );
        }
        if ( activeModule != module ) {
            deactivateCurrentModule();
            activate( module );
            notifyActiveModuleChanged( new ModuleEvent( getPhetApplication(), module ) );
            verifyActiveState();
        }
    }

    /*
     * Prints an exception stack trace if the collection of modules
     * being managed don't have the correct activation and clock states.
     * A valid state is:
     * - exactly one module should be active
     * - at most one clock should be running
     * - if there is a running clock, it must belong to the active module
     */
    private void verifyActiveState() {
        int numActiveModules = getNumActiveModules();
        int numClocksRunning = getNumClocksRunning();
        boolean clockShared = isClockShared();
        if ( numActiveModules != 1 ) {
            new IllegalStateException( "multiple modules are running: active modules=" + numActiveModules ).printStackTrace();
        }
        if ( numClocksRunning > 1 ) {
            ArrayList<String> runningModules = new ArrayList<String>();
            for ( Module module : modules ) {
                if ( module.getClock().isRunning() ) { runningModules.add( module.getName() ); }
            }
            new IllegalStateException( "multiple clocks are running: running clocks=" + numClocksRunning + ", in modules " + runningModules ).printStackTrace();
        }
        if ( numClocksRunning == 1 && !activeModule.getClock().isRunning() ) {
            new IllegalStateException( "a clock is running that does not belong to the active module" ).printStackTrace();
        }
        if ( clockShared ) {
            new IllegalStateException( "Multiple modules are using the same clock instance." ).printStackTrace();
        }
    }

    private boolean isClockShared() {
        for ( int i = 0; i < modules.size(); i++ ) {
            for ( int k = 0; k < modules.size(); k++ ) {
                if ( k != i ) {
                    IClock clock1 = modules.get( i ).getClock();
                    IClock clock2 = modules.get( k ).getClock();
                    if ( clock1 == clock2 ) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    private int getNumActiveModules() {
        int count = 0;
        for ( int i = 0; i < modules.size(); i++ ) {
            if ( modules.get( i ).isActive() ) {
                count++;
            }
        }
        return count;
    }

    /*
     * Returns the number of unique running clock instances attached to modules in this ModuleManager.
     */
    private int getNumClocksRunning() {
        ArrayList<IClock> runningClocks = new ArrayList<IClock>();
        for ( int i = 0; i < modules.size(); i++ ) {
            IClock clock = modules.get( i ).getClock();
            if ( clock.isRunning() ) {
                if ( !runningClocks.contains( clock ) ) {
                    runningClocks.add( clock );
                }
            }
        }
        return runningClocks.size();
    }

    void addModuleObserver( ModuleObserver observer ) {
        moduleObservers.add( observer );
    }

    private PhetApplication getPhetApplication() {
        return phetApplication;
    }

    private void activate( Module module ) {
        activeModule = module;
        if ( module != null ) {
            module.activate();
            this.setActiveModule( module ); // TODO: audit this line. it looks like it does nothing
        }
    }

    void deactivateCurrentModule() {
        if ( activeModule != null ) {
            activeModule.deactivate();
        }
    }

    private void notifyModuleAdded( ModuleEvent event ) {
        for ( int i = 0; i < moduleObservers.size(); i++ ) {
            ModuleObserver moduleObserver = moduleObservers.get( i );
            moduleObserver.moduleAdded( event );
        }
    }

    private void notifyActiveModuleChanged( ModuleEvent event ) {
        for ( int i = 0; i < moduleObservers.size(); i++ ) {
            ModuleObserver moduleObserver = moduleObservers.get( i );
            moduleObserver.activeModuleChanged( event );
        }
    }

    private void notifyModuleRemoved( ModuleEvent event ) {
        for ( int i = 0; i < moduleObservers.size(); i++ ) {
            ModuleObserver moduleObserver = moduleObservers.get( i );
            moduleObserver.moduleRemoved( event );
        }
    }

    /**
     * Gets the module that will be activated on startup.
     * By default, this is the first module added.
     * To change the default, call setStartupModule.
     *
     * @return Module
     */
    public Module getStartModule() {
        return startModule;
    }

    /**
     * Sets the module that will be activated on startup.
     * If this method is not called, the first module added is the default.
     *
     * @param module
     */
    public void setStartModule( Module module ) {
        if ( !modules.contains( module ) ) {
            throw new IllegalArgumentException( "start module has not been added" );
        }
        startModule = module;
    }

    /**
     * Removes the specified moduleObserver
     *
     * @param moduleObserver the ModuleObserver to unsubscribe from module events
     */
    void removeModuleObserver( ModuleObserver moduleObserver ) {
        moduleObservers.remove( moduleObserver );
    }
}
