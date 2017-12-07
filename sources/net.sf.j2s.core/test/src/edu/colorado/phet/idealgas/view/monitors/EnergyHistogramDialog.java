// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 47772 $
 * Date modified : $Date: 2011-01-07 13:53:07 -0600 (Fri, 07 Jan 2011) $
 */
package edu.colorado.phet.idealgas.view.monitors;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.Frame;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.util.ArrayList;
import java.util.List;

import javax.swing.JButton;
import javax.swing.JDialog;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.Timer;

import edu.colorado.phet.common.mechanics.Body;
import edu.colorado.phet.common.phetcommon.math.MathUtil;
import edu.colorado.phet.common.phetgraphics.view.util.GraphicsState;
import edu.colorado.phet.idealgas.IdealGasResources;
import edu.colorado.phet.idealgas.instrumentation.Histogram;
import edu.colorado.phet.idealgas.model.GasMolecule;
import edu.colorado.phet.idealgas.model.HeavySpecies;
import edu.colorado.phet.idealgas.model.IdealGasModel;
import edu.colorado.phet.idealgas.model.LightSpecies;

/**
 * A non-modal dialog that shows histograms of energy and average speed of the particles in
 * an IdealGasModel.
 * 
 * This dialog extends JDialog instead of PaintImmediateDialog because the histogram
 * implementation is multi-threaded. Do NOT extend PaintImmediateDialog, see #2147.
 */
@SuppressWarnings("serial")
public class EnergyHistogramDialog extends JDialog /* Do NOT extend PaintImmediateDialog, see #2147 */ {

    //----------------------------------------------------------------
    // Instance fields
    //----------------------------------------------------------------

    private Histogram energyHistogram;
    // Number of energyHistogram updates between times it will be displayed and then
    // the data cleared
    private int averagingRatio = 4;
    // Bin count beyond which the energyHistogram will clip
    private int initialEnergyClippingLevel = 50;
    private int initialSpeedClippingLevel = 20;
    // Upper bounds for histograms
    private double maxKineticEnergy = 150E3;
    private double maxSpeed = 200;
    private Histogram speedHistogram;
    private Histogram heavySpeedHistogram;
    private Histogram lightSpeedHistogram;
    private boolean showDetails;
    private JButton detailsBtn;
    private JLabel lightSpeedLabel;
    private JLabel heavySpeedLabel;
    private IdealGasModel model;
    private RotatedTextLabel heavySpeedYLabel;
    private RotatedTextLabel lightSpeedYLabel;
    private Updater updater;

    // Out-of-range indicator fields
    private String inRangeIndicator = "  ";
    private String outOfRangeIndicator = ">>";
    private JLabel energyOutOfRangeIndicator = new JLabel( outOfRangeIndicator );
    private JLabel speedOutOfRangeIndicator = new JLabel( outOfRangeIndicator );
    private JLabel heavySpeciesSpeedOutOfRangeIndicator = new JLabel( outOfRangeIndicator );
    private JLabel lightSpeciesSpeedOutOfRangeIndicator = new JLabel( outOfRangeIndicator );
    private JLabel outOfRangeIndicatorLegend1 = new JLabel( outOfRangeIndicator );
    private JLabel outOfRangeIndicatorLegend2 = new JLabel(
            new String( " - " ).concat( IdealGasResources.getString( "EnergyHistorgramDialog.OutOfRangeIndicatorLegend" ) ) );
    //private Font outOfRangeIndicatorFont;
    private String[] speedDetailsLegends = new String[]{
            IdealGasResources.getString( "EnergyHistorgramDialog.Heavy_Speed_label" ),
            IdealGasResources.getString( "EnergyHistorgramDialog.Light_Speed_label" )
    };


    /**
     * @param owner
     * @param model
     */
    public EnergyHistogramDialog( Frame owner, IdealGasModel model ) {
        super( owner );
        this.model = model;
        this.setTitle( IdealGasResources.getString( "EnergyHistorgramDialog.Title" ) );
        addWindowListener( new WindowAdapter() {
            @Override
						public void windowClosing( WindowEvent e ) {
                updater.setRunning( false );
            }
        } );

        // Create the histograms
        energyHistogram = new Histogram( 200, 150, 0, maxKineticEnergy * 1.01, 20, initialEnergyClippingLevel * averagingRatio, new Color( 0, 0, 0 ) );
        speedHistogram = new Histogram( 200, 150, 0, maxSpeed * 1.01, 20, initialSpeedClippingLevel * averagingRatio, new Color( 0, 0, 0 ) );
        heavySpeedHistogram = new Histogram( 200, 150, 0, maxSpeed * 1.01, 20, initialSpeedClippingLevel * averagingRatio, new Color( 20, 0, 200 ) );
        lightSpeedHistogram = new Histogram( 200, 150, 0, maxSpeed * 1.01, 20, initialSpeedClippingLevel * averagingRatio, new Color( 200, 0, 20 ) );

        // Add a button for hiding/displaying the individual species
        detailsBtn = new JButton();
        detailsBtn.addActionListener( new ActionListener() {
            @Override
						public void actionPerformed( ActionEvent e ) {
                showDetails = !showDetails;
                hideShowDetails();
            }
        } );
        this.layoutComponents();
        this.setDefaultCloseOperation( JDialog.DISPOSE_ON_CLOSE );
        hideShowDetails();

        this.pack();

        // Add a listener for the close event that gets rid of this dialog
        this.addWindowListener( new WindowAdapter() {
            @Override
						public void windowClosing( WindowEvent evt ) {
                JDialog dlg = (JDialog)evt.getSource();
                // Hide the frame and dispose it
                dlg.setVisible( false );
                dlg.dispose();
            }
        } );

        // Create and start updaters for the histograms
        updater = new Updater( model );
        updater.addClient( new EnergyUpdaterClient( model, energyHistogram ) );
        updater.addClient( new SpeedUpdaterClient( speedHistogram ) );
        updater.addClient( new SpeciesSpeedUpdaterClient( HeavySpecies.class, heavySpeedHistogram ) );
        updater.addClient( new SpeciesSpeedUpdaterClient( LightSpecies.class, lightSpeedHistogram ) );
        updater.start();
    }

    /**
     * Allows a client to set the names of the individual species as they are shown on the
     * details histograms
     */
    public void setSpeedDetailsLegends( String[] legends, Color[] colors ) {
        speedDetailsLegends = legends;
        heavySpeedLabel.setText( legends[0] );
        lightSpeedLabel.setText( legends[1] );
        heavySpeedHistogram.setColor( colors[0] );
        lightSpeedHistogram.setColor( colors[1] );
    }

    private void hideShowDetails() {
        heavySpeedHistogram.setVisible( showDetails );
        heavySpeedLabel.setVisible( showDetails );
        lightSpeedHistogram.setVisible( showDetails );
        lightSpeedLabel.setVisible( showDetails );
        heavySpeedYLabel.setVisible( showDetails );
        lightSpeedYLabel.setVisible( showDetails );
        if( showDetails ) {
            detailsBtn.setText( IdealGasResources.getString( "EnergyHistorgramDialog.Fewer_Details" ) );
        }
        else {
            detailsBtn.setText( IdealGasResources.getString( "EnergyHistorgramDialog.More_Details" ) );
        }
        pack();
        //Workaround to make sure the panel doesn't go offscreen e.g. at 1024x768
        if( getHeight() > Toolkit.getDefaultToolkit().getScreenSize().height ) {
            setSize( getWidth(), Toolkit.getDefaultToolkit().getScreenSize().height );
            validate();//without calling validate, scroll bars don't appear (on Windows)
        }
        repaint();
    }

    /**
     * @param g
     */
    @Override
		public void paint( Graphics g ) {
        // Determine if the out of range indicator should be displayed
        energyOutOfRangeIndicator.setText( energyHistogram.hasDataOutOfRange() ? outOfRangeIndicator : inRangeIndicator );
        speedOutOfRangeIndicator.setText( speedHistogram.hasDataOutOfRange() ? outOfRangeIndicator : inRangeIndicator );
        lightSpeciesSpeedOutOfRangeIndicator.setText( lightSpeedHistogram.hasDataOutOfRange() ? outOfRangeIndicator : inRangeIndicator );
        heavySpeciesSpeedOutOfRangeIndicator.setText( heavySpeedHistogram.hasDataOutOfRange() ? outOfRangeIndicator : inRangeIndicator );

        super.paint( g );
    }

    /**
     *
     */
    private void layoutComponents() {
        Insets defaultInsets = new Insets( 0, 0, 0, 0 );
        Insets xAxisTitleInsets = new Insets( 0, 0, 12, 0 );
        Insets outOfBoundsAnnunciatorInsets = new Insets( 0, 0, 12, 20 );

        JPanel contentPane = new JPanel();
        contentPane.setLayout( new GridBagLayout() );
        GridBagConstraints gbc = new GridBagConstraints( 0, 0, 1, 1, 1, 1,
                                                         GridBagConstraints.CENTER,
                                                         GridBagConstraints.NONE,
                                                         defaultInsets, 0, 0 );

        // Set the legends for the speed histograms for individual species
        heavySpeedLabel = new JLabel( speedDetailsLegends[0] );
        lightSpeedLabel = new JLabel( speedDetailsLegends[1] );

        // Upper histogram
        //outOfRangeIndicatorFont = new PhetFont( Font.BOLD, 30 );

        gbc.anchor = GridBagConstraints.CENTER;
        gbc.insets = defaultInsets;
        gbc.gridx = 0;
        contentPane.add( new RotatedTextLabel(), gbc );
        gbc.gridx = 1;
        gbc.gridwidth = 1;
        contentPane.add( energyHistogram, gbc );
        gbc.gridy++;
        gbc.gridwidth = 1;
        gbc.insets = xAxisTitleInsets;
        contentPane.add( new JLabel( IdealGasResources.getString( "EnergyHistorgramDialog.Energy_Distribution" ) ), gbc );
        gbc.anchor = GridBagConstraints.WEST;
        gbc.gridx = 2;
        gbc.insets = outOfBoundsAnnunciatorInsets;
        energyOutOfRangeIndicator.setForeground( Color.red );
        contentPane.add( energyOutOfRangeIndicator, gbc );

        // Second histogram
        gbc.anchor = GridBagConstraints.CENTER;
        gbc.insets = defaultInsets;
        gbc.gridx = 0;
        gbc.gridy++;
        contentPane.add( new RotatedTextLabel(), gbc );
        gbc.gridx = 1;
        contentPane.add( speedHistogram, gbc );
        contentPane.add( new RotatedTextLabel(), gbc );
        gbc.gridy++;
        gbc.insets = xAxisTitleInsets;
        contentPane.add( new JLabel( IdealGasResources.getString( "EnergyHistorgramDialog.Speed_Distribution" ) ), gbc );
        gbc.gridx = 2;
        gbc.insets = outOfBoundsAnnunciatorInsets;
        speedOutOfRangeIndicator.setForeground( Color.red );
        contentPane.add( speedOutOfRangeIndicator, gbc );

        // Details histograms
        gbc.insets = defaultInsets;
        gbc.gridy++;
        gbc.gridx = 0;
        heavySpeedYLabel = new RotatedTextLabel();
        contentPane.add( heavySpeedYLabel, gbc );
        gbc.gridx = 1;
        contentPane.add( heavySpeedHistogram, gbc );
        gbc.gridy++;
        gbc.insets = xAxisTitleInsets;
        contentPane.add( heavySpeedLabel, gbc );
        gbc.gridx++;
        gbc.insets = outOfBoundsAnnunciatorInsets;
        heavySpeciesSpeedOutOfRangeIndicator.setForeground( Color.red );
        contentPane.add( heavySpeciesSpeedOutOfRangeIndicator, gbc );

        gbc.insets = defaultInsets;
        gbc.gridy++;
        gbc.gridx = 0;
        lightSpeedYLabel = new RotatedTextLabel();
        contentPane.add( lightSpeedYLabel, gbc );
        gbc.gridx = 1;
        contentPane.add( lightSpeedHistogram, gbc );
        gbc.gridy++;
        gbc.insets = xAxisTitleInsets;
        contentPane.add( lightSpeedLabel, gbc );
        gbc.gridx++;
        gbc.insets = outOfBoundsAnnunciatorInsets;
        lightSpeciesSpeedOutOfRangeIndicator.setForeground( Color.red );
        contentPane.add( lightSpeciesSpeedOutOfRangeIndicator, gbc );

        // Legend and Details button
        gbc.gridy++;
        gbc.gridx = 0;
        gbc.anchor = GridBagConstraints.EAST;
        gbc.insets = new Insets( 0, 25, 0, 0 );
        outOfRangeIndicatorLegend1.setForeground( Color.red );
        contentPane.add( outOfRangeIndicatorLegend1, gbc );
        gbc.gridx++;
        gbc.anchor = GridBagConstraints.WEST;
        gbc.insets = defaultInsets;
        outOfRangeIndicatorLegend2.setForeground( Color.black );
        contentPane.add( outOfRangeIndicatorLegend2, gbc );
        gbc.gridy++;
        gbc.gridx = 1;
        gbc.anchor = GridBagConstraints.CENTER;
        gbc.insets = new Insets( 10, 10, 10, 10 );
        contentPane.add( detailsBtn, gbc );

        setContentPane( new JScrollPane( contentPane ) );
    }

    //----------------------------------------------------------------
    // Inner classes
    //----------------------------------------------------------------

    /**
     * A thread that updates the client objects that record attributes of objects in the
     * model. At specific intervals, it causes the histogram display to repaint.
     */
    private class Updater {
        private IdealGasModel model;
        private List<UpdaterClient> clients = new ArrayList<UpdaterClient>();
        private boolean running = false;
        int cnt = 0;
				private Timer timer;

        Updater( IdealGasModel model ) {
            this.model = model;
        }
        
        
        // BH optimization using a simple 200-ms timer for this instead of Thread.sleep(200) 
        
        protected void start() {
          running = true;
        	timer = new Timer(200, new ActionListener() {
						@Override
						public void actionPerformed(ActionEvent e) {
							updateNow();							
						}});
        	timer.start();
        }

        protected void updateNow() {
          // If the dialog isn't visible, don't go through the work of
          // collecting the information
        	if (!running)
        		return;
          if( EnergyHistogramDialog.this.isVisible() ) {
              // If we are at the first iteration of an averaging cycle, clear the data from the energyHistogram
              // and compute the new clipping level
              if( ( cnt % averagingRatio ) == 1 ) {
                for(int i = clients.size(); --i >= 0;) {
                      UpdaterClient client = clients.get( i );
                      client.clear();
                  }
              }
              List<GasMolecule> molecules = model.getGasMolecules();
              for( int i = molecules.size(); --i >= 0; ) {
                  GasMolecule m = molecules.get( i );
                      for(int j = clients.size(); --j >= 0;) {
                          UpdaterClient client = clients.get( j );
                          client.recordBody( m );
                      }
              }

              // Force a redraw
              if( ( cnt++ % averagingRatio ) == 0 ) {
                  EnergyHistogramDialog.this.repaint();
              }
          }
				}

				void addClient( UpdaterClient client ) {
            clients.add( client );
        }

//        public synchronized boolean isRunning() {
//            return running;
//        }

        public synchronized void setRunning( boolean running ) {
        	// only on closing; only FALSE
            this.running = running;
            if (!running) {
            	timer.stop();
            	timer = null;
            }
        }

//        public void run() {
//            while( isRunning() ) {
//                try {
//                    Thread.sleep( 200 );
//
//                    // If the dialog isn't visible, don't go through the work of
//                    // collecting the information
//                    if( EnergyHistogramDialog.this.isVisible() ) {
//                        // If we are at the first iteration of an averaging cycle, clear the data from the energyHistogram
//                        // and compute the new clipping level
//                        if( ( cnt % averagingRatio ) == 1 ) {
//                            for( int i = 0; i < clients.size(); i++ ) {
//                                UpdaterClient client = (UpdaterClient)clients.get( i );
//                                client.clear();
//                            }
//                        }
//                        List bodies = model.getBodies();
//                        for( int i = 0; i < bodies.size(); i++ ) {
//                            Body body = (Body)bodies.get( i );
//                            if( body instanceof GasMolecule ) {
//                                for( int j = 0; j < clients.size(); j++ ) {
//                                    UpdaterClient client = (UpdaterClient)clients.get( j );
//                                    client.recordBody( body );
//                                }
//                            }
//                        }
//
//                        // Force a redraw
//                        if( ( cnt++ % averagingRatio ) == 0 ) {
//                            EnergyHistogramDialog.this.repaint();
//                        }
//                    }
//                }
//                catch( InterruptedException e ) {
//                    e.printStackTrace();
//                }
//            } // while( isRunning() )
//        }
    }

    //----------------------------------------------------------------
    // Updater clients. These classes update a histogram's information
    //----------------------------------------------------------------

    private abstract class UpdaterClient {
        Histogram histogram;

        UpdaterClient( Histogram histogram ) {
            this.histogram = histogram;
        }

        void clear() {
            histogram.clear();
            histogram.setClippingLevel( this.getClippingLevel() );
        }

        void recordBody( Body body ) {
            histogram.add( getBodyAttribute( body ) );
        }

        abstract int getClippingLevel();

        abstract double getBodyAttribute( Body body );
    }

    private class EnergyUpdaterClient extends UpdaterClient {
        private IdealGasModel model;

        EnergyUpdaterClient( IdealGasModel model, Histogram histogram ) {
            super( histogram );
            this.model = model;
        }

        @Override
				protected double getBodyAttribute( Body body ) {
            return body.getKineticEnergy();
        }

        @Override
				protected int getClippingLevel() {
            int cl = averagingRatio * Math.max( model.getGasMolecules().size() / 3,
                                                initialEnergyClippingLevel );
            return cl;
        }
    }

    private class SpeedUpdaterClient extends UpdaterClient {
        SpeedUpdaterClient( Histogram histogram ) {
            super( histogram );
        }

        @Override
				protected double getBodyAttribute( Body body ) {
            return body.getSpeed();
        }

        @Override
				protected int getClippingLevel() {
            int cl = averagingRatio * Math.max( model.getGasMolecules().size() / 5,
                                                initialSpeedClippingLevel );
            return cl;
        }
    }

    private class SpeciesSpeedUpdaterClient extends SpeedUpdaterClient {
        private Class<?> species;

        SpeciesSpeedUpdaterClient( Class<?> species, Histogram histogram ) {
            super( histogram );
            this.species = species;
        }

        @Override
				protected double getBodyAttribute( Body body ) {
            if( species.isInstance( body ) ) {
                return body.getSpeed();//super.getBodyAttribute( body );
            }
            else {
                return -1;
            }
        }
    }

    //----------------------------------------------------------------
    // Misc inner classes
    //----------------------------------------------------------------

    /**
     * Class<?> for labels of the y axes
     */
    private static class RotatedTextLabel extends JPanel {
        public RotatedTextLabel() {
            super( null );
            setPreferredSize( new Dimension( 20, 150 ) );
        }

        @Override
				public void paint( Graphics g ) {
            Graphics2D g2 = (Graphics2D)g;
            GraphicsState gs = new GraphicsState( g2 );
            JLabel dummyLabel = new JLabel();
            Font font = dummyLabel.getFont();
            int x = 20;
            int y = 150;
            g2.transform(MathUtil.setToRotation(null, -Math.PI / 2.0, x, y )); // BH optimize out new
            g2.setFont( font );
            g2.drawString( IdealGasResources.getLocalizedString( "chart.label.number.of.particles" ), x, y );
            gs.restoreGraphics();
        }
    }
}
