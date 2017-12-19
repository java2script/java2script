// Copyright 2002-2011, University of Colorado

/**
 * Created by IntelliJ IDEA.
 * User: Another Guy
 * Date: Jan 15, 2003
 * Time: 1:56:39 PM
 * To change this template use Options | File Templates.
 */
package edu.colorado.phet.idealgas.util;


import edu.colorado.phet.common.phetcommon.model.clock.Clock;

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;
import java.util.List;

/**
 * Records by recording events in which a scalar data is
 * recorded at specific time intervals.
 * <p/>
 * The recorder maintains an internal thread that computes the "dataTotal"
 * every 1/2 second.
 */
public class ScalarDataRecorder {
    private List<DataRecordEntry> dataRecord = new ArrayList<DataRecordEntry>();
    private double dataTotal;
    private double dataAverage;
    // Size, in milliseconds, of the sliding window over which samples are averaged
    private double timeWindow = 5;
    private double timeSpanOfEntries;
    private Clock clock;

    public ScalarDataRecorder( Clock clock ) {
        this.clock = clock;
    }

    public ScalarDataRecorder( Clock clock, int updatePeriod ) {
        this.clock = clock;
        new PeriodicDataComputer( updatePeriod ).start();
    }

    public void clear() {
        dataRecord.removeAll( dataRecord );
    }

    public double getDataTotal() {
        return dataTotal;
    }

    public double getDataAverage() {
        return dataAverage;
    }

    public double getTimeWindow() {
        return timeWindow;
    }

    public double getTimeSpanOfEntries() {
        return timeSpanOfEntries;
    }

    public synchronized void computeDataStatistics() {
        double currTime = clock.getSimulationTime();
//        double currTime = clock.getRunningTime();

        // Remove entries from the data record that have aged out of the time window
        if( dataRecord.size() > 0 ) {
            double startTime = dataRecord.get( 0 ).getTime();
            while( dataRecord.size() > 0 && currTime - startTime > timeWindow ) {
                dataRecord.remove( 0 );
                if( dataRecord.size() > 0 ) {
                    startTime = dataRecord.get( 0 ).getTime();
                }
            }
        }
        dataTotal = 0;
        for( int i = 0; i < dataRecord.size(); i++ ) {
            DataRecordEntry entry = dataRecord.get( i );
            dataTotal += entry.getValue();
        }
        dataAverage = 0;
        if( dataRecord.size() > 0 ) {
            double timeOfFirstEntry = dataRecord.get( 0 ).getTime();
            double timeOfLastEntry = dataRecord.get( dataRecord.size() - 1 ).getTime();
            timeSpanOfEntries = timeOfLastEntry - timeOfFirstEntry;
            dataAverage = dataTotal / dataRecord.size();
        }
    }

    /**
     *
     */
    public synchronized void addDataRecordEntry( double value ) {
        DataRecordEntry entry = new DataRecordEntry( clock.getSimulationTime(), value );
//        DataRecordEntry entry = new DataRecordEntry( clock.getRunningTime(), value );
        dataRecord.add( entry );
    }

    public int getNumEntries() {
        return this.dataRecord.size();
    }

    public void setTimeWindow( double timeWindow ) {
        this.timeWindow = timeWindow;
    }

    //
    // Inner classes
    //

    /**
     * Class<?> for entries in the time-based dataTotal record list
     */
    private class DataRecordEntry {

        private double time;
        private double value;

        DataRecordEntry( double time, double value ) {
            this.time = time;
            this.value = value;
        }

        public double getTime() {
            return time;
        }

        public double getValue() {
            return value;
        }
    }

    /**
     *
     */
    private class PeriodicDataComputer {
        Timer timer;
//        Clock clock;

        public PeriodicDataComputer( int updatePeriod ) {
            this.timer = new Timer( updatePeriod, new ActionListener() {
                @Override
								public void actionPerformed( ActionEvent e ) {
                    computeDataStatistics();
                }
            } );
        }

        public synchronized void start() {
            timer.start();
        }
    }
}
