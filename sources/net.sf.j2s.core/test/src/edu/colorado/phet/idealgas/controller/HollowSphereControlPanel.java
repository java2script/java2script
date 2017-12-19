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
import edu.colorado.phet.idealgas.model.HollowSphere;


/**
 * PumpControlPanel
 *
 * @author Ron LeMaster
 * @version $Revision: 47772 $
 */
public class HollowSphereControlPanel extends SpeciesSelectionPanel implements HollowSphere.HollowSphereListener {
    private HollowSphere sphere;

    public HollowSphereControlPanel( IdealGasModule module, GasSource gasSource, HollowSphere sphere ) {
        super( module );
//        sphere.addHollowSphereListener( this );
        this.sphere = sphere;
    }

    private RigidHollowSphereModule getRhsModule() {
        return (RigidHollowSphereModule)getModule();
    }

    @Override
		protected void createMolecule( Class<?> moleculeClass ) {
        getRhsModule().addMoleculeToSphere( moleculeClass );
    }

    @Override
		protected void removeMolecule( Class<?> moleculeClass ) {
        getRhsModule().removeGasMoleculeFromSphere( moleculeClass );
    }

    @Override
		protected int getHeavySpeciesCnt() {
        return sphere.getHeavySpeciesCnt();
    }

    @Override
		protected int getLightSpeciesCnt() {
        return sphere.getLightSpeciesCnt();
    }


    @Override
		public void moleculeAdded( HollowSphere.MoleculeEvent event ) {
        GasMolecule molecule = event.getMolecule();
        if( (molecule.type & CollidableBody.TYPE_HEAVY_SPECIES )== CollidableBody.TYPE_HEAVY_SPECIES ) {
            getHeavySpinner().updateValue();
//            getHeavySpinner().incrementValue();
//            int oldCnt = ( (Integer)getHeavySpinner().getValue() ).intValue();
//            boolean isEnabled = getHeavySpinner().isEnabled();
//            getHeavySpinner().setEnabled( false );
//            getHeavySpinner().setValue( new Integer( oldCnt + 1 ) );
//            getHeavySpinner().setEnabled( isEnabled );
        }
        else if( (molecule.type & CollidableBody.TYPE_LIGHT_SPECIES )== CollidableBody.TYPE_LIGHT_SPECIES ) {
            getLightSpinner().updateValue();
//            getLightSpinner().incrementValue();
//            int oldCnt = ( (Integer)getLightSpinner().getValue() ).intValue();
//            getLightSpinner().setValue( new Integer( oldCnt + 1 ) );
        }
    }

    @Override
		public void moleculeRemoved( HollowSphere.MoleculeEvent event ) {
        GasMolecule molecule = event.getMolecule();
        if( (molecule.type & CollidableBody.TYPE_HEAVY_SPECIES )== CollidableBody.TYPE_HEAVY_SPECIES ) {
            getHeavySpinner().updateValue();
//            getHeavySpinner().decrementValue();
//            int oldCnt = ( (Integer)getHeavySpinner().getValue() ).intValue();
//            getHeavySpinner().setValue( new Integer( oldCnt - 1 ) );
        }
        else if( (molecule.type & CollidableBody.TYPE_LIGHT_SPECIES )== CollidableBody.TYPE_LIGHT_SPECIES ) {
            getLightSpinner().updateValue();
//            getLightSpinner().decrementValue();
//            int oldCnt = ( (Integer)getLightSpinner().getValue() ).intValue();
//            getLightSpinner().setValue( new Integer( oldCnt - 1 ) );
        }
    }
}
