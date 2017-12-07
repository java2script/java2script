// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.application;

/**
 * We need one of these to start the simulation.
 */
public interface ApplicationConstructor {
    PhetApplication getApplication( PhetApplicationConfig config );
}
