// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.model.property;

import edu.colorado.phet.common.phetcommon.util.function.Function0;

/**
 * IfElse<T> is an ObservableProperty that uses a Property<Boolean> condition to simulation an if/else block.
 *
 * @author Sam Reid
 */
public class IfElse<T> extends CompositeProperty<T> {
    public IfElse( final Property<Boolean> condition, final T yes, final T no ) {
        super( new Function0<T>() {
            @Override
						public T apply() {
                return condition.get() ? yes : no;
            }
        }, condition );
    }
}
