// Copyright 2002-2011, University of Colorado

// Box2DGraphic

/*
 * User: Ron LeMaster
 * Date: Oct 18, 2002
 * Time: 10:55:17 AM
 */
package edu.colorado.phet.idealgas.view;

import edu.colorado.phet.common.phetcommon.util.SimpleObserver;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetShapeGraphic;
import edu.colorado.phet.common.phetgraphics.view.util.GraphicsUtil;
import edu.colorado.phet.idealgas.model.HollowSphere;

import java.awt.*;
import java.awt.geom.Ellipse2D;

public class HollowSphereGraphic extends PhetShapeGraphic implements SimpleObserver {

    private static Stroke s_defaultStroke = new BasicStroke( 2.0F );
    private static Color s_defaultColor = Color.GREEN;
    private static float s_sphereOpacity = 0.25f;

    private Ellipse2D.Double rep;
    private HollowSphere sphere;

    public HollowSphereGraphic( Component component, HollowSphere sphere ) {
        super( component, null, s_defaultColor, s_defaultStroke, s_defaultColor );
        this.sphere = sphere;
        sphere.addObserver( this );
        rep = new Ellipse2D.Double();
        setShape( rep );
        setStroke( s_defaultStroke );
        setColor( s_defaultColor );
        update();

        setIgnoreMouse( true );
    }

    @Override
		public void update() {
        rep.setFrameFromCenter( sphere.getPosition().getX(), sphere.getPosition().getY(),
                                sphere.getPosition().getX() + sphere.getRadius(),
                                sphere.getPosition().getY() + sphere.getRadius() );
        setShapeDirty();
        repaint();
    }

    @Override
		public void paint( Graphics2D g ) {
        saveGraphicsState( g );

        GraphicsUtil.setAntiAliasingOn( g );
        g.setStroke( s_defaultStroke );
        g.setColor( s_defaultColor );
        g.draw( rep );
        GraphicsUtil.setAlpha( g, s_sphereOpacity );
        g.fill( rep );

        if( sphere.contactPt != null ) {
            GraphicsUtil.setAlpha( g, 1 );
            g.setColor( Color.red );
            g.fillArc( (int)sphere.contactPt.getX() - 1, (int)sphere.contactPt.getY() - 1, 2, 2, 0, 360 );
        }

        restoreGraphicsState();
    }
}
