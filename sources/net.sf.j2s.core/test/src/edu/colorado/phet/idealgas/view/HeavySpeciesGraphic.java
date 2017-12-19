// Copyright 2002-2011, University of Colorado

/*
 * Class: HeavySpeciesGraphic
 * Package: edu.colorado.phet.graphics.idealgas
 *
 * Created by: Ron LeMaster
 * Date: Nov 4, 2002
 */
package edu.colorado.phet.idealgas.view;

import java.awt.Color;
import java.awt.image.BufferedImage;

import edu.colorado.phet.common.phetcommon.view.util.MakeDuotoneImageOp;
import edu.colorado.phet.common.phetgraphics.view.ApparatusPanel;
import edu.colorado.phet.idealgas.IdealGasConfig;
import edu.colorado.phet.idealgas.IdealGasResources;
import edu.colorado.phet.idealgas.model.GasMolecule;

/**
 *
 */
public class HeavySpeciesGraphic extends GasMoleculeGraphic {

    static String s_imageName = IdealGasConfig.BLUE_PARTICLE_IMAGE_FILE;
    static String s_imageName2 = IdealGasConfig.GREEN_PARTICLE_IMAGE_FILE;
    static BufferedImage s_particleImage = IdealGasResources.getImage( s_imageName );
    static BufferedImage s_particleImage2 = IdealGasResources.getImage( s_imageName2 );
    static BufferedImage s_myImage = s_particleImage;
    static boolean needImage = false;
		private static Color s_color2;

    /**
     * Sets the color of the graphic to a duotone based on a specified color
     *
     * @param color
     */
    public static void setColor( Color color ) {
    		if (color == null)
    			color = s_color2;
        setColor2(color, color, s_particleImage2);
        s_myImage = s_particleImage2;
    }

    /**
     * Allow for two different colors for this species using args --showOne true 
     * @param color1
     * @param color2
     * @param bi
     * @author Bob Hanson
     */
  	public static void setColor2(Color color1, Color color2, BufferedImage bi) {
  		s_color2 = color2;
  		// BH we allow a switch to a second color after just one of this color
  		// BH It is important to use a different image here.
  		if (bi == null)
  			bi = s_particleImage;
      GasMoleculeGraphic.setColor( color1 );
      MakeDuotoneImageOp op = new MakeDuotoneImageOp( new Color( color1.getRed(), color1.getGreen(), color1.getBlue() ) );
      op.filter( bi, bi);
      needImage = !color1.equals(color2);
  	}

	/**
	 * Constructor
	 * 
	 * @param apparatusPanel
	 * @param molecule
	 */
	public HeavySpeciesGraphic(ApparatusPanel apparatusPanel, GasMolecule molecule) {
		super(apparatusPanel, s_myImage == null ? s_particleImage : s_myImage, molecule);
		if (needImage)
			setColor(null);
	}

}
