// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.model.property.integerproperty;

import java.util.ArrayList;
import java.util.Arrays;

import edu.colorado.phet.common.phetcommon.model.property.CompositeProperty;
import edu.colorado.phet.common.phetcommon.model.property.ObservableProperty;
import edu.colorado.phet.common.phetcommon.model.property.Property;
import edu.colorado.phet.common.phetcommon.util.function.Function0;

/**
 * This class should be used as the parent class when implementing property composites that yield a Integer value, such as Plus, Times, etc.
 * It also provides convenience method for composing further properties.
 *
 * @author Sam Reid
 */
public class CompositeIntegerProperty extends CompositeProperty<Integer> {
    public CompositeIntegerProperty( Function0<Integer> function, ObservableProperty<?>... properties ) {
        super( function, properties );
    }

    //The following methods are used for composing ObservableProperty<Integer> instances.
    //These methods are copied in IntegerProperty (not sure how to factor them out without using traits or implicits)
    @SuppressWarnings("unchecked")
		public Plus plus( ObservableProperty<Integer>... b ) {
        ArrayList<ObservableProperty<Integer>> all = new ArrayList<ObservableProperty<Integer>>();
        all.add( this );
        all.addAll( Arrays.asList( b ) );
        return new Plus( all.toArray( new ObservableProperty[0] ) );
    }

    public DividedBy dividedBy( ObservableProperty<Integer> volume ) {
        return new DividedBy( this, volume );
    }

    public GreaterThan greaterThan( int value ) {
        return new GreaterThan( this, value );
    }

    public Times times( int b ) {
        return new Times( this, new Property<Integer>( b ) );
    }

    public GreaterThanOrEqualTo greaterThanOrEqualTo( int b ) {
        return new GreaterThanOrEqualTo( this, b );
    }

    public LessThan lessThan( int b ) {
        return new LessThan( this, b );
    }

    public Max max( CompositeIntegerProperty b ) {
        return new Max( this, b );
    }
}