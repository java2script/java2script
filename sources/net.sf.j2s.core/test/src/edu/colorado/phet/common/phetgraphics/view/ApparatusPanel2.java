// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 54200 $
 * Date modified : $Date: 2011-07-18 19:45:40 -0500 (Mon, 18 Jul 2011) $
 */
package edu.colorado.phet.common.phetgraphics.view;

import java.awt.Color;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.event.ComponentAdapter;
import java.awt.event.ComponentEvent;
import java.awt.event.MouseEvent;
import java.awt.geom.AffineTransform;
import java.awt.geom.Point2D;
import java.awt.image.BufferedImage;
import java.util.EventListener;
import java.util.EventObject;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Random;

import javax.swing.JComponent;
import javax.swing.SwingUtilities;
import javax.swing.event.MouseInputListener;

import edu.colorado.phet.common.phetcommon.model.BaseModel;
import edu.colorado.phet.common.phetcommon.model.clock.ApparatusPanelClockListener;
import edu.colorado.phet.common.phetcommon.model.clock.ClockEvent;
import edu.colorado.phet.common.phetcommon.model.clock.IClock;
import edu.colorado.phet.common.phetcommon.util.EventChannel;
import edu.colorado.phet.common.phetcommon.view.util.RectangleUtils;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.GraphicLayerSet;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetGraphics2D;
import edu.colorado.phet.common.phetgraphics.view.util.GraphicsState;
import edu.colorado.phet.common.phetgraphics.view.util.TransformManager;

/**
 * This is a base class for panels that contain graphic representations
 * of elements in the PhysicalSystem.
 * <p/>
 * The graphic objects to be displayed are maintained in "layers". Each layer can
 * contain any number of Graphic objects, and each layer has an integer "level"
 * associated with it. Layers are drawn in ascending order of their levels. The order
 * in which objects in a given level are drawn is undefined.
 * <p/>
 * The differences between this class and ApparatusPanel are:
 * <ul>
 * <li>The graphic objects in the panel setReferenceSize when the panel is resized
 * <li>Mouse events are handled in the model loop, not the Swing event dispatch thread
 * <li>An option allows drawing to be done to an offscreen buffer, then the whole buffer
 * written at one time to the graphics card
 * </ul>
 *
 * @author Ron LeMaster
 * @version $Revision: 54200 $
 */
@SuppressWarnings({ "deprecation", "serial" })
public class ApparatusPanel2 extends ApparatusPanel implements ApparatusPanelClockListener {

    //----------------------------------------------------------------
    // Class<?> data
    //----------------------------------------------------------------

    private static final boolean DEBUG_OUTPUT_ENABLED = false;

    // Identifiers for different painting strategies
    public static final int DEFAULT_PAINT_STRATEGY = 1;
    public static final int OFFSCREEN_BUFFER_STRATEGY = 2;
    public static final int OFFSCREEN_BUFFER__DIRTY_REGION_STRATEGY = 3;

    //----------------------------------------------------------------
    // Instance data
    //----------------------------------------------------------------

    private TransformManager transformManager;
    private PaintStrategy paintStrategy;

//    private ArrayList rectangles = new ArrayList();
    private Rectangle repaintArea = new Rectangle();

    private ScaledComponentLayout scaledComponentLayout;
    private PanelResizeHandler panelResizeHandler;
    private MouseProcessor mouseProcessor;
    private IClock clock;

    //----------------------------------------------------------------
    // Constructors and initilization
    //----------------------------------------------------------------

    /**
     * Creates a new ApparatusPanel2, observing the specified clock for paused-ness.
     *
     * @param clock
     */
    public ApparatusPanel2( IClock clock ) {
        super( null );
        init( clock );
    }

    /**
     * This constructor adds a feature that allows PhetGraphics to get mouse events
     * when the model clock is paused.
     *
     * @param model
     * @param clock
     * @deprecated No longer requires a BaseModel.
     */
    @Deprecated
		public ApparatusPanel2( BaseModel model, IClock clock ) {
        super( null );
        init( clock );
    }

    protected void init( IClock clock ) {
        // Attach ourself to the clock
        this.clock = clock;
        clock.addClockListener( this );

        // The following lines use a mouse processor in the model loop
        mouseProcessor = new MouseProcessor( getGraphic(), clock );
        this.addMouseListener( mouseProcessor );
        this.addMouseMotionListener( mouseProcessor );
        this.addKeyListener( getGraphic().getKeyAdapter() );//TODO key events should go in processing thread as well.

        // Add a listener what will adjust things if the size of the panel changes
        panelResizeHandler = new PanelResizeHandler();
        this.addComponentListener( panelResizeHandler );
        transformManager = new TransformManager( this );
        paintStrategy = new DefaultPaintStrategy( this );
        scaledComponentLayout = new ScaledComponentLayout( this );
    }

    public IClock getClock() {
        return clock;
    }

    public TransformManager getTransformManager() {
        return transformManager;
    }

    /**
     * Handle mouse input, and eventually, keyboard input
     */
    @Override
		public void handleUserInput() {
        mouseProcessor.handleUserInput();
    }

    /**
     * Returns the AffineTransform used by the apparatus panel to size and place graphics
     *
     * @return the transform
     */
    public AffineTransform getGraphicTx() {
        return transformManager.getGraphicTx();
    }

    private void saveLocation( Component comp ) {
        scaledComponentLayout.saveLocation( comp );
    }

    @Override
		public Component add( Component comp ) {
        saveLocation( comp );
        return super.add( comp );
    }

    @Override
		public void add( Component comp, Object constraints ) {
        saveLocation( comp );
        super.add( comp, constraints );
    }

    @Override
		public Component add( Component comp, int index ) {
        saveLocation( comp );
        return super.add( comp, index );
    }

    @Override
		public Component add( String name, Component comp ) {
        saveLocation( comp );
        return super.add( name, comp );
    }

    //-------------------------------------------------------------------------
    // Rendering
    //-------------------------------------------------------------------------

    public void setPaintStrategy( int strategy ) {
        switch( strategy ) {
            case DEFAULT_PAINT_STRATEGY:
                paintStrategy = new DefaultPaintStrategy( this );
                break;
            case OFFSCREEN_BUFFER_STRATEGY:
                paintStrategy = new OffscreenBufferStrategy( this );
                break;
            case OFFSCREEN_BUFFER__DIRTY_REGION_STRATEGY:
                paintStrategy = new OffscreenBufferDirtyRegion( this );
                break;
            default:
                throw new RuntimeException( "Invalid paint strategy specified" );
        }
    }

    /**
     * Tells if we are using an offscreen buffer or dirty rectangles
     *
     * @return the offscreen buffer state
     */
    public boolean isUseOffscreenBuffer() {
        return paintStrategy instanceof OffscreenBufferStrategy;
    }

    /**
     * Specifies whether the panel is to paint to an offscreen buffer, then paint the buffer,
     * or paint using dirty rectangles.
     * This method chooses between the DefaultPaintStrategy and teh OffscreenBufferStrategy.
     *
     * @param useOffscreenBuffer
     */
    public void setUseOffscreenBuffer( boolean useOffscreenBuffer ) {
        this.paintStrategy = useOffscreenBuffer ? new OffscreenBufferStrategy( this ) : (PaintStrategy) new DefaultPaintStrategy( this );
        // Todo: Determine if the following two lines help or not
//        setOpaque( useOffscreenBuffer );
        setDoubleBuffered( !useOffscreenBuffer );
    }

    public void setUseOffscreenBufferDirtyRegion() {
        this.paintStrategy = new OffscreenBufferDirtyRegion( this );
    }

    /**
     * Paints the panel. Exactly how this is depends on if an offscreen buffer is being used,
     * or the union of dirty rectangles.
     */
    @Override
		public void paint() {
        paintStrategy.paintImmediately();
    }

    /**
     * @deprecated Use Paint();
     */
    @Deprecated
		public void paintImmediately() {
        paintDirtyRectanglesImmediately();
    }

    /**
     * Adds a dirty rectangle to the repaint list. Does not invoke a repaint itself.
     *
     * @param tm
     * @param x
     * @param y
     * @param width
     * @param height
     */
    @Override
    public void repaint( long tm, int x, int y, int width, int height ) {
    	addRectangleToRepaintList( x, y, width, height );
    }

    /**
     * 
     * Adds a dirty rectangle to the repaint list. Does not invoke a repaint itself.
     *
     * @param r
     */
    @Override
    public void repaint( Rectangle r ) {
    	addRectangleToRepaintList( r.x, r.y, r.width, r.height );
    }

    /**
     * Adds a dirty rectangle to the repaint list. Does not invoke a repaint itself.
     *
     * @param x
     * @param y
     * @param width
     * @param height
     */
    @Override
    public void repaint( int x, int y, int width, int height ) {
        addRectangleToRepaintList( x, y, width, height );
    }

    /**
     * Overriden as a noop so that nothing happens if a child component calls repaint(). The actions
     * taken by our superclasss' repaint() should only happen in the model loop.
     */
    @Override
    public void repaint() {
        if ( clock != null && clock.isPaused() ) {
            super.repaint();
        }
    }

    /**
     * Provided for backward compatibility
     *
     * @deprecated Use Paint()
     */
    @Deprecated
		public void megarepaintImmediately() {
        paintDirtyRectanglesImmediately();
    }

    /**
     * Paints immediately the union of dirty rectangles
     */
    private void paintDirtyRectanglesImmediately() {
        if ( rectCount > 0)
            paintNow(transformManager.transform( repaintArea ));
    }

    private Rectangle rTemp = new Rectangle(); // BH found it!
    
//    private Rectangle region = new Rectangle();
    
	void paintNow(Rectangle r) {
		if 	(r == null) {
			r = rTemp;
			r.x = r.y = 0;
			r.width = getWidth();
			r.height = getHeight();
		}
		paintImmediately(r);
		r = repaintArea;
		rectCount = r.x = r.y = r.height = r.width = 0;
	}

    public void addRectangleToRepaintList( int x, int y, int width, int height ) {
        if ( height > 0 && width > 0 ) {
        	rTemp.x = x;
        	rTemp.y = y;
        	rTemp.width = width;
        	rTemp.height = height;
        	RectangleUtils.unionAdd(rTemp, repaintArea);
        	rectCount++;
        }
    }

    /**
     * Overriden as a noop so that nothing happens if a child component calls repaint(). The actions
     * taken by our superclasss' repaint( long tm) should only happen in the model loop.
     */
    @Override
		public void repaint( long tm ) {
    }

    @Override
		protected void paintComponent( Graphics graphics ) {
        super.doPaintSuper( graphics );
        Graphics2D g2 = (Graphics2D) graphics;
        g2 = new PhetGraphics2D( g2 );
        if ( repaintArea == null ) {
            repaintArea = this.getBounds();
        }
        g2.setBackground( super.getBackground() );
        Rectangle clipBounds = g2.getClipBounds();
        g2.clearRect( clipBounds.x, clipBounds.y, clipBounds.width, clipBounds.height );
        setup( g2 );
        GraphicsState gs = new GraphicsState( g2 );
        paintStrategy.render( g2, transformManager.getGraphicTx() );

        if ( debugRepaintRegion ) {
            g2.setPaint( new Color( rand.nextInt( 255 ), rand.nextInt( 255 ), rand.nextInt( 255 ), 55 ) );
            g2.fillRect( clipBounds.x, clipBounds.y, clipBounds.width, clipBounds.height );
        }

        //remove the affine transform.
        gs.restoreGraphics();
        super.drawBorder( g2 );
    }

    static Random rand = new Random();
    private static final boolean debugRepaintRegion = false;

    /**
     * Gets the size of the drawing area (the canvas) that is available to clients.
     * This is the size of the apparatus panel, adjusted for scaling.
     * This method is intended for use by clients who need to know how big
     * an area is available for drawing.
     * <p/>
     * An example: The client is a "grid" that needs to cover all visible space in
     * the apparatus panel.  The apparatus panel's size is currently 500x250, and its
     * scaling is 0.5.  If the grid uses 500x250, it will only 25% of the
     * apparatus panel after scaling.  Using getCanvasSize adjusts for
     * scaling and returns 1000x500 (ie, 500/0.5 x 250/0.5).
     *
     * @return the size
     */
    public Dimension getCanvasSize() {
        return transformManager.getCanvasSize();
    }

    //-----------------------------------------------------------------
    // Resizing and scaling
    //-----------------------------------------------------------------

    public void removePanelResizeHandler() {
        removeComponentListener( panelResizeHandler );
    }

    /**
     * Sets the reference size for this panel. If the panel resizes after this, it will scale its graphicsTx using
     * its current size in relation to the reference size.
     * <p/>
     * This should be called as soon as the application knows that the apparatus panel is at its reference size.
     */
    public void setReferenceSize() {
        transformManager.setReferenceSize();
        scaledComponentLayout.saveSwingComponentCoordinates( 1.0 );
        setScale( 1.0 );

        // Set the canvas size
        determineCanvasSize();

        if ( DEBUG_OUTPUT_ENABLED ) {
            System.out.println( "ApparatusPanel2.setReferenceBounds: referenceBounds=" + transformManager.getReferenceBounds() );
        }
    }

    /**
     * Explicitly sets the apparatus panel's reference size to a specific dimension.
     *
     * @param width
     * @param height
     */
    public void setReferenceSize( int width, int height ) {
        transformManager.setReferenceSize( width, height );
        scaledComponentLayout.saveSwingComponentCoordinates( 1.0 );
    }

    private class PanelResizeHandler extends ComponentAdapter {

        @Override
				public void componentResized( ComponentEvent e ) {
            if ( !transformManager.isReferenceSizeSet() ) {
                setReferenceSize();
            }
            else {
                // Setup the affine transforms for graphics and mouse events
                Rectangle referenceBounds = transformManager.getReferenceBounds();
                if ( !referenceBounds.isEmpty() ) {
                    double sx = getWidth() / referenceBounds.getWidth();
                    double sy = getHeight() / referenceBounds.getHeight();
                    // Using a single scale factor keeps the aspect ratio constant
                    double s = Math.min( sx, sy );
                    if ( s > 0 ) {
                        setScale( s );
                        determineCanvasSize();
                    }
                }
            }
            paintStrategy.componentResized();
        }
    }

    /**
     * Computes the size of the canvas on which PhetGraphics attached to this panel are drawn.
     * If the size changed, an canvasSizeChanged is called on all ChangeListeners
     */
    private void determineCanvasSize() {
        boolean changed = transformManager.determineCanvasSize();
        if ( changed ) {
            changeListenerProxy.canvasSizeChanged( new ApparatusPanel2.ChangeEvent( ApparatusPanel2.this ) );
            paint();
        }
    }

    public double getScale() {
        return transformManager.getScale();
    }

    public void setScale( double scale ) {
        transformManager.setScale( scale );
        scaledComponentLayout.layoutSwingComponents( scale );
        repaint( 0, 0, getWidth(), getHeight() );
    }

    //-------------------------------------------------------------------------
    // Inner classes
    //-------------------------------------------------------------------------

    /**
     * Handles mouse events in the model loop
     */
    private class MouseProcessor implements MouseInputListener {
        private LinkedList<MouseEvent> mouseEventList;
        private IClock clock;
        private GraphicLayerSet handler;

        // The following Runnable is used to process mouse events when the model clock is paused
        private Runnable pausedEventListProcessor = new Runnable() {
            @Override
						public void run() {
                MouseProcessor.this.handleUserInput();
                ApparatusPanel2.this.paint();
            }
        };

        public MouseProcessor( GraphicLayerSet mouseDelegator, final IClock clock ) {
            this.clock = clock;
            mouseEventList = new LinkedList<MouseEvent>();
            this.handler = mouseDelegator;
        }

        public void handleUserInput() {
            processMouseEventList();
        }

        private Point2D.Double tempPt = new Point2D.Double();
        private void xformEventPt( MouseEvent event ) {
            tempPt.x = event.getPoint().x;
            tempPt.y = event.getPoint().y;
            AffineTransform mouseTx = transformManager.getMouseTx();
            mouseTx.transform( tempPt, tempPt );
            int dx = (int) ( tempPt.x - event.getPoint().x );
            int dy = (int) ( tempPt.y - event.getPoint().y );
            event.translatePoint( dx, dy );
        }

        private void addMouseEvent( MouseEvent event ) {
            xformEventPt( event );
            synchronized ( mouseEventList ) {
                mouseEventList.add( event );
            }

            // If the clock is paused, then process mouse events
            // in the Swing thread
            if ( clock != null && clock.isPaused() ) {
                SwingUtilities.invokeLater( pausedEventListProcessor );
            }
        }

        private void processMouseEventList() {
            MouseEvent event;
            while ( mouseEventList.size() > 0 ) {
                synchronized ( mouseEventList ) {
                    event = mouseEventList.removeFirst();
                }
                handleMouseEvent( event );
            }
        }

        private void handleMouseEvent( MouseEvent event ) {
            switch( event.getID() ) {
                case MouseEvent.MOUSE_CLICKED:
                    handler.getMouseHandler().mouseClicked( event );
                    break;
                case MouseEvent.MOUSE_DRAGGED:
                    handler.getMouseHandler().mouseDragged( event );
                    break;
                case MouseEvent.MOUSE_ENTERED:
                    handler.getMouseHandler().mouseEntered( event );
                    break;
                case MouseEvent.MOUSE_EXITED:
                    handler.getMouseHandler().mouseExited( event );
                    break;
                case MouseEvent.MOUSE_MOVED:
                    handler.getMouseHandler().mouseMoved( event );
                    break;
                case MouseEvent.MOUSE_PRESSED:
                    handler.getMouseHandler().mousePressed( event );
                    break;
                case MouseEvent.MOUSE_RELEASED:
                    handler.getMouseHandler().mouseReleased( event );
                    break;
            }
        }

        @Override
				public void mouseClicked( MouseEvent e ) {
            this.addMouseEvent( e );
        }

        @Override
				public void mouseEntered( MouseEvent e ) {
            this.addMouseEvent( e );
        }

        @Override
				public void mouseExited( MouseEvent e ) {
            this.addMouseEvent( e );
        }

        @Override
				public void mousePressed( MouseEvent e ) {
            this.addMouseEvent( e );
        }

        @Override
				public void mouseReleased( MouseEvent e ) {
            this.addMouseEvent( e );
        }

        @Override
				public void mouseDragged( MouseEvent e ) {
            this.addMouseEvent( e );
        }

        @Override
				public void mouseMoved( MouseEvent e ) {
            this.addMouseEvent( e );
        }
    }

    //----------------------------------------------------------------
    // Implementation of ClockTickListener
    //----------------------------------------------------------------

    @Override
		public void clockTicked( ClockEvent event ) {
        paint();
    }

    @Override
		public void clockStarted( ClockEvent clockEvent ) {
    }

    @Override
		public void clockPaused( ClockEvent clockEvent ) {
    }

    @Override
		public void simulationTimeChanged( ClockEvent clockEvent ) {
    }

    @Override
		public void simulationTimeReset( ClockEvent clockEvent ) {
    }

    //-----------------------------------------------------------------
    // Event-related classes
    //-----------------------------------------------------------------
    public static class ChangeEvent extends EventObject {
        private ApparatusPanel2 apparatusPanel;

        public ChangeEvent( ApparatusPanel2 source ) {
            super( source );
            this.apparatusPanel = source;
        }

        public Dimension getCanvasSize() {
            return apparatusPanel.transformManager.getCanvasSize();
        }
    }

    public interface ChangeListener extends EventListener {
        void canvasSizeChanged( ChangeEvent event );
    }

    // but this is not set up early enough -- the JPanelUI addition
    // request fires within the JPanel constructor, and this next
    // call comes after that. 
    // 
    private EventChannel changeEventChannel = new EventChannel( ChangeListener.class );
    private ChangeListener changeListenerProxy = (ChangeListener) changeEventChannel.getListenerProxy();

		public int rectCount;

    public void addChangeListener( ChangeListener listener ) {
    	if (changeEventChannel != null)
        changeEventChannel.addListener( listener );
    }

    public void removeChangeListener( ChangeListener listener ) {
        changeEventChannel.removeListener( listener );
    }

    //----------------------------------------------------------------
    // Rendering strategies
    //----------------------------------------------------------------

    static interface PaintStrategy {

        void paintImmediately();

        void render( Graphics2D g2, AffineTransform graphicTx );

        void componentResized();
    }

    public class OffscreenBufferDirtyRegion extends OffscreenBufferStrategy {

        public OffscreenBufferDirtyRegion( ApparatusPanel2 apparatusPanel2 ) {
            super( apparatusPanel2 );
        }

        @Override
				public void paintImmediately() {
            //TODO this works great, without the full-screen, but relies on having rectangles.
            apparatusPanel2.paintDirtyRectanglesImmediately();
        }
    }

    /**
     * Renders everything to an offscreen buffer, then draws the buffer to the screen at one time
     */
    public class OffscreenBufferStrategy implements PaintStrategy {
        private BufferedImage bImg;
        protected ApparatusPanel2 apparatusPanel2;
        private AffineTransform IDENTITY = new AffineTransform();
        private static final int BUFFER_TYPE = BufferedImage.TYPE_INT_RGB;//TODO Macs may need ARGB here

        public OffscreenBufferStrategy( ApparatusPanel2 apparatusPanel2 ) {
            this.apparatusPanel2 = apparatusPanel2;
            componentResized();
        }

        
        @Override
				public void paintImmediately() {
            apparatusPanel2.paintNow(null);
        }

        @Override
				public void render( Graphics2D g2, AffineTransform graphicTx ) {
            if ( bImg == null ) {
                componentResized();
            }
            if ( bImg != null ) {
            	// BH Problem here was that SwingJS was not saving the graphic
            	// and later we were stopped from restoring its initial transform
            	// so the call to g2.dispose() failed. BH 12/13/16
            	
            	
                Graphics2D bImgGraphics = (Graphics2D) bImg.getGraphics();
                //TODO: we'll be painting over this region, do we really have to clear it?
                //todo especially if our image has no alpha?
                bImgGraphics.setColor( apparatusPanel2.getBackground() );
                bImgGraphics.fillRect( bImg.getMinX(), bImg.getMinY(), bImg.getRaster().getWidth(), bImg.getRaster().getHeight() );

                setup( bImgGraphics );
//                bImgGraphics.setClip( g2.getClip() );//apply the clip to the buffer (in case we're not painting everything.)
                //TODO is clipping the bImgGraphics helping..?
                bImgGraphics.transform( graphicTx );
                apparatusPanel2.getGraphic().paint( bImgGraphics );
                g2.drawImage( bImg, IDENTITY, apparatusPanel2 );
                bImgGraphics.dispose();
            }
        }

        @Override
				public void componentResized() {
            int w = getWidth();
            int h = getHeight();
            if ( w > 0 && h > 0 ) {
                bImg = new BufferedImage( w, h, BUFFER_TYPE );
            }
        }
    }

    public static class DefaultPaintStrategy implements PaintStrategy {
        ApparatusPanel2 apparatusPanel2;

        public DefaultPaintStrategy( ApparatusPanel2 apparatusPanel2 ) {
            this.apparatusPanel2 = apparatusPanel2;
            componentResized();
        }

        @Override
				public void paintImmediately() {
            apparatusPanel2.paintDirtyRectanglesImmediately();
        }

        @Override
				public void render( Graphics2D g2, AffineTransform graphicTx ) {
//            QuickTimer renderTime=new QuickTimer();
            g2.transform( graphicTx );
            apparatusPanel2.getGraphic().paint( g2 );
//            System.out.println( "renderTime = " + renderTime );
        }

        @Override
				public void componentResized() {
        }
    }

    /**
     * Places Swing components in the proper places when the ApparatusPanel2 is resized
     */
    static class ScaledComponentLayout {
        private Map<Component, Point> componentOrgLocationsMap = new HashMap<Component, Point>();
        JComponent component;

        public ScaledComponentLayout( JComponent component ) {
            this.component = component;
        }

        private void saveSwingComponentCoordinates( double scale ) {
            Component[] components = component.getComponents();
            for ( int i = 0; i < components.length; i++ ) {
                Component component = components[i];
                Point location = component.getLocation();

                // TEST
//                Dimension refSize = component.getPreferredSize();
//                component.setSize( (int)(refSize.width * scale), (int)(refSize.height * scale ));

                //factor out the old scale, if any.
                componentOrgLocationsMap.put( component, new Point( (int) ( location.x / scale ), (int) ( location.y / scale ) ) );
            }
        }

        public void saveLocation( Component comp ) {
            componentOrgLocationsMap.put( comp, new Point( comp.getLocation() ) );
        }

        /**
         * Adjust the locations of Swing components based on the current scale
         */
        private void layoutSwingComponents( double scale ) {
//            Component[] components = component.getComponents();
//            for( int i = 0; i < components.length; i++ ) {
//                Component component = components[i];
//                Point origLocation = (Point)componentOrgLocationsMap.get( component );
//                if( origLocation != null ) {
//                    Point newLocation = new Point( (int)( origLocation.getX() * scale ), (int)( origLocation.getY() * scale ) );
//                    component.setLocation( newLocation );
//                }
//            }
        }

    }

    @Override
		protected void paintChildren( Graphics g ) {
        super.paintChildren( g );
    }
}

