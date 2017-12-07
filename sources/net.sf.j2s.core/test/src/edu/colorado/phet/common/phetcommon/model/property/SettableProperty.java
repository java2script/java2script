// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.model.property;

/**
 * In addition to being Observable, this SettableProperty<T> is also settable, that is, it adds the method setValue().
 * It does not declare the data storage type, and is thus compatible with combined properties such as And and Or.
 *
 * @author Sam Reid
 */
public abstract class SettableProperty<T> extends ObservableProperty<T> {

    public SettableProperty( T oldValue ) {
        super( oldValue );
    }

    public abstract void set( T value );
}