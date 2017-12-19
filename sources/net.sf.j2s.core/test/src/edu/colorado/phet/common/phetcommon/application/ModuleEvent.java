// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 47760 $
 * Date modified : $Date: 2011-01-07 11:42:54 -0600 (Fri, 07 Jan 2011) $
 */
package edu.colorado.phet.common.phetcommon.application;

/**
 * An event class sent to ModuleObservers.
 *
 * @author Ron LeMaster
 * @version $Revision: 47760 $
 */
public class ModuleEvent {
    private PhetApplication phetApplication;
    private Module module;

    /**
     * Constructs a new ModuleEvent.
     *
     * @param phetApplication
     * @param module
     */
    public ModuleEvent( PhetApplication phetApplication, Module module ) {
        this.phetApplication = phetApplication;
        this.module = module;
    }

    /**
     * Gets the module associated with this ModuleEvent.
     *
     * @return the module associated with this ModuleEvent.
     */
    public Module getModule() {
        return module;
    }

    /**
     * Gets the PhetApplication associated with this ModuleEvent.
     *
     * @return the PhetApplication associated with this ModuleEvent.
     */
    public PhetApplication getPhetApplication() {
        return phetApplication;
    }
}
