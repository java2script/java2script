// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.model.event;

import java.util.List;

import edu.colorado.phet.common.phetcommon.util.function.VoidFunction1;

/**
 * Notifier class that assumes listeners are of type VoidFunction1<T>, uses composite pattern on AbstractNotifier
 * to reuse code in notifier while providing a simpler interface.
 * <p/>
 * Generic "? super T" allows contravariance, so you can add a listener expecting an Object to a notifier delivering Strings
 *
 * @author Sam Reid
 * @author Jonathan Olson
 */
public class Notifier<T> implements INotifier<T> {
    //The wrapped AbstractNotifier used to store listeners and fire events.
    private AbstractNotifier<VoidFunction1<? super T>> notifier = new AbstractNotifier<VoidFunction1<? super T>>();

    //Signify that the value has changed, passing the T value to all listeners
    public void updateListeners( final T value ) {
        notifier.updateListeners( new VoidFunction1<VoidFunction1<? super T>>() {
            @Override
						public void apply( VoidFunction1<? super T> listener ) {
                listener.apply( value );
            }
        } );
    }

    @Override
		public void addListener( VoidFunction1<? super T> listener ) {
        notifier.addListener( listener );
    }

    /**
     * Allows adding listeners that don't care about the type of the argument, just that something changed.
     * This is similar to how properties are handled, but we don't want to filter out "duplicate" values.
     */
    @Override
		public void addUpdateListener( UpdateListener listener, boolean fireOnAdd ) {
        notifier.addListener( listener );
        if ( fireOnAdd ) {
            listener.update();
        }
    }

    @Override
		public void removeListener( VoidFunction1<? super T> listener ) {
        notifier.removeListener( listener );
    }

    public List<VoidFunction1<? super T>> getListeners() {
        return notifier.getListeners();
    }
}
