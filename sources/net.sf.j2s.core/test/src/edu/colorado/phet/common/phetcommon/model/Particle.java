// Copyright 2002-2012, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: olsonj $
 * Revision : $Revision: 66117 $
 * Date modified : $Date: 2012-07-21 20:36:43 -0500 (Sat, 21 Jul 2012) $
 */
package edu.colorado.phet.common.phetcommon.model;

import java.awt.geom.Point2D;

import edu.colorado.phet.common.phetcommon.math.vector.MutableVector2D;
import edu.colorado.phet.common.phetcommon.util.SimpleObservable;
import edu.colorado.phet.idealgas.collision.CollidableBody;

/**
 * Default newtonian particle implementation (with Euler update).
 *
 * @author Ron LeMaster
 * @version $Revision: 66117 $
 */
public class Particle extends SimpleObservable implements ModelElement {
    private Point2D.Double position = new Point2D.Double();
    protected MutableVector2D velocity = new MutableVector2D();
    private MutableVector2D acceleration = new MutableVector2D();
    private double prevAccelerationX, prevAccelerationY;

	  public int type = TYPE_PARTICLE;
	  
    public Particle() {
    }

    @Override
		public Object clone() {
        Particle clone = (Particle) super.clone();

        clone.position = new Point2D.Double( position.x, position.y );
        clone.velocity = new MutableVector2D( velocity );
        clone.acceleration = new MutableVector2D( acceleration );

        return clone;
    }

    protected Particle( Point2D position, MutableVector2D velocity,
                        MutableVector2D acceleration ) {
      this.position.x = position.getX();
      this.position.y = position.getY();

        //setPosition( position );
        setVelocityNoObs( velocity.getX(), velocity.getY() );
        setAccelerationNoObs( acceleration.getX(), acceleration.getY() );
    }

    public Point2D.Double getPosition() {
        return position;
    }

    public void setPosition( double x, double y ) {
    	setPositionP(x, y); // BH optimized
    }

		public void setPositionP(double x, double y) { // BH optimized
      position.x = x;
      position.y = y;
      notifyObservers();
		}

		public void setPositionNoObs(double x, double y) {
      position.x = x;
      position.y = y;
		}

    public void setPosition( Point2D position ) {
        setPositionP( position.getX(), position.getY() );
    }

    public MutableVector2D getVelocity() {
        return velocity;
    }

    public void setVelocity( MutableVector2D velocity ) {
        setVelocity( velocity.getX(), velocity.getY() );
    }

    public void setVelocity( double vx, double vy ) {
        velocity.setComponents( vx, vy );
        notifyObservers();
    }

    public void setVelocityNoObs( double vx, double vy ) {
      velocity.setComponents( vx, vy );
  }

    public double getSpeed() {
        return velocity.magnitude();
    }

    public MutableVector2D getAcceleration() {
        return acceleration;
    }

    public void setAcceleration( MutableVector2D acceleration ) {
        setAccelerationXY( acceleration.getX(), acceleration.getY() );
    }

	public void setAccelerationXY(double ax, double ay) {
		if (ax == acceleration.getX() && ay == acceleration.getY()) {
			//&& (type & TYPE_PARTICLE) == TYPE_PARTICLE) // BH -- does not include BOX2D, which needs to know gravity has been set to 0
    	prevAccelerationX = acceleration.getX();
    	prevAccelerationY = acceleration.getY();
			return;  // BH
		}
		setAccelerationNoObs(ax, ay);
		// BH -- no need to update particles for no acceleration change?
		notifyObservers();
	}

    public void setAccelerationNoObs( double ax, double ay ) {
    	prevAccelerationX = acceleration.getX();
    	prevAccelerationY = acceleration.getY();
      acceleration.setComponents( ax, ay );
    }

    /**
     * Determines the new state of the body using the Verlet method
     *
     * @param dt
     */
    @Override
		public void stepInTime( double dt ) {
    	stepInTimeP(dt);  // BH optimizing away super.stepInTime
    }

    /**
     * SwingJS optimization avoids super.stepInTime call
     * 
     * Call from Body ONLY
     * 
     * @param dt
     */
    public void stepInTimeP( double dt ) {
    	double ax = acceleration.getX();
    	double ay = acceleration.getY();
    	double vx = velocity.getX();
    	double vy = velocity.getY();
    	
        // New position
        position.x += dt * vx
                      + dt * dt * ax / 2;
        position.y += dt * vy
                      + dt * dt * ay / 2;

        // New velocity
        vx += dt * ( ax + prevAccelerationX ) / 2;
        vy += dt * ( ay + prevAccelerationY ) / 2;
        setVelocityNoObs( vx, vy );

        // Save acceleration
        prevAccelerationX = ax;
        prevAccelerationY = ay;
        

        if ((type & CollidableBody.TYPE_GAS_MOLECULE)!= CollidableBody.TYPE_GAS_MOLECULE)
        	notifyObservers(); // BH not yet - might have a collision
    }

    public void translate( double dx, double dy ) {
        setPositionP( position.x + dx, position.y + dy );
        //notifyObservers(); // BH done in setPosition
    }

		public Particle center(java.awt.geom.Rectangle2D.Double bounds) {
			position.x = bounds.x + bounds.width/2 + Math.random();
			position.y = bounds.y + bounds.height/2 + Math.random();
			return this;
			// not notifying here...
		}

		@Override
		public int getType() {
			return type;
		}

}

