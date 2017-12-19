// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.model.event;

/**
 * Notifier where no data needs to be passed to listeners
 *
 * @author Jonathan Olson
 */
public class VoidNotifier extends ValueNotifier<Void> {
    public VoidNotifier() {
        super( null );
    }
}
