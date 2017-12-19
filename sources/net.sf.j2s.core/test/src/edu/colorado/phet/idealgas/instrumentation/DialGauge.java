// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 47772 $
 * Date modified : $Date: 2011-01-07 13:53:07 -0600 (Fri, 07 Jan 2011) $
 */
package edu.colorado.phet.idealgas.instrumentation;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Component;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.Shape;
import java.awt.Stroke;
import java.awt.geom.AffineTransform;
import java.awt.geom.Ellipse2D;
import java.awt.geom.Rectangle2D;
import java.awt.geom.RoundRectangle2D;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.Hashtable;
import java.util.Map;

import edu.colorado.phet.common.phetcommon.math.MathUtil;
import edu.colorado.phet.common.phetcommon.view.util.PhetFont;
import edu.colorado.phet.common.phetcommon.view.util.RectangleUtils;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.CompositePhetGraphic;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetShapeGraphic;
import edu.colorado.phet.common.phetgraphics.view.util.GraphicsUtil;
import edu.colorado.phet.idealgas.coreadditions.ScalarObservable;
import edu.colorado.phet.idealgas.coreadditions.ScalarObserver;

/**
 * Dial Gauge
 * <p/>
 * A round dial gauge with a red needle. Also displays a numberic value.
 */
public class DialGauge extends CompositePhetGraphic implements ScalarObserver {

    //-----------------------------------------------------------------
    // Class<?> data
    //-----------------------------------------------------------------
    private static Font s_defaultFont;
    private static NumberFormat s_defaultFormatter = new DecimalFormat( "#0.0" );

    private ScalarObservable dataSource;
    private String title;
    private String units;
    private Component component;
    private double x;
    private double y;
    private double diam;
    private double min;
    private double max;
    private NeedleGraphic needleGraphic;
    private FaceGraphic faceGraphic;
    private Font font;
    private NumberFormat numberFormat;

    private double needleLength = 0.5;
    private double datum = Double.MAX_VALUE;
    private Color backgroundColor = new Color( 245, 255, 250 );
		private float datumFactor;

    /**
     * @param dataSource The ScalarObservable object from which the gauge gets its data
     * @param component
     * @param x          x location of the center of the dial
     * @param y          y location of the center of the dial
     * @param diam
     * @param min        minimum value the dial will display. This corresponds to the most counter-clockwise
     *                   tick mark
     * @param max        maximum value the dial will display. This corresponds to the most clockwise tick mark
     * @param title      String printed near top of dial
     * @param units      String printed after digital readout
     */
    public DialGauge( ScalarObservable dataSource, Component component,
                      double x, double y, double diam, double min, double max,
                      String title, String units ) {
        this( dataSource, component, x, y, diam, min, max, title, units, null, s_defaultFormatter );
    }

    /**
     * @param dataSource The ScalarObservable object from which the gauge gets its data
     * @param component
     * @param x          x location of the center of the dial
     * @param y          y location of the center of the dial
     * @param diam
     * @param min        minimum value the dial will display. This corresponds to the most counter-clockwise
     *                   tick mark
     * @param max        maximum value the dial will display. This corresponds to the most clockwise tick mark
     * @param title      String printed near top of dial
     * @param units      String printed after digital readout
     * @param font
     */
    public DialGauge( ScalarObservable dataSource, Component component,
                      double x, double y, double diam, double min, double max,
                      String title, String units, Font font, NumberFormat numberFormat ) {
        this.dataSource = dataSource;
        this.title = title;
        this.units = units;
        this.font = font;
        this.numberFormat = numberFormat;
        this.datumFactor = (float) Math.pow(10, numberFormat.getMaximumFractionDigits());
        dataSource.addObserver( this );
        this.component = component;
        this.x = x;
        this.y = y;
        this.diam = diam;
        this.min = min;
        this.max = max;
        faceGraphic = new FaceGraphic();
        this.addGraphic( faceGraphic );
        needleGraphic = new NeedleGraphic();
        this.addGraphic( needleGraphic );

        update();
    }

    @Override
		public void update() {
        double newDatum = dataSource.getValue();
        if( datum != newDatum ) {
            datum = newDatum;
            double needleDatum = Math.max( Math.min( datum, max ), min );
            double p = ( max - needleDatum ) / ( max - min );
            double theta = -( ( Math.PI * 5 / 4 ) + ( Math.PI * 3 / 2 ) * p ) - Math.PI / 2;
            needleGraphic.update( theta );
            faceGraphic.repaint();
        }
    }

    public void setBackground( Color color ) {
        backgroundColor = color;
    }

    private class NeedleGraphic extends PhetShapeGraphic {
        private Rectangle.Double needle;
        // Ratio of needle on either side of pivot point
        private double r = 0.2;
        private double l;
        private final AffineTransform needleTx = new AffineTransform();// BH
        private Ellipse2D.Double pivot = new Ellipse2D.Double();

        NeedleGraphic() {
            super( component, null, Color.red );
            needle = new Rectangle2D.Double();
            l = diam * needleLength;
            needle.x = x - l * r;
            needle.y = y - 1;
            needle.width = l;
            needle.height = 2;
            setShape( needle );
            setType(TYPE_RECT2D);
        }

        @Override
				public void paint( Graphics2D g ) {
            saveGraphicsState( g );
            GraphicsUtil.setAntiAliasingOn( g );
            g.transform( needleTx );
            paintType( g ); 
            g.setColor( Color.black );
            g.fill( pivot );
            restoreGraphicsState();
        }

        void update( double theta ) {
            MathUtil.setToRotation(needleTx, theta, x, y); // BH optimized out new AffineTransform
            pivot.setFrameFromCenter( x, y, x + 2, y + 2 );
            repaint();
        }
    }

    private class FaceGraphic extends PhetShapeGraphic {
        private Rectangle2D.Double tickMark;
				private RoundRectangle2D labelRect = new RoundRectangle2D.Double( 0, 0, 0, 0, 3, 3 );
				private double lastDatum = Double.MAX_VALUE;
				private String datumString;
				private float[] ptDatum;
				private float titleWidth;
				private Stroke stroke3 = new BasicStroke( 3f ) ;
				private Stroke strokeThin = new BasicStroke( 0.5f );
				private AffineTransform tx0, tx1;
        private int numTickMarks = 19;
        private double tickSpace = ( Math.PI * 6 / 4 ) / ( numTickMarks - 1 );

        FaceGraphic() {
            super( component, null, backgroundColor, new BasicStroke( 5 ), new Color( 80, 80, 40 ) );
            Shape face = new Ellipse2D.Double( x - diam / 2, y - diam / 2, diam, diam );
            super.setShape( face );
            tickMark = new Rectangle2D.Double( x + diam * 3 / 8, y - 1, diam / 16, 2 );
        }


        @Override
				public void paint( Graphics2D g ) {
            saveGraphicsState( g );
            setBackground( backgroundColor );
            GraphicsUtil.setAntiAliasingOn( g );
            paintType( g );

            // Paint tick marks
            g.setColor( Color.black );
            AffineTransform orgTx = g.getTransform();
            if (tx0 == null) {
            	tx0 = MathUtil.setToRotation(new AffineTransform(), Math.PI * 3 / 4, x, y);
            	tx1 = MathUtil.setToRotation(new AffineTransform(), tickSpace, x, y);
            }
            g.transform(tx0);
            for( double theta = Math.PI * 3 / 4; theta <= Math.PI * 9 / 4 + tickSpace / 2; theta += tickSpace ) {
                RectangleUtils.fillRect2D(g, tickMark);
                g.transform(tx1); // BH optimized out new AffineTransform
            }
            g.setTransform( orgTx );

            // Paint values on min and max tick marks
            
            // BH avoiding static call -- problem when arabic
            if (font == null)
            	font = new PhetFont( Font.BOLD, 8 );
            g.setFont( font );
          	FontMetrics fm = g.getFontMetrics();

            // Paint value, and units label
            RoundRectangle2D rect = labelRect ;
            rect.setFrameFromCenter( x, y + 10, x + 30, y + 17 );
            g.setColor( Color.white );
            g.fill( rect );
            g.setColor( Color.yellow );
            g.setStroke( stroke3  );
            g.draw( rect );
            g.setColor( Color.black );
            g.setStroke( strokeThin  );
            g.draw( rect );
            if (datum != lastDatum) {
            	lastDatum = datum;
            	datumString = getDatumString(fm);            	
              ptDatum = getDatumPoint();
            }
            g.setColor( Color.black );
            g.drawString(datumString, ptDatum[0], ptDatum[1]);

            // Paint the title
            if (titleWidth == 0)
            	titleWidth = fm.stringWidth(title);
            g.setColor( Color.black );
            g.drawString( title,
                          (float)x - titleWidth / 2,
                          (float)( y - ( ( diam / 4 ) * radRatio ) ) );

            restoreGraphicsState();
        }
    }

    private Map<String, Object> dataMap = new Hashtable<String, Object>();
		private long intDatum;
    
    private final static float radRatio = .6f;

		public String getDatumString(FontMetrics fm) {
			intDatum = Math.round(datum * datumFactor);
     	String datumString = (String) dataMap.get("#" + intDatum); 
     	if (datumString == null) {
     		datumString = numberFormat.format( datum ) + " " + units;
     		dataMap.put("#" + intDatum, datumString);     	
     		int datumWidth = fm.stringWidth(datumString);
     		dataMap.put("@" + intDatum, new float[] {(float) (x - datumWidth / 2f), (float)(( y + ( ( diam / 4 ) * radRatio ) )  ) });
     	}
			return datumString;
		}
		
		public float[] getDatumPoint() {
			return (float[]) dataMap.get("@" + intDatum);
		}


}
