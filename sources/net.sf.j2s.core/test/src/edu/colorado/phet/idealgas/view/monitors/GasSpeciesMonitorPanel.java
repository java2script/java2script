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

import java.text.NumberFormat;

import javax.swing.JLabel;
import javax.swing.JTextField;
import javax.swing.border.Border;
import javax.swing.border.TitledBorder;

import edu.colorado.phet.common.phetcommon.util.SimpleObserver;
import edu.colorado.phet.idealgas.IdealGasResources;
import edu.colorado.phet.idealgas.model.GasMolecule;
import edu.colorado.phet.idealgas.model.HeavySpecies;
import edu.colorado.phet.idealgas.model.IdealGasModel;
import edu.colorado.phet.idealgas.model.LightSpecies;

/**
 *
 */
public class GasSpeciesMonitorPanel extends PhetMonitorPanel implements SimpleObserver {

    //----------------------------------------------------------------
    // Class<?> data
    //----------------------------------------------------------------

    // The following factors make the speed of molecules displayed correct
    private double s_screenToModelFactor = 476.0 / 327;
    //    private double s_screenToModelFactor = 476.0 / 290;
    private double s_aveSpeedReadoutFactor = 10 * s_screenToModelFactor;


    private int sampleCnt;
    private double runningAveSpeed;
    private Class<?> speciesClass;
    private JTextField numParticlesTF;
    private NumberFormat aveSpeedFormat = NumberFormat.getInstance();
    private JTextField aveSpeedTF;
    private IdealGasModel model;


    /**
     * Constructor
     */
    public GasSpeciesMonitorPanel( Class<?> speciesClass, String speciesName, final IdealGasModel model ) {
        this.model = model;
        this.speciesClass = speciesClass;

        setUpdateInterval( 500 );

        // Sanity check on parameter
        if( !GasMolecule.class.isAssignableFrom( speciesClass ) ) {
            throw new RuntimeException( "Class other than a gas species class sent to constructor for GasSpeciesMonitorPanel" );
        }

        setTitle( speciesName );

        // Set up the readout for the number of gas molecules
        this.add( new JLabel( IdealGasResources.getString( "GasSpeciesMonitorPanel.Number_of_Gas_Molecules" ) + ": " ) );
        numParticlesTF = new JTextField( 4 );
        numParticlesTF.setEditable( false );
        this.add( numParticlesTF );

        // Set up the average speed readout
        aveSpeedFormat.setMaximumFractionDigits( 2 );
        //aveSpeedFormat.setMinimumFractionDigits( 2 );
        this.add( new JLabel( IdealGasResources.getString( "GasSpeciesMonitorPanel.Average_speed" ) + ": " ) );
        aveSpeedTF = new JTextField( 6 );
        aveSpeedTF.setEditable( false );
        this.add( aveSpeedTF );
        this.add( new JLabel( IdealGasResources.getString( "chart.label.msec" )) );

        // Hook up to the model
        model.addObserver( this );
    }

    /**
     * Sets the title for the dialog
     */
    public void setTitle( String title ) {
        Border border = new TitledBorder( title );
        this.setBorder( border );
    }

    /**
     * Clears the values in the readouts
     */
    public void clear() {
        numParticlesTF.setText( "" );
        aveSpeedTF.setText( "" );
    }

    /**
     *
     */
    @Override
		public void update() {

        // Get the number of molecules, average speed of the molecules
        double aveSpeed = 0;
        int numMolecules = 0;
        if( HeavySpecies.class.isAssignableFrom( speciesClass ) ) {
            numMolecules = model.getHeavySpeciesCnt();
            aveSpeed = model.getHeavySpeciesAveSpeed();
        }
        if( LightSpecies.class.isAssignableFrom( speciesClass ) ) {
            numMolecules = model.getLightSpeciesCnt();
            aveSpeed = model.getLightSpeciesAveSpeed();
        }

        // Track the values we got
        long now = System.currentTimeMillis();
        if( now - getLastUpdateTime() >= getUpdateInterval() ) {

            setLastUpdateTime( now );
            //Display the readings
            numParticlesTF.setText( Integer.toString( numMolecules ) );

            if( Double.isNaN( runningAveSpeed ) ) {
            }
            aveSpeedTF.setText( aveSpeedFormat.format( ( runningAveSpeed / sampleCnt ) * s_aveSpeedReadoutFactor ) );
            sampleCnt = 0;
            runningAveSpeed = 0;
        }
        else {
            sampleCnt++;
            runningAveSpeed += aveSpeed;
        }
    }

}
