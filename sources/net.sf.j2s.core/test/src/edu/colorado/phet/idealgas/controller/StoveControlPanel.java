// Copyright 2002-2011, University of Colorado

/**
 * Class: StoveControlPanel
 * Package: edu.colorado.phet.idealgas.controller
 * Author: Another Guy
 * Date: Oct 4, 2004
 */
package edu.colorado.phet.idealgas.controller;

import edu.colorado.phet.common.phetgraphics.view.phetcomponents.PhetJComponent;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.GraphicLayerSet;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetGraphic;
import edu.colorado.phet.idealgas.IdealGasResources;
import edu.colorado.phet.idealgas.model.IdealGasModel;

import javax.swing.*;
import javax.swing.border.BevelBorder;
import javax.swing.border.Border;
import javax.swing.border.EtchedBorder;
import javax.swing.border.TitledBorder;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.Hashtable;

public class StoveControlPanel extends GraphicLayerSet {
    private static final int s_stoveSliderHeight = 60;

    public StoveControlPanel( final IdealGasModule module ) {

        // This panel will be put on the ApparatusPanel, which has a null LayoutManager.
        // When a JPanel is added to a JPanel with a null LayoutManager, the nested panel
        // doesn't lay out properly if it is at all complicated. To get it to lay out properly,
        // it must be put into an intermediate JPanel with a simple layout manager (in this case
        // we use the default), and that intermediate panel is then added to the ApparatusPanel.
        JPanel stovePanel = new JPanel();
        int maxStoveSliderValue = 40;
        final JSlider stoveSlider = new JSlider( JSlider.VERTICAL, -maxStoveSliderValue,
                                                 maxStoveSliderValue, 0 );
        stoveSlider.setMajorTickSpacing( maxStoveSliderValue );
        stoveSlider.setMinorTickSpacing( 10 );
        stoveSlider.setSnapToTicks( true );
        Hashtable<Number, JLabel> labelTable = new Hashtable<Number, JLabel>();
        labelTable.put( new Integer( -40 ), new JLabel( IdealGasResources.getString( "Common.Remove" ) ) );
        labelTable.put( new Integer( 0 ), new JLabel( IdealGasResources.getString( "Common.0" ) ) );
        labelTable.put( new Integer( 40 ), new JLabel( IdealGasResources.getString( "Common.Add" ) ) );
        stoveSlider.setLabelTable( labelTable );
        stoveSlider.setPaintTicks( true );
        stoveSlider.setSnapToTicks( true );
        stoveSlider.setPaintLabels( true );
        stoveSlider.setPreferredSize( new Dimension( 100, s_stoveSliderHeight ) );
        stoveSlider.addChangeListener( new ChangeListener() {
            @Override
						public void stateChanged( ChangeEvent event ) {
                module.setStove( stoveSlider.getValue() );
            }
        } );
        stoveSlider.addMouseListener( new MouseAdapter() {
            @Override
						public void mouseReleased( MouseEvent e ) {
                stoveSlider.setValue( 0 );
            }
        } );

        Border border = new TitledBorder( new EtchedBorder( BevelBorder.RAISED,
                                                            new Color( 40, 20, 255 ),
                                                            Color.black ),
                                          IdealGasResources.getString( "IdealGasControlPanel.Heat_Control" ) );
        stovePanel.setBorder( border );
        stovePanel.setPreferredSize( new Dimension( 115, 85 ) );
        Color background = new Color( 240, 230, 255 );
        stovePanel.setBackground( background );
        PhetGraphic panelPJC = PhetJComponent.newInstance( module.getApparatusPanel(), stovePanel );
        this.addGraphic( panelPJC );

        stoveSlider.setBackground( background );
        PhetGraphic sliderPJC = PhetJComponent.newInstance( module.getApparatusPanel(), stoveSlider );
        /**
         * @j2sIgnore
         */
        {
        	sliderPJC.setCursorHand();
        }
        this.addGraphic( sliderPJC );
        sliderPJC.setLocation2( 10, 20 );

        // Add a listener to the model that will disable the slider when the model is in contant temperature mode
        final IdealGasModel model = module.getIdealGasModel();
        model.addChangeListener( new IdealGasModel.ChangeListener() {
            @Override
						public void stateChanged( IdealGasModel.ChangeEvent event ) {
                if( model.getConstantProperty() == IdealGasModel.CONSTANT_TEMPERATURE ) {
                    stoveSlider.setEnabled( false );
                }
                else {
                    stoveSlider.setEnabled( true );
                }
            }
        } );
    }

}
