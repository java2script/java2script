// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 50434 $
 * Date modified : $Date: 2011-04-08 12:13:27 -0500 (Fri, 08 Apr 2011) $
 */
package edu.colorado.phet.common.phetcommon.util.persistence;

import java.awt.geom.Point2D;
import java.beans.DefaultPersistenceDelegate;
import java.beans.Encoder;
import java.beans.Statement;

/**
 * Point2DPersistenceDelegate
 *
 * @author Ron LeMaster
 * @version $Revision: 50434 $
 */
public class Point2DPersistenceDelegate extends DefaultPersistenceDelegate {

    @Override
		protected void initialize( Class<?> type, Object oldInstance, Object newInstance, Encoder out ) {
        Point2D point = (Point2D) oldInstance;
        out.writeStatement( new Statement( oldInstance,
                                           "setLocation",
                                           new Object[] { new Double( point.getX() ), new Double( point.getY() ) } ) );
    }
}
