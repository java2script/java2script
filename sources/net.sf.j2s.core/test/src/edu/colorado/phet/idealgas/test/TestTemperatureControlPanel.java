
// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.idealgas.test;

import java.awt.Insets;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.border.TitledBorder;

import edu.colorado.phet.common.phetcommon.view.util.EasyGridBagLayout;

// mockup of proposed solution for #1573
public class TestTemperatureControlPanel extends JFrame {

    private static class TemperatureControlPanel extends JPanel {

        public TemperatureControlPanel() {

            JRadioButton constantRadioButton = new JRadioButton( "constant:" );
            JLabel constantLabel = new JLabel( "300K" );
            JPanel constantPanel = new JPanel();
            constantPanel.add( constantRadioButton );
            constantPanel.add( constantLabel );
            
            JRadioButton customRadioButton = new JRadioButton( "custom:" );
            JSpinner spinner = new JSpinner( new SpinnerNumberModel( 100, 0, 1000, 1 ) );
            JLabel unitsLabel = new JLabel( "K" );
            JPanel customPanel = new JPanel();
            customPanel.add( customRadioButton );
            customPanel.add( spinner );
            customPanel.add( unitsLabel );

            ButtonGroup buttonGroup = new ButtonGroup();
            buttonGroup.add( constantRadioButton );
            buttonGroup.add( customRadioButton );
            constantRadioButton.setSelected( true );

            setBorder( new TitledBorder( "Temperature of new particles" ) );
            EasyGridBagLayout layout = new EasyGridBagLayout( this );
            layout.setInsets( new Insets( 0, 0, 0, 0 ) );
            setLayout( layout );
            int row = 0;
            int column = 0;
            layout.addComponent( constantPanel, row++, column );
            layout.addComponent( customPanel, row++, column );
        }
    }
    
    public static void main( String[] args ) {

        JPanel panel = new JPanel();
        panel.setBorder( new EmptyBorder( 10, 10, 10, 10 ) );
        panel.add( new TemperatureControlPanel() );
        
        JFrame frame = new JFrame();
        frame.getContentPane().add( panel );
        frame.pack();
        frame.setDefaultCloseOperation( WindowConstants.EXIT_ON_CLOSE );
        frame.setVisible( true );
    }
}
