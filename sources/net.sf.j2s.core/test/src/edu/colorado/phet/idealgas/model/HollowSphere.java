// Copyright 2002-2012, University of Colorado

// edu.colorado.phet.idealgas.physics.body.HollowSphere
/*
 * User: Administrator
 * Date: Jan 5, 2003
 * Time: 8:11:48 AM
 */
package edu.colorado.phet.idealgas.model;

import java.awt.geom.Point2D;
import java.util.ArrayList;
import java.util.EventListener;
import java.util.EventObject;
import java.util.List;
import java.util.Random;

import edu.colorado.phet.common.mechanics.Body;
import edu.colorado.phet.common.phetcommon.math.MathUtil;
import edu.colorado.phet.common.phetcommon.math.vector.MutableVector2D;
import edu.colorado.phet.idealgas.collision.CollidableBody;
import edu.colorado.phet.idealgas.collision.SphericalBody;

public class HollowSphere extends SphericalBody {

    private ArrayList<Body> containedBodies = new ArrayList<Body>();
    private ArrayList<EventListener> listeners = new ArrayList<EventListener>();

    public HollowSphere( Point2D center,
                         MutableVector2D velocity,
                         MutableVector2D acceleration,
                         double mass,
                         double radius ) {
        super( center, velocity, acceleration, mass, radius );
      	type = TYPE_HOLLOW_SPHERE;

    }

    // The following are used for debug purposes only. It allows the contact point in a
    // collison to be displayed on the screen.
    public Point2D contactPt;

    public void setContactPt( Point2D.Double contactPt ) {
        this.contactPt = contactPt;
        notifyObservers();
    }

    @Override
		public List<Body> getContainedBodies() {
        return containedBodies;
    }

    @Override
		public void addContainedBody( Body body ) {
        containedBodies.add( body );
        body.container = this;
        if ( body instanceof GasMolecule ) {
            GasMolecule molecule = (GasMolecule) body;
            MoleculeEvent event = new MoleculeEvent( this, molecule );
            for ( int i = 0; i < listeners.size(); i++ ) {
                Object o = listeners.get( i );
                if ( o instanceof HollowSphereListener ) {
                    HollowSphereListener hollowSphereListener = (HollowSphereListener) o;
                    hollowSphereListener.moleculeAdded( event );
                }
            }
        }
    }

    @Override
		public void removeContainedBody( Body body ) {
        containedBodies.remove( body );
        body.container = null;
        if ( body instanceof GasMolecule ) {
            GasMolecule molecule = (GasMolecule) body;
            MoleculeEvent event = new MoleculeEvent( this, molecule );
            for ( int i = 0; i < listeners.size(); i++ ) {
                Object o = listeners.get( i );
                if ( o instanceof HollowSphereListener ) {
                    HollowSphereListener hollowSphereListener = (HollowSphereListener) o;
                    hollowSphereListener.moleculeRemoved( event );
                }
            }
        }
    }

    @Override
		public boolean containsBody( Body body ) {
    	return body.container == this;
    }

    @Override
		public int numContainedBodies() {
        return containedBodies.size();
    }

    public void addHollowSphereListener( HollowSphereListener listener ) {
        listeners.add( listener );
    }

    public void removeHollowSphereListener( HollowSphereListener listener ) {
        listeners.remove( listener );
    }

    private MutableVector2D vtemp = new MutableVector2D();
    
    public void collideWithParticle( CollidableBody particle ) {
    	// see balloon
    }

  /**
   * check for containment in balloons and fixed spheres  
   * @param molecules
   */
	public void checkContainment(List<GasMolecule> molecules) {
		for (int i = molecules.size(); --i >= 0;) {
			GasMolecule particle = molecules.get(i);
			boolean insideMe = contains(particle);
			boolean myParticle = containsBody(particle);
			if (insideMe && !myParticle) {
				// If the particle isn't supposed to be inside the sphere but it is, get
				// it out
				vtemp.setComponents(particle.getPosition().getX()
						- this.getPosition().getX(), particle.getPosition().getY()
						- this.getPosition().getY());
				vtemp.normalize();
				vtemp.scale(this.getRadius() * 1.2);
				particle.setPositionNoObs(this.getPosition().getX() + vtemp.getX(),
						this.getPosition().getY() + vtemp.getY());
			} else if (!insideMe && myParticle) {
				// If the particle is supposed to be inside the sphere but it isn't, put
				// it inside
				vtemp.setComponents(particle.getPosition().getX()
						- this.getPosition().getX(), particle.getPosition().getY()
						- this.getPosition().getY());
				vtemp.normalize();
				vtemp.scale(this.getRadius() * 0.8);
				particle.setPositionNoObs(this.getPosition().getX() + vtemp.getX(),
						this.getPosition().getY() + vtemp.getY());
			}
		}
	}

		public boolean contains( Body body ) {
    	// BH note that when particle-particle collisions are turned off, they are turned off here as well
        return MathUtil.getDistanceSq((Point2D.Double) getCenter(), (Point2D.Double) body.getCM()) < radius2;
    }

    //----------------------------------------------------------------------------------------------
    // Methods for placing new molecules in the sphere
    //----------------------------------------------------------------------------------------------
    private Random random = new Random();

    public Point2D getNewMoleculeLocation() {
        double r = random.nextDouble() - GasMolecule.s_radius;
        double theta = random.nextDouble() * Math.PI * 2;
        return new Point2D.Double( this.getPosition().getX() + r * Math.cos( theta ),
                                               this.getPosition().getY() + r * Math.sin( theta ) );
    }

    public MutableVector2D getNewMoleculeVelocity( Class<?> species, IdealGasModel model ) {
        double s = 0;
        if ( species == HeavySpecies.class ) {
            s = model.getHeavySpeciesAveSpeed();
            if ( s == 0 ) {
                s = Math.sqrt( 2 * IdealGasModel.DEFAULT_ENERGY / HeavySpecies.getMoleculeMass() );
            }
        }
        if ( species == LightSpecies.class ) {
            s = model.getLightSpeciesAveSpeed();
            if ( s == 0 ) {
                s = Math.sqrt( 2 * IdealGasModel.DEFAULT_ENERGY / LightSpecies.getMoleculeMass() );
            }
        }
        double theta = random.nextDouble() * Math.PI * 2;
        return new MutableVector2D( s * Math.cos( theta ), s * Math.sin( theta ) );
    }

    public int getHeavySpeciesCnt() {
        return getSpeciesCnt( HeavySpecies.class );
    }

    public int getLightSpeciesCnt() {
        return getSpeciesCnt( LightSpecies.class );
    }

    private int getSpeciesCnt( Class<?> species ) {
        int cnt = 0;
        for ( int i = 0; i < containedBodies.size(); i++ ) {
            Body body = containedBodies.get( i );
            if ( species.isInstance( body ) ) {
                cnt++;
            }
        }
        return cnt;
    }

    //----------------------------------------------------------------------------------------------
    // Inner classes
    //----------------------------------------------------------------------------------------------

    // TODO: is this interface actually used?

    public interface HollowSphereListener extends EventListener {
        void moleculeAdded( HollowSphere.MoleculeEvent event );

        void moleculeRemoved( HollowSphere.MoleculeEvent event );
    }

    @SuppressWarnings("serial")
		public class MoleculeEvent extends EventObject {
        private GasMolecule molecule;

        public MoleculeEvent( Object source, GasMolecule molecule ) {
            super( source );
            this.molecule = molecule;
        }

        public GasMolecule getMolecule() {
            return molecule;
        }
    }

}
