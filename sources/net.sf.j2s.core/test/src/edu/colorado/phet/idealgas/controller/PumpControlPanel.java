// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 47772 $
 * Date modified : $Date: 2011-01-07 13:53:07 -0600 (Fri, 07 Jan 2011) $
 */
package edu.colorado.phet.idealgas.controller;

import edu.colorado.phet.idealgas.collision.CollidableBody;
import edu.colorado.phet.idealgas.model.GasMolecule;
import edu.colorado.phet.idealgas.model.HeavySpecies;
import edu.colorado.phet.idealgas.model.LightSpecies;
import edu.colorado.phet.idealgas.model.PressureSensingBox;
import edu.colorado.phet.idealgas.model.Pump;

/**
 * PumpControlPanel
 * <p/>
 * A JPanel with spinners that make gas molecules come into the box from the pump.
 *
 * @author Ron LeMaster
 * @version $Revision: 47772 $
 */
@SuppressWarnings("serial")
public class PumpControlPanel extends SpeciesSelectionPanel implements Pump.Listener {
    private PressureSensingBox box;

    public PumpControlPanel( IdealGasModule module, GasSource gasSource, String[] speciesNames ) {
        super( module, speciesNames );
        module.getPump().addListener( this );
        this.box = module.getBox();
    }

    @Override
		protected boolean addMany(int n, Class<?> cl) { // BH feature better addition
    	getModule().pumpGasMolecules(n, cl);
    	return true;
		}


    @Override
		protected void createMolecule( Class<?> moleculeClass ) {
        getModule().pumpGasMolecules( 1, moleculeClass );
    }

    @Override
		protected void removeMolecule( Class<?> moleculeClass ) {
        getModule().removeGasMolecule( moleculeClass );
    }

    @Override
		protected int getHeavySpeciesCnt() {
        return getModule().getHeavySpeciesCnt();
    }

    @Override
		protected int getLightSpeciesCnt() {
        return getModule().getLightSpeciesCnt();
    }

    //--------------------------------------------------------------
    // Pump.Listener implementation
    //--------------------------------------------------------------

    @Override
		public void moleculesAdded( Pump.MoleculeEvent event ) {
        Class<?> species = event.getSpecies();
        if( HeavySpecies.class.isAssignableFrom( species ) ) {
            getHeavySpinner().setValue( new Integer( getModule().getHeavySpeciesCnt() ) );
        }
        if( LightSpecies.class.isAssignableFrom( species ) ) {
            getLightSpinner().setValue( new Integer( getModule().getLightSpeciesCnt() ) );
        }
    }

    @Override
		public void moleculeAdded( GasMolecule molecule ) {
        molecule.addObserverGM ( new MoleculeRemover( molecule ) ); // BH
    }

    private class MoleculeRemover implements GasMolecule.Observer {
        GasMolecule molecule;
        boolean isInBox = true;
        //boolean init;
        MoleculeCountSpinner spinner;

		// Point2D p = new Point2D.Double();
		// Rectangle2D b = new Rectangle2D.Double();

		MoleculeRemover(GasMolecule molecule) {
			this.molecule = molecule;
			if ((molecule.type & CollidableBody.TYPE_HEAVY_SPECIES) == CollidableBody.TYPE_HEAVY_SPECIES) {
				this.spinner = getHeavySpinner();
			}
			if ((molecule.type & CollidableBody.TYPE_LIGHT_SPECIES) == CollidableBody.TYPE_LIGHT_SPECIES) {
				this.spinner = getLightSpinner();
			}
		}

        @Override
				public void removedFromSystem() {
            update();
        }

        /**
         * Handles molecules leaving and re-entering the box
         */
        @Override
				public void update() {
//            SwingUtilities.invokeLater(  new Runnable() {
//                public void run() {

//                    int padding = 5;
//                    b.setRect( box.getBoundsInternal().getX() - padding,
//                               box.getBoundsInternal().getY() - padding,
//                               box.getBoundsInternal().getWidth() + padding * 2,
//                               box.getBoundsInternal().getHeight() + padding * 2 );

            if( box.isOpen() && box.containsPt( molecule.getPosition() ) != isInBox ) { // BH Java fix #5: don't notify 
            	// if box is closed; we will correct this later in IdealGasModel.  
                isInBox = !isInBox;
                spinner.updateValue();
            }
//            if( b.contains( molecule.getPosition() ) && !isInBox ) {
//                isInBox = true;
//                spinner.updateValue();
//            }
//                }
//            } );
        }
    }
}
