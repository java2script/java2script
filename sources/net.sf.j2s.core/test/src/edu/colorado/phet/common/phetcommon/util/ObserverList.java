package edu.colorado.phet.common.phetcommon.util;

import java.util.ArrayList;

import edu.colorado.phet.common.phetcommon.util.function.VoidFunction1;

/**
 * List of observers, which can be added/removed/notified about any kind of change.  Used in ObservableList and similar classes to listen for addition/removal of items.
 *
 * @author Sam Reid
 */
public class ObserverList<T> {
    private final ArrayList<VoidFunction1<T>> observers = new ArrayList<VoidFunction1<T>>();

    public void addObserver( VoidFunction1<T> listener ) {
        observers.add( listener );
    }

    public void removeObserver( VoidFunction1<T> listener ) {
        observers.remove( listener );
    }

    public void notifyObservers( T value ) {
        //Iterate on a copy to avoid concurrentmodificationexception
        for ( VoidFunction1<T> observer : new ArrayList<VoidFunction1<T>>( observers ) ) {
            observer.apply( value );
        }
    }
}