// Copyright 2002-2012, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: olsonj $
 * Revision : $Revision: 66113 $
 * Date modified : $Date: 2012-07-21 04:27:33 -0500 (Sat, 21 Jul 2012) $
 */
package edu.colorado.phet.idealgas.controller;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Rectangle;
import java.awt.RenderingHints;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.geom.Point2D;
import java.awt.geom.Rectangle2D;

import javax.swing.JButton;
import javax.swing.JDialog;

import edu.colorado.phet.common.phetcommon.application.PhetApplicationConfig;
import edu.colorado.phet.common.phetcommon.math.vector.MutableVector2D;
import edu.colorado.phet.common.phetcommon.view.ControlPanel;
import edu.colorado.phet.common.phetcommon.view.util.DoubleGeneralPath;
import edu.colorado.phet.common.phetcommon.view.util.RectangleUtils;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetGraphic;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetShapeGraphic;
import edu.colorado.phet.idealgas.IdealGasConfig;
import edu.colorado.phet.idealgas.IdealGasResources;
import edu.colorado.phet.idealgas.collision.CollidableBody;
import edu.colorado.phet.idealgas.collision.SphereWallExpert;
import edu.colorado.phet.idealgas.collision.VerticalBarrier;
import edu.colorado.phet.idealgas.collision.Wall;
import edu.colorado.phet.idealgas.controller.command.PumpMoleculeCmd;
import edu.colorado.phet.idealgas.instrumentation.Thermometer;
import edu.colorado.phet.idealgas.model.Box2D;
import edu.colorado.phet.idealgas.model.GasMolecule;
import edu.colorado.phet.idealgas.model.HeavySpecies;
import edu.colorado.phet.idealgas.model.IdealGasClock;
import edu.colorado.phet.idealgas.model.IdealGasModel;
import edu.colorado.phet.idealgas.model.PChemModel;
import edu.colorado.phet.idealgas.model.Pump;
import edu.colorado.phet.idealgas.view.GraduatedWallGraphic;
import edu.colorado.phet.idealgas.view.HeavySpeciesGraphic;
import edu.colorado.phet.idealgas.view.LightSpeciesGraphic;
import edu.colorado.phet.idealgas.view.WallGraphic;
import edu.colorado.phet.idealgas.view.monitors.EnergyHistogramDialog;
import edu.colorado.phet.idealgas.view.monitors.SpeciesMonitorDialog;

/**
 * MovableWallsModule
 * <p/>
 * Has a center vertical wall whose height is adjustable, and vertically movable floors
 * on either side of it. The module is used to model revisible reactions.
 *
 * @author Ron LeMaster
 * @version $Revision: 66113 $
 */
public class MovableWallsModule extends AdvancedModule implements PChemModel.Listener {

    //----------------------------------------------------------------
    // Class<?> fields and methods
    //----------------------------------------------------------------

    private static double s_verticalWallLayer = 1000;

    //----------------------------------------------------------------
    // Instance fields and methods
    //----------------------------------------------------------------

    private Wall leftFloor;
    private Wall rightFloor;
    private int wallThickness = (int) GasMolecule.s_radius * 8;
    private PhetShapeGraphic energyCurveGraphic;
    private Pump reactantsPump;
    private Pump productsPump;
    
    private double[] floorLevels; // SwingJS Java fix #20.

		private double minX, maxX, minY, maxY;


    /**
     * @param clock
     * @param config 
     */
    public MovableWallsModule( final IdealGasClock clock, PhetApplicationConfig config ) {
        super( clock, "<html><center>Potential Energy<br>Surface</center></html>", new PChemModel( clock.getDt() ), config );

        //----------------------------------------------------------------
        // Model
        //----------------------------------------------------------------

        // Create a pump for each side of the box
        reactantsPump = new Pump( this, getPumpingEnergyStrategy(), CollidableBody.TYPE_HEAVY_SPECIES );
        reactantsPump.setDispersionAngle( 0, Math.PI * 2 );
        productsPump = new Pump( this, getPumpingEnergyStrategy(), CollidableBody.TYPE_HEAVY_SPECIES );
        productsPump.setDispersionAngle( 0, Math.PI * 2 );

        PChemModel pchemModel = (PChemModel) getModel();
        // BH: unfinished business. I gave up on this sim due to physics issues with "gravity"
        //pchemModel.setFloorLevels(floorLevels = new double[2]);
        
        // Create the movable floors and vertical wall
        createWalls();

        // Add a collision expert for the walls and particles
        getIdealGasModel().addCollisionExpert( new SphereWallExpert( getIdealGasModel() ) );

        // Hook the model up to the vertical wall so it will know when it has moved

        pchemModel.setVerticalWall( verticalWall );
        pchemModel.addListener( this );
        

        // Set the gravity
        getIdealGasModel().getGravity().setAmt( IdealGasConfig.MAX_GRAVITY / 2 );

        //----------------------------------------------------------------
        // Controls. This must be done after the model is set up
        //----------------------------------------------------------------

        ControlPanel controlPanel = new ControlPanel( this );
        setControlPanel( controlPanel );
        controlPanel.add( new AdvancedIdealGasControlPanel( this,
                                                            IdealGasResources.getString( "AdvancedModule.Particle_Type_A" ),
                                                            IdealGasResources.getString( "AdvancedModule.Particle_Type_B" ) ) );

        //----------------------------------------------------------------
        // View
        //----------------------------------------------------------------

        createCurve();
        createCurveAdjuster();

        // Set the time units on the stopwatch
        getStopwatchPanel().setTimeUnits( IdealGasResources.getString( "MovableWallsModule.StopwatchTimeUnits" ) );

        // Remove the Wiggle-me
        getApparatusPanel().removeGraphic( wiggleMeGraphic );

        // Remove the pump graphic
        removePumpGraphic();

        // Remove the mannequin graphic and the box door
        getApparatusPanel().removeGraphic( getPusher() );
        getApparatusPanel().removeGraphic( getBoxDoorGraphic() );

        // Add counters for the number of particles on either side of the vertical wall
        addParticleCounters( IdealGasResources.getString( "AdvancedModule.Particle_Type_A" ),
                             IdealGasResources.getString( "AdvancedModule.Particle_Type_B" ) );

        JButton testButton = new JButton( "Test" );
//        getControlPanel().add( testButton);
        testButton.addActionListener( new ActionListener() {
            @Override
						public void actionPerformed( ActionEvent e ) {
                HeavySpecies newMolecule = null;
                newMolecule = new HeavySpecies( new Point2D.Double( rightFloor.getBoundsNoCopy().getMinX() + 95,
                                                                    rightFloor.getBoundsNoCopy().getMinY() - 105 ),
                                                new MutableVector2D( -200, 200 ),
                                                new MutableVector2D() );
                new PumpMoleculeCmd( getIdealGasModel(), newMolecule, MovableWallsModule.this ).doIt();

            }
        } );

        JButton backupButton = new JButton( "Backup" );
//        getControlPanel().add( backupButton );
        backupButton.addActionListener( new ActionListener() {
            @Override
						public void actionPerformed( ActionEvent e ) {
                ( (IdealGasModel) getModel() ).stepInTime( -clock.getDt() );
            }
        } );
    }

    @Override
		public JDialog setHistogramDlgEnabled( boolean histogramDlgEnabled ) {
        EnergyHistogramDialog dlg = (EnergyHistogramDialog) super.setHistogramDlgEnabled( histogramDlgEnabled );
        dlg.setSpeedDetailsLegends( new String[] { "Speed: A", "Speed: B" },
                                    new Color[] { COLOR_A, COLOR_B } );
        return dlg;
    }

    @Override
		public JDialog setSpeciesMonitorDlgEnabled( boolean isEnabled ) {
        SpeciesMonitorDialog dlg = (SpeciesMonitorDialog) super.setSpeciesMonitorDlgEnabled( isEnabled );
        dlg.setSpeciesPanelTitles( new String[] { "A", "B" } );
        return dlg;
    }

    /**
     * Listeners that will cause the curve to be recomputed when a wall moves
     */
    private void createCurveAdjuster() {
        Wall.ChangeListener listener = new Wall.ChangeListener() {
            @Override
						public void wallChanged( Wall.ChangeEvent event ) {
                getApparatusPanel().removeGraphic( energyCurveGraphic );
                createCurve();
            }
        };
        verticalWall.addChangeListener( listener );
        leftFloor.addChangeListener( listener );
        rightFloor.addChangeListener( listener );
    }

    /**
     * Make the curve that covers the walls
     * <pre>
     *                       p5
     *                     /----\
     *                     |    |
     *                     |    |
     *    p1               |    |
     *     |--------------/     \----------| p10
     *     |             p2      p9        |
     *     |                               |
     * p12 |-------------------------------| p11
     * </pre>
     */
    private void createCurve() {
        DoubleGeneralPath energyCurve = new DoubleGeneralPath();
        Rectangle2D leftFloorBounds = leftFloor.getBoundsNoCopy();
        Rectangle2D rightFloorBounds = rightFloor.getBoundsNoCopy();
        Rectangle2D verticalWallBounds = verticalWall.getBoundsNoCopy();
        //Rectangle2D bounds = getBox().getBoundsInternalNoCopy();
        double filletRadius = verticalWallBounds.getWidth() / 2;

        // Create path points (p<n>) and control points (c<n>)
        Point2D p1 = new Point2D.Double( leftFloorBounds.getMinX(), leftFloorBounds.getMinY() );
        Point2D p2 = new Point2D.Double( leftFloorBounds.getMaxX() - filletRadius, leftFloorBounds.getMinY() );
        Point2D p5 = new Point2D.Double( verticalWallBounds.getMinX() + verticalWallBounds.getWidth() / 2, verticalWallBounds.getMinY() );
        double dx = p5.getX() - p2.getX();
        Point2D c5A = new Point2D.Double( p2.getX() + dx * 3 / 4, p2.getY() );
        Point2D c5B = new Point2D.Double( p5.getX() - dx / 2, p5.getY() );
        //Point2D c5 = new Point2D.Double( verticalWallBounds.getMinX(), verticalWallBounds.getMinY() );
        Point2D p9 = new Point2D.Double( rightFloorBounds.getMinX() + filletRadius, rightFloorBounds.getMinY() );
        Point2D c9A = new Point2D.Double( p5.getX() + dx / 2, p5.getY() );
        Point2D c9B = new Point2D.Double( p9.getX() - dx * 3 / 4, p9.getY() );
        Point2D p10 = new Point2D.Double( rightFloorBounds.getMaxX(), rightFloorBounds.getMinY() );
        //Point2D p11 = new Point2D.Double( bounds.getMaxX(), bounds.getMaxY() );
        //Point2D p12 = new Point2D.Double( bounds.getMinX(), bounds.getMaxY() );

        energyCurve.moveTo( p1 );
        energyCurve.lineTo( p2 );
        energyCurve.curveTo( c5A.getX(), c5A.getY(), c5B.getX(), c5B.getY(), p5.getX(), p5.getY() );
        energyCurve.curveTo( c9A.getX(), c9A.getY(), c9B.getX(), c9B.getY(), p9.getX(), p9.getY() );
        energyCurve.lineTo( p10 );

        Color borderColor = Color.cyan;
        //Color fill = new Color( 255, 255, 255, 160 );
        energyCurveGraphic = new PhetShapeGraphic( getApparatusPanel(), energyCurve.getGeneralPath(),
                                                   new BasicStroke( 2f ), borderColor );
        energyCurveGraphic.setRenderingHints( new RenderingHints( RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON ) );
        energyCurveGraphic.setIgnoreMouse( true );
        getApparatusPanel().addGraphic( energyCurveGraphic, s_verticalWallLayer + 10 );
    }

    /**
     * Sets the size of the box
     */
    private void setBoxSize() {
    	getBox().setBounds(minX, minY, maxX, maxY);
    }

    /**
     *
     */
    private void createWalls() {

        Box2D box = getBox();

        // Make the box bigger than the default size
        double dx = box.getMinX() / 2;
        double dy = box.getMinY() / 3;
        minX = box.getMinX() - dx;
        maxX = box.getMaxX() + dx;
        minY = box.getMinY() - dy;
        maxY = box.getMaxY();
        setBoxSize();

        Thermometer thermometer = getThermometer();
        thermometer.setLocation2( (int) ( box.getMinX() + box.getWidth() / 2 ), thermometer.getY() );

        // Create the lower vertical wall
        double wallHeight = 125;
        double topOfWallY = box.getCorner2Y() - wallHeight;
        verticalWall = new VerticalBarrier( new Rectangle2D.Double( box.getCorner1X() + box.getWidth() / 2 - wallThickness / 2,
                                                                    topOfWallY,
                                                                    wallThickness, wallHeight ),
                                            box.getBoundsInternal() );
        verticalWall.setMinimumWidth( wallThickness );
        verticalWall.setMovementBounds( new Rectangle2D.Double( box.getCorner1X() + wallThickness,
                                                                box.getCorner1Y(),
                                                                box.getWidth() - 2 * wallThickness,
                                                                box.getHeight() ) );
        WallGraphic verticalWallGraphic = new GraduatedWallGraphic( verticalWall, getApparatusPanel(),
                                                                    Color.gray, Color.black,
                                                                    WallGraphic.NONE );
        // Only the top edge of the vertical call should be movable
        verticalWallGraphic.setResizableEast( false );
        verticalWallGraphic.setResizableWest( false );
        verticalWallGraphic.setResizableSouth( false );
        verticalWallGraphic.setMovable( false );
        verticalWallGraphic.setIsResizable( true );
        verticalWall.addChangeListener( new VerticalWallChangeListener() );

        // Use an invisible paint for the floors
        //Color invisiblePaint = new Color( 0, 0, 0, 0 );

        // Create the left movable floor
        leftFloor = new Wall( new Rectangle2D.Double( box.getCorner1X(), box.getCorner2Y() - 75,
                                                      verticalWall.getBoundsNoCopy().getMinX() - box.getCorner1X(),
                                                      wallThickness ),
                              box.getBoundsInternal(), true );
        // Add a listener that will make the left floor stay attached to the left wall of the box
        getBox().addChangeListener( new BoxChangeListener() );
        WallGraphic leftFloorGraphic = new WallGraphic( leftFloor, getApparatusPanel(),
                                                        Color.gray, Color.black,
                                                        WallGraphic.NORTH_SOUTH );
        leftFloorGraphic.setMovable( true );
        leftFloorGraphic.setResizableEast( false );
        leftFloorGraphic.setResizableWest( false );
        leftFloorGraphic.setResizableNorth( false );
        leftFloorGraphic.setResizableSouth( false );
        leftFloorGraphic.setWallHighlightedByMouse( false );
        getModel().addModelElement( leftFloor );
        addGraphic( leftFloorGraphic, s_verticalWallLayer - 1 );

        // Create the right movable floor
        rightFloor = new Wall( new Rectangle2D.Double( verticalWall.getBoundsNoCopy().getMaxX(), box.getCorner2Y() - 40,
                                                       box.getCorner2X() - verticalWall.getBoundsNoCopy().getMaxX(),
                                                       wallThickness ), box.getBoundsInternal(), true );
        WallGraphic rightFloorGraphic = new WallGraphic( rightFloor, getApparatusPanel(),
                                                         Color.gray, Color.black,
                                                         WallGraphic.NORTH_SOUTH );
        rightFloorGraphic.setMovable( true );
        rightFloorGraphic.setResizableEast( false );
        rightFloorGraphic.setResizableWest( false );
        rightFloorGraphic.setResizableNorth( false );
        rightFloorGraphic.setResizableSouth( false );
        rightFloorGraphic.setWallHighlightedByMouse( false );
        getModel().addModelElement( rightFloor );
        addGraphic( rightFloorGraphic, s_verticalWallLayer - 1 );

        // Note that we have to add the vertical wall last. This overcomes a subtle problem in the sequencing of
        // collision detection that is virtually intractable otherewise. Trust me.
        getModel().addModelElement( verticalWall );
        addGraphic( verticalWallGraphic, s_verticalWallLayer );

        // Add a listener to the two floors that will keep the top of the vertical wall from getting lower than
        // the tops of the floors.
        rightFloor.addChangeListener( new VerticalWallLimitSetter() );
        leftFloor.addChangeListener( new VerticalWallLimitSetter() );

        // Set the minimum height of the vertical wall. It should not be able to get below
        // the top of either of the floors
        double minHeight = Math.max( getBox().getMaxY() - leftFloor.getBoundsNoCopy().getMinY(),
                                     getBox().getMaxY() - rightFloor.getBoundsNoCopy().getMinY() );
        verticalWall.setMinHeight( minHeight );

        // Set the region for the walls
        setWallBounds();
    }

    /**
     * BH adding cover patch for thermometer
     */
    @Override
		protected void addCoverPatches() {
      // BH  thermometer cover
      addGraphic(new PhetShapeGraphic(getApparatusPanel(),
      		new Rectangle((int) getBox().getMaxX() - 31, (int) getBox().getMinY() * 2/3 - 6, 13, 6), boxColor), 11);

		}

    
	/**
	 * Sets the region of the various walls and the region of their movement based
	 * on the region of the vertical wall
	 */
	private void setWallBounds() {
		Rectangle2D internalBounds = getBox().getBoundsInternalNoCopy();
		Rectangle2D verticalWallBounds = verticalWall.getBoundsNoCopy();
		
		
		Rectangle2D.Double bounds = leftFloor.getBoundsNoCopy();
		leftFloor.setBounds(RectangleUtils.tempRect2D(internalBounds.getMinX(),
				bounds.getMinY(), verticalWallBounds.getMinX() - internalBounds.getMinX(),
				bounds.getHeight()));
		floorLevels[0] = bounds.getMinY();
		

		bounds = rightFloor.getBoundsNoCopy();
		rightFloor.setBounds(RectangleUtils.tempRect2D(
				verticalWallBounds.getMaxX(), bounds.getMinY(), internalBounds.getMaxX()
						- verticalWallBounds.getMaxX(), bounds.getHeight()));
		floorLevels[1] = bounds.getMinY();
		
		leftFloor.setMovementBounds(new Rectangle2D.Double(internalBounds.getMinX(),
				verticalWallBounds.getMinY(),
				verticalWallBounds.getMinX() - internalBounds.getMinX(), internalBounds.getMaxY()
						- verticalWallBounds.getMinY()));
		rightFloor.setMovementBounds(new Rectangle2D.Double(
				verticalWallBounds.getMaxX(), verticalWallBounds.getMinY(),
				internalBounds.getMaxX() - verticalWallBounds.getMaxX(), internalBounds.getMaxY()
						- verticalWallBounds.getMinY()));
	}

    //----------------------------------------------------------------
    // Reset
    //----------------------------------------------------------------

    @Override
		public void reset() {
        super.reset();
        setBoxSize();
    }

    //----------------------------------------------------------------
    // Model manipulation
    //----------------------------------------------------------------

    private Point2D.Double ptemp = new Point2D.Double();
    @Override
		public void pumpGasMolecules( int numMolecules, Class<?> species ) {
        Wall w = (species == HeavySpecies.class ? leftFloor : rightFloor);
        Rectangle2D.Double bounds = w.getBoundsNoCopy();
        ptemp.x = bounds.x  + bounds.width / 2;
        ptemp.y = bounds.y - 15;
        reactantsPump.pump(numMolecules, species, ptemp);
    }

    //----------------------------------------------------------------
    // Implementation of abstract methods
    //----------------------------------------------------------------
    @Override
		public Pump[] getPumps() {
        return new Pump[] { getPump(), reactantsPump, productsPump };
    }

    //-----------------------------------------------------------------
    // Event handling
    //-----------------------------------------------------------------

    private class VerticalWallChangeListener implements Wall.ChangeListener {
        @Override
				public void wallChanged( Wall.ChangeEvent event ) {
            setWallBounds();
            setParticleCounterRegions();
        }
    }

    private class VerticalWallLimitSetter implements Wall.ChangeListener {

        public VerticalWallLimitSetter() {
        }

        @Override
				public void wallChanged( Wall.ChangeEvent event ) {
            //double currMinHt = verticalWall.getMinHeight();
            double leftFloorMinY = getBox().getMaxY() - leftFloor.getBoundsNoCopy().getMinY();
            double rightFloorMinY = getBox().getMaxY() - rightFloor.getBoundsNoCopy().getMinY();
            double minHt = Math.max( leftFloorMinY, rightFloorMinY );
            verticalWall.setMinHeight( minHt );
        }
    }

    private class BoxChangeListener implements Box2D.ChangeListener {
    	
    	  private Rectangle2D.Double rTemp = new Rectangle2D.Double();
    	  
        @Override
				public void boundsChanged( Box2D.ChangeEvent event ) {
            Rectangle2D.Double oldBounds = leftFloor.getBoundsNoCopy();
            Box2D box = event.getBox2D();
            leftFloor.setMovementBounds( getBox().getBoundsInternal() );
            rTemp.x = box.getBoundsInternalNoCopy().getMinX();
            rTemp.y =oldBounds.getMinY();
            rTemp.width = oldBounds.getMaxX() - rTemp.x;
            rTemp.height = oldBounds.height;
            leftFloor.setBounds(rTemp); 
        }

        @Override
				public void isVolumeFixedChanged( Box2D.ChangeEvent event ) {
            // noop
        }
    }

	@Override
	public void moleculeCreated(PChemModel.MoleculeCreationEvent event) {
		GasMolecule molecule = event.getMolecule();
		PhetGraphic graphic = ((molecule.type & CollidableBody.TYPE_HEAVY_SPECIES) == CollidableBody.TYPE_HEAVY_SPECIES ? new HeavySpeciesGraphic(
				this.getApparatusPanel(), molecule)
				: (molecule.type & CollidableBody.TYPE_LIGHT_SPECIES) == CollidableBody.TYPE_LIGHT_SPECIES ? new LightSpeciesGraphic(
						this.getApparatusPanel(), molecule) : null);
		if (graphic != null) {
			addGraphic(graphic, IdealGasConfig.MOLECULE_LAYER);
		}
	}
}