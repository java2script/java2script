// Copyright 2002-2012, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: olsonj $
 * Revision : $Revision: 66113 $
 * Date modified : $Date: 2012-07-21 04:27:33 -0500 (Sat, 21 Jul 2012) $
 */
package edu.colorado.phet.idealgas.model;

import java.awt.geom.Rectangle2D;
import java.util.EventListener;
import java.util.EventObject;
import java.util.List;

import edu.colorado.phet.common.mechanics.Body;
import edu.colorado.phet.common.phetcommon.math.vector.MutableVector2D;
import edu.colorado.phet.common.phetcommon.util.EventChannel;
import edu.colorado.phet.idealgas.collision.CollidableBody;
import edu.colorado.phet.idealgas.collision.Wall;


/**
 * PChemModel
 *
 * @author Ron LeMaster
 * @version $Revision: 66113 $
 */
public class PChemModel extends IdealGasModel implements Wall.ChangeListener {
    double centerlineLoc;

    /**
     * @param dt
     */
    public PChemModel( double dt ) {
        super( dt );
        isChemical = true;
    }

    /**
     * @param centerlineLoc
     */
    public void setCenterlineLoc( double centerlineLoc ) {
        this.centerlineLoc = centerlineLoc;
    }

    /**
     * @param verticalWall
     */
    public void setVerticalWall( Wall verticalWall ) {
        verticalWall.addChangeListener( this );
        Rectangle2D wallBounds = verticalWall.getBoundsNoCopy();
        setCenterlineLoc( wallBounds.getMinX() + wallBounds.getWidth() / 2 );
    }

	/**
	 * Changes the type of an object (GasMolecule) if it crosses the centerline of
	 * the energy profile
	 * 
	 * @param dt
	 */
	@Override
	public void stepInTime(double dt) {
		stepInTimeIGM(dt);

		List<GasMolecule> molecules = getGasMolecules();
		
		for (int i = molecules.size(); --i >= 0;) {
			GasMolecule molecule = molecules.get(i);
			if (molecule.getPosition().getX() > centerlineLoc) {
				if ((molecule.type & CollidableBody.TYPE_HEAVY_SPECIES) == CollidableBody.TYPE_HEAVY_SPECIES) {
					LightSpecies lightMolecule = new LightSpecies(molecule.getPosition(),
							molecule.getVelocity(), molecule.getAcceleration());
					MutableVector2D vOld = molecule.getVelocity();
					MutableVector2D vNew = vOld.scale(Math.sqrt(molecule.getMass()
							/ lightMolecule.getMass()));
					lightMolecule.setVelocity(vNew.getX(), vNew.getY());
					addBody(lightMolecule, CollidableBody.TYPE_LIGHT_SPECIES);
					removeBody(molecule, CollidableBody.TYPE_HEAVY_SPECIES);
					listenerProxy.moleculeCreated(new MoleculeCreationEvent(this,
							lightMolecule));
					return;
				}
			} else if ((molecule.type & CollidableBody.TYPE_LIGHT_SPECIES) == CollidableBody.TYPE_LIGHT_SPECIES) {
				HeavySpecies heavyMolecule = new HeavySpecies(molecule.getPosition(),
						molecule.getVelocity(), molecule.getAcceleration());
				MutableVector2D vOld = molecule.getVelocity();
				MutableVector2D vNew = vOld.scale(Math.sqrt(molecule.getMass()
						/ heavyMolecule.getMass()));
				heavyMolecule.setVelocity(vNew.getX(), vNew.getY());
				addBody(heavyMolecule, CollidableBody.TYPE_HEAVY_SPECIES);
				removeBody(molecule, CollidableBody.TYPE_LIGHT_SPECIES);
				listenerProxy.moleculeCreated(new MoleculeCreationEvent(this,
						heavyMolecule));
			}
		}
	}

    //----------------------------------------------------------------
    // Event handling
    //----------------------------------------------------------------

    @Override
		public void wallChanged( Wall.ChangeEvent event ) {
        Rectangle2D wallBounds = event.getWall().getBoundsNoCopy();
        setCenterlineLoc( wallBounds.getMinX() + wallBounds.getWidth() / 2 );
    }


    public class MoleculeCreationEvent extends EventObject {
        private GasMolecule molecule;

        public MoleculeCreationEvent( Object source, GasMolecule molecule ) {
            super( source );
            this.molecule = molecule;
        }

        public GasMolecule getMolecule() {
            return molecule;
        }
    }

    public interface Listener extends EventListener {
        public void moleculeCreated( MoleculeCreationEvent event );
    }

    private EventChannel listenerChannel = new EventChannel( Listener.class );
    private Listener listenerProxy = (Listener) listenerChannel.getListenerProxy();

    public void addListener( Listener listener ) {
        listenerChannel.addListener( listener );
    }

    public void removeListener( Listener listener ) {
        listenerChannel.removeListener( listener );
    }
}
