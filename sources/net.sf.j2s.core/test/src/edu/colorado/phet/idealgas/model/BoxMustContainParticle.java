// Copyright 2002-2011, University of Colorado

/**
 * Class: BoxMustContainParticle
 * Package: edu.colorado.phet.idealgas.physics
 * User: Ron LeMaster
 * Date: Feb 10, 2003
 * Time: 8:13:01 PM
 */
package edu.colorado.phet.idealgas.model;

import edu.colorado.phet.common.phetcommon.model.ModelElement;
import edu.colorado.phet.idealgas.collision.SphericalBody;

/**
 * Singleton class of constrain for keeping a particle in a box.
 */
public class BoxMustContainParticle extends MustContain {
    private IdealGasModel model;

    /**
     * Constructor
     */
    public BoxMustContainParticle( Box2D container, ModelElement contained, IdealGasModel model ) {
        super( container, contained );
        this.model = model;
    }

    @Override
		public Object apply( Constraint.Spec spec ) {

        // Get references to the box and the particle
        MustContain.Spec mustContainSpec = null;
        if( spec instanceof MustContain.Spec ) {
            mustContainSpec = (MustContain.Spec)spec;
        }
        ModelElement body = mustContainSpec.getContainer();
        Box2D box = null;
        if( body instanceof Box2D ) {
            box = (Box2D)body;
        }
        else {
            throw new RuntimeException( "Container not instance of Box2D " +
                                        "in method apply() in class BoxMustContainParticle" );
        }
        body = mustContainSpec.getContained();
        SphericalBody particle = null;
        if( body instanceof SphericalBody ) {
            particle = (SphericalBody)body;
        }
        else {
            throw new RuntimeException( "Contained not instance of SphericalBody " +
                                        "in method apply() in class BoxMustContainParticle" );
        }

        // Apply the constraint. The particle must be completely contained in the box
        if( !box.isInOpening( particle ) ) {

            // If the body is infinitely massive, that means it is fixed
            if( particle.getMass() != Double.POSITIVE_INFINITY ) {
                double x = particle.getPosition().getX();
                double newX = x;
                double y = particle.getPosition().getY();
                double newY = y;

                // Have we violated a the constraint with a vertical wall?
                if( x < box.getMinX() + particle.getRadius() ) {
                    newX = box.getMinX() + particle.getRadius();
                    particle.setVelocity( -particle.getVelocity().getX(), particle.getVelocity().getY() );
                }
                else if( x > box.getMaxX() - particle.getRadius() ) {
                    newX = box.getMaxX() - particle.getRadius();
                    particle.getVelocity().setX( -particle.getVelocity().getX() );
                }

                // Have we violated a the constraint with a horizontal wall?
                if( y < box.getMinY() + particle.getRadius() ) {
                    newY = box.getMinY() + particle.getRadius();
                    particle.getVelocity().setY( -particle.getVelocity().getY() );
                }
                else if( y > box.getMaxY() - particle.getRadius() ) {
                    newY = box.getMaxY() - particle.getRadius();
                    particle.getVelocity().setY( -particle.getVelocity().getY() );
                }

                // Note that we must not call setPosition(), because it modifies
                // the previousPosition attribute of the particle. We call relocateBodyY()
                // to ensure conservation of energy if gravity it on
                if( newX != x ) {
                    particle.setPositionNoObs( newX, particle.getPosition().getY() );
                }
                if( newY != y ) {
                    model.relocateBodyY( particle, newY );
                    //                    ((IdealGasSystem)PhysicalSystem.instance()).relocateBodyY( particle, newY );
                }
            }
        }
        return null;
    }
}
