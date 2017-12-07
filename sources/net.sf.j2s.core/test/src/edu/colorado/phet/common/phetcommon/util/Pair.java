// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.util;

import java.io.Serializable;

/**
 * A data structure for 2 related objects.
 *
 * @author Sam Reid
 */
public class Pair<T, U> implements Serializable {
    public final T _1;
    public final U _2;

    public Pair( T _1, U _2 ) {
        this._1 = _1;
        this._2 = _2;
    }

    @Override public String toString() {
        return "Pair(" + _1 + "," + _2 + ")";
    }

    @SuppressWarnings("rawtypes")
		@Override
    public boolean equals( Object o ) {
        if ( this == o ) { return true; }
        if ( o == null || getClass() != o.getClass() ) { return false; }

        Pair pair = (Pair) o;

        if ( _1 != null ? !_1.equals( pair._1 ) : pair._1 != null ) { return false; }
        if ( _2 != null ? !_2.equals( pair._2 ) : pair._2 != null ) { return false; }

        return true;
    }

    @Override
    public int hashCode() {
        int result = _1 != null ? _1.hashCode() : 0;
        result = 31 * result + ( _2 != null ? _2.hashCode() : 0 );
        return result;
    }

    //Convenience method so pairs can be constructed with "pair(a,b)" instead of "new Pair<MyLongTypeNameForTypeA,MyLongTypeNameForTypeB>(a,b)"
    public static <T, U> Pair<T, U> pair( T t, U u ) {
        return new Pair<T, U>( t, u );
    }
}