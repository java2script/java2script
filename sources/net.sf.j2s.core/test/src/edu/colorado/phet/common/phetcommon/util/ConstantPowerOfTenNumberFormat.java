// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.util;

import java.awt.Insets;
import java.text.FieldPosition;
import java.text.MessageFormat;
import java.text.NumberFormat;
import java.text.ParsePosition;

import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;

import edu.colorado.phet.common.phetcommon.view.util.EasyGridBagLayout;
import edu.colorado.phet.common.phetcommon.view.util.SwingUtils;


/**
 * Formats a number using a constant power of ten.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class ConstantPowerOfTenNumberFormat extends NumberFormat {

    private static final String PATTERN = "<html>{0} x 10<sup style=\"font-size:{2}%\"> {1}</sup></html>";
    private static final int DEFAULT_EXPONENT_SCALE = 100; // percent
    private static final DefaultDecimalFormat SIMPLE_FORMAT = new DefaultDecimalFormat( "0" );

    private final DefaultDecimalFormat _decimalFormat;
    private boolean _simpleMantissaFormat;
    private final int _constantExponent;
    private boolean _simpleExponentFormat;
    private final int _exponentScale;

    public ConstantPowerOfTenNumberFormat( String mantissaFormat, int constantExponent ) {
        this( mantissaFormat, constantExponent, DEFAULT_EXPONENT_SCALE );
    }

    /**
     * Constructor.
     *
     * @param mantissaFormat   format of the mantissa, specified using DecimalFormat's syntax
     * @param constantExponent exponent for the constant power of 10
     * @param exponentScale    how much to scale the exponent, in percent
     */
    public ConstantPowerOfTenNumberFormat( String mantissaFormat, int constantExponent, int exponentScale ) {
        _decimalFormat = new DefaultDecimalFormat( mantissaFormat );
        _constantExponent = constantExponent;
        _simpleMantissaFormat = true;
        _simpleExponentFormat = true;
        _exponentScale = exponentScale;
    }

    /**
     * Specifies whether to display zero as "0" and something like 9x10 as "90".
     *
     * @param b
     */
    public void setSimpleMantissaFormat( boolean b ) {
        _simpleMantissaFormat = b;
    }

    /**
     * Is zero displayed as "0" and 9x10 as "90"?
     *
     * @return true or false
     */
    public boolean isSimpleMantissaFormat() {
        return _simpleMantissaFormat;
    }

    public void setSimpleExponentFormat( boolean b ) {
        _simpleExponentFormat = b;
    }

    public boolean isSimpleExponentFormat() {
        return _simpleExponentFormat;
    }

    /**
     * TODO: handle the pos argument
     */
    @Override
		public StringBuffer format( double number, StringBuffer toAppendTo, FieldPosition pos ) {
        String valueString = null;
        if ( number == 0 && _simpleMantissaFormat ) {
            valueString = "0";
        }
        else if ( ( _constantExponent == 0 || _constantExponent == 1 ) && _simpleExponentFormat ) {
            valueString = SIMPLE_FORMAT.format( number );
        }
        else {
            // determine the mantissa
            double mantissa = number / Math.pow( 10, _constantExponent );
            // use a DecimalFormat to format the mantissa
            String mantissaString = _decimalFormat.format( mantissa );
            // put the mantissa and exponent into our format
            Object[] args = { mantissaString, new Integer( _constantExponent ), _exponentScale };
            valueString = MessageFormat.format( PATTERN, args );
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
        final double value = 4.23E7;

        String p1 = "0.00";
        String p2 = "0.0";
        String p3 = "#.0";
        String p4 = "0";

        ConstantPowerOfTenNumberFormat f1 = new ConstantPowerOfTenNumberFormat( p1, 5, 80 );
        f1.setSimpleMantissaFormat( false );
        NumberFormat f2 = new ConstantPowerOfTenNumberFormat( p2, 5 );
        NumberFormat f3 = new ConstantPowerOfTenNumberFormat( p3, 5 );
        NumberFormat f4 = new ConstantPowerOfTenNumberFormat( p4, 5 );
        NumberFormat f5 = new ConstantPowerOfTenNumberFormat( p4, 1 );
        NumberFormat f6 = new ConstantPowerOfTenNumberFormat( p4, 0 );

        NumberFormat[] tests = { f1, f2, f3, f4, f5, f6 };

        JFrame frame = new JFrame();
        frame.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE );
        JPanel panel = new JPanel();
        EasyGridBagLayout layout = new EasyGridBagLayout( panel );
        panel.setLayout( layout );
        layout.setInsets( new Insets( 5, 10, 5, 10 ) );
        for ( int row = 0; row < tests.length; row++ ) {
            JLabel label = new JLabel( tests[row].format( value ) );
            layout.addComponent( label, row, 0 );
            System.out.println( "value=" + zero + " formatted=" + tests[row].format( zero ) );
            System.out.println( "value=" + value + " formatted=" + tests[row].format( value ) );
        }
        frame.getContentPane().add( panel );
        frame.pack();
        SwingUtils.centerWindowOnScreen( frame );
        frame.setVisible( true );
    }
}
