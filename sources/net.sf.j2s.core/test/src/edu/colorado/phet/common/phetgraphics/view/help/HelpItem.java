// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 54200 $
 * Date modified : $Date: 2011-07-18 19:45:40 -0500 (Mon, 18 Jul 2011) $
 */
package edu.colorado.phet.common.phetgraphics.view.help;

import java.awt.Color;
import java.awt.Component;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.RenderingHints;
import java.awt.geom.Point2D;
import java.util.ArrayList;
import java.util.StringTokenizer;

import edu.colorado.phet.common.phetcommon.view.util.PhetFont;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetGraphic;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetShadowTextGraphic;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetShapeGraphic;
import edu.colorado.phet.common.phetgraphics.view.util.GraphicsUtil;

/**
 * HelpItem
 *
 * @author ?
 * @version $Revision: 54200 $
 */
public class HelpItem extends PhetGraphic {

    //----------------------------------------------------------------
    // Class<?> data and methods
    //----------------------------------------------------------------

    public final static int ABOVE = 1;
    public final static int BELOW = 2;
    public final static int LEFT = 3;
    public final static int CENTER = 4;
    public final static int RIGHT = 5;
		private static final Color color0000 = new Color( 0, 0, 0, 0 );
    
    private static String[] tokenizeString( String inputText ) {
        StringTokenizer st = new StringTokenizer( inputText, "\n" );
        ArrayList<String> list = new ArrayList<String>();
        while ( st.hasMoreTokens() ) {
            String next = st.nextToken();
            list.add( next );
        }
        return list.toArray( new String[0] );
    }

    //----------------------------------------------------------------
    // Instance data and methods
    //----------------------------------------------------------------

    PhetShapeGraphic backgroundGraphic;
    ArrayList<PhetShadowTextGraphic> shadowTextGraphics = new ArrayList<PhetShadowTextGraphic>();
    int horizontalAlignment;
    int verticalAlignment;
    private Font font;
    private String text;
    private Point2D.Double location;
    private Color shadowColor;
    private Color foregroundColor;
    private boolean inited = false;
    private boolean antiAlias = false;

    //----------------------------------------------------------------
    // Constructors and initialization
    //----------------------------------------------------------------

    /**
     * @param component
     * @param text
     * @param x
     * @param y
     */
    public HelpItem( Component component, String text, double x, double y ) {
        this( component, text, x, y, CENTER, CENTER );
    }

    /**
     * @param component
     * @param text
     * @param location
     */
    public HelpItem( Component component, String text, Point2D location ) {
        this( component, text, location.getX(), location.getX() );
    }

    /**
     * @param component
     * @param text
     * @param location
     * @param horizontalAlignment
     * @param verticalAlignment
     */
    public HelpItem( Component component, String text, Point2D location,
                     int horizontalAlignment, int verticalAlignment ) {
        this( component, text, location.getX(), location.getY(), horizontalAlignment, verticalAlignment );
    }

    /**
     * @param text
     * @param x
     * @param y
     * @param horizontalAlignment Specifies if the help item will be displayed to
     *                            the LEFT or RIGHT of the specified x coordinate
     * @param verticalAlignment   Specifies if the help item will be displayed ABOVE
     *                            or BELOW the specified y coordinate
     */
    public HelpItem( Component component, String text, double x, double y,
                     int horizontalAlignment, int verticalAlignment ) {
        super( component );
        this.horizontalAlignment = horizontalAlignment;
        this.verticalAlignment = verticalAlignment;
        this.text = text;
        this.location = new Point2D.Double( x, y );
        shadowColor = Color.black;
        foregroundColor = new Color( 156, 156, 0 );
        setIgnoreMouse( true );
    }

    private void init( Graphics2D g ) {
        FontMetrics fontMetrics = g.getFontMetrics( getFont() );

        shadowTextGraphics = new ArrayList<PhetShadowTextGraphic>();
        String[] sa = tokenizeString( text );

        int x = 0;
        double maxStrLen = 0;
        switch( horizontalAlignment ) {
            case HelpItem.LEFT:
                maxStrLen = getMaxStrLen( sa, g, fontMetrics );
                x = (int) ( location.getX() - maxStrLen - fontMetrics.getStringBounds( " ", g ).getWidth() );
                break;
            case HelpItem.RIGHT:
                x = (int) ( location.getX() + fontMetrics.getStringBounds( " ", g ).getWidth() );
                break;
            case HelpItem.CENTER:
                maxStrLen = getMaxStrLen( sa, g, fontMetrics );
                x = (int) ( location.getX() - maxStrLen / 2 );
                break;
        }

        double yBase = 0;
        switch( verticalAlignment ) {
            case HelpItem.ABOVE:
                yBase = -sa.length * ( fontMetrics.getHeight() + fontMetrics.getLeading() );
                break;
            case HelpItem.BELOW:
                yBase = 0;
                break;
            case HelpItem.CENTER:
                yBase = -( sa.length + 1 ) * ( fontMetrics.getHeight() + fontMetrics.getLeading() ) / 2;
                break;
        }

        for ( int i = 0; i < sa.length; i++ ) {
            int y = (int) yBase + (int) location.getY() + ( i + 1 ) * ( fontMetrics.getHeight() + fontMetrics.getLeading() );
            PhetShadowTextGraphic textGraphic = new PhetShadowTextGraphic( getComponent(), font, sa[i], foregroundColor, 1, 1, shadowColor );
            textGraphic.setLocation2( x, y );
            shadowTextGraphics.add( textGraphic );
        }
    }

    private Font getFont() {
    	return (font == null ? font = new PhetFont( Font.BOLD, 16 ) : font);
		}

		@Override
		protected Rectangle determineBounds() {
        return getComponent().getBounds(shapeRect);//TODO this should return the correct bounds
    }

    @Override
		public void paint( Graphics2D g ) {
        RenderingHints rhOrg = g.getRenderingHints();
        if ( antiAlias ) {
            GraphicsUtil.setAntiAliasingOn( g );
        }
        if ( !inited ) {
            init( g );
            inited = true;
        }
        if ( backgroundGraphic != null ) {
            backgroundGraphic.paint( g );
        }
        for ( int i = 0; i < shadowTextGraphics.size(); i++ ) {
            PhetShadowTextGraphic textGraphic = shadowTextGraphics.get( i );
            textGraphic.paint( g );
        }
        g.setRenderingHints( rhOrg );
    }

    //----------------------------------------------------------------
    // Setters
    //----------------------------------------------------------------

    /**
     * @param x
     * @param y
     */
    @Override
		public void setLocation2( int x, int y ) {
        location.x = x;
        location.y = y;
        inited = false;
    }

    /**
     * @param shadowColor
     */
    public void setShadowColor( Color shadowColor ) {
        this.shadowColor = shadowColor;
        for ( int i = 0; i < shadowTextGraphics.size(); i++ ) {
            PhetShadowTextGraphic textGraphic = shadowTextGraphics.get( i );
            textGraphic.setShadowColor( shadowColor );
        }
    }

    /**
     * @param foregroundColor
     */
    public void setForegroundColor( Color foregroundColor ) {
        this.foregroundColor = foregroundColor;
        for ( int i = 0; i < shadowTextGraphics.size(); i++ ) {
            PhetShadowTextGraphic shadowTextGraphic = shadowTextGraphics.get( i );
            shadowTextGraphic.setColor( foregroundColor );
        }
    }

    /**
     * @param size
     */
    public void setFontSize( int size ) {
        font = new Font( font.getFontName(), font.getStyle(), size );
    }

    private double getMaxStrLen( String[] sa, Graphics2D g, FontMetrics fontMetrics ) {
        double maxStrLen = 0;
        for ( int i = 0; i < sa.length; i++ ) {
            String s = sa[i];
            double strLen = fontMetrics.getStringBounds( s, g ).getWidth();
            maxStrLen = strLen > maxStrLen ? strLen : maxStrLen;
        }
        return maxStrLen;
    }

    /**
     * @param font
     */
    public void setFont( Font font ) {
        this.font = font;
    }

    /**
     * Set whether the text is antialiased or not
     *
     * @param antiAlias
     */
    public void setAntiAlias( boolean antiAlias ) {
        this.antiAlias = antiAlias;
    }

    /**
     * Sets wheter a drop shadow is displayed or not
     *
     * @param displayDropShadow
     */
    public void setDisplayDropShadow( boolean displayDropShadow ) {
        if ( displayDropShadow ) {
            setShadowColor( shadowColor );
        }
        else {
            setShadowColor( color0000 );
        }
    }
}