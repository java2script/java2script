// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.view.util;

import java.awt.Color;

public interface ColorFilter {
    public static final ColorFilter NULL = new ColorFilter() {
        @Override
				public Color filter( Color in ) {
            return in;
        }
    };

    Color filter( Color in );
}
