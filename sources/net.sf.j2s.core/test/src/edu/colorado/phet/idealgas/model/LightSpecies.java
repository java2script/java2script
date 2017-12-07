// Copyright 2002-2012, University of Colorado

/*
 * Class: LightSpecies
 * Package: edu.colorado.phet.physics.idealgas
 *
 * Created by: Ron LeMaster
 * Date: Nov 4, 2002
 */
package edu.colorado.phet.idealgas.model;

import java.awt.geom.Point2D;
import java.util.ArrayList;

import edu.colorado.phet.common.phetcommon.math.vector.MutableVector2D;

/**
 *
 */
public class LightSpecies extends GasMolecule {

    //----------------------------------------------------------------
    // Static fields and methods
    //----------------------------------------------------------------

    private static double s_radius = 2.5;  // BH Java fix #7: was 3.5
    private static double s_radius2 = 6.25;

    private static float s_mass = 4; // Helium
    private static ArrayList<GasMolecule> s_instances = new ArrayList<GasMolecule>( 100 );

    public static void clear() {
        s_instances.removeAll( s_instances );
    }

    public static double getMoleculeMass() {
        return s_mass;
    }

    public static void setMoleculeMass( double mass ) {
        s_mass = (float) mass;
    }

    public static void setMoleculeRadius( double radius ) {
        s_radius = radius;
    }

  	@Override
		public double getRadius() { // BH Java fix #11 - must overload GasMolecule
  		return s_radius;
  	}

  	@Override
		public double getRadius2() {// BH Java fix #11 - must overload GasMolecule
  		return s_radius2;
  	}

  	public static void removeParticle( LightSpecies particle ) {
        s_instances.remove( particle );
    }

    public static Point2D getCm() {
        return GasMolecule.getCmGM( s_instances );
    }

    public static int getCnt() {
        return s_instances.size();
    }


    /**
     * Constructor
     */
    public LightSpecies( Point2D position, MutableVector2D velocity, MutableVector2D acceleration ) {
        super( position, velocity, acceleration, s_mass, s_radius );
        type = TYPE_LIGHT_SPECIES;
        init();
        setRadius( s_radius );
    }

    /**
     *
     */
    private void init() {
        s_instances.add( this );
    }

    @Override
		public void removeYourselfFromSystem() {
        removeYourselfFromSystemGM();
        LightSpecies.removeParticle( this );
//        notifyObservers();
    }
}
