// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.util.function;

/**
 * A 'function' with no arguments which returns void.
 * This cannot be a function in the mathematical sense, just in the programming sense
 * (since it returns nothing and only causes side effects).
 * <p/>
 * This class is provided as an alternative to Function0<Void>
 * since declaring Void as a return type in generics requires "return null" in
 * the implementor, implications discussed in #2776.
 *
 * @author Sam Reid
 */
public interface VoidFunction0 {
    void apply();

    /**
     * A VoidFunction which causes no side effects.
     */
    public static class Null implements VoidFunction0 {
        @Override
				public void apply() {
        }
    }
}