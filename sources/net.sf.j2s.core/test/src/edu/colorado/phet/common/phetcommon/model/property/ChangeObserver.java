// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.model.property;

/**
 * Observer that is notified about both the old and new values.
 *
 * @author Sam Reid
 */
public interface ChangeObserver<T> {
    void update( T newValue, T oldValue );
}
