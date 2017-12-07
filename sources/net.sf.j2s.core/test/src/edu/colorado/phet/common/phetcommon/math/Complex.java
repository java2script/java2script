// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.math;


/**
 * Complex is an immutable complex number.
 * <p/>
 * DEVELOPERS:
 * Do NOT change this implementation to make this type mutable.
 * Some sims rely on the immutability of this type.
 * If you need a mutable complex number, use MutableComplex.
 *
 * @author Chris Malley
 */

public class Complex {

    //----------------------------------------------------------------------------
    // Class<?> data
    //----------------------------------------------------------------------------

    public static final Complex ZERO = new Complex( 0, 0 );

    public static final Complex I = new Complex( 0, 1 );  // i == sqrt(-1)

    //----------------------------------------------------------------------------
    // Instance data
    //----------------------------------------------------------------------------

    protected double _real;
    protected double _imaginary;

    //----------------------------------------------------------------------------
    // Constructors
    //----------------------------------------------------------------------------

    public Complex( double real, double imaginary ) {
        _real = real;
        _imaginary = imaginary;
    }

    public Complex() {
        this( 0, 0 );
    }

    public Complex( Complex c ) {
        this( c._real, c._imaginary );
    }

    public Complex copy() {
        return new Complex( _real, _imaginary );
    }

    //----------------------------------------------------------------------------
    // Getters
    //----------------------------------------------------------------------------

    public double getReal() {
        return _real;
    }

    public double getImaginary() {
        return _imaginary;
    }

    public double getPhase() {
        return Math.atan2( _imaginary, _real );
    }

    public boolean isZero() {
        return ( _real == 0 && _imaginary == 0 );
    }

    //----------------------------------------------------------------------------
    // Math
    //----------------------------------------------------------------------------

    public Complex getAdd( Complex c ) {
        return getAdd( c._real, c._imaginary );
    }

    public Complex getAdd( double real, double imaginary ) {
        return new Complex( _real + real, _imaginary + imaginary );
    }

    public Complex getAdd( double real ) {
        return getAdd( real, 0 );
    }

    public Complex getSubtract( Complex c ) {
        return getSubtract( c._real, c._imaginary );
    }

    public Complex getSubtract( double real, double imaginary ) {
        return new Complex( _real - real, _imaginary - imaginary );
    }

    public Complex getSubtract( double real ) {
        return getSubtract( real, 0 );
    }

    public Complex getMultiply( Complex c ) {
        return getMultiply( c._real, c._imaginary );
    }

    public Complex getMultiply( double real, double imaginary ) {
        return new Complex( _real * real - _imaginary * imaginary, _real * imaginary + _imaginary * real );
    }

    public Complex getMultiply( double real ) {
        return getMultiply( real, 0 );
    }

    public Complex getDivide( Complex c ) {
        return getDivide( c._real, c._imaginary );
    }

    public Complex getDivide( double real, double imaginary ) {
        double q = real * real + imaginary * imaginary;
        double g = _real * real + _imaginary * imaginary;
        double h = _imaginary * real - _real * imaginary;
        return new Complex( g / q, h / q );
    }

    public Complex getDivide( double real ) {
        return getDivide( real, 0 );
    }

    public Complex getScale( double scale ) {
        return new Complex( _real * scale, _imaginary * scale );
    }

    public double getAbs() {
        return ( Math.sqrt( ( _real * _real ) + ( _imaginary * _imaginary ) ) );
    }

    // note that there exists another square root whose imaginary part is negated
    public Complex getCanonicalSquareRoot() {
        double magnitude = getAbs();
        return new Complex( Math.sqrt( ( magnitude + _real ) / 2 ),
                            Math.signum( _imaginary ) * Math.sqrt( ( magnitude - _real ) / 2 ) );
    }

    public double getModulus() {
        return getAbs();
    }

    public Complex getOpposite() {
        return new Complex( -_real, -_imaginary );
    }

    public Complex getComplexConjugate() {
        return new Complex( _real, -_imaginary );
    }

    public static Complex getExponentiateImaginary( double theta ) {
        return new Complex( Math.cos( theta ), Math.sin( theta ) );
    }

    public static Complex getExp( Complex c ) {
        return getExp( c._real, c._imaginary );
    }

    // e^(a+bi) = ( e^a ) * ( cos(b) + i * sin(b) )
    public static Complex getExp( double real, double imaginary ) {
        double multiplier = Math.exp( real );
        return new Complex( multiplier * Math.cos( imaginary ), multiplier * Math.sin( imaginary ) );
    }

    //----------------------------------------------------------------------------
    // Object overrides
    //----------------------------------------------------------------------------

    @Override
		public boolean equals( Object obj ) {
        boolean isEqual = false;
        if ( obj instanceof Complex ) {
            Complex c = (Complex) obj;
            isEqual = ( _real == c._real && _imaginary == c._imaginary );
        }
        return isEqual;
    }

    @Override
		public String toString() {
        return "[" + _real + "+" + _imaginary + "i]";
    }
}
