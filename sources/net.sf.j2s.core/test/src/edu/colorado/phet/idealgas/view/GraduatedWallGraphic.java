// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 47772 $
 * Date modified : $Date: 2011-01-07 13:53:07 -0600 (Fri, 07 Jan 2011) $
 */
package edu.colorado.phet.idealgas.view;

import edu.colorado.phet.common.phetgraphics.view.util.GraphicsState;
import edu.colorado.phet.common.phetcommon.view.util.PhetFont;
import edu.colorado.phet.common.phetcommon.view.util.RectangleUtils;
import edu.colorado.phet.idealgas.collision.Wall;

import java.awt.*;
import java.awt.geom.Rectangle2D.Double;

/**
 * GraduatedWallGraphic
 *
 * @author Ron LeMaster
 * @version $Revision: 47772 $
 */
public class GraduatedWallGraphic extends WallGraphic {

    private int minorTickInterval = 5;
    private int majorTickInterval = 25;
    private Color backgroundColor = new Color( 230, 230, 40 );
    private Stroke minorTickStroke = new BasicStroke( 1f );
    private Stroke majorTickStroke = new BasicStroke( 1f );
    private Font graduationFont = new PhetFont( Font.PLAIN, 10 );
    private Wall wall;

    public GraduatedWallGraphic( Wall wall, Component component, Paint fill, Paint borderPaint, int translationDirection ) {
        super( wall, component, fill, borderPaint, translationDirection );
        this.wall = wall;
        setCursor( new Cursor( Cursor.N_RESIZE_CURSOR ) );
    }

    public GraduatedWallGraphic( Wall wall, Component component, Paint fill, int translationDirection ) {
        super( wall, component, fill, translationDirection );
        setCursor( new Cursor( Cursor.N_RESIZE_CURSOR ) );
    }

	/**
	 * Wall only should respond to the mouse if it is on the top edge of the wall
	 * 
	 * @param x
	 * @param y
	 * @return
	 */
	@Override
	public boolean contains(int x, int y) {
		Double b = wall.getBoundsNoCopy();
		return (Math.abs(y - b.y) < 5 && RectangleUtils.containsXY(b, x, y));
	}


    /**
     * Wall only should respond to the mouse if it is on the top edge of the wall
     *
     * @param point
     * @return
     */
    @Override
		public boolean contains( Point point ) {
        return this.contains( point.x, point.y );
    }

    /**
     * Draws tick marks on the wall for measurement purposes
     *
     * @param g2
     */
    @Override
		public void paint( Graphics2D g2 ) {
        Rectangle bounds = getShape().getBounds();

        GraphicsState gs = new GraphicsState( g2 );
        paintType( g2 );
        g2.setColor( backgroundColor );
        RectangleUtils.fillRect(g2, bounds );
        g2.setColor( Color.black );

        // Draw minor ticks
        for( int i = 0; i < bounds.getHeight(); i += minorTickInterval ) {
            g2.setStroke( minorTickStroke );
            g2.drawLine( (int)bounds.getMinX(), (int)bounds.getMaxY() - i,
                         (int)bounds.getMinX() + 3, (int)bounds.getMaxY() - i );
            g2.drawLine( (int)bounds.getMaxX(), (int)bounds.getMaxY() - i,
                         (int)bounds.getMaxX() - 3, (int)bounds.getMaxY() - i );
        }

        // Draw major ticks
        for( int i = 0; i < bounds.getHeight(); i += majorTickInterval ) {
            g2.setStroke( majorTickStroke );
            g2.drawLine( (int)bounds.getMinX(), (int)bounds.getMaxY() - i,
                         (int)bounds.getMinX() + 5, (int)bounds.getMaxY() - i );
            g2.drawLine( (int)bounds.getMaxX(), (int)bounds.getMaxY() - i,
                         (int)bounds.getMaxX() - 5, (int)bounds.getMaxY() - i );
            if( i > 0 ) {
                String s = Integer.toString( i / ( majorTickInterval / minorTickInterval ) );
                g2.setFont( graduationFont );
                FontMetrics fm = g2.getFontMetrics();
                int sdx = fm.stringWidth( s ) / 2;
                int sdy = fm.getAscent() / 2;
                g2.drawString( s, (int)( bounds.getMinX() + bounds.getWidth() / 2 - sdx ), (int)bounds.getMaxY() - i + sdy );
            }
        }

        // Draw the border. Get the color from the parent class. This ensures that if
        // it's highlighted, we'll get the right color
        g2.setPaint( getBorder() );
        RectangleUtils.drawRect(g2, bounds );

        gs.restoreGraphics();
    }
}
