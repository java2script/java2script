// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.model.property.doubleproperty;

import edu.colorado.phet.common.phetcommon.model.property.ObservableProperty;
import edu.colorado.phet.common.phetcommon.util.function.Function0;

/**
 * This ObservableProperty computes the sum of its arguments
 *
 * @author Sam Reid
 */
public class Plus extends CompositeDoubleProperty {
    public Plus( final ObservableProperty<Double>... terms ) {
        super( new Function0<Double>() {
            @Override
						public Double apply() {
                double sum = 0.0;
                for ( ObservableProperty<Double> term : terms ) {
                    sum = sum + term.get();
                }
                return sum;
            }
        }, terms );
    }
}