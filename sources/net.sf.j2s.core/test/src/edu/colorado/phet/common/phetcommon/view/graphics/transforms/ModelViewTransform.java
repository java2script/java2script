// Copyright 2002-2012, University of Colorado
package edu.colorado.phet.common.phetcommon.view.graphics.transforms;

import java.awt.Shape;
import java.awt.geom.AffineTransform;
import java.awt.geom.Dimension2D;
import java.awt.geom.NoninvertibleTransformException;
import java.awt.geom.Point2D;
import java.awt.geom.Point2D.Double;
import java.awt.geom.Rectangle2D;

import edu.colorado.phet.common.phetcommon.math.ImmutableRectangle2D;
import edu.colorado.phet.common.phetcommon.math.vector.Vector2D;
import edu.colorado.phet.common.phetcommon.view.Dimension2DDouble;

/**
 * Provides a mapping between model and view coordinates.  Convenience constructors and methods around AffineTransform.
 *
 * @author Jon Olson
 * @author Sam Reid
 */
public class ModelViewTransform {
    //The transform is stored internally as an AffineTransform.  This is okay since the transform must be 2D and affine (non nonlinear warping)
    private AffineTransform transform;

    /**
     * Construct the ModelViewTransform with the specified AffineTransform transform
     *
     * @param transform the transform to represent
     */
    private ModelViewTransform( AffineTransform transform ) {
        this.transform = transform;
    }

    /*---------------------------------------------------------------------------*
    * Factory methods
    *----------------------------------------------------------------------------*/

    /**
     * Creates a ModelViewTransform that uses the identity transform (i.e. model coordinates are the same as view coordinates)
     *
     * @return the identity ModelViewTransform
     */
    public static ModelViewTransform createIdentity() {
        return new ModelViewTransform( new AffineTransform() );
    }

    /**
     * Creates a ModelViewTransform that has the specified scale and offset such that
     * view = model * scale + offset
     *
     * @param offset the offset in view coordinates
     * @param scale  the scale to map model to view
     * @return the resultant ModelViewTransform
     */
    public static ModelViewTransform createOffsetScaleMapping( Point2D offset, double scale ) {
        return new ModelViewTransform( new AffineTransform( scale, 0, 0, scale, offset.getX(), offset.getY() ) );
    }

    /**
     * Creates a shearless ModelViewTransform that has the specified scale and offset such that
     * view.x = model.x * xScale + offset.x
     * view.y = model.y * yScale + offset.y
     *
     * @param offset the offset in view coordinates
     * @param xScale the scale to map model to view in the x-dimension
     * @param yScale the scale to map model to view in the y-dimension
     * @return the resultant ModelViewTransform
     */
    public static ModelViewTransform createOffsetScaleMapping( Point2D offset, double xScale, double yScale ) {
        return new ModelViewTransform( new AffineTransform( xScale, 0, 0, yScale, offset.getX(), offset.getY() ) );
    }

    /**
     * Creates a shearless ModelViewTransform that maps the specified model point to the specified view point, with the given x and y scales.
     *
     * @param modelPoint the reference point in the model which maps to the specified view point
     * @param viewPoint  the reference point in the view
     * @param xScale     the amount to scale in the x direction
     * @param yScale     the amount to scale in the y direction
     * @return the resultant ModelViewTransform
     */
    public static ModelViewTransform createSinglePointScaleMapping( Point2D modelPoint, Point2D viewPoint, double xScale, double yScale ) {
        // mx * scale + ox = vx
        // my * scale + oy = vy
        double offsetX = viewPoint.getX() - modelPoint.getX() * xScale;
        double offsetY = viewPoint.getY() - modelPoint.getY() * yScale;
        return createOffsetScaleMapping( new Point2D.Double( offsetX, offsetY ), xScale, yScale );
    }

    /**
     * Creates a shearless ModelViewTransform that maps the specified model point to the specified view point, with the given scale factor for both x and y dimensions.
     *
     * @param modelPoint the reference point in the model which maps to the specified view point
     * @param viewPoint  the reference point in the view
     * @param scale      the amount to scale in the x and y directions
     * @return the resultant ModelViewTransform
     */
    public static ModelViewTransform createSinglePointScaleMapping( Point2D modelPoint, Point2D viewPoint, double scale ) {
        return createSinglePointScaleMapping( modelPoint, viewPoint, scale, scale );
    }

    /**
     * Creates a shearless ModelViewTransform that maps the specified model point to the specified view point, with the given scale factor for both x and y dimensions,
     * but inverting the y axis so that +y in the model corresponds to -y in the view.
     * Inverting the y axis is commonly necessary since +y is usually up in textbooks and -y is down in pixel coordinates.
     *
     * @param modelPoint the reference point in the model which maps to the specified view point
     * @param viewPoint  the reference point in the view
     * @param scale      the amount to scale in the x and y directions
     * @return the resultant ModelViewTransform
     */
    public static ModelViewTransform createSinglePointScaleInvertedYMapping( Point2D modelPoint, Point2D viewPoint, double scale ) {
        return createSinglePointScaleMapping( modelPoint, viewPoint, scale, -scale );
    }

    /**
     * Creates a shearless ModelViewTransform that maps the specified rectangle in the model to the specified rectangle in the view,
     * so that any point x% of the way across and y% down in the model rectangle will be mapped to the corresponding point x% across and y% down in the view rectangle.
     * Linear extrapolation is performed outside of the rectangle bounds.
     *
     * @param modelBounds the reference rectangle in the model, must have area > 0
     * @param viewBounds  the reference rectangle in the view, must have area > 0
     * @return the resultant ModelViewTransform
     */
    public static ModelViewTransform createRectangleMapping( Rectangle2D modelBounds, Rectangle2D viewBounds ) {
        double m00 = viewBounds.getWidth() / modelBounds.getWidth();
        double m02 = viewBounds.getX() - m00 * modelBounds.getX();
        double m11 = viewBounds.getHeight() / modelBounds.getHeight();
        double m12 = viewBounds.getY() - m11 * modelBounds.getY();
        return new ModelViewTransform( new AffineTransform( m00, 0, 0, m11, m02, m12 ) );
    }

    /**
     * Creates a shearless ModelViewTransform that maps the specified rectangle in the model to the specified rectangle in the view,
     * so that any point x% of the way across and y% down in the model rectangle will be mapped to the corresponding point x% across and (100-y)% down in the view rectangle.
     * Linear extrapolation is performed outside of the rectangle bounds.
     * Inverting the y axis is commonly necessary since +y is usually up in textbooks and -y is down in pixel coordinates.
     *
     * @param modelBounds the reference rectangle in the model, must have area > 0
     * @param viewBounds  the reference rectangle in the view, must have area > 0
     * @return the resultant ModelViewTransform
     */
    public static ModelViewTransform createRectangleInvertedYMapping( Rectangle2D modelBounds, Rectangle2D viewBounds ) {
        double m00 = viewBounds.getWidth() / modelBounds.getWidth();
        double m02 = viewBounds.getX() - m00 * modelBounds.getX();
        double m11 = -viewBounds.getHeight() / modelBounds.getHeight();
        // vY == (mY + mHeight) * m11 + m12
        double m12 = viewBounds.getY() - m11 * modelBounds.getMaxY();
        return new ModelViewTransform( new AffineTransform( m00, 0, 0, m11, m02, m12 ) );
    }

    /*---------------------------------------------------------------------------*
     * Accessors
     *---------------------------------------------------------------------------*/

    /**
     * Returns a defensive copy of the AffineTransform in the ModelViewTransform.
     *
     * @return a defensive copy of the AffineTransform in the ModelViewTransform
     */
    public AffineTransform getTransform() {
        return new AffineTransform( transform );
    }

    /*---------------------------------------------------------------------------*
    * Model To View transforms
    *----------------------------------------------------------------------------*/

    /**
     * Maps a point from model to view coordinates, instantiating a new instance with the view coordinate
     *
     * @param point the model point to transform to view coordinates
     * @return a new Point2D instance with coordinates corresponding to the mapping of the specified model coordinates.
     */
    public Point2D modelToView( Point2D point ) {
        return transform.transform( point, null );
    }

    /**
     * Maps a vector from model to view coordinates, instantiating a new instance with the vector in view coordinates
     *
     * @param vector2D the model vector2D to transform to view coordinates
     * @return a new ImmutableVector2D instance with coordinates corresponding to the mapping of the specified model coordinates.
     */
    public Vector2D modelToView( Vector2D vector2D ) {
        return new Vector2D( transform.transform( vector2D.toPoint2D(), null ) );
    }

    /**
     * Maps a delta from model coordinates to view coordinates, instantiating a new instance with the delta in view coordinates
     *
     * @param delta the difference in model coordinates to be transformed into view coordinates
     * @return a new Point2D instance corresponding to the delta in view coordinates
     */
    public Point2D modelToViewDelta( Point2D delta ) {
        return transform.deltaTransform( delta, null );
    }

    /**
     * Maps a delta from model coordinates to view coordinates, instantiating a new instance with the delta in view coordinates
     *
     * @param delta the difference in model coordinates to be transformed into view coordinates
     * @return a new ImmutableVector2D instance corresponding to the delta in view coordinates
     */
    public Vector2D modelToViewDelta( Vector2D delta ) {
        return new Vector2D( modelToViewDelta( delta.toPoint2D() ) );
    }

    /**
     * Maps a shape from model to view coordinates, instantiating a new instance with the view shape
     *
     * @param shape the model point to transform to the view coordinate frame
     * @return a new Shape instance with coordinates corresponding to the mapping of the specified model shape
     */
    public Shape modelToView( Shape shape ) {
        return transform.createTransformedShape( shape );
    }

    /**
     * Maps a size dimension (delta) from model to view coordinates, instantiating a new instance with the view dimension
     *
     * @param modelSize the size in model coordinate to convert to view coordinates
     * @return a new Dimension2D instance with coordinates corresponding to the mapping of the specified model size
     */
    public Dimension2D modelToViewSize( Dimension2D modelSize ) {
        Rectangle2D viewShape = modelToView( new Rectangle2D.Double( 0, 0, modelSize.getWidth(), modelSize.getHeight() ) ).getBounds2D();
        return new Dimension2DDouble( viewShape.getWidth(), viewShape.getHeight() );
    }

    /**
     * Maps an x-coordinate from model to view coordinates
     *
     * @param x the model x-coordinate
     * @return the corresponding view x-coordinate
     */
    public double modelToViewX( double x ) {
        return modelToView( new Point2D.Double( x, 0 ) ).getX();
    }

    /**
     * Maps an y-coordinate from model to view coordinates
     *
     * @param y the model y-coordinate
     * @return the corresponding view y-coordinate
     */
    public double modelToViewY( double y ) {
        return modelToView( 0, y ).getY();
    }

    /**
     * Maps a point from model to view coordinates, instantiating a new instance with the view coordinate
     *
     * @param x the x-coordinate of the model point to transform to view coordinates
     * @param y the y-coordinate of the model point to transform to view coordinates
     * @return a new Point2D instance with coordinates corresponding to the mapping of the specified model coordinates.
     */
    public Point2D modelToView( double x, double y ) {
        return modelToView( new Point2D.Double( x, y ) );
    }

    public double modelToViewDeltaX( double x ) {
        return modelToViewDelta( new Point2D.Double( x, 0 ) ).getX();
    }

    public double modelToViewDeltaY( double y ) {
        return modelToViewDelta( new Point2D.Double( 0, y ) ).getY();
    }

    public Dimension2D modelToViewDelta( Dimension2D delta ) {
        final Point2D pt = modelToViewDelta( new Point2D.Double( delta.getWidth(), delta.getHeight() ) );
        return new Dimension2DDouble( pt.getX(), pt.getY() );
    }

    /**
     * Transform a rectangle from model to view coordinates, with ranges [x, x + width] and [y, y + height] with width>=0, height>=0
     *
     * @param r Input rectangle
     * @return Transformed rectangle
     */
    public Rectangle2D modelToViewRectangle( Rectangle2D r ) {
        return modelToView( r ).getBounds2D();
    }

    /*---------------------------------------------------------------------------*
    * View to Model transforms
    *----------------------------------------------------------------------------*/

    public Point2D viewToModel( Point2D pt ) {
        return getInverseTransform().transform( pt, null );
    }

    public Vector2D viewToModel( Vector2D vector2D ) {
        return new Vector2D( viewToModel( vector2D.toPoint2D() ) );
    }

    public Point2D viewToModelDelta( Point2D delta ) {
        return getInverseTransform().deltaTransform( delta, null );
    }

    public Vector2D viewToModelDelta( Vector2D delta ) {
        return new Vector2D( viewToModelDelta( delta.toPoint2D() ) );
    }

    public double viewToModelX( double x ) {
        return viewToModel( x, 0 ).getX();
    }

    public double viewToModelY( double y ) {
        return viewToModel( 0, y ).getY();
    }

    public Point2D viewToModel( double x, double y ) {
        return viewToModel( new Point2D.Double( x, y ) );
    }

    public Dimension2D viewToModelDelta( Dimension2D delta ) {
        final Point2D pt = viewToModelDelta( new Point2D.Double( delta.getWidth(), delta.getHeight() ) );
        return new Dimension2DDouble( pt.getX(), pt.getY() );
    }

    /**
     * Inverts the model view transform for use in viewToModel methods
     *
     * @return the inverse AffineTransform
     * @throws RuntimeException if the transform was non-invertible
     */
    protected AffineTransform getInverseTransform() {
        try {
            return transform.createInverse();
        }
        catch ( NoninvertibleTransformException e ) {
            throw new RuntimeException( e );
        }
    }

    public Shape viewToModel( Shape shape ) {
        return getInverseTransform().createTransformedShape( shape );
    }

    public double viewToModelDeltaX( double x ) {
        return viewToModelDelta( new Point2D.Double( x, 0 ) ).getX();
    }

    public double viewToModelDeltaY( double y ) {
        return viewToModelDelta( new Point2D.Double( 0, y ) ).getY();
    }

    public Dimension2DDouble viewToModel( Dimension2D delta ) {
        // BEWARE: here be bugs. this actually does a point transformation - JO. Use viewToModelDeltaX/Y for this
        final Point2D point2D = viewToModel( delta.getWidth(), delta.getHeight() );
        return new Dimension2DDouble( point2D.getX(), point2D.getY() );
    }

    /**
     * Transform a rectangle from view to model coordinates, with ranges [x, x + width] and [y, y + height] with width>=0, height>=0
     *
     * @param r Input rectangle
     * @return Transformed rectangle
     */
    public Rectangle2D viewToModelRectangle( Rectangle2D r ) {
        return viewToModel( r ).getBounds2D();
    }

    //Machine generated (and fine-tuned) equality test
    @Override public boolean equals( Object o ) {
        if ( this == o ) {
            return true;
        }
        if ( o == null ) {
            return false;
        }

        if ( !transform.equals( ( (ModelViewTransform) o ).transform ) ) {
            return false;
        }

        return true;
    }

    @Override public int hashCode() {
        return transform.hashCode();
    }

    @Override public String toString() {
        return getClass().getName() + ": " + transform.toString();
    }

    public ImmutableRectangle2D modelToView( ImmutableRectangle2D modelRect ) {
        return new ImmutableRectangle2D( modelToView( modelRect.toRectangle2D() ) );
    }

    //Test main
    public static void main( String[] args ) {
        Point2D x = ModelViewTransform.createOffsetScaleMapping( new Double( 3, 4 ), 9 ).modelToView( 1, 1 );
        System.out.println( "x = " + x );
    }
}