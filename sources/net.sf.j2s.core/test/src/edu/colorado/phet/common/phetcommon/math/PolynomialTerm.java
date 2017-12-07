// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.math;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PolynomialTerm {
    public static final PolynomialTerm ZERO = new PolynomialTerm( 0, 0 );

    public static final Pattern EXPR_PATTERN = Pattern.compile( "([+\\-])? *(\\d+)x\\^(\\d+)" );

    private final int power;
    private final int coeff;

    public PolynomialTerm( int power, int coeff ) {
        this.power = power;
        this.coeff = coeff;

        if ( power < 0 ) {
            throw new IllegalArgumentException();
        }
    }

    public PolynomialTerm( int constant ) {
        this( 0, constant );
    }

    public static PolynomialTerm parsePolynomialTerm( String expression ) {
        Matcher matcher = EXPR_PATTERN.matcher( expression );

        if ( matcher.find() ) {
            int sign = 1;

            String signString = matcher.group( 1 );

            if ( signString != null && signString.equals( "-" ) ) {
                sign = -1;
            }


            int coeff = Integer.parseInt( matcher.group( 2 ) );
            int power = Integer.parseInt( matcher.group( 3 ) );

            return new PolynomialTerm( power, coeff * sign );
        }
        else {
            throw new IllegalArgumentException();
        }

    }

    public int getPower() {
        return power;
    }

    public int getCoeff() {
        return coeff;
    }

    public PolynomialTerm derive( int numDer ) {
        PolynomialTerm term = this;

        for ( int i = 0; i < numDer; i++ ) {
            term = term.derive();
        }

        return term;
    }

    public PolynomialTerm derive() {
        if ( power == 0 ) {
            return ZERO;
        }
        else {
            return new PolynomialTerm( power - 1, coeff * power );
        }
    }

    public double eval( double x ) {
        return Math.pow( x, power ) * coeff;
    }

    public PolynomialTerm times( PolynomialTerm that ) {
        return new PolynomialTerm( this.power + that.power, this.coeff * that.coeff );
    }

    public PolynomialTerm plus( PolynomialTerm that ) {
        if ( this.power == that.power ) {
            return new PolynomialTerm( this.power, this.coeff + that.coeff );
        }
        else {
            throw new IllegalArgumentException();
        }
    }

    @Override
		public String toString() {
        return coeff + "x^" + power;
    }

    @Override
		public boolean equals( Object o ) {
        if ( this == o ) {
            return true;
        }
        if ( o == null || getClass() != o.getClass() ) {
            return false;
        }

        PolynomialTerm that = (PolynomialTerm) o;

        if ( coeff != that.coeff ) {
            return false;
        }
        if ( power != that.power ) {
            return false;
        }

        return true;
    }

    @Override
		public int hashCode() {
        int result;
        result = power;
        result = 31 * result + coeff;
        return result;
    }
}
