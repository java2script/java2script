// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.math;


/**
 * MutableComplex is a mutable complex number.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class MutableComplex extends Complex {

    //----------------------------------------------------------------------------
    // Constructors
    //----------------------------------------------------------------------------

    public MutableComplex( double real, double imaginary ) {
        super( real, imaginary );
    }

    public MutableComplex() {
        super();
    }

    public MutableComplex( Complex c ) {
        super( c );
    }

    @Override
		public Complex copy() {
        return super.copy();
    }

    //----------------------------------------------------------------------------
    // Accessors
    //----------------------------------------------------------------------------

    public void setValue( Complex c ) {
        setValue( c._real, c._imaginary );
    }

    public void setValue( double real, double imag ) {
        _real = real;
        _imaginary = imag;
    }

    public void setValue( double real ) {
        setValue( real, 0 );
    }

    public void zero() {
        setValue( 0, 0 );
    }

    //----------------------------------------------------------------------------
    // Math
    //----------------------------------------------------------------------------

    public void add( Complex c ) {
        add( c._real, c._imaginary );
    }

    public void add( double real, double imaginary ) {
        _real += real;
        _imaginary += imaginary;
    }

    public void add( double real ) {
        add( real, 0 );
    }

    public void subtract( Complex c ) {
        subtract( c._real, c._imaginary );
    }

    public void subtract( double real, double imaginary ) {
        _real -= real;
        _imaginary -= imaginary;
    }

    public void subtract( double real ) {
        subtract( real, 0 );
    }

    public void multiply( Complex c ) {
        multiply( c._real, c._imaginary );
    }

    public void multiply( double real, double imaginary ) {
        double newReal = _real * real - _imaginary * imaginary;
        double newImaginary = _real * imaginary + _imaginary * real;
        _real = newReal;
        _imaginary = newImaginary;
    }

    public void multiply( double real ) {
        multiply( real, 0 );
    }

    public void divide( Complex c ) {
        divide( c._real, c._imaginary );
    }

    public void divide( double real, double imaginary ) {
        double q = real * real + imaginary * imaginary;
        double g = _real * real + _imaginary * imaginary;
        double h = _imaginary * real - _real * imaginary;
        _real = g / q;
        _imaginary = h / q;
    }

    public void divide( double real ) {
        divide( real, 0 );
    }

    public void scale( double scale ) {
        _real *= scale;
        _imaginary *= scale;
    }

    //  e^(a+bi) = ( e^a ) * ( cos(b) + i * sin(b) )
    public void exp() {
        double multiplier = Math.exp( _real );
        _real = multiplier * Math.cos( _imaginary );
        _imaginary = multiplier * Math.sin( _imaginary );
    }
}
