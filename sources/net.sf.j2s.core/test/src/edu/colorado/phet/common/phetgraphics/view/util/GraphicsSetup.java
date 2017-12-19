// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 54200 $
 * Date modified : $Date: 2011-07-18 19:45:40 -0500 (Mon, 18 Jul 2011) $
 */
package edu.colorado.phet.common.phetgraphics.view.util;

import java.awt.Graphics2D;

/**
 * Operates on a Graphics2D object to prepare for rendering.
 *
 * @author ?
 * @version $Revision: 54200 $
 */
public interface GraphicsSetup {
    /**
     * Applies this setup on the specified graphics object.
     *
     * @param graphics
     */
    void setup( Graphics2D graphics );
}
