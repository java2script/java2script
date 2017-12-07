// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.math;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.regex.Matcher;

public class Polynomial {
    public static final Polynomial ZERO = new Polynomial( new PolynomialTerm[] { PolynomialTerm.ZERO } );

    private final PolynomialTerm[] terms;

    public Polynomial( int constant ) {
        this( new PolynomialTerm[] { new PolynomialTerm( constant ) } );
    }

    public Polynomial( Collection<PolynomialTerm> sparseTerms ) {
        this( sparseTerms.toArray( new PolynomialTerm[sparseTerms.size()] ) );
    }

    public Polynomial( PolynomialTerm[] sparseTerms ) {
        if ( sparseTerms.length == 0 ) {
            this.terms = new PolynomialTerm[] { PolynomialTerm.ZERO };
        }
        else {
            int min = Integer.MAX_VALUE,
                    max = Integer.MIN_VALUE;

            for ( int i = 0; i < sparseTerms.length; i++ ) {
                PolynomialTerm sparseTerm = sparseTerms[i];

                if ( sparseTerm.getPower() < min ) {
                    min = sparseTerm.getPower();
                }
                if ( sparseTerm.getPower() > max ) {
                    max = sparseTerm.getPower();
                }
            }

            int total = max + 1;

            this.terms = new PolynomialTerm[total];

            for ( int i = 0; i < this.terms.length; i++ ) {
                this.terms[i] = new PolynomialTerm( i, 0 );
            }

            for ( int i = 0; i < sparseTerms.length; i++ ) {
                PolynomialTerm sparseTerm = sparseTerms[i];

                int pow = sparseTerm.getPower();

                this.terms[pow] = this.terms[pow].plus( sparseTerm );
            }
        }
    }

    public static Polynomial parsePolynomial( String sparseTerms ) {
        List<PolynomialTerm> polynomialTerms = new ArrayList<PolynomialTerm>();

        Matcher matcher = PolynomialTerm.EXPR_PATTERN.matcher( sparseTerms );

        while ( matcher.find() ) {
            polynomialTerms.add( PolynomialTerm.parsePolynomialTerm( matcher.group() ) );
        }

        return new Polynomial( polynomialTerms.toArray( new PolynomialTerm[polynomialTerms.size()] ) );
    }

    public PolynomialTerm[] getTerms() {
        return terms.clone();
    }

    public double eval( double x ) {
        double sum = 0.0;

        for ( int i = 0; i < terms.length; i++ ) {
            sum += terms[i].eval( x );
        }

        return sum;
    }

    public Polynomial plus( Polynomial that ) {
        List<PolynomialTerm> allTerms = new ArrayList<PolynomialTerm>();

        allTerms.addAll( Arrays.asList( this.terms ) );
        allTerms.addAll( Arrays.asList( that.terms ) );

        return new Polynomial( allTerms );
    }

    public Polynomial derive( int times ) {
        Polynomial p = this;

        for ( int i = 0; i < times; i++ ) {
            p = p.derive();
        }

        return p;
    }

	public Polynomial derive() {
		List<PolynomialTerm> terms = new ArrayList<PolynomialTerm>();

		terms.addAll(Arrays.asList(this.terms));

		for (int i = 0; i < terms.size(); i++) {
			terms.set(i, terms.get(i).derive());
		}

		return new Polynomial(terms);
	}

    public Polynomial times( PolynomialTerm term ) {
        PolynomialTerm[] mulTerms = new PolynomialTerm[terms.length];

        for ( int i = 0; i < terms.length; i++ ) {
            mulTerms[i] = term.times( terms[i] );
        }

        return new Polynomial( mulTerms );
    }

    public Polynomial times( Polynomial that ) {
        List<PolynomialTerm> allTerms = new ArrayList<PolynomialTerm>();

        for ( int i = 0; i < this.terms.length; i++ ) {
            for ( int j = 0; j < that.terms.length; j++ ) {
                allTerms.add( this.terms[i].times( that.terms[j] ) );
            }
        }


        return new Polynomial( allTerms );
    }

    public Polynomial pow( int n ) {
        if ( n < 0 ) {
            throw new IllegalArgumentException();
        }

        Polynomial result = new Polynomial( 1 );

        for ( int i = 0; i < n; i++ ) {
            result = result.times( this );
        }

        return result;
    }

    @Override
		public String toString() {
        StringBuffer buffer = new StringBuffer();

        for ( int i = 0; i < terms.length; i++ ) {
            boolean isFirst = i == 0;

            if ( !isFirst ) {
                buffer.append( " + " );
            }

            buffer.append( terms[i].toString() );
        }

        return buffer.toString();
    }

    @Override
		public boolean equals( Object o ) {
        if ( this == o ) {
            return true;
        }
        if ( o == null || getClass() != o.getClass() ) {
            return false;
        }

        Polynomial that = (Polynomial) o;

        if ( !Arrays.equals( terms, that.terms ) ) {
            return false;
        }

        return true;
    }

    @Override
		public int hashCode() {
        int hashCode = 0;

        for ( int i = 0; i < terms.length; i++ ) {
            hashCode += terms[i].hashCode();
        }

        return hashCode;
    }
}
