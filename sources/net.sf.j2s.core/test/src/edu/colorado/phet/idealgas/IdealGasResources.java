// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.idealgas;

import edu.colorado.phet.common.phetcommon.resources.PhetResources;

import java.awt.image.BufferedImage;

/**
 * Author: Sam Reid
 * May 18, 2007, 12:58:55 PM
 */
public class IdealGasResources {
    private static PhetResources INSTANCE = new PhetResources( "ideal-gas" ); // changed by Bob Hanson

	public static String toAsset(String filePath) {
		return getRootDirectoryName() + "/" + filePath;
	}

    public static String getLocalizedString( String key ) {
        return INSTANCE.getLocalizedString( key );
    }

    public static BufferedImage getImage( String name ) {
        return INSTANCE.getImage( name );
    }

    public static String getString( String s ) {
        return getLocalizedString( s );
    }
    
    public static String getRootDirectoryName() {
        return INSTANCE.getRootDirectoryName();
    }


}
