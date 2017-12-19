// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.model.property;

import edu.colorado.phet.common.phetcommon.util.IntegerRange;

/**
 * Integer property that is constrained to a range.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class ConstrainedIntegerProperty extends ConstrainedProperty<Integer> {

    private final int min, max;

    public ConstrainedIntegerProperty( IntegerRange range ) {
        this( range.getMin(), range.getMax(), range.getDefault() );
    }

    public ConstrainedIntegerProperty( int min, int max, int value ) {
        super( value );
        this.min = min;
        this.max = max;
        if ( !isValid( value ) ) {
            handleInvalidValue( value );
        }
    }

    @Override
    protected boolean isValid( Integer value ) {
        return ( value >= min && value <= max );
    }

    public int getMin() {
        return min;
    }

    public int getMax() {
        return max;
    }
}
