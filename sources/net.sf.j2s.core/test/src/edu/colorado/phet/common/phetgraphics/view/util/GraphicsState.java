// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 54200 $
 * Date modified : $Date: 2011-07-18 19:45:40 -0500 (Mon, 18 Jul 2011) $
 */
package edu.colorado.phet.common.phetgraphics.view.util;

import java.awt.Color;
import java.awt.Composite;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.Paint;
import java.awt.RenderingHints;
import java.awt.Shape;
import java.awt.Stroke;
import java.awt.geom.AffineTransform;

import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetGraphics2D;

/**
 * A utilitye class for saving and restoring the state of Graphics2D objects
 *
 * @author ?
 * @version $Revision: 54200 $
 */
public class GraphicsState {
    private Graphics2D g2;
    private RenderingHints renderingHints;
    private Paint paint;
    private Color color;
    private Stroke stroke;
    private Composite composite;
    private AffineTransform transform;
    private Font font;
    private Shape clip;
    private Color background;

    public GraphicsState( Graphics2D graphics2D ) {
        this.g2 = graphics2D;

        if ( g2 instanceof PhetGraphics2D ) {
            PhetGraphics2D phetGraphics2D = (PhetGraphics2D) g2;
            phetGraphics2D.pushState();
        }
        else {
            renderingHints = graphics2D.getRenderingHints();
            paint = graphics2D.getPaint();
            color = graphics2D.getColor();
            stroke = graphics2D.getStroke();
            composite = graphics2D.getComposite();
            transform = graphics2D.getTransform();
            font = graphics2D.getFont();
            clip = graphics2D.getClip();
            background = graphics2D.getBackground();
        }
    }

    /**
     * Sets all set-able attributes of the graphics. Note that paintMode/XORmode are
     * not get-able from the graphics, so we cannot restore the mode if it has
     * been changed between g = new GraphicsState() and g.restoreGraphics().
     */
    public void restoreGraphics() {

        if ( g2 instanceof PhetGraphics2D ) {
            PhetGraphics2D phetGraphics2D = (PhetGraphics2D) g2;
            phetGraphics2D.popState();
        }
        else {
            if ( g2.getRenderingHints() != renderingHints ) {
                g2.setRenderingHints( renderingHints );
            }
            if ( g2.getPaint() != paint ) {
                g2.setPaint( paint );
            }
            if ( g2.getColor() != color ) {
                g2.setColor( color );
            }
            if ( g2.getStroke() != stroke ) {
                g2.setStroke( stroke );
            }
            if ( g2.getComposite() != composite ) {
                g2.setComposite( composite );
            }
            if (!g2.getTransform().equals(transform)) { // BH
                g2.setTransform( transform );
            }
            if ( g2.getFont() != font ) {
                g2.setFont( font );
            }
            if ( g2.getClip() != clip ) {
                g2.setClip( clip );
            }
            if ( g2.getBackground() != background ) {
                g2.setBackground( background );
            }
        }
    }
}
