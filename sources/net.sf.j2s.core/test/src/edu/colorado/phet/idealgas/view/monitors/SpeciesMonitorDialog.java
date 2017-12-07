// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 47772 $
 * Date modified : $Date: 2011-01-07 13:53:07 -0600 (Fri, 07 Jan 2011) $
 */
package edu.colorado.phet.idealgas.view.monitors;

import java.awt.GridLayout;

import javax.swing.JPanel;

import edu.colorado.phet.common.phetcommon.application.PaintImmediateDialog;
import edu.colorado.phet.common.phetcommon.view.PhetFrame;
import edu.colorado.phet.idealgas.IdealGasResources;
import edu.colorado.phet.idealgas.model.HeavySpecies;
import edu.colorado.phet.idealgas.model.IdealGasModel;
import edu.colorado.phet.idealgas.model.LightSpecies;

/**
 * A dialog that shows monitor panels for each of the species in the simulation
 */
public class SpeciesMonitorDialog extends PaintImmediateDialog {
    private String[] speciesPanelTitles = new String[]{
            IdealGasResources.getString( "IdealGasMonitorPanel.Heavy_species" ),
            IdealGasResources.getString( "IdealGasMonitorPanel.Light_species" )
    };
    private GasSpeciesMonitorPanel heavySpeciesPanel;
    private GasSpeciesMonitorPanel lightSpeciesPanel;

    public SpeciesMonitorDialog( PhetFrame phetFrame, IdealGasModel idealGasModel ) {
        super( phetFrame, IdealGasResources.getString( "GasSpeciesMonitorPanel.Title" ), false );
        this.setResizable( false );

        JPanel speciesPanel = new JPanel( new GridLayout( 2, 1 ) );
        heavySpeciesPanel = new GasSpeciesMonitorPanel( HeavySpecies.class,
                                                        speciesPanelTitles[0],
                                                        idealGasModel );
        speciesPanel.add( heavySpeciesPanel );
        lightSpeciesPanel = new GasSpeciesMonitorPanel( LightSpecies.class,
                                                        speciesPanelTitles[1],
                                                        idealGasModel );
        speciesPanel.add( lightSpeciesPanel );

        this.getContentPane().add( speciesPanel );
        pack();
    }

    public void setSpeciesPanelTitles( String[] speciesPanelTitles ) {
        this.speciesPanelTitles = speciesPanelTitles;
        heavySpeciesPanel.setTitle( speciesPanelTitles[0] );
        lightSpeciesPanel.setTitle( speciesPanelTitles[1] );
    }


}
