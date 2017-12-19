// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.math;


import edu.colorado.phet.common.phetcommon.view.util.StringUtil;

/**
 * Point3D is a point in 3 dimensional space.
 * This implementation was modeled after java.awt.geom.Point2D (for better or worse).
 * The Float subclass was not added yet, since PhET simulations typically use double precision.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public abstract class Point3D {

    public static class Double extends Point3D {

        private double x, y, z;

        public Double() {
            this( 0, 0, 0 );
        }

        public Double( Point3D p ) {
            this( p.getX(), p.getY(), p.getZ() );
        }

        public Double( double x, double y, double z ) {
            this.x = x;
            this.y = y;
            this.z = z;
        }

        @Override
				public double getX() {
            return x;
        }

        @Override
				public double getY() {
            return y;
        }

        @Override
				public double getZ() {
            return z;
        }

        @Override
				public void setLocation( Point3D p ) {
            setLocation( p.getX(), p.getY(), p.getZ() );
        }

        @Override
				public void setLocation( double x, double y, double z ) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
    }

    protected Point3D() {
    }

    public abstract double getX();

    public abstract double getY();

    public abstract double getZ();

    public abstract void setLocation( Point3D p );

    public abstract void setLocation( double x, double y, double z );

    public double distance( Point3D p ) {
        return distance( getX(), getY(), getZ(), p.getX(), p.getY(), p.getZ() );
    }

    public double distance( double x, double y, double z ) {
        return distance( getX(), getY(), getZ(), x, y, z );
    }

    public static double distance( Point3D p1, Point3D p2 ) {
        return distance( p1.getX(), p1.getY(), p1.getZ(), p2.getX(), p2.getY(), p2.getZ() );
    }

    public static double distance( double x1, double y1, double z1, double x2, double y2, double z2 ) {
        // Pythagorean theorem
        double dx = x1 - x2;
        double dy = y1 - y2;
        double dz = z1 - z2;
        return Math.sqrt( ( dx * dx ) + ( dy * dy ) + ( dz * dz ) );
    }

    @Override
		public boolean equals( Object obj ) {
        if ( obj instanceof Point3D ) {
            Point3D p = (Point3D) obj;
            return ( getX() == p.getX() ) && ( getY() == p.getY() ) && ( getZ() == p.getZ() );
        }
        return super.equals( obj );
    }

    @Override
		public String toString() {
        return ( StringUtil.basename( getClass() ) + "[" + getX() + "," + getY() + "," + getZ() + "]" );
    }
}
