// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 47772 $
 * Date modified : $Date: 2011-01-07 13:53:07 -0600 (Fri, 07 Jan 2011) $
 */
package edu.colorado.phet.idealgas.instrumentation;

import javax.swing.*;
import java.awt.*;

/**
 * Histogram
 * <p/>
 * The graphical representation of a histogram. The data for the histogram itself is maintained
 * in an instance of HistogramModel, which is contained in a Histogram
 *
 * @author Ron LeMaster
 * @version $Revision: 47772 $
 */

public class Histogram extends JPanel {

    private HistogramModel model;
    private int bucketWidth = 20;
    private int displayWidth = 300;
    private int displayHeight = 200;
    private int clippingLevel;
    private Color color;
    private Point plotULC = new Point( 10, 10 );
    private int maxBuckHeight;
		private Color colorGray = new Color( 230, 230, 230 );
		private Stroke stroke1 = new BasicStroke( 1 );

    /**
     * @param displayWidth   How wide the histogram will appear on the screen, in pixels
     * @param displayHeight  How high the histogram will appear on the screen, in pixels
     * @param lowerBound     The lower bound of data values to be put in the histogram
     * @param upperBound     The upper bound of data values to be put in the histogram
     * @param numBins        The number of bins in the histogram
     * @param clippingHeight The maximum bin count beyond which the histogram will clip
     * @param color          The color of the histogram bars
     */
    public Histogram( int displayWidth, int displayHeight,
                      double lowerBound, double upperBound,
                      int numBins, int clippingHeight,
                      Color color ) {
        this.displayWidth = displayWidth;
        this.displayHeight = displayHeight;
        this.clippingLevel = clippingHeight;
        model = new HistogramModel();
        model.setBounds( lowerBound, upperBound );
        model.setNumIntervals( numBins );
        this.color = color;
        this.bucketWidth = displayWidth / model.getNumIntervals();
        this.maxBuckHeight = displayHeight;
        setPreferredSize( new Dimension( plotULC.x * 2 + displayWidth, plotULC.y * 2 + displayHeight ) );
    }

    /**
     * Sets the color of the bars
     */
    public void setColor( Color color ) {
        this.color = color;
    }

    /**
     * @param g
     */
    @Override
		public void paintComponent( Graphics g ) {
        Graphics2D g2 = (Graphics2D)g;

        // Paint the background
        g2.setColor( Color.WHITE );
        g2.fillRect( plotULC.x, plotULC.y, displayWidth, displayHeight );

        // Draw gray horizontal lines at evenly spaced intervals
        int lineSpacing = 20;
//        int numLines = displayHeight / lineSpacing;
        g2.setColor( colorGray  );
        g2.setStroke( stroke1  );
        int y = displayHeight + plotULC.y;
        for( int i = 0; y > plotULC.y; i++ ) {
            y = displayHeight + plotULC.y - lineSpacing * i * maxBuckHeight / clippingLevel;
            g2.drawLine( plotULC.x, y, plotULC.x + displayWidth, y );
        }

        // Draw the histogram bars
        g2.setColor( color );
        for( int i = 0; i < model.getNumIntervals(); i++ ) {
            int value = model.valueAt( i );
            int bucketHeight = Math.min( value * maxBuckHeight / clippingLevel, maxBuckHeight );

//            int i1 = displayHeight + plotULC.y - bucketHeight;
//            int i2 = displayHeight + plotULC.y;
            g2.fillRect( plotULC.x + i * bucketWidth, displayHeight + plotULC.y - bucketHeight, bucketWidth, bucketHeight );
        }
        g2.setColor( Color.BLACK );
        g2.drawRect( plotULC.x, plotULC.y, displayWidth - 1, displayHeight - 1 );
    }

    /**
     * Adds a datum to the histogram
     *
     * @param datum
     */
    public void add( double datum ) {
        int datumCharacteristic = model.add( datum );
        switch( datumCharacteristic ) {
            case HistogramModel.BELOW_RANGE:
                break;
            case HistogramModel.ABOVE_RANGE:
                break;
        }
    }

    /**
     * Sets the count within a bin beyond which the histogram clips
     *
     * @param clippingLevel
     */
    public void setClippingLevel( int clippingLevel ) {
        this.clippingLevel = clippingLevel;
    }

    /**
     * Clears all data from the histogram
     */
    public void clear() {
        model.clear();
    }

    /**
     * Tells is some data that has been added to the histogram is out
     * of its range
     *
     * @return
     */
    public boolean hasDataOutOfRange() {
        return model.isDataOutOfRange();
    }

    /**
     * Small test program
     *
     * @param args
     */
    public static void main( String[] args ) {
        Histogram histogram = new Histogram( 300, 100, 0, 10, 100, 10, Color.green );

        for( int i = 0; i < 500; i++ ) {
            histogram.add( Math.random() * 10 );
        }

        JFrame frame = new JFrame();
        frame.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE );
        JPanel panel = new JPanel();
        panel.setPreferredSize( new Dimension( 400, 300 ) );
        panel.add( histogram );
        frame.getContentPane().add( panel );
        frame.pack();
        frame.setVisible( true );
    }
}
