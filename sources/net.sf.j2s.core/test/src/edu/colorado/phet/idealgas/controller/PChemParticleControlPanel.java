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

import edu.colorado.phet.common.phetcommon.util.SimpleObserver;
import edu.colorado.phet.idealgas.model.GasMolecule;
import edu.colorado.phet.idealgas.model.HeavySpecies;
import edu.colorado.phet.idealgas.model.IdealGasModel;
import edu.colorado.phet.idealgas.model.Pump;

/**
 * PumpControlPanel
 *
 * @author Ron LeMaster
 * @version $Revision: 47772 $
 */
public class PChemParticleControlPanel extends SpeciesSelectionPanel implements Pump.Listener {

    public PChemParticleControlPanel( IdealGasModule module, GasSource gasSource,
                                      String labelA, String labelB ) {
        super( module );

        // Hook the spinner up so it will track molecules put in the box by the pump
        ( (IdealGasModel)getModule().getModel() ).addObserver( new SimpleObserver() {
            @Override
						public void update() {
                int h = getModule().getIdealGasModel().getHeavySpeciesCnt();
                getHeavySpinner().setValue( new Integer( h ) );
            }
        } );

        // Hook the spinner up so it will track molecules put in the box by the pump
        ( (IdealGasModel)getModule().getModel() ).addObserver( new SimpleObserver() {
            @Override
						public void update() {
                int h = getModule().getIdealGasModel().getLightSpeciesCnt();
                getLightSpinner().setValue( new Integer( h ) );
            }
        } );

        setHeavySpeciesLabelText( labelA );
        setLightSpeciesLabelText( labelB );
        setHeavySpeciesLabelColor( AdvancedModule.COLOR_A );
        setLightSpeciesLabelColor( AdvancedModule.COLOR_B );
        repaint();
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
        return getModule().getIdealGasModel().getHeavySpeciesCnt();
    }

    @Override
		protected int getLightSpeciesCnt() {
        return getModule().getIdealGasModel().getLightSpeciesCnt();
    }

    //--------------------------------------------------------------
    // Event handling
    //--------------------------------------------------------------
    @Override
		public void moleculesAdded( Pump.MoleculeEvent event ) {
        Class<?> species = event.getSpecies();
        if( HeavySpecies.class.isAssignableFrom( species ) ) {
            int cnt = ( (Integer)getHeavySpinner().getValue() ).intValue();
            getHeavySpinner().setValue( new Integer( cnt + event.getNumMolecules() ) );
        }
    }

    @Override
		public void moleculeAdded( GasMolecule molecule ) {
        // noop
    }
}
