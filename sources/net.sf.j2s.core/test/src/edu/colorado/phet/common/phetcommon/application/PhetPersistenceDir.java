// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.application;

import java.io.File;
import java.security.AccessControlException;

public class PhetPersistenceDir extends File {

    /**
     * @throws AccessControlException if called without permissions to access the user.home system property
     */
    public PhetPersistenceDir() throws AccessControlException {
        super( System.getProperty( "user.home" ) + System.getProperty( "file.separator" ) + ".phet" );
    }
}
