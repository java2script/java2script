// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.util.function;

/**
 * A three-parameter function that takes argument of types W, V and U, and returns a value of type T.
 *
 * @author Sam Reid
 */
public interface Function3<W, V, U, T> {
    T apply( W w, V v, U u );

    public static class Constant<W, V, U, T> implements Function3<W, V, U, T> {

        private T value;

        public Constant( T value ) {
            this.value = value;
        }

        @Override
				public T apply( W w, V v, U u ) {
            return value;
        }
    }
}