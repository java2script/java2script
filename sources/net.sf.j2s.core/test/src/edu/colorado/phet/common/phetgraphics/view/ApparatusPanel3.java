// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetgraphics.view;

import edu.colorado.phet.common.phetcommon.model.clock.IClock;

import static edu.colorado.phet.common.phetcommon.application.PhetApplicationConfig.DEFAULT_FRAME_SETUP;

/**
 * This class is a workaround for sims that have a problem resizing, see #2860.
 * The strategy is to sample the canvas size to ApparatusPanel2 and print out the reference size set by the TransformManager.
 * Then that reference size is provided as width x height for this constructor, and that value is used for the reference size.
 *
 * @author Sam Reid
 */
public class ApparatusPanel3 extends ApparatusPanel2 {

    private final int referenceWidth;
    private final int referenceHeight;

    //Construct an ApparatusPanel3 with the specified reference size
    public ApparatusPanel3( IClock clock, int referenceWidth, int referenceHeight ) {
        super( clock );
        this.referenceWidth = referenceWidth;
        this.referenceHeight = referenceHeight;
    }

    @Override public void setReferenceSize() {
        //Note: the next line is assuming the sim uses the DEFAULT_FRAME_SETUP.  If it is an ApparatusPanel3 application using a different frame size, this mismatch could cause problems
        if ( DEFAULT_FRAME_SETUP.isShrunken() ) {
            //Use the reference sizes set in the constructor instead of trying to automatically determine them, since that causes problems on low-res screens, see #2860
            setReferenceSize( referenceWidth, referenceHeight );
        }
        else {
            //If the resolution was high enough, allow the application to choose the optimal rendering size to reduce artifacts
            super.setReferenceSize();
        }
    }
}