// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.math;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import edu.colorado.phet.common.phetcommon.util.FunctionalUtils;
import edu.colorado.phet.common.phetcommon.util.function.VoidFunction1;

/**
 * Represents an immutable permutation, that can "permute" an ordered collection.
 * TODO: Can we use generics to say that we implement Function1? Not possible so far to get the proper type preservation
 */
public class Permutation {
    private final int[] indices;

    /**
     * @param size Number of elements
     * @return An identity permutation with a specific number of elements
     */
    public static Permutation identity( int size ) {
        assert ( size >= 0 );
        int[] indices = new int[size];
        for ( int i = 0; i < size; i++ ) {
            indices[i] = i;
        }
        return new Permutation( indices );
    }

    // lists all permutations that have a given size
    public static List<Permutation> permutations( int size ) {
        final List<Permutation> result = new ArrayList<Permutation>();
        forEachPermutation( FunctionalUtils.rangeInclusive( 0, size - 1 ), new VoidFunction1<List<Integer>>() {
            @Override
						public void apply( List<Integer> integers ) {
                result.add( new Permutation( integers ) );
            }
        } );
        return result;
    }

    /**
     * Creates a permutation that will rearrange a list so that newList[i] = oldList[permutation[i]]
     */
    public Permutation( int[] permutation ) {
        this.indices = permutation;
    }

    public Permutation( List<Integer> permutation ) {
        indices = new int[permutation.size()];
        for ( int i = 0; i < permutation.size(); i++ ) {
            indices[i] = permutation.get( i );
        }
    }

    /**
     * Permute a list of objects, and return the result.
     */
    public <T> List<T> apply( List<T> objects ) {
        if ( objects.size() != indices.length ) {
            throw new IllegalArgumentException( "Permutation length " + size() + " not equal to list length " + objects.size() );
        }
        List<T> result = new ArrayList<T>( objects.size() );
        for ( int i = 0; i < objects.size(); i++ ) {
            result.add( objects.get( indices[i] ) );
        }
        return result;
    }

    // Permute a single index (and return the result)
    public int apply( int index ) {
        return indices[index];
    }

    public int size() {
        return indices.length;
    }

    // The inverse of this permutation
    public Permutation inverted() {
        int[] newPermutation = new int[size()];
        for ( int i = 0; i < size(); i++ ) {
            newPermutation[indices[i]] = i;
        }
        return new Permutation( newPermutation );
    }

    // returns a new list of permutations based on this one, but with all indices specified permuted.
    public List<Permutation> withIndicesPermuted( final List<Integer> indices ) {
        final List<Permutation> result = new ArrayList<Permutation>();
        forEachPermutation( indices, new VoidFunction1<List<Integer>>() {
            @Override
						public void apply( List<Integer> integers ) {
                int[] oldIndices = Permutation.this.indices;
                int[] newPermutation = new int[oldIndices.length];
                System.arraycopy( oldIndices, 0, newPermutation, 0, oldIndices.length );

                for ( int i = 0; i < indices.size(); i++ ) {
                    newPermutation[indices.get( i )] = oldIndices[integers.get( i )];
                }
                result.add( new Permutation( newPermutation ) );
            }
        } );
        return result;
    }

    @Override public String toString() {
        return Arrays.toString( indices );
    }

    /**
     * Call our function with each permutation of the provided list, in lexicographic order
     *
     * @param list     List to generate permutations of
     * @param function Function to call
     * @param <T>      Type of the list
     */
    public static <T> void forEachPermutation( List<T> list, VoidFunction1<List<T>> function ) {
        forEachPermutation( list, new ArrayList<T>(), function );
    }

    /**
     * Call our function with each permutation of the provided list PREFIXED by prefix, in lexicographic order
     *
     * @param list     List to generate permutations of
     * @param prefix   Elements that should be inserted at the front of each list before each call
     * @param function Function to call
     * @param <T>      Type of the list
     */
    private static <T> void forEachPermutation( List<T> list, List<T> prefix, VoidFunction1<List<T>> function ) {
        if ( list.isEmpty() ) {
            function.apply( prefix );
        }
        else {
            for ( final T element : list ) {
                forEachPermutation(
                        new ArrayList<T>( list ) {{remove( element );}},
                        new ArrayList<T>( prefix ) {{add( element );}},
                        function
                );
            }
        }
    }

    public static void main( String[] args ) {
        Permutation a = new Permutation( new int[] { 1, 4, 3, 2, 0 } );
        System.out.println( a );

        Permutation b = a.inverted();
        System.out.println( b );

        System.out.println( b.withIndicesPermuted( Arrays.asList( 0, 3, 4 ) ) );

        System.out.println( permutations( 4 ) );
    }
}
