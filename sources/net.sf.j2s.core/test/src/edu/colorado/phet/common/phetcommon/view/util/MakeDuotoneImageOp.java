// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: cmalley $
 * Revision : $Revision: 63084 $
 * Date modified : $Date: 2012-04-04 20:44:25 -0500 (Wed, 04 Apr 2012) $
 */
package edu.colorado.phet.common.phetcommon.view.util;

import java.awt.Color;
import java.awt.RenderingHints;
import java.awt.geom.AffineTransform;
import java.awt.geom.Point2D;
import java.awt.geom.Rectangle2D;
import java.awt.image.AffineTransformOp;
import java.awt.image.BufferedImage;
import java.awt.image.BufferedImageOp;
import java.awt.image.ColorModel;

/**
 * This is a BufferedImageOp that creates a duotone image of an input BufferedImage.
 * @author Another Guy
 */
public class MakeDuotoneImageOp implements BufferedImageOp, ColorFilter {
    private Color baseColor;

    public MakeDuotoneImageOp( Color baseColor ) {
        assert baseColor != null;

        this.baseColor = baseColor;
    }

    @Override
		public RenderingHints getRenderingHints() {
        return null;
    }

    @Override
		public Rectangle2D getBounds2D( BufferedImage src ) {
        return new Rectangle2D.Double( 0, 0, src.getRaster().getWidth(), src.getRaster().getHeight() );
    }

    @Override
		public Point2D getPoint2D( Point2D srcPt, Point2D dstPt ) {
        if ( dstPt == null ) {
            dstPt = new Point2D.Double();
        }
        dstPt.setLocation( srcPt.getX(), srcPt.getY() );
        return dstPt;
    }

    @Override
		public Color filter( Color rgb ) {
        double grayRefLevel = getGrayLevel( baseColor );

        return getDuoToneRGB( rgb, grayRefLevel, baseColor );
    }

	@Override
	public BufferedImage filter(BufferedImage src, BufferedImage dest) {
		if (dest == null) {
			dest = createCompatibleDestImage(src, src.getColorModel());
		}
		// BH efficiencies here -- get the whole array, mess with it, and deliver it
		double grayRefLevel = getGrayLevel(baseColor);
		int w = src.getRaster().getWidth();
		int h = src.getRaster().getHeight();
		int[] rgbArray = new int[w * h];
		src.getRGB(0, 0, w, h, rgbArray, 0, w);
		int baseRed = baseColor.getRed();
		int baseGreen = baseColor.getGreen();
		int baseBlue = baseColor.getBlue();
		for (int i = rgbArray.length; --i >= 0;) {
			int rgb = rgbArray[i];
			int red = (rgb >> 16) & 0xFF;
			int green = (rgb >> 8) & 0xFF;
			int blue = rgb & 0xFF;
			double gray = (red + green + blue) / 3;
			red = getComponent(gray, baseRed, grayRefLevel);
			green = getComponent(gray, baseGreen, grayRefLevel);
			blue = getComponent(gray, baseBlue, grayRefLevel);
			rgbArray[i] = (rgb & 0xFF000000) 
					| ((red << 16) & 0xFF0000)
					| ((green << 8) & 0xFF00) 
					| (blue & 0xFF); // BH
		}
		dest.setRGB(0, 0, w, h, rgbArray, 0, w);
		// ColorModel cm = src.getColorModel();
		// for ( int x = 0; x < src.getWidth(); x++ ) {
		// for ( int y = 0; y < src.getHeight(); y++ ) {
		// int rgb = src.getRGB( x, y );
		// int alpha = cm.getAlpha( rgb );
		// int red = cm.getRed( rgb );
		// int green = cm.getGreen( rgb );
		// int blue = cm.getBlue( rgb );
		// int newRGB = getDuoToneRGB( red, green, blue, alpha, grayRefLevel,
		// baseColor );
		// dest.setRGB( x, y, newRGB );
		// }
		// }
		return dest;
	}

    /**
     * Returns an Color value that is a duotone
     */
    public static Color getDuoToneRGB( Color input, double grayRefLevel, Color baseColor ) {
        double gray = ( input.getRed() + input.getGreen() + input.getBlue() ) / 3;

        int newRed = getComponent( gray, baseColor.getRed(), grayRefLevel );
        int newGreen = getComponent( gray, baseColor.getGreen(), grayRefLevel );
        int newBlue = getComponent( gray, baseColor.getBlue(), grayRefLevel );

        return new Color( newRed, newGreen, newBlue, input.getAlpha() );
    }

    /**
     * Returns an RGB value that is a duotone
     *
     * @param grayRefLevel
     * @return the rgb value
     */
    public static int getDuoToneRGB( int red, int green, int blue, int alpha, double grayRefLevel, Color baseColor ) {
        double gray = ( red + green + blue ) / ( 3 );
        int newRed = getComponent( gray, baseColor.getRed(), grayRefLevel );
        int newGreen = getComponent( gray, baseColor.getGreen(), grayRefLevel );
        int newBlue = getComponent( gray, baseColor.getBlue(), grayRefLevel );
        int newRGB = ((alpha << 24) & 0xFF000000)  
        		| ((newRed << 16)  & 0xFF0000) 
        		| ((newGreen  << 8)  & 0xFF00) 
        		| (newBlue & 0xFF); // BH
        return newRGB;
    }

    /**
     * Returns the relative "gray" level of an RGB value
     *
     * @param color
     * @return the gray value
     */
    public static double getGrayLevel( Color color ) {
        double grayRefLevel = ( color.getRed() + color.getGreen() + color.getBlue() ) / ( 255 * 3 );
        return grayRefLevel;
    }

    /**
     * Creates a new duotone image.
     *
     * @param src
     * @param destCM
     * @return the new image.
     */
    @Override
		public BufferedImage createCompatibleDestImage( BufferedImage src, ColorModel destCM ) {
        return new AffineTransformOp( new AffineTransform(), AffineTransformOp.TYPE_NEAREST_NEIGHBOR ).createCompatibleDestImage( src, destCM );
    }

    /**
     * Does a piecewise linear interpolation to compute the component value
     *
     * @param grayLevel
     * @param componentRefLevel
     * @param grayRefLevel
     * @return
     */
    private static int getComponent( double grayLevel, double componentRefLevel, double grayRefLevel ) {
        int result = 0;

        // if the grayLevel is 255, we simply return 255
        if ( grayLevel == 255 ) {
            result = 255;
        }

        // if grayLevel is greater than grayRefLevel, do linear interpolation between (grayRefLevel,colorRefLevel)
        // and (255, 255 )
        if ( grayLevel >= grayRefLevel && grayLevel < 255 ) {
            double m = ( 255 - componentRefLevel ) / ( 255 - grayRefLevel );
            double c = componentRefLevel + ( grayLevel - grayRefLevel ) * m;
            result = (int) c;
        }

        // if grayLevel is less than grayRefLevel, do linear interpolation between (grayRefLevel,colorRefLevel)
        // and (0, 0 )
        if ( grayLevel <= grayRefLevel && grayLevel < 255 ) {
            double m = ( componentRefLevel ) / ( grayRefLevel );
            double c = ( grayLevel - grayRefLevel ) * m;
            result = (int) c;
            result = (int) ( ( grayLevel / grayRefLevel ) * componentRefLevel );
        }

        return result;
    }
}

