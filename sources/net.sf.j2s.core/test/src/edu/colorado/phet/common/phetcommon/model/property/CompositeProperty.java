// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.model.property;

import edu.colorado.phet.common.phetcommon.util.SimpleObserver;
import edu.colorado.phet.common.phetcommon.util.function.Function0;

/**
 * The CompositeProperty should be used for ObservableProperties that are combined, such as And, Or, ValueEquals, etc.
 * It makes sure the dependencies are observed for changes and only sends out notifications when the composite value has changed.
 *
 * @param <T>
 */
public class CompositeProperty<T> extends ObservableProperty<T> {
    //Function for computing the new value, usually provided as a closure in the implementing class
    private Function0<T> function;
    private SimpleObserver observer;
    private final ObservableProperty<?>[] properties;

    public CompositeProperty( Function0<T> function, ObservableProperty<?>... properties ) {
        super( function.apply() );//sets the oldValue to be the current value
        this.function = function;
        this.properties = properties;

        //Observe all dependencies for changes, and if one of their changes causes this value to change, send out a notification
        observer = new SimpleObserver() {
            @Override
						public void update() {
                notifyIfChanged();
            }
        };
        for ( ObservableProperty<?> property : properties ) {
            property.addObserver( observer );
        }
    }

    //Remove listeners that were attached to the dependencies to prevent potential memory leaks
    public void cleanup() {
        for ( ObservableProperty<?> property : properties ) {
            property.removeObserver( observer );
        }
    }

    //Get the composite value which is a function of the dependencies
    @Override public T get() {
        return function.apply();
    }
}
