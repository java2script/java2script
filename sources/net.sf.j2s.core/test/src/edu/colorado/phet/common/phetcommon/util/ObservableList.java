// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.IdentityHashMap;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

import edu.colorado.phet.common.phetcommon.util.Option.None;
import edu.colorado.phet.common.phetcommon.util.Option.Some;
import edu.colorado.phet.common.phetcommon.util.function.Function1;
import edu.colorado.phet.common.phetcommon.util.function.Function2;
import edu.colorado.phet.common.phetcommon.util.function.VoidFunction0;
import edu.colorado.phet.common.phetcommon.util.function.VoidFunction1;

/**
 * A list that can be observed for element addition and removals.
 *
 * @author John Blanco
 */
public class ObservableList<T> implements List<T> {

    //Underlying data structure containing the elements
    private final List<T> list = new ArrayList<T>();

    //Observers that are notified when an element is added to the list
    private final ObserverList<T> elementAddedObservers = new ObserverList<T>();

    //Observers that are notified when an element is removed from the list
    private final ObserverList<T> elementRemovedObservers = new ObserverList<T>();

    //Observers that are notified when a particular element (as determined by identity) is removed
    //It is important to use identity here so this list can work with mutable values (such as moving particles)
    private final IdentityHashMap<T, ArrayList<VoidFunction0>> particularElementRemovedObservers = new IdentityHashMap<T, ArrayList<VoidFunction0>>();

    /**
     * Default constructor.
     */
    public ObservableList() {
    }

    /**
     * Constructor that copies another collection.
     *
     * @param collectionToCopy
     */
    public ObservableList( Collection<? extends T> collectionToCopy ) {
        list.addAll( collectionToCopy );
        // Since this is a constructor, no notifications should need to be sent.
    }

    public ObservableList( T[] parameters ) {
        list.addAll( Arrays.asList( parameters ) );
    }

    /**
     * Add an observer that will be notified whenever elements are added to
     * the list.  Note that if there are elements already on the list, a
     * notification will be received for each.
     *
     * @param elementAddedObserver Function object that will be called when an
     *                             element is added.
     */
    public void addElementAddedObserver( VoidFunction1<T> elementAddedObserver ) {
        addElementAddedObserver( elementAddedObserver, true );
    }

    /**
     * Add an observer that will be notified whenever elements are added to
     * the list.
     *
     * @param elementAddedObserver - Function object that will be called when an
     *                             element is added.
     * @param notifyImmediately    - Flag that indicates whether notifications
     *                             should be sent for items already in the list when the observer is added.
     */
    public void addElementAddedObserver( VoidFunction1<T> elementAddedObserver, boolean notifyImmediately ) {
        elementAddedObservers.addObserver( elementAddedObserver );
        if ( notifyImmediately ) {
            for ( T element : list ) {
                elementAddedObserver.apply( element );
            }
        }
    }

    public void removeElementAddedObserver( VoidFunction1<T> elementAddedObserver ) {
        elementAddedObservers.removeObserver( elementAddedObserver );
    }

    public void addElementRemovedObserver( VoidFunction1<T> elementRemovedObserver ) {
        elementRemovedObservers.addObserver( elementRemovedObserver );
    }

    public void removeElementRemovedObserver( VoidFunction1<T> elementRemovedObserver ) {
        elementRemovedObservers.removeObserver( elementRemovedObserver );
    }

    //Listen for the removal of a specific element
    public void addElementRemovedObserver( T element, VoidFunction0 observer ) {
        if ( !particularElementRemovedObservers.containsKey( element ) ) {
            particularElementRemovedObservers.put( element, new ArrayList<VoidFunction0>() );
        }
        particularElementRemovedObservers.get( element ).add( observer );
    }

    //Remove a observer that was listening for a specific element removal
    public void removeElementRemovedObserver( T element, VoidFunction0 observer ) {
        if ( particularElementRemovedObservers.containsKey( element ) ) {
            particularElementRemovedObservers.get( element ).remove( observer );
        }
    }

    //------------------------------------------------------------------------
    // Below are functions that modify the contents of the list.  In each case,
    // the enclosed list is modified and then notifications are sent out.
    //------------------------------------------------------------------------

    @Override
		public boolean add( T t ) {
        boolean result = list.add( t );
        elementAddedObservers.notifyObservers( t );
        return result;
    }

    //Creates a list copy omitting the matching items
    public ObservableList<T> removeItems( final Function1<T, Boolean> o ) {

        ArrayList<T> toKeep = new ArrayList<T>();
        for ( T t : this ) {
            if ( !o.apply( t ) ) {
                toKeep.add( t );
            }
        }
        return new ObservableList<T>( toKeep );
    }

    //Creates a list copy keeping only the matching items
    public ObservableList<T> keepItems( final Function1<T, Boolean> o ) {

        ArrayList<T> toKeep = new ArrayList<T>();
        for ( T t : this ) {
            if ( o.apply( t ) ) {
                toKeep.add( t );
            }
        }
        return new ObservableList<T>( toKeep );
    }

    @Override
		@SuppressWarnings("unchecked")
		public boolean remove( Object o ) {
        boolean itemRemoved = list.remove( o );
        if ( itemRemoved ) {
            elementRemovedObservers.notifyObservers( (T) o );
        }

        //Notify observers that were specifically observing when the specified element would be removed
        if ( particularElementRemovedObservers.containsKey( o ) && itemRemoved ) {
            for ( VoidFunction0 observer : new ArrayList<VoidFunction0>( particularElementRemovedObservers.get( o ) ) ) {
                observer.apply();
            }
        }

        return itemRemoved;
    }

    @Override
		public boolean addAll( Collection<? extends T> c ) {
        for ( T t : c ) {
            add( t );
        }
        return true;
    }

    @Override
		public boolean addAll( int index, Collection<? extends T> c ) {
        boolean result = list.addAll( index, c );
        for ( T element : c ) {
            elementAddedObservers.notifyObservers( element );
        }
        return result;
    }

    @Override
		public boolean removeAll( Collection<?> c ) {
        boolean anythingRemoved = false;
        for ( Object o : c ) {
            boolean wasRemoved = remove( o );
            anythingRemoved = anythingRemoved || wasRemoved;
        }
        return anythingRemoved;
    }

    @Override
		public boolean retainAll( Collection<?> c ) {
        boolean anyRemoved = false;
        for ( T t : new ArrayList<T>( this ) ) {
            if ( !c.contains( t ) ) {
                boolean didRemove = remove( t );
                anyRemoved = anyRemoved || didRemove;
            }
        }
        return anyRemoved;
    }

    @Override
		public void clear() {
        while ( size() > 0 ) {
            remove( 0 );
        }
    }

    @Override
		public void add( int index, T element ) {
        list.add( index, element );
        elementAddedObservers.notifyObservers( element );
    }

    @Override
		public T remove( int index ) {
        T value = get( index );
        remove( value );
        return value;
    }

    //------------------------------------------------------------------------
    // Below are methods that are straight pass throughs to the enclosed list.
    //------------------------------------------------------------------------

    @Override
		public int size() {
        return list.size();
    }

    @Override
		public boolean isEmpty() {
        return list.isEmpty();
    }

    @Override
		public boolean contains( Object o ) {
        return list.contains( o );
    }

    @Override
		public Iterator<T> iterator() {
        return list.iterator();
    }

    @Override
		public Object[] toArray() {
        return list.toArray();
    }

    @Override
		@SuppressWarnings("hiding")
		public <T> T[] toArray( T[] a ) {
        return list.toArray( a );
    }

    @Override
		public boolean containsAll( Collection<?> c ) {
        return list.containsAll( c );
    }

    //Equality test generated by IDEA.  Only checks contents of the list, ignores listeners.
    @SuppressWarnings("rawtypes")
		@Override public boolean equals( final Object o ) {
        if ( this == o ) { return true; }
        if ( o == null || getClass() != o.getClass() ) { return false; }

        final ObservableList that = (ObservableList) o;

        return list.equals( that.list );
    }

    @Override
		public int hashCode() {
        return list.hashCode();
    }

    @Override
		public T get( int index ) {
        return list.get( index );
    }

    @Override
		public T set( int index, T element ) {
        return list.set( index, element );
    }

    @Override
		public int indexOf( Object o ) {
        return list.indexOf( o );
    }

    @Override
		public int lastIndexOf( Object o ) {
        return list.lastIndexOf( o );
    }

    @Override
		public ListIterator<T> listIterator() {
        return list.listIterator();
    }

    @Override
		public ListIterator<T> listIterator( int index ) {
        return listIterator( index );
    }

    @Override
		public List<T> subList( int fromIndex, int toIndex ) {
        return list.subList( fromIndex, toIndex );
    }

    //Combine the specified initial value with all elements from the list using the specified combination function
    public <U> U foldLeft( final U initialValue, Function2<T, U, U> combiner ) {
        U runningTotal = initialValue;
        for ( T t : this ) {
            runningTotal = combiner.apply( t, runningTotal );
        }
        return runningTotal;
    }

    /**
     * Returns a string representation of the elements of the list, does not indicate listeners.
     *
     * @return the string representation of the elements of the list.
     */
    @Override public String toString() {
        return list.toString();
    }

    /**
     * Returns a string representation of the list with the specified delimiter between items, using the toString method on each item
     *
     * @param delimiter text that will appear between items
     * @return
     */
    public String mkString( String delimiter ) {
        StringBuffer result = new StringBuffer();
        for ( int i = 0; i < size(); i++ ) {
            result.append( get( i ) );
            if ( i < size() - 1 ) {
                result.append( delimiter );
            }
        }
        return result.toString();
    }

    public static void main( String[] args ) {
        System.out.println( "new ObservableList<String>( new String[] { \"Hello\", \"There\", \"World\" } ).mkString( \" !! \" ) = " + new ObservableList<String>( new String[] { "Hello", "There", "World" } ).mkString( " !! " ) );
    }

    //Map each element to a new element
    public <U> ObservableList<U> map( final Function1<T, U> map ) {
        return new ObservableList<U>() {{
            for ( T t : ObservableList.this ) {
                add( map.apply( t ) );
            }
        }};
    }

    public ObservableList<T> filter( final Function1<T, Boolean> keep ) {
        ObservableList<T> result = new ObservableList<T>();
        for ( T t : list ) {
            if ( keep.apply( t ) ) {
                result.add( t );
            }
        }
        return result;
    }

    // return the first matching item, or None if there is none
    public Option<T> find( Function1<T, Boolean> predicate ) {
        for ( T t : list ) {
            if ( predicate.apply( t ) ) { return new Some<T>( t ); }
        }
        return new None<T>();
    }

    //Returns the minimum value in the list, causes runtime fail if not comparable
    @SuppressWarnings({ "rawtypes", "unchecked" })
		public T min() {
        return (T) Collections.min( new ArrayList<Comparable>( (Collection<? extends Comparable>) this ) );
    }

    //Returns the maximum value in the list, causes runtime fail if not comparable
    @SuppressWarnings({ "rawtypes", "unchecked" })
    public T max() {
        return (T) Collections.max( new ArrayList<Comparable>( (Collection<? extends Comparable>) this ) );
    }
}