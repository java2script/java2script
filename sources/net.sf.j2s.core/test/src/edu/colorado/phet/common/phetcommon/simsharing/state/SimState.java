// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.simsharing.state;

import java.io.Serializable;

import edu.colorado.phet.common.phetcommon.util.IProguardKeepClass;

/**
 * @author Sam Reid
 */
public interface SimState extends Serializable, IProguardKeepClass {
    long getTime();

    SerializableBufferedImage getImage();

    //Zero-based index that indicates the frame number for this state
    int getIndex();
}