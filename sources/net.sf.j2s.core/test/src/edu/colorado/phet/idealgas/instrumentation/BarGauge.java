// Copyright 2002-2011, University of Colorado

/**
 * Created by IntelliJ IDEA.
 * User: Another Guy
 * Date: Nov 15, 2002
 * Time: 8:58:50 AM
 * To change this template use Options | File Templates.
 */
package edu.colorado.phet.idealgas.instrumentation;

import java.awt.*;
import java.awt.geom.Point2D;
import java.awt.geom.Rectangle2D;

import edu.colorado.phet.common.phetcommon.view.util.RectangleUtils;

public class BarGauge extends AbstractGauge {

    private Rectangle2D.Double bar;
    Rectangle2D.Double frame;
    private Color color;
    private boolean isVertical;
    private double offset;
    private double scale;
    private Point2D location;
    private double maxScreenLevel;
    private Color outlineColor = Color.black, fillColor;


    /**
     * @param location
     * @param color
     * @param thickness
     * @param isVertical
     */
    public BarGauge( Point2D.Double location, double maxScreenLevel, Color color,
                     double thickness, boolean isVertical,
                     double minLevel, double maxLevel ) {
        this.location = location;
        this.maxScreenLevel = maxScreenLevel;
        this.color = color;
        double barWidth = 0;
        double barHeight = 0;
        double frameWidth = 0;
        double frameHeight = 0;
        scale = maxScreenLevel / ( maxLevel - minLevel );
        offset = minLevel * scale;
        this.isVertical = isVertical;
        if( isVertical ) {
            barWidth = thickness;
            frameWidth = thickness;
            frameHeight = maxScreenLevel;
        }
        else {
            barHeight = thickness;
            frameWidth = maxScreenLevel;
            frameHeight = thickness;
        }
        bar = new Rectangle2D.Double( location.getX(), location.getY(), barWidth, barHeight );
        frame = new Rectangle2D.Double( location.getX(), location.getY(), frameWidth, frameHeight );
    }

//    /**
//     * @return
//     */
//    public Rectangle getBounds() {
//        return frame.getBounds();
//    }

    /**
     * @param g
     */
    public void paint( Graphics2D g ) {
        Color oldColor = g.getColor();
        if (fillColor != null) {
        	g.setColor( fillColor );
        	RectangleUtils.fillRect2D(g, frame);
        }
        g.setColor( color );
        RectangleUtils.drawRect2D(g, bar);
        RectangleUtils.fillRect2D(g, bar);
        g.setColor( outlineColor );
        RectangleUtils.drawRect2D(g, frame);
        g.setColor( oldColor );
    }

    public void setOutlineColor( Color outlineColor ) {
        this.outlineColor = outlineColor;
    }

    public void setFillColor( Color c ) {
      fillColor = c; // BH 
  }

    public void setLevel( double level ) {

        double screenLevel = Math.min( Math.max( offset + scale * level, 0 ), maxScreenLevel );
        if( isVertical ) {
            bar.x = location.getX();
            bar.y = location.getY() + maxScreenLevel - screenLevel;
            bar.height = screenLevel;
        }
        else {
            // todo: the hard-coded 1000 here is terrible!!!
            double newMaxX = bar.getMaxX() - level / 1000;
            bar.width = newMaxX;
            // BH this cannot be right:
           // bar.setRect( bar.getMinX(), bar.getMaxY(), newMaxX, bar.getMaxY() );
           
        }
    }

    public void setLocation( Point2D.Double location ) {
        this.location.setLocation( location );
    }
}
