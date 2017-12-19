// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetgraphics.view.phetgraphics;

import java.awt.Color;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;

import javax.swing.JLabel;
import javax.swing.plaf.basic.BasicHTML;
import javax.swing.text.View;

import edu.colorado.phet.common.phetcommon.view.util.PhetFont;
import edu.colorado.phet.common.phetcommon.view.util.RectangleUtils;

/**
 * Class<?> for rendering HTML Text.
 */
public class HTMLGraphic extends CompositePhetGraphic {

    private static final Color DEFAULT_COLOR = Color.BLACK;
    private static Font DEFAULT_FONT;

    private String html;
    private Font font;
    private Color color;
    private PhetImageGraphic imageGraphic;

    public HTMLGraphic( Component component ) {
        this( component, null, "", DEFAULT_COLOR );
    }

    /**
     * Constructor.
     * If the string provided is not in HTML format, then it is converted to HTML.
     *
     * @param component
     * @param font
     * @param html
     * @param color
     */
    public HTMLGraphic( Component component, Font font, String html, Color color ) {
        super( component );
        this.html = makeHTML( html );
        if (font == null)
        	font = (DEFAULT_FONT == null ? DEFAULT_FONT = new PhetFont( Font.PLAIN, 12 ) : DEFAULT_FONT);
        this.font = font;
        this.color = color;
        imageGraphic = new PhetImageGraphic( component, null, 0, 0 );
        addGraphic( imageGraphic );
        update();
    }

    /**
     * Sets the HTML string.
     * If the string provided is not in HTML format, then it is converted to HTML.
     *
     * @param html
     */
    public void setHTML( String html ) {
        this.html = makeHTML( html );
        update();
    }

    public String getHTML() {
        return html;
    }

    public void setHtml( String html ) {
        setHTML( html );
    }

    public String getHtml() {
        return getHTML();
    }

    public void setFont( Font font ) {
        this.font = font;
        update();
    }

    public Font getFont() {
        return font;
    }

    public void setColor( Color color ) {
        this.color = color;
        update();
    }

    public Color getColor() {
        return color;
    }

    /**
     * Converts a plain text string to HTML.
     * If the text string is already HTML, then it is simply returned.
     *
     * @param s
     * @return HTML
     */
    private String makeHTML( String s ) {
        String htmlString = s;
        if ( !BasicHTML.isHTMLString( s ) ) {
            htmlString = "<html>" + s + "</html>";
        }
        return htmlString;
    }

    public void update() {
        imageGraphic.setImage( HTMLRenderer.render( color, font, html ) );//TODO if the user is calling update a lot,
        //todo you may want to reuse the same BufferedImage, instead of reallocating.
        setBoundsDirty();
        autorepaint();
    }

    private static class HTMLRenderer {

        public static BufferedImage render( Color color, Font font, String html ) {
            JLabel label = new JLabel( html );
            label.setFont( font );
            label.setForeground( color );
            View htmlView = BasicHTML.createHTMLView( label, html );

            Dimension dim = label.getPreferredSize();
            if ( dim.width == 0 || dim.height == 0 ) {
                return null;
            }

            BufferedImage image = new BufferedImage( dim.width, dim.height, BufferedImage.TYPE_INT_ARGB );
            final Graphics2D g = image.createGraphics();
            g.setColor( new Color( 255, 255, 255, 0 ) );//transparent background
            g.setRenderingHint( RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON );
            g.setRenderingHint( RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY );
            g.setRenderingHint( RenderingHints.KEY_COLOR_RENDERING, RenderingHints.VALUE_COLOR_RENDER_QUALITY );
            g.setRenderingHint( RenderingHints.KEY_STROKE_CONTROL, RenderingHints.VALUE_STROKE_PURE );
//            g.setRenderingHint( RenderingHints.KEY_RENDERING, RenderingHints.VALUE_COLOR_RENDER_QUALITY );//this fails.
            g.setRenderingHint( RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_ON );
            Rectangle s = new Rectangle( dim );
            RectangleUtils.fillRect(g, s);
            g.setClip( s );
            htmlView.paint( g, s );
            //the label should go out of scope, no harm done...
            return image;
        }
    }
}
