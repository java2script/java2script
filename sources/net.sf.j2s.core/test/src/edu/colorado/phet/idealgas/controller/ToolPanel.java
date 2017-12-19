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

import edu.colorado.phet.idealgas.IdealGasResources;
import edu.colorado.phet.idealgas.coreadditions.ToggleButton;
import edu.colorado.phet.idealgas.model.Pump;

import javax.swing.*;
import javax.swing.border.TitledBorder;
import java.awt.*;

/**
 * ToolPanel
 * <p/>
 * A JPanel with controls for enabling/disabling the measurement tools
 *
 * @author Ron LeMaster
 * @version $Revision: 47772 $
 */
public class ToolPanel extends JPanel {

    JPanel toolsPanel = new JPanel( new GridBagLayout() );
    private JComponent button;
    private Insets panelInsets = new Insets( 0, 0, 0, 0 );
    private Insets buttonInsets = new Insets( 10, 0, 0, 0 );

    private GridBagConstraints topLevelGbc = new GridBagConstraints( 0, 0,
                                                                     1, 1, 1, 1,
                                                                     GridBagConstraints.CENTER,
                                                                     GridBagConstraints.NONE,
                                                                     panelInsets, 0, 0 );
    private GridBagConstraints toolsPanelInternalGbc = new GridBagConstraints( 0, GridBagConstraints.RELATIVE,
                                                                               1, 1, 1, 1,
                                                                               GridBagConstraints.NORTHWEST,
                                                                               GridBagConstraints.NONE,
                                                                               panelInsets, 0, 0 );
    private GridBagConstraints advToolsPanelInternalGbc = new GridBagConstraints( 0, GridBagConstraints.RELATIVE,
                                                                                  1, 1, 1, 1,
                                                                                  GridBagConstraints.NORTHWEST,
                                                                                  GridBagConstraints.NONE,
                                                                                  new Insets( 0, 10, 0, 10 ), 0, 0 );
    private JPanel advToolPanel;

    /**
     * @param module
     */
    public ToolPanel( final IdealGasModule module ) {
        setLayout( new GridBagLayout() );

        setBorder( new TitledBorder( IdealGasResources.getString( "IdealGasControlPanel.Tools_and_options" ) ) );

        button = new ToggleButton( IdealGasResources.getString( "IdealGasControlPanel.Measurement_Tools_on" ),
                                   IdealGasResources.getString( "IdealGasControlPanel.Measurement_Tools_off" ) ) {
            @Override
						public void onAction() {
                toolsPanel.setVisible( true );
                module.getControlPanel().revalidate();
            }

            @Override
						public void offAction() {
                toolsPanel.setVisible( false );
                module.getControlPanel().revalidate();
            }
        };
        topLevelGbc.fill = GridBagConstraints.NONE;
        topLevelGbc.anchor = GridBagConstraints.CENTER;
        topLevelGbc.insets = buttonInsets;
        add( button, topLevelGbc );

        toolsPanelInternalGbc.insets = panelInsets;
        toolsPanel.add( new MeasurementToolsControls.PressureSliceControl( module ), toolsPanelInternalGbc );
        toolsPanel.add( new MeasurementToolsControls.RulerControl( module ), toolsPanelInternalGbc );
        toolsPanel.add( new MeasurementToolsControls.SpeciesMonitorControl( module ), toolsPanelInternalGbc );
        toolsPanel.add( new MeasurementToolsControls.StopwatchControl( module ), toolsPanelInternalGbc );
        toolsPanel.add( new MeasurementToolsControls.HistogramControlPanel( module ), toolsPanelInternalGbc );
        toolsPanel.add( new MeasurementToolsControls.CmLinesControl( module ), toolsPanelInternalGbc );
        toolsPanel.setBorder( BorderFactory.createEtchedBorder() );
        toolsPanel.setVisible( false );
        topLevelGbc.insets = panelInsets;
        topLevelGbc.gridy++;
        topLevelGbc.fill = GridBagConstraints.HORIZONTAL;
        add( toolsPanel, topLevelGbc );

        ToggleButton advButton = new ToggleButton( IdealGasResources.getString( "IdealGasControlPanel.MoreOptions" ),
                                                   IdealGasResources.getString( "IdealGasControlPanel.FewerOptions" ) ) {
            @Override
						public void onAction() {
                advToolPanel.setVisible( true );
                module.getControlPanel().revalidate();
            }

            @Override
						public void offAction() {
                advToolPanel.setVisible( false );
                module.getControlPanel().revalidate();
            }
        };

        topLevelGbc.fill = GridBagConstraints.NONE;
        topLevelGbc.anchor = GridBagConstraints.CENTER;
        topLevelGbc.insets = buttonInsets;
        topLevelGbc.gridy++;
        add( advButton, topLevelGbc );

        advToolPanel = new JPanel( new GridBagLayout() );
        advToolPanel.add( new MeasurementToolsControls.ParticleInteractionControl( module.getIdealGasModel() ), advToolsPanelInternalGbc );
        Pump[] pumps = new Pump[]{module.getPump()};
        advToolPanel.add( new InputTemperatureControlPanel( module, pumps ), advToolsPanelInternalGbc );
        advToolPanel.setBorder( BorderFactory.createEtchedBorder() );

        advToolPanel.setVisible( false );
        topLevelGbc.insets = panelInsets;
//        topLevelGbc.insets = optionInsets;
        topLevelGbc.anchor = GridBagConstraints.NORTHWEST;
        topLevelGbc.fill = GridBagConstraints.HORIZONTAL;
        topLevelGbc.gridy++;
        add( advToolPanel, topLevelGbc );
    }
}
