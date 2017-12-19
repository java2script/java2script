// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.util;

import java.text.DecimalFormat;
import java.text.FieldPosition;
import java.text.MessageFormat;
import java.text.NumberFormat;
import java.text.ParsePosition;


/**
 * TimesTenNumberFormat displays numbers in this format:
 * <code>
 * M x 10<sup>E</sup>
 * </code>
 * where M is the mantissa and E is some exponent.
 * <p/>
 * Zero is optionally formatted as 0.
 * <p/>
 * The implementation of the NumberFormat interface is currently incomplete.
 * It is recommended that you restrict use to format(double).
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class TimesTenNumberFormat extends NumberFormat {

    private static final String FORMAT = "<html>{0} x 10<sup style=\"font-size:{2}%\"> {1}</sup></html>";
    private static final int DEFAULT_EXPONENT_SCALE = 100; // percent

    private final DecimalFormat _decimalFormat, _zeroFormat;
    private boolean _simpleZeroFormat;
    private final int _exponentScale;

    public TimesTenNumberFormat( String mantissaFormat ) {
        this( mantissaFormat, DEFAULT_EXPONENT_SCALE );
    }

    /**
     * Constructor.
     *
     * @param mantissaFormat format of the mantissa, specified using DecimalFormat's syntax
     * @param exponentScale size of the exponent font, relative to the mantissa
     */
    public TimesTenNumberFormat( String mantissaFormat, int exponentScale ) {
        _decimalFormat = new DecimalFormat( mantissaFormat + "E0" );
        _zeroFormat = new DecimalFormat( mantissaFormat );
        _simpleZeroFormat = true;
        _exponentScale = exponentScale;
    }

    /**
     * Specifies whether to display zero as "0".
     * If true, display zero as "0"; this is the default.
     * If false, display zero in the same format as other values.
     *
     * @param b true = display zero as "0", false = use scientific notation
     */
    public void setSimpleZeroFormat( boolean b ) {
        _simpleZeroFormat = b;
    }

    /**
     * Is zero displayed as "0" ?
     *
     * @return true or false
     */
    public boolean isSimpleZeroFormat() {
        return _simpleZeroFormat;
    }

    /**
     * TODO: handle the pos argument
     */
    @Override
		public StringBuffer format( double number, StringBuffer toAppendTo, FieldPosition pos ) {
        String valueString;
        if ( number == 0 ) {
           valueString = _simpleZeroFormat ? "0" : _zeroFormat.format( 0 );
        }
        else {
            // use a DecimalFormat to format in scientific notation, like 4.73E-7
            String scientificString = _decimalFormat.format( number );
            // parse out the mantissa and exponent on either side of the 'E'
            int index = scientificString.lastIndexOf( 'E' );
            String mantissa = scientificString.substring( 0, index );
            String exponent = scientificString.substring( index + 1 );
            // put the mantissa and exponent into our format
            Object[] args = { mantissa, exponent, _exponentScale };
            valueString = MessageFormat.format( FORMAT, args );
        }
        toAppendTo.append( valueString );
        return toAppendTo;
    }

    /**
     * TODO: handle anything that needs to be done specially for long values
     */
    @Override
		public StringBuffer format( long number, StringBuffer toAppendTo, FieldPosition pos ) {
        return format( (double) number, toAppendTo, pos );
    }

    /**
     * TODO: support this
     */
    @Override
		public Number parse( String source, ParsePosition parsePosition ) {
        throw new UnsupportedOperationException( "not supported" );
    }

    /* examples */
    public static void main( String[] args ) {

        final double zero = 0;
        final double value = 4.23E-7;

        String p1 = "0.00";
        String p2 = "0.0";
        String p3 = "#.0";
        String p4 = "0";

        TimesTenNumberFormat f1 = new TimesTenNumberFormat( p1 );
        f1.setSimpleZeroFormat( false );
        NumberFormat f2 = new TimesTenNumberFormat( p2 );
        NumberFormat f3 = new TimesTenNumberFormat( p3 );
        NumberFormat f4 = new TimesTenNumberFormat( p4, 50 );

        System.out.println( "pattern=" + p1 + " value=" + zero + " formatted=" + f1.format( zero ) );
        System.out.println( "pattern=" + p1 + " value=" + value + " formatted=" + f1.format( value ) );
        System.out.println( "pattern=" + p2 + " value=" + zero + " formatted=" + f2.format( zero ) );
        System.out.println( "pattern=" + p2 + " value=" + value + " formatted=" + f2.format( value ) );
        System.out.println( "pattern=" + p3 + " value=" + zero + " formatted=" + f3.format( zero ) );
        System.out.println( "pattern=" + p3 + " value=" + value + " formatted=" + f3.format( value ) );
        System.out.println( "pattern=" + p4 + " value=" + zero + " formatted=" + f4.format( zero ) );
        System.out.println( "pattern=" + p4 + " value=" + value + " formatted=" + f4.format( value ) );
    }
}
