// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.model.property.integerproperty;

import edu.colorado.phet.common.phetcommon.model.property.ObservableProperty;
import edu.colorado.phet.common.phetcommon.util.function.Function0;

/**
 * Observable property that computes the quotient of its arguments, but redefines 0/0 to be 0 instead of infinity which is
 * usually the appropriate behavior in physical scenarios.
 *
 * @author Sam Reid
 */
public class DividedBy extends CompositeIntegerProperty {
    public DividedBy( final ObservableProperty<Integer> numerator, final ObservableProperty<Integer> denominator ) {
        super( new Function0<Integer>() {
            @Override
						public Integer apply() {
                if ( numerator.get() == 0 ) {
                    return 0;
                }
                else {
                    return numerator.get() / denominator.get();
                }
            }
        }, numerator, denominator );
    }
}