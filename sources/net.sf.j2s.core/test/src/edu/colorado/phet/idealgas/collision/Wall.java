// Copyright 2002-2012, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: olsonj $
 * Revision : $Revision: 66113 $
 * Date modified : $Date: 2012-07-21 04:27:33 -0500 (Sat, 21 Jul 2012) $
 */
package edu.colorado.phet.idealgas.collision;

import java.awt.geom.Point2D;
import java.awt.geom.Rectangle2D;
import java.util.EventListener;
import java.util.EventObject;
import java.util.Hashtable;
import java.util.Map;

import edu.colorado.phet.common.phetcommon.math.vector.MutableVector2D;
import edu.colorado.phet.common.phetcommon.util.EventChannel;
import edu.colorado.phet.idealgas.coreadditions.Translatable;

/**
 * Wall
 * <p/>
 * A model element representing a wall that other model elements can collide with. The
 * wall's position and size are constrained by bounds specified by the client.
 *
 * @author Ron LeMaster
 * @version $Revision: 66113 $
 */

public class Wall extends CollidableBody implements Translatable {
		private MutableVector2D velocity = new MutableVector2D();
    protected Rectangle2D.Double rep = new Rectangle2D.Double();
    private Rectangle2D.Double movementBounds;
    private Rectangle2D.Double prevRep = new Rectangle2D.Double();
    private double minimumWallThickness;
//    private WallFixupStrategy fixupStrategy = new NullFixupStrategy();

    /**
     * 
     * @return the rectangle for bounds with no copying
     */
    public Rectangle2D.Double getBoundsNoCopy() {
    	return rep;
    }
    
	/**
	 * @param bounds
	 * @param movementBounds
	 * @param isFloor
	 */
	public Wall(Rectangle2D bounds, Rectangle2D movementBounds, boolean isFloor) {
		type = (isFloor ? TYPE_FLOOR : TYPE_VERT_BARRIER);
		this.rep = (Rectangle2D.Double) bounds;
		this.movementBounds = (Rectangle2D.Double) movementBounds;
		setMass(Double.POSITIVE_INFINITY);
		setPosition(bounds.getMinX(), bounds.getMinY());
	}

    /**
     * Does nothing. This is so the wall is not affected by gravity
     *
     * @param dt
     */
    @Override
		public void stepInTime( double dt ) {
        // noop
    }


    /**
     * Will not position the wall outside its movement bounds
     *
     * @param x
     * @param y
     */
    @Override
		public void setPosition( double x, double y ) {

        // Constrain the position to be within the movement bounds
        x = Math.min( x, movementBounds.getMaxX() - rep.getWidth() );
        x = Math.max( x, movementBounds.getMinX() );
        y = Math.min( y, movementBounds.getMaxY() - rep.getHeight() );
        y = Math.max( y, movementBounds.getMinY() );

        setPositionP( x, y );
        prevRep.x = rep.x;
        prevRep.y = rep.y;
        rep.x = x;
        rep.y = y;
        changeListenerProxy.wallChanged( new ChangeEvent( this ) );
    }

    /**
     * Will not position the wall outside its movement bounds
     *
     * @param point
     */
    @Override
		public void setPosition( Point2D point ) {
        setPosition( point.getX(), point.getY() );
    }

    /**
     * Will not expand the wall outside of its movement bounds, and maintains the walls minimum dimensions
     *
     * @param bounds
     */
    public void setBounds( Rectangle2D bounds ) {

        if ( bounds.getWidth() < this.minimumWallThickness ) {
            return;
        }

        // Constrain the wall to be within the movement bounds, and maintain minimum dimensions
        double minX = Math.max( Math.min( bounds.getMinX(), movementBounds.getMaxX() ), movementBounds.getMinX() );
        double minY = Math.max( Math.min( bounds.getMinY(), movementBounds.getMaxY() ), movementBounds.getMinY() );
        double maxX = Math.min( Math.max( bounds.getMaxX(), movementBounds.getMinX() ), movementBounds.getMaxX() );
        double maxY = Math.min( Math.max( bounds.getMaxY(), movementBounds.getMinY() ), movementBounds.getMaxY() );

        rep.x = minX;
        rep.y = minY;
        rep.width = maxX - minX;
        rep.height = maxY - minY;
        setPosition( minX, minY );
    }

    //I just changed this to return a new object
    public Rectangle2D getBounds() {
        return new Rectangle2D.Double( rep.getX(), rep.getY(), rep.getWidth(), rep.getHeight() );
    }

    public Rectangle2D getPrevBounds() {
        return new Rectangle2D.Double( prevRep.getX(), prevRep.getY(), prevRep.getWidth(), prevRep.getHeight() );
    }

    public void setMovementBounds( Rectangle2D movementBounds ) {
        this.movementBounds = (Rectangle2D.Double) movementBounds;
        changeListenerProxy.wallChanged( new ChangeEvent( this ) );
    }

    public Rectangle2D getMovementBounds() {
        return movementBounds;
    }

    @Override
		public MutableVector2D getVelocityPrev() {
        return velocity;
    }

    @Override
		public Point2D.Double getPositionPrev() {
        return null;
    }

    @Override
		public Point2D getCM() {
        return new Point2D.Double( rep.getMinX() + rep.getWidth() / 2,
                                   rep.getMinY() + rep.getHeight() / 2 );
    }

    @Override
		public double getMomentOfInertia() {
        return Double.POSITIVE_INFINITY;
    }

    /**
     * Since the wall is infinitely massive, it can't move, and so
     * we say its kinetic energy is 0
     */
    @Override
		public double getKineticEnergy() {
        return 0;
    }

    @Override
		public void translate( double dx, double dy ) {
        super.translate( dx, dy );
    }

    //----------------------------------------------------------------
    // Code for fixing up collision anomolies
    //----------------------------------------------------------------



    //----------------------------------------------------------------
    // Event-related data, classes, and methods
    //----------------------------------------------------------------
    private EventChannel changeEventChannel = new EventChannel( ChangeListener.class );
    private ChangeListener changeListenerProxy = (ChangeListener) changeEventChannel.getListenerProxy();

    public void addChangeListener( ChangeListener listener ) {
        changeEventChannel.addListener( listener );
    }

    public void removeChangeListener( ChangeListener listener ) {
        changeEventChannel.removeListener( listener );
    }

    public void setMinimumWidth( double wallThickness ) {
        this.minimumWallThickness = wallThickness;
    }

    public interface ChangeListener extends EventListener {
        void wallChanged( ChangeEvent event );
    }

    public class ChangeEvent extends EventObject {
        public ChangeEvent( Object source ) {
            super( source );
        }

        public Wall getWall() {
            return (Wall) getSource();
        }
    }

    private Map<Double, WallDescriptor> descriptors = new Hashtable<Double, WallDescriptor>();
    
    private double lastR = Integer.MAX_VALUE;
    private WallDescriptor lastDesc;
    
		public WallDescriptor getDescriptor(double radius) {
			if (lastR == radius)
				return lastDesc;
			Double r = Double.valueOf(lastR = radius);
			lastDesc = descriptors.get(r);
			if (lastDesc == null)
				descriptors.put(r, lastDesc = new WallDescriptor(this, r));
			return lastDesc;
		}

	public void fixup(SphericalBody sphere) {
		double r = sphere.getRadius();
		switch (type) {
		case TYPE_VERT_BARRIER:
			// SwingJS optimized do not call observers yet
			if (sphere.type == CollidableBody.TYPE_LIGHT_SPECIES) {
				sphere.getPosition().x = rep.x + rep.width + r + 1e-10;
				sphere.getVelocity().setX(Math.abs(sphere.getVelocity().getX()));
			} else {
				sphere.getPosition().x = rep.x - r - 1e-10;
				sphere.getVelocity().setX(-Math.abs(sphere.getVelocity().getX()));
			}
			break;
		case TYPE_FLOOR:
		default:
			sphere.getPosition().y = rep.y - r - 1e-10;
			sphere.getVelocity().setY(-Math.abs(sphere.getVelocity().getY()));
		}
	}
	
	
	public boolean needsFixup(Point2D.Double p, double r, boolean isLight) {
		// SwingJS Java fix #19
		switch (type) {
		case TYPE_VERT_BARRIER:
			return ((isLight ? p.x < rep.x + rep.width + r : p.x >= rep.x - r)
					&& p.y >= rep.y && p.y < rep.y + rep.height);
		case TYPE_FLOOR:
		default:
			return (p.x >= rep.x && p.x < rep.x + rep.width && p.y >= rep.y - r);
		}
	}
}
