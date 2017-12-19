// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.model.property.doubleproperty;

import edu.colorado.phet.common.phetcommon.model.property.ObservableProperty;
import edu.colorado.phet.common.phetcommon.util.function.Function0;

/**
 * Observable property that computes the quotient of its arguments, but redefines 0/0 to be 0 instead of infinity which is
 * usually the appropriate behavior in physical scenarios.
 *
 * @author Sam Reid
 */
public class DividedBy extends CompositeDoubleProperty {
    public DividedBy( final ObservableProperty<Double> numerator, final ObservableProperty<Double> denominator ) {
        super( new Function0<Double>() {
            @Override
						public Double apply() {
                if ( numerator.get() == 0 ) {
                    return 0.0;
                }
                else {
                    return numerator.get() / denominator.get();
                }
            }
        }, numerator, denominator );
    }
}