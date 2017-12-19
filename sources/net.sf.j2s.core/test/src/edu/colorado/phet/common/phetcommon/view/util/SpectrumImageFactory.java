// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author$
 * Revision : $Revision$
 * Date modified : $Date$
 */

package edu.colorado.phet.common.phetcommon.view.util;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;

import javax.swing.SwingConstants;
import javax.swing.SwingUtilities;

import edu.colorado.phet.common.phetcommon.math.Function;

/**
 * SpectrumImageFactory is a collection of static methods that create spectrum images
 * commonly found in PhET simulations.  All images are created programmatically.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 * @version $Revision$
 */
public abstract class SpectrumImageFactory {

    // Default range for wavelength
    private static final double DEFAULT_MIN_WAVELENGTH = VisibleColor.MIN_WAVELENGTH;
    private static final double DEFAULT_MAX_WAVELENGTH = VisibleColor.MAX_WAVELENGTH;

    // Default colors used to render UV and IR wavelengths
    private static final Color DEFAULT_UV_COLOR = VisibleColor.COLOR_INVISIBLE;
    private static final Color DEFAULT_IR_COLOR = VisibleColor.COLOR_INVISIBLE;

    /* Not intended for instantiation */
    private SpectrumImageFactory() {
    }

    /**
     * @param maxWavelength
     * @param minWavelength
     * @param steps
     */
    protected abstract Function getWavelengthFunction( int steps, double minWavelength, double maxWavelength );

    /**
     * Creates a horizontal image for the visible spectrum.
     *
     * @see createSpectrum
     */
    public Image createHorizontalSpectrum( int width, int height ) {
        return createHorizontalSpectrum( width, height, DEFAULT_MIN_WAVELENGTH, DEFAULT_MAX_WAVELENGTH );
    }

    /**
     * Creates a horizontal image for a specified range of wavelengths.
     * Default color are used for any UV or IR wavelengths.
     *
     * @see createSpectrum
     */
    public Image createHorizontalSpectrum( int width, int height, double minWavelength, double maxWavelength ) {
        return createHorizontalSpectrum( width, height, minWavelength, maxWavelength, DEFAULT_UV_COLOR, DEFAULT_IR_COLOR );
    }

    /**
     * Creates a horizontal image for a specified range of wavelengths.
     * Specified colors are used for UV and IR wavelengths.
     *
     * @see creatSpectrum
     */
    public Image createHorizontalSpectrum( int width, int height, double minWavelength, double maxWavelength, Color uvColor, Color irColor ) {
        return createSpectrum( width, height, SwingConstants.HORIZONTAL, minWavelength, maxWavelength, uvColor, irColor );
    }

    /**
     * Creates a vertical image for the visible spectrum.
     *
     * @see createSpectrum
     */
    public Image createVerticalSpectrum( int width, int height ) {
        return createVerticalSpectrum( width, height, DEFAULT_MIN_WAVELENGTH, DEFAULT_MAX_WAVELENGTH );
    }

    /**
     * Creates a vertical image for a specified range of wavelengths.
     * Default color are used for any UV or IR wavelengths.
     *
     * @see createSpectrum
     */
    public Image createVerticalSpectrum( int width, int height, double minWavelength, double maxWavelength ) {
        return createVerticalSpectrum( width, height, minWavelength, maxWavelength, DEFAULT_UV_COLOR, DEFAULT_IR_COLOR );
    }

    /**
     * Creates a vertical image for a specified range of wavelengths.
     * Specified color are used for any UV or IR wavelengths.
     *
     * @see createSpectrum
     */
    public Image createVerticalSpectrum( int width, int height, double minWavelength, double maxWavelength, Color uvColor, Color irColor ) {
        return createSpectrum( width, height, SwingConstants.VERTICAL, minWavelength, maxWavelength, uvColor, irColor );
    }

    /**
     * Creates a spectrum image.
     * For horizontal images, wavelength increases from left to right.
     * For vertical images, wavelength increases from bottom to top.
     * Visible colors are provided by the VisibleColor class.
     * UV and IR colors are provided as arguments to this method.
     *
     * @param width         desired image width
     * @param height        desired image height
     * @param orientation   SwingConstants.HORIZONTAL or SwingConstants.VERTICAL
     * @param minWavelength minimum wavelength
     * @param maxWavelength maximum wavelength
     * @param uvColor       color used for UV wavelengths
     * @param irColor       color used for IR wavelengths
     * @return Image
     */
    public Image createSpectrum( int width, int height, int orientation, double minWavelength, double maxWavelength,
                                 Color uvColor, Color irColor ) {

        if ( width <= 0 || height <= 0 ) {
            throw new IllegalArgumentException( "width and height must both be > 0" );
        }
        if ( minWavelength >= maxWavelength ) {
            throw new IllegalArgumentException( "minWavelength must be < maxWavelength" );
        }
        if ( orientation != SwingConstants.HORIZONTAL && orientation != SwingConstants.VERTICAL ) {
            throw new IllegalArgumentException( "invalid orientation" );
        }
        if ( uvColor == null || irColor == null ) {
            throw new NullPointerException( "uvColor or irColor is null" );
        }

        int steps = ( ( orientation == SwingUtilities.HORIZONTAL ) ? width : height );
        Function wavelengthFunction = getWavelengthFunction( steps, minWavelength, maxWavelength );

        BufferedImage image = new BufferedImage( width, height, BufferedImage.TYPE_INT_RGB );
        Graphics2D g2 = image.createGraphics();

        for ( int i = 0; i < steps; i++ ) {

            double wavelength = wavelengthFunction.evaluate( i );

            Color color = null;
            if ( wavelength < VisibleColor.MIN_WAVELENGTH ) {
                color = uvColor;
            }
            else if ( wavelength > VisibleColor.MAX_WAVELENGTH ) {
                color = irColor;
            }
            else {
                color = VisibleColor.wavelengthToColor( wavelength );
            }
            g2.setColor( color );

            if ( orientation == SwingConstants.HORIZONTAL ) {
                g2.fillRect( i, 0, 1, height ); // x,y,width,height
            }
            else {
                g2.fillRect( 0, height - i, width, 1 ); // x,y,width,height
            }
        }
        g2.dispose();

        return image;
    }

    /**
     * Creates a version of the spectrum image factory that uses linear values
     * for the independent axis (e.g. x axis for a horizontal image).
     */
    public static class LinearSpectrumImageFactory extends SpectrumImageFactory {
        @Override
        protected Function getWavelengthFunction( int steps, double minWavelength, double maxWavelength ) {
            return new Function.LinearFunction( 0, steps, minWavelength, maxWavelength );
        }
    }

    /**
     * Creates a version of the spectrum image factory that uses exponential
     * values for the independent axis (e.g. x axis for a horizontal image).
     */
    public static class ExponentialGrowthSpectrumImageFactory extends SpectrumImageFactory {
        @Override
        protected Function getWavelengthFunction( int steps, double minWavelength, double maxWavelength ) {
            double base = Math.pow( maxWavelength / minWavelength, 1 / (double) ( steps - 1 ) );
            return new Function.ExponentialGrowthFunction( base, minWavelength );
        }
    }
}
