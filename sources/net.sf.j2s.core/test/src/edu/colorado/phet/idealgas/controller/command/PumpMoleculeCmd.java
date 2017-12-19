// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 47772 $
 * Date modified : $Date: 2011-01-07 13:53:07 -0600 (Fri, 07 Jan 2011) $
 */
package edu.colorado.phet.idealgas.controller.command;

import java.util.Random;

import edu.colorado.phet.common.phetgraphics.application.PhetGraphicsModule;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetGraphic;
import edu.colorado.phet.idealgas.IdealGasConfig;
import edu.colorado.phet.idealgas.collision.CollidableBody;
import edu.colorado.phet.idealgas.model.GasMolecule;
import edu.colorado.phet.idealgas.model.IdealGasModel;
import edu.colorado.phet.idealgas.view.HeavySpeciesGraphic;
import edu.colorado.phet.idealgas.view.LightSpeciesGraphic;

public class PumpMoleculeCmd extends AddModelElementCmd {

    //-------------------------------------------------------------
    // Static fields and methods
    //-------------------------------------------------------------

    protected static final float DEFAULT_ENERGY = IdealGasModel.DEFAULT_ENERGY;

    private GasMolecule molecule;
    private PhetGraphicsModule module;
    protected Class<?> speciesClass;
    private IdealGasModel idealGasModel;
    static private Random random = new Random();


    /**
     * @param model
     * @param molecule
     * @param module
     */
    public PumpMoleculeCmd( IdealGasModel model,
                            GasMolecule molecule,
                            PhetGraphicsModule module ) {
        super( model, molecule );
        this.idealGasModel = model;
        this.molecule = molecule;
        this.module = module;
    }

	/**
     *
     */
	@Override
	public void doIt() {
		super.doIt();
		PhetGraphic graphic = null;
		if ((molecule.type & CollidableBody.TYPE_HEAVY_SPECIES) == CollidableBody.TYPE_HEAVY_SPECIES) {
			graphic = new HeavySpeciesGraphic(module.getApparatusPanel(), molecule);
		} else if ((molecule.type & CollidableBody.TYPE_LIGHT_SPECIES) == CollidableBody.TYPE_LIGHT_SPECIES) {
			graphic = new LightSpeciesGraphic(module.getApparatusPanel(), molecule);
		}
		idealGasModel.getBox().addContainedBody(molecule);

		// todo: !!!!!!! this should be done in a different way!!!!
		// molecule.setInBox( true);

		// Randomize the placement of the graphic above and below the
		// MOLECULE_LAYER. This
		// gives the scene depth when objects like the thermometer are placed at the
		// MOLECULE_LAYER
		double dLayer = 1 * (random.nextBoolean() ? 1 : 0);
		module.getApparatusPanel().addGraphic(graphic,
				IdealGasConfig.MOLECULE_LAYER + dLayer);
	}
}
