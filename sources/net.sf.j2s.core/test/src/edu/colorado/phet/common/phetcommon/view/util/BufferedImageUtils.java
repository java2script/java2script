// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: cmalley $
 * Revision : $Revision: 65913 $
 * Date modified : $Date: 2012-07-17 12:01:45 -0500 (Tue, 17 Jul 2012) $
 */
package edu.colorado.phet.common.phetcommon.view.util;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.GraphicsConfiguration;
import java.awt.GraphicsDevice;
import java.awt.GraphicsEnvironment;
import java.awt.HeadlessException;
import java.awt.Image;
import java.awt.RenderingHints;
import java.awt.Transparency;
import java.awt.geom.AffineTransform;
import java.awt.image.AffineTransformOp;
import java.awt.image.BufferedImage;
import java.awt.image.BufferedImageOp;
import java.awt.image.ColorModel;
import java.awt.image.PixelGrabber;

import javax.swing.Icon;
import javax.swing.ImageIcon;

/**
 * BufferedImageUtils
 *
 * @author ?
 * @version $Revision: 65913 $
 */
public class BufferedImageUtils {

    /**
     * @param im
     * @param height
     * @return the resized image
     */
    public static BufferedImage rescaleYMaintainAspectRatio( BufferedImage im, int height ) {
      double iny = im.getRaster().getHeight();
        if ( iny == height ) {
            return im;
        }
        double dy = height / iny;
        return rescaleFractional( im, dy, dy );
    }

    /**
     * @param im
     * @param width
     * @return the resized image
     */
    public static BufferedImage rescaleXMaintainAspectRatio( BufferedImage im, int width ) {
      double inx = im.getRaster().getWidth();
        if ( inx == width ) {
            return im;
        }
        double dx = width / inx;
        return rescaleFractional( im, dx, dx );
    }

    /**
     * Rescale an image based on scale factors for width and height.
     *
     * @param in - original buffered image.
     * @param dx - multiplier for the width (x direction)
     * @param dy - multiplier for the height (y direction)
     * @return - scaled buffered image
     */
    public static BufferedImage rescaleFractional( BufferedImage in, double dx, double dy ) {
        int width = (int) ( in.getRaster().getWidth() * dx );
        int height = (int) ( in.getRaster().getHeight() * dy );
        BufferedImage newImage = new BufferedImage( width, height, BufferedImage.TYPE_INT_ARGB );

        Graphics2D g2 = newImage.createGraphics();
        AffineTransform at = AffineTransform.getScaleInstance( dx, dy );
        g2.setRenderingHint( RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BICUBIC );
        g2.setRenderingHint( RenderingHints.KEY_ALPHA_INTERPOLATION, RenderingHints.VALUE_ALPHA_INTERPOLATION_QUALITY );
        g2.setRenderingHint( RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY );
        g2.drawRenderedImage( in, at );
        return newImage;
    }

    public static BufferedImage flipY( BufferedImage source ) {
        BufferedImage output = new BufferedImage( source.getRaster().getWidth(), source.getRaster().getHeight(), BufferedImage.TYPE_INT_ARGB );
        Graphics2D g2 = output.createGraphics();
        AffineTransform tx = createTransformFlipY( source );
        g2.drawRenderedImage( source, tx );
        return output;
    }

    public static BufferedImage flipX( BufferedImage source ) {
        int type = source.getType();
        if ( source.getType() == 0 ) {
            type = BufferedImage.TYPE_INT_ARGB;  //This is a hack that works.
        }
        BufferedImage output = new BufferedImage( source.getRaster().getWidth(), source.getRaster().getHeight(), type );
        Graphics2D g2 = output.createGraphics();
        AffineTransform tx = createTransformFlipX( source );
        g2.drawRenderedImage( source, tx );
        return output;
    }

    private static AffineTransform createTransformFlipY( BufferedImage source ) {
        AffineTransform tx = AffineTransform.getScaleInstance( 1, -1 );
        tx.translate( 0, -source.getRaster().getHeight() );
        return tx;
    }

    private static AffineTransform createTransformFlipX( BufferedImage source ) {
        AffineTransform tx = AffineTransform.getScaleInstance( -1, 1 );
        tx.translate( -source.getRaster().getWidth(), 0 );
        return tx;
    }

    /**
     * Creates and returns a buffered image that is a rotated version of a specified
     * buffered image. The transform is done so that the image is not truncated, and
     * occupies the minimum bounding box
     *
     * @param bImage
     * @param theta  Angle the image is to be rotated, in radians.
     * @return the rotated image.
     */
    public static BufferedImage getRotatedImage( BufferedImage bImage, double theta ) {
        // Normalize theta to be between 0 and PI*2
        theta = ( ( theta % ( Math.PI * 2 ) ) + Math.PI * 2 ) % ( Math.PI * 2 );
        double x = 0;
        double y = 0;
        double alpha = 0;
        double w = bImage.getRaster().getWidth();
        double h = bImage.getRaster().getHeight();
        if ( theta >= 0 && theta <= Math.PI / 2 ) {
            x = h * Math.sin( theta );
            y = 0;
        }
        if ( theta > Math.PI / 2 && theta <= Math.PI ) {
            alpha = theta - Math.PI / 2;
            x = w * Math.sin( alpha ) + h * Math.cos( alpha );
            y = h * Math.sin( alpha );
        }
        if ( theta > Math.PI && theta <= Math.PI * 3 / 2 ) {
            alpha = theta - Math.PI;
            x = w * Math.cos( alpha );
            y = w * Math.sin( alpha ) + h * Math.cos( alpha );
        }
        // Works
        if ( theta > Math.PI * 3 / 2 && theta <= Math.PI * 2 ) {
            alpha = Math.PI * 2 - theta;
            x = 0;
            y = w * Math.sin( alpha );
        }
        AffineTransform atx = AffineTransform.getTranslateInstance( x, y );
        atx.rotate( theta );
        BufferedImageOp op = new AffineTransformOp( atx, AffineTransformOp.TYPE_BILINEAR );
        BufferedImage result = op.filter( bImage, null );
        return result;
    }

    // This method returns true if the specified image has transparent pixels
    // Taken from The Java Developer's Almanac, 1.4
    public static boolean hasAlpha( Image image ) {
        // If buffered image, the color model is readily available
        if ( image instanceof BufferedImage ) {
            BufferedImage bimage = (BufferedImage) image;
            return bimage.getColorModel().hasAlpha();
        }

        // Use a pixel grabber to retrieve the image's color model;
        // grabbing a single pixel is usually sufficient
        PixelGrabber pg = new PixelGrabber( image, 0, 0, 1, 1, false );
        try {
            pg.grabPixels();
        }
        catch ( InterruptedException e ) {
        }

        // Get the image's color model
        ColorModel cm = pg.getColorModel();
        return cm.hasAlpha();
    }

    /**
     * Gets the transparency of an image.
     *
     * @param image the image
     * @return OPAQUE, BITMASK or TRANSLUCENT (see java.awt.Transparency)
     */
    public static int getTransparency( Image image ) {
        // If buffered image, the color model is readily available
        if ( image instanceof BufferedImage ) {
            BufferedImage bimage = (BufferedImage) image;
            return bimage.getColorModel().getTransparency();
        }
        // Use a pixel grabber to retrieve the image's color model;
        // grabbing a single pixel is usually sufficient
        PixelGrabber pg = new PixelGrabber( image, 0, 0, 1, 1, false );
        try {
            pg.grabPixels();
        }
        catch ( InterruptedException e ) {
        }

        // Get the image's color model
        ColorModel cm = pg.getColorModel();

        int transparency = Transparency.OPAQUE;
        if ( cm != null ) {
            transparency = cm.getTransparency();
        }
        return transparency;
    }

    // This method returns a buffered image with the contents of an image
    // Taken from The Java Developer's Almanac, 1.4
    public static BufferedImage copyImage( BufferedImage image ) {
        return copyImage( image, image.getType() );
    }

    public static BufferedImage copyImage( BufferedImage image, int type ) {
        BufferedImage copy = new BufferedImage( image.getRaster().getWidth(), image.getRaster().getHeight(), type );
        Graphics2D graphics2D = copy.createGraphics();
        graphics2D.drawImage( image, 0, 0, null );
        graphics2D.dispose();
        return copy;
    }

    // This method returns a buffered image with the contents of an image
    // Taken from The Java Developer's Almanac, 1.4
    public static BufferedImage toBufferedImage( Image image ) {
        if ( image instanceof BufferedImage ) {
            return (BufferedImage) image;
        }

        // This code ensures that all the pixels in the image are loaded
        image = new ImageIcon( image ).getImage();

        // Create a buffered image with a format that's compatible with the screen
        BufferedImage bimage = null;
        GraphicsEnvironment ge = GraphicsEnvironment.getLocalGraphicsEnvironment();
        try {
            // Create the buffered image
            int transparency = getTransparency( image );
            GraphicsDevice gs = ge.getDefaultScreenDevice();
            GraphicsConfiguration gc = gs.getDefaultConfiguration();
            bimage = gc.createCompatibleImage( image.getWidth( null ), image.getHeight( null ), transparency );
        }
        catch ( HeadlessException e ) {
            // The system does not have a screen
        }

        if ( bimage == null ) {
            // Create a buffered image using the default color model
            boolean hasAlpha = hasAlpha( image );
            int type = BufferedImage.TYPE_INT_RGB;
            if ( hasAlpha ) {
                type = BufferedImage.TYPE_INT_ARGB;
            }
            bimage = new BufferedImage( image.getWidth( null ), image.getHeight( null ), type );
        }

        // Copy image to buffered image
        Graphics g = bimage.createGraphics();

        // Paint the image onto the buffered image
        g.drawImage( image, 0, 0, null );
        g.dispose();

        return bimage;
    }

    /**
     * Convenience method for getScaledInstance with typical default; see below
     */
    public static BufferedImage multiScale( BufferedImage img, double scale ) {
        int w = (int) ( img.getRaster().getWidth() * scale );
        int h = (int) ( img.getRaster().getHeight() * scale );
        if ( scale < 1 ) {
            return getScaledInstance( img, w, h, RenderingHints.VALUE_INTERPOLATION_BILINEAR, true );
        }
        else if ( scale == 1 ) {
            return img;
        }
        else {
            return rescaleXMaintainAspectRatio( img, w );
        }
    }

    /**
     * Convenience method for getScaledInstance with typical default; see below
     */
    public static BufferedImage multiScaleToHeight( BufferedImage img, int height ) {
        return multiScale( img, (double) height / img.getRaster().getHeight() );
    }

    public static BufferedImage multiScaleToWidth( BufferedImage img, int width ) {
        return multiScale( img, (double) width / img.getRaster().getWidth() );
    }

    /**
     * This method uses multi-step scaling techniques for downscaling for better image quality.
     * see http://today.java.net/pub/a/today/2007/04/03/perils-of-image-getscaledinstance.html
     * see also SwingLabs GraphicsUtilities
     * <p/>
     * Convenience method that returns a scaled instance of the provided {@code BufferedImage}.
     * <p/>
     * IMPORTANT: This method does not scale up - consider other methods in this class if you
     * need upscaling.
     *
     * @param img                    the original image to be scaled
     * @param targetWidth            the desired width of the scaled instance,
     *                               in pixels
     * @param targetHeight           the desired height of the scaled instance,
     *                               in pixels
     * @param interpolationHintValue one of the rendering hints that corresponds to
     *                               {@code RenderingHints.KEY_INTERPOLATION} (e.g.
     *                               {@code RenderingHints.VALUE_INTERPOLATION_NEAREST_NEIGHBOR},
     *                               {@code RenderingHints.VALUE_INTERPOLATION_BILINEAR},
     *                               {@code RenderingHints.VALUE_INTERPOLATION_BICUBIC})
     * @param higherQuality          if true, this method will use a multi-step
     *                               scaling technique that provides higher quality than the usual
     *                               one-step technique (only useful in downscaling cases, where
     *                               {@code targetWidth} or {@code targetHeight} is
     *                               smaller than the original dimensions, and generally only when
     *                               the {@code BILINEAR} hint is specified)
     * @return a scaled version of the original {@code BufferedImage}
     */
    public static BufferedImage getScaledInstance( BufferedImage img,
                                                   int targetWidth,
                                                   int targetHeight,
                                                   Object interpolationHintValue,
                                                   boolean higherQuality ) {
        int type = hasAlpha( img ) ? BufferedImage.TYPE_INT_ARGB : BufferedImage.TYPE_INT_RGB;
        BufferedImage ret = img;
        int w, h;
        if ( higherQuality ) {
            // Use multi-step technique: start with original size, then
            // scale down in multiple passes with drawImage()
            // until the target size is reached
            w = img.getRaster().getWidth();
            h = img.getRaster().getHeight();
        }
        else {
            // Use one-step technique: scale directly from original
            // size to target size with a single drawImage() call
            w = targetWidth;
            h = targetHeight;
        }

        do {
            if ( higherQuality && w > targetWidth ) {
                // BH fix int /= int
            		//w /= 2;
            		w = w >> 1;
                if ( w < targetWidth ) {
                    w = targetWidth;
                }
            }

            if ( higherQuality && h > targetHeight ) {
              // BH fix int /= int
              //h /= 2;
          		  h = h >> 1;
                if ( h < targetHeight ) {
                    h = targetHeight;
                }
            }

            BufferedImage tmp = new BufferedImage( w, h, type );
            Graphics2D g2 = tmp.createGraphics();
            g2.setRenderingHint( RenderingHints.KEY_INTERPOLATION, interpolationHintValue );
            g2.drawImage( ret, 0, 0, w, h, null );
            g2.dispose();

            ret = tmp;
//            System.out.println( "w = " + w +", h="+h);
        } while ( w > targetWidth || h > targetHeight );

        return ret;
    }

    /**
     * Creates a BufferedImage by scaling the alpha channel of a provided image.
     *
     * @param srcImage
     * @param alphaScale
     * @return
     */
    public static BufferedImage scaleAlpha( BufferedImage srcImage, double alphaScale ) {
        ScaleAlphaImageOpARGB scaleOp = new ScaleAlphaImageOpARGB( alphaScale );
        BufferedImage destImage = scaleOp.createCompatibleDestImage( srcImage, srcImage.getColorModel() );
        scaleOp.filter( srcImage, destImage );
        return destImage;
    }

    /**
     * Gets the color of a specific pixel in an image.
     *
     * @param image
     * @return
     */
    public static Color getPixelColor( BufferedImage image, int x, int y ) {
        int pixel = image.getRGB( x, y );
        int red = ( pixel & 0x00ff0000 ) >> 16;
        int green = ( pixel & 0x0000ff00 ) >> 8;
        int blue = pixel & 0x000000ff;
        return new Color( red, green, blue );
    }

    // Converts an Icon to an Image
    // https://groups.google.com/forum/?fromgroups#!topic/comp.lang.java.programmer/OI_IdebPL68
    public static Image toImage( Icon icon ) {
        if ( icon instanceof ImageIcon ) {
            return ( (ImageIcon) icon ).getImage();
        }
        else {
            int w = icon.getIconWidth();
            int h = icon.getIconHeight();
            GraphicsEnvironment ge = GraphicsEnvironment.getLocalGraphicsEnvironment();
            GraphicsDevice gd = ge.getDefaultScreenDevice();
            GraphicsConfiguration gc = gd.getDefaultConfiguration();
            BufferedImage image = gc.createCompatibleImage( w, h );
            Graphics2D g = image.createGraphics();
            icon.paintIcon( null, g, 0, 0 );
            g.dispose();
            return image;
        }
    }
}