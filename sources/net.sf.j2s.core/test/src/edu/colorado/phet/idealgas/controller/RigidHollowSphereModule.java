// Copyright 2002-2012, University of Colorado

/**
 * Class: RigidHollowSphereModule
 * Class: edu.colorado.phet.idealgas.controller
 * User: Ron LeMaster
 * Date: Sep 18, 2004
 * Time: 12:35:56 PM
 */
package edu.colorado.phet.idealgas.controller;

import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.geom.Point2D;
import java.util.LinkedList;
import java.util.List;
import java.util.Random;

import javax.swing.JPanel;
import javax.swing.border.TitledBorder;

import edu.colorado.phet.common.phetcommon.application.PhetApplicationConfig;
import edu.colorado.phet.common.phetcommon.math.vector.MutableVector2D;
import edu.colorado.phet.idealgas.IdealGasConfig;
import edu.colorado.phet.idealgas.IdealGasResources;
import edu.colorado.phet.idealgas.collision.SphereHollowSphereExpert;
import edu.colorado.phet.idealgas.controller.command.AddModelElementCmd;
import edu.colorado.phet.idealgas.controller.command.PumpMoleculeCmd;
import edu.colorado.phet.idealgas.instrumentation.Thermometer;
import edu.colorado.phet.idealgas.model.Box2D;
import edu.colorado.phet.idealgas.model.GasMolecule;
import edu.colorado.phet.idealgas.model.HeavySpecies;
import edu.colorado.phet.idealgas.model.HollowSphere;
import edu.colorado.phet.idealgas.model.IdealGasClock;
import edu.colorado.phet.idealgas.model.LightSpecies;
import edu.colorado.phet.idealgas.model.Pump;
import edu.colorado.phet.idealgas.view.HollowSphereGraphic;

public class RigidHollowSphereModule extends IdealGasModule implements GasSource {

    private static final float initialVelocity = 35;

    private HollowSphere sphere;
    private Class<?> gasSpecies = HeavySpecies.class;
    private LinkedList<GasMolecule> moleculesInSphere = new LinkedList<GasMolecule>();
    private double defaultGravity = IdealGasConfig.MAX_GRAVITY / 4;

    /**
     * Constructor
     *
     * @param clock
     * @param config 
     */
    public RigidHollowSphereModule( IdealGasClock clock, PhetApplicationConfig config ) {
        super( clock, IdealGasResources.getString( "ModuleTitle.RigidHollowSphere" ), config );
        double xOrigin = 200;
        double yOrigin = 250;
        double xDiag = 434;
        double yDiag = 397;

        // Add collision experts to the model
        getIdealGasModel().addCollisionExpert( new SphereHollowSphereExpert() );

        // Set the size of the box
        final Box2D box = getIdealGasModel().getBox();
        //        box.setRegion( 300, 100, box.getMaxX(), box.getMaxY() );
        sphere = new HollowSphere( new Point2D.Double( box.getMinX() + box.getWidth() / 2,
                                                       box.getMinY() + box.getHeight() / 2 ),
                                   new MutableVector2D( 0, 0 ),
                                   new MutableVector2D( 0, 0 ),
                                   100,
                                   50 );
        box.setMinimumWidth( sphere.getRadius() * 3 );

        int thermometerHeight = 100;
        Thermometer thermometer = getThermometer();
        thermometer.setLocation( new Point2D.Double( box.getMaxX() - 30, box.getMinY() - thermometerHeight ) );

        new AddModelElementCmd( getIdealGasModel(), sphere ).doIt();
        getIdealGasModel().getBox().addContainedBody( sphere );
        addGraphic( new HollowSphereGraphic( getApparatusPanel(), sphere ), 20 );

        // Put some intial gas inside and outside sphere
        addGas( xDiag, xOrigin, yDiag, yOrigin );

        // Add controls to the control panel that are specific to this module
        JPanel controlPanel = new JPanel( new GridBagLayout() );
        controlPanel.setBorder( new TitledBorder( IdealGasResources.getString( "RigidHollowSphereControlPanel.controlsTitle" ) ) );
        GridBagConstraints gbc = null;
        Insets insets = new Insets( 0, 0, 0, 0 );
        gbc = new GridBagConstraints( 0, 0, 1, 1, 1, 1,
                                      GridBagConstraints.CENTER, GridBagConstraints.NONE,
                                      insets, 0, 0 );
        HollowSphereControlPanel hollowSphereControlPanel = new HollowSphereControlPanel( this, RigidHollowSphereModule.this, sphere );
        controlPanel.add( hollowSphereControlPanel, gbc );
        this.addResetListener( hollowSphereControlPanel );
        getIdealGasControlPanel().addParticleControl( controlPanel );

        // Start with gravity on
        setGravity( defaultGravity );
    }

    private void addGas( double xDiag, double xOrigin, double yDiag, double yOrigin ) {
        // Put some heavy gas outside the sphere
        for ( int i = 0; i < 0; i++ ) {
            //        for( int i = 0; i < 100; i++ ) {
            double x = Math.random() * ( xDiag - xOrigin - 20 ) + xOrigin + 50;
            double y = Math.random() * ( yDiag - yOrigin - 20 ) + yOrigin + 10;
            double theta = Math.random() * Math.PI * 2;
            double vx = Math.cos( theta ) * initialVelocity;
            double vy = Math.sin( theta ) * initialVelocity;
            GasMolecule p1 = new HeavySpecies( new Point2D.Double( x, y ),
                                               new MutableVector2D( vx, vy ),
                                               new MutableVector2D( 0, 0 ) );
            new PumpMoleculeCmd( getIdealGasModel(), p1, this ).doIt();
        }

        // Put some heavy gas in the sphere
        GasMolecule p1 = null;
        int num = 0;
        //        int num = 6;
        //        int num = 4;
        for ( int i = 1; i <= num; i++ ) {
            for ( int j = 0; j < num; j++ ) {
                double v = initialVelocity;
                double theta = Math.random() * Math.PI * 2;
                double vx = Math.cos( theta ) * v;
                double vy = Math.sin( theta ) * v;
                if ( HeavySpecies.class.isAssignableFrom( gasSpecies ) ) {
                    p1 = new HeavySpecies( new Point2D.Double( 350 + i * 10, 230 + j * 10 ),
                                           //                        new Point2D.Double( 280 + i * 10, 330 + j * 10 ),
                                           new MutableVector2D( vx, vy ),
                                           new MutableVector2D( 0, 0 ) );
                    new PumpMoleculeCmd( getIdealGasModel(), p1, this ).doIt();
                }
                if ( LightSpecies.class.isAssignableFrom( gasSpecies ) ) {
                    p1 = new LightSpecies( new Point2D.Double( 350 + i * 10, 230 + j * 10 ),
                                           //                        new Point2D.Double( 280 + i * 10, 330 + j * 10 ),
                                           new MutableVector2D( vx, vy ),
                                           new MutableVector2D( 0, 0 ) );
                    new PumpMoleculeCmd( getIdealGasModel(), p1, this ).doIt();
                }
                sphere.addContainedBody( p1 );
            }
        }
    }

    @Override
		protected Pump.PumpingEnergyStrategy getPumpingEnergyStrategy() {
        return new Pump.FixedEnergyStrategy();
    }

    @Override
		public void setCurrentGasSpecies( Class<?> gasSpecies ) {
        this.gasSpecies = gasSpecies;
    }

    @Override
		public Class<?> getCurrentGasSpecies() {
        return this.gasSpecies;
    }

	public void removeGasMoleculeFromSphere(Class<?> gasSpecies) {
		// Find a molecule of the right species, and remove it
		getClock().start(); // BH Java fix #9
		boolean found = false;
		GasMolecule gasMolecule = null;
		for (int i = 0; !found && i < moleculesInSphere.size(); i++) {
			gasMolecule = moleculesInSphere.get(i);
			if (gasSpecies.isInstance(gasMolecule)) {
				found = true;
				moleculesInSphere.remove(gasMolecule);
				sphere.removeContainedBody(gasMolecule);
			}
		}

		if (found) {
			getIdealGasModel().removeModelElement(gasMolecule);
		}
	}

    public void addMoleculeToSphere( Class<?> species ) {
  			getClock().start(); // BH Java fix #9
        Point2D location = sphere.getNewMoleculeLocation();
        MutableVector2D velocity = sphere.getNewMoleculeVelocity( species, getIdealGasModel() );
        GasMolecule gm = null;
        if ( species == HeavySpecies.class ) {
            gm = new HeavySpecies( location, velocity, new MutableVector2D() );
        }
        if ( species == LightSpecies.class ) {
            gm = new LightSpecies( location, velocity, new MutableVector2D() );
        }
        moleculesInSphere.add( gm );
        PumpMoleculeCmd cmd = new PumpMoleculeCmd( this.getIdealGasModel(), gm,
                                                   this );
        cmd.doIt();
        this.sphere.addContainedBody( gm );
    }

	// -----------------------------------------------------------------
	// Overrides of parent behavior
	// -----------------------------------------------------------------

	/**
	 * Overrides behavior of superclass to only remove molecules that are NOT in
	 * the sphere
	 * 
	 * @param species
	 */
	@Override
	public void removeGasMolecule(Class<?> species) {
		List<GasMolecule> molecules = getIdealGasModel().getGasMolecules();
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
				if (species.isInstance(m) && !sphere.containsBody(m)) {
					break;
				}
			}
		} else {
			for (int i = molecules.size(); --i >= 0;) {
				m = molecules.get(i);
				if (species.isInstance(m) && sphere.containsBody(m)) {
					break;
				}
			}
		}
		if (m != null)
			getIdealGasModel().removeModelElement(m);
	}
	
    /**
     * Overrides parent behavior to return the count of heavy molecules in the box, but not in the sphere
     *
     * @return
     */
    @Override
		public int getHeavySpeciesCnt() {
        return idealGasModel.getHeavySpeciesCnt() - sphere.getHeavySpeciesCnt();
    }

    /**
     * Overrides parent behavior to return the count of light molecules in the box, but not in the sphere
     *
     * @return
     */
    @Override
		public int getLightSpeciesCnt() {
        return idealGasModel.getLightSpeciesCnt() - sphere.getLightSpeciesCnt();
    }

}
