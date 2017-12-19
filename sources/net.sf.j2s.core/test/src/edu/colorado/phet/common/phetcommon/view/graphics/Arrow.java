// Copyright 2002-2012, University of Colorado

package edu.colorado.phet.common.phetcommon.view.graphics;

import java.awt.geom.GeneralPath;
import java.awt.geom.Point2D;

import edu.colorado.phet.common.phetcommon.math.MathUtil;
import edu.colorado.phet.common.phetcommon.math.vector.AbstractVector2D;
import edu.colorado.phet.common.phetcommon.math.vector.MutableVector2D;

/**
 * Arrow
 *
 * @author ?
 */
public class Arrow {

    private GeneralPath arrowPath = new GeneralPath();//This causes real problems because equals is not overriden.

    private Point2D tailLocation;
    private Point2D tipLocation;
    private double headHeight;
    private double headWidth;
    private double tailWidth;
    private double fractionalHeadHeight;
    private boolean scaleTailToo;
    private double headScale;

    private MutableVector2D direction = new MutableVector2D();
    private MutableVector2D norm = new MutableVector2D();
    boolean isHeadDynamic = false;

    @Override
		public boolean equals( Object obj ) {
        boolean equals = false;
        if ( obj instanceof Arrow ) {
            Arrow a = (Arrow) obj;
            equals = ( a.tailLocation.equals( tailLocation ) && a.tipLocation.equals( tipLocation ) && a.headHeight == headHeight
                       && a.headWidth == headWidth && a.tailWidth == tailWidth && a.isHeadDynamic == isHeadDynamic );
        }
        return equals;
    }

    public Arrow() {
    	// BH optimization 
    }
    
    public Arrow( Point2D tailLocation, Point2D tipLocation, double headHeight, double headWidth, double tailWidth ) {
      init( tailLocation, tipLocation, headHeight, headWidth, tailWidth );
        computeArrow();
    }
    
  

    /**
     * Constructs an Arrow specified by a source Point2D and a direction and magnitude Vector2D.
     *
     * @param src
     * @param vector
     * @param headHeight
     * @param headWidth
     * @param tailWidth
     * @param fractionalHeadHeight
     * @param scaleTailToo
     */
    public Arrow( Point2D src, AbstractVector2D vector,
                  double headHeight, double headWidth, double tailWidth,
                  double fractionalHeadHeight, boolean scaleTailToo ) {
        this( src, vector.getDestination( src ), headHeight, headWidth, tailWidth, fractionalHeadHeight, scaleTailToo );
    }

    /**
     * @param tailLocation
     * @param tipLocation
     * @param headHeight
     * @param headWidth
     * @param tailWidth
     * @param fractionalHeadHeight When the head size is less than fractionalHeadHeight * arrow length,
     *                             the head will be scaled.
     * @param scaleTailToo
     */
    public Arrow( Point2D tailLocation, Point2D tipLocation,
                  double headHeight, double headWidth, double tailWidth,
                  double fractionalHeadHeight, boolean scaleTailToo ) {
    	set(tailLocation, tipLocation, headHeight, headWidth, tailWidth, 
    			fractionalHeadHeight, scaleTailToo);
    }	


    public void set(Point2D tailLocation, Point2D tipLocation, 
    		double headHeight, double headWidth, double tailWidth, 
    		double fractionalHeadHeight, boolean scaleTailToo) {
      this.fractionalHeadHeight = fractionalHeadHeight;
      this.scaleTailToo = scaleTailToo;
      this.isHeadDynamic = true;
      init( tailLocation, tipLocation, headHeight, headWidth, tailWidth );
      computeArrow();
    }
    void init( Point2D tailLocation, Point2D tipLocation, double headHeight, double headWidth, double tailWidth ) {
        this.tailLocation = tailLocation;
        this.tipLocation = tipLocation;
        this.headHeight = headHeight;
        this.headWidth = headWidth;
        this.tailWidth = tailWidth;
    }

	private MutableVector2D rightFlap = new MutableVector2D();
	private MutableVector2D leftFlap = new MutableVector2D();
	private MutableVector2D rightPin = new MutableVector2D();
	private MutableVector2D leftPin = new MutableVector2D();
	private MutableVector2D rightTail = new MutableVector2D();
	private MutableVector2D leftTail = new MutableVector2D();
    
	private void computeArrow() {
		this.arrowPath.reset();
		double dist2 = MathUtil.getDistanceSq((Point2D.Double) tailLocation,
				(Point2D.Double) tipLocation);
		if (dist2 > 0) {
			direction.setComponents(tipLocation.getX() - tailLocation.getX(), tipLocation.getY() - tailLocation.getY());
			direction.normalize();
			norm.setComponents(direction.getY(), -direction.getX());
			double length = Math.sqrt(dist2);
			double tempHeadHeight = headHeight;
			double tempHeadWidth = headWidth;
			double tempTailWidth = tailWidth;
			if (isHeadDynamic) {
				if (length < headHeight / fractionalHeadHeight) {
					tempHeadHeight = length * fractionalHeadHeight;
					if (scaleTailToo) {
						tempTailWidth = tailWidth * tempHeadHeight / headHeight;
						tempHeadWidth = headWidth * tempHeadHeight / headHeight;
					}
				} else {
					// nothing needs to be done, since the headHeight is already large
					// enough, and previously computed values will be correct.
				}
			} else if (length < headHeight) {
				throw new RuntimeException(
						"headHeight is bigger than arrow length: length=" + length
								+ " headHeight=" + headHeight);
			}
			headScale = tempHeadHeight / headHeight;

			getPoint(-1 * tempHeadHeight, -tempHeadWidth / 2, rightFlap );
			getPoint(-1 * tempHeadHeight, tempHeadWidth / 2, leftFlap);
			getPoint(-1 * tempHeadHeight, -tempTailWidth / 2, rightPin);
			getPoint(-1 * tempHeadHeight, tempTailWidth / 2, leftPin);
			getPoint(-1 * length, -tempTailWidth / 2, rightTail);
			getPoint(-1 * length, tempTailWidth / 2, leftTail);

			arrowPath.moveTo(tipLocation.getX(), tipLocation.getY());
			lineTo(arrowPath, rightFlap);
			lineTo(arrowPath, rightPin);
			lineTo(arrowPath, rightTail);
			lineTo(arrowPath, leftTail);
			lineTo(arrowPath, leftPin);
			lineTo(arrowPath, leftFlap);
			arrowPath.closePath();
		}
	}

    private void lineTo( GeneralPath path, MutableVector2D loc ) {
        path.lineTo( loc.getX(), loc.getY() ); // BH why (float)?
    }

    //parallel and normal are from the tip
    private void getPoint( double parallel, double normal, MutableVector2D v) {
        // do scaling and addition of vector components inline to improve performance
        v.setComponents(( direction.getX() * parallel ) + ( norm.getX() * normal ) + tipLocation.getX(),
        		( direction.getY() * parallel ) + ( norm.getY() * normal ) + tipLocation.getY());
    }

    // Gets the scaling factor that was applied to the arrow head in computeArrow.
    public double getHeadScale() {
        return headScale;
    }

    public GeneralPath getShape() {
        return arrowPath;
    }

    public Point2D getTailLocation() {
        return new Point2D.Double( tailLocation.getX(), tailLocation.getY() );
    }

    public Point2D getTipLocation() {
        return new Point2D.Double( tipLocation.getX(), tipLocation.getY() );
    }

    public void setTailLocation( Point2D tailLocation ) {
        this.tailLocation = tailLocation;
        computeArrow();
    }

    public void setTipLocation( Point2D tipLocation ) {
        this.tipLocation = tipLocation;
        computeArrow();
    }

    public void setTipAndTailLocations( Point2D tipLocation, Point2D tailLocation ) {
        this.tipLocation = tipLocation;
        this.tailLocation = tailLocation;
        computeArrow();
    }

    public double getTailWidth() {
        return tailWidth;
    }

    public void setTailWidth( double tailWidth ) {
        this.tailWidth = tailWidth;
        computeArrow();
    }

    public void translate( double dx, double dy ) {
        tailLocation.setLocation( tailLocation.getX() + dx, tailLocation.getY() + dy );
        tipLocation.setLocation( tailLocation.getX() + dx, tailLocation.getY() + dy );
        computeArrow();
    }

    public void setHeadWidth( double headWidth ) {
        this.headWidth = headWidth;
        computeArrow();
    }

    public double getHeadWidth() {
        return headWidth;
    }

    public void setHeadHeight( double headHeight ) {
        this.headHeight = headHeight;
        computeArrow();
    }

    public double getHeadHeight() {
        return headHeight;
    }

    public void setFractionalHeadHeight( double fractionalHeadHeight ) {
        this.fractionalHeadHeight = fractionalHeadHeight;
        computeArrow();
    }

    public double getFractionalHeadHeight() {
        return fractionalHeadHeight;
    }

    public void setScaleTailToo( boolean scaleTailToo ) {
        this.scaleTailToo = scaleTailToo;
        computeArrow();
    }

    public boolean getScaleTailToo() {
        return scaleTailToo;
    }
}
