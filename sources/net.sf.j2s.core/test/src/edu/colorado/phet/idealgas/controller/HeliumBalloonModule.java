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

import java.awt.Dimension;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.geom.Point2D;
import java.util.List;
import java.util.Random;

import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JSpinner;
import javax.swing.SpinnerNumberModel;
import javax.swing.border.TitledBorder;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

import edu.colorado.phet.common.phetcommon.application.PhetApplicationConfig;
import edu.colorado.phet.common.phetcommon.math.vector.MutableVector2D;
import edu.colorado.phet.idealgas.IdealGasConfig;
import edu.colorado.phet.idealgas.IdealGasResources;
import edu.colorado.phet.idealgas.collision.SphereHollowSphereExpert;
import edu.colorado.phet.idealgas.controller.command.PumpMoleculeCmd;
import edu.colorado.phet.idealgas.model.Balloon;
import edu.colorado.phet.idealgas.model.BoxMustContainParticle;
import edu.colorado.phet.idealgas.model.Constraint;
import edu.colorado.phet.idealgas.model.GasMolecule;
import edu.colorado.phet.idealgas.model.HeavySpecies;
import edu.colorado.phet.idealgas.model.HollowSphere;
import edu.colorado.phet.idealgas.model.IdealGasClock;
import edu.colorado.phet.idealgas.model.LightSpecies;
import edu.colorado.phet.idealgas.model.Pump;
import edu.colorado.phet.idealgas.view.HollowSphereGraphic;

/**
 *
 */
public class HeliumBalloonModule extends IdealGasModule implements GasSource, IdealGasModule.ResetListener {

    private static double MASS = 500;

    private HollowSphere balloon;
    private Class<?> gasSpecies = LightSpecies.class;
    private int defaultGravity = IdealGasConfig.MAX_GRAVITY / 2;

    public HeliumBalloonModule( IdealGasClock clock, PhetApplicationConfig config ) {
        super( clock, IdealGasResources.getString( "ModuleTitle.HeliumBalloon" ), config );

        // So we'll get events sent by parent classes
        this.addResetListener( this );

        // Add collision experts to the model
        getIdealGasModel().addCollisionExpert( new SphereHollowSphereExpert() );

        // Create the balloon
        balloon = new Balloon( new Point2D.Double( 300, 350 ),
                               new MutableVector2D( 0, 0 ),
                               new MutableVector2D( 0, 0 ),
                               MASS,
                               Balloon.MIN_RADIUS,
                               getIdealGasModel().getBox() );
        getBox().setMinimumWidth( balloon.getRadius() * 3 );
        getIdealGasModel().addModelElement( balloon );
        getIdealGasModel().getBox().addContainedBody( balloon );
        HollowSphereGraphic graphic = new HollowSphereGraphic( getApparatusPanel(), balloon );
        addGraphic( graphic, 10 );
        Constraint constraintSpec = new BoxMustContainParticle( getIdealGasModel().getBox(), balloon,
                                                                getIdealGasModel() );
        balloon.addConstraint( constraintSpec );

        // Set up the control panel
        JPanel controlPanel = new JPanel( new GridBagLayout() );
        controlPanel.setBorder( new TitledBorder( IdealGasResources.getString( "HeliumBalloonControlPanel.controlsTitle" ) ) );

        GridBagConstraints gbc = null;
        Insets insets = new Insets( 0, 0, 0, 0 );
        gbc = new GridBagConstraints( 0, 0, 1, 1, 1, 1,
                                      GridBagConstraints.CENTER, GridBagConstraints.NONE,
                                      insets, 0, 0 );
        controlPanel.add( new HeliumBalloonModule.HeliumFactoryPanel(), gbc );
        getIdealGasControlPanel().addParticleControl( controlPanel );

        // Turn on gravity
        setGravity( defaultGravity );
    }

    @Override
		protected Pump.PumpingEnergyStrategy getPumpingEnergyStrategy() {
        return new Pump.FixedEnergyStrategy();
    }

    @Override
		public void setCurrentGasSpecies( Class<?> gasSpecies ) {
        this.gasSpecies = LightSpecies.class;
    }

    @Override
		public Class<?> getCurrentGasSpecies() {
        return gasSpecies;
    }

    //-----------------------------------------------------------------
    // Overrides of parent behavior
    //-----------------------------------------------------------------

    /**
     * Overrides behavior of superclass to only remove molecules that are NOT in the balloon
     *
     * @param species
     */
    @Override
		public void removeGasMolecule( Class<?> species ) {
        removeGasMolecule( species, false );
    }

	private void removeGasMolecule(Class<?> species, boolean fromBalloon) {
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
				if (species.isInstance(m) && 
						balloon.containsBody(m) == fromBalloon) {
					break;
				}
			}
		} else {
			for (int i = molecules.size(); --i >= 0;) {
				m = molecules.get(i);
				if (species.isInstance(m) && balloon.containsBody(m) == fromBalloon) {
					break;
				}
			}
		}

		// Remove the molecule from the system. If we are removing it from the
		// balloon, tell the balloon
		if (m != null) {
			getIdealGasModel().removeModelElement(m);
			if (fromBalloon)
				balloon.removeContainedBody(m);
		}
	}


    /**
     * Overrides parent behavior to return the count of heavy molecules in the box, but not in the sphere
     *
     * @return
     */
    @Override
		public int getHeavySpeciesCnt() {
        return idealGasModel.getHeavySpeciesCnt() - balloon.getHeavySpeciesCnt();
    }

    /**
     * Overrides parent behavior to return the count of light molecules in the box, but not in the sphere
     *
     * @return
     */
    @Override
		public int getLightSpeciesCnt() {
        return idealGasModel.getLightSpeciesCnt() - balloon.getLightSpeciesCnt();
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // Inner classes
    //

    class HeliumFactoryPanel extends JPanel implements IdealGasModule.ResetListener {

        private int currNumMolecules;
        private JSpinner particleSpinner;

        HeliumFactoryPanel() {

            super( new GridBagLayout() );
            GridBagConstraints gbc = new GridBagConstraints( 0, 0, 1, 1, 1, 1,
                                                             GridBagConstraints.WEST,
                                                             GridBagConstraints.NONE,
                                                             new Insets( 0, 0, 0, 0 ), 0, 0 );

            JLabel label = new JLabel( IdealGasResources.getString( "MeasurementControlPanel.Number_of_particles" ) );
            this.add( label, gbc );
            // Set up the spinner for controlling the number of particles in
            // the hollow sphere
            Integer value = new Integer( 0 );
            Integer min = new Integer( 0 );
            Integer max = new Integer( 1000 );
            Integer step = new Integer( 1 );
            SpinnerNumberModel model = new SpinnerNumberModel( value, min, max, step );
            particleSpinner = new JSpinner( model );
            particleSpinner.setPreferredSize( new Dimension( 50, 20 ) );
            gbc.gridx = 1;
            gbc.anchor = GridBagConstraints.EAST;
            this.add( particleSpinner, gbc );

            particleSpinner.addChangeListener( new ChangeListener() {
                @Override
								public void stateChanged( ChangeEvent e ) {
                    setNumParticles( ( (Integer) particleSpinner.getValue() ).intValue() );
                }
            } );

            HeliumBalloonModule.this.addResetListener( this );
        }

        protected void setNumParticles( int numParticles ) {
            int dn = numParticles - currNumMolecules;
            if ( dn > 0 ) {
                for ( int i = 0; i < dn; i++ ) {
                    Class<?> species = getCurrentGasSpecies();
                    Point2D location = balloon.getNewMoleculeLocation();
                    MutableVector2D velocity = balloon.getNewMoleculeVelocity( species, getIdealGasModel() );
                    GasMolecule molecule = null;
                    if ( species == HeavySpecies.class ) {
                        molecule = new HeavySpecies( location, velocity, new MutableVector2D() );
                    }
                    if ( species == LightSpecies.class ) {
                        molecule = new LightSpecies( location, velocity, new MutableVector2D() );
                    }
                    PumpMoleculeCmd cmd = new PumpMoleculeCmd( getIdealGasModel(), molecule,
                                                               HeliumBalloonModule.this );
                    cmd.doIt();
                    balloon.addContainedBody( molecule );
                }
            }
            else if ( dn < 0 ) {
                for ( int i = 0; i < -dn; i++ ) {
                    removeGasMolecule( LightSpecies.class, true );
                }
            }
            currNumMolecules += dn;
        }

        @Override
				public void resetOccurred( ResetEvent event ) {
            currNumMolecules = 0;
            particleSpinner.setEnabled( false );
            particleSpinner.setValue( new Integer( 0 ) );
            particleSpinner.setEnabled( true );
        }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    // Event handling
    //
    @Override
		public void resetOccurred( ResetEvent event ) {
        balloon.setRadius( Balloon.MIN_RADIUS );
    }
}
