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
import java.awt.geom.NoninvertibleTransformException;
import java.awt.geom.Point2D;
import java.awt.geom.Rectangle2D;

import edu.colorado.phet.common.phetcommon.math.vector.Vector2D;

/**
 * ModelViewTransform2D
 *
 * @author ?
 * @version $Revision: 66113 $
 */
public class LinearTransform2D {
    private Rectangle2D sourceBounds;
    private Rectangle2D destBounds;
    private boolean forwardTransformDirty = true;
    private AffineTransform forwardTransform;
    private boolean backTransformDirty = true;
    private AffineTransform backTransform;
    private boolean invertY;

    /**
     * Constructs a forwardTransform from the specified model bounds to view bounds.
     *
     * @param modelBounds
     * @param viewBounds
     */
    public LinearTransform2D( Rectangle2D modelBounds, Rectangle2D viewBounds ) {
        this( modelBounds, viewBounds, true );
    }

    public LinearTransform2D( Rectangle2D modelBounds, Rectangle2D viewBounds, boolean invertY ) {
        setSourceBounds( modelBounds );
        setDestinationBounds( viewBounds );
        this.invertY = invertY;
    }

    /**
     * Constructs a transform from two points in the model reference frame and two points
     * int the view reference frame.
     *
     * @param mp1 The point in the model frame that corresponds to vp1 in the view reference frame
     * @param mp2 The point in the model frame that corresponds to vp2 in the view reference frame
     * @param vp1 The point in the view frame that corresponds to mp1 in the model reference frame
     * @param vp2 The point in the view frame that corresponds to mp2 in the model reference frame
     */
    public LinearTransform2D( Point2D mp1, Point2D mp2,
                              Point2D vp1, Point2D vp2 ) {
        Rectangle2D.Double mr = new Rectangle2D.Double( mp1.getX(), mp1.getY(), 0, 0 );
        mr.add( mp2 );
        Rectangle2D vr = new Rectangle2D.Double( vp1.getX(), vp1.getY(), 0, 0 );
        vr.add( vp2 );
        setSourceBounds( mr );
        setDestinationBounds( vr );
    }

    private static Point toPoint( Point2D pt ) {
        if ( pt instanceof Point ) {
            return (Point) pt;
        }
        else {
            return new Point( (int) pt.getX(), (int) pt.getY() );
        }
    }

    /**
     * Transforms the model coordinate to the corresponding view coordinate.
     */
    public Point modelToView( double x, double y ) {
        return modelToView( new Point2D.Double( x, y ) );
    }

    public Point modelToView( Point2D pt ) {
        fixForwardTransform();
        Point2D out = forwardTransform.transform( pt, null );
        return toPoint( out );
    }

    private void fixForwardTransform() {
        if ( forwardTransformDirty ) {
            forwardTransform = createForwardTransform();
            forwardTransformDirty = false;
        }
    }

    protected AffineTransform createForwardTransform() {
        if ( invertY ) {
            return createTXInvertY( destBounds, sourceBounds );
        }
        else {
            return createTX( destBounds, sourceBounds );
        }
    }

    public Point modelToView( Vector2D vec ) {
        return modelToView( vec.toPoint2D() );
    }

    public int modelToViewX( double x ) {
        return modelToView( new Point2D.Double( x, 0 ) ).x;
    }

    public int modelToViewY( double y ) {
        return modelToView( new Point2D.Double( 0, y ) ).y;
    }

    @Override
		public String toString() {
        return "sourceBounds=" + sourceBounds + ", destBounds=" + destBounds;
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
        double m12 = viewBounds.getY() + viewBounds.getHeight() / modelBounds.getHeight() * ( modelBounds.getY() + modelBounds.getHeight() );
        return new AffineTransform( m00, 0, 0, m11, m02, m12 );
    }

    public Point2D viewToModel( int x, int y ) {
        return viewToModel( new Point( x, y ) );
    }

    public Point2D viewToModel( Point pt ) {
        fixBackTransform();
        return backTransform.transform( pt, null );
    }

    private void fixBackTransform() {
        if ( backTransformDirty ) {
            backTransform = createBackTransform();
            backTransformDirty = false;
        }
    }

    private AffineTransform createBackTransform() {
        fixForwardTransform();
        try {
            return forwardTransform.createInverse();
        }
        catch ( NoninvertibleTransformException e ) {
            throw new RuntimeException( e );
        }
    }

    public double viewToModelY( int y ) {
        return viewToModel( 0, y ).getY();
    }

    public double viewToModelX( int x ) {
        return viewToModel( x, 0 ).getX();
    }

    public Rectangle2D getSourceBounds() {
        return sourceBounds;
    }

    public void setSourceBounds( Rectangle2D sourceBounds ) {
        if ( sourceBounds.getWidth() <= 0 ) {
            throw new RuntimeException( "Model Width <= 0" );
        }
        else if ( sourceBounds.getHeight() <= 0 ) {
            throw new RuntimeException( "Model height<= 0" );
        }
        this.sourceBounds = sourceBounds;
        forwardTransformDirty = true;
        backTransformDirty = true;
    }

    public void setDestinationBounds( Rectangle2D destBounds ) {
        if ( destBounds.getWidth() <= 0 ) {
            throw new RuntimeException( "View Bounds width must be positive." );
        }
        if ( destBounds.getHeight() <= 0 ) {
            throw new RuntimeException( "View Bounds height must be positive." );
        }
        forwardTransformDirty = true;
        backTransformDirty = true;
        this.destBounds = destBounds;
    }

    public Rectangle2D getOutputBounds() {
        return destBounds;
    }

    public int modelToViewDifferentialY( double dy ) {
        return modelToViewDifferential( 0, dy ).y;
    }

    public int modelToViewDifferentialX( double dx ) {
        return modelToViewDifferential( dx, 0 ).x;
    }

    public double viewToModelDifferentialY( int dy ) {
        return viewToModelDifferential( 0, dy ).getY();
    }

    public double viewToModelDifferentialX( int dx ) {
        return viewToModelDifferential( dx, 0 ).getX();
    }

    public Point2D viewToModelDifferential( Point2D rel ) {
        fixBackTransform();
        return backTransform.deltaTransform( rel, null );
    }

    public Point2D viewToModelDifferential( int dx, int dy ) {
        return viewToModelDifferential( new Point( dx, dy ) );
    }

    public Point modelToViewDifferential( double dx, double dy ) {
        return modelToViewDifferential( new Point2D.Double( dx, dy ) );
    }

    private Point modelToViewDifferential( Point2D.Double pt ) {
        fixForwardTransform();
        return toPoint( forwardTransform.deltaTransform( pt, null ) );
    }

    /**
     * Converts a model rectangle to the corresponding view rectangle.
     */
    public Rectangle modelToView( Rectangle2D.Double modelRect ) {
        Point cornerA = modelToView( modelRect.x, modelRect.y );
        Point cornerB = modelToView( modelRect.x + modelRect.width, modelRect.y + modelRect.height );
        Rectangle out = new Rectangle( cornerA.x, cornerA.y, 0, 0 );
        out.add( cornerB );
        return out;
    }

    public Shape createTransformedShape( Shape shape ) {
        fixForwardTransform();
        return forwardTransform.createTransformedShape( shape );
    }

    public AffineTransform getAffineTransform() {
        fixForwardTransform();
        return forwardTransform;
    }

    public AffineTransform getInverseTransform() {
        fixBackTransform();
        return backTransform;
    }

}
