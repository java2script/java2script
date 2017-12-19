// Copyright 2002-2011, University of Colorado

/**
 * Class: WiggleMeGraphic
 * Package: edu.colorado.phet.idealgas.view
 * Author: Another Guy
 * Date: Sep 27, 2004
 */
package edu.colorado.phet.idealgas.view;

import edu.colorado.phet.common.phetcommon.model.BaseModel;
import edu.colorado.phet.common.phetcommon.model.ModelElement;
import edu.colorado.phet.common.phetcommon.view.graphics.Arrow;
import edu.colorado.phet.common.phetcommon.view.util.PhetFont;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.CompositePhetGraphic;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetMultiLineTextGraphic;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetShapeGraphic;
import edu.colorado.phet.idealgas.IdealGasConfig;
import edu.colorado.phet.idealgas.IdealGasResources;

import java.awt.*;
import java.awt.geom.Point2D;

public class WiggleMeGraphic extends CompositePhetGraphic {

    private BaseModel model;
    Font font = new PhetFont( 16,true);
    private Color color = IdealGasConfig.HELP_COLOR;
    private ModelElement wiggleMeModelElement;

    public WiggleMeGraphic( final Component component, final Point2D.Double startLocation, BaseModel model ) {
        super( component );
        this.model = model;

        PhetMultiLineTextGraphic textGraphic = new PhetMultiLineTextGraphic( component, font,
                                                                             new String[]{IdealGasResources.getString( "WiggleMe.Pump_the" ),
                                                                                     IdealGasResources.getString( "WiggleMe.handle!" )}, color );
        addGraphic( textGraphic, 0 );
        Arrow arrow = new Arrow( new Point2D.Double( 0, 0 ),
                                 new Point2D.Double( 15, 12 ), 6, 6, 2, 100, false );
        PhetShapeGraphic arrowGraphic = new PhetShapeGraphic( component, arrow.getShape(), color );
        arrowGraphic.setLocation2( 80, 20 );
        setLocation2((int) startLocation.getX(),  (int) startLocation.getY()); // BH otherwise we have to wait for a clock tick

        addGraphic( arrowGraphic, 1 );

        wiggleMeModelElement = new ModelElement() {
            double cnt = 0;

            @Override
						public void stepInTime( double dt ) {
                cnt += 0.1;
                setLocation2( (int)( startLocation.getX() + 30 * Math.cos( cnt ) ),
                             (int)( startLocation.getY() + 15 * Math.sin( cnt ) ) );
                setBoundsDirty();
                repaint();
            }

						@Override
						public int getType() {
							return TYPE_OTHER;
						}
        };
    }

    public void start() {
        model.addModelElement( wiggleMeModelElement );
    }

    public void kill() {
        model.removeModelElement( wiggleMeModelElement );
    }
}
