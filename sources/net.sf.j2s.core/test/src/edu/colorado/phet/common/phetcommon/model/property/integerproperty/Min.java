// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.model.property.integerproperty;

import edu.colorado.phet.common.phetcommon.model.property.ObservableProperty;
import edu.colorado.phet.common.phetcommon.util.function.Function0;

/**
 * The min of two properties.
 *
 * @author Sam Reid
 */
public class Min extends CompositeIntegerProperty {
    public Min( final ObservableProperty<Integer> a, final ObservableProperty<Integer> b ) {
        super( new Function0<Integer>() {
            @Override
						public Integer apply() {
                return Math.min( a.get(), b.get() );
            }
        }, a, b );
    }
}