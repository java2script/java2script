// Copyright 2002-2011, University of Colorado

/**
 * Class: PressureDialGauge
 * Class: edu.colorado.phet.idealgas.view.monitors
 * User: Ron LeMaster
 * Date: Sep 28, 2004
 * Time: 3:40:04 PM
 */
package edu.colorado.phet.idealgas.view.monitors;

import edu.colorado.phet.common.phetcommon.util.SimpleObserver;
import edu.colorado.phet.common.phetcommon.view.util.PhetFont;
import edu.colorado.phet.common.phetcommon.view.util.RectangleUtils;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetShapeGraphic;
import edu.colorado.phet.idealgas.IdealGasConfig;
import edu.colorado.phet.idealgas.IdealGasResources;
import edu.colorado.phet.idealgas.coreadditions.ScalarObservable;
import edu.colorado.phet.idealgas.instrumentation.DialGauge;
import edu.colorado.phet.idealgas.model.PressureSensingBox;

import java.awt.*;
import java.awt.geom.Point2D;
import java.awt.geom.Rectangle2D;
import java.text.DecimalFormat;

public class PressureDialGauge extends PhetShapeGraphic 
implements SimpleObserver { // BH added
    private PressureSensingBox box;
    private double radius = 50;
    private double stemLength = 15;
    private double stemThickness = 10;
    private DialGauge pressureGauge;
    private Point2D.Double center;
    private Rectangle2D.Double stem;
    private Font font = new PhetFont( Font.BOLD, 10 );
    private DecimalFormat numberFormat;

    private long updatePeriod = 200;

    public PressureDialGauge( PressureSensingBox box, Component component, Point attachmentPt ) {
        super( component );
        this.box = box;
        box.addObserver(this);

        center = new Point2D.Double( attachmentPt.getX() + radius + stemLength, attachmentPt.getY() );
        numberFormat = new DecimalFormat( "#0.00" );
        pressureGauge = new DialGauge( new ObservablePressureBox( updatePeriod ), component,
                                       center.getX(), center.getY(),
                                       radius * 2, 0, IdealGasConfig.MAX_GAUGE_PRESSURE, IdealGasResources.getString("pressure-gauge.title"), IdealGasResources.getString("pressure-gauge.units"),
                                       font, numberFormat );
        pressureGauge.setBackground( new Color( 230, 255, 230 ) );
        stem = new Rectangle2D.Double( box.getMaxX(), center.getY() - stemThickness / 2,
                                       stemLength, stemThickness );

        setIgnoreMouse( true );
    }

		@Override
		public void update() { // BH added; prior to this, update was through nonchange of Gravity.stepInTime()
			pressureGauge.update();
		}

		@Override
		public void paint( Graphics2D g ) {
        saveGraphicsState( g );
        g.setColor( IdealGasConfig.COLOR_SCHEME.pressureGaugeNeckColor );
        RectangleUtils.fillRect2D(g, stem );
        pressureGauge.paint( g );
        restoreGraphicsState();
    }

    @Override
		protected Rectangle determineBounds() {
        return pressureGauge.getBounds();
    }

    //---------------------------------------------------------------------------------
    // Inner classes
    //---------------------------------------------------------------------------------

    /**
     * A ScalarObservable that reports the pressure in the box
     */
    private class ObservablePressureBox extends ScalarObservable implements SimpleObserver {
        private long notificationPeriod = 0;
        private long lastNotificationTime;

        public ObservablePressureBox( long notificationPeriod ) {
            this.notificationPeriod = notificationPeriod;
            box.addObserver( this );
        }

        @Override
				public double getValue() {
            return box.getPressure();
        }

        @Override
				public void update() {
            long now = System.currentTimeMillis();
            if( now - lastNotificationTime > notificationPeriod ) {
                notifyObservers();
                lastNotificationTime = now;
            }
        }
    }

}
