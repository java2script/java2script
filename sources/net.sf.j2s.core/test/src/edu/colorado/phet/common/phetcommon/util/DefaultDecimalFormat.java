// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.util;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.text.FieldPosition;
import java.text.NumberFormat;
import java.text.ParseException;

import edu.colorado.phet.common.phetcommon.resources.PhetResources;

/**
 * This formatter never returns zero-values with a minus sign prefix, and rounds to nearest neighbor.
 * See main for examples.
 * <p>
 * WARNING! Do not use this for scientific notation, it's broken on Java >= 1.7.  See Unfuddle #3664.
 * </p>
 */
public class DefaultDecimalFormat extends DecimalFormat {

    private NumberFormat decimalFormat;

    public DefaultDecimalFormat( String pattern ) {
        this( DecimalFormat.getNumberInstance( PhetResources.readLocale() ) );
        if ( pattern.contains( "E" ) ) {
            throw new IllegalArgumentException( "scientific notation is not supported, see Unfuddle #3664: " + pattern );
        }
        if ( decimalFormat instanceof DecimalFormat ) {
            ( (DecimalFormat) decimalFormat ).applyPattern( pattern );
        }
    }

    public DefaultDecimalFormat( NumberFormat decimalFormat ) {
        this.decimalFormat = decimalFormat;
        // #3303, When we move to Java 1.6, replace roundNearestNeighbor with this.decimalFormat.setRoundingMode( RoundingMode.HALF_UP );
    }

    //TODO #3664 this is buggy on java >= 1.7
    // #3303, Java 1.5 workaround for "nearest neighbor" rounding.
    private double roundNearestNeighbor( double number ) {

        //Find the number before the decimal place but ignore the minus sign if any
        final int prefix = (int) Math.floor( Math.abs( number ) );

        //Count the digits before the decimal place
        final int numberOfDigitsBeforeTheDecimal = prefix == 0 ? 0 : Integer.toString( prefix ).length();

        //Total number of digits to show is the number of digits before the decimal plus the number to show afterwards.
        final int numDigitsToShow = decimalFormat.getMaximumFractionDigits() + numberOfDigitsBeforeTheDecimal;

        BigDecimal bigDecimal = new BigDecimal( number, new MathContext( numDigitsToShow, RoundingMode.HALF_UP ) );
        BigDecimal roundedBigDecimal = bigDecimal.setScale( numDigitsToShow, RoundingMode.HALF_UP );
        return roundedBigDecimal.doubleValue();
    }

    // ints are promoted to long, so we need to override the version of format that takes a long, otherwise #3303 won't be applied.
    @Override public StringBuffer format( final long number, final StringBuffer result, final FieldPosition fieldPosition ) {
        return format( (double) number, result, fieldPosition );
    }

    @Override public StringBuffer format( double number, StringBuffer result, FieldPosition fieldPosition ) {
        final double rounded = roundNearestNeighbor( number );
        StringBuffer formattedText = decimalFormat.format( rounded, new StringBuffer(), fieldPosition );
        double parsed = 0;
        try {
            parsed = decimalFormat.parse( formattedText.toString() ).doubleValue();
        }
        catch ( NumberFormatException numberFormatException ) {
            return decimalFormat.format( number, result, fieldPosition );
        }
        catch ( ParseException e ) {
            e.printStackTrace();
        }
        if ( parsed == 0 && formattedText.indexOf( "-" ) == 0 ) {
            result.append( formattedText.substring( 1 ) );
        }
        else {
            result.append( formattedText );
        }
        return result;
    }

    // Creates a format with at least one integer place and a specified number of decimal places.
    public static DefaultDecimalFormat createFormat( int numberOfDecimalPlaces ) {
        String pattern = "0.";
        for ( int i = 0; i < numberOfDecimalPlaces; i++ ) {
            pattern += "0";
        }
        return new DefaultDecimalFormat( pattern );
    }

    // tests
    public static void main( String[] args ) {

        // various values with a large integer component
        assert ( new DefaultDecimalFormat( "0.0E0" ).format( 1200.0 ).equals( "1200.0" ) );
        assert ( new DefaultDecimalFormat( "0.0" ).format( 999 ).equals( "999.0" ) );
        assert ( new DefaultDecimalFormat( "0.0" ).format( 1001 ).equals( "1001.0" ) );
        assert ( new DefaultDecimalFormat( "0.0" ).format( 999.9 ).equals( "999.9" ) );
        assert ( new DefaultDecimalFormat( "0.0" ).format( 1000.06 ).equals( "1000.1" ) );

        // negative zero
        assert ( new DecimalFormat( "0.00" ).format( -0.00001 ).equals( "-0.00" ) );
        assert ( new DefaultDecimalFormat( "0.00" ).format( -0.00001 ).equals( "0.00" ) );

        // positive rounding (even neighbor)
        assert ( new DefaultDecimalFormat( "0.00" ).format( 0.014 ).equals( "0.01" ) );
        assert ( new DefaultDecimalFormat( "0.00" ).format( 0.015 ).equals( "0.02" ) );
        assert ( new DefaultDecimalFormat( "0.00" ).format( 0.016 ).equals( "0.02" ) );

        // positive rounding (odd neighbor)
        assert ( new DefaultDecimalFormat( "0.00" ).format( 0.024 ).equals( "0.02" ) );

        // positive rounding (even neighbor)
        assert ( new DefaultDecimalFormat( "0.00" ).format( 0.014 ).equals( "0.01" ) );
        assert ( new DefaultDecimalFormat( "0.00" ).format( 0.015 ).equals( "0.02" ) );
        assert ( new DefaultDecimalFormat( "0.00" ).format( 0.016 ).equals( "0.02" ) );

        // positive rounding (odd neighbor)
        assert ( new DefaultDecimalFormat( "0.00" ).format( 0.024 ).equals( "0.02" ) );
        assert ( new DefaultDecimalFormat( "0.00" ).format( 0.025 ).equals( "0.03" ) );
        assert ( new DefaultDecimalFormat( "0.00" ).format( 0.026 ).equals( "0.03" ) );

        // negative rounding (even neighbor)
        assert ( new DefaultDecimalFormat( "0.00" ).format( -0.014 ).equals( "-0.01" ) );
        assert ( new DefaultDecimalFormat( "0.00" ).format( -0.015 ).equals( "-0.02" ) );
        assert ( new DefaultDecimalFormat( "0.00" ).format( -0.016 ).equals( "-0.02" ) );

        // negative rounding (odd neighbor)
        assert ( new DefaultDecimalFormat( "0.00" ).format( -0.024 ).equals( "-0.02" ) );
        assert ( new DefaultDecimalFormat( "0.00" ).format( -0.025 ).equals( "-0.03" ) );
        assert ( new DefaultDecimalFormat( "0.00" ).format( -0.026 ).equals( "-0.03" ) );

        // try other numbers of decimal places, with odd and even neighbors
        assert ( new DefaultDecimalFormat( "0.000" ).format( 0.0015 ).equals( "0.002" ) );
        assert ( new DefaultDecimalFormat( "0.000" ).format( 0.0025 ).equals( "0.003" ) );
        assert ( new DefaultDecimalFormat( "0.0000" ).format( 0.00015 ).equals( "0.0002" ) );
        assert ( new DefaultDecimalFormat( "0.0000" ).format( 0.00025 ).equals( "0.0003" ) );
    }

}