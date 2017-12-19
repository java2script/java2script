// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 47760 $
 * Date modified : $Date: 2011-01-07 11:42:54 -0600 (Fri, 07 Jan 2011) $
 */
package edu.colorado.phet.common.phetcommon.util;

import java.util.EventListener;

/**
 * SwingThreadEventListener
 * <p/>
 * A marker interface used to distinguish EventListeners that run in the
 * Swing dispatch queue thread.
 *
 * @author Ron LeMaster
 * @version $Revision: 47760 $
 */
public interface SwingThreadModelListener extends EventListener {
}
