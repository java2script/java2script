// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.model.event;

import edu.colorado.phet.common.phetcommon.util.function.VoidFunction1;

/**
 * A "Listenable" notifier. TODO: consider name change?
 * <p/>
 * Generics support contravariant listeners. See CompositeNotifier.main() for examples
 *
 * @author Jonathan Olson
 */
public interface INotifier<T> {

    public void addListener( VoidFunction1<? super T> listener );

    // add the listener, and if fireOnAdd is true, call listener.update()
    public void addUpdateListener( UpdateListener listener, boolean fireOnAdd );

    public void removeListener( VoidFunction1<? super T> listener );
}
