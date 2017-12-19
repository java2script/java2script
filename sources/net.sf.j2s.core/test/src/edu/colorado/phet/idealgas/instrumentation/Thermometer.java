// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: cmalley $
 * Revision : $Revision: 51147 $
 * Date modified : $Date: 2011-04-25 15:04:52 -0500 (Mon, 25 Apr 2011) $
 */
package edu.colorado.phet.idealgas.instrumentation;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Component;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.event.MouseEvent;
import java.awt.geom.Ellipse2D;
import java.awt.geom.Point2D;
import java.awt.geom.Rectangle2D;
import java.awt.geom.RoundRectangle2D;
import java.util.Hashtable;
import java.util.Map;

import javax.swing.JOptionPane;

import edu.colorado.phet.common.phetcommon.application.PhetApplication;
import edu.colorado.phet.common.phetcommon.view.PhetColorScheme;
import edu.colorado.phet.common.phetcommon.view.util.PhetFont;
import edu.colorado.phet.common.phetcommon.view.util.RectangleUtils;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetGraphic;
import edu.colorado.phet.common.phetgraphics.view.util.GraphicsState;
import edu.colorado.phet.common.phetgraphics.view.util.GraphicsUtil;
import edu.colorado.phet.idealgas.IdealGasConfig;
import edu.colorado.phet.idealgas.IdealGasResources;
import edu.colorado.phet.idealgas.model.IdealGasModel;

public class Thermometer extends PhetGraphic {

    //----------------------------------------------------------------
    // Class<?> data
    //----------------------------------------------------------------

    private static Color s_color = PhetColorScheme.RED_COLORBLIND;
    private static Color s_outlineColor = IdealGasConfig.COLOR_SCHEME.thermometerOutline;

    //----------------------------------------------------------------
    // Instance data and methods
    //----------------------------------------------------------------

    private BarGauge gauge;
    private Ellipse2D.Double bulb;
//    private NumberFormat formatter = new DecimalFormat( "#0" ); // BH optimized out
    private Point2D.Double location;
    private double scale;
    private double maxScreenLevel;
    private double thickness;
    private double value; // milliKelvin
    private Font font = new PhetFont( Font.BOLD, 10 );
    private FontMetrics fontMetrics;
    private double rectBorderThickness = 2;
    private RoundRectangle2D.Double readoutRect = new RoundRectangle2D.Double();
    private RoundRectangle2D.Double innerRect = new RoundRectangle2D.Double();
    private BasicStroke rectStroke = new BasicStroke( 3 );
    private float columnStrokeWidth = 1.5f;
    private BasicStroke columnStroke = new BasicStroke( columnStrokeWidth );
    private Color rectColor = Color.yellow;
    private int readoutWidth, readoutHeight;
    private float readoutRectStrokeWidth = 0.5f;
    private BasicStroke readoutRectStroke = new BasicStroke( readoutRectStrokeWidth );
    private BasicStroke oneStroke = new BasicStroke( 1 );
;


    /**
     * @param component
     * @param location
     * @param maxScreenLevel
     * @param thickness
     * @param isVertical
     * @param minLevel
     * @param maxLevel
     */
    public Thermometer( Component component, Point2D.Double location, double maxScreenLevel, double thickness,
                        boolean isVertical, double minLevel, double maxLevel ) {
        super( component );
        gauge = new BarGauge( location, maxScreenLevel, s_color, thickness, isVertical,
                              minLevel, maxLevel );
        gauge.setOutlineColor( s_outlineColor );
        bulb = new Ellipse2D.Double( location.x - thickness / 2, location.y + maxScreenLevel - thickness * 0.1,
                                     thickness * 2, thickness * 2 );
        this.location = location;
        this.thickness = thickness;
        scale = maxScreenLevel / maxLevel;
        this.maxScreenLevel = maxScreenLevel;
        fontMetrics = component.getFontMetrics( font );
        readoutWidth = fontMetrics.stringWidth( "XXXXXXX" );
        readoutHeight = fontMetrics.getHeight() + fontMetrics.getMaxDescent();

//        boundingRect = new Rectangle2D.Double( location.getX(), location.getY(),
//                                               readoutWidth + rectBorderThickness,
//                                               maxScreenLevel + bulb.getHeight() );
//
        super.setIgnoreMouse( false ); // BH
    }

    public void setFillColor(Color c) {  // BH
    	gauge.setFillColor(c);
		}


    /**
     * @param location
     */
    public void setLocation( Point2D.Double location ) {
        gauge.setLocation( location );
        this.location.setLocation( location );
//        boundingRect = new Rectangle2D.Double( location.getX(), location.getY(),
//                                               readoutWidth + rectBorderThickness,
//                                               maxScreenLevel + bulb.getHeight() );
    }

    public void setValue( double value ) {
        this.value = Double.isNaN( value ) ? 0 : value;
        gauge.setLevel( this.value );
    }

    
    private Rectangle2D.Double prec = new Rectangle2D.Double();
		private String units = IdealGasResources.getString( "temperature.units.abbreviation" );
//		private String lastStr = null;
//		private double lastval = Double.MIN_VALUE;
		private int fontHeight;
		private String temperatureStr;
    
    @Override
		public void paint( Graphics2D g ) {
        GraphicsState gs = new GraphicsState( g );
        GraphicsUtil.setAntiAliasingOn( g );
        g.setFont( font );
        int yLoc = Math.max( (int) ( location.getY() + maxScreenLevel - readoutHeight - value * scale ),
                             (int) ( location.getY() - readoutHeight ) );

        readoutRect.setRoundRect( location.getX() + thickness + columnStrokeWidth * 2,
                                  yLoc - rectBorderThickness,
                                  readoutWidth + rectBorderThickness * 2,
                                  readoutHeight + rectBorderThickness * 2,
                                  4, 4 );
        innerRect.setRoundRect( location.getX() + thickness + columnStrokeWidth * 2 + rectBorderThickness,
                                yLoc,
                                readoutWidth,
                                readoutHeight,
                                4, 4 );

        g.setColor( rectColor );
        g.setStroke( rectStroke );
        g.draw( readoutRect );
        g.setColor( s_outlineColor );
        g.setStroke( readoutRectStroke );
        g.draw( readoutRect );
        g.setColor( rectColor );
        g.fill( readoutRect );

        g.setColor( Color.white );
        g.fill( innerRect );
        g.setStroke( oneStroke );
        g.setColor( Color.black );
        g.draw( innerRect );

        double v = Double.isNaN( value ) ? 0 : value / 1000;     
        temperatureStr = Math.round(v) + " " + units; // BH Java fix #15 space needed prior to units, as for pressure
        //String temperatureStr = (v == lastval ? lastStr : (lastStr = formatter.format( lastval = v ) + units));
        g.setColor( Color.black );
        
        int strLocY = (int) innerRect.getMinY() + getFontHeight();
        g.drawString( temperatureStr, (int) innerRect.getMaxX() - 5 - getFontWidth(temperatureStr), strLocY );

        GraphicsUtil.setAntiAliasingOn( g );
        g.setStroke( columnStroke );
        gauge.paint( g );
        g.setColor( s_color );
        g.fill( bulb );
        g.setColor( s_outlineColor );
        g.draw( bulb );
        prec.x = gauge.frame.getMinX() + columnStrokeWidth;
        prec.y = gauge.frame.getMaxY() - 2;
        prec.width = gauge.frame.getWidth() - columnStrokeWidth;
        prec.height = 4;
        g.setColor( s_color );
        g.fill(prec);

        // Debug
//        g.setColor( Color.green );
//        g.draw( determineBounds() );

        gs.restoreGraphics();
    }

    private Map<String, Integer> dataMap = new Hashtable<String, Integer>();
    
    private int getFontWidth(String temperatureStr) {
    	Integer iw = dataMap.get(temperatureStr);
    	if (iw == null) {
    		int w = fontMetrics.stringWidth( temperatureStr);
    		dataMap.put(temperatureStr, Integer.valueOf(w));
    		return w;
    	}
    	return  iw.intValue();
		}

		private int getFontHeight() {
    	return (fontHeight == 0 ? (fontHeight = fontMetrics.getHeight()) : fontHeight);
		}

	@Override
	protected Rectangle determineBounds() {
		// boundingRect = new Rectangle2D.Double( location.getX(),
		// gauge.getBounds().getMinY(),
		localRect.x = (int) location.x;
		localRect.y = (int) location.y;
		localRect.width = (int) (readoutWidth	+ rectBorderThickness);
		localRect.height = (int) (maxScreenLevel + bulb.getHeight());
		shapeRect.x = Integer.MAX_VALUE;
		RectangleUtils.unionAdd(localRect, shapeRect);
		localRect.x = (int) readoutRect.getMinX();
		localRect.y = (int) (readoutRect.getMinY() - readoutRectStrokeWidth);
		localRect.width = (int) (readoutRect.width + 4 * readoutRectStrokeWidth);
		localRect.height = (int) readoutRect.height;
		RectangleUtils.unionAdd(localRect, shapeRect);
		return shapeRect;
//		double minX = Math.min(boundingRect.getMinX(), readoutRect.getMinX());
//		double minY = Math.min(boundingRect.getMinY(), readoutRect.getMinY()
//				- readoutRectStrokeWidth);
//		double w = Math.max(boundingRect.getMaxX(), readoutRect.getMaxX()) - minX
//				+ 4 * readoutRectStrokeWidth;
//		double h = Math.max(boundingRect.getMaxY(), readoutRect.getMaxY()) - minY;
//		boundingRect.setRect(minX, minY, w, h);
//		return RectangleUtils.toRectangle(boundingRect);
	}

	//BH new feature: adding settable temperature

  @Override
	public void fireMousePressed( MouseEvent e ) { // BH new feature 
    super.fireMousePressed( e );
    setTempByUser();
  }

	/**
	 * User can input number or number+space+units or number+units, 
	 * where units are anything starting with C, K, oC, oK, ignoring case
	 * 
	 * @author Bob Hanson
	 * 
	 */
	private void setTempByUser() {
		int t = 0;
		String s = "Enter a new temperature to set in Kelvin or Celcius";
		try {
			// cancel or nonnumeric will cause a throwable error
			s = JOptionPane.showInputDialog(s, temperatureStr).toLowerCase();
			if (temperatureStr.equalsIgnoreCase(s))
				return;
			s = s.replace('o', ' ');
			boolean isKelvin = (s.indexOf("k") >= 0);
			boolean isCelcius = (s.indexOf("c") >= 0);
			if (isCelcius)
				s = s.substring(0, s.indexOf("c"));
			else if (isKelvin)
				s = s.substring(0, s.indexOf("k"));
			t = Integer.parseInt(s.trim());
			if (isCelcius)
				t += 273;
		} catch (Throwable e) {
			// ignore
		}
		if (t >= 0)
			((IdealGasModel) PhetApplication.getInstance().getActiveModule()
					.getModel()).setConstantTemp((int) (t * 1000 / IdealGasConfig.TEMPERATURE_SCALE_FACTOR));
	}

}
