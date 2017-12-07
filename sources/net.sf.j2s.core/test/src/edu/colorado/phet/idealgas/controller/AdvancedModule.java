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

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Component;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.RenderingHints;
import java.awt.font.FontRenderContext;
import java.awt.geom.Point2D;
import java.awt.geom.Rectangle2D;

import edu.colorado.phet.common.phetcommon.application.PhetApplication;
import edu.colorado.phet.common.phetcommon.application.PhetApplicationConfig;
import edu.colorado.phet.common.phetcommon.util.SimpleObserver;
import edu.colorado.phet.common.phetcommon.view.graphics.Arrow;
import edu.colorado.phet.common.phetcommon.view.util.PhetFont;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.CompositePhetGraphic;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetGraphic;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetShapeGraphic;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetTextGraphic;
import edu.colorado.phet.idealgas.IdealGasConfig;
import edu.colorado.phet.idealgas.IdealGasResources;
import edu.colorado.phet.idealgas.collision.VerticalBarrier;
import edu.colorado.phet.idealgas.model.HeavySpecies;
import edu.colorado.phet.idealgas.model.IdealGasModel;
import edu.colorado.phet.idealgas.model.LightSpecies;
import edu.colorado.phet.idealgas.model.PChemModel;
import edu.colorado.phet.idealgas.model.ParticleCounter;
import edu.colorado.phet.idealgas.model.Pump;
import edu.colorado.phet.idealgas.model.IdealGasClock;
import edu.colorado.phet.idealgas.view.Box2DGraphic;
import edu.colorado.phet.idealgas.view.HeavySpeciesGraphic;
import edu.colorado.phet.idealgas.view.LightSpeciesGraphic;

/**
 * AdvancedModule
 * <p/>
 * This module shows a reversible reaction with a potential energy barrier between the reactants
 *
 * @author Ron LeMaster
 * @version $Revision: 47772 $
 */
abstract public class AdvancedModule extends IdealGasModule {
    //    public static final Color COLOR_B = Color.orange;
    public static final Color COLOR_B = new Color( 252, 65, 40 );
    //    public static final Color COLOR_B = new Color( 200, 100, 0 );
    public static final Color COLOR_A = new Color( 0, 150, 0 );

    private static Font readoutFont = new PhetFont( Font.BOLD, 12 );
    protected VerticalBarrier verticalWall;
    private ParticleCounter leftRegionParticleCounter;
    private ParticleCounter rightRegionParticleCounter;
    //private Color orgLightColor;
    private Color orgHeavyColor;
		public int maxABfontSize;
		

    /**
     * @param clock
     * @param name
     */
    public AdvancedModule( IdealGasClock clock, String name, PhetApplicationConfig config ) {
        super( clock, name, config );
        init();
    }

    /**
     * @param clock
     * @param s
     * @param model
     */
    public AdvancedModule( IdealGasClock clock, String s, PChemModel model, PhetApplicationConfig config ) {
        super( clock, s, model, config );
        if (config.hasCommandLineArg("--constantTemp"))
        	idealGasModel.setConstantProperty(IdealGasModel.CONSTANT_TEMPERATURE); 
        init();
    }

    /**
     *
     */
    private void init() {

        // Enable the stopwatch
        setStopwatchEnabled( true );

        // Disable the pressure gauge
        setPressureGaugeVisible( false );

        // We can only use the top pressure-sensing slice because we don't know where the
        // floors will be
        getBox().setMultipleSlicesEnabled( false );

        Box2DGraphic boxGraphic = getBoxGraphic();
        boxGraphic.setIgnoreMouse( true );
        boxGraphic.removeAllMouseInputListeners();

        // Set the two types of particles so they are the same mass and radius
        LightSpecies.setMoleculeMass( HeavySpecies.getMoleculeMass() );
        LightSpecies.setMoleculeRadius( HeavySpecies.getMoleculeRadius() );

        // Set the colors of the particles. Note that calling this method sets the
        // scale transform for the images to 1.
        HeavySpeciesGraphic.setColor( COLOR_A );
        LightSpeciesGraphic.setColor( COLOR_B );

        // Make the walls of the box black
        Color boxColor = new Color( 120, 120, 120 );
        getBoxGraphic().setWallColor( boxColor );
        getBoxDoorGraphic().setColor( boxColor );
    }

    /**
     * Add elements that keep count of the number of particles on either side of the vertical wall
     */
    protected void addParticleCounters( String text1, String text2 ) {
        Rectangle2D boxBounds = getBox().getBoundsInternalNoCopy();

        // Create the particle counters
        leftRegionParticleCounter = new ParticleCounter( getIdealGasModel() );
        getModel().addModelElement( leftRegionParticleCounter );

        rightRegionParticleCounter = new ParticleCounter( getIdealGasModel() );
        getModel().addModelElement( rightRegionParticleCounter );

        // Set the bounds of the regions the particle counters cound
        setParticleCounterRegions();

        // Put readouts on the apparatus panel
        PhetGraphic leftCounterReadout = new ReadoutGraphic( leftRegionParticleCounter, IdealGasResources.getString( "AdvancedModule.Count" ) + ": " );
        leftCounterReadout.setLocation2( (int)boxBounds.getMinX() + 0, (int)boxBounds.getMaxY() + 7 );
        addGraphic( leftCounterReadout, IdealGasConfig.READOUT_LAYER );

        PhetGraphic rightCounterReadout = new ReadoutGraphic( rightRegionParticleCounter, IdealGasResources.getString( "AdvancedModule.Count" ) + ": " );
        rightCounterReadout.setLocation2( (int)boxBounds.getMaxX() - 110, (int)boxBounds.getMaxY() + 7 );
        addGraphic( rightCounterReadout, IdealGasConfig.READOUT_LAYER );

        // Put Text graphics above the box that indicate the reactants and products
        PhetTextGraphic leftTextGraphic = new CounterLetter( getApparatusPanel(), readoutFont, text1, COLOR_A, leftRegionParticleCounter );
        leftTextGraphic.setLocation2( (int)boxBounds.getMinX() + 50, (int)boxBounds.getMinY() - 30 );
        addGraphic( leftTextGraphic, IdealGasConfig.READOUT_LAYER );
        PhetTextGraphic rightTextGraphic = new CounterLetter( getApparatusPanel(), readoutFont, text2, COLOR_B, rightRegionParticleCounter );
        rightTextGraphic.setLocation2( (int)boxBounds.getMaxX() - 60, (int)boxBounds.getMinY() - 30 );
        addGraphic( rightTextGraphic, IdealGasConfig.READOUT_LAYER );

        // Add a pair of arrows that point from one character to the other
        double arrowThickness = 2;
        double headMultiplier = 4;
        Arrow lrArrow = new Arrow( new Point2D.Double( leftTextGraphic.getLocationNoCopy().x + 100, leftTextGraphic.getLocationNoCopy().y - 20 ),
                                   new Point2D.Double( rightTextGraphic.getLocationNoCopy().x - 100, rightTextGraphic.getLocationNoCopy().y - 20 ),
                                   arrowThickness * headMultiplier, arrowThickness * headMultiplier, arrowThickness );
        Arrow rlArrow = new Arrow( new Point2D.Double( rightTextGraphic.getLocationNoCopy().x - 100, rightTextGraphic.getLocationNoCopy().y - 0 ),
                                   new Point2D.Double( leftTextGraphic.getLocationNoCopy().x + 100, leftTextGraphic.getLocationNoCopy().y - 0 ),
                                   arrowThickness * headMultiplier, arrowThickness * headMultiplier, arrowThickness );
        Color arrowColor = new Color( 200, 200, 200 );
        addGraphic( new PhetShapeGraphic( getApparatusPanel(), lrArrow.getShape(), arrowColor ), IdealGasConfig.READOUT_LAYER );
        addGraphic( new PhetShapeGraphic( getApparatusPanel(), rlArrow.getShape(), arrowColor ), IdealGasConfig.READOUT_LAYER );
    }

    /**
     * Specifies the labels for the types of particles in the simulation
     *
     * @return
     */
    @Override
		protected String[] getSpeciesNames() {
        return new String[]{IdealGasResources.getString( "AdvancedModule.Particle_Type_A" ),
                IdealGasResources.getString( "AdvancedModule.Particle_Type_B" )};
    }

    /**
     * Adjusts the size of the regions the particle counters cover
     */
    protected void setParticleCounterRegions() {
        Rectangle2D boxBounds = getBox().getBoundsInternalNoCopy();
        Rectangle2D lowerWallBounds = verticalWall.getBoundsNoCopy();

        leftRegionParticleCounter.setRegion( new Rectangle2D.Double( boxBounds.getMinX(),
                                                                     boxBounds.getMinY(),
                                                                     lowerWallBounds.getMinX() + lowerWallBounds.getWidth() / 2 - boxBounds.getMinX(),
                                                                     boxBounds.getHeight() ) );
        rightRegionParticleCounter.setRegion( new Rectangle2D.Double( lowerWallBounds.getMinX() + lowerWallBounds.getWidth() / 2,
                                                                      boxBounds.getMinY(),
                                                                      boxBounds.getMaxX() - lowerWallBounds.getMaxX() + lowerWallBounds.getWidth() / 2,
                                                                      boxBounds.getHeight() ) );
    }

    /**
     * A text graphic for the counter readouts
     */
    private class ReadoutGraphic extends CompositePhetGraphic implements SimpleObserver {
        private ParticleCounter counter;
        private PhetTextGraphic labelGraphic;
        private PhetTextGraphic readout;
        private PhetShapeGraphic border;
        private String label;

        public ReadoutGraphic( ParticleCounter counter, String label ) {
            super( getApparatusPanel() );
            border = new PhetShapeGraphic( getApparatusPanel(), new Rectangle( 40, 20 ), Color.white, new BasicStroke( 1f ), Color.black );
            this.label = label;
            labelGraphic = new PhetTextGraphic( getApparatusPanel(), readoutFont, label, Color.black);
            this.addGraphic( labelGraphic, 10 );
            readout = new PhetTextGraphic( getApparatusPanel(), readoutFont, "", Color.black );
            this.addGraphic( readout, 10 );
            this.addGraphic( border, 5 );
            border.setLocation2( 20, 0 );
            counter.addObserver( this );
            this.counter = counter;
            update();
        }

        @Override
				public void paint( Graphics2D g2 ) {
            FontRenderContext frc = g2.getFontRenderContext();
            border.setLocation2( (int)( readoutFont.getStringBounds( label, frc ).getMaxX() + 5 ), 0 );
            readout.setLocation2( (int)( getBounds().getWidth() - 5 ), (int)border.getBounds().getHeight() / 2 );
            readout.setJustification( PhetTextGraphic.EAST );
            labelGraphic.setLocation2( 0, (int)border.getBounds().getHeight() / 2 );
            labelGraphic.setJustification( PhetTextGraphic.WEST );
            super.paint( g2 );
        }

        @Override
				public void update() {
            readout.setText( Integer.toString( counter.getCnt() ) );
            setBoundsDirty();
            repaint();
        }
    }

    /**
     * A text string that grows and shrinks with the number of particles reported by a ParticleCounter
     */
    private class CounterLetter extends PhetTextGraphic implements SimpleObserver {
        private ParticleCounter particleCounter;

        public CounterLetter( Component component, Font font, String text, Color color, ParticleCounter particleCounter ) {
            super( component, font, text, color );
            this.particleCounter = particleCounter;
            particleCounter.addObserver( this );
            setRenderingHints( new RenderingHints( RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON ) );
            setJustification( PhetTextGraphic.SOUTH );
//            setJustification( PhetTextGraphic.CENTER );
        }

        @Override
				public void update() {
            int size = Math.max( 12, particleCounter.getCnt() * 100 / (idealGasModel.getNumMolecules() + 1) );
            Font font = new PhetFont( Font.BOLD, size );
            this.setFont( font );
        }
    }


    @Override
		public void activate( PhetApplication app ) {
        super.activate( app );
        // Set the colors of the particle graphics
        // No longer needed because the original color is now the one we want here, too
//        orgLightColor = LightSpeciesGraphic.getColor();
        orgHeavyColor = HeavySpeciesGraphic.getColor();
//        LightSpeciesGraphic.setColor( COLOR_B );
        HeavySpeciesGraphic.setColor( COLOR_A );
    }

    @Override
		public void deactivate( PhetApplication app ) {
        super.deactivate( app );
//        LightSpeciesGraphic.setColor( orgLightColor );
        HeavySpeciesGraphic.setColor( orgHeavyColor );
    }

    //----------------------------------------------------------------
    // Abstract methods
    //----------------------------------------------------------------

    abstract public Pump[] getPumps();


}
