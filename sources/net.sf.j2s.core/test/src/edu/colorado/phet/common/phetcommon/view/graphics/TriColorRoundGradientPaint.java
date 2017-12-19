// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.view.graphics;

import java.awt.Color;
import java.awt.Paint;
import java.awt.PaintContext;
import java.awt.Rectangle;
import java.awt.RenderingHints;
import java.awt.geom.AffineTransform;
import java.awt.geom.Point2D;
import java.awt.geom.Rectangle2D;
import java.awt.image.ColorModel;
import java.awt.image.Raster;
import java.awt.image.WritableRaster;

/**
 * A round gradient paint that is composed of 3 colors, identified as inner, middle and outer.
 * Colors are interpolated radially outward from a center point.
 * Coordinates are in the frame of the raster into which pixel data is being written.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class TriColorRoundGradientPaint implements Paint {

    private final Color innerColor, middleColor, outerColor;
    private final Point2D center;
    private final double innerMiddleSpan; // distance across which the gradient blends from innerColor to middleColor
    private final double middleOuterSpan; // distance across which the gradient blends from middleColor to outerColor

    /**
     * Constructor accepts a point and a color that describe the center of
     * the gradient, a radius, and a background color. The gradient blends
     * color from the center point to the background color over the length
     * of the radius.
     *
     * @param innerColor
     * @param middleColor
     * @param outerColor
     * @param centerX         x center of the gradient
     * @param centerY         y center of the gradient
     * @param innerMiddleSpan distance across which the gradient blends from innerColor to middleColor
     * @param middleOuterSpan distance across which the gradient blends from middleColor to outerColor
     */
    public TriColorRoundGradientPaint( Color innerColor, Color middleColor, Color outerColor,
                                       double centerX, double centerY, double innerMiddleSpan, double middleOuterSpan ) {

        if ( innerMiddleSpan <= 0 ) {
            throw new IllegalArgumentException( "innerMiddleSpan must be > 0." );
        }
        if ( middleOuterSpan <= 0 ) {
            throw new IllegalArgumentException( "middleOuterSpan must be > 0." );
        }

        this.middleColor = middleColor;
        this.innerColor = innerColor;
        this.outerColor = outerColor;
        this.center = new Point2D.Double( centerX, centerY );
        this.innerMiddleSpan = innerMiddleSpan;
        this.middleOuterSpan = middleOuterSpan;
    }

    /**
     * See Paint.createContext
     */
    @Override
		public PaintContext createContext( ColorModel cm, Rectangle deviceBounds, Rectangle2D userBounds, AffineTransform xform, RenderingHints hints ) {
        Point2D transformedCenter = xform.transform( center, null );

        //Transform from user space to device space and create the gradient context
        double transformedInnerMiddleSpan = xform.deltaTransform( new Point2D.Double( innerMiddleSpan, 0 ), null ).getX();
        double transformedMiddleOuterSpan = xform.deltaTransform( new Point2D.Double( middleOuterSpan, 0 ), null ).getX();
        return new TriColorRoundGradientContext( innerColor, middleColor, outerColor, transformedCenter, transformedInnerMiddleSpan, transformedMiddleOuterSpan );
    }

    /**
     * See Transparency.getTransparency
     */
    @Override
		public int getTransparency() {
        int a1 = innerColor.getAlpha();
        int a2 = middleColor.getAlpha();
        return ( ( ( a1 & a2 ) == 0xff ) ? OPAQUE : TRANSLUCENT );
    }

    /*
     * Context for this Paint.
     * Handles generation of pixel data in device space.
     */
    private static class TriColorRoundGradientContext implements PaintContext {

        private final Color innerColor, middleColor, outerColor;
        private final Point2D center;
        private final double innerMiddleSpan, middleOuterSpan;
        private WritableRaster raster;

        /**
         * @param innerColor      the inner-most color of the 3-color gradient
         * @param middleColor     the middle color of the 3-color gradient
         * @param outerColor      the outer-most color of the 3-color gradient
         * @param center          the center point of the gradient
         * @param innerMiddleSpan the distance over which the gradient transitions from innerColor to middleColor
         * @param middleOuterSpan the distance over which the gradient transitions from middleColor to outerColor
         */
        public TriColorRoundGradientContext( Color innerColor, Color middleColor, Color outerColor, Point2D center, double innerMiddleSpan, double middleOuterSpan ) {
            assert ( innerMiddleSpan >= 0 );
            assert ( middleOuterSpan >= 0 );

            this.innerMiddleSpan = innerMiddleSpan;
            this.middleOuterSpan = middleOuterSpan;

            this.innerColor = innerColor;
            this.middleColor = middleColor;
            this.outerColor = outerColor;
            this.center = center;
        }

        /**
         * @see java.awt.PaintContext#dispose()
         */
        @Override
				public void dispose() {
        }

        /**
         * @see java.awt.PaintContext#getColorModel()
         */
        @Override
				public ColorModel getColorModel() {
            return ColorModel.getRGBdefault();
        }

        /**
         * @see java.awt.PaintContext#getRaster(int, int, int, int)
         */
        @Override
				public Raster getRaster( int x, int y, int w, int h ) {
            // allocate raster on demand, or if we need a bigger raster
            if ( raster == null || w > raster.getWidth() || h > raster.getHeight() ) {
                raster = getColorModel().createCompatibleWritableRaster( w, h );
            }
            paint( x, y, w, h, raster, innerColor, middleColor, outerColor, center, innerMiddleSpan, middleOuterSpan );
            return raster;
        }

        /*
         * Paints a 3-color round gradient.
         *
         * @param x the x coordinate of the area in device space for which colors are generated.
         * @param y the y coordinate of the area in device space for which colors are generated.
         * @param w the width of the area in device space
         * @param h the height of the area in device space
         * @param raster rectangular array of pixel data
         * @param innerColor the inner-most color of the 3-color gradient
         * @param middleColor the middle color of the 3-color gradient
         * @param outerColor the outer-most color of the 3-color gradient
         * @param innerMiddleSpan the distance over which the gradient transitions from innerColor to middleColor
         * @param middleOuterSpan the distance over which the gradient transitions from middleColor to outerColor
         */
        private static void paint( int x, int y, int w, int h, WritableRaster raster,
                                   Color innerColor, Color middleColor, Color outerColor,
                                   Point2D center, double innerMiddleSpan, double middleOuterSpan ) {

            int[] data = new int[w * h * 4];
            Color color1, color2;
            double ratio;  // ratio for interpolating between color1 and color2, range is 0-1

            for ( int j = 0; j < h; j++ ) {
                for ( int i = 0; i < w; i++ ) {

                    // pick 2 colors and compute interpolation ratio, based on the distance from the gradient's center
                    double distanceFromCenter = center.distance( x + i, y + j );
                    if ( distanceFromCenter <= innerMiddleSpan ) {
                        // we're inside the inner-to-middle part of the gradient
                        color1 = innerColor;
                        color2 = middleColor;
                        ratio = distanceFromCenter / innerMiddleSpan;
                    }
                    else {
                        // we're outside the inner-to-middle part of the gradient
                        color1 = middleColor;
                        color2 = outerColor;
                        ratio = ( distanceFromCenter - innerMiddleSpan ) / middleOuterSpan;
                        if ( ratio > 1.0 ) {
                            // we're past the point where the gradient becomes outerColor
                            ratio = 1.0;
                        }
                    }

                    // compute color components
                    int base = ( j * w + i ) * 4;
                    data[base + 0] = interpolateColorComponent( color1.getRed(), color2.getRed(), ratio );
                    data[base + 1] = interpolateColorComponent( color1.getGreen(), color2.getGreen(), ratio );
                    data[base + 2] = interpolateColorComponent( color1.getBlue(), color2.getBlue(), ratio );
                    data[base + 3] = interpolateColorComponent( color1.getAlpha(), color2.getAlpha(), ratio );
                }
            }
            raster.setPixels( 0, 0, w, h, data );
        }

        /*
         * Linear interpolation between 2 color components.
         * Ratios closer to 0 produce values closer to component1.
         */
        private static int interpolateColorComponent( int component1, int component2, double ratio ) {
            assert ( component1 >= 0 && component1 <= 255 );
            assert ( component2 >= 0 && component2 <= 255 );
            assert ( ratio >= 0.0 && ratio <= 1.0 );
            return (int) ( component1 + ratio * ( component2 - component1 ) );
        }
    }
}
