// Copyright 2002-2011, University of Colorado

/**
 * Created by IntelliJ IDEA.
 * User: Another Guy
 * Date: Mar 4, 2003
 * Time: 1:33:50 PM
 * To change this template use Options | File Templates.
 */
package edu.colorado.phet.idealgas.controller;

import edu.colorado.phet.idealgas.IdealGasConfig;
import edu.colorado.phet.idealgas.IdealGasResources;
import edu.colorado.phet.idealgas.model.HotAirBalloon;

import javax.swing.*;
import javax.swing.border.TitledBorder;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.util.Hashtable;

public class HotAirBalloonControlPanel extends JPanel {

    private HotAirBalloon hotAirBalloon;

    public HotAirBalloonControlPanel( HotAirBalloon hotAirBalloon ) {
        this.hotAirBalloon = hotAirBalloon;
        addHotAirBallonControls();
    }

    /**
     * Create a panel for controlling the stove
     */
    private void addHotAirBallonControls() {
        JPanel stovePanel = this;

        JPanel iconPanel = new JPanel( new GridLayout( 2, 1 ) );
        BufferedImage stoveAndFlameImage = IdealGasResources.getImage( IdealGasConfig.STOVE_AND_FLAME_ICON_FILE );
        BufferedImage stoveImage = IdealGasResources.getImage( IdealGasConfig.STOVE_ICON_FILE );
        Icon stoveAndFlameIcon = new ImageIcon( stoveAndFlameImage );
        Icon stoveIcon = new ImageIcon( stoveImage );
        iconPanel.add( new JLabel( stoveAndFlameIcon ) );
        iconPanel.add( new JLabel( stoveIcon ) );
        stovePanel.add( iconPanel );
        iconPanel.setPreferredSize( new Dimension( 24, 50 ) );

        final JSlider stoveSlider = new JSlider( JSlider.VERTICAL, 0, 30, 0 );
        stoveSlider.setMajorTickSpacing( 5 );
        stoveSlider.setSnapToTicks( true );
        Hashtable<Number, JLabel> labelTable = new Hashtable<Number, JLabel>();
        labelTable.put( new Integer( 0 ), new JLabel( IdealGasResources.getString( "Common.0" ) ) );
        labelTable.put( new Integer( 30 ), new JLabel( IdealGasResources.getString( "Common.Add" ) ) );
        stoveSlider.setLabelTable( labelTable );
        stoveSlider.setPaintTicks( true );

        stoveSlider.setPaintLabels( true );

        stoveSlider.setPreferredSize( new Dimension( 76, 50 ) );
        stoveSlider.addChangeListener( new ChangeListener() {
            @Override
						public void stateChanged( ChangeEvent event ) {
                setHotAirBalloonHeat( stoveSlider.getValue() );
            }
        } );
        hotAirBalloon.addChangeListener( new HotAirBalloon.ChangeListener() {
            @Override
						public void heatSourceChanged( HotAirBalloon.ChangeEvent event ) {
                stoveSlider.setValue( (int)event.getHotAirBalloon().getHeatSource() );
            }
        } );
        stovePanel.add( stoveSlider );

        stovePanel.setBorder( new TitledBorder( IdealGasResources.getString( "ModuleTitle.HotAirBalloon" ) ) );
    }


    /**
     *
     */
    private void setHotAirBalloonHeat( int value ) {
        hotAirBalloon.setHeatSource( value );
    }
}
