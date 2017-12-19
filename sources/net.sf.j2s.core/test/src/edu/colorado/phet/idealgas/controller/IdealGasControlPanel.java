// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: cmalley $
 * Revision : $Revision: 58841 $
 * Date modified : $Date: 2011-11-29 15:12:24 -0600 (Tue, 29 Nov 2011) $
 */
package edu.colorado.phet.idealgas.controller;

import java.awt.Color;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Hashtable;

import javax.swing.BorderFactory;
import javax.swing.ButtonGroup;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JRadioButton;
import javax.swing.JSlider;
import javax.swing.border.Border;
import javax.swing.border.TitledBorder;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

import edu.colorado.phet.idealgas.IdealGasConfig;
import edu.colorado.phet.idealgas.IdealGasResources;
import edu.colorado.phet.idealgas.model.Gravity;
import edu.colorado.phet.idealgas.model.IdealGasModel;

/**
 * The base control panel for all modules.
 *
 * @author Ron LeMaster
 * @version $Revision: 58841 $
 */
@SuppressWarnings("serial")
public class IdealGasControlPanel extends JPanel implements Gravity.ChangeListener {

   // BH never used private NumberFormat gravityFormat = NumberFormat.getInstance();
    private JSlider gravitySlider;
    private IdealGasModule module;
    private IdealGasModel idealGasModel;
    private GridBagConstraints gbc;
    // Separate panels for miscellaneous controls, particle controls, and buttons
    private JPanel miscPanel;
    private JPanel particleControlsPanel;
    private GridBagConstraints particleControlsGbc;
    private PumpControlPanel speciesButtonPanel;

    /**
     * @param module
     */
    public IdealGasControlPanel( IdealGasModule module ) {
        super();
        this.module = module;
        this.idealGasModel = (IdealGasModel) module.getModel();
        idealGasModel.getGravity().addListener( this );
        init();
    }

    private void init() {
        // Create the component panels
        makeMiscControls();
        makeParticlesControls();

        // Lay out the panel
        this.setLayout( new GridBagLayout() );
        gbc = new GridBagConstraints( 0, GridBagConstraints.RELATIVE,
                                      1, 1, 1, 1,
                                      GridBagConstraints.NORTH,
                                      GridBagConstraints.HORIZONTAL,
                                      new Insets( 0, 0, 0, 0 ), 0, 0 );

        // Add control for selecting the constant parameter
        add( constantParamControls(), gbc );

        // Add controls for the number and type of molecules to put in the box
        add( particleControlsPanel, gbc );

        // Add miscellaneous controls (gravity, particle interactions, etc.
        this.add( miscPanel, gbc );

        // Add the measurement tools and options panel
        this.add( new ToolPanel( module ), gbc );

        // Reset button
        JButton resetBtn = new JButton( IdealGasResources.getString( "IdealGasControlPanel.Reset" ) );
        
        // BH Java fix #17 WindowsLookAndFeel has a "feature" that it cannot paint the
        // background of a button properly, and so the color comes out as an outline only. 
        // See http://stackoverflow.com/questions/15935744/changing-the-background-of-jbutton 
        // See also my note in PhetApplicationLauncher.
        // Note the difference with the Mac version shown in https://phet.colorado.edu/publications/archive/Phet%20Interview%20Paper.htm
        // and https://phet.colorado.edu/publications/archive/Phet%20Interview%20Paper_files/image002.gif
        // where we see a properly filled Reset button.
        
        resetBtn.setBackground( new Color( 180, 255, 180 ) );
        /**	
         * Windows XPStyle issue with painting buttons
         * 
         * @j2sIgnore
         */
        {
          resetBtn.setContentAreaFilled(false); // BH Java Fix #17
          resetBtn.setOpaque(true); // BH Java Fix #17
        }
        resetBtn.addActionListener( new ActionListener() {
            @Override
						public void actionPerformed( ActionEvent e ) {
                module.reset();
            }
        } );
        GridBagConstraints resetGbc = (GridBagConstraints) gbc.clone();
        resetGbc.fill = GridBagConstraints.NONE;
        this.add( resetBtn, resetGbc );

        Border border = BorderFactory.createEtchedBorder();
        this.setBorder( border );
    }

    /**
     * Creates the panel that holds controls for the particles in the box
     */
    private void makeParticlesControls() {
        particleControlsPanel = new JPanel( new GridBagLayout() );

        particleControlsGbc = new GridBagConstraints( 0, GridBagConstraints.RELATIVE,
                                                      1, 1, 1, 1,
                                                      GridBagConstraints.CENTER,
                                                      GridBagConstraints.HORIZONTAL,
                                                      new Insets( 0, 0, 0, 0 ), 0, 0 );

        // Add controls for the number and type of molecules to put in the box
        speciesButtonPanel = new PumpControlPanel( module, module.getPump(), module.getSpeciesNames() );
        speciesButtonPanel.setBorder( new TitledBorder( IdealGasResources.getString( "IdealGasControlPanel.Gas_In_Chamber" ) ) );
        particleControlsPanel.add( speciesButtonPanel, particleControlsGbc );
    }

    public void resetSpeciesControls() {
        speciesButtonPanel.reset();
    }

    /**
     * Creates the panel that contains controls for things that don't appear as objects on the screen
     */
    private void makeMiscControls() {
        miscPanel = new JPanel( new GridBagLayout() );
        GridBagConstraints localGbc = new GridBagConstraints( 0, GridBagConstraints.RELATIVE,
                                                              1, 1, 1, 1,
                                                              GridBagConstraints.CENTER,
                                                              GridBagConstraints.HORIZONTAL,
                                                              new Insets( 0, 0, 0, 0 ), 0, 0 );
        JPanel gravityControls = gravityControls();
        miscPanel.add( gravityControls, localGbc );
    }

    /**
     * Returns a panel with selections for whether volume or pressure is to be held constant
     */
    private JPanel constantParamControls() {
        JPanel constantParamButtonPanel = new JPanel( new GridBagLayout() );
        final JRadioButton constantVolumeRB = new JRadioButton( IdealGasResources.getString( "Common.Volume" ) );
        final JRadioButton constantPressureRB = new JRadioButton( IdealGasResources.getString( "Common.Pressure" ) );
        final JRadioButton constantTempRB = new JRadioButton( IdealGasResources.getString( "Common.Temperature" ) );
        idealGasModel.constantTempRB = constantTempRB; // BH new feature -- settable temperature
        final JRadioButton noneRB = new JRadioButton( IdealGasResources.getString( "Common.None" ) );
        final ButtonGroup constantParameterGroup = new ButtonGroup();
        constantParameterGroup.add( constantVolumeRB );
        constantParameterGroup.add( constantPressureRB );
        constantParameterGroup.add( constantTempRB );
        constantParameterGroup.add( noneRB );

        GridBagConstraints localGbc = new GridBagConstraints( 0, 0,
                                                              1, 1, 1, 1,
                                                              GridBagConstraints.WEST, GridBagConstraints.NONE,
                                                              new Insets( 0, 0, 0, 0 ), 0, 0 );
        localGbc.gridx = 0;
        localGbc.gridy = 0;
        constantParamButtonPanel.add( constantVolumeRB, localGbc );
        localGbc.gridx = 1;
        localGbc.gridy = 0;
        constantParamButtonPanel.add( constantPressureRB, localGbc );
        localGbc.gridx = 0;
        localGbc.gridy = 1;
        constantParamButtonPanel.add( constantTempRB, localGbc );
        localGbc.gridx = 1;
        localGbc.gridy = 1;
        constantParamButtonPanel.add( noneRB, localGbc );

        JPanel container = new JPanel( new GridBagLayout() );
        localGbc.anchor = GridBagConstraints.CENTER;
        container.add( constantParamButtonPanel, localGbc );
        container.setBorder( new TitledBorder( IdealGasResources.getString( "IdealGasControlPanel.Constant_Parameter" ) ) );

        constantVolumeRB.addActionListener( new ActionListener() {
            @Override
						public void actionPerformed( ActionEvent e ) {
                idealGasModel.setConstantProperty( IdealGasModel.CONSTANT_VOLUME );
            }
        } );
        constantPressureRB.addActionListener( new ActionListener() {
            @Override
						public void actionPerformed( ActionEvent e ) {
                idealGasModel.setConstantProperty( IdealGasModel.CONSTANT_PRESSURE );
            }
        } );
        constantTempRB.addActionListener( new ActionListener() {
            @Override
						public void actionPerformed( ActionEvent e ) {
                idealGasModel.setConstantProperty( IdealGasModel.CONSTANT_TEMPERATURE );
            }
        } );
        noneRB.addActionListener( new ActionListener() {
            @Override
						public void actionPerformed( ActionEvent e ) {
                idealGasModel.setConstantProperty( IdealGasModel.CONSTANT_NONE );
            }
        } );
        noneRB.setSelected( true );
        return container;
    }

    /**
     * Create a panel with controls for gravity and add it to the IdealGasControlPanel
     */
    private JPanel gravityControls() {

        JPanel gravityControlPanel = new JPanel( new GridBagLayout() );
        GridBagConstraints gbc = new GridBagConstraints( GridBagConstraints.RELATIVE, 0, 1, 1, 1, 1,
                                                         GridBagConstraints.CENTER,
                                                         GridBagConstraints.NONE,
                                                         new Insets( 0, 0, 0, 0 ), 0, 0 );

        gravitySlider = new JSlider( JSlider.HORIZONTAL, 0, IdealGasConfig.MAX_GRAVITY, 0 );
        gravitySlider.setPreferredSize( new Dimension( 150, 50 ) );
        gravitySlider.setPaintTicks( true );
        gravitySlider.setMajorTickSpacing( 10 );
        gravitySlider.setMinorTickSpacing( 5 );
        Hashtable<Integer, JLabel> labelTable = new Hashtable<Integer, JLabel>();
        labelTable.put( new Integer( 0 ), new JLabel( IdealGasResources.getString( "Common.0" ) ) );
        labelTable.put( new Integer( IdealGasConfig.MAX_GRAVITY ), new JLabel( IdealGasResources.getString( "Common.Lots" ) ) );
        gravitySlider.setLabelTable( labelTable );
        gravitySlider.setPaintLabels( true );
        gravityControlPanel.add( gravitySlider, gbc );
        gravitySlider.addChangeListener( new ChangeListener() {
            @Override
						public void stateChanged( ChangeEvent event ) {
                module.setGravity( gravitySlider.getValue() );
            }
        } );

        // Add a readout for the value of gravity
// BH never added to the panel
//        JTextField gravityTF = new JTextField( 2 );
//        gravityTF.setEditable( false );
//        gravityTF.setHorizontalAlignment( JTextField.RIGHT );
//        gravityFormat.setMaximumFractionDigits( 2 );
//        gravityFormat.setMinimumFractionDigits( 2 );
//        gravityTF.setText( gravityFormat.format( 0 ) );

        Border gravityBorder = new TitledBorder( IdealGasResources.getString( "Common.Gravity" ) );
        gravityControlPanel.setBorder( gravityBorder );
        return gravityControlPanel;
    }

    public void setGravity( double amt ) {
        this.gravitySlider.setValue( (int) amt );
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

    //-----------------------------------------------------------------
    // Event handling
    //----------------------------------------------------------------
    @Override
		public void gravityChanged( Gravity.ChangeEvent event ) {
        gravitySlider.setValue( (int) event.getGravity().getAmt() );
    }
}


