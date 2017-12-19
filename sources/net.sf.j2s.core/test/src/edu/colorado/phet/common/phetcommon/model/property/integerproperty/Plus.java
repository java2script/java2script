// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.model.property.integerproperty;

import edu.colorado.phet.common.phetcommon.model.property.ObservableProperty;
import edu.colorado.phet.common.phetcommon.util.function.Function0;

/**
 * This ObservableProperty computes the sum of its arguments
 *
 * @author Sam Reid
 */
public class Plus extends CompositeIntegerProperty {
    public Plus( final ObservableProperty<Integer>... terms ) {
        super( new Function0<Integer>() {
            @Override
						public Integer apply() {
                int sum = 0;
                for ( ObservableProperty<Integer> term : terms ) {
                    sum = sum + term.get();
                }
                return sum;
            }
        }, terms );
    }
}