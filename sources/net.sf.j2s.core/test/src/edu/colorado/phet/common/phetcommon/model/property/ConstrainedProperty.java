// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.model.property;


/**
 * Base class for properties that have constraints on their values.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public abstract class ConstrainedProperty<T> extends Property<T> {

    public ConstrainedProperty( T value ) {
        super( value );
    }

    /**
     * Validates the value before setting it.
     *
     * @param value
     */
    @Override
    public void set( T value ) {
        if ( isValid( value ) ) {
            super.set( value );
        }
        else {
            handleInvalidValue( value );
        }
    }

    /**
     * Validates the value.
     *
     * @param value
     * @return true or false
     */
    protected abstract boolean isValid( T value );

    /**
     * Default behavior for invalid values is to throw IllegalArgumentException.
     *
     * @param value
     * @throws IllegalArgumentException
     */
    protected void handleInvalidValue( T value ) {
        throw new IllegalArgumentException( "illegal value: " + value.toString() );
    }
}
