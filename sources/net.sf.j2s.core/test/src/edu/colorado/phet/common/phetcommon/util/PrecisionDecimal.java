// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.util;


/**
 * PrecisionDecimal is a value that is constrained to some specified number of decimal places.
 * The value can be changed, but the precision is immutable.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class PrecisionDecimal {

    private final int numberOfDecimalPlaces;
    private double preciseValue; // the precise value
    private double value;

    /**
     * Constructor
     *
     * @param preciseValue
     * @param numberOfDecimalPlaces
     */
    public PrecisionDecimal( double preciseValue, int numberOfDecimalPlaces ) {
        if ( numberOfDecimalPlaces < 0 ) {
            throw new IllegalArgumentException( "numberOfDecimalPlaces must be >= 0" );
        }
        this.numberOfDecimalPlaces = numberOfDecimalPlaces;
        setValue( preciseValue );
    }

    /**
     * Copy constructor.
     *
     * @param d
     */
    public PrecisionDecimal( PrecisionDecimal d ) {
        this( d.getPreciseValue(), d.getNumberOfDecimalPlaces() );
    }

    /*
    * Trims a value to the specified number of decimal places.
    * Decimal places that will be dropped are rounded towards "nearest neighbor"
    * unless both neighbors are equidistant, in which case round up.
    * Note that this is the rounding method that most of us were taught in grade school.
    */
    private static double adjustPrecision( double value, int numberOfDecimalPlaces ) {
        int sign = ( value >= 0 ) ? 1 : -1;
        final double pow10 = Math.pow( 10, numberOfDecimalPlaces );
        return sign * Math.round( Math.abs( value ) * pow10 ) / pow10;
    }

    /**
     * Gets the number of significant decimal places in values
     * returned by getValue.
     *
     * @return
     */
    public int getNumberOfDecimalPlaces() {
        return numberOfDecimalPlaces;
    }

    /**
     * Sets the value.
     *
     * @param value
     */
    public void setValue( double value ) {
        preciseValue = value;
        this.value = adjustPrecision( value, numberOfDecimalPlaces );
    }

    /**
     * Gets the value, constrained to the number of significant decimal places
     * indicated in the constructor.
     *
     * @return
     */
    public double getValue() {
        return value;
    }

    /**
     * Gets the precise value, as provided to the constructor or setValue.
     *
     * @return
     */
    public double getPreciseValue() {
        return preciseValue;
    }

    /**
     * Equal if their constrained values are the same.
     */
    @Override
		public boolean equals( Object o ) {
        boolean equals = false;
        if ( o instanceof PrecisionDecimal ) {
            PrecisionDecimal d = (PrecisionDecimal) o;
            equals = ( d.getValue() == getValue() );
        }
        return equals;
    }

    /**
     * Test & examples.
     */
    public static void main( String[] args ) {

        PrecisionDecimal d1 = new PrecisionDecimal( 12.3456, 2 );
        System.out.println( d1.getPreciseValue() + " to " + d1.getNumberOfDecimalPlaces() + " places = " + d1.getValue() );
        assert ( d1.getValue() == 12.35 );

        PrecisionDecimal d2 = new PrecisionDecimal( 12.3456, 3 );
        System.out.println( d2.getPreciseValue() + " to " + d2.getNumberOfDecimalPlaces() + " places = " + d2.getValue() );
        assert ( d2.getValue() == 12.346 );

        PrecisionDecimal d3 = new PrecisionDecimal( -1.45, 1 );
        System.out.println( d3.getPreciseValue() + " to " + d3.getNumberOfDecimalPlaces() + " places = " + d3.getValue() );
        assert ( d3.getValue() == -1.5 );

        PrecisionDecimal d6 = new PrecisionDecimal( -1.44, 1 );
        System.out.println( d6.getPreciseValue() + " to " + d6.getNumberOfDecimalPlaces() + " places = " + d6.getValue() );
        assert ( d6.getValue() == -1.4 );

        PrecisionDecimal d4 = new PrecisionDecimal( 1.344, 2 );
        PrecisionDecimal d5 = new PrecisionDecimal( 1.340, 2 );
        System.out.println( d4.getPreciseValue() + ( ( d4.getValue() == d5.getValue() ) ? " == " : " != " ) + d5.getPreciseValue() );
        assert ( d4.getValue() == d5.getValue() );
    }
}
