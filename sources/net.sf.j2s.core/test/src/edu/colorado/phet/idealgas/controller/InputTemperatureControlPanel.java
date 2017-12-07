// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.idealgas.controller;

import edu.colorado.phet.idealgas.IdealGasConfig;
import edu.colorado.phet.idealgas.IdealGasResources;
import edu.colorado.phet.idealgas.model.IdealGasModel;
import edu.colorado.phet.idealgas.model.Pump;

import javax.swing.*;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

/**
 * InputTemperatureControlPanel
 *
 * @author Ron LeMaster
 */
public class InputTemperatureControlPanel extends JPanel {
    
    // TODO: figure out where the 2.5 comes from!!!!!
    private static final double HACK_CONSTANT = 2.5;
    
    private static final double MIN_TEMPERATURE = 50;
    private static final double MAX_TEMPERATURE = 10000;
    private static final double DEFAULT_TEMPERATURE = IdealGasModel.DEFAULT_ENERGY / IdealGasConfig.TEMPERATURE_SCALE_FACTOR / HACK_CONSTANT;
    
    private final IdealGasModule module;
    private final Pump[] pumps;
    private final JCheckBox temperatureCheckBox;
    private final JSpinner temperatureSpinner;

    public InputTemperatureControlPanel( IdealGasModule module, final Pump[] pumps ) {
        super( new GridBagLayout() );
        
        this.module = module;
        this.pumps = pumps;
        
        // check box
        temperatureCheckBox = new JCheckBox( IdealGasResources.getString( "AdvancedControlPanel.Particle_Temperature" ), false );
        temperatureCheckBox.addActionListener( new ActionListener() {
            @Override
						public void actionPerformed( ActionEvent e ) {
                temperatureSpinner.setEnabled( temperatureCheckBox.isSelected() );
                updatePumps();
            }
        } );
        
        // spinner
        temperatureSpinner = new JSpinner( new SpinnerNumberModel( DEFAULT_TEMPERATURE, MIN_TEMPERATURE, MAX_TEMPERATURE, 1 /* stepSize */ ) );
        temperatureSpinner.setEnabled( false );
        temperatureSpinner.addChangeListener( new ChangeListener() {
            @Override
						public void stateChanged( ChangeEvent e ) {
                updatePumps();
            }
        } );

        // layout
        GridBagConstraints gbc = new GridBagConstraints( 0, 0,
                1, 1, 1, 1,
                GridBagConstraints.CENTER,
                GridBagConstraints.NONE,
                new Insets( 0, 0, 0, 0 ), 0, 0 );
        gbc.anchor = GridBagConstraints.NORTHWEST;
        this.add( temperatureCheckBox, gbc );
        gbc.gridy = 1;
        gbc.anchor = GridBagConstraints.CENTER;
        this.add( temperatureSpinner, gbc );
    }
    
    private double getTemperature() {
        return ( (Double) temperatureSpinner.getValue() ).doubleValue() * IdealGasConfig.TEMPERATURE_SCALE_FACTOR * HACK_CONSTANT;
    }
    
    /*
     * If the check box is checked, use a fixed-energy strategy based on temperature.
     * Otherwise get the strategy from the module.
     */
    private Pump.PumpingEnergyStrategy getPumpingStrategy() {
        Pump.PumpingEnergyStrategy strategy = null;
        if ( temperatureCheckBox.isSelected() ) {
            strategy = new Pump.FixedEnergyStrategy( getTemperature() );
        }
        else {
            strategy = module.getPumpingEnergyStrategy();
        }
        return strategy;
    }
    
    /*
     * Updates the energy strategy used by all pumps.
     */
    private void updatePumps() {
        Pump.PumpingEnergyStrategy strategy = getPumpingStrategy();
        System.out.println( "updating " + pumps.length + " pumps, energy=" + strategy.getMoleculeEnergy() + " type=" + strategy.getClass().getName() );//XXX
        for( int i = 0; i < pumps.length; i++ ) {
            pumps[i].setPumpingEnergyStrategy( strategy );
        }
    }
}
