// Copyright 2002-2012, University of Colorado
package edu.colorado.phet.common.phetcommon.math;

import java.awt.Shape;
import java.awt.geom.Point2D;
import java.awt.geom.Rectangle2D;
import java.awt.geom.RoundRectangle2D;

import edu.colorado.phet.common.phetcommon.math.vector.Vector2D;
import edu.colorado.phet.common.phetcommon.view.util.RectangleUtils;

/**
 * Immutable Rectangle2D class, suitable for usage in <code>Property<ImmutableRectangle2D></code> pattern, which also adds convenience methods missing from awt's Rectangle2D.
 *
 * @author Sam Reid
 */
public class ImmutableRectangle2D {
    public final double x;
    public final double y;
    public final double width;
    public final double height;

    //Create a rectangle with x=y=0
    public ImmutableRectangle2D( double width, double height ) {
        this( 0, 0, width, height );
    }

    public ImmutableRectangle2D( double x, double y, double width, double height ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    //Create a rectangle from the bounding box of the specified shape
    public ImmutableRectangle2D( Shape shape ) {
    		Rectangle2D r = shape.getBounds2D();
    		// This creates and throws off four new rectangles
    		// this(shape.getBounds2D().getX(),  shape.getBounds2D().getY(), shape.getBounds2D().getWidth(), shape.getBounds2D().getHeight() );
        this.x = r.getX();
        this.y = r.getY();
        this.width = r.getWidth();
        this.height = r.getHeight();
    }

    public Vector2D getCenter() {
        return new Vector2D( x + width / 2, y + height / 2 );
    }

    /**
     * Determine whether this rectangle contains the specified position represented as a Point2D
     *
     * @param point2D the position to check
     * @return true if this rectangle contains the specified position
     */
    public boolean contains( Point2D point2D ) {
    	return RectangleUtils.containsR4XY(x, y, width, height, point2D.getX(), point2D.getY());
    }

    /**
     * Determine whether this rectangle contains the specified position represented as an ImmutableVector2D
     *
     * @param position the position to check
     * @return true if this rectangle contains the specified position
     */
    public boolean contains( Vector2D position ) {
    	return RectangleUtils.containsR4XY(x, y, width, height, position.getX(), position.getY());
    }

    /**
     * Determine whether this rectangle completely contains the specified rectangle
     *
     * @param rectangle the rectangle to check
     * @return true if this rectangle completely contains the specified rectangle
     */
    public boolean contains( Rectangle2D rectangle ) {
    	return RectangleUtils.containsRect(x, y, width, height,
    			rectangle.getX(), rectangle.getY(), rectangle.getWidth(), rectangle.getHeight());
 //       return toRectangle2D().contains( rectangle );
    }

    @Override public String toString() {
        return "x=" + x + ", y=" + y + ", width = " + width + ", height = " + height;
    }

    /**
     * @return
     * @deprecated use toRectangle2D
     */
    @Deprecated
		public Shape toShape() {
        return new Rectangle2D.Double( x, y, width, height );
    }

    //Find a point in the rectangle closest to the specified point.  Used for making sure a dragged object doesn't get outside the visible play area
    public Point2D getClosestPoint( Point2D point ) {
        Point2D.Double newPoint = new Point2D.Double( point.getX(), point.getY() );
        if ( newPoint.getX() < x ) { newPoint.x = x; }
        if ( newPoint.getX() > x + width ) { newPoint.x = x + width; }
        if ( newPoint.getY() < y ) { newPoint.y = y; }
        if ( newPoint.getY() > y + height ) { newPoint.y = y + height; }
        return newPoint;
    }

    //Creates a new Rectangle2D corresponding to this ImmutableRectangle2D
    public Rectangle2D toRectangle2D() {
        return new Rectangle2D.Double( x, y, width, height );
    }

    public double getMaxX() {
        return x + width;
    }

    public double getMaxY() {
        return y + height;
    }

    public ImmutableRectangle2D shrink( double delta ) {
        return new ImmutableRectangle2D( x + delta / 2, y + delta / 2, width - delta, height - delta );
    }

    public ImmutableRectangle2D union( ImmutableRectangle2D immutableRectangle2D1 ) { return new ImmutableRectangle2D( toRectangle2D().createUnion( immutableRectangle2D1.toRectangle2D() ) ); }

    public RoundRectangle2D.Double toRoundedRectangle( double arcW, double arcH ) { return new RoundRectangle2D.Double( x, y, width, height, arcW, arcH ); }
}