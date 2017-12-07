// Copyright 2002-2012, University of Colorado

package edu.colorado.phet.idealgas.controller;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.geom.Point2D;

import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JSpinner;
import javax.swing.SpinnerModel;
import javax.swing.SpinnerNumberModel;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

import edu.colorado.phet.common.phetcommon.math.vector.MutableVector2D;
import edu.colorado.phet.idealgas.IdealGasResources;
import edu.colorado.phet.idealgas.controller.command.PumpMoleculeCmd;
import edu.colorado.phet.idealgas.model.HeavySpecies;
import edu.colorado.phet.idealgas.model.IdealGasModel;
import edu.colorado.phet.idealgas.model.LightSpecies;

/**
 * A JPanel with two spinners for adding and removing molecules from the model.
 */
@SuppressWarnings("serial")
public abstract class SpeciesSelectionPanel extends JPanel implements IdealGasModule.ResetListener {

    private static final Dimension PREFERRED_SPINNER_SIZE = new Dimension( 70, 20 );

    private IdealGasModule module;
    private MoleculeCountSpinner heavySpinner;
    private MoleculeCountSpinner lightSpinner;
    private JLabel heavySpeciesLbl;
    private JLabel lightSpeciesLbl;

    public SpeciesSelectionPanel( final IdealGasModule module ) {
        this( module, new String[] { IdealGasResources.getString( "Common.Heavy_Species" ), IdealGasResources.getString( "Common.Light_Species" ) } );
    }

    public SpeciesSelectionPanel( final IdealGasModule module, final String[] speciesNames ) {
        this.module = module;
        module.addResetListener( this );

        // Labels for the species
        makeLabels( speciesNames );

        // Spinners for the species
        makeSpinners();

        // Lay out the panel
        setLayout( new GridBagLayout() );
        Insets insets = new Insets( 0, 0, 0, 0 );
        GridBagConstraints gbc = new GridBagConstraints( 0, 0, 1, 1, 1, 1,
                                                         GridBagConstraints.EAST, GridBagConstraints.NONE,
                                                         insets, 0, 0 );
        add( heavySpeciesLbl, gbc );
        gbc.gridx = 1;
        gbc.anchor = GridBagConstraints.WEST;
        add( heavySpinner, gbc );
        gbc.gridx = 0;
        gbc.gridy = 1;
        gbc.anchor = GridBagConstraints.EAST;
        add( lightSpeciesLbl, gbc );
        gbc.gridx = 1;
        gbc.anchor = GridBagConstraints.WEST;
        add( lightSpinner, gbc );

        // For debug: button fires a molecule when pressed
        {
            boolean debug = false;
            if ( debug ) {
                JButton testBtn = new JButton( "Test" );
                testBtn.addActionListener( new ActionListener() {
                    @Override
										public void actionPerformed( ActionEvent e ) {
                        HeavySpecies m = new HeavySpecies( new Point2D.Double( module.getBox().getPosition().getX() + 300,
                                                                               module.getBox().getPosition().getY() + 30 ),
                                                           new MutableVector2D( -53, -20 ),
                                                           new MutableVector2D() );
                        new PumpMoleculeCmd( (IdealGasModel) module.getModel(), m, module ).doIt();
                        heavySpinner.setValue( new Integer( 1 ) );
                        ( (PumpControlPanel) SpeciesSelectionPanel.this ).moleculeAdded( m );
                    }
                } );
                gbc.gridy++;
                this.add( testBtn, gbc );
            }
        }

    }

    /**
     * Sets up the labels for each species.
     */
    private void makeLabels( String[] speciesNames ) {
        heavySpeciesLbl = new JLabel( speciesNames[0] );
        heavySpeciesLbl.setForeground( Color.blue );
        lightSpeciesLbl = new JLabel( speciesNames[1] );
        lightSpeciesLbl.setForeground( Color.red );
    }

    /**
     * Sets up the spinners
     */
    private void makeSpinners() {

        Integer value = new Integer( 0 );
        Integer min = new Integer( 0 );
        Integer max = new Integer( 1000 );
        Integer step = new Integer( 1 );

        // Spinner for heavy species
        SpinnerNumberModel heavySpinnerModel = new SpinnerNumberModel( value, min, max, step );
        heavySpinner = new MoleculeCountSpinner( heavySpinnerModel, new IntegerValue() {
            @Override
						public int getValue() {
                return getHeavySpeciesCnt();
            }
        } );
        heavySpinner.setPreferredSize( PREFERRED_SPINNER_SIZE );
        heavySpinner.addChangeListener( new ChangeListener() {
            @Override
						public void stateChanged( ChangeEvent e ) {
                if ( heavySpinner.isEnabled() ) {
                	addMolecules(( (Integer) heavySpinner.getValue() ).intValue() - getHeavySpeciesCnt(), HeavySpecies.class);
                }
            }
        } );

        // Spinner for light species
        SpinnerNumberModel lightSpinnerModel = new SpinnerNumberModel( value, min, max, step );
        lightSpinner = new MoleculeCountSpinner( lightSpinnerModel, new IntegerValue() {
            @Override
						public int getValue() {
                return getLightSpeciesCnt();
            }
        } );
        lightSpinner.setPreferredSize( PREFERRED_SPINNER_SIZE );
        lightSpinner.addChangeListener( new ChangeListener() {
            @Override
						public void stateChanged( ChangeEvent e ) {
                if ( lightSpinner.isEnabled() )
                	addMolecules( ((Integer) lightSpinner.getValue()).intValue() - getLightSpeciesCnt(),  LightSpecies.class);
            }
        });
    }

	protected void addMolecules(int dn, Class<?> cl) {
		if (dn > 0) {
			if (dn > 1 && addMany(dn, cl)) // BH better distribution of velocities
				return;
			for (int i = dn; --i >= 0;) {
				createMolecule(cl);
			}
		} else if (dn < 0) {
			for (int i = -dn; --i >= 0;) {
				removeMolecule(cl);
			}
		}
	}

		protected boolean addMany(int dn, Class<?> cl) {
			return false;
		}

		@Override
		public void resetOccurred( IdealGasModule.ResetEvent event ) {
        reset();
    }

    public void reset() {
        heavySpinner.setEnabled( false );
        lightSpinner.setEnabled( false );
        heavySpinner.setValue( new Integer( 0 ) );
        lightSpinner.setValue( new Integer( 0 ) );
        heavySpinner.setEnabled( true );
        lightSpinner.setEnabled( true );
    }

    //----------------------------------------------------------------------------------
    // Setters and getters
    //----------------------------------------------------------------------------------
    protected IdealGasModule getModule() {
        return module;
    }

    public MoleculeCountSpinner getHeavySpinner() {
        return heavySpinner;
    }

    public MoleculeCountSpinner getLightSpinner() {
        return lightSpinner;
    }

    public void setHeavySpeciesLabelText( String text ) {
        heavySpeciesLbl.setText( text );
    }

    public void setLightSpeciesLabelText( String text ) {
        lightSpeciesLbl.setText( text );
    }

    public void setHeavySpeciesLabelColor( Color color ) {
        heavySpeciesLbl.setForeground( color );
    }

    public void setLightSpeciesLabelColor( Color color ) {
        lightSpeciesLbl.setForeground( color );
    }

    //----------------------------------------------------------------------------------
    // Abstract methods
    //----------------------------------------------------------------------------------
    protected abstract void createMolecule( Class<?> moleculeClass );

    protected abstract void removeMolecule( Class<?> moleculeClass );

    protected abstract int getHeavySpeciesCnt();

    protected abstract int getLightSpeciesCnt();

    //----------------------------------------------------------------
    // Inner classes
    //----------------------------------------------------------------
    public static interface IntegerValue {
        public int getValue();
    }

    public class MoleculeCountSpinner extends JSpinner {
        private IntegerValue value;

        public MoleculeCountSpinner( SpinnerModel model, IntegerValue value ) {
            super( model );
            this.value = value;
        }

        public void updateValue() {
            setValue( new Integer( value.getValue() ) );
        }
    }
}
