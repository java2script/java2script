// Copyright 2002-2013, University of Colorado
package edu.colorado.phet.common.phetcommon.util.function;

/**
 * A 'function' with 2 parameters which returns void.
 * This cannot be a function in the mathematical sense, just in the programming sense
 * (since it returns nothing and only causes side effects).
 * <p/>
 * This class is provided as an alternative to Function2<Void>, etc
 * since declaring Void as a return type in generics requires "return null" in
 * the implementor, implications discussed in #2776.
 *
 * @author Sam Reid
 */
public interface VoidFunction3<V, U, T> {
    void apply( V v, U u, T t );
}