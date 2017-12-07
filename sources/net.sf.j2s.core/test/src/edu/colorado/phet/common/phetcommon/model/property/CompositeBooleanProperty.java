// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.model.property;

import edu.colorado.phet.common.phetcommon.util.function.Function0;

/**
 * This class should be used when implementing a composite property with type boolean (such as GreaterThan).
 * It adds convenience methods like 'or' and 'and' for further composition.
 *
 * @author Sam Reid
 */
public class CompositeBooleanProperty extends CompositeProperty<Boolean> {
    public CompositeBooleanProperty( Function0<Boolean> function, ObservableProperty<?>... properties ) {
        super( function, properties );
    }

    //Returns a property that is an 'or' conjunction of this and the provided argument, makes it possible to chain property calls such as:
    //anySolutes = molesOfSalt.greaterThan( 0 ).or( molesOfSugar.greaterThan( 0 ) );//From IntroModel in "Sugar and Salt Solutions"
    @SuppressWarnings("unchecked")
		public Or or( ObservableProperty<Boolean> p ) {
        return new Or( this, p );
    }

    @SuppressWarnings("unchecked")
		public And and( ObservableProperty<Boolean> p ) {
        return new And( this, p );
    }
}