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

import java.util.EventListener;

/**
 * Observes additions and removals of Modules, change in the active Module.
 *
 * @author Ron LeMaster
 * @version $Revision: 47760 $
 */
public interface ModuleObserver extends EventListener {
    /**
     * Invoked when a Module is added to a PhetApplication.
     *
     * @param event
     */
    public void moduleAdded( ModuleEvent event );

    /**
     * Invoked when the active Module changed..
     *
     * @param event
     */
    public void activeModuleChanged( ModuleEvent event );

    /**
     * Invoked when a Module is removed from the PhetApplication.
     *
     * @param event
     */
    public void moduleRemoved( ModuleEvent event );
}
