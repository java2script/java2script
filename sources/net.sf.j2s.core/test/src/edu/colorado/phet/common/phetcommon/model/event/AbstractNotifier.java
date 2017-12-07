// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.model.event;

import java.util.ArrayList;
import java.util.LinkedList;

import edu.colorado.phet.common.phetcommon.util.function.VoidFunction1;

/**
 * General listener pattern that can be used for sending events, such as when model elements are added or removed.
 * It is abstract not since it is an abstract class (it isn't), but because it uses an abstraction over listener types.
 *
 * @author Sam Reid
 */
public class AbstractNotifier<T> {//T is the listener type
    private LinkedList<T> listeners = new LinkedList<T>();

    public void addListener( T listener ) {
        listeners.add( listener );
    }

    public void removeListener( T listener ) {
        listeners.remove( listener );
    }

    //Notify the listeners that an event has occurred.  This is called 'update' instead of 'notify' to avoid clashing with java 'notify' methods.
    public void updateListeners( VoidFunction1<T> callback ) {
        for ( T listener : new ArrayList<T>( listeners ) ) {
            callback.apply( listener );
        }
    }

    public LinkedList<T> getListeners() {
        return new LinkedList<T>( listeners );
    }
}