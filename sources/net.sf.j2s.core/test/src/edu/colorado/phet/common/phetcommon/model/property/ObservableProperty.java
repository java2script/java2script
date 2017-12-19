// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.model.property;

import java.util.ArrayList;

import edu.colorado.phet.common.phetcommon.util.SimpleObserver;
import edu.colorado.phet.common.phetcommon.util.function.VoidFunction1;

//TODO: if we're going to have separate listener lists, then absorb functionality of SimpleObservable?

/**
 * This can be used to represent an observable model value in a MVC style pattern. Notifications are sent to observers when they
 * register with addObserver, and also when the value changes (it is up to subclasses to guarantee that notifications are sent when necessary, and not duplicated).
 * <p/>
 * ObservableProperty should be used instead of SettableProperty whenever possible, i.e. when the value needs to be observed but not set.
 * <p/>
 * This class is thread-safe. There are two main types of locking going on: locking on the observer lists (so that we ensure
 * mutual exclusion for modification of these lists) and locking on the property itself (for changing the property and sending
 * out notifications). Any subclass that should be thread-safe should make changing the property (and the notifications it sends
 * out, since we want to have consistent old/new values) atomic with respect to other threads. See #3060
 *
 * @author Sam Reid
 * @author Chris Malley
 */
public abstract class ObservableProperty<T> implements Cloneable {
//    private static final Logger LOGGER = LoggingUtils.getLogger( ObservableProperty.class.getCanonicalName() );

//    static {
//        // get rid of this to log all of the resource messages
//        LOGGER.setLevel( Level.INFO );
//    }

    private final ArrayList<SimpleObserver> simpleObservers = new ArrayList<SimpleObserver>();
    private final ArrayList<VoidFunction1<T>> newValueObservers = new ArrayList<VoidFunction1<T>>();//Listeners that receive the new value in the callback
    private final ArrayList<ChangeObserver<T>> newAndOldValueObservers = new ArrayList<ChangeObserver<T>>();//Listeners that receive the new and old values in the callback

    //Store the value that was previously notified so we can prevent sending out notifications when the value didn't actually change
    private T oldValue;

    public ObservableProperty( T oldValue ) {
        this.oldValue = oldValue; //REVIEW discuss implications of this for notify-on-register
    }

    /**
     * Adds a SimpleObserver to observe the value of this instance.
     * If notifyOnAdd is true, also immediately notifies the SimpleObserver,
     * so that the client code is not responsible for doing so.
     * This helps the SimpleObserver to always be synchronized with this instance.
     *
     * @param simpleObserver
     * @param notifyOnAdd
     */
    public void addObserver( SimpleObserver simpleObserver, boolean notifyOnAdd ) {
        // mutual exclusion on add/remove
        synchronized ( simpleObservers ) {
            simpleObservers.add( simpleObserver );
        }
        if ( notifyOnAdd ) {
            simpleObserver.update();
        }
    }

    //Notifies all 0, 1 and 2 arg listeners.  Clients should call notifyIfChanged
    private void notifyObservers( T value, T oldValue ) {
        notifySimpleObservers();//Notify SimpleObservers
        notifyNewValueObservers( value );//Notify listeners with new value
        notifyNewAndOldValueObservers( value, oldValue );//Notify listeners with both new and old values
    }

    private void notifySimpleObservers() {
        ArrayList<SimpleObserver> copy;

        // create a copy while synchronized for thread safety
        synchronized ( simpleObservers ) {
            copy = new ArrayList<SimpleObserver>( simpleObservers );
        }

        // then notify when not synchronized to prevent deadlock
        for ( SimpleObserver simpleObserver : copy ) {
            simpleObserver.update();
        }
    }

    /*
     * Notify observers that receive new value in the callback.
     */
    private void notifyNewValueObservers( T newValue ) {
        ArrayList<VoidFunction1<T>> copy;

        // create a copy while synchronized for thread safety
        synchronized ( newValueObservers ) {
            copy = new ArrayList<VoidFunction1<T>>( newValueObservers );
        }

        // then notify when not synchronized to prevent deadlock
        for ( VoidFunction1<T> observer : copy ) {//Iterate on a copy of the observer list to avoid ConcurrentModificationException, see #2741
            observer.apply( newValue );
        }
    }

    public void removeObserver( SimpleObserver observer ) {
        synchronized ( simpleObservers ) {
            simpleObservers.remove( observer );
        }
    }

    /**
     * Adds an observer that will receive the new value in the callback.
     * The observer is immediately notified of the current value when it's added.
     *
     * @param observer
     */
    public void addObserver( VoidFunction1<T> observer ) {
        synchronized ( newValueObservers ) {
            newValueObservers.add( observer );
        }
        observer.apply( get() );
    }

    public void removeObserver( VoidFunction1<T> observer ) {
        synchronized ( newValueObservers ) {
            newValueObservers.remove( observer );
        }
    }

    /*
     * Notify observers that receive the new and old values in the callback.
     */
    private void notifyNewAndOldValueObservers( T newValue, T oldValue ) {
        ArrayList<ChangeObserver<T>> copy;

        // create a copy while synchronized for thread safety
        synchronized ( newAndOldValueObservers ) {
            copy = new ArrayList<ChangeObserver<T>>( newAndOldValueObservers );
        }

        // then notify when not synchronized to prevent deadlock
        for ( ChangeObserver<T> observer : copy ) {//Iterate on a copy of the observer list to avoid ConcurrentModificationException, see #2741
            observer.update( newValue, oldValue );
        }
    }

    /**
     * Adds an observer that will receive the new and old value in the callback.
     * This observer does NOT receive immediate notification when it's added,
     * because there is no notion of "new value" or "old value".
     *
     * @param observer
     */
    public void addObserver( ChangeObserver<T> observer ) {
        synchronized ( newAndOldValueObservers ) {
            newAndOldValueObservers.add( observer );
        }
    }

    public void removeObserver( ChangeObserver<T> observer ) {
        synchronized ( newAndOldValueObservers ) {
            newAndOldValueObservers.remove( observer );
        }
    }

    /**
     * Adds and immediately notifies a SimpleObserver.
     *
     * @param simpleObserver
     */
    public void addObserver( SimpleObserver simpleObserver ) {
        addObserver( simpleObserver, true );
    }

    public abstract T get();

    @Override
    public String toString() {
        return get().toString();
    }

    /**
     * Debugging function that prints out the new value when it changes, along with the specified text.
     *
     * @param text the text to print before printing the new value
     */
    public void trace( final String text ) {
//        addObserver( new VoidFunction1<T>() {
//            public void apply( T t ) {
//                LOGGER.info( text + ": " + t );
//            }
//        } );
    }

    /**
     * Sample demonstration of ObservableProperty features.
     *
     * @param args system args
     */
    public static void main( String[] args ) {
        Property<String> p = new Property<String>( "hello" );
        p.trace( "text" );
        p.set( "world" );
    }

    /**
     * Change notification callback that allows us to:
     * 1. Ensure that the new and old value used for change listeners are handled in a thread-safe manner
     * 2. The retrieval of notification values (new/old) can be synchronized with the property change, while,
     * 3. We can send the notifications themselves later, outside of any synchronization blocks to avoid deadlock.
     * <p/>
     * Otherwise, if the sending of notifications locked this property's monitor, a deadlock could be constructed
     * quite easily by having two properties ("A" and "B") that have observers that on change modify the other
     * value. If we change "A" and "B" in different threads, each thread would lock its own property and then
     * fail to acquire the other property's lock (deadlock).
     *
     * @return A runnable that when called will notify all listeners if there was a change in state from
     *         when the last notification was sent out.
     */
    protected synchronized Runnable getChangeNotifier() {
        final T newValue = get();
        final boolean changed = newValue == null ? oldValue != null : !newValue.equals( oldValue );

        // construct the notifier with the new and old values
        final T oldNotifyValue = oldValue;
        Runnable notifier = new Runnable() {
            @Override
						public void run() {
                if ( changed ) {
                    notifyObservers( newValue, oldNotifyValue );
                }
            }
        };

        // update the old value so successive calls won't trigger notifications
        if ( changed ) {
            oldValue = newValue;
        }

        return notifier;
    }

    /**
     * Check to see if the value is different than the the value during the last notification, then send out
     * notifications if the value has changed (and storing the new value for next time).
     */
    public void notifyIfChanged() {
        getChangeNotifier().run();
    }

    /**
     * Removes all observers (0-parameter, 1-parameter and 2-parameter) from this ObservableProperty.
     */
    public void removeAllObservers() {
        synchronized ( simpleObservers ) {
            simpleObservers.clear();
        }
        synchronized ( newValueObservers ) {
            newValueObservers.clear();
        }
        synchronized ( newAndOldValueObservers ) {
            newAndOldValueObservers.clear();
        }
    }

    //Return a new observable property to indicate whether this value equals the specified value
    public ValueEquals<T> valueEquals( T value ) {
        return new ValueEquals<T>( this, value );
    }
}