// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.view.util;

import java.awt.Color;

/**
 * VisibleColor extends java.awt.Color in two ways:
 * <p/>
 * (1) provides the wavelength assoicated with a Color<br>
 * (2) performs conversions between wavelength and Color
 * <p/>
 * Instances of VisibleColor are immutable.
 * <p/>
 * Conversions between wavelength and Color are performed using
 * a color lookup array.  This array is static, and is constructed
 * the first time that a VisibleColor is instantiated.
 * <p/>
 * Note that the name of this class is a bit of a misnomer.
 * sRGB is the default colorspace in Java 2D, and sRGB is not
 * capable of representing all visible colors.  So in converting
 * visible wavelengths to java.awt.Color, it is possible to lose
 * some color information.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class VisibleColor extends Color {
    //----------------------------------------------------------------------------
    // Class<?> data
    //----------------------------------------------------------------------------

    // Don't change these -- they are hardcoded into initColorLookup!
    public static final double MIN_WAVELENGTH = 380;
    public static final double MAX_WAVELENGTH = 780;

    // Common wavelengths.
    public static final double WHITE_WAVELENGTH = 0.0;
    public static final double INVISIBLE_WAVELENGTH = MAX_WAVELENGTH + 1;

    // Common colors.
    public static final VisibleColor RED = new VisibleColor( Color.RED );
    public static final VisibleColor GREEN = new VisibleColor( Color.GREEN );
    public static final VisibleColor BLUE = new VisibleColor( Color.BLUE );
    public static final VisibleColor WHITE = new VisibleColor( WHITE_WAVELENGTH );
    public static final VisibleColor INVISIBLE = new VisibleColor( 0, 0, 0, 0 );
    public static final Color COLOR_INVISIBLE = new Color( 0, 0, 0, 0 );

    // Two colors match if their RGB components each differ by less than this amount.
    private static final int COLOR_MATCH_DELTA = 2;

    // Lookup table for converting between wavelength and Color.
    private static Color _colorLookup[] = null;

    //----------------------------------------------------------------------------
    // Instance data
    //----------------------------------------------------------------------------

    // The wavelength
    private double _wavelength;

    //----------------------------------------------------------------------------
    // Constructors
    //----------------------------------------------------------------------------

    /**
     * Constructs a VisibleColor using RGBA components.
     *
     * @param r red component
     * @param g green component
     * @param b blue component
     * @param a alpha component
     */
    public VisibleColor( int r, int g, int b, int a ) {
        super( r, g, b, a );
        _wavelength = colorToWavelength( this );
    }

    /**
     * Constructs a VisibleColor from a java.awt.Color.
     *
     * @param color the java.awt.Color
     */
    public VisibleColor( Color color ) {
        this( color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha() );
    }

    /**
     * Constructs a VisibleColor from a wavelength.
     *
     * @param wavelength the wavelength
     */
    public VisibleColor( double wavelength ) {
        this( wavelengthToColor( wavelength ) );
    }

    //----------------------------------------------------------------------------
    // Accessors
    //----------------------------------------------------------------------------

    /**
     * Gets the wavelength.
     *
     * @return the wavelength
     */
    public double getWavelength() {
        return _wavelength;
    }

    //----------------------------------------------------------------------------
    // Conversions
    //----------------------------------------------------------------------------

    /**
     * Converts to a java.awt.Color.
     *
     * @return a java.awt.Color
     */
    public Color toColor() {
        return new Color( this.getRed(), this.getGreen(), this.getBlue(), this.getAlpha() );
    }

    /**
     * Provides a string representation.
     *
     * @return the string
     */
    @Override
		public String toString() {
        return "VisibleColor: RGBA=" + getRed() + "-" + getGreen() + "-" + getBlue() + "-" + getAlpha() +
               ", wavelength=" + _wavelength;
    }

    /**
     * Converts a wavelength to an opaque Color.
     * A wavelength of zero corresponds to white.
     * Wavelengths outside the visible spectrum return fully-transparent black.
     */
    public static Color wavelengthToColor( double wl ) {
        return wavelengthToColor( wl, COLOR_INVISIBLE, COLOR_INVISIBLE );
    }

    /**
     * Converts a wavelength to a Color.
     * A visible wavelength is assigned is corresponding opaque color.
     * A wavelength of zero corresponds to opaque white.
     * UV wavelengths are assigned the specified UV color.
     * IR wavelengths are assigned the specified IR color.
     * <p/>
     * Note that since java.awt.Color uses the sRGB colorspace, it is possible
     * that some color information may be lost in this conversion.  sRGB is
     * not capable of representing all visible colors.
     *
     * @param wl      the wavelength
     * @param uvColor
     * @param irColor
     * @return the corresponding Color
     */
    public static Color wavelengthToColor( double wl, Color uvColor, Color irColor ) {
        Color color = null;

        if ( wl == WHITE_WAVELENGTH ) {
            // Special case: white light.
            color = Color.WHITE;
        }
        else if ( wl < MIN_WAVELENGTH ) {
            color = uvColor;
        }
        else if ( wl > MAX_WAVELENGTH ) {
            color = irColor;
        }
        else {
            // Look up the color.
            if ( _colorLookup == null ) {
                initColorLookup();
            }
            // Colors are immuatable, so use the color from the lookup array.
            color = _colorLookup[(int) ( wl - MIN_WAVELENGTH )];
        }

        return color;
    }

    /**
     * Converts a Color to its corresponding wavelength.
     * Relies on a color lookup table that is initialized the first time
     * that this method is called.  Color lookup is based on RGB component
     * value; the alpha value is ignored.
     *
     * @param color the color
     * @return the wavelength
     */
    public static double colorToWavelength( Color color ) {
        double wavelength = INVISIBLE_WAVELENGTH;

        if ( _colorLookup == null ) {
            initColorLookup();
        }

        if ( color.equals( Color.WHITE ) ) {
            return WHITE_WAVELENGTH;
        }

        for ( int i = 0; i < _colorLookup.length; i++ ) {
            if ( Math.abs( color.getRed() - _colorLookup[i].getRed() ) < COLOR_MATCH_DELTA &&
                 Math.abs( color.getGreen() - _colorLookup[i].getGreen() ) < COLOR_MATCH_DELTA &&
                 Math.abs( color.getBlue() - _colorLookup[i].getBlue() ) < COLOR_MATCH_DELTA ) {
                wavelength = MIN_WAVELENGTH + i;
                break;
            }
        }

        return wavelength;
    }

    //----------------------------------------------------------------------------
    // Color Lookup
    //----------------------------------------------------------------------------

    /**
     * Initializes a color lookup array, used to map between Color and wavelength.
     * This method is called only once, when the first VisibleColor is instantiated.
     * <p/>
     * This method originally appeared in Ron Lemaster's Flash version of this
     * simulation, in the file ColorUtil.as.  The method was called ColorUtil.genCtx.
     * I removed code that was commented out, and fixed bugs as noted herein.
     */
    private static void initColorLookup() {
        // Allocate the color array.
        int numWavelengths = (int) ( MAX_WAVELENGTH - MIN_WAVELENGTH + 1 );
        _colorLookup = new Color[numWavelengths];

        // Populate the color array.
        double wl;
        double r, g, b;
        for ( int i = 0; i < numWavelengths; i++ ) {
            // Create the RGB component values.
            wl = MIN_WAVELENGTH + i;
            r = g = b = 0.0;

            // Determine the RGB component values.
            if ( wl >= 380. && wl <= 440. ) {
                r = -1. * ( wl - 440. ) / ( 440. - 380. );
                g = 0;
                b = 1;
            }
            else if ( wl > 440. && wl <= 490. ) {
                r = 0;
                g = ( wl - 440. ) / ( 490. - 440. );
                b = 1.;
            }
            else if ( wl > 490. && wl <= 510. ) {
                r = 0;
                g = 1;
                b = -1. * ( wl - 510. ) / ( 510. - 490. );
            }
            else if ( wl > 510. && wl <= 580. ) {
                r = ( wl - 510. ) / ( 580. - 510. );
                g = 1.;
                b = 0.;
            }
            else if ( wl > 580. && wl <= 645. ) {
                r = 1.;
                g = -1. * ( wl - 645. ) / ( 645. - 580. );
                b = 0.;
            }
            else if ( wl > 645. && wl <= 780. ) {
                r = 1.;
                g = 0.;
                b = 0;
            }

            // Let the intensity fall off near the vision limits.
            double intensity;
            // BUG FIX:
            // The value 645 in this block was 700 in the original code.
            // Because all values above 645 have the same RGB components (see above),
            // this resulted in duplicate entries in the color lookup array for wavelengths
            // int the range 645-700 inclusive.  Setting the value to 645 solves this problem.
            if ( wl > 645. ) {
                intensity = .3 + .7 * ( 780. - wl ) / ( 780. - 645. );
            }
            else if ( wl < 420. ) {
                intensity = .3 + .7 * ( wl - 380. ) / ( 420. - 380. );
            }
            else {
                intensity = 1.;
            }
            int red = (int) Math.round( 255 * ( intensity * r ) );
            int green = (int) Math.round( 255 * ( intensity * g ) );
            int blue = (int) Math.round( 255 * ( intensity * b ) );
            int alpha = 255;

            // Add the color to the lookup array.
            _colorLookup[i] = new Color( red, green, blue, alpha );
        }

        //debug_colorLookup();

    }  // initColorLookup

    //----------------------------------------------------------------------------
    // Debugging
    //----------------------------------------------------------------------------

//    /**
//     * Debugging method for examining the contents of the color lookup array.
//     * This partially tests the correctness of the initColorArray method.
//     * There should be no duplicate colors, since the presence of duplicates
//     * will yeild incorrect results when we map wavelengths to Colors.
//     */
//    private static final void debug_colorLookup() {
//        // Determines how many duplicate colors are in the lookup array.
//        int duplicates = 0;
//        for ( int i = 0; i < _colorLookup.length - 1; i++ ) {
//            if ( _colorLookup[i].equals( _colorLookup[i + 1] ) ) {
//                duplicates++;
//            }
//        }
//        System.out.println( "colorLookup duplicates: " + duplicates );
//    }

}

/* end of file */