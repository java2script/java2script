// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.util.function;

/**
 * A two-parameter function that takes argument of types V and U, and returns a value of type T.
 *
 * @author Sam Reid
 */
public interface Function2<V, U, T> {
    T apply( V v, U u );
}