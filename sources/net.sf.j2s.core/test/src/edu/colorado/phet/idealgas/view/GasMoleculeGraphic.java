// Copyright 2002-2011, University of Colorado

/*
 * Class: GasMoleculeGraphic
 * Package: edu.colorado.phet.graphics.idealgas
 *
 * Created by: Ron LeMaster
 * Date: Nov 4, 2002
 */
package edu.colorado.phet.idealgas.view;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics2D;
import java.awt.geom.AffineTransform;
import java.awt.geom.Point2D;
import java.awt.image.BufferedImage;

import edu.colorado.phet.common.phetgraphics.view.ApparatusPanel;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetImageGraphic;
import edu.colorado.phet.idealgas.model.GasMolecule;

/**
 *
 */
public abstract class GasMoleculeGraphic extends PhetImageGraphic implements GasMolecule.Observer {
    private GasMolecule molecule;
    private ApparatusPanel apparatusPanel;
    private static Color s_color;
    // BH not used private AffineTransform scaleAtx = new AffineTransform();
 // BH not used private BufferedImage baseImage;
    private static Dimension dim = null;

    public GasMoleculeGraphic( final ApparatusPanel apparatusPanel, BufferedImage image, GasMolecule molecule ) {
        super( apparatusPanel, image );
        this.apparatusPanel = apparatusPanel;
        this.molecule = molecule;
        //this.baseImage = image;
        molecule.addObserverGM ( this );  // BH
        setIgnoreMouse( true );
        update();

//        final Dimension startingSize = apparatusPanel.getSize( );
        if( dim == null ) {
            dim = apparatusPanel.getSize();
        }
    }

    @Override
		public void paint( Graphics2D g2 ) {
        AffineTransform orgTx = getNetTransform();
//        System.out.println( "orgTx = " + orgTx );
//        g2.setTransform( new AffineTransform( ) );
//        super.paint( g2 );
//        g2.setRenderingHint( RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BICUBIC );
        
        
        BufferedImage img = getImage();
        int x = (int)orgTx.getTranslateX();
        int y = (int)orgTx.getTranslateY();
//        
//      	/**
//      	 * @j2sNative
//      	 * 
//      	 * g2.drawImagePriv (img, x, y, null);
//      	 * 
//      	 */
//      	{
      		g2.drawImage(img, x, y, null);
//      	}
        
        
//        g2.setTransform( orgTx );
    }

	@Override
	public void update() {
		Point2D.Double xy = (Point2D.Double) molecule.getCM();
		double r = molecule.getRadius();
		// BH Java fix #7 some sort of pixel rounding here -- adding the "- 1"
		setLocation2((int) (xy.x - r / 2 - 1), (int) (xy.y - r / 2 - 1));
	}

    @Override
		public void removedFromSystem() {
        apparatusPanel.removeGraphic( this );
        update();
    }

    public static Color getColor() {
        return s_color;
    }

    public static void setColor( Color color ) {
        s_color = color;
    }
}
