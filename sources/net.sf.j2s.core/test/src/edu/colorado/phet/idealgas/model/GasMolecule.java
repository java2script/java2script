// Copyright 2002-2012, University of Colorado

/*
 * Class: GasMolecule
 * Package: edu.colorado.phet.physics.idealgas
 *
 * Created by: Ron LeMaster
 * Date: Nov 4, 2002
 */
package edu.colorado.phet.idealgas.model;

import java.awt.geom.Point2D;
import java.util.ArrayList;
import java.util.List;

import edu.colorado.phet.common.phetcommon.math.vector.MutableVector2D;
import edu.colorado.phet.common.phetcommon.util.SimpleObserver;
import edu.colorado.phet.idealgas.collision.CollisionGod.Region;
import edu.colorado.phet.idealgas.collision.SolidSphere;

/**
 *
 */
public class GasMolecule extends SolidSphere {

	// BH this is not a good idea in JavaScript -- a nonfinal static field
	// breaks having two applications on the same page
	
    //
    // Static fields and methods
    //
    public final static double s_radius = 4; // BH was 5  // BH 
   
    protected double enthalpy; // BH Java fix #20 
    

// BH never called
//    public static void enableParticleParticleInteractions( boolean interactionsEnabled ) {
//        s_radius = (interactionsEnabled ? 5 : 0);
//        s_radius2 = s_radius * s_radius;
//    }

    private static Point2D.Double cm = new Point2D.Double();

	public static Point2D getCmGM(List<GasMolecule> instances) {// BH optimized out Point2D.setLocation
		cm.x = cm.y = 0;
		int n = instances.size();
		if (n > 0) {
			for (int i = n; --i >= 0;) {
				GasMolecule molecule = instances.get(i);
				cm.x += molecule.getPosition().getX();
				cm.y += molecule.getPosition().getY();
			}
			cm.x /= n;
			cm.y /= n;
		}
		return cm;
	}


    // List of GasMolecule.Observers
    private ArrayList<Observer> observers = new ArrayList<Observer>();
		public int regionPt;
		public Region region;

    public interface Observer extends SimpleObserver {
        void removedFromSystem();
    }

    public GasMolecule( Point2D position, MutableVector2D velocity, MutableVector2D acceleration, float mass, double radius ) {
        super( position, velocity, acceleration, mass, radius );
        type = TYPE_GAS_MOLECULE;
    }

//    public MutableVector2D getVelocity() {
//        return super.getVelocity();
//    }

    public void addObserverGM ( GasMolecule.Observer observer ) {  // BH
        observers.add( observer );
        this.addObserver( observer );
    }

    public void removeObserver( GasMolecule.Observer observer ) {
        observers.remove( observer );
    }

//    public void setVelocity( MutableVector2D velocity ) {
//        super.setVelocity( velocity );
//    }

//    public void setVelocity( double vX, double vY ) {
//        super.setVelocity( vX, vY );
//    }

//    public void setVelocityX( double vX ) {
//        super.setVelocity( vX, getVelocity().getY() );
//    }
//
//    public void setVelocityY( double vY ) {
//        super.setVelocity( getVelocity().getX(), vY );
//    }

    @Override
		public double getRadius() {
    	// BH Note that this method does NOT return the radius of the particle. 
    	// BH It returns 4 always. 
        return s_radius;
    }
     

// BH unnecesssary
//    public void setPosition( double x, double y ) {
//        super.setPosition( x, y );
//    }
//
//    public void setPosition( Point2D position ) {
//        super.setPosition( position );
//    }

    public void removeYourselfFromSystem() {
    	removeYourselfFromSystemGM();
    }

		protected void removeYourselfFromSystemGM() {
      // Work with a copy of the list of observers, in case any of them remove
      // themselves as observers in their implementations of removeFromSystem()
      List<Observer> observerCopies = new ArrayList<Observer>( observers );
      for ( int i = 0; i < observerCopies.size(); i++ ) {
          Observer observer = observerCopies.get( i );
          observer.removedFromSystem();
      }
		}

		public double getPotentialEnergy() {
			// TODO Auto-generated method stub
			return 0;
		}

}
