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

import java.awt.Color;
import java.awt.Component;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.GridLayout;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JSlider;
import javax.swing.JSpinner;
import javax.swing.SpinnerNumberModel;
import javax.swing.border.Border;
import javax.swing.border.TitledBorder;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

import edu.colorado.phet.idealgas.IdealGasConfig;
import edu.colorado.phet.idealgas.IdealGasResources;
import edu.colorado.phet.idealgas.model.Gravity;
import edu.colorado.phet.idealgas.model.IdealGasModel;
import edu.colorado.phet.idealgas.model.Pump;

/**
 * The base control panel for all modules.
 *
 * @author Ron LeMaster
 * @version $Revision: 47772 $
 */
@SuppressWarnings("serial")
public class AdvancedIdealGasControlPanel extends JPanel implements Gravity.ChangeListener {

//    private NumberFormat gravityFormat = NumberFormat.getInstance();
//    private JTextField gravityTF;
    private JSlider gravitySlider;
//    private JPanel gravityControlPanel;
    private IdealGasModule module;
    private IdealGasModel idealGasModel;
    private GridBagConstraints gbc;
    // Separate panels for miscellaneous controls, particle controls, and buttons
    //private JPanel miscPanel;
    private JPanel particleControlsPanel;
    private JPanel buttonPanel;
    private GridBagConstraints particleControlsGbc;
    private String leftParticlesLabel;
    private String rightParticlesLabel;


    // todo: figure out where the 2.5 comes from, and don't use a hard-coded constant here!!!!!
    final static double hackConst = 2.5;
    /**
     * @param module
     * @param leftParticlesLabel
     * @param rightParticlesLabel
     */
    public AdvancedIdealGasControlPanel( IdealGasModule module, String leftParticlesLabel, String rightParticlesLabel ) {
        super();
        this.module = module;
        this.leftParticlesLabel = leftParticlesLabel;
        this.rightParticlesLabel = rightParticlesLabel;
        this.idealGasModel = (IdealGasModel)module.getModel();
        idealGasModel.getGravity().addListener( this );
        init();
    }

    private void init() {
        // Create the component panels
//        makeMiscControls();
        makeButtonPanel();
        makeParticlesControls();

        // Lay out the panel
        this.setLayout( new GridBagLayout() );
        gbc = new GridBagConstraints( 0, GridBagConstraints.RELATIVE,
                                      1, 1, 1, 1,
                                      GridBagConstraints.CENTER,
                                      GridBagConstraints.HORIZONTAL,
                                      new Insets( 0, 0, 0, 0 ), 0, 0 );

        // Add controls for the number and type of molecules to put in the box
        add( particleControlsPanel, gbc );

        // Add miscellaneous controls (gravity, particle interactions, etc.
//        idealGasModel.getGravity().setAmt( IdealGasConfig.MAX_GRAVITY/ 2 );
//        this.add( miscPanel, gbc );

        // Add the reset and measurement panel buttons
        this.add( buttonPanel, gbc );

        Border border = BorderFactory.createEtchedBorder();
        this.setBorder( border );
    }

    /**
     * Sets the labels used for the particles in the left and right portions of the box
     *
     * @param leftParticlesLabel
     * @param rightParticlesLabel
     */
    protected void setParticlesLabels( String leftParticlesLabel, String rightParticlesLabel ) {
        this.leftParticlesLabel = leftParticlesLabel;
        this.rightParticlesLabel = rightParticlesLabel;
    }

    /**
     * Creates the panel that holds controls for the particles in the box
     */
    private void makeParticlesControls() {
        particleControlsPanel = new JPanel( new GridBagLayout() );

        particleControlsGbc = new GridBagConstraints( 0, 0,
                                                      2, 1, 1, 1,
                                                      GridBagConstraints.CENTER,
                                                      GridBagConstraints.HORIZONTAL,
                                                      new Insets( 0, 0, 0, 0 ), 0, 0 );

        // Add controls for the number and type of molecules to put in the box
        JPanel speciesButtonPanel = new PChemParticleControlPanel( module, module.getPump(),
                                                                   leftParticlesLabel,
                                                                   rightParticlesLabel );
        speciesButtonPanel.setBorder( new TitledBorder( IdealGasResources.getString( "IdealGasControlPanel.Particles_In_Chamber" ) ) );
        particleControlsPanel.add( speciesButtonPanel, particleControlsGbc );

        // Add control for temperature at which particles are introduced
        JLabel tempLbl = new JLabel( IdealGasResources.getString( "AdvancedControlPanel.Particle_Temperature" ) );
        particleControlsGbc.insets = new Insets( 10, 10, 10, 10 );
        particleControlsGbc.gridwidth = 1;
        particleControlsGbc.gridx = 0;
        particleControlsGbc.gridy = 1;
        particleControlsGbc.anchor = GridBagConstraints.EAST;
        particleControlsPanel.add( tempLbl, particleControlsGbc );

        final JSpinner tempSpinner = new JSpinner( new SpinnerNumberModel( IdealGasModel.DEFAULT_ENERGY / IdealGasConfig.TEMPERATURE_SCALE_FACTOR / hackConst,
                                                                           50, 1000, 1 ) );
        particleControlsGbc.gridx = 1;
        particleControlsGbc.anchor = GridBagConstraints.WEST;
        particleControlsPanel.add( tempSpinner, particleControlsGbc );
        // Changes the temperature at which particles are pumped into the box
        tempSpinner.addChangeListener( new ChangeListener() {
            @Override
						public void stateChanged( ChangeEvent e ) {
                setPumpEnergy( ( (Double)tempSpinner.getValue() ).doubleValue() );
//                Pump[] pumps = ( (AdvancedModule)getModule() ).getPumps();
//                for( int i = 0; i < pumps.length; i++ ) {
//                    pumps[i].setPumpingEnergyStrategy( new Pump.FixedEnergyStrategy( temp ) );
//                }
            }
        } );
        
        
        setPumpEnergy( ( (Double)tempSpinner.getValue() ).doubleValue() );
    }

    /**
     * Sets the pumping strategy and temperature for all pumps in the system
     */
    private void setPumpEnergy( double temp ) {
    	double energy =  temp * IdealGasConfig.TEMPERATURE_SCALE_FACTOR * hackConst;
    	AdvancedModule module = (AdvancedModule)getModule();
        Pump[] pumps = module.getPumps();
        for( int i = 0; i < pumps.length; i++ ) {
            if( pumps[i] != null ) {  	
                pumps[i].setPumpingEnergyStrategy( new Pump.FixedEnergyStrategy( energy ) );
                
            }
        }
    }

//    /**
//     * Creates the panel that contains controls for things that don't appear as objects on the screen
//     */
//    private void makeMiscControls() {
//        miscPanel = new JPanel( new GridBagLayout() );
//        GridBagConstraints gbc = new GridBagConstraints( 0, GridBagConstraints.RELATIVE,
//                                                         1, 1, 1, 1,
//                                                         GridBagConstraints.CENTER,
//                                                         GridBagConstraints.HORIZONTAL,
//                                                         new Insets( 0, 0, 0, 0 ), 0, 0 );
////        JPanel gravityControls = gravityControls();
////        miscPanel.add( gravityControls, gbc );
//    }

    /**
     * Make buttons for Reset and Measurement Tools
     */
    private void makeButtonPanel() {

        // Reset button
        JButton resetBtn = new JButton( IdealGasResources.getString( "IdealGasControlPanel.Reset" ) );
        resetBtn.setBackground( new Color( 180, 255, 180 ) );
        resetBtn.addActionListener( new ActionListener() {
            @Override
						public void actionPerformed( ActionEvent e ) {
                module.reset();
            }
        } );

        // Measurement tools button
//        ToggleButton measurementDlgBtn = new MeasurementDialogButton();
//        measurementDlgBtn.setAlignmentX( JButton.CENTER_ALIGNMENT );
//        measurementDlgBtn.setBackground( new Color( 255, 255, 120 ) );
        JPanel measurementToolsPanel = new JPanel( new GridLayout( 2, 1 ) );
        measurementToolsPanel.add( new MeasurementToolsControls.SpeciesMonitorControl( module ) );
        measurementToolsPanel.add( new MeasurementToolsControls.HistogramControlPanel( module ) );

        // Put them on the button panel
        buttonPanel = new JPanel( new GridBagLayout() );
        GridBagConstraints gbc = new GridBagConstraints( 0, GridBagConstraints.RELATIVE,
                                                         1, 1, 1, 1,
                                                         GridBagConstraints.CENTER, GridBagConstraints.NONE,
                                                         new Insets( 2, 2, 2, 2 ), 0, 0 );
        buttonPanel.add( measurementToolsPanel, gbc );
        buttonPanel.add( resetBtn, gbc );
//        buttonPanel.add( measurementDlgBtn, gbc );
        buttonPanel.revalidate();
    }

//    /**
//     * Create a panel with controls for gravity and add it to the IdealGasControlPanel
//     */
//    private JPanel gravityControls() {
//
//        gravityControlPanel = new JPanel( new GridBagLayout() );
//        GridBagConstraints gbc = new GridBagConstraints( GridBagConstraints.RELATIVE, 0, 1, 1, 1, 1,
//                                                         GridBagConstraints.CENTER,
////                                                         GridBagConstraints.WEST,
//GridBagConstraints.NONE,
//new Insets( 0, 0, 0, 0 ), 0, 0 );
//        gravitySlider = new JSlider( JSlider.HORIZONTAL, 0, IdealGasConfig.MAX_GRAVITY, 0 );
//        gravitySlider.setPreferredSize( new Dimension( 150, 50 ) );
//        gravitySlider.setPaintTicks( true );
//        gravitySlider.setMajorTickSpacing( 10 );
//        gravitySlider.setMinorTickSpacing( 5 );
//        Hashtable labelTable = new Hashtable();
//        labelTable.put( new Integer( 0 ), new JLabel( IdealGasResources.getString( "Common.0" ) ) );
//        labelTable.put( new Integer( IdealGasConfig.MAX_GRAVITY ), new JLabel( IdealGasResources.getString( "Common.Max" ) ) );
//        gravitySlider.setLabelTable( labelTable );
//        gravitySlider.setPaintLabels( true );
//        gravityControlPanel.add( gravitySlider, gbc );
//        gravitySlider.addChangeListener( new ChangeListener() {
//            public void stateChanged( ChangeEvent event ) {
//                module.setGravity( gravitySlider.getValue() );
////                updateGravity( gravityOnCB.isSelected(), gravitySlider.getValue() );
//            }
//        } );
//
//        // Add a readout for the value of gravity
//        gravityTF = new JTextField( 2 );
//        gravityTF.setEditable( false );
//        gravityTF.setHorizontalAlignment( JTextField.RIGHT );
//        gravityFormat.setMaximumFractionDigits( 2 );
//        gravityFormat.setMinimumFractionDigits( 2 );
//        gravityTF.setText( gravityFormat.format( 0 ) );
//
//        Border gravityBorder = new TitledBorder( IdealGasResources.getString( "Common.Gravity" ) );
//        gravityControlPanel.setBorder( gravityBorder );
//        return gravityControlPanel;
//    }

    public void setGravity( double amt ) {
//        this.gravitySlider.setValue( (int)amt );
    }

    public void addComponent( Component component ) {
        this.add( component, gbc );
    }

    public void addParticleControl( Component component ) {
        particleControlsPanel.add( component, particleControlsGbc );
    }

    //--------------------------------------------------------------------------
    // Utility methods
    //--------------------------------------------------------------------------

    protected IdealGasModule getModule() {
        return module;
    }

    //--------------------------------------------------------------------------
    // Inner classes
    //--------------------------------------------------------------------------

//    private class MeasurementDialogButton extends ToggleButton {
//
//        public MeasurementDialogButton() {
//            super( IdealGasResources.getString( "IdealGasControlPanel.Measurement_Tools" ),
//                   IdealGasResources.getString( "IdealGasControlPanel.Measurement_Tools" ) );
//        }
//
//        public void onAction() {
//            JDialog dlg = module.setMeasurementDlgVisible( true );
//            dlg.addWindowListener( new WindowAdapter() {
//                public void windowClosing( WindowEvent e ) {
//                    setOff();
//                }
//            } );
//        }
//
//        public void offAction() {
//            module.setMeasurementDlgVisible( false );
//        }
//    }

    //-----------------------------------------------------------------
    // Event handling
    //----------------------------------------------------------------
    @Override
		public void gravityChanged( Gravity.ChangeEvent event ) {
        gravitySlider.setValue( (int)event.getGravity().getAmt() );
    }
}


