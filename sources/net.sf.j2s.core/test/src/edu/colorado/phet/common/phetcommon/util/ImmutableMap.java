// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.util;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * Immutable map.
 *
 * @author Sam Reid
 */
public class ImmutableMap<T, U> {
    private final Map<T, U> map;

    public ImmutableMap() {
        this.map = new HashMap<T, U>();
    }

    public ImmutableMap( Map<T, U> m ) {
        this.map = Collections.unmodifiableMap( m );
    }

    public Set<T> keySet() {
        return map.keySet();
    }

    public U get( T key ) {
        return map.get( key );
    }
}