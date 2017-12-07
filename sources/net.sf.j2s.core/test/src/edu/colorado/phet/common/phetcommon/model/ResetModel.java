// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.model;

import edu.colorado.phet.common.phetcommon.util.function.VoidFunction0;

/**
 * The 'ResetModel' provides an instance that can be listened to for 'reset' messages.
 *
 * @author Sam Reid
 */
public interface ResetModel {
    void addResetListener( VoidFunction0 resetAction );
}
