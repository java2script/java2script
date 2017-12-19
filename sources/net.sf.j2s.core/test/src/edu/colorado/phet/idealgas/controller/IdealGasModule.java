// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: cmalley $
 * Revision : $Revision: 67678 $
 * Date modified : $Date: 2012-09-05 22:12:23 -0500 (Wed, 05 Sep 2012) $
 */
package edu.colorado.phet.idealgas.controller;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Component;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.RenderingHints;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ComponentAdapter;
import java.awt.event.ComponentEvent;
import java.awt.geom.Point2D;
import java.awt.image.BufferedImage;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.EventListener;
import java.util.EventObject;
import java.util.List;
import java.util.Random;

import javax.swing.JButton;
import javax.swing.JDialog;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.SwingUtilities;
import javax.swing.border.BevelBorder;
import javax.swing.border.Border;
import javax.swing.border.EtchedBorder;
import javax.swing.border.TitledBorder;

import edu.colorado.phet.common.phetcommon.application.PhetApplication;
import edu.colorado.phet.common.phetcommon.application.PhetApplicationConfig;
import edu.colorado.phet.common.phetcommon.util.EventChannel;
import edu.colorado.phet.common.phetcommon.view.ControlPanel;
import edu.colorado.phet.common.phetcommon.view.util.MakeDuotoneImageOp;
import edu.colorado.phet.common.phetgraphics.application.PhetGraphicsModule;
import edu.colorado.phet.common.phetgraphics.view.help.HelpItem;
import edu.colorado.phet.common.phetgraphics.view.phetcomponents.PhetJComponent;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetGraphic;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetImageGraphic;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetShapeGraphic;
import edu.colorado.phet.idealgas.IdealGasConfig;
import edu.colorado.phet.idealgas.IdealGasResources;
import edu.colorado.phet.idealgas.collision.CollidableBody;
import edu.colorado.phet.idealgas.collision.SphereBoxExpert;
import edu.colorado.phet.idealgas.collision.SphereSphereExpert;
import edu.colorado.phet.idealgas.coreadditions.StopwatchPanel;
import edu.colorado.phet.idealgas.instrumentation.Thermometer;
import edu.colorado.phet.idealgas.model.GasMolecule;
import edu.colorado.phet.idealgas.model.Gravity;
import edu.colorado.phet.idealgas.model.IdealGasClock;
import edu.colorado.phet.idealgas.model.IdealGasModel;
import edu.colorado.phet.idealgas.model.PressureSensingBox;
import edu.colorado.phet.idealgas.model.PressureSlice;
import edu.colorado.phet.idealgas.model.Pump;
import edu.colorado.phet.idealgas.view.BaseIdealGasApparatusPanel;
import edu.colorado.phet.idealgas.view.Box2DGraphic;
import edu.colorado.phet.idealgas.view.BoxDoorGraphic;
import edu.colorado.phet.idealgas.view.HeavySpeciesGraphic;
import edu.colorado.phet.idealgas.view.Mannequin;
import edu.colorado.phet.idealgas.view.PumpHandleGraphic;
import edu.colorado.phet.idealgas.view.RulerGraphic;
import edu.colorado.phet.idealgas.view.WiggleMeGraphic;
import edu.colorado.phet.idealgas.view.monitors.CmLines;
import edu.colorado.phet.idealgas.view.monitors.EnergyHistogramDialog;
import edu.colorado.phet.idealgas.view.monitors.PressureDialGauge;
import edu.colorado.phet.idealgas.view.monitors.PressureSliceGraphic;
import edu.colorado.phet.idealgas.view.monitors.SpeciesMonitorDialog;

/**
 *
 */
@SuppressWarnings("deprecation")
public class IdealGasModule extends PhetGraphicsModule {

    //----------------------------------------------------------------
    // Class<?> data, initializers and methods
    //----------------------------------------------------------------

    static private BufferedImage bluePumpImg;
    static private BufferedImage redPumpImg;
    static protected WiggleMeGraphic wiggleMeGraphic;
    static private BufferedImage pumpBaseAndHoseImg;
    static private BufferedImage handleImg;

    //----------------------------------------------------------------
    // Instance data and methods
    //----------------------------------------------------------------

    protected IdealGasModel idealGasModel;
    private PressureSensingBox box;
    private Gravity gravity;
    private Pump pump;
    private CmLines cmLines;

    private PressureSlice pressureSlice;
    private IdealGasClock clock;
    private PressureSliceGraphic pressureSliceGraphic;
    private PhetGraphic rulerGraphic;
    private EnergyHistogramDialog histogramDlg;
    private ArrayList<Component> visibleInstruments = new ArrayList<Component>();
    private JDialog measurementDlg;
    private JDialog speciesMonitorDlg;
    private IdealGasControlPanel idealGasControlPanel;
    private Thermometer thermometer;
    private PhetImageGraphic pumpGraphic;
    private Box2DGraphic boxGraphic;
    private JPanel pressureSlideTimeAveCtrlPane;
    private StopwatchPanel stopwatchPanel;
    private Mannequin pusher;
    private BoxDoorGraphic boxDoorGraphic;
    private PumpHandleGraphic pumpHandleGraphic;
    private PumpSpeciesSelectorPanel pumpSelectorPanel;
    private PhetImageGraphic pumpBaseAndHoseGraphic;
    // Coordinates of origin and opposite corner of box
    private double xOrigin = 132 + IdealGasConfig.X_BASE_OFFSET;
    private double yOrigin = 252 + IdealGasConfig.Y_BASE_OFFSET;
    private double xDiag = 434 + IdealGasConfig.X_BASE_OFFSET;
    private double yDiag = 497 + IdealGasConfig.Y_BASE_OFFSET;
    protected Color boxColor = new Color( 180, 180, 180 );
    //private Random random = new Random();
    private PressureDialGauge pressureGauge;
    private PhetGraphic returnLidGraphic;

		public int startingType = CollidableBody.TYPE_HEAVY_SPECIES; // BH --start [light|heavy]

		
    //-----------------------------------------------------------------
    // Constructors and initialization
    //-----------------------------------------------------------------

    /**
     * @param clock
     */
    public IdealGasModule( IdealGasClock clock, PhetApplicationConfig config ) {
        this( clock, IdealGasResources.getString( "ModuleTitle.IdealGas" ), config );
        this.clock = clock;
    }

    /**
     * @param clock
     * @param name
     */
    public IdealGasModule( IdealGasClock clock, String name, PhetApplicationConfig config) {
        this( clock, name, new IdealGasModel( clock.getDt()), config );
    }

    /**
     * @param clock
     * @param name
     */
    protected IdealGasModule( final IdealGasClock clock, String name, final IdealGasModel model, PhetApplicationConfig config ) {
        super( name, clock );
        this.clock = clock;

        // set initial type   // BH
        
        startingType = ("light".equalsIgnoreCase(config.getOptionArg("--startingType")) ? CollidableBody.TYPE_LIGHT_SPECIES : CollidableBody.TYPE_HEAVY_SPECIES);
        Color color2 = new Color(90, 90, 250);
        Color color1 = ("true".equalsIgnoreCase(config.getOptionArg("--showOne")) 
        		? new Color(0, 90, 0) : color2);
         HeavySpeciesGraphic.setColor2(color1, color2, null);
        	
        // Create the model
        idealGasModel = model;
        setModel( idealGasModel );

        // Add collision experts
        idealGasModel.addCollisionExpert( new SphereSphereExpert( idealGasModel, clock.getDt() ) );
        idealGasModel.addCollisionExpert( new SphereBoxExpert( idealGasModel ) );

        // Create the box and its graphic
        createBoxAndGraphic( clock );

        // Create a listener that will keep the model bounds set correctly
        getApparatusPanel().addComponentListener( new ComponentAdapter() {
            @Override
						public void componentResized( ComponentEvent e ) {
                idealGasModel.setModelBounds();
            }
        } );

        // Make sure the apparatus panel has a border
        getApparatusPanel().setDisplayBorder( true );

        // Create the pressure gauge and thermometer
        createGauges( clock );

        // Create the pump
        createPumpAndGraphic(startingType);

        // Set up gravity. Note that this must be done after the box and pump are created
        gravity = new Gravity( idealGasModel );
        setGravity( 0 );
        idealGasModel.addModelElement( gravity );

        // Add the animated mannequin
        pusher = new Mannequin( getApparatusPanel(), idealGasModel, box, boxGraphic );
        addGraphic( pusher, 10 );

        // Set up the control panel
        idealGasControlPanel = new IdealGasControlPanel( this );
        ControlPanel controlPanel = new ControlPanel( this );
        controlPanel.addControl( idealGasControlPanel );
        setControlPanel( controlPanel );

        // Place a slider to control the stove
        createApparatusSwingControls();

        createReturnLidButton();

        // Add help items
        addHelp();
    }

    /**
     * Utility method
     *
     * @return the model
     */
    protected IdealGasModel getIdealGasModel() {
        return (IdealGasModel) getModel();
    }

    /**
     * Specifies the names of the particles used in the simulation. Can be overridden by other modules.
     *
     * @return names of species
     */
    protected String[] getSpeciesNames() {
        return new String[] { IdealGasResources.getString( "Common.Heavy_Species" ), IdealGasResources.getString( "Common.Light_Species" ) };
    }

    /**
     * Creates the pressure gauge and thermometer
     *
     * @param clock
     */
    private void createGauges( IdealGasClock clock ) {
        // Add the pressure gauge
        PressureSlice gaugeSlice = new PressureSlice( box, idealGasModel, clock );
        gaugeSlice.setTimeAveragingWindow( 2500 * ( clock.getDt() / clock.getDelay() ) );
        gaugeSlice.setUpdateContinuously( true );
        gaugeSlice.setY( box.getMinY() + 50 );
        box.setGaugeSlice( gaugeSlice );
        idealGasModel.addModelElement( gaugeSlice );
        pressureGauge = new PressureDialGauge( box, getApparatusPanel(),
                                               new Point( (int) box.getMaxX(),
                                                          (int) gaugeSlice.getY() ) );
        addGraphic( pressureGauge, IdealGasConfig.MOLECULE_LAYER );

        // Add the thermometer
        double thermometerHeight = 100;
        Point2D.Double thermometerLoc = new Point2D.Double( box.getMaxX() - 30, box.getMinY() - thermometerHeight + 10 ); // BH + 10
        thermometer = new IdealGasThermometer( getApparatusPanel(),
                                               idealGasModel, thermometerLoc,
                                               thermometerHeight, 10, true, 0, 1000E3 );
        addGraphic( thermometer, IdealGasConfig.MOLECULE_LAYER + .1 );
    }

    /**
     * @param clock
     */
    private void createBoxAndGraphic( IdealGasClock clock ) {
        box = new PressureSensingBox( new Point2D.Double( xOrigin, yOrigin ),
                                      new Point2D.Double( xDiag, yDiag ), idealGasModel, clock );
        idealGasModel.addBox( box );
        setApparatusPanel( new BaseIdealGasApparatusPanel( this, clock, box ) );

        // Set up the box graphic
        boxGraphic = new Box2DGraphic( getApparatusPanel(), box, boxColor );
        addGraphic( boxGraphic, 10 );

        // Set up the door for the box
        boxDoorGraphic = new BoxDoorGraphic( getApparatusPanel(),
                                             IdealGasConfig.X_BASE_OFFSET + 230, IdealGasConfig.Y_BASE_OFFSET + 22,
                                             IdealGasConfig.X_BASE_OFFSET + 150, IdealGasConfig.Y_BASE_OFFSET + 220,
                                             IdealGasConfig.X_BASE_OFFSET + 230, IdealGasConfig.Y_BASE_OFFSET + 220,
                                             box,
                                             boxColor,
                                             this );
        addGraphic( boxDoorGraphic, 11 );

        addCoverPatches();

    }

    /**
     * BH adding cover patches for thermometer and pressure gauge
     */
    protected void addCoverPatches() {
      // BH  thermometer cover
      addGraphic(new PhetShapeGraphic(getApparatusPanel(),
      		new Rectangle((int) box.getMaxX() - 31, (int) yOrigin - 6, 13, 6), boxColor), 11);

      // BH  pressure sensor cover
      addGraphic(new PhetShapeGraphic(getApparatusPanel(),
      		new Rectangle((int) box.getMaxX(), (int) yOrigin + 44, 6, 13), boxColor), 11);

		}

		/**
     *
     */
    private void createApparatusSwingControls() {
        StoveControlPanel scp2 = new StoveControlPanel( this );
        scp2.setLocation2( IdealGasConfig.X_BASE_OFFSET + IdealGasConfig.X_STOVE_OFFSET + 100,
                          IdealGasConfig.Y_BASE_OFFSET + IdealGasConfig.Y_STOVE_OFFSET - 10 );
        getApparatusPanel().addGraphic( scp2 );

        // Add buttons for selecting the species that the pump will produce
        pumpSelectorPanel = new PumpSpeciesSelectorPanel( this );
        pumpSelectorPanel.setLocation2( IdealGasConfig.X_BASE_OFFSET + 630, IdealGasConfig.Y_BASE_OFFSET + 300 );
        pumpSelectorPanel.setLocation2( (int) ( pumpGraphic.getLocationNoCopy().getX() + pumpGraphic.getWidth() - pumpSelectorPanel.getWidth() + 10 ),
                                       (int) ( pumpGraphic.getLocationNoCopy().getY() + pumpGraphic.getHeight() + 32 ) );
        getApparatusPanel().addGraphic( pumpSelectorPanel );
        getApparatusPanel().revalidate();
    }

    /*
     * Creates the "Return Lid" button, see Unfuddle #3167.
     * When the "safe" pressure in the chamber is exceeded, the lid blows off and this button appears.
     * Pressing the button empties the chamber and closes the lid.
     */
    @SuppressWarnings("serial")
		private void createReturnLidButton() {

//    	  final ActionListener resetChamberAction = new ActionListener() {
//          public void actionPerformed( ActionEvent event ) {
//            resetChamber();
//        }};
//  
    	  final ActionListener returnLidAction = new ActionListener() {
          @Override
					public void actionPerformed( ActionEvent event ) {
            returnLid(); // BH Java fix #8: was resetChamber()
        }};
  
        // Swing button
        JButton returnLidButton = new JButton( IdealGasResources.getString( "returnLid" ) ) {{
            addActionListener( returnLidAction );
        }};

        // Integration of Swing with phetgraphics.
        returnLidGraphic = PhetJComponent.newInstance( getApparatusPanel(), returnLidButton );
        returnLidGraphic.setVisible( !box.isPressureSafe() );
        getApparatusPanel().addGraphic( returnLidGraphic );

        // Position the button above the box, and to the left of the hole in the top of the box,
        // taking into account the effects of i18n on the button size.
        returnLidGraphic.setLocation2( IdealGasConfig.X_BASE_OFFSET + 220 - returnLidGraphic.getWidth(),
                                      IdealGasConfig.Y_BASE_OFFSET + 230 - returnLidGraphic.getHeight() );

        // Show the button when pressure change results in the lid being blown off the box.
        box.addChangeListenerPSB( new PressureSensingBox.ChangeListener() {
            @Override
						public void stateChanged( PressureSensingBox.ChangeEvent event ) {
                if ( !box.isPressureSafe() ) {
                    returnLidGraphic.setVisible( true );
                }
            }
        } );
    }

	/**
     *
     */
	private void createPumpAndGraphic(int startingType) {
		pump = new Pump(this, getPumpingEnergyStrategy(), startingType);

		// Set up the graphics for the pump

		if (bluePumpImg == null) { // BH Java fix #6: cross-talk in tabbed panes of BalloonsAndBouyancy
			handleImg = IdealGasResources.getImage(IdealGasConfig.HANDLE_IMAGE_FILE);
			pumpBaseAndHoseImg = IdealGasResources
					.getImage(IdealGasConfig.PUMP_BASE_IMAGE_FILE);
			final BufferedImage basePumpImg = IdealGasResources
					.getImage(IdealGasConfig.PUMP_IMAGE_FILE);
			bluePumpImg = new BufferedImage(basePumpImg.getRaster().getWidth(),
					basePumpImg.getRaster().getHeight(), BufferedImage.TYPE_INT_ARGB);
			redPumpImg = new BufferedImage(basePumpImg.getRaster().getWidth(),
					basePumpImg.getRaster().getHeight(), BufferedImage.TYPE_INT_ARGB);
			SwingUtilities.invokeLater(new Runnable() {
				@Override
				public void run() {
					new MakeDuotoneImageOp(Color.blue).filter(basePumpImg, bluePumpImg);
					new MakeDuotoneImageOp(Color.red).filter(basePumpImg, redPumpImg);
				}
			});
		}

		PhetImageGraphic handleGraphic = new PhetImageGraphic(getApparatusPanel(),
				handleImg);
		pumpHandleGraphic = new PumpHandleGraphic(getApparatusPanel(), this,
				handleGraphic, IdealGasConfig.X_BASE_OFFSET + 578,
				IdealGasConfig.Y_BASE_OFFSET + 238, IdealGasConfig.X_BASE_OFFSET + 578,
				IdealGasConfig.Y_BASE_OFFSET + 100, IdealGasConfig.X_BASE_OFFSET + 578,
				IdealGasConfig.Y_BASE_OFFSET + 238);

		BufferedImage currentPumpImg = (startingType == CollidableBody.TYPE_HEAVY_SPECIES ? bluePumpImg : redPumpImg); // BH more fun

		this.addGraphic(pumpHandleGraphic, -6);
		pumpBaseAndHoseGraphic = new PhetImageGraphic(getApparatusPanel(),
				pumpBaseAndHoseImg, IdealGasConfig.X_BASE_OFFSET + 436,
				IdealGasConfig.Y_BASE_OFFSET + 258);
		pumpGraphic = new PhetImageGraphic(getApparatusPanel(), currentPumpImg,
				IdealGasConfig.X_BASE_OFFSET + 436, IdealGasConfig.Y_BASE_OFFSET + 258);
		pumpGraphic.setRenderingHints(new RenderingHints(
				RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON));
		this.addGraphic(pumpGraphic, -4);
		this.addGraphic(pumpBaseAndHoseGraphic, -3.5);
	}

    protected void removePumpGraphic() {
        getApparatusPanel().removeGraphic( pumpGraphic );
        getApparatusPanel().removeGraphic( pumpHandleGraphic );
        getApparatusPanel().removeGraphic( pumpSelectorPanel );
        getApparatusPanel().removeGraphic( pumpBaseAndHoseGraphic );
    }

    protected void setPumpSelectorPanelTitle( String title ) {
        pumpSelectorPanel.setTitle( title );
    }

    protected Pump.PumpingEnergyStrategy getPumpingEnergyStrategy() {
        return new Pump.ConstantEnergyStrategy( idealGasModel );
    }

    protected void addHelp() {
        addWallHelp();
        addDoorHelp();
        addThermometerHelp(); // BH new feature - settable thermometer
        addStoveHelp();
    }

    protected void addStoveHelp() {
        HelpItem helpItem3 = new HelpItem( getApparatusPanel(),
                                           IdealGasResources.getString( "help.stove" ),
                                           box.getPosition().getX() + 50, box.getMaxY() + 50 );
        helpItem3.setForegroundColor( IdealGasConfig.HELP_COLOR );
        addHelpItem( helpItem3 );
    }

    protected void addDoorHelp() {
        HelpItem helpItem2 = new HelpItem( getApparatusPanel(),
                                           IdealGasResources.getString( "help.door" ),
                                           box.getPosition().getX() + 100, box.getPosition().getY() - 50 );
        helpItem2.setForegroundColor( IdealGasConfig.HELP_COLOR );
        addHelpItem( helpItem2 );
    }

    protected void addThermometerHelp() { // BH new feature: settable temperature
      HelpItem item = new HelpItem( getApparatusPanel(),
                                         IdealGasResources.getString( "help.thermometer" ),
                                         box.getPosition().getX() + 210, box.getPosition().getY() + 30 );
      item.setForegroundColor( IdealGasConfig.HELP_COLOR );
      addHelpItem( item );
  }

    protected void addWallHelp() {
        HelpItem helpItem1 = new HelpItem( getApparatusPanel(),
                                           IdealGasResources.getString( "help.wall" ),
                                           box.getPosition().getX(), box.getPosition().getY(),
                                           HelpItem.BELOW, HelpItem.LEFT );
        helpItem1.setForegroundColor( IdealGasConfig.HELP_COLOR );
        addHelpItem( helpItem1 );
    }

    public void activate( PhetApplication app ) {
        super.activate();
//        super.activate( app );
        for ( int i = 0; i < visibleInstruments.size(); i++ ) {
            Component component = visibleInstruments.get( i );
            component.setVisible( true );
        }

        // FOR DEBUG. displays the total energy in the system
//        TotalEnergyMonitor tem = new TotalEnergyMonitor( null, idealGasModel );
//        tem.setVisible( true );
    }

    public void deactivate( PhetApplication app ) {
        super.deactivate();
//        super.deactivate( app );
        for ( int i = 0; i < visibleInstruments.size(); i++ ) {
            Component component = visibleInstruments.get( i );
            component.setVisible( false );
        }
    }

    protected IdealGasControlPanel getIdealGasControlPanel() {
        return idealGasControlPanel;
    }

    //-----------------------------------------------------------------
    // Getters
    //-----------------------------------------------------------------
    public int getHeavySpeciesCnt() {
        return idealGasModel.getHeavySpeciesCnt();
    }

    public int getLightSpeciesCnt() {
        return idealGasModel.getLightSpeciesCnt();
    }

    //-----------------------------------------------------------------
    // Setters
    //-----------------------------------------------------------------

    public JDialog setMeasurementDlgVisible( boolean isVisible ) {
        if ( measurementDlg == null ) {
            measurementDlg = new MeasurementDialog( PhetApplication.getInstance().getPhetFrame(), this );
            JFrame frame = PhetApplication.getInstance().getPhetFrame();
            measurementDlg.setLocationRelativeTo( frame );
            measurementDlg.setLocation( (int) ( frame.getLocation().getX() + frame.getWidth() * 3 / 5 ),
                                        (int) frame.getLocation().getY() + 20 );
        }
        measurementDlg.setVisible( isVisible );
        if ( isVisible ) {
            visibleInstruments.add( measurementDlg );
        }
        else {
            visibleInstruments.remove( measurementDlg );
        }
        return measurementDlg;
    }

    public JDialog setSpeciesMonitorDlgEnabled( boolean isEnabled ) {
        if ( speciesMonitorDlg == null ) {
            speciesMonitorDlg = new SpeciesMonitorDialog( PhetApplication.getInstance().getPhetFrame(),
                                                          idealGasModel );
        }
        speciesMonitorDlg.setVisible( isEnabled );
        if ( isEnabled ) {
            visibleInstruments.add( speciesMonitorDlg );
        }
        else {
            visibleInstruments.remove( speciesMonitorDlg );
        }
        return speciesMonitorDlg;
    }

    public void setCurrentSpecies( Class<?> moleculeClass ) {
        pump.setCurrentGasSpecies( moleculeClass );
    }

    public void setCmLinesOn( boolean cmLinesOn ) {
        if ( cmLines == null ) {
            cmLines = new CmLines( getApparatusPanel(), idealGasModel );
        }
        if ( cmLinesOn ) {
            addGraphic( cmLines, IdealGasConfig.MOLECULE_LAYER + 1 );
        }
        else {
            getApparatusPanel().removeGraphic( cmLines );
        }

    }

    /**
     * Sets the amount of heat that is added or removed from the system at each step in time
     *
     * @param value
     */
    public void setStove( int value ) {
        idealGasModel.setHeatSource( value );
        ( (BaseIdealGasApparatusPanel) getApparatusPanel() ).setStove( value );
    }

    /**
     * Sets the value for garvity. Also sets the strategy used to determine what energy will
     * be given to molecules pumped into the box, and the way that the box reports pressure
     *
     * @param value
     */
    public void setGravity( double value ) {
        gravity.setAmt( value );
        if ( value != 0 ) {
            pump.setPumpingEnergyStrategy( new Pump.FixedEnergyStrategy() );
            box.setMultipleSlicesEnabled( false );
        }
        else {
            pump.setPumpingEnergyStrategy( new Pump.ConstantEnergyStrategy( getIdealGasModel() ) );
            box.setMultipleSlicesEnabled( true );
        }
    }

	public void pumpGasMolecules(int numMolecules) {
		getClock().start(); // BH Java fix #9
		pump.pump(numMolecules);
	}

	public void pumpGasMolecules(int numMolecules, Class<?> species) {
		getClock().start(); // BH Java fix #9
		pump.pump(numMolecules, species);
	}

	public void removeGasMolecule(Class<?> species) {
		getClock().start(); // BH Java fix #9
		List<GasMolecule> molecules = idealGasModel.getGasMolecules();
		int n = molecules.size();

		// Randomize which end of the list of bodies we start searching from,
		// just to make sure there is no non-random effect on the temperature
		// of the system. We must also take care to remove the particle from the
		// balloon or the box, depending on the parameter we got
		GasMolecule m = null;
		boolean randomB = new Random().nextBoolean();
		if (randomB) {
			for (int i = 0; i < n; i++) {
				m = molecules.get(i);
				if (species.isInstance(m)) {
					break;
				}
			}
		} else {
			for (int i = molecules.size(); --i >= 0;) {
				m = molecules.get(i);
				if (species.isInstance(m)) {
					break;
				}
			}
		}

		// Remove the molecule from the system. If we are removing it from the
		// balloon, tell the balloon
		if (m != null) {
			idealGasModel.removeModelElement(m);
		}
	}

    //----------------------------------------------------------------
    // Getters and setters
    //----------------------------------------------------------------

    protected PressureSensingBox getBox() {
        return box;
    }

    protected Box2DGraphic getBoxGraphic() {
        return boxGraphic;
    }

    protected BoxDoorGraphic getBoxDoorGraphic() {
        return boxDoorGraphic;
    }

    public Mannequin getPusher() {
        return pusher;
    }

    public Pump getPump() {
        return pump;
    }

    public Thermometer getThermometer() {
        return thermometer;
    }

    /**
     * Provided primarily so different modules can change the units on the
     * stopwatch
     *
     * @return the stopwatch panel
     */
    protected StopwatchPanel getStopwatchPanel() {
        return stopwatchPanel;
    }

    //------------------------------------------------------------------------------------
    // Measurement tools
    //------------------------------------------------------------------------------------

    /**
     * @param pressureSliceEnabled
     */
    public void setPressureSliceEnabled( boolean pressureSliceEnabled ) {

        if ( pressureSlice == null ) {
            pressureSlice = new PressureSlice( getBox(), (IdealGasModel) getModel(), clock );
            pressureSlice.setUpdateContinuously( false );
            pressureSliceGraphic = new PressureSliceGraphic( getApparatusPanel(),
                                                             pressureSlice,
                                                             getBox() );

            // Create a nonmodal dialog with controls for the averaging times of the pressure slice
            DecimalFormat tfFmt = new DecimalFormat( "#.0" );
            final double timeScale = clock.getDt() / clock.getDelay();
            final JTextField aveTimeTF = new JTextField( 3 );
            aveTimeTF.setHorizontalAlignment( JTextField.RIGHT );
            aveTimeTF.setText( tfFmt.format( pressureSlice.getTimeAveragingWindow() / ( 1000 * timeScale ) ) );
            aveTimeTF.addActionListener( new ActionListener() {
                @Override
								public void actionPerformed( ActionEvent e ) {
                    double realAveTime = Double.parseDouble( aveTimeTF.getText() ) * 1000;
                    double simAveTime = realAveTime * timeScale;
                    pressureSlice.setTimeAveragingWindow( simAveTime );
                }
            } );

            JButton setTimeBtn = new JButton( IdealGasResources.getString( "IdealGasControlPanel.SetButton" ) );
            setTimeBtn.addActionListener( new ActionListener() {
                @Override
								public void actionPerformed( ActionEvent e ) {
                    double realAveTime = Double.parseDouble( aveTimeTF.getText() ) * 1000;
                    double simAveTime = realAveTime * timeScale;
                    pressureSlice.setTimeAveragingWindow( simAveTime );
                }
            } );

            JPanel ctrlPane = new JPanel();
            ctrlPane.setLayout( new GridBagLayout() );
            GridBagConstraints gbc = new GridBagConstraints( GridBagConstraints.RELATIVE, 0,
                                                             1, 1, 1, 1,
                                                             GridBagConstraints.CENTER,
                                                             GridBagConstraints.NONE,
                                                             new Insets( 0, 0, 0, 0 ), 0, 0 );
            ctrlPane.add( aveTimeTF, gbc );
            ctrlPane.add( new JLabel( IdealGasResources.getString( "IdealGasModule.StopwatchTimeUnits" ) ), gbc );
            gbc.insets = new Insets( 0, 10, 0, 0 );
            ctrlPane.add( setTimeBtn, gbc );
            Border border = new TitledBorder( new EtchedBorder( BevelBorder.RAISED,
                                                                new Color( 40, 20, 255 ),
                                                                Color.black ),
                                              IdealGasResources.getString( "IdealGasControlPanel.AveTimePanelTitle" ) );
            ctrlPane.setBorder( border );
            Color background = new Color( 240, 230, 255 );
            ctrlPane.setBackground( background );

            pressureSlideTimeAveCtrlPane = new JPanel();
            pressureSlideTimeAveCtrlPane.setOpaque( false );
            pressureSlideTimeAveCtrlPane.add( ctrlPane );
            pressureSlideTimeAveCtrlPane.setBounds( 15,
                                                    15,
                                                    200, 100 );
            getApparatusPanel().add( pressureSlideTimeAveCtrlPane );
        }
        if ( pressureSliceEnabled ) {
            getModel().addModelElement( pressureSlice );
            addGraphic( pressureSliceGraphic, 20 );
            pressureSlideTimeAveCtrlPane.setVisible( true );
            getApparatusPanel().revalidate();
        }
        else {
            getApparatusPanel().removeGraphic( pressureSliceGraphic );
            getModel().removeModelElement( pressureSlice );
            if ( pressureSlideTimeAveCtrlPane != null ) {
                pressureSlideTimeAveCtrlPane.setVisible( false );
            }
        }
    }

    /**
     * @param rulerEnabled
     */
    public void setRulerEnabed( boolean rulerEnabled ) {
        if ( rulerGraphic == null ) {
            rulerGraphic = new RulerGraphic( getApparatusPanel() );
        }
        if ( rulerEnabled ) {
            getApparatusPanel().addGraphic( rulerGraphic, Integer.MAX_VALUE );
        }
        else {
            getApparatusPanel().removeGraphic( rulerGraphic );
        }
        getApparatusPanel().revalidate();
        getApparatusPanel().paintImmediately( 0, 0,
                                              getApparatusPanel().getWidth(),
                                              getApparatusPanel().getHeight() );
    }

    /**
     * Creates and displays a histogram dialog
     *
     * @param histogramDlgEnabled
     * @return the dialog
     */
    public JDialog setHistogramDlgEnabled( boolean histogramDlgEnabled ) {
        if ( histogramDlgEnabled ) {
            visibleInstruments.add( histogramDlg );
            histogramDlg = new EnergyHistogramDialog( PhetApplication.getInstance().getPhetFrame(),
                                                      (IdealGasModel) getModel() );
            histogramDlg.setVisible( true );
        }
        else {
            histogramDlg.setVisible( false );
            histogramDlg = null;
            visibleInstruments.remove( histogramDlg );
        }
        return histogramDlg;
    }

    public void setStopwatchEnabled( boolean stopwatchEnabled ) {
        if ( stopwatchEnabled ) {
            stopwatchPanel = new StopwatchPanel( getModel(), IdealGasResources.getString( "stopwatch.units" ), IdealGasConfig.TIME_SCALE_FACTOR );
            getClockControlPanel().add( stopwatchPanel, BorderLayout.WEST );
            getClockControlPanel().revalidate();
            visibleInstruments.add( stopwatchPanel );
        }
        else {
            getClockControlPanel().remove( stopwatchPanel );
            getClockControlPanel().revalidate();
            visibleInstruments.remove( stopwatchPanel );
        }
    }

    /**
     * Enable/disable the pressure gauge
     */
    public void setPressureGaugeVisible( boolean isVisible ) {
        if ( isVisible ) {
            getApparatusPanel().addGraphic( pressureGauge );
        }
        else {
            getApparatusPanel().removeGraphic( pressureGauge );
        }
    }

    //-----------------------------------------------------
    // Event handling
    //-----------------------------------------------------
    EventChannel resetEventChannel = new EventChannel( ResetListener.class );
    ResetListener resetListenersProxy = (ResetListener) resetEventChannel.getListenerProxy();

    @Override
		public void reset() {
        resetChamber();
        box.setBounds( xOrigin, yOrigin, xDiag, yDiag );
        resetListenersProxy.resetOccurred( new ResetEvent( this ) );
        if ( stopwatchPanel != null ) {
            stopwatchPanel.reset();
        }
    }

    // Resets the chamber (aka "box") so that it contains zero molecules (aka "species") and the lid (aka "door") is closed. See #3167.
    protected void resetChamber() {
        getIdealGasModel().removeAllMolecules();
        idealGasControlPanel.resetSpeciesControls(); // these controls should be observing the model, but they aren't
        box.setOpening( new Point2D.Double[] { new Point2D.Double(), new Point2D.Double() } );
        box.clearData(); // should be observing the model, but doesn't work properly
        boxDoorGraphic.closeDoor();
        returnLidGraphic.setVisible( false );
    }

    
    protected void returnLid() {
    	// BH Java fix #8: was resetChamber()
      box.setOpening( new Point2D.Double[] { new Point2D.Double(), new Point2D.Double() } );
      boxDoorGraphic.closeDoor();
      returnLidGraphic.setVisible( false );
    }

    public void addResetListener( ResetListener listener ) {
        resetEventChannel.addListener( listener );
    }

    public void removeResetListener( ResetListener listener ) {
        resetEventChannel.removeListener( listener );
    }

    public void removeAllResetListeners() {
        resetEventChannel.removeAllListeners();
    }

    public void setCurrentPumpImage( Color color ) {
        if ( color.equals( Color.blue ) ) {
            pumpGraphic.setImage( bluePumpImg );
        }
        if ( color.equals( Color.red ) ) {
            pumpGraphic.setImage( redPumpImg );
        }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Inner classes
    //

    public interface ResetListener extends EventListener {
        void resetOccurred( ResetEvent event );
    }

    @SuppressWarnings("serial")
		public class ResetEvent extends EventObject {
        public ResetEvent( Object source ) {
            super( source );
        }
    }

}
