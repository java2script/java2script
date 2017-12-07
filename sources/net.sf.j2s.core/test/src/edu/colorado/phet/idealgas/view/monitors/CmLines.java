// Copyright 2002-2011, University of Colorado

/**
 * Class: CmLines
 * Package: edu.colorado.phet.idealgas.view.monitors
 * Author: Another Guy
 * Date: Sep 17, 2004
 */
package edu.colorado.phet.idealgas.view.monitors;

import edu.colorado.phet.common.phetcommon.util.SimpleObserver;
import edu.colorado.phet.common.phetcommon.view.util.RectangleUtils;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetGraphic;
import edu.colorado.phet.idealgas.model.Box2D;
import edu.colorado.phet.idealgas.model.HeavySpecies;
import edu.colorado.phet.idealgas.model.IdealGasModel;
import edu.colorado.phet.idealgas.model.LightSpecies;

import java.awt.*;
import java.awt.geom.Point2D;
import java.awt.geom.Rectangle2D;

public class CmLines extends PhetGraphic implements SimpleObserver {
    private Point2D heavyCm;
    private Point2D lightCm;
    private Box2D box;
    private double boxLeftEdge;
    private double boxLowerEdge;
    private Stroke cmStroke = new BasicStroke( 3.0f );
    private Rectangle2D.Double heavyCmYLocLine = new Rectangle2D.Double();
    private Rectangle2D.Double heavyCmXLocLine = new Rectangle2D.Double();
    private Rectangle2D.Double lightCmYLocLine = new Rectangle2D.Double();
    private Rectangle2D.Double lightCmXLocLine = new Rectangle2D.Double();
    private double lineLength = 30;
    private int lineThickness = 4;

    public CmLines( Component component, IdealGasModel model ) {
        super( component );
        this.box = model.getBox();
        model.addObserver( this );
        update();

        setIgnoreMouse( true );
    }

    @Override
		protected Rectangle determineBounds() {
        double minX = boxLeftEdge - lineLength / 2;
        double maxY = boxLowerEdge + lineLength / 2;
        double minYLight = Math.min( lightCmYLocLine.getMinY(), lightCmYLocLine.getMinY() );
        double maxXLight = Math.max( lightCmYLocLine.getMaxX(), lightCmYLocLine.getMaxX() );
        double minYHeavy = Math.min( heavyCmYLocLine.getMinY(), heavyCmYLocLine.getMinY() );
        double maxXHeavy = Math.max( heavyCmYLocLine.getMaxX(), heavyCmYLocLine.getMaxX() );
        double minY = Math.min( minYLight, minYHeavy );
        double maxX = Math.max( maxXLight, maxXHeavy );

        shapeRect.x = (int) minX;
        shapeRect.y = (int) minY;
        shapeRect.width = (int) (maxX - minX);
        shapeRect.height = (int) (maxY - minY);
        return shapeRect;
    }

    @Override
		public void update() {
        heavyCm = HeavySpecies.getCm();
        lightCm = LightSpecies.getCm();
        boxLeftEdge = box.getMinX();
        boxLowerEdge = box.getMaxY();

        lightCmYLocLine.setFrameFromCenter( boxLeftEdge, lightCm.getY(),
                                            boxLeftEdge + lineLength / 2, lightCm.getY() + lineThickness / 2 );
        lightCmXLocLine.setFrameFromCenter( lightCm.getX(), boxLowerEdge,
                                            lightCm.getX() + lineThickness / 2, boxLowerEdge + lineLength / 2 );

        heavyCmYLocLine.setFrameFromCenter( boxLeftEdge, heavyCm.getY(),
                                            boxLeftEdge + lineLength / 2, heavyCm.getY() + lineThickness / 2 );
        heavyCmXLocLine.setFrameFromCenter( heavyCm.getX(), boxLowerEdge,
                                            heavyCm.getX() + lineThickness / 2, boxLowerEdge + lineLength / 2 );

        setBoundsDirtyOpt();
        repaint();
    }

    @Override
		public void paint( Graphics2D g2 ) {
        saveGraphicsState( g2 );
        g2.setStroke( cmStroke );
        if( lightCm.getY() != 0 ) {
            Color oldColor = g2.getColor();
            g2.setColor( Color.red );
            RectangleUtils.fillRect2D(g2, lightCmYLocLine );
            RectangleUtils.fillRect2D(g2, lightCmXLocLine );
            g2.setColor( oldColor );
        }
        if( heavyCm.getY() != 0 ) {
            Color oldColor = g2.getColor();
            g2.setColor( Color.blue );
            RectangleUtils.fillRect2D(g2, heavyCmYLocLine );
            RectangleUtils.fillRect2D(g2, heavyCmXLocLine );
            g2.setColor( oldColor );
        }
        restoreGraphicsState();
    }
}
