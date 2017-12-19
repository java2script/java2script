// Copyright 2002-2012, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: olsonj $
 * Revision : $Revision: 66113 $
 * Date modified : $Date: 2012-07-21 04:27:33 -0500 (Sat, 21 Jul 2012) $
 */
package edu.colorado.phet.common.phetcommon.view.graphics.transforms;

import java.awt.Point;
import java.awt.Rectangle;
import java.awt.Shape;
import java.awt.geom.AffineTransform;
import java.awt.geom.Dimension2D;
import java.awt.geom.NoninvertibleTransformException;
import java.awt.geom.Point2D;
import java.awt.geom.Rectangle2D;

import edu.colorado.phet.common.phetcommon.math.vector.AbstractVector2D;
import edu.colorado.phet.common.phetcommon.math.vector.Vector2D;

/**
 * ModelViewTransform2D
 *
 * @author ?
 * @version $Revision: 66113 $
 * @deprecated use ModelViewTransform instead
 */
@Deprecated
public class ModelViewTransform2D {

    //----------------------------------------------------------------------------
    // Class<?> data
    //----------------------------------------------------------------------------

    private Rectangle2D.Double modelBounds;
    private Rectangle2D viewBounds;
    private CompositeTransformListener listeners = new CompositeTransformListener();
    private boolean forwardTransformDirty = true;
    private AffineTransform forwardTransform;
    private boolean backTransformDirty = true;
    private AffineTransform backTransform;
    private boolean invertY;

    //----------------------------------------------------------------------------
    // Constructors
    //----------------------------------------------------------------------------

    /**
     * Constructs a forwardTransform from the specified model bounds to view bounds.
     *
     * @param modelBounds
     * @param viewBounds
     */
    public ModelViewTransform2D( Rectangle2D modelBounds, Rectangle2D viewBounds ) {
        this( modelBounds, viewBounds, true );
    }

    /**
     * Constructs a forwardTransform from the specified model bounds to view bounds.
     *
     * @param modelBounds
     * @param viewBounds
     * @param invertY
     */
    public ModelViewTransform2D( Rectangle2D modelBounds, Rectangle2D viewBounds, boolean invertY ) {
        setModelBounds( modelBounds );
        setViewBounds( viewBounds );
        this.invertY = invertY;
    }

    /**
     * Constructs a transform from two points in the model reference frame and two points
     * in the view reference frame.
     *
     * @param mp1 The point in the model frame that corresponds to vp1 in the view reference frame
     * @param mp2 The point in the model frame that corresponds to vp2 in the view reference frame
     * @param vp1 The point in the view frame that corresponds to mp1 in the model reference frame
     * @param vp2 The point in the view frame that corresponds to mp2 in the model reference frame
     */
    public ModelViewTransform2D( Point2D mp1, Point2D mp2, Point2D vp1, Point2D vp2 ) {
        Rectangle2D.Double mr = new Rectangle2D.Double( mp1.getX(), mp1.getY(), 0, 0 );
        mr.add( mp2 );
        Rectangle2D vr = new Rectangle2D.Double( vp1.getX(), vp1.getY(), 0, 0 );
        vr.add( vp2 );
        setModelBounds( mr );
        setViewBounds( vr );
    }

    public ModelViewTransform2D( Point2D mp1, Point2D mp2, Point2D vp1, Point2D vp2, boolean invertY ) {
        this( mp1, mp2, vp1, vp2 );
        this.invertY = invertY;
    }

    /**
     * Somewhat simplified constructor that assumes that the aspect ratio is
     * maintained in all cases.
     *
     * @param mp1     - Point in the model
     * @param vp1     - Corresponding point in the view
     * @param scale   - Scale from model to view
     * @param invertY - To invert Y or not to invert Y, that is the question
     */
    public ModelViewTransform2D( Point2D mp1, Point2D vp1, double scale, boolean invertY ) {

        this( mp1, new Point2D.Double( mp1.getX() + 1, mp1.getY() + 1 ), vp1,
              new Point2D.Double( vp1.getX() + 1 * scale, vp1.getY() + 1 * scale ) );
        this.invertY = invertY;
    }

    /**
     * Create an identity transform.
     */
    public ModelViewTransform2D() {
        this( new Rectangle2D.Double( 0, 0, 1, 1 ), new Rectangle2D.Double( 0, 0, 1, 1 ), false );
    }

    //----------------------------------------------------------------------------
    // Bounds methods
    //----------------------------------------------------------------------------

    public void setModelBounds( Rectangle2D modelBounds ) {
        if ( modelBounds.getWidth() <= 0 || modelBounds.getHeight() <= 0 ) {
            throw new RuntimeException( "modelBounds dimensions must be > 0 : " + modelBounds );
        }
        this.modelBounds = new Rectangle2D.Double( modelBounds.getX(), modelBounds.getY(), modelBounds.getWidth(), modelBounds.getHeight() );
        forwardTransformDirty = true;
        backTransformDirty = true;
        listeners.transformChanged( this );
    }

    public void panModelViewport( double dx, double dy ) {
        setModelBounds( new Rectangle2D.Double( modelBounds.getX() + dx, modelBounds.getY() + dy, modelBounds.getWidth(), modelBounds.getHeight() ) );
    }

    public Rectangle2D getModelBounds() {
        return modelBounds;
    }

    public void setViewBounds( Rectangle2D viewBounds ) {
        if ( viewBounds.getWidth() <= 0 || viewBounds.getHeight() <= 0 ) {
            throw new RuntimeException( "viewBounds dimensions must be > 0 : " + viewBounds );
        }
        forwardTransformDirty = true;
        backTransformDirty = true;
        this.viewBounds = viewBounds;
        listeners.transformChanged( this );
    }

    //----------------------------------------------------------------------------
    // Model-to-View methods  (integer precision)
    //----------------------------------------------------------------------------

    public Point modelToView( Point2D p ) {
        return toPoint( modelToViewDouble( p ) );
    }

    public Point modelToView( double x, double y ) {
        return modelToView( new Point2D.Double( x, y ) );
    }

    public Point modelToView( AbstractVector2D v ) {
        return modelToView( v.toPoint2D() );
    }

    public Rectangle modelToView( Rectangle2D r ) {
        return toRectangle( modelToViewDouble( r ) );
    }

    public int modelToViewX( double x ) {
        return modelToView( x, 0 ).x;
    }

    public int modelToViewY( double y ) {
        return modelToView( 0, y ).y;
    }

    public Point modelToViewDifferential( Point2D p ) {
        fixForwardTransform();
        return toPoint( forwardTransform.deltaTransform( p, null ) );
    }

    public Point modelToViewDifferential( double dx, double dy ) {
        return modelToViewDifferential( new Point2D.Double( dx, dy ) );
    }

    public int modelToViewDifferentialX( double dx ) {
        return modelToViewDifferential( dx, 0 ).x;
    }

    public int modelToViewDifferentialY( double dy ) {
        return modelToViewDifferential( 0, dy ).y;
    }

    public Point2D viewToModelDifferential( Dimension2D delta ) {
        return viewToModelDifferential( delta.getWidth(), delta.getHeight() );
    }

    //----------------------------------------------------------------------------
    // Model-to-View methods  (double precision)
    //----------------------------------------------------------------------------

    public Point2D modelToViewDouble( Point2D p ) {
        fixForwardTransform();
        Point2D out = forwardTransform.transform( p, null );
        return out;
    }

    public Point2D modelToViewDouble( double x, double y ) {
        return modelToViewDouble( new Point2D.Double( x, y ) );
    }

    public Point2D modelToViewDouble( Vector2D v ) {
        return modelToViewDouble( v.toPoint2D() );
    }

    public Rectangle2D modelToViewDouble( Rectangle2D r ) {
        Point2D cornerA = modelToViewDouble( r.getX(), r.getY() );
        Point2D cornerB = modelToViewDouble( r.getX() + r.getWidth(), r.getY() + r.getHeight() );
        Rectangle2D out = new Rectangle2D.Double( cornerA.getX(), cornerA.getY(), 0, 0 );
        out.add( cornerB );
        return out;
    }

    public double modelToViewXDouble( double x ) {
        return modelToViewDouble( x, 0 ).getX();
    }

    public double modelToViewYDouble( double y ) {
        return modelToViewDouble( 0, y ).getY();
    }

    public Point2D modelToViewDifferentialDouble( Point2D p ) {
        fixForwardTransform();
        return forwardTransform.deltaTransform( p, null );
    }

    public Point2D modelToViewDifferentialDouble( double dx, double dy ) {
        return modelToViewDifferentialDouble( new Point2D.Double( dx, dy ) );
    }

    public double modelToViewDifferentialXDouble( double dx ) {
        return modelToViewDifferentialDouble( dx, 0 ).getX();
    }

    public double modelToViewDifferentialYDouble( double dy ) {
        return modelToViewDifferentialDouble( 0, dy ).getY();
    }

    //----------------------------------------------------------------------------
    // View-to-Model methods
    //----------------------------------------------------------------------------

    public Point2D viewToModel( Point2D p ) {
        fixBackTransform();
        return backTransform.transform( p, null );
    }

    public Point2D viewToModel( double x, double y ) {
        return viewToModel( new Point2D.Double( x, y ) );
    }

    public double viewToModelX( double x ) {
        return viewToModel( x, 0 ).getX();
    }

    public double viewToModelY( double y ) {
        return viewToModel( 0, y ).getY();
    }

    public Point2D viewToModelDifferential( Point2D p ) {
        fixBackTransform();
        return backTransform.deltaTransform( p, null );
    }

    public Point2D viewToModelDifferential( double dx, double dy ) {
        return viewToModelDifferential( new Point2D.Double( dx, dy ) );
    }

    public double viewToModelDifferentialX( double dx ) {
        return viewToModelDifferential( dx, 0 ).getX();
    }

    public double viewToModelDifferentialY( double dy ) {
        return viewToModelDifferential( 0, dy ).getY();
    }

    //----------------------------------------------------------------------------
    // Transform methods
    //----------------------------------------------------------------------------

    public Shape createTransformedShape( Shape shape ) {
        fixForwardTransform();
        return forwardTransform.createTransformedShape( shape );
    }

    public AffineTransform getAffineTransform() {
        fixForwardTransform();
        return forwardTransform;
    }

    public static AffineTransform createTX( Rectangle2D viewBounds, Rectangle2D modelBounds ) {
        double m00 = viewBounds.getWidth() / modelBounds.getWidth();
        double m02 = viewBounds.getX() - m00 * modelBounds.getX();
        double m11 = viewBounds.getHeight() / modelBounds.getHeight();
        double m12 = viewBounds.getY() - m11 * modelBounds.getY();
        return new AffineTransform( m00, 0, 0, m11, m02, m12 );
    }

    public static AffineTransform createTXInvertY( Rectangle2D viewBounds, Rectangle2D modelBounds ) {
        double m00 = viewBounds.getWidth() / modelBounds.getWidth();
        double m11 = -viewBounds.getHeight() / modelBounds.getHeight();
        double m02 = viewBounds.getX() - m00 * modelBounds.getX();
        //double m12 = viewBounds.getY() - m11 * modelBounds.getMaxY();
        double m12 = viewBounds.getY() + viewBounds.getHeight() / modelBounds.getHeight() * ( modelBounds.getY() + modelBounds.getHeight() );
        return new AffineTransform( m00, 0, 0, m11, m02, m12 );
    }

    private void fixForwardTransform() {
        if ( forwardTransformDirty ) {
            forwardTransform = createForwardTransform();
            forwardTransformDirty = false;
        }
    }

    private void fixBackTransform() {
        if ( backTransformDirty ) {
            backTransform = createBackTransform();
            backTransformDirty = false;
        }
    }

    protected AffineTransform createForwardTransform() {
        if ( invertY ) {
            return createTXInvertY( viewBounds, modelBounds );
        }
        else {
            return createTX( viewBounds, modelBounds );
        }
    }

    protected AffineTransform createBackTransform() {
        fixForwardTransform();
        try {
            return forwardTransform.createInverse();
        }
        catch ( NoninvertibleTransformException e ) {
            throw new RuntimeException( e );
        }
    }

    //----------------------------------------------------------------------------
    // Event handling
    //----------------------------------------------------------------------------

    public void addTransformListener( TransformListener listener ) {
        listeners.addTransformListener( listener );
    }

    public void removeTransformListener( TransformListener listener ) {
        listeners.removeTransformListener( listener );
    }

    public int numTransformListeners() {
        return listeners.numTransformListeners();
    }

    public TransformListener[] getTransformListeners() {
        return listeners.getTransformListeners();
    }

    //----------------------------------------------------------------------------
    //  Object overrides
    //----------------------------------------------------------------------------

    @Override
		public String toString() {
        return "modelBounds=" + modelBounds.toString() + ", viewBounds=" + viewBounds;
    }

    //----------------------------------------------------------------------------
    //  Utilities for converting precision
    //----------------------------------------------------------------------------

    private static Point toPoint( Point2D p ) {
        if ( p instanceof Point ) {
            return (Point) p;
        }
        else {
            return new Point( (int) p.getX(), (int) p.getY() );
        }
    }

    private static Rectangle toRectangle( Rectangle2D r ) {
        if ( r instanceof Rectangle ) {
            return (Rectangle) r;
        }
        else {
            return new Rectangle( (int) r.getX(), (int) r.getY(), (int) r.getWidth(), (int) r.getHeight() );
        }
    }

    public Rectangle2D getViewBounds() {
        return new Rectangle2D.Double( viewBounds.getX(), viewBounds.getY(), viewBounds.getWidth(), viewBounds.getHeight() );
    }
}
