// Copyright 2002-2012, University of Colorado
package edu.colorado.phet.idealgas.collision;

import java.awt.geom.Point2D;
import java.util.ArrayList;
import java.util.List;

import edu.colorado.phet.common.mechanics.Body;
import edu.colorado.phet.common.phetcommon.math.vector.MutableVector2D;
import edu.colorado.phet.idealgas.model.Constraint;

/**
 * This abstract class represents physical bodies. It is abstract so that only
 * subclasses can be instantiated, forcing them to declare if they do or do not
 * have physical extent.
 */
public abstract class CollidableBody extends Body {

	// 0xF reserved; note that BODY is not a PARTICLE, necessarily
  public final static int TYPE_SPHERICAL_BODY   = TYPE_BODY | 0x0010;  // 0x0011
  public static final int TYPE_WALL             = TYPE_BODY | 0x0020;
  public static final int TYPE_BOX2D            = TYPE_BODY | 0x0040;
  
  public final static int TYPE_SOLID_SPHERE     = TYPE_SPHERICAL_BODY | 0x0100;
  public final static int TYPE_GAS_MOLECULE     = TYPE_SOLID_SPHERE | TYPE_PARTICLE | 0x1000; // 0x1113
  public final static int TYPE_HEAVY_SPECIES    = TYPE_GAS_MOLECULE | 0x2000;
  public final static int TYPE_LIGHT_SPECIES    = TYPE_GAS_MOLECULE | 0x4000;


  public final static int TYPE_HOLLOW_SPHERE    = TYPE_SPHERICAL_BODY | 0x0200;
  public final static int TYPE_BALLOON          = TYPE_HOLLOW_SPHERE | 0x1000;
  public final static int TYPE_HOT_AIR_BALLOON  = TYPE_HOLLOW_SPHERE | 0x2000;
  

  public static final int TYPE_VERT_BARRIER     = TYPE_WALL | 0x0100;
  public static final int TYPE_FLOOR            = TYPE_WALL | 0x0200; // BH no actual class for this one



	  
//  public final static int TYPE_SPHERICAL_BODY  = TYPE_BODY & 0xF;     //  0000 0000 0000 1111
//  public final static int TYPE_HOLLOW_SPHERE   = TYPE_BODY & 0x1F;    //  0000 0000 0001 1111
//  public final static int TYPE_BALLOON         = TYPE_BODY & 0x3F;    //  0000 0000 0011 1111
//  public final static int TYPE_HOT_AIR_BALLOON = TYPE_BODY & 0x5F;    //  0000 0000 0101 1111
//  public final static int TYPE_SOLID_SPHERE    = TYPE_BODY & 0x10F;   //  0000 0001 0000 1111
//  public final static int TYPE_GAS_MOLECULE    = TYPE_BODY & 0x90F;   //  0000 1001 0000 1111
//  public final static int TYPE_HEAVY_SPECIES   = TYPE_BODY & 0xB0F;   //  0000 1011 0000 1111
//  public final static int TYPE_LIGHT_SPECIES   = TYPE_BODY & 0xD0F;   //  0000 1101 0000 1111
//  public static final int TYPE_WALL            = TYPE_BODY & 0x1007;  //  0001 0000 0000 0111
//  public static final int TYPE_VERT_BARRIER    = TYPE_BODY & 0x3007;  //  0011 0000 0000 0111
//  public static final int TYPE_BOX2D           = TYPE_BODY & 0x4007;  //  0100 0000 0000 0111

  private boolean collidable = true;
    private MutableVector2D velocityPrev;
    private Point2D.Double positionPrev;
    ArrayList<Body> containedBodies = new ArrayList<Body>();

    // List of contraints that must be applied to the body's state
    // at the end of each doYourThing
    protected ArrayList<Constraint> constraints = new ArrayList<Constraint>();
    private Point2D.Double positionBeforeTimeStep = new Point2D.Double();


    protected CollidableBody() {
    }

    protected CollidableBody( Point2D position, MutableVector2D velocity,
                              MutableVector2D acceleration, double mass, double charge ) {
        super( position, velocity, acceleration, mass, charge );
    }

    public boolean isCollidable() {
        return collidable;
    }

    @Override
		public void stepInTime( double dt ) {
    	stepInTimeCB(dt); // BH
    }
    
    /**
     * SwingJS avoiding supercalls. 
     * 
     * @param dt
     */
    protected void stepInTimeCB(double dt) {
    
        // Save the velocity and position before they are updated. This information
        // is used in collision calculations
        if ( velocityPrev == null ) {
            velocityPrev = new MutableVector2D();
        }
        velocityPrev.setComponents( getVelocity().getX(), getVelocity().getY() );
        if ( positionPrev == null ) {
            positionPrev = new Point2D.Double( getPosition().getX(), getPosition().getY() );
        }
        Point2D.Double d = getPosition();
        positionPrev.x = positionBeforeTimeStep.x = d.x;
        positionPrev.y = positionBeforeTimeStep.y = d.y;
       
        stepInTimeB(dt);
    }

    public void setCollidable( boolean collidable ) {
        this.collidable = collidable;
    }

    public MutableVector2D getVelocityPrev() {
        return velocityPrev;
    }

    public Point2D.Double getPositionPrev() {
        return positionPrev;
    }

//    public abstract double getContactOffset( Body body );

    public List<Body> getContainedBodies() {
        return containedBodies;
    }

    public void addContainedBody( Body body ) {
        containedBodies.add( body );
    }

    public void removeContainedBody( Body body ) {
        containedBodies.remove( body );
    }

    public boolean containsBody( Body body ) {
        return containedBodies.contains( body );
    }

    public int numContainedBodies() {
        return containedBodies.size();
    }

    public Point2D getPositionBeforeTimeStep() {
        return positionBeforeTimeStep;
    }

    //
    // Constraint related methods
    //
    public void addConstraint( Constraint constraintSpec ) {
        constraints.add( constraintSpec );
    }

    public void removeConstraint( Constraint constraintSpec ) {
        constraints.remove( constraintSpec );
    }
}
