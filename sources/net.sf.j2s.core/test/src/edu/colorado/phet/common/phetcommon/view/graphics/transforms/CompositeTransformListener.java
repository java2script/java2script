// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 47760 $
 * Date modified : $Date: 2011-01-07 11:42:54 -0600 (Fri, 07 Jan 2011) $
 */
package edu.colorado.phet.common.phetcommon.view.graphics.transforms;

import java.util.ArrayList;

/**
 * CompositeTransformListener
 *
 * @author ?
 * @version $Revision: 47760 $
 */
public class CompositeTransformListener implements TransformListener {
    private ArrayList<TransformListener> listeners = new ArrayList<TransformListener>();

	@Override
	public void transformChanged(ModelViewTransform2D mvt) {
		for (int i = 0; i < listeners.size(); i++) {
			listeners.get(i).transformChanged(mvt);
		}
	}

    public TransformListener transformListenerAt( int i ) {
        return listeners.get( i );
    }

    public void removeTransformListener( TransformListener tl ) {
        listeners.remove( tl );
    }

    public int numTransformListeners() {
        return listeners.size();
    }

    public void addTransformListener( TransformListener tl ) {
        listeners.add( tl );
    }

    public TransformListener[] getTransformListeners() {
        return listeners.toArray( new TransformListener[0] );
    }
}