// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author:samreid $
 * Revision : $Revision:14674 $
 * Date modified : $Date:2007-04-17 02:37:37 -0500 (Tue, 17 Apr 2007) $
 */
package edu.colorado.phet.common.phetgraphics.view.phetgraphics;

import java.awt.Component;
import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.Shape;
import java.awt.image.BufferedImage;
import java.io.IOException;

import edu.colorado.phet.common.phetcommon.view.util.ImageLoader;

/**
 * PhetImageGraphic
 *
 * @author ?
 * @version $Revision:14674 $
 */
public class PhetImageGraphic extends PhetGraphic {
    protected BufferedImage image;
    private String imageResourceName;
    
    public PhetImageGraphic( Component component ) {
        this( component, null, 0, 0 );
    }

    /**
     * @param component
     * @param imageResourceName
     * @deprecated use one of the constructors that takes a BufferedImage, sims should load the image using PhetResourceLoader to keep the image pathname transparent
     */
    @Deprecated
		public PhetImageGraphic( Component component, String imageResourceName ) {
        this( component, (BufferedImage) null );
        this.imageResourceName = imageResourceName;

        BufferedImage bufferedImage;
        try {
            bufferedImage = ImageLoader.loadBufferedImage( imageResourceName );
        }
        catch ( IOException e ) {
            throw new RuntimeException( "Image resource not found: " + imageResourceName );
        }
        setImage( bufferedImage );
    }

    public PhetImageGraphic( Component component, BufferedImage image ) {
        this( component, image, 0, 0 );
    }

    public PhetImageGraphic( Component component, BufferedImage image, int x, int y ) {
        super( component );
        this.image = image;
        setLocation2( x, y );
    }

    @Override
		public boolean contains( int x, int y ) {
    	Shape rect;
        return isVisible() &&
        		((rect = getShapeRect()) != null && rect.contains( x, y )
        		 || isTranslationOnly && shapeRect.inside(x,y));
    }

    @Override
		protected Rectangle determineBounds() {
    	if (image == null)
    		return null;
    	localRect.x = 0;//location.x;
    	localRect.y = 0;//location.y;
      localRect.width = image.getRaster().getWidth();
      localRect.height = image.getRaster().getHeight();
    	return determineShapeBounds();
    }

    @Override
		public void paint( Graphics2D g2 ) {
        if ( isVisible() && image != null ) {
            saveGraphicsState( g2 );
            updateGraphicsState( g2 );
            try {
                g2.drawRenderedImage( image, getNetTransform() );
            }
            catch ( RuntimeException paintException ) {
                paintException.printStackTrace();
            }
            restoreGraphicsState();
        }
    }

    public void setImage( BufferedImage image ) {
        if ( this.image != image ) {
            this.image = image;
            setBoundsDirtyOpt();
            autorepaint();
        }
    }

    public BufferedImage getImage() {
        return image;
    }

    ///////////////////////////////////////////////////
    // Persistence support
    //

    public PhetImageGraphic() {
        // noop
    }

    public String getImageResourceName() {
        return imageResourceName;
    }

    public void setImageResourceName( String imageResourceName ) {
        this.imageResourceName = imageResourceName;
        BufferedImage bufferedImage;
        try {
            bufferedImage = ImageLoader.loadBufferedImage( imageResourceName );
        }
        catch ( IOException e ) {
            throw new RuntimeException( "Image resource not found: " + imageResourceName );
        }
        setImage( bufferedImage );
    }
}
