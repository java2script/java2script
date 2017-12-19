// Copyright 2002-2012, University of Colorado

/*
 * Class: HeavySpecies
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
public class HeavySpecies extends GasMolecule {

    //---------------------------------------------------------------
    // Static fields and methods
    //---------------------------------------------------------------

    private static double s_radius = 5;
    private static double s_radius2 = 25; 
    private static float s_mass = 28; /* To make Kathy happy: Nitrogen */
    private static ArrayList<GasMolecule> s_instances = new ArrayList<GasMolecule>( 100 );

    public static void clear() {
        s_instances.removeAll( s_instances );
    }

    public static double getMoleculeRadius() {
        return s_radius;
    }

	@Override
	public double getRadius() { // BH Java fix #11 - should overload GasMolecule
		return s_radius;
	}

	@Override
	public double getRadius2() { // BH Java fix #11 - should overload GasMolecule
		return s_radius2;
	}


    public static double getMoleculeMass() {
        return s_mass;
    }

    public static void removeParticle( HeavySpecies particle ) {
        s_instances.remove( particle );
    }

    public static Point2D getCm() {
        return GasMolecule.getCmGM( s_instances );
    }

    public static int getCnt() {
        return s_instances.size();
    }

    public HeavySpecies( Point2D position, MutableVector2D velocity, MutableVector2D acceleration ) {
        super( position, velocity, acceleration, s_mass, s_radius );
        type = TYPE_HEAVY_SPECIES;
        init();
    }

    private void init() {
        synchronized ( s_instances ) {
            s_instances.add( this );
        }
    }

    @Override
		public void removeYourselfFromSystem() {
        removeYourselfFromSystemGM();
        HeavySpecies.removeParticle( this );
//        notifyObservers();
    }

}
