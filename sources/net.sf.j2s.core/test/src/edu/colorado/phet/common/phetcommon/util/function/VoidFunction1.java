// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.util.function;

/**
 * A 'function' with 1 parameter which returns void.
 * This cannot be a function in the mathematical sense, just in the programming sense
 * (since it returns nothing and only causes side effects).
 * <p/>
 * This class is provided as an alternative to Function1<Void>
 * since declaring Void as a return type in generics requires "return null" in
 * the implementor, implications discussed in #2776.
 *
 * @author Sam Reid
 */
public interface VoidFunction1<T> {
    void apply( T t );

    /**
     * A VoidFunction1 which causes no side effects.
     *
     * @param <T>
     */
    public static class Null<T> implements VoidFunction1<T> {
        @Override
				public void apply( T o ) {
        }
    }
}
