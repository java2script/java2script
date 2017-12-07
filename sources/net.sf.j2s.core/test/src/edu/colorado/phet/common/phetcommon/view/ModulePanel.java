// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.view;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.Rectangle;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ContainerEvent;
import java.awt.event.ContainerListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;

import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JComponent;
import javax.swing.JDialog;
import javax.swing.JPanel;

import edu.colorado.phet.common.phetcommon.resources.PhetCommonResources;

/**
 * ModulePanel is the main JPanel for a Module in a PhetApplication.
 * It consists of a number of subpanels, whose layout is shown below.
 * All panels are optional (can be null).
 * <p/>
 * Here is the layout of the subpanels:
 * <code>
 * +----------------------------------------+--------------------+
 * |            monitorPanel                |     logoPanel      |
 * +----------------------------------------+--------------------+
 * |                                        |                    |
 * |                                        |                    |
 * |                                        |                    |
 * |          simulationPanel               |   controlPanel     |
 * |                                        |                    |
 * |                                        |                    |
 * |                                        |                    |
 * +----------------------------------------+--------------------+
 * |            clockControlPanel           |     helpPanel      |
 * +----------------------------------------+--------------------+
 * </code>
 *
 * @author Ron LeMaster, Sam Reid, Chris Malley
 */
public class ModulePanel extends JPanel {

    //----------------------------------------------------------------------------
    // Instance data
    //----------------------------------------------------------------------------

    private JPanel leftPanel; // holds the monitorPanel, simulationPanel, and clockControlPanel
    private JComponent monitorPanel;
    private JComponent simulationPanel;
    private JComponent clockControlPanel;

    private JPanel rightPanel; // holds the logoPanel, controlPanel, and helpPanel
    private JComponent logoPanel;
    private JComponent controlPanel;
    private JComponent helpPanel;

    private boolean fullScreen = false;
    private JDialog buttonDlg;
    private JComponent clockControlPanelContainer;

    //----------------------------------------------------------------------------
    // Constructors
    //----------------------------------------------------------------------------

    /**
     * Constructs a new ModulePanel with null contents.
     */
    public ModulePanel() {
        this( null, null, null, null, null, null );
    }

    /**
     * Constructs a new ModulePanel with the specified contents (which may be null).
     *
     * @param monitorPanel
     * @param simulationPanel
     * @param clockControlPanel
     * @param logoPanel
     * @param controlPanel
     * @param helpPanel
     */
    public ModulePanel(
            JComponent monitorPanel, JComponent simulationPanel, JComponent clockControlPanel,
            JComponent logoPanel, JComponent controlPanel, JComponent helpPanel ) {
        setLayout( new BorderLayout() );

        leftPanel = new JPanel( new BorderLayout() );
        add( leftPanel, BorderLayout.CENTER );
        rightPanel = new JPanel( new BorderLayout() );
        add( rightPanel, BorderLayout.EAST );

        setMonitorPanel( monitorPanel );
        setSimulationPanel( simulationPanel );
        setClockControlPanel( clockControlPanel );
        setLogoPanel( logoPanel );
        setControlPanel( controlPanel );
        setHelpPanel( helpPanel );

        addContainerListener( new ContainerListener() {
            @Override
						public void componentAdded( ContainerEvent e ) {
                relayoutAll();
            }

            @Override
						public void componentRemoved( ContainerEvent e ) {
                relayoutAll();
            }
        } );
        relayoutAll();
    }

    /**
     * See #2015, ensure that scaling and layout are updated when bounds change.
     * This must happen synchronously; if you schedule it in a ComponentEvent,
     * you will see the scaling and layout.
     */
    @Override
    public void setBounds( int x, int y, int w, int h ) {
        super.setBounds( x, y, w, h );
        relayoutAll();
    }

    //----------------------------------------------------------------------------
    // Panel accessors
    //----------------------------------------------------------------------------

    /**
     * Sets the monitor panel.
     *
     * @param panel, possibly null
     */
    public void setMonitorPanel( JComponent panel ) {
        if ( monitorPanel != null ) {
            leftPanel.remove( monitorPanel );
        }
        monitorPanel = panel;
        if ( monitorPanel != null ) {
            leftPanel.add( monitorPanel, BorderLayout.NORTH );
        }
    }

    /**
     * Gets the monitor panel.
     *
     * @return the monitor panel.
     */
    public JComponent getMonitorPanel() {
        return monitorPanel;
    }

    /**
     * Sets the simulation panel.
     *
     * @param panel, possibly null
     */
    public void setSimulationPanel( JComponent panel ) {
        if ( simulationPanel != null ) {
            leftPanel.remove( simulationPanel );
        }
        simulationPanel = panel;
        if ( simulationPanel != null ) {
            leftPanel.add( simulationPanel, BorderLayout.CENTER );
        }
    }

    /**
     * Gets the simulation panel.
     *
     * @return the simulation panel
     */
    public JComponent getSimulationPanel() {
        return simulationPanel;
    }

    /**
     * Sets the clock control panel as a top-level container, not embedded in a child.
     *
     * @param panel, possibly null
     */
    public void setClockControlPanelWithoutContainer( JComponent panel ) {
        if ( clockControlPanel != null ) {
            leftPanel.remove( clockControlPanelContainer );
        }
        clockControlPanel = panel;
        if ( panel != null ) {
            clockControlPanelContainer = panel;
            leftPanel.add( clockControlPanelContainer, BorderLayout.SOUTH );
        }
    }

    /**
     * Sets the clock control panel.
     *
     * @param panel, possibly null
     */
    public void setClockControlPanel( final JComponent panel ) {
        if ( clockControlPanel != null ) {
            leftPanel.remove( clockControlPanelContainer );
        }
        clockControlPanel = panel;
        if ( panel != null ) {
            // Embed the clockControlPanel in its own JPanel so that it will be centered.
            // This might cause issues for users that want to get a reference to the southern
            // part of the module panel instead of the control panel itself.
            clockControlPanelContainer = new JPanel();
            clockControlPanelContainer.add( panel );

            //trial workaround for keeping background color consistent
            panel.addPropertyChangeListener( "background", new PropertyChangeListener() {
                @Override
								public void propertyChange( PropertyChangeEvent evt ) {
                    clockControlPanelContainer.setBackground( panel.getBackground() );
                }
            } );
            clockControlPanelContainer.setBackground( panel.getBackground() );
            leftPanel.add( clockControlPanelContainer, BorderLayout.SOUTH );
        }
    }

    /**
     * Gets the clock control panel.
     *
     * @return the clock control panel.
     */
    public JComponent getClockControlPanel() {
        return clockControlPanel;
    }

    /**
     * Set the logo panel.
     *
     * @param panel, possibly null
     */
    public void setLogoPanel( JComponent panel ) {
        if ( logoPanel != null ) {
            rightPanel.remove( logoPanel );
        }
        logoPanel = panel;
        if ( logoPanel != null ) {
            rightPanel.add( logoPanel, BorderLayout.NORTH );
        }
    }

    /**
     * Gets the logo panel.
     *
     * @return the logo panel
     */
    public JComponent getLogoPanel() {
        return logoPanel;
    }

    /**
     * Set the control panel.
     *
     * @param panel, possibly null
     */
    public void setControlPanel( JComponent panel ) {
        if ( controlPanel != null ) {
            rightPanel.remove( controlPanel );
        }
        controlPanel = panel;
        if ( controlPanel != null ) {
            rightPanel.add( controlPanel, BorderLayout.CENTER );
        }
    }

    /**
     * Gets the control panel.
     *
     * @return the control panel
     */
    public JComponent getControlPanel() {
        return controlPanel;
    }

    /**
     * Set the help panel.
     *
     * @param panel, possibly null
     */
    public void setHelpPanel( JComponent panel ) {
        if ( helpPanel != null ) {
            rightPanel.remove( helpPanel );
        }
        helpPanel = panel;
        if ( helpPanel != null ) {
            rightPanel.add( helpPanel, BorderLayout.SOUTH );
        }
    }

    /**
     * Gets the help panel.
     *
     * @return the help panel
     */
    public JComponent getHelpPanel() {
        return helpPanel;
    }

    //----------------------------------------------------------------------------
    // Full-screen feature
    //----------------------------------------------------------------------------

    /**
     * Gets whether the ModulePanel is currently running in full screen.
     *
     * @return whether the ModulePanel is currently running in full screen.
     */
    public boolean isFullScreen() {
        return fullScreen;
    }

    /**
     * Hides everything but the simulationPanel.
     *
     * @param fullScreen
     */
    public void setFullScreen( boolean fullScreen ) {
        if ( fullScreen && !isFullScreen() ) {
            activateFullScreen();
        }
        else if ( !fullScreen && isFullScreen() ) {
            deactivateFullScreen();
        }
    }

    private void deactivateFullScreen() {
        setSimulationPanelOnlyIsVisible( false );
    }

    private void activateFullScreen() {
        setSimulationPanelOnlyIsVisible( true );

        if ( buttonDlg == null ) {
            buttonDlg = new JDialog();
            buttonDlg.setTitle( PhetCommonResources.getInstance().getLocalizedString( "Common.BasicPhetPanel.Title" ) );
            buttonDlg.setDefaultCloseOperation( JDialog.DO_NOTHING_ON_CLOSE );
            ImageIcon logo = new ImageIcon( getClass().getClassLoader().getResource( PhetLookAndFeel.PHET_LOGO_120x50 ) );
            JButton logoButton = new JButton( logo );
            logoButton.setPreferredSize( new Dimension( logo.getIconWidth() + 12, logo.getIconHeight() + 12 ) );
            logoButton.addActionListener( new ActionListener() {
                @Override
								public void actionPerformed( ActionEvent e ) {
                    setFullScreen( false );
                    buttonDlg.setVisible( false );
                }
            } );
            logoButton.setToolTipText( PhetCommonResources.getInstance().getLocalizedString( "Common.BasicPhetPanel.LogoToolTip" ) );
            buttonDlg.getContentPane().setLayout( new FlowLayout( FlowLayout.CENTER ) );
            buttonDlg.getContentPane().add( logoButton );
            Rectangle thisBounds = this.getBounds();
            buttonDlg.pack();
            buttonDlg.setLocation( (int) ( this.getLocationOnScreen().getX() + thisBounds.getMaxX() - buttonDlg.getWidth() ),
                                   (int) ( this.getLocationOnScreen().getY() + thisBounds.getMaxY() - buttonDlg.getHeight() ) );
        }
        buttonDlg.setVisible( true );
        this.fullScreen = true;
    }

    /*
     * Shows/hides all panels except the simulation panel.
     * @param visible true to hide all others, false to show all panels
     */
    private void setSimulationPanelOnlyIsVisible( boolean visible ) {
        setVisible( monitorPanel, !visible );
        setVisible( clockControlPanel, !visible );
        setVisible( logoPanel, !visible );
        setVisible( controlPanel, !visible );
        setVisible( helpPanel, !visible );
    }

    //----------------------------------------------------------------------------
    // Misc.
    //----------------------------------------------------------------------------

    private void setVisible( JComponent component, boolean visible ) {
        if ( component != null ) {
            component.setVisible( visible );
        }
    }

    /*
     * Relayout, revalidate and repaint this ModulePanel.
     * This is necessary when using scrollbars in the control panel.
     */
    private void relayoutAll() {
        //these two lines prevent a scrollbar-sized inset
        // on the right-hand side of the control panel and the right hand side of the simulation panel
        rightPanel.invalidate();
        leftPanel.invalidate();
        invalidate();
        validate();
        doLayout();
        repaint();
    }
}