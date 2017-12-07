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
 * RoundGradientPaint creates a round, or radial, gradient.
 * This gradient defines a color at a point; the gradient blends into another
 * color as a function of the distance from that point.
 * The end result is a big, fuzzy spot.
 * <p/>
 * Adapted from an example in Chapter 4 of "Java 2D Graphics" by Jonathan Knudsen.
 * <p/>
 * NOTE! This paint is relatively expensive.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class RoundGradientPaint implements Paint {

    private final Point2D point;
    private final Point2D radius;
    private final Color pointColor;
    private final Color backgroundColor;

    /**
     * Constructor accepts a point and a color that describe the center of
     * the gradient, a radius, and a background color. The gradient blends
     * color from the center point to the background color over the length
     * of the radius.
     *
     * @param x               center of the gradient
     * @param y               center of the gradient
     * @param pointColor      color at the center of the gradient
     * @param radius          radius of the gradient blend
     * @param backgroundColor color at the outer edges of the gradient
     */
    public RoundGradientPaint( double x, double y, Color pointColor, Point2D radius, Color backgroundColor ) {
        if ( radius.distance( 0, 0 ) <= 0 ) {
            throw new IllegalArgumentException( "Radius must be greater than 0." );
        }
        point = new Point2D.Double( x, y );
        this.pointColor = pointColor;
        this.radius = radius;
        this.backgroundColor = backgroundColor;
    }

    /**
     * See Paint.createContext
     */
    @Override
		public PaintContext createContext( ColorModel cm, Rectangle deviceBounds, Rectangle2D userBounds, AffineTransform xform, RenderingHints hints ) {
        Point2D transformedPoint = xform.transform( point, null );
        Point2D transformedRadius = xform.deltaTransform( radius, null );
        return new RoundGradientContext( transformedPoint, pointColor, transformedRadius, backgroundColor );
    }

    /**
     * See Transparency.getTransparency
     */
    @Override
		public int getTransparency() {
        int a1 = pointColor.getAlpha();
        int a2 = backgroundColor.getAlpha();
        return ( ( ( a1 & a2 ) == 0xff ) ? OPAQUE : TRANSLUCENT );
    }

    /**
     * RoundGradientContext is the PaintContext used by a RoundGradientPaint.
     */
    private static class RoundGradientContext implements PaintContext {

        private final Point2D _point;
        private final Point2D _radius;
        private final Color _color1, _color2;
        private WritableRaster _raster;

        public RoundGradientContext( Point2D p, Color color1, Point2D r, Color color2 ) {
            _point = p;
            _color1 = color1;
            _radius = r;
            _color2 = color2;
        }

        @Override
				public void dispose() {
        }

        @Override
				public ColorModel getColorModel() {
            return ColorModel.getRGBdefault();
        }

        @Override
				public Raster getRaster( int x, int y, int w, int h ) {
            // allocate raster on demand, or if we need a bigger raster
            if ( _raster == null || w > _raster.getWidth() || h > _raster.getHeight() ) {
                _raster = getColorModel().createCompatibleWritableRaster( w, h );
            }
            paint( x, y, w, h, _raster );
            return _raster;
        }

        private void paint( int x, int y, int w, int h, WritableRaster raster ) {
            int[] data = new int[w * h * 4];
            for ( int j = 0; j < h; j++ ) {
                for ( int i = 0; i < w; i++ ) {
                    double distance = _point.distance( x + i, y + j );
                    double radius = _radius.distance( 0, 0 );
                    double ratio = distance / radius;
                    if ( ratio > 1.0 ) {
                        ratio = 1.0;
                    }

                    int base = ( j * w + i ) * 4;
                    data[base + 0] = (int) ( _color1.getRed() + ratio * ( _color2.getRed() - _color1.getRed() ) );
                    data[base + 1] = (int) ( _color1.getGreen() + ratio * ( _color2.getGreen() - _color1.getGreen() ) );
                    data[base + 2] = (int) ( _color1.getBlue() + ratio * ( _color2.getBlue() - _color1.getBlue() ) );
                    data[base + 3] = (int) ( _color1.getAlpha() + ratio * ( _color2.getAlpha() - _color1.getAlpha() ) );
                }
            }
            raster.setPixels( 0, 0, w, h, data );
        }
    }
}
