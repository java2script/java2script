// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.model.event;

import edu.colorado.phet.common.phetcommon.util.SimpleObserver;
import edu.colorado.phet.common.phetcommon.util.function.VoidFunction1;

/**
 * A simple observer that can be passed to a notifier, and will update when the notifier fires
 *
 * @author Jonathan Olson
 */
public abstract class UpdateListener implements SimpleObserver, VoidFunction1<Object> {
    @Override
		public void apply( Object o ) {
        update();
    }
}
