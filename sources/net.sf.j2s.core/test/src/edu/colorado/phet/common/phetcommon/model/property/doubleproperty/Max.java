// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.model.property.doubleproperty;

import edu.colorado.phet.common.phetcommon.model.property.ObservableProperty;
import edu.colorado.phet.common.phetcommon.model.property.Property;
import edu.colorado.phet.common.phetcommon.util.function.Function0;

/**
 * The max of two properties.
 *
 * @author Sam Reid
 */
public class Max extends CompositeDoubleProperty {
    public Max( final ObservableProperty<Double> a, double b ) {
        this( a, new Property<Double>( b ) );
    }

    public Max( final ObservableProperty<Double> a, final ObservableProperty<Double> b ) {
        super( new Function0<Double>() {
            @Override
						public Double apply() {
                return Math.max( a.get(), b.get() );
            }
        }, a, b );
    }
}