// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author:samreid $
 * Revision : $Revision:14674 $
 * Date modified : $Date:2007-04-17 02:37:37 -0500 (Tue, 17 Apr 2007) $
 */
package edu.colorado.phet.common.phetgraphics.view.phetgraphics;

import java.awt.Component;
import java.awt.Cursor;
import java.awt.Dimension;
import java.awt.Graphics2D;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.RenderingHints;
import java.awt.Shape;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.awt.geom.AffineTransform;
import java.awt.geom.Point2D;
import java.util.ArrayList;
import java.util.EventListener;
import java.util.Stack;

import javax.swing.JPopupMenu;
import javax.swing.SwingUtilities;
import javax.swing.event.MouseInputAdapter;
import javax.swing.event.MouseInputListener;

import edu.colorado.phet.common.phetcommon.view.util.RectangleUtils;
import edu.colorado.phet.common.phetgraphics.view.ApparatusPanel2;
import edu.colorado.phet.common.phetgraphics.view.graphics.mousecontrols.translation.TranslationHandler;
import edu.colorado.phet.common.phetgraphics.view.graphics.mousecontrols.translation.TranslationListener;
import edu.colorado.phet.common.phetgraphics.view.util.CompositeKeyListener;
import edu.colorado.phet.common.phetgraphics.view.util.CompositeMouseInputListener;
import edu.colorado.phet.common.phetgraphics.view.util.CursorControl;
import edu.colorado.phet.common.phetgraphics.view.util.GraphicsState;

/**
 * PhetGraphic is the base class for all PhET graphics.
 * <p/>
 * This graphic class auto-magically repaints itself in the appropriate bounds,
 * using component.paint(int x,int y,int width,int height).
 * This class manages the current and previous bounds for painting, and whether
 * the region is dirty.
 *
 * @author ?
 * @version $Revision:14674 $
 */
public abstract class PhetGraphic {
	
	// BH Setting SKIP_RECTANGLE_COMPUTATION results in over 2,000 calls per second to 
	//    addRectangleToRepaintList, and setting it to TRUE dramatically improves 
	//    JavaScript performance
    public static boolean SKIP_RECTANGLE_COMPUTATION = true;// BH Unnecessarily false
   
    //----------------------------------------------------------------------------
    // Instance data
    //----------------------------------------------------------------------------

		protected static final AffineTransform IDENTITY = new AffineTransform(); // BH optimized out new

    protected Point location = new Point();
    private Point registrationPoint = new Point();
    private AffineTransform transform = new AffineTransform();
    private Rectangle lastBounds = new Rectangle();
    private Rectangle bounds = new Rectangle();
    private Component container;
    private boolean visible = true;
    private boolean boundsDirty = true;
    private RenderingHints savedRenderingHints;
    private RenderingHints renderingHints;
    private Stack<GraphicsState> graphicsStates = new Stack<GraphicsState>();
    private GraphicLayerSet parent;
    private String name;
    private Shape clip;
    
    protected Shape shape; // BH
    protected boolean shapeDirty = true; // BH
		protected boolean isTranslationOnly; // BH
		protected Rectangle shapeRect = new Rectangle(); // BH
		protected Rectangle localRect = new Rectangle(Integer.MAX_VALUE, 0, 0, 0); // BH



    /*A bit of state to facilitate interactivity.*/
    protected CompositeMouseInputListener mouseInputListener = new CompositeMouseInputListener();//delegate
    protected CompositeKeyListener keyListener = new CompositeKeyListener();//delegate
    private CursorControl cursorControl;
    private MouseInputAdapter popupHandler;
    private ArrayList<EventListener> listeners = new ArrayList<EventListener>();
    private boolean ignoreMouse = false;
    private boolean autorepaint = true;

    // Utility objects to avoid dynamic allocations in getNetTransform() 
    AffineTransform netUtilTx = new AffineTransform();
    AffineTransform xlateUtilTx = new AffineTransform();
    //private boolean clippingDisabled = false;
    
    final static int TYPE_GRAPHIC = 0;
    final static int TYPE_GRAPHIC_LAYER_SET = 1;

    public int type = TYPE_GRAPHIC;

		protected boolean isApparatus2;

    //----------------------------------------------------------------------------
    // Constructors
    //----------------------------------------------------------------------------

    /**
     * Constructs a PhetGraphic on the specified component.
     *
     * @param component The component in which the PhetGraphic will be drawn.
     */
    protected PhetGraphic( Component component ) {
      container = component;
      isApparatus2 = (component instanceof ApparatusPanel2);
    }

    /**
     * Provided for Java Beans conformance
     */
    protected PhetGraphic() {
        //noop
    }

    //----------------------------------------------------------------------------
    // Accessor methods
    //----------------------------------------------------------------------------

    /**
     * Returns the Component within which this PhetGraphic is contained.
     *
     * @return the component
     */
    public Component getComponent() {
        return container; // BH for sanity, changed this to container, as it is shadowed by PhetJComponent.component
    }

    /**
     * Set the Component within which this PhetGraphic is contained
     *
     * @param component
     */
    public void setComponent( Component component ) {
        container = component;
        isApparatus2 = (component instanceof ApparatusPanel2);
    }

    /**
     * Sets the parent of this Graphic. Public for Java Beans conformance
     *
     * @param parent the Parent that contains this graphic.
     */
    public void setParent( GraphicLayerSet parent ) {
        this.parent = parent;
    }

    /**
     * Sets the name of the graphic to the specified string.
     * The purpose this method is similar to java.awt.Component.setName.
     *
     * @param name the string that is to be this component's name
     */
    public void setName( String name ) {
        this.name = name;
    }

    /**
     * Gets the name of the component.
     * The purpose this method is similar to java.awt.Component.getName.
     *
     * @return the component's name
     */
    public String getName() {
        return name;
    }

    //----------------------------------------------------------------------------
    // Java Bean conformance for XML encoding
    //
    // Client applications should not call these methods!
    //----------------------------------------------------------------------------

    public GraphicLayerSet getParent() {
        return parent;
    }

    public boolean isAutorepaint() {
        return autorepaint;
    }

    public void setAutorepaint( boolean autorepaint ) {
        this.autorepaint = autorepaint;
    }

    public ArrayList<EventListener> getListeners() {
        return listeners;
    }

    public void setListeners( ArrayList<EventListener> listeners ) {
        this.listeners = listeners;
    }

    public void setBounds( int x, int y, int width, int height ) {
      setBounds( new Rectangle( x, y, width, height ) );
    }

    public void setBounds( Rectangle bounds ) {
        this.bounds = bounds;
    }

    public Rectangle getLastBounds() {
        return lastBounds;
    }

    public void setLastBounds( Rectangle lastBounds ) {
        this.lastBounds = lastBounds;
    }

    //----------------------------------------------------------------------------
    // Graphics Context methods
    //----------------------------------------------------------------------------

    /**
     * Saves the graphics context by pushing it onto a stack.
     *
     * @param g2 the graphics context
     */
    protected void saveGraphicsState( Graphics2D g2 ) {
    	saveGraphicsStatePG(g2);
    }

    private void saveGraphicsStatePG(Graphics2D g2) { // BH optimized SAEM
      graphicsStates.push( new GraphicsState( g2 ) );
		}

		/**
     * Restores the graphics context that is on top of the stack.
     * The context is popped off of the stack.  If this stack is
     * empty, calling this method does nothing.
     */
    protected void restoreGraphicsState() {
    	restoreGraphicsStatePG();
    }

	protected void restoreGraphicsStatePG() { // BH Optimized SAEM
		if (!graphicsStates.empty()) {
			GraphicsState gs = graphicsStates.pop();
			gs.restoreGraphics();
		}
	}

		/**
     * Saves the rendering hints that are associated with a graphics context.
     * The name of the method is a misnomer; there is no stack involved,
     * and exactly one set of rendering hints can be restored.
     *
     * @param g2 the graphics context
     */
    protected void pushRenderingHints( Graphics2D g2 ) {
        savedRenderingHints = g2.getRenderingHints();
    }

    /**
     * Restores the rendering hints.
     * The rendering hints that were saved are applied to the supplied
     * graphics context. If no hints were saved, calling this method
     * does nothing.
     *
     * @param g2 the graphics context
     */
    protected void popRenderingHints( Graphics2D g2 ) {
        if ( savedRenderingHints != null ) {
            g2.setRenderingHints( savedRenderingHints );
        }
    }

    /**
     * Sets the rendering hints for this graphic.
     * These hints should be used when rendering the graphic.
     *
     * @param hints the rendering hints
     */
    public void setRenderingHints( RenderingHints hints ) {
        renderingHints = hints;
    }

    /**
     * Gets the rendering hints for this graphic.
     *
     * @return the rendering hints, possibly null
     */
    public RenderingHints getRenderingHints() {
        return renderingHints;
    }

    public void setClip( Shape clip ) {
        this.clip = clip;
    }

    public Shape getClip() {
        return clip;
    }

    /**
     * Updates the graphics state to include changes that are specific for this graphic.
     * Subclasses should call this method in their paint method, immediately after
     * calling saveGraphicsState.
     *
     * @param g2
     */
    protected void updateGraphicsState( Graphics2D g2 ) {
        // Clipping
        if ( clip != null ) {
            g2.setClip( clip );
        }
        // Add rendering hints
        RenderingHints hints = getRenderingHints();
        if ( hints != null ) {
            g2.addRenderingHints( hints );
        }
    }

    //----------------------------------------------------------------------------
    // Visibility methods
    //----------------------------------------------------------------------------

    /**
     * Sets this graphic visible or invisible.
     *
     * @param visible true for visible, false for invisible
     */
    public void setVisible( boolean visible ) {
        if ( visible != this.visible ) {
            this.visible = visible;
            forceRepaint();//if we just turned invisible, we need to paint over ourselves, and vice versa.
            fireVisibilityChanged();
            if ( !visible ) {
                //see if we have a parent, and tell them to lose mouse and key focus.
                if ( parent != null ) {
                    parent.childBecameInvisible( this );
                }

                //TODO even if there is no parent, we may want to fire off a MouseExited event anyways.
                //TODO make sure this is coordinated with the childBecameInvisible call above.
            }
        }
    }

    protected void fireVisibilityChanged() {
        for ( int i = 0; i < listeners.size(); i++ ) {
            PhetGraphicListener phetGraphicListener = (PhetGraphicListener) listeners.get( i );
            phetGraphicListener.phetGraphicVisibilityChanged( this );
        }
    }

    /**
     * Determines whether this graphic and all its parents are visible.
     *
     * @return whether this component and all its parents are visible.
     */
    public boolean isVisible() {
        // If we have a parent, check to see if it is visible
        if ( parent != null ) {
            return parent.isVisible() && this.visible;//shouldn't we add a call to getComponent().isShowing()? 
        }
        else {
            return visible;//this too?
        }
    }

    /**
     * Determines whether this graphic (independent of its parents) would be visible.
     *
     * @return the visible flag on this graphic.
     */
    protected boolean getVisibilityFlag() {
        return visible;
    }

    //----------------------------------------------------------------------------
    // Registration Point methods
    //----------------------------------------------------------------------------

    /**
     * Sets the graphic's registration point.
     * The registration point is the point about which transformations are applied.
     * It is relative to the graphic's bounding box, prior to applying any transforms.
     *
     * @param registrationPoint the registration point
     */
    public void setRegistrationPoint( Point registrationPoint ) {
        setRegistrationPoint( registrationPoint.x, registrationPoint.y );
    }

    /**
     * Sets the graphic's registration point.
     * The registration point is the point about which transformations are applied.
     * It is relative to the graphic's bounding box, prior to applying any transforms.
     *
     * @param x X coordinate of the registration point
     * @param y Y coordinate of the registration point
     */
    public void setRegistrationPoint( int x, int y ) {
        registrationPoint.x = x;
        registrationPoint.y = y;
        setBoundsDirtyOpt();
        autorepaint();
    }

    /**
     * Convenience method for setting the registration point at the graphic's center.
     */
    public void centerRegistrationPoint() {
        setRegistrationPoint( getWidth() / 2, getHeight() / 2 );
    }

    /**
     * Gets a copy of the registration point.
     * The registration point is the point about which transformations are applied.
     * It is relative to the graphic's bounding box, prior to applying any transforms.
     * The default is (0,0), which is the upper-left corner of the bounding box.
     *
     * @return the registration point
     */
    public Point getRegistrationPoint() {
        return new Point( registrationPoint );
    }

    //----------------------------------------------------------------------------
    // Transform methods
    //----------------------------------------------------------------------------

    /**
     * Sets this graphic's local transform.
     * The local transform is applied relative to the registration point.
     *
     * @param transform the transform
     */
    public void setTransform( AffineTransform transform ) {
        if ( !transform.equals( this.transform ) ) {
            this.transform.setTransform(transform); 
            setBoundsDirtyOpt();
            autorepaint();
        }
    }

    /**
     * Gets a copy of the local transform.
     *
     * @return the transform
     */
    public AffineTransform getTransform() {
        return new AffineTransform( transform );
    }

    /**
     * Pre-concatenates the local transform with a specified transform.
     *
     * @param transform the transform to preconcatenate
     */
    public void transform( AffineTransform transform ) {
        // Can send actual parameter to preConcatenateTransform(), because it does
        // not alter its argument
        preConcatenateTransform( transform );
    }

    private AffineTransform tempTx;
    /**
     * Determine the bounds of this graphic, as seen by the parent graphic layer set.
     *
     * @see PhetGraphic#getIntermediateTransform(GraphicLayerSet)
     */
    public Rectangle getBoundsInAncestor( GraphicLayerSet parent ) {
        return getIntermediateTransform( parent ).createTransformedShape( getLocalBounds() ).getBounds();
    }

    /**
     * Determine the transform between this graphic and an ancestor.
     *
     * @param ancestor
     * @param tempTx 
     * @return
     */
    public AffineTransform getIntermediateTransform( GraphicLayerSet ancestor) {
    	if (tempTx == null)
    		tempTx = new AffineTransform(); // BH optimized out new
        GraphicLayerSet up = getParent();
        while ( up != ancestor ) {
            tempTx.concatenate( up.getTransform() );//todo: doesn't handle registration point.
            up = up.getParent();
        }
        return tempTx;
    }

    /**
     * Concatenates a transform to the local transform.
     *
     * @param transform the transform to concatenate.
     */
    protected void concatenateTransform( AffineTransform transform ) {
        if ( !transform.isIdentity() ) {
            this.transform.concatenate( transform );
            setBoundsDirtyOpt();
            autorepaint();
        }
    }

    /**
     * Pre-concatenates a transform to the local transform.
     *
     * @param transform the transform to pre-concatenate.
     */
    protected void preConcatenateTransform( AffineTransform transform ) {
        if ( !transform.isIdentity() ) {
            this.transform.preConcatenate( transform );
            setBoundsDirtyOpt();
            autorepaint();
        }
    }

    /**
     * Gets the "net" transform.  The net transform is the result of applying
     * the local transform relative to the registration point, then translating
     * to the location, then applying the parent's net transform (if a parent exists).
     * <p/>
     * This method should be used in methods involving painting and bounds calculations.
     *
     * @return the net AffineTransform of this graphic
     */
    public AffineTransform getNetTransform() {
        // Use preConcatenate, so that transforms are shown in the order that they will occur.

        // Translate to registration point

        // todo: why are there minus signs on the parameters here?
        netUtilTx.setToIdentity();
        xlateUtilTx.setToTranslation( -registrationPoint.x, -registrationPoint.y );
        netUtilTx.preConcatenate( xlateUtilTx );
        // Apply local transform
        netUtilTx.preConcatenate( transform );
        // Translate to location
        // todo: moved this to doing the translation as a completely separate step. See GraphicLayerSet.paint(), contains(), and determine bounds()
        xlateUtilTx.setToTranslation( location.x, location.y );
        netUtilTx.preConcatenate( xlateUtilTx );

//        if (parent != null && ("" + parent).indexOf("BoxDoor") >= 0)
//        	System.out.println("BDG " + netUtilTx  
//        			+ "\nt=" + transform  
//        			+ "\nloc=" + location 
//        			+ "\nxl=" + xlateUtilTx);
        
        // todo: Not needed, because GraphicLayerSets apply their transforms to the graphics before we get here
        // Apply parent's net transform - rjl
        if ( parent != null ) {
            AffineTransform parentTransform = parent.getNetTransform();
            netUtilTx.preConcatenate( parentTransform );
        }
        return netUtilTx;
    }

    //----------------------------------------------------------------------------
    // Transform convenience methods.
    //
    // All of these pre-concatenate an AffineTransform to the local transform,
    // so that transforms will occur in the order that you call these methods.
    // Note that this is the opposite of how similar methods in Graphics2D behave.
    //----------------------------------------------------------------------------

    /**
     * Pre-concatenates the current local transform with a translation transform.
     *
     * @param tx the distance to translate along the x-axis
     * @param ty the distance to translate along the y-axis
     */
    public void translate( double tx, double ty ) {
        preConcatenateTransform( AffineTransform.getTranslateInstance( tx, ty ) );
    }

    /**
     * Pre-concatenates the current local transform with a rotation transform.
     *
     * @param theta angle of rotation in radians
     */
    public void rotate( double theta ) {
        preConcatenateTransform( AffineTransform.getRotateInstance( theta ) );
    }

    /**
     * Pre-concatenates the current local transform with a translated rotation transform.
     * Rotation is performed about the supplied origin of rotation.
     *
     * @param theta the angle of rotation in radians
     * @param x     the x coordinate of the origin of the rotation
     * @param y     the y coordinate of the origin of the rotation
     */
    public void rotate( double theta, double x, double y ) {
        preConcatenateTransform( AffineTransform.getRotateInstance( theta, x, y ) );
    }

    /**
     * Pre-concatenates the current local transform with a scale transform.
     *
     * @param sx the X scaling multiplier
     * @param sy the Y scaling multiplier
     */
    public void scale( double sx, double sy ) {
        preConcatenateTransform( AffineTransform.getScaleInstance( sx, sy ) );
    }

    /**
     * Pre-concatenates the current local transform with a uniform scale transform.
     *
     * @param s the scale multiplier, applied to both axes
     */
    public void scale( double s ) {
        preConcatenateTransform( AffineTransform.getScaleInstance( s, s ) );
    }

    /**
     * Pre-concatenates the current local transform with a scale transform.
     *
     * @param shx the X shear multiplier
     * @param shy the Y shear multiplier
     */
    public void shear( double shx, double shy ) {
        preConcatenateTransform( AffineTransform.getShearInstance( shx, shy ) );
    }

    /**
     * Pre-concatenates the current local transform with a uniform shear transform.
     *
     * @param sh the shear multiplier, applied to both axes
     */
    public void shear( double sh ) {
        preConcatenateTransform( AffineTransform.getShearInstance( sh, sh ) );
    }

    /**
     * Sets the local transform to the identity matrix.
     */
    public void clearTransform() {
        setTransform( IDENTITY );
    }

    //----------------------------------------------------------------------------
    // Bounds methods
    //----------------------------------------------------------------------------

    /**
     * Computes the Rectangle in which this graphic resides.
     * This is only called if the shape is dirty.
     * <p/>
     * Subclasses of PhetGraphic must implement this method.
     * Proper computation of the bounds often involves application
     * of the graphic's transform.  See PhetShapeGraphic.determineBounds
     * for an example.
     *
     * @return the Rectangle that contains this graphic.
     */
    protected abstract Rectangle determineBounds();

    /**
     * Gets the rectangle within which this PhetGraphic lies.
     *
     * @return the rectangle within which this PhetGraphic lies.
     */
    public Rectangle getBounds() {
        syncBounds();
        return bounds;
    }

    /**
     * Flags the bounds for recomputation when applicable.
     */
    public void setBoundsDirty() {
      boundsDirty = shapeDirty = true;
    }

    /**
     * Flags the bounds for recomputation when applicable.
     */
    public void setBoundsDirtyOpt() {
        boundsDirty = shapeDirty = true;
    }

    /**
     * Determine whether this PhetGraphic has changed since its last paint.
     *
     * @return
     */
    public boolean isDirty() {
        return boundsDirty;
    }

    /**
     * Determines whether this phetGraphic contains the appropriate point.
     *
     * @param x
     * @param y
     * @return true if the point is contained by this graphic.
     */
    @SuppressWarnings("deprecation")
		public boolean contains( int x, int y ) {
        if ( isVisible() ) {
            syncBounds();
            return bounds != null && bounds.inside( x, y ); //BH though deprecated, optimized for JavaScript
        }
        else {
            return false;
        }
    }

    /**
     * If the bounds are dirty, they are recomputed.
     */
    protected void syncBounds() {
        if ( boundsDirty ) {
            rebuildBounds();
            boundsDirty = false;
            if ( !RectangleUtils.areEqual( lastBounds, bounds ) ) {
                notifyChanged();
            }
        }
    }
    
    protected Rectangle tempRect = new Rectangle();
    private Point2D.Double tempPt2D = new Point2D.Double();
    protected Point tempPt = new Point();

		//private static int xt;


    /*
     * Recomputes the graphic's bounds.  
     * 
     * Notes:
     * (1) Before recomputing the bounds, the bounds are copied into lastBounds.
     * (2) If a clip is set, the clip is applied to the bounds.
     * (3) If the bounds are null, the bounds are set to a zero-dimension 
     *     rectangle located at the graphic's screen location.
     */
    protected void rebuildBounds() {

        // Save the current bounds
    	// BH avoiding use of ambiguous Rectangle.setBounds()
        lastBounds.x = bounds.x;
        lastBounds.y = bounds.y;
        lastBounds.width = bounds.width;
        lastBounds.height = bounds.height;

        // Ask the implementing subclass to compute its bounds.
        Rectangle newBounds = determineBounds();

        // Apply clipping
        if ( clip != null && newBounds != null ) {
            Rectangle clipBounds = clip.getBounds();
            /* WORKAROUND:
             * Rectangle.intersection doesn't work as advertised when the
             * rectangles don't intersect, so check for intersection using
             * Rectangle.intersects before calling Rectangle.intersection.
             */
            if ( newBounds.intersects( clipBounds ) ) {
                newBounds = newBounds.intersection( clipBounds );
            }
            else {
                newBounds = null;
            }
        }

        // Set the new bounds
        if ( newBounds != null ) {
        	bounds.x = newBounds.x;
        	bounds.y = newBounds.y;
        	bounds.width = newBounds.width;
        	bounds.height = newBounds.height;
        }
        else {
            /* BUG FIX:
             * If determineBounds returned null, then we can't just leave the bounds
             * in a "stale" state.  It would probably make sense for getBounds()
             * to return null if a graphic has no bounds, but that would likely 
             * break existing code.  So we'll set the bounds to be a zero-dimension
             * rectangle located at the graphic's transformed location.
             */
            getNetTransform().transform( getLocationNoCopy(), tempPt2D );
            bounds.x = (int) tempPt2D.getX();
            bounds.y = (int) tempPt2D.getY();
            bounds.width = bounds.height = 0;
        }
    }

    /**
     * Determine the Local Bounds of this PhetGraphic, ie, the bounds of this
     * PhetGraphic without accounting for any parent transforms.
     *
     * @return the bounds of this PhetGraphic without accounting for parent transforms.
     */

    public Rectangle getLocalBounds() {
        if ( parent == null ) {
            return getBounds();
        }
        else {
            Rectangle global = getBounds();
            AffineTransform parentTransform = parent.getNetTransform();

            // TODO: Profile. This next block looks very expensive
            try {
                AffineTransform inverse = parentTransform.createInverse();
                Rectangle localBounds = inverse.createTransformedShape( global ).getBounds();
                return localBounds;
            }
            catch ( Exception e ) {
                e.printStackTrace();
                throw new RuntimeException( e );
            }
        }
    }

    /**
     * Please oh please give me some javadoc.
     */
    public Rectangle getVisibleBounds() {
        return isVisible() ? getBounds() : null;
    }

    //----------------------------------------------------------------------------
    // Location methods
    //----------------------------------------------------------------------------

    /**
     * Sets the location of this graphic.
     * <p/>
     * The location is a translation that is applied after the local transform,
     * but before the parent's net transform.  This effectively moves the
     * graphic's registration point to the specified location, relative
     * to the parent container.
     *
     * @param p the location
     */
    public void setLocation( Point p ) {
        setLocation2( p.x, p.y );
    }

    /**
     * Convenience method, sets the location.
     *
     * @param x X coordinate
     * @param y Y coordinate
     * @see edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetGraphic#setLocation(java.awt.Point)
     */
    public void setLocation2( int x, int y ) {
        if ( location.x != x || location.y != y ) {
            location.x = x; // BH optimized out Point.setLocation
            location.y = y;
            setBoundsDirtyOpt();
            autorepaint();
        }
    }

    
    /**
     * Gets the location.
     *
     * @return the location
     * @see edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetGraphic#setLocation(java.awt.Point)
     */
    public Point getLocation() {
        return new Point( location );
    }

    /**
     * Gets the location.
     *
     * @return the location
     * @see edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetGraphic#setLocation(java.awt.Point)
     */
    public Point getLocationNoCopy() {
        return location;
    }

    /**
     * Convenience method, gets the X coordinate of the location.
     *
     * @return X coordinate
     */
    public int getX() {
        return location.x;
    }

    /**
     * Convenience method, gets the Y coordinate of the location.
     *
     * @return Y coordinate
     */
    public int getY() {
        return location.y;
    }

    //----------------------------------------------------------------------------
    // Size methods
    //----------------------------------------------------------------------------

    /**
     * Gets the size of the graphic.
     * The size is the dimension of the bounding rectangle.
     *
     * @return the size
     */
    public Dimension getSize() {
        return new Dimension( getWidth(), getHeight() );
    }

    /**
     * Gets the width of the graphics.
     * The width is the width of the bounding rectangle.
     *
     * @return the width
     */
    public int getWidth() {
        return getBounds().width;
    }

    /**
     * Gets the height of the graphics.
     * The height is the height of the bounding rectangle.
     *
     * @return the height
     */
    public int getHeight() {
        return getBounds().height;
    }

    //----------------------------------------------------------------------------
    // Change Notification methods
    //----------------------------------------------------------------------------

    /**
     * Adds an Observer for changes in this PhetGraphic.
     *
     * @param phetGraphicListener
     */
    public void addPhetGraphicListener( PhetGraphicListener phetGraphicListener ) {
        listeners.add( phetGraphicListener );
    }

    public void removePhetGraphicListener( PhetGraphicListener phetGraphicListener ) {
        listeners.remove( phetGraphicListener );
    }

    /**
     * Notifies registered Observers that this PhetGraphic has changed.
     */
    protected void notifyChanged() {
        for ( int i = 0; i < listeners.size(); i++ ) {
            PhetGraphicListener phetGraphicListener = (PhetGraphicListener) listeners.get( i );
            phetGraphicListener.phetGraphicChanged( this );
        }
    }

    //----------------------------------------------------------------------------
    // Translation interactivity methods
    //----------------------------------------------------------------------------

    /**
     * Adds a listener for translations (dragging).
     *
     * @param translationListener the listener
     */
    public void addTranslationListener( TranslationListener translationListener ) {
        addMouseInputListener( new TranslationHandler( translationListener ) );
    }

    //----------------------------------------------------------------------------
    // Mouse Input interactivity methods
    //----------------------------------------------------------------------------

    /**
     * Adds a mouse input listener.
     *
     * @param listener the listener add
     */
    public void addMouseInputListener( MouseInputListener listener ) {
        mouseInputListener.addMouseInputListener( listener );
    }

    /**
     * Removes a mouse input listener.
     *
     * @param listener the listener to remove
     */
    public void removeMouseInputListener( MouseInputListener listener ) {
        mouseInputListener.removeMouseInputListener( listener );
    }

    /**
     * Removes all mouse input listeners.
     */
    public void removeAllMouseInputListeners() {
        mouseInputListener.removeAllMouseInputListeners();
    }

    /**
     * Gets the number of mouse input listeners.
     *
     * @return the number of mouse input listeners
     */
    public int numMouseInputListeners() {
        return mouseInputListener.numMouseInputListeners();
    }

    /**
     * Gets the delegate that manages mouse input listeners.
     *
     * @return the delegate
     */
    public CompositeMouseInputListener getMouseInputListener() {
        return mouseInputListener;
    }

    public void setMouseInputListener( CompositeMouseInputListener mouseInputListener ) {
        this.mouseInputListener = mouseInputListener;
    }

    /**
     * Sets an internal state subclasses can use to determine whether to
     * ignore the mouse.
     *
     * @param ignoreMouse true or false
     */
    public void setIgnoreMouse( boolean ignoreMouse ) {
        this.ignoreMouse = ignoreMouse;
    }

    /**
     * Gets the current state of ignore mouse.
     *
     * @return true or false
     */
    public boolean getIgnoreMouse() {
        return ignoreMouse;
    }

    /**
     * Passes a "mouse clicked" event to the mouse input delegate,
     * who in turn sends it to all registered mouse input listeners.
     *
     * @param e the event
     */
    public void fireMouseClicked( MouseEvent e ) {
        if ( isVisible() ) {
            mouseInputListener.mouseClicked( e );
        }
    }

    /**
     * Passes a "mouse pressed" event to the mouse input delegate,
     * who in turn sends it to all registered mouse input listeners.
     *
     * @param e the event
     */
    public void fireMousePressed( MouseEvent e ) {
        if ( isVisible() ) {
            mouseInputListener.mousePressed( e );
        }
    }

    /**
     * Passes a "mouse released" event to the mouse input delegate,
     * who in turn sends it to all registered mouse input listeners.
     *
     * @param e the event
     */
    public void fireMouseReleased( MouseEvent e ) {
        if ( isVisible() ) {
            mouseInputListener.mouseReleased( e );
        }
    }

    /**
     * Passes a "mouse entered" event to the mouse input listener delegate,
     * who in turn sends it to all registered mouse input listeners.
     *
     * @param e the event
     */
    public void fireMouseEntered( MouseEvent e ) {
        if ( isVisible() ) {
            mouseInputListener.mouseEntered( e );
        }
    }

    /**
     * Passes a "mouse exited" event to the mouse input listener delegate,
     * who in turn sends it to all registered mouse input listeners.
     *
     * @param e the event
     */
    public void fireMouseExited( MouseEvent e ) {
        if ( isVisible() ) {
            mouseInputListener.mouseExited( e );
        }
    }

    /**
     * Fires a "mouse exited" event because this component became invisible.
     * This explicitly avoids the visibility condition for firing the event.
     */
    public void fireMouseExitedBecauseInvisible( MouseEvent e ) {
        mouseInputListener.mouseExited( e );
    }

    /**
     * Passes a "mouse dragged" event to the mouse input listener delegate,
     * who in turn sends it to all registered mouse input listeners.
     *
     * @param e the event
     */
    public void fireMouseDragged( MouseEvent e ) {
        if ( isVisible() ) {
            mouseInputListener.mouseDragged( e );
        }
    }

    /**
     * Passes a "mouse moved" event to the mouse input listener delegate,
     * who in turn sends it to all registered mouse input listeners.
     *
     * @param e the event
     */
    public void fireMouseMoved( MouseEvent e ) {
        if ( isVisible() ) {
            mouseInputListener.mouseMoved( e );
        }
    }

    //----------------------------------------------------------------------------
    // Cursor interactivity methods
    //----------------------------------------------------------------------------

    public CursorControl getCursorControl() {
        return cursorControl;
    }

    public void setCursorControl( CursorControl cursorControl ) {
        this.cursorControl = cursorControl;
    }

    /**
     * Sets the mouse cursor to look like the specified cursor.
     *
     * @param cursor the cursor
     */
    public void setCursor( Cursor cursor ) {
        if ( cursorControl != null ) {
            removeCursor();
        }
        if ( cursorControl == null ) {
            cursorControl = new CursorControl( cursor );
            addMouseInputListener( cursorControl );
        }
    }

    /**
     * Sets the mouse cursor to use the standard hand cursor, Cursor.HAND_CURSOR.
     */
    public void setCursorHand() {
        setCursor( Cursor.getPredefinedCursor( Cursor.HAND_CURSOR ) );
    }

    /**
     * Removes any custom cursor set on this graphic.
     */
    public void removeCursor() {
        removeMouseInputListener( cursorControl );
        cursorControl = null;
    }

    //----------------------------------------------------------------------------
    // Popup Menu methods
    //----------------------------------------------------------------------------


    /**
     * Sets a popup menu, displayed when the right mouse button is pressed.
     *
     * @param menu the menu
     */
    public void setPopupMenu( final JPopupMenu menu ) {
        if ( popupHandler != null ) {
            removeMouseInputListener( popupHandler );
        }
        popupHandler = new MouseInputAdapter() {
            @Override
						public void mouseReleased( MouseEvent e ) {
                if ( SwingUtilities.isRightMouseButton( e ) ) {
                    menu.show( e.getComponent(), e.getX(), e.getY() );
                }
            }
        };
        addMouseInputListener( popupHandler );
    }

    //----------------------------------------------------------------------------
    // Paint related methods
    //----------------------------------------------------------------------------

    /**
     * Paints the graphic. Subclasses must implement this method.
     * For a good example, see PhetShapeGraphic.paint.
     * <p/>
     * In general, a well-behaved paint method should:
     * <ul>
     * <li>leave the graphics context as it found it, by either explicitly
     * saving and restoring state information, or by calling saveGraphicsState
     * and restoreGraphicsState
     * <li>use getTransform to get the transform information it needs to
     * correctly draw the graphic.  This transform should be passed to
     * g2.transform.
     * </ul>
     *
     * @param g2 the 2D graphics context
     */
    public abstract void paint( Graphics2D g2 );

    /**
     * Set the autorepaint value.
     *
     * @param autorepaint true or false
     */
    public void setAutoRepaint( boolean autorepaint ) {
        this.autorepaint = autorepaint;
    }

    /**
     * Repaints the graphic if autorepaint is set to true.
     */
    public void autorepaint() {
        if ( autorepaint ) {
            repaint();
        }
    }

    /**
     * Repaints the visible rectangle on this graphic's Component.
     */
    public void repaint() {
    	repaintPG();
    }

	protected void repaintPG() { // BH optimized SAEM
		if (isVisible()) {
			forceRepaint();
		}
	}

		/**
     * Forces a repaint of this graphic.
     */
    protected void forceRepaint() {
        syncBounds();//possibly fires a phet graphic moved event.
        //TODO we should fire bounds change events right when setLocation(), or transform() is called, rather
        //than waiting for forceRepaint() to (hopefully) get called.
        if ( SKIP_RECTANGLE_COMPUTATION ) {
            return; // BH YES!
        }

        if ( lastBounds != null ) { 
        	if (isApparatus2)
        		((ApparatusPanel2) container).addRectangleToRepaintList( lastBounds.x, lastBounds.y, lastBounds.width, lastBounds.height ); // BH optimized out SAEM
        	else
            container.repaint( lastBounds.x, lastBounds.y, lastBounds.width, lastBounds.height );
        }
        if ( bounds != null  && !RectangleUtils.areEqual(bounds, lastBounds) ) {
        	if (isApparatus2)
        		((ApparatusPanel2)container).addRectangleToRepaintList( bounds.x, bounds.y, bounds.width, bounds.height );
        	else
            container.repaint( bounds.x, bounds.y, bounds.width, bounds.height );
        }
    }

    //----------------------------------------------------------------------------
    // KeyListener implementation
    //----------------------------------------------------------------------------

    public void addKeyListener( KeyListener keyListener ) {
        this.keyListener.addKeyListener( keyListener );
    }

    public void removeKeyListener( KeyListener keyListener ) {
        this.keyListener.removeKeyListener( keyListener );
    }

    public int numKeyListeners() {
        return keyListener.numKeyListeners();
    }

    /**
     * Not for client use.
     *
     * @param e
     */
    public void fireKeyTyped( KeyEvent e ) {
        if ( isVisible() ) {
            keyListener.keyTyped( e );
        }
    }

    /**
     * Not for client use.
     *
     * @param e
     */
    public void fireKeyPressed( KeyEvent e ) {
        if ( isVisible() ) {
            keyListener.keyPressed( e );
        }
    }

    /**
     * Not for client use.
     *
     * @param e
     */
    public void fireKeyReleased( KeyEvent e ) {
        if ( isVisible() ) {
            keyListener.keyReleased( e );
        }
    }

    /**
     * No-op by default (override for behavior), when it gains key focus.
     */
    public void gainedKeyFocus() {
    }

    public void lostKeyFocus() {
    }
    

  /**
   * 
   * @param t a net transform matrix
   * 
   * @return
   */
	protected Point getTranslationOrNull(AffineTransform t, Point pt) {
		boolean transOnly = false;
		int tx = 0, ty = 0;
		/**
		 * @j2sNative
		 * 
		 *            transOnly = (t.m00 == 1 
		 *            && t.m01 == 0 && t.m10 == 0 && t.m11 == 1); 
		 *            tx = t.m02 >> 0; ty = t.m12 >> 0;
		 */
		{
			transOnly = (t.getScaleX() == 1 && t.getShearX()== 0 && t.getShearY() == 0 && t.getScaleY() == 1);
			tx = (int) t.getTranslateX();
			ty = (int) t.getTranslateY();
		}
		if (transOnly) {
			pt.x = tx;
			pt.y = ty;
			return pt;
		}
		return null;
	}
	
	protected Shape getShapeRect() {
		if (boundsDirty) {
			isTranslationOnly = false;
			if (localRect.width == Integer.MAX_VALUE)
				return null;
			tempRect.x = localRect.x;
			tempRect.y = localRect.y;
			tempRect.width = localRect.width;
			tempRect.height = localRect.height;
			AffineTransform t = getNetTransform();
			Point pt = getTranslationOrNull(t, tempPt);
			isTranslationOnly = (pt != null);
			if (isTranslationOnly) {
				shapeRect.x = pt.x;
				shapeRect.y = pt.y;
				shapeRect.width = tempRect.width;
				shapeRect.height = tempRect.height;
		  } else if (shapeDirty) {
				shape = t.createTransformedShape(tempRect);
				shapeDirty = false;
			}
		}
		return shape;
	}

	/**
	 * Determine the bounds for a rotated shape, 
	 * or if there is no shape or the transform is just a translation,
	 * then return a temporary rectangle 
	 * 
	 */
	protected Rectangle determineShapeBounds() {
    return (getShapeRect() != null ? getShapeRect().getBounds() : isTranslationOnly ? shapeRect : null);
	}

}