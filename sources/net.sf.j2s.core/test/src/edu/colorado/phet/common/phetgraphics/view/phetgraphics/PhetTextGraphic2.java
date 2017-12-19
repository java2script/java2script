// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 54200 $
 * Date modified : $Date: 2011-07-18 19:45:40 -0500 (Mon, 18 Jul 2011) $
 */
package edu.colorado.phet.common.phetgraphics.view.phetgraphics;

import java.awt.Color;
import java.awt.Component;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics2D;
import java.awt.Rectangle;

import edu.colorado.phet.common.phetcommon.view.util.PhetFont;

/**
 * PhetTextGraphic is a graphic that draws single-line text.
 *
 * @author ?
 * @version $Revision: 54200 $
 */
public class PhetTextGraphic2 extends PhetGraphic {

    //----------------------------------------------------------------
    // Class<?> data
    //----------------------------------------------------------------

    /// Justification values
    public static final int NONE = 0;
    public static final int NORTH_WEST = 1;
    public static final int NORTH = 2;
    public static final int NORTH_EAST = 3;
    public static final int EAST = 4;
    public static final int SOUTH_EAST = 5;
    public static final int SOUTH = 6;
    public static final int SOUTH_WEST = 7;
    public static final int WEST = 8;
    public static final int CENTER = 9;

    // Defaults
    private static Font DEFAULT_FONT;
    private static final String DEFAULT_TEXT = "";
    private static final Color DEFAULT_COLOR = Color.BLACK;
    private static final int DEFAULT_JUSTIFICATION = NONE;

    //----------------------------------------------------------------
    // Instance data
    //----------------------------------------------------------------

    private Font font;
    private String text;
    private Color color;
    private FontMetrics fontMetrics;
    private int justification;

    //----------------------------------------------------------------
    // Constructors
    //----------------------------------------------------------------

    /**
     * Creates a PhetTextGraphic at a specified location.
     *
     * @param component
     * @param font
     * @param text
     * @param color
     * @param x
     * @param y
     */
    public PhetTextGraphic2( Component component, Font font, String text, Color color, int x, int y ) {
        super( component );
        if (font == null)
        	font = (DEFAULT_FONT == null ? DEFAULT_FONT = new PhetFont( Font.PLAIN, 12 ) : DEFAULT_FONT);
        setFont( font ); // also sets fontMetrics
        this.text = text;
        this.color = color;
        setJustification( DEFAULT_JUSTIFICATION );
        setLocation2( x, y );
    }

    /**
     * Creates a PhetTextGraphic at (0,0).
     * You can now set location easily with setLocation().
     *
     * @param component
     * @param font
     * @param text
     * @param color
     */
    public PhetTextGraphic2( Component component, Font font, String text, Color color ) {
        this( component, font, text, color, 0, 0 );
    }

    /**
     * Creates a default PhetTextGraphic at (0,0).
     *
     * @param component
     */
    public PhetTextGraphic2( Component component ) {
        this( component, null, DEFAULT_TEXT, DEFAULT_COLOR );
    }

    /**
     * Provides for Java Bean conformance, should not be used by clients.
     */
    public PhetTextGraphic2() {
    }

    //----------------------------------------------------------------
    // Setters and getters 
    //----------------------------------------------------------------

    public void setText( String text ) {
        this.text = text;
        setJustification( justification );
        setBoundsDirtyOpt();
        autorepaint();
    }

    public String getText() {
        return text;
    }

    public void setColor( Color color ) {
        this.color = color;
        setBoundsDirtyOpt();
        autorepaint();
    }

    public Color getColor() {
        return color;
    }

    public void setFont( Font font ) {
        this.font = font;
        this.fontMetrics = getComponent().getFontMetrics( font );
        setJustification( justification );
        setBoundsDirtyOpt();
        autorepaint();
    }

    public Font getFont() {
        return font;
    }

    /**
     * Provides for Java Bean conformance, should not be used by clients.
     */
    public void setFontMetrics( FontMetrics fontMetrics ) {
        this.fontMetrics = fontMetrics;
    }

    public FontMetrics getFontMetrics() {
        return fontMetrics;
    }

    /**
     * Convenience routine for setting the reference point.
     * <p/>
     * Locates the reference point by specifying a compass point
     * on a rectangle.  The top, left and right edges of the rectangle
     * correspond to the graphic's bounds. The bottom edge of the
     * rectangle is the text's baseline!
     * <p/>
     * By default, justification is NONE. If you set the justification
     * to something other than NONE, then the graphic will be
     * re-justified whenever you change the text or font.
     *
     * @param justification
     */
    public void setJustification( int justification ) {
        this.justification = justification;
        int ascentHeight = fontMetrics.getAscent();
        switch( justification ) {
            case NONE:
                // Do nothing, so we don't whack a custom registration point.
                break;
            case NORTH_WEST:
                setRegistrationPoint( 0, 0 );
                break;
            case NORTH:
                setRegistrationPoint( getWidth() / 2, 0 );
                break;
            case NORTH_EAST:
                setRegistrationPoint( getWidth(), 0 );
                break;
            case SOUTH_EAST:
                setRegistrationPoint( getWidth(), ascentHeight ); // on the baseline
                break;
            case SOUTH:
                setRegistrationPoint( getWidth() / 2, ascentHeight ); // on the baseline
                break;
            case SOUTH_WEST:
                setRegistrationPoint( 0, ascentHeight ); // on the baseline
                break;
            case EAST:
                setRegistrationPoint( getWidth(), ascentHeight / 2 );
                break;
            case WEST:
                setRegistrationPoint( 0, ascentHeight / 2 );
                break;
            case CENTER:
                setRegistrationPoint( getWidth() / 2, ascentHeight / 2 );
                break;
            default:
                throw new IllegalArgumentException( "invalid justification: " + justification );
        }
    }

    //----------------------------------------------------------------
    // PhetGraphic implementation
    //----------------------------------------------------------------

    @Override
		public void paint( Graphics2D g2 ) {
        if ( isVisible() ) {
            saveGraphicsState( g2 );
            updateGraphicsState( g2 );
            g2.setFont( font );
            g2.setColor( color );
            g2.transform( getNetTransform() );
            g2.drawString( text, 0, fontMetrics.getAscent() );
            restoreGraphicsState();
        }
    }

    @Override
		protected Rectangle determineBounds() {
        if ( text == null || text.equals( "" ) ) {
            return null;
        }
        localRect.width = fontMetrics.stringWidth( text );//this ignores antialias and fractional metrics.
        localRect.height = fontMetrics.getHeight();
        return determineShapeBounds();
    }
}