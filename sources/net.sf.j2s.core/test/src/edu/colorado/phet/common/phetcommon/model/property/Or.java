// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.model.property;

import java.util.List;

import edu.colorado.phet.common.phetcommon.util.function.Function0;

/**
 * Returns a boolean OR over Property arguments.  This provides read-only access;
 * calling setValue on this AndProperty doesn't propagate back to the original properties.
 *
 * @author Sam Reid
 */
public class Or extends CompositeBooleanProperty {
    public Or( final ObservableProperty<Boolean>... terms ) {
        super( new Function0<Boolean>() {
            @Override
						public Boolean apply() {
                for ( ObservableProperty<Boolean> term : terms ) {
                    //Short circuit for improved performance, returning true as soon as any term evaluates to true
                    if ( term.get() ) {
                        return true;
                    }
                }
                return false;
            }
        }, terms );
    }

    public static Boolean or( List<Property<Boolean>> p ) {
        for ( Property<Boolean> booleanProperty : p ) {
            if ( booleanProperty.get() ) { return true; }
        }
        return false;
    }
}
