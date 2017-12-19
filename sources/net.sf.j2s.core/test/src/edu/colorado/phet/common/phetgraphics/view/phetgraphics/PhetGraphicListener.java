// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 47761 $
 * Date modified : $Date: 2011-01-07 11:49:12 -0600 (Fri, 07 Jan 2011) $
 */
package edu.colorado.phet.common.phetgraphics.view.phetgraphics;

import java.util.EventListener;

/**
 * PhetGraphicListener
 *
 * @author ?
 * @version $Revision: 47761 $
 */
public interface PhetGraphicListener extends EventListener {
    public void phetGraphicChanged( PhetGraphic phetGraphic );

    public void phetGraphicVisibilityChanged( PhetGraphic phetGraphic );
}
