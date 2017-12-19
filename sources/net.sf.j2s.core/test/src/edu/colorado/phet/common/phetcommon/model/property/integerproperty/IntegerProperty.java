// Copyright 2002-2012, University of Colorado
package edu.colorado.phet.common.phetcommon.model.property.integerproperty;

import java.util.ArrayList;
import java.util.Arrays;

import edu.colorado.phet.common.phetcommon.model.property.ObservableProperty;
import edu.colorado.phet.common.phetcommon.model.property.Property;
import edu.colorado.phet.common.phetcommon.util.function.VoidFunction0;

/**
 * Subclass that adds convenience methods such as plus(), times(), divide(), etc.
 *
 * @author Sam Reid
 */
public class IntegerProperty extends Property<Integer> {
    public IntegerProperty( Integer value ) {
        super( value );
    }

    @SuppressWarnings("unchecked")
		public Plus plus( ObservableProperty<Integer>... b ) {
        ArrayList<ObservableProperty<Integer>> all = new ArrayList<ObservableProperty<Integer>>();
        all.add( this );
        all.addAll( Arrays.asList( b ) );
        return new Plus( all.toArray( new ObservableProperty[0] ) );
    }

    //Increments the value by the specified amount, notifying observers if the change was nonzero
    public void add( int v ) {
        set( get() + v );
    }

    //Decrements the value by the specified amount, notifying observers if the change was nonzero
    public void subtract( int v ) {
        set( get() - v );
    }

    //The following methods are used for composing ObservableProperty<Integer> instances.
    //These methods are copied in CompositeIntegerProperty (not sure how to factor them out without using traits or implicits)
    public DividedBy dividedBy( ObservableProperty<Integer> volume ) {
        return new DividedBy( this, volume );
    }

    public GreaterThan greaterThan( int value ) {
        return new GreaterThan( this, value );
    }

    public Times times( int b ) {
        return new Times( this, new Property<Integer>( b ) );
    }

    public Times times( ObservableProperty<Integer> b ) {
        return new Times( this, b );
    }

    public ObservableProperty<Integer> minus( CompositeIntegerProperty b ) {
        return new Minus( this, b );
    }

    public LessThan lessThan( int b ) {
        return new LessThan( this, b );
    }

    public ObservableProperty<Boolean> lessThan( ObservableProperty<Integer> b ) {
        return new LessThan( this, b );
    }

    public ObservableProperty<Boolean> greaterThanOrEqualTo( int b ) {
        return new GreaterThanOrEqualTo( this, b );
    }

    public ObservableProperty<Boolean> greaterThanOrEqualTo( ObservableProperty<Integer> b ) {
        return new GreaterThanOrEqualTo( this, b );
    }

    public ObservableProperty<Boolean> lessThanOrEqualTo( int b ) {
        return lessThanOrEqualTo( new IntegerProperty( b ) );
    }

    public ObservableProperty<Boolean> lessThanOrEqualTo( ObservableProperty<Integer> b ) {
        return new LessThanOrEqualTo( this, b );
    }

    public void increment() { set( get() + 1 ); }

    public void decrement() { set( get() - 1 ); }

    //Returns a function that when invoked, adds the specified value to this instance
    public VoidFunction0 add_( final int delta ) {
        return new VoidFunction0() {
            @Override
						public void apply() {
                set( get() + delta );
            }
        };
    }

    public VoidFunction0 _increment() { return add_( 1 ); }

    public VoidFunction0 _decrement() {return add_( -1 );}
}