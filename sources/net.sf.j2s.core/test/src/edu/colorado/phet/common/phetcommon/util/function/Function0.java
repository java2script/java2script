// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.util.function;

/**
 * A zero-parameter function that returns a value of type T.
 *
 * @author Sam Reid
 */
public interface Function0<T> {
    T apply();

    public static class Constant<T> implements Function0<T> {
        T value;

        public Constant( T value ) {
            this.value = value;
        }

        @Override
				public T apply() {
            return value;
        }
    }
}
