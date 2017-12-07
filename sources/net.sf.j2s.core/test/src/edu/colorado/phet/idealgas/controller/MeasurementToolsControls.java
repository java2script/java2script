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

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.awt.event.WindowListener;

import javax.swing.JCheckBox;
import javax.swing.JCheckBoxMenuItem;
import javax.swing.JDialog;

import edu.colorado.phet.idealgas.IdealGasResources;
import edu.colorado.phet.idealgas.model.IdealGasModel;

/**
 * MeasurementToolsControls
 * <p/>
 * A set of static Swing component classes for enabling and disabling various
 * measurement tools
 *
 * @author Ron LeMaster
 * @version $Revision: 47772 $
 */
public class MeasurementToolsControls {

    //----------------------------------------------------------------
    // Check boxes
    //----------------------------------------------------------------

    @SuppressWarnings("serial")
		static public class PressureSliceControl extends JCheckBox {
        PressureSliceControl( final IdealGasModule module ) {
            super( IdealGasResources.getString( "MeasurementControlPanel.Measure_pressure_in_layer" ) );
            addActionListener( new ActionListener() {
                @Override
								public void actionPerformed( ActionEvent e ) {
                    module.setPressureSliceEnabled( isSelected() );
                }
            } );
        }
    }

    @SuppressWarnings("serial")
    static public class RulerControl extends JCheckBox {
        RulerControl( final IdealGasModule module ) {
            super( IdealGasResources.getString( "MeasurementControlPanel.Display_ruler" ) );
            addActionListener( new ActionListener() {
                @Override
								public void actionPerformed( ActionEvent e ) {
                    module.setRulerEnabed( isSelected() );
                }
            } );
        }
    }

    @SuppressWarnings("serial")
		static public class HistogramControlPanel extends JCheckBox {
	      WindowListener windowListener = new WindowAdapter() {
	        @Override
					public void windowClosing( WindowEvent e ) {
	            setSelected( false );
	        }
	      };
        HistogramControlPanel( final IdealGasModule module ) {
            super( IdealGasResources.getString( "MeasurementControlPanel.Display_energy_histograms" ) );
            addActionListener( new ActionListener() {
                @Override
								public void actionPerformed( ActionEvent e ) {
                    JDialog dlg = module.setHistogramDlgEnabled( isSelected() );
                    if( dlg != null ) {
                        dlg.addWindowListener( windowListener );
                    }
                }
            } );
        }
    }

    @SuppressWarnings("serial")
		static public class CmLinesControl extends JCheckBox {
        CmLinesControl( final IdealGasModule module ) {
            super( IdealGasResources.getString( "IdealGasControlPanel.Show_CM_lines" ) );
            addActionListener( new ActionListener() {
                @Override
								public void actionPerformed( ActionEvent event ) {
                    module.setCmLinesOn( isSelected() );
                }
            } );
        }
    }

    @SuppressWarnings("serial")
    static public class SpeciesMonitorControl extends JCheckBox {
				WindowListener windowListener = new WindowAdapter() {
					@Override
					public void windowClosing(WindowEvent e) {
						setSelected(false);
					}
				};
        SpeciesMonitorControl( final IdealGasModule module ) {
            super( IdealGasResources.getString( "MeasurementControlPanel.Show_species_information" ) );
            addActionListener( new ActionListener() {
                @Override
								public void actionPerformed( ActionEvent e ) {
                    JDialog dlg = module.setSpeciesMonitorDlgEnabled( isSelected() );
                    dlg.addWindowListener( windowListener );
                }
            } );
        }
    }

    @SuppressWarnings("serial")
    static public class StopwatchControl extends JCheckBox {
        StopwatchControl( final IdealGasModule module ) {
            super( IdealGasResources.getString( "MeasurementControlPanel.Stopwatch" ), false );
            addActionListener( new ActionListener() {
//                PhetFrame frame = PhetApplication.getInstance().getPhetFrame();
                @Override
								public void actionPerformed( ActionEvent e ) {
                    module.setStopwatchEnabled( isSelected() );
                }
            } );
        }
    }


    @SuppressWarnings("serial")
    static public class ParticleInteractionControl extends JCheckBox {
        ParticleInteractionControl( final IdealGasModel model ) {
            super( IdealGasResources.getString( "MeasurementControlPanel.Molecules-interact" ), true );
            addActionListener( new ActionListener() {
                @Override
								public void actionPerformed( ActionEvent e ) {
                    model.enableParticleParticleInteractions( isSelected() );
                }
            } );
        }
    }

    //----------------------------------------------------------------
    // Menu items
    //----------------------------------------------------------------

    @SuppressWarnings("serial")
    static public class PressureSliceControlMI extends JCheckBoxMenuItem {
        PressureSliceControlMI( final IdealGasModule module ) {
            super( IdealGasResources.getString( "MeasurementControlPanel.Measure_pressure_in_layer" ) );
            addActionListener( new ActionListener() {
                @Override
								public void actionPerformed( ActionEvent e ) {
                    module.setPressureSliceEnabled( isSelected() );
                }
            } );
        }
    }

    @SuppressWarnings("serial")
    static public class RulerControlMI extends JCheckBoxMenuItem {
        RulerControlMI( final IdealGasModule module ) {
            super( IdealGasResources.getString( "MeasurementControlPanel.Display_ruler" ) );
            addActionListener( new ActionListener() {
                @Override
								public void actionPerformed( ActionEvent e ) {
                    module.setRulerEnabed( isSelected() );
                }
            } );
        }
    }

    @SuppressWarnings("serial")
    static public class HistogramControlPanelMI extends JCheckBoxMenuItem {
		    WindowListener windowListener = new WindowAdapter() {
					@Override
					public void windowClosing(WindowEvent e) {
						setSelected(false);
					}
		    };
        HistogramControlPanelMI( final IdealGasModule module ) {
            super( IdealGasResources.getString( "MeasurementControlPanel.Display_energy_histograms" ) );
            addActionListener( new ActionListener() {
                @Override
								public void actionPerformed( ActionEvent e ) {
                    JDialog dlg = module.setHistogramDlgEnabled( isSelected() );
                    dlg.addWindowListener( windowListener );
                }
            } );
        }
    }

    @SuppressWarnings("serial")
    static public class CmLinesControlMI extends JCheckBoxMenuItem {
        CmLinesControlMI( final IdealGasModule module ) {
            super( IdealGasResources.getString( "IdealGasControlPanel.Show_CM_lines" ) );
            addActionListener( new ActionListener() {
                @Override
								public void actionPerformed( ActionEvent event ) {
                    module.setCmLinesOn( isSelected() );
                }
            } );
        }
    }

    @SuppressWarnings("serial")
    static public class SpeciesMonitorControlMI extends JCheckBoxMenuItem {
	      WindowListener windowListener = new WindowAdapter() {
	        @Override
					public void windowClosing( WindowEvent e ) {
	            setSelected( false );
	        }
	      };
        SpeciesMonitorControlMI( final IdealGasModule module ) {
            super( IdealGasResources.getString( "MeasurementControlPanel.Show_species_information" ) );
            addActionListener( new ActionListener() {
                @Override
								public void actionPerformed( ActionEvent e ) {
                    JDialog dlg = module.setSpeciesMonitorDlgEnabled( isSelected() );
                    dlg.addWindowListener( windowListener );
                }
            } );
        }
    }

    @SuppressWarnings("serial")
    static public class StopwatchControlMI extends JCheckBoxMenuItem {
        StopwatchControlMI( final IdealGasModule module ) {
            super( IdealGasResources.getString( "MeasurementControlPanel.Stopwatch" ), false );
            addActionListener( new ActionListener() {
                @Override
								public void actionPerformed( ActionEvent e ) {
                    module.setStopwatchEnabled( isSelected() );
                }
            } );
        }
    }

    @SuppressWarnings("serial")
    static public class ParticleInteractionMI extends JCheckBoxMenuItem {
        ParticleInteractionMI( final IdealGasModel model ) {
            super( IdealGasResources.getString( "MeasurementControlPanel.Molecules-interact" ), true );
            addActionListener( new ActionListener() {
                @Override
								public void actionPerformed( ActionEvent e ) {
                    model.enableParticleParticleInteractions( isSelected() );
                }
            } );
        }
    }
}
