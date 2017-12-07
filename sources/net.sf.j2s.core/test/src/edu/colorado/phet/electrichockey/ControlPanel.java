// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.electrichockey;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;

import javax.swing.*;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

public class ControlPanel extends JPanel {
    private ElectricHockeySimulationPanel electricHockeySimulationPanel;
    private JButton startBtn, resetBtn;
    private JButton clearBtn; //pauseBtn;
    private JCheckBox pauseChkBox;
    private boolean toggleTrace, showField;    //togglePause,
    private JCheckBox traceChkBox;
    private JCheckBox fieldGridChkBox;

    private JRadioButton radio0;
    private JRadioButton radio1;
    private JRadioButton radio2;
    private JRadioButton radio3;
    private JLabel difficultyLbl;

    private int nbrTries;
    private JLabel nbrTriesLbl;            //nbr of tries at present level
    private JLabel nbrChargesLbl;        //nbr of charges on the playing field

    private JLabel massLbl;
    private JTextField massText;
    private JSlider massSlider;

    public static final int LEVEL_0 = 0;
    public static final int LEVEL_1 = 1;
    public static final int LEVEL_2 = 2;
    public static final int LEVEL_3 = 3;

    private int levelState;            //0, 1, 2, or 3 depending on BarrierState

    private ButtonGroup btnGroup;

    private JPanel panelTop;
    private JPanel panelLeft, panelMid, panelRight;
    private JPanel panelBottom;
    private JPanel panelBottomLeft, panelBottomRight;

    public ControlPanel( final ElectricHockeySimulationPanel electricHockeySimulationPanel ) {
        this.electricHockeySimulationPanel = electricHockeySimulationPanel;
        startBtn = new JButton( ElectricHockeyStrings.getString( "HockeyControlPanel.Start" ) );
        resetBtn = new JButton( ElectricHockeyStrings.getString( "HockeyControlPanel.Reset" ) );
        nbrTries = 0;
        nbrTriesLbl = new JLabel( ElectricHockeyStrings.getString( "HockeyControlPanel.Tries" ) + nbrTries );

        clearBtn = new JButton( ElectricHockeyStrings.getString( "HockeyControlPanel.Clear" ) );
        //pauseBtn = new JButton("Pause");
        pauseChkBox = new JCheckBox( ElectricHockeyStrings.getString( "HockeyControlPanel.Pause" ), false );
        pauseChkBox.setBackground( Color.yellow );
        //togglePause = true;

        // traceChkBox = new JCheckBox( "Trace ", false ); gmwb - extra space at end of Trace ?
        traceChkBox = new JCheckBox( ElectricHockeyStrings.getString( "HockeyControlPanel.Trace" ), false );
        traceChkBox.setBackground( Color.yellow );
        //traceBtn = new JButton("Trace On");
        toggleTrace = false;

        final JCheckBox positivePuck = new JCheckBox( ElectricHockeyStrings.getString( "HockeyControlPanel.PuckIsPositive" ), true );
        positivePuck.addActionListener( new ActionListener() {
            public void actionPerformed( ActionEvent e ) {
                boolean sel = positivePuck.isSelected();
                Charge c = electricHockeySimulationPanel.getModel().getPuck();
                if ( sel ) {
                    c.setSign( Charge.POSITIVE );
                }
                else {
                    c.setSign( Charge.NEGATIVE );
                }
                electricHockeySimulationPanel.getPlayingField().repaint();
                electricHockeySimulationPanel.getModel().updatePath();
                electricHockeySimulationPanel.getModel().updateForceList();
            }
        } );
        positivePuck.setBackground( Color.yellow );

        fieldGridChkBox = new JCheckBox( ElectricHockeyStrings.getString( "HockeyControlPanel.Field" ), false );
        fieldGridChkBox.setBackground( Color.yellow );
        showField = false;

        final JCheckBox antialiasButton = new JCheckBox( "Antialias", electricHockeySimulationPanel.getFieldGrid().isAntialias() );
        antialiasButton.addActionListener( new ActionListener() {
            public void actionPerformed( ActionEvent e ) {
                electricHockeySimulationPanel.getFieldGrid().setAntialias( antialiasButton.isSelected() );
            }
        } );
        antialiasButton.setBackground( Color.yellow );

        radio0 = new JRadioButton( ElectricHockeyStrings.getString( "HockeyControlPanel.Practice" ), true );
        radio1 = new JRadioButton( "1", false );
        radio2 = new JRadioButton( "2", false );
        radio3 = new JRadioButton( "3", false );

        difficultyLbl = new JLabel( ElectricHockeyStrings.getString( "HockeyControlPanel.Difficulty" ) );

        String str = ElectricHockeyStrings.getString( "HockeyControlPanel.Charges" ) +
                     electricHockeySimulationPanel.getModel().getChargeListSize();

        nbrChargesLbl = new JLabel( str );
        nbrChargesLbl.setBackground( Color.green );

        levelState = LEVEL_0;

        radio0.setBackground( Color.green );
        radio1.setBackground( Color.green );
        radio2.setBackground( Color.green );
        radio3.setBackground( Color.green );

        btnGroup = new ButtonGroup();
        btnGroup.add( radio0 );
        btnGroup.add( radio1 );
        btnGroup.add( radio2 );
        btnGroup.add( radio3 );

        massLbl = new JLabel( ElectricHockeyStrings.getString( "HockeyControlPanel.Mass" ) );
        massLbl.setBackground( Color.green );
        // gmwb - leading space?
        // massText = new JTextField( " 25", 3 );
        // massSlider = new JSlider( 1, 100, 25 );
        int massInitValue = 25;
        massText = new JTextField( Integer.toString( massInitValue ), 3 );
        massSlider = new JSlider( 1, 100, massInitValue );
        massSlider.setMajorTickSpacing( 10 );
        massSlider.setMinorTickSpacing( 1 );
        massSlider.setBackground( Color.green );


        panelTop = new JPanel();
        panelLeft = new JPanel();
        panelMid = new JPanel();
        panelRight = new JPanel();
        panelLeft.setBackground( Color.yellow );
        panelMid.setBackground( Color.yellow );
        panelRight.setBackground( Color.yellow );

        panelBottom = new JPanel();
        panelBottom.setBackground( Color.green );
        panelBottomLeft = new JPanel();
        panelBottomRight = new JPanel();
        panelBottomLeft.setBackground( Color.green );
        panelBottomRight.setBackground( Color.green );

        startBtn.addActionListener( new StartBtnHandler() );
        resetBtn.addActionListener( new ResetBtnHandler() );
        //pauseBtn.addActionListener(new PauseBtnHandler());
        pauseChkBox.addActionListener( new PauseChkBoxHandler() );
        clearBtn.addActionListener( new ClearBtnHandler() );
        traceChkBox.addActionListener( new TraceChkBoxHandler() );
        fieldGridChkBox.addActionListener( new FieldGridChkBoxHandler() );
        massText.addActionListener( new MassTextListener() );
        massSlider.addChangeListener( new SliderHandler() );
        //traceBtn.addActionListener(new TraceBtnHandler());

        resetBtn.setEnabled( false );

        radio0.addItemListener( new LevelBtnHandler() );
        radio1.addItemListener( new LevelBtnHandler() );
        radio2.addItemListener( new LevelBtnHandler() );
        radio3.addItemListener( new LevelBtnHandler() );

        panelLeft.add( startBtn );
        panelLeft.add( resetBtn );
        panelLeft.add( nbrTriesLbl );

        //panelMid.add(pauseBtn);
        panelMid.add( pauseChkBox );
        panelMid.add( clearBtn );

        panelTop.setBackground( Color.yellow );
        panelRight.setBackground( Color.yellow );
        panelRight.add( positivePuck );
        panelRight.add( traceChkBox );
        panelRight.add( fieldGridChkBox );
        panelRight.add( antialiasButton );

        panelBottomLeft.add( radio0 );
        panelBottomLeft.add( difficultyLbl );
        panelBottomLeft.add( radio1 );
        panelBottomLeft.add( radio2 );
        panelBottomLeft.add( radio3 );

        panelBottomLeft.add( nbrChargesLbl );

        panelBottomRight.add( massLbl );
        panelBottomRight.add( massText );
        panelBottomRight.add( massSlider );

        panelTop.setLayout(new WrapLayout());//Prevents some control panel items from disappearing, see #2050

        panelTop.add( panelLeft );
        panelTop.add( panelMid );
        panelTop.add( panelRight );

        panelBottom.setLayout( new GridLayout( 1, 2 ) );
        panelBottom.add( panelBottomLeft );
        panelBottom.add( panelBottomRight );

        setLayout( new GridLayout( 2, 1 ) );
        add( panelTop );
        add( panelBottom );

        resetLevel();
    }

    private class StartBtnHandler implements ActionListener {
        public void actionPerformed( ActionEvent aevt ) {
            resetBtn.setEnabled( true );
            startBtn.setEnabled( false );
            electricHockeySimulationPanel.getModel().startTimer();
        }
    }

    private class ResetBtnHandler implements ActionListener {
        public void actionPerformed( ActionEvent aevt ) {
            electricHockeySimulationPanel.getModel().resetTimer();
            nbrTries += 1;
            setNbrTriesLbl();
            resetBtn.setEnabled( false );
            startBtn.setEnabled( true );
        }
    }


    private class PauseChkBoxHandler implements ActionListener {
        public void actionPerformed( ActionEvent aevt ) {
            //if(aevt.getSource() == pauseBtn){prt("Pause button pushed.");}
            if ( pauseChkBox.isSelected() ) {
                electricHockeySimulationPanel.getModel().stopTimer();
                //togglePause = false;
                //pauseBtn.setText("Unpause");
                startBtn.setEnabled( false );
                resetBtn.setEnabled( false );
                clearBtn.setEnabled( false );
            }
            else {
                electricHockeySimulationPanel.getModel().startTimer();
                //togglePause = true;
                //pauseBtn.setText("Pause");
                startBtn.setEnabled( true );
                resetBtn.setEnabled( true );
                clearBtn.setEnabled( true );
            }
        }
    }

    private class ClearBtnHandler implements ActionListener {
        public void actionPerformed( ActionEvent aevt ) {
            int listLength = electricHockeySimulationPanel.getModel().getChargeListSize();

            for ( int i = ( listLength - 1 ); i >= 0; i-- ) {
                electricHockeySimulationPanel.getModel().removeChargeAt( i );
            }
            electricHockeySimulationPanel.getFieldGrid().updateGridForceArray();

            electricHockeySimulationPanel.getModel().stopTimer();
            electricHockeySimulationPanel.getPlayingField().paintAgain();

        }
    }

    private class TraceChkBoxHandler implements ActionListener {
        public void actionPerformed( ActionEvent aevt ) {
            if ( aevt.getSource() == traceChkBox ) {
                //prt("CheckBox");
                if ( traceChkBox.isSelected() ) {
                    toggleTrace = true;
                    electricHockeySimulationPanel.getModel().setPathStarted( false );
                    electricHockeySimulationPanel.getModel().getPath().reset();
                }
                else {
                    toggleTrace = false;
                }

            }
        }
    }

    private class FieldGridChkBoxHandler implements ActionListener {
        public void actionPerformed( ActionEvent aevt ) {
            if ( aevt.getSource() == fieldGridChkBox ) {
                if ( fieldGridChkBox.isSelected() ) {
                    showField = true;
                    electricHockeySimulationPanel.getPlayingField().paintAgain();
                }
                else {
                    showField = false;
                    electricHockeySimulationPanel.getPlayingField().paintAgain();
                }
            }
        }
    }

    private class LevelBtnHandler implements ItemListener {
        public void itemStateChanged( ItemEvent ie ) {
            if ( ie.getSource() == radio0 ) {
                //prt("Practice pushed");
                levelState = LEVEL_0;
            }
            else if ( ie.getSource() == radio1 ) {
                //prt("Level 1 pushed");
                levelState = LEVEL_1;
            }
            else if ( ie.getSource() == radio2 ) {
                //prt("Level 2 pushed");
                levelState = LEVEL_2;
            }
            else if ( ie.getSource() == radio3 ) {
                //prt("Level 3 pushed");
                levelState = LEVEL_3;
            }
            resetLevel();
            electricHockeySimulationPanel.getPlayingField().paintAgain();
        }

    }

        private void resetLevel() {
            nbrTries = 0;
            setNbrTriesLbl();
            electricHockeySimulationPanel.getModel().setBarrierState( levelState );
        }

    private class MassTextListener implements ActionListener {
        public void actionPerformed( ActionEvent aevt ) {
            if ( aevt.getSource() == massText ) {
                try {
                    double m = Double.parseDouble( massText.getText() );
                    electricHockeySimulationPanel.getModel().setMass( m );
                    if ( m >= 1.0 && m <= 99.0 ) {
                        massSlider.setValue( (int) m );
                    }
                    else if ( m < 1.0 ) {
                        massSlider.setValue( 1 );
                    }
                    else if ( m > 100.0 ) {
                        massSlider.setValue( 99 );
                    }

                }
                catch( NumberFormatException ne ) {
                    ne.printStackTrace();
                }
            }
        }
    }

    private class SliderHandler implements ChangeListener {
        public void stateChanged( ChangeEvent cevt ) {
            if ( cevt.getSource() == massSlider ) {
                int m = (int) massSlider.getValue();
                electricHockeySimulationPanel.getModel().setMass( m );
                massText.setText( new Integer( m ).toString() );
                //prt("Mass is " + hockeyModule.getModel().getMass());
            }
        }
    }

    public boolean getTraceState() {
        return toggleTrace;
    }

    public boolean getShowField() {
        return showField;
    }

    public int getLevelState() {
        return levelState;
    }

    public void setNbrTriesLbl() {
        nbrTriesLbl.setText( ElectricHockeyStrings.getString( "HockeyControlPanel.Tries" ) + new Integer( nbrTries ).toString() );
    }

    public void setNbrChargesLbl( int n ) {
        nbrChargesLbl.setText( ElectricHockeyStrings.getString( "HockeyControlPanel.Charges" ) + new Integer( n ).toString() );
    }

}
