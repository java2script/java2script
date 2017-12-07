// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.view;

import java.awt.Color;
import java.awt.Component;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;

import javax.swing.border.LineBorder;

/**
 * The PhetLineBorder is PhET's default border for control panel components, see #2476.
 *
 * @author Sam Reid
 */
public class PhetLineBorder extends LineBorder {

    private static final int CORNER_RADIUS = 8; // radius of the rounded corners (aka arc width)

    public PhetLineBorder() {
        this( Color.black );
    }

    public PhetLineBorder( Color color ) {
        super( color, 1, true );
    }

    @Override
    public void paintBorder( Component c, Graphics g, int x, int y, int width, int height ) {
        //Overrides to add antialiasing (otherwise looks terrible on Windows) and to curve the edges
        Graphics2D g2 = (Graphics2D) g;
        Object oldAntialiasHint = g2.getRenderingHint( RenderingHints.KEY_ANTIALIASING );
        Color oldColor = g2.getColor();
        g2.setColor( getLineColor() );
        g2.setRenderingHint( RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON );
        g2.drawRoundRect( x, y, width - 1, height - 1, CORNER_RADIUS, CORNER_RADIUS );
        g2.setColor( oldColor );
        g2.setRenderingHint( RenderingHints.KEY_ANTIALIASING, oldAntialiasHint );
    }
}
