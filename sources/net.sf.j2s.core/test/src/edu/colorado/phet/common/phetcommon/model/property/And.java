// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.model.property;

import edu.colorado.phet.common.phetcommon.util.function.Function0;

/**
 * Returns a boolean AND over Property arguments.  This provides read-only access;
 * calling setValue on this AndProperty doesn't propagate back to the original properties.
 *
 * @author Sam Reid
 */
public class And extends CompositeBooleanProperty {
    public And( final ObservableProperty<Boolean>... terms ) {
        super( new Function0<Boolean>() {
            @Override
						public Boolean apply() {
                //Test to see whether all args are true
                for ( ObservableProperty<Boolean> term : terms ) {
                    //Short circuit if any argument is false and return early for performance reasons
                    if ( !term.get() ) {
                        return false;
                    }
                }
                return true;
            }
        }, terms );
    }

    @SuppressWarnings("unchecked")
		public static And and( ObservableProperty<Boolean> a, final ObservableProperty<Boolean> b ) {
        return new And( a, b );
    }
}