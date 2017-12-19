// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 47760 $
 * Date modified : $Date: 2011-01-07 11:42:54 -0600 (Fri, 07 Jan 2011) $
 */
package edu.colorado.phet.common.phetcommon.math;

import java.awt.geom.Point2D;

/**
 * A class for 2-dimensional points expressed in polar coordinates.
 */
public class Point2DPolar {
    private double r;
    private double theta;
    //private Point2D.Double utilPt = new Point2D.Double();

    /**
     * @param r
     * @param theta
     */
    public Point2DPolar( double r, double theta ) {
        this.r = r;
        this.theta = theta;
    }

    /**
     * Creates a Point2DPolar for a Point2D, assuming the origin of the polar coordinate
     * system is at the origin of the Point2D's cartesian coordinate system
     *
     * @param cartCoords
     */
    public Point2DPolar( Point2D cartCoords ) {
        this( cartCoords, 0, 0 );
    }

    /**
     * @param cartCoords
     * @param polarOrigin The origin of the the polar coordinate space, expressed in
     *                    cartesian coordinates
     */
    public Point2DPolar( Point2D cartCoords, Point2D polarOrigin ) {
        r = MathUtil.getDistance(polarOrigin, cartCoords );
        double dx = cartCoords.getX() - polarOrigin.getX();
        double dy = cartCoords.getY() - polarOrigin.getY();
        theta = Math.atan2( dy, dx );
    }

    /**
     * @param cartCoords
     * @param polarOriginX
     * @param polarOriginY
     */
    public Point2DPolar( Point2D cartCoords, double polarOriginX, double polarOriginY ) {
        this( cartCoords, new Point2D.Double( polarOriginX, polarOriginY ) );
    }

    /**
     * @param polarOrigin
     * @return the point2D
     */
    public Point2D.Double toPoint2D( Point2D polarOrigin ) {
        double x = polarOrigin.getX() + getR() * Math.cos( getTheta() );
        double y = polarOrigin.getY() + getR() * Math.sin( getTheta() );
        return new Point2D.Double( x, y );
    }

    /**
     * @return the distance from the origin
     */
    public double getR() {
        return r;
    }

    /**
     * @param r
     */
    public void setR( double r ) {
        this.r = r;
    }

    /**
     * @return the angle
     */
    public double getTheta() {
        return theta;
    }

    /**
     * @param theta
     */
    public void setTheta( double theta ) {
        this.theta = theta;
    }
}
