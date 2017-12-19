// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: cmalley $
 * Revision : $Revision: 47935 $
 * Date modified : $Date: 2011-01-13 13:37:03 -0600 (Thu, 13 Jan 2011) $
 */
package edu.colorado.phet.idealgas.view.monitors;

import edu.colorado.phet.common.phetcommon.util.EventChannel;
import edu.colorado.phet.common.phetcommon.util.SimpleObservable;
import edu.colorado.phet.common.phetcommon.util.SimpleObserver;
import edu.colorado.phet.common.phetcommon.view.util.PhetFont;
import edu.colorado.phet.common.phetcommon.view.util.RectangleUtils;
import edu.colorado.phet.common.phetgraphics.view.graphics.mousecontrols.translation.TranslationEvent;
import edu.colorado.phet.common.phetgraphics.view.graphics.mousecontrols.translation.TranslationListener;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.CompositePhetGraphic;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetGraphic;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetShapeGraphic;
import edu.colorado.phet.idealgas.IdealGasConfig;
import edu.colorado.phet.idealgas.IdealGasResources;
import edu.colorado.phet.idealgas.model.Box2D;
import edu.colorado.phet.idealgas.model.PressureSensingBox;
import edu.colorado.phet.idealgas.model.PressureSlice;

import java.awt.*;
import java.awt.geom.Area;
import java.awt.geom.Rectangle2D;
import java.awt.geom.RoundRectangle2D;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.EventListener;
import java.util.EventObject;

/**
 * The PhetGraphic for the tool that reads pressure and temperature for a horizontal slice through the
 * box.
 * <p/>
 * The structure of this class is odd because it was proted forward through several versions of PhetGraphic.
 */
public class PressureSliceGraphic extends CompositePhetGraphic implements PressureSensingBox.ChangeListener,
                                                                          Box2D.ChangeListener {

    private float s_overlayTransparency = 0.3f;

    private double y;
    private Rectangle2D.Double boundingRect = new Rectangle2D.Double();
    private RoundRectangle2D.Double readoutRectangle = new RoundRectangle2D.Double();
    private Stroke pressureSliceStroke = new BasicStroke();
    private int pressureSliceHeight = 10;
    private double boxLeftEdge;
    private double boxLowerEdge;
    private double boxRightEdge;
    private PressureSensingBox box;
    private PressureSlice pressureSlice;
    private SimpleObservable pressureReadingSource;
    private NumberFormat temperatureFormatter = new DecimalFormat( "#" );
    private NumberFormat pressureFormatter = new DecimalFormat( "0.00" );
    private NumberFormat heightFormatter = new DecimalFormat( "0.00" );
    private double temperature;
    private double pressure;
    private Font font = new PhetFont( Font.BOLD, 12 );
    private InternalGraphic internalGraphic;
    private Area drawingArea = new Area();
    private boolean displayTemperature;

    /**
     * @param component
     * @param pressureSlice
     * @param box
     */
    public PressureSliceGraphic( Component component, final PressureSlice pressureSlice,
                                 final PressureSensingBox box ) {
        super( component );
        this.pressureSlice = pressureSlice;
        pressureReadingSource = box;
        box.addChangeListenerPSB( this );
        box.addChangeListener( this );

        internalGraphic = new InternalGraphic( component );
        this.setCursorHand();
        this.addTranslationListener( new TranslationListener() {
            @Override
						public void translationOccurred( TranslationEvent event ) {
                double yOffset = .1 * IdealGasConfig.PIXELS_PER_NANOMETER;
                double newY = Math.min( box.getMaxY() - yOffset,
                                        Math.max( y + event.getDy(), box.getMinY() + yOffset ) );
                y = newY;
                pressureSlice.setY( y );
                listenerProxy.moved( new Event( PressureSliceGraphic.this ) );
                internalGraphic.update();
            }
        } );
        this.box = box;
        y = box.getMinY() + ( box.getMaxY() - box.getMinY() ) / 2;
        pressureSlice.setY( y );
    }

    @Override
		protected PhetGraphic getHandler( Point p ) {
        if( isVisible() && drawingArea.contains( p ) ) {
            return this;
        }
        else {
            return null;
        }
    }

    @Override
		protected Rectangle determineBounds() {
        return internalGraphic.getBounds();
    }

    @Override
		public void paint( Graphics2D g2 ) {
        internalGraphic.paint( g2 );
    }

    //----------------------------------------------------------------
    // Component graphic classes
    //----------------------------------------------------------------

    private class InternalGraphic extends PhetShapeGraphic implements SimpleObserver {

        InternalGraphic( Component component ) {
            super( component, null, null );
            setShape( drawingArea );
            pressureSlice.addObserver( this );
            update();
        }

        @Override
				public boolean contains( int x, int y ) {
            return RectangleUtils.containsXY(boundingRect, x, y ) 
            		|| readoutRectangle.contains( x, y );
        }

        @Override
				public void update() {
            if( pressureReadingSource == box ) {
                pressure = box.getPressure();
            }
            else {
                pressure = pressureSlice.getPressure();
            }
            temperature = pressureSlice.getTemperature();

            // Clear the drawing area and rebuild it
            drawingArea.exclusiveOr( drawingArea );
            drawingArea.add( new Area( boundingRect ) );
            drawingArea.add( new Area( new Rectangle( (int)readoutRectangle.getX() - 2, (int)readoutRectangle.getY() - 2,
                                                      (int)readoutRectangle.getWidth() + 4, (int)readoutRectangle.getHeight() + 4 ) ) );
            setBoundsDirtyOpt();
            repaint();
        }

        @Override
				public void paint( Graphics2D g2 ) {
            saveGraphicsState( g2 );

            g2.setFont( font );
            FontMetrics fontMetrics = g2.getFontMetrics();
            int readoutWidth = 117;
            int borderThickness = 8;
            int numReadoutLines = displayTemperature ? 3 : 2;
            int readoutHeight = fontMetrics.getHeight() * numReadoutLines + fontMetrics.getMaxDescent();

            g2.setStroke( pressureSliceStroke );

            // Figure out the size of the box that holds the readouts
            boxLeftEdge = box.getMinX();
            boxRightEdge = box.getMaxX();
            boxLowerEdge = box.getMaxY();
            boundingRect.setRect( boxLeftEdge, y - pressureSliceHeight / 2,
                                  boxRightEdge - boxLeftEdge,
                                  pressureSliceHeight );
            readoutRectangle.setRoundRect( (int)boundingRect.getMinX() - ( readoutWidth + borderThickness * 2 ),
                                           (int)boundingRect.getMinY() - ( readoutHeight / 2 ) - borderThickness,
                                           ( readoutWidth + borderThickness * 2 ), readoutHeight + 2 * borderThickness, 10, 10 );

            // Draw the slice itself, over the box
            g2.setColor( Color.YELLOW );
            g2.setComposite( AlphaComposite.getInstance( AlphaComposite.SRC_OVER, s_overlayTransparency ) );
            RectangleUtils.fillRect2D(g2, boundingRect );
            g2.setComposite( AlphaComposite.getInstance( AlphaComposite.SRC_OVER, 1f ) );
            RectangleUtils.drawRect2D(g2, boundingRect );

            // Draw the framing rectangle for the readout
            g2.setComposite( AlphaComposite.getInstance( AlphaComposite.SRC_OVER, s_overlayTransparency ) );
            g2.fill( readoutRectangle );
            g2.setComposite( AlphaComposite.getInstance( AlphaComposite.SRC_OVER, 1f ) );
            g2.draw( readoutRectangle );

            // Draw the readouts
            g2.setRenderingHint( RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON );

            Point readoutLocation = new Point( (int)( readoutRectangle.getMinX() + borderThickness ),
                                               (int)( readoutRectangle.getMinY() + borderThickness ) );
            g2.setComposite( AlphaComposite.getInstance( AlphaComposite.SRC_OVER, 1f ) );
            g2.drawRoundRect( readoutLocation.x, readoutLocation.y, readoutWidth, readoutHeight, 5, 5 );

            g2.setColor( Color.WHITE );
            g2.setComposite( AlphaComposite.getInstance( AlphaComposite.SRC, s_overlayTransparency ) );
            g2.fillRect( readoutLocation.x, readoutLocation.y, readoutWidth, readoutHeight );

            // Display the pressure
            g2.setComposite( AlphaComposite.getInstance( AlphaComposite.SRC_OVER, 1f ) );
            g2.setColor( Color.yellow );
            g2.drawRoundRect( readoutLocation.x, readoutLocation.y, readoutWidth, readoutHeight, 5, 5 );
            int strLocY = readoutLocation.y + fontMetrics.getAscent() / 2;
            String pressureStr = "P = " + pressureFormatter.format( pressure ) + " " + IdealGasResources.getString( "pressure-gauge.units");
            g2.setColor( Color.black );
            strLocY += borderThickness;
            g2.drawString( pressureStr, readoutLocation.x + 5, strLocY );

            // Display the temperature, if its display is enabled
            if( displayTemperature ) {
                if( Double.isInfinite( temperature ) || Double.isNaN( temperature ) ) {
                    temperature = 0.0;
                }
                String temperatureStr = "T = " + temperatureFormatter.format( temperature ) + " K";
                g2.setColor( Color.black );
                strLocY += fontMetrics.getHeight();
                g2.drawString( temperatureStr, readoutLocation.x + 5, strLocY );
            }

            // y location must be converted to units compatible with the graphic ruler
            double h = ( boxLowerEdge - y ) / IdealGasConfig.PIXELS_PER_NANOMETER;
            String heightStr = IdealGasResources.getString( "PressureSlideGraphic.height") + " = " + heightFormatter.format( h ) + "nm";
//            String heightStr = "height = " + heightFormatter.format( ( ( ( boxLowerEdge - y ) - 3.3 ) / 70.857 ) );
            g2.setColor( Color.black );
            strLocY += fontMetrics.getHeight();
            g2.drawString( heightStr, readoutLocation.x + 5, strLocY );

            // Reset the alpha vaule, just in case the next client of the Graphics2D
            // assumes it is 1.
            g2.setComposite( AlphaComposite.getInstance( AlphaComposite.SRC_OVER, 1f ) );

            restoreGraphicsState();
        }
    }

    //----------------------------------------------------------------
    // PressureSensingBox.ChangeListener implementation
    //----------------------------------------------------------------

    /**
     * If the pressure sensing box is basing its readings on multiple slices,
     * then we want to get our pressure readings from it, rather than our own
     * slice. This keeps the pressure readings we display consistent with those
     * on the dial gauge. If the box is only sending out readings from a single slice,
     * that means gravity is on, and we want to use our own slice for our readings.
     * This may not be the best way to organize this code, but what the hell...
     *
     * @param event
     */
    @Override
		public void stateChanged( PressureSensingBox.ChangeEvent event ) {
        PressureSensingBox box = event.getPressureSensingBox();
        if( box.getMultipleSlicesEnabled() ) {
            pressureReadingSource = box;
        }
        else {
            pressureReadingSource = pressureSlice;
        }
    }

    //----------------------------------------------------------------
    // Box2D.ChangeListener implementation
    //----------------------------------------------------------------

    @Override
		public void boundsChanged( Box2D.ChangeEvent event ) {
        internalGraphic.update();
    }

    @Override
		public void isVolumeFixedChanged( Box2D.ChangeEvent event ) {
        // noop
    }

    //-----------------------------------------------------------------------------------------
    // Event and Listener definitions
    //-----------------------------------------------------------------------------------------
    public class Event extends EventObject {

        public Event( Object source ) {
            super( source );
        }

        public PressureSliceGraphic getPressureSliceGraphic() {
            return (PressureSliceGraphic)getSource();
        }

        public int getY() {
            return (int)getPressureSliceGraphic().y;
        }
    }

    public interface Listener extends EventListener {
        void moved( Event event );
    }

    private EventChannel channel = new EventChannel( Listener.class );
    private Listener listenerProxy = (Listener)channel.getListenerProxy();

    public void addListener( Listener listener ) {
        channel.addListener( listener );
    }

    public void removeListener( Listener listener ) {
        channel.removeListener( listener );
    }
}

