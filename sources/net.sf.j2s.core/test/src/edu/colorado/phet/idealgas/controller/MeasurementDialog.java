// Copyright 2002-2011, University of Colorado

/**
 * Class: MeasurementDialog
 * Package: edu.colorado.phet.idealgas.controller
 * Author: Another Guy
 * Date: Sep 23, 2004
 */
package edu.colorado.phet.idealgas.controller;

import java.awt.Frame;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.awt.event.WindowListener;

import javax.swing.JCheckBox;
import javax.swing.JDialog;
import javax.swing.JPanel;

import edu.colorado.phet.common.phetcommon.application.PaintImmediateDialog;
import edu.colorado.phet.idealgas.IdealGasResources;

public class MeasurementDialog extends PaintImmediateDialog {

    private IdealGasModule module;
//    private ArrayList<Component> visibleInstruments = new ArrayList<Component>();
//    private EnergyHistogramDialog histogramDlg;

    public MeasurementDialog( Frame owner, IdealGasModule module ) {
        super( owner, "Measurement Tools", false );
        this.module = module;
        JPanel panel = new JPanel();
        setContentPane( panel );
        panel.setLayout( new GridBagLayout() );
        GridBagConstraints gbc = null;

        Insets insets = new Insets( 0, 10, 0, 0 );
        gbc = new GridBagConstraints( 0, GridBagConstraints.RELATIVE, 1, 1, 1, 1,
                                      GridBagConstraints.WEST,
                                      GridBagConstraints.NONE,
                                      insets, 0, 0 );
        panel.add( new PressureSliceControl(), gbc );
        panel.add( new RulerControl(), gbc );
        panel.add( new HistogramControlPanel(), gbc );
        panel.add( new CmLinesControl(), gbc );
        panel.add( new SpeciesMonitorControl(), gbc );
        panel.add( new StopwatchControl(), gbc );

        this.pack();
    }

    //----------------------------------------------------------------
    // Controls to be put on the dialog
    //----------------------------------------------------------------

    /**
     * These controls are each done a s JPanel, so they can have multiple widgets if necessary
     */


    class PressureSliceControl extends JPanel {
        PressureSliceControl() {
            final JCheckBox pressureSliceCB = new JCheckBox( IdealGasResources.getString( "MeasurementControlPanel.Measure_pressure_in_layer" ) );
            this.add( pressureSliceCB );
            pressureSliceCB.addActionListener( new ActionListener() {
                @Override
								public void actionPerformed( ActionEvent e ) {
                    module.setPressureSliceEnabled( pressureSliceCB.isSelected() );
                }
            } );
        }
    }

    class RulerControl extends JPanel {
        RulerControl() {
            final JCheckBox rulerCB = new JCheckBox( IdealGasResources.getString( "MeasurementControlPanel.Display_ruler" ) );
            this.add( rulerCB );
            rulerCB.addActionListener( new ActionListener() {
                @Override
								public void actionPerformed( ActionEvent e ) {
                    module.setRulerEnabed( rulerCB.isSelected() );
                }
            } );
        }
    }

    class HistogramControlPanel extends JPanel {
        HistogramControlPanel() {
            final JCheckBox histogramCB = new JCheckBox( IdealGasResources.getString( "MeasurementControlPanel.Display_energy_histograms" ) );
            this.add( histogramCB );
            histogramCB.addActionListener( new ActionListener() {
                @Override
								public void actionPerformed( ActionEvent e ) {
                    WindowListener windowListener = new WindowAdapter() {
                        @Override
												public void windowClosing( WindowEvent e ) {
                            histogramCB.setSelected( false );
                        }
                    };
                    JDialog dlg = module.setHistogramDlgEnabled( histogramCB.isSelected() );
                    dlg.addWindowListener( windowListener );
                }
            } );
        }
    }

    class CmLinesControl extends JPanel {
        CmLinesControl() {
            final JCheckBox cmLinesOnCB = new JCheckBox( IdealGasResources.getString( "IdealGasControlPanel.Show_CM_lines" ) );
            this.add( cmLinesOnCB );
            cmLinesOnCB.addActionListener( new ActionListener() {
                @Override
								public void actionPerformed( ActionEvent event ) {
                    module.setCmLinesOn( cmLinesOnCB.isSelected() );
                }
            } );
        }
    }

    class SpeciesMonitorControl extends JPanel {
        SpeciesMonitorControl() {
            final JCheckBox speciesMonotorCB = new JCheckBox( IdealGasResources.getString( "MeasurementControlPanel.Show_species_information" ) );
            this.add( speciesMonotorCB );
            speciesMonotorCB.addActionListener( new ActionListener() {
                @Override
								public void actionPerformed( ActionEvent e ) {
                    WindowListener windowListener = new WindowAdapter() {
                        @Override
												public void windowClosing( WindowEvent e ) {
                            speciesMonotorCB.setSelected( false );
                        }
                    };
                    JDialog dlg = module.setSpeciesMonitorDlgEnabled( speciesMonotorCB.isSelected() );
                    dlg.addWindowListener( windowListener );
                }
            } );
        }
    }

    class StopwatchControl extends JPanel {

        public StopwatchControl() {
            final JCheckBox stopwatchCB = new JCheckBox( IdealGasResources.getString( "MeasurementControlPanel.Stopwatch" ), false );
            stopwatchCB.addActionListener( new ActionListener() {
                //PhetFrame frame = PhetApplication.getInstance().getPhetFrame();

                @Override
								public void actionPerformed( ActionEvent e ) {
                    module.setStopwatchEnabled( stopwatchCB.isSelected() );
                }
            } );
            this.add( stopwatchCB );
        }
    }
}
