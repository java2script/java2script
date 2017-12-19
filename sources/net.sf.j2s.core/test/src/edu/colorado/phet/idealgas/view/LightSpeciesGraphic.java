// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 47772 $
 * Date modified : $Date: 2011-01-07 13:53:07 -0600 (Fri, 07 Jan 2011) $
 */
package edu.colorado.phet.idealgas.view;

import edu.colorado.phet.common.phetcommon.view.util.MakeDuotoneImageOp;
import edu.colorado.phet.common.phetgraphics.view.ApparatusPanel;
import edu.colorado.phet.idealgas.IdealGasConfig;
import edu.colorado.phet.idealgas.IdealGasResources;
import edu.colorado.phet.idealgas.model.GasMolecule;

import java.awt.*;
import java.awt.geom.AffineTransform;
import java.awt.image.AffineTransformOp;
import java.awt.image.BufferedImage;
import java.awt.image.BufferedImageOp;

import javax.swing.SwingUtilities;

/**
 *
 */
public class LightSpeciesGraphic extends GasMoleculeGraphic {

    static String s_imageName = IdealGasConfig.RED_PARTICLE_IMAGE_FILE;
    static BufferedImage s_particleImage;
    static BufferedImage myImage;
    
// BH JavaScript fix: moved to constructor - this is fine, except when we have
// BH full compression with assets. In that case, the image is not fully loaded
// BH prior to the affine transform operation. The dataBuffer is empty.
//    static {
//      s_particleImage = IdealGasResources.getImage( s_imageName );
//      AffineTransform atx = AffineTransform.getScaleInstance( 0.7, 0.7 );
//      BufferedImageOp op = new AffineTransformOp( atx, AffineTransformOp.TYPE_BILINEAR );
//      myImage = op.filter( s_particleImage, null );
//    }
    static final Color COLOR_B = new Color( 252, 65, 40 );

    

    static {
    	
    	// BH  In JavaScript we cannot wait for an image, so we need to do this later. 
    	// BH  No problem here, because we do not need this for a while.
    	
    	SwingUtilities.invokeLater(new Runnable() {

				@Override
				public void run() {
				}
    		
    	});
    }

    /**
     * Sets the color of the graphic to a duotone based on a specified color. Scale is 1
     *
     * @param color
     */
    public static void setColor( Color color ) {
        GasMoleculeGraphic.setColor( color );
        s_particleImage = IdealGasResources.getImage( IdealGasConfig.BLUE_PARTICLE_IMAGE_FILE );
        MakeDuotoneImageOp op = new MakeDuotoneImageOp( new Color( color.getRed(), color.getGreen(), color.getBlue() ) );
        op.filter( s_particleImage, s_particleImage );
        myImage = s_particleImage;
    }


    public LightSpeciesGraphic( ApparatusPanel apparatusPanel, GasMolecule molecule ) {
        super( apparatusPanel, myImage, molecule );
        if (myImage == null) {
            s_particleImage = IdealGasResources.getImage( s_imageName );
            AffineTransform atx = AffineTransform.getScaleInstance( 0.7, 0.7 );
            BufferedImageOp op = new AffineTransformOp( atx, AffineTransformOp.TYPE_BILINEAR );
            image = myImage = op.filter( s_particleImage, null );
        }
    }
}
