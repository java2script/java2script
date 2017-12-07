// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.util.function;

/**
 * A one-parameter function that takes an argument of type U and returns a value of type T.
 *
 * @author Sam Reid
 */
public interface Function1<U, T> {
    T apply( U u );

    public static class Constant<U, T> implements Function1<U, T> {
        private final T value;

        public Constant( T value ) {
            this.value = value;
        }

        @Override
				public T apply( U u ) {
            return value;
        }
    }

    /**
     * Identity function that returns its input.
     *
     * @param <T>
     */
    public static class Identity<T> implements Function1<T, T> {
        @Override
				public T apply( T t ) {
            return t;
        }
    }
}
