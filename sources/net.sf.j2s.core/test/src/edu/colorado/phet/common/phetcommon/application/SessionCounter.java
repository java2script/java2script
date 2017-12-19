// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.application;

import java.io.File;
import java.security.AccessControlException;

import edu.colorado.phet.common.phetcommon.util.AbstractPropertiesFile;

/**
 * Counts simulation sessions, the number of times a simulation is run.
 * Session counts are persistent, residing in .phet/session-counts.properties in the user's home directory.
 * This information is used by the statistics feature.
 * <p/>
 * This class must be thread safe, because it may be called from different threads.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class SessionCounter {

    /* singleton */
    private static SessionCounter instance;

    private final String project, simulation;
    private final SessionCountsFile file;

    /* singleton */
    private SessionCounter( String project, String simulation ) throws AccessControlException {
        this.project = project;
        this.simulation = simulation;
        this.file = new SessionCountsFile();
    }

    /**
     * Initializes the singleton, making it specific to 1 simulation.
     * If we don't security permissions, initialization results in a null instance.
     *
     * @param project
     * @param simulation
     * @return
     */
    public synchronized static SessionCounter initInstance( String project, String simulation ) {
        if ( instance != null ) {
            throw new RuntimeException( "SessionCounter is already initialized" );
        }
        else {
            try {
                instance = new SessionCounter( project, simulation );
            }
            catch ( AccessControlException e ) {
                instance = null;
                System.out.println( "SessionCounter: cannot create instance, no permissions" );
            }
        }
        return instance;
    }

    /**
     * Return the singleton instance.
     * This will be null if we don't have access to the local file system.
     *
     * @return
     */
    public synchronized static SessionCounter getInstance() {
        return instance;
    }

    /**
     * Increments the counts for this sim, and the running total.
     */
    public synchronized void incrementCounts() {
        file.setCount( project, simulation, file.getCount( project, simulation ) + 1 );
        file.setCountSince( project, simulation, file.getCountSince( project, simulation ) + 1 );
        file.setTotal( getTotal() + 1 );
    }

    /**
     * Decrements the counts for this sim, and the running total.
     * This is intended for use when the user declines the Software Agreement.  See #1254.
     */
    public synchronized void decrementCounts() {
        file.setCount( project, simulation, Math.max( 0, file.getCount( project, simulation ) - 1 ) );
        file.setCountSince( project, simulation, Math.max( 0, file.getCountSince( project, simulation ) - 1 ) );
        file.setTotal( Math.max( 0, getTotal() - 1 ) );
    }

    /**
     * Resets the counts related to when the sim was last able to send statistics.
     * This should be called after successfully sending a "session" message to PhET.
     */
    public synchronized void resetCountSince() {
        file.setCountSince( project, simulation, 0 );
    }

    /**
     * Gets the number of sessions ever for this sim.
     *
     * @return
     */
    public synchronized int getCount() {
        return file.getCount( project, simulation );
    }

    /**
     * Gets the total number of sessions ever for all sims.
     *
     * @return
     */
    public synchronized int getTotal() {
        return file.getTotal();
    }

    /**
     * Gets the number of times that the sim has been started
     * since the last time that it sent statistics.
     *
     * @return
     */
    public synchronized int getCountSince() {
        return file.getCountSince( project, simulation );
    }

    /**
     * Effectively sets all counts to zero by deleting the underlying properties file.
     */
    public synchronized void clear() {
        if ( !file.delete() ) {
            file.deleteOnExit();
        }
    }

    /**
     * This is the interface to the sessions-counts.properties file.
     */
    private static class SessionCountsFile extends AbstractPropertiesFile {

        private static final String FILE_BASENAME = "session-counts.properties";
        private static final String FILE_HEADER = "DO NOT EDIT! - counts how many times simulations have been run";

        private static final String SUFFIX_COUNT = ".count";
        private static final String SUFFIX_SINCE = ".since";
        private static final String KEY_TOTAL_COUNT = "total" + SUFFIX_COUNT;

        // eg, faraday.magnet-and-compass.count
        private static String getCountKey( String project, String simulation ) {
            return project + "." + simulation + SUFFIX_COUNT;
        }

        // eg, faraday.magnet-and-compass.since
        private static String getSinceKey( String project, String simulation ) {
            return project + "." + simulation + SUFFIX_SINCE;
        }

        public SessionCountsFile() throws AccessControlException {
            super( new File( new PhetPersistenceDir(), FILE_BASENAME ) );
            setHeader( FILE_HEADER );
        }

        /**
         * Total number of sessions ever for the specified sim.
         *
         * @param project
         * @param simulation
         * @param count
         */
        public void setCount( String project, String simulation, int count ) {
            setProperty( getCountKey( project, simulation ), count );
        }

        /**
         * Total number of sessions ever for the specified sim.
         *
         * @param project
         * @param simulation
         * @param count
         */
        public int getCount( String project, String simulation ) {
            return getPropertyInt( getCountKey( project, simulation ), 0 );
        }

        /**
         * Number of times the specified sim has been run since the last time
         * it was able to successfully send statistics.
         *
         * @param project
         * @param simulation
         * @param count
         */
        public void setCountSince( String project, String simulation, int count ) {
            setProperty( getSinceKey( project, simulation ), count );
        }

        /**
         * Number of times the specified sim has been run since the last time
         * it was able to successfully send statistics.
         *
         * @param project
         * @param simulation
         * @param count
         */
        public int getCountSince( String project, String simulation ) {
            return getPropertyInt( getSinceKey( project, simulation ), 0 );
        }

        /**
         * Total number of sessions ever for all sims.
         *
         * @param total
         */
        public void setTotal( int total ) {
            setProperty( KEY_TOTAL_COUNT, total );
        }

        /**
         * Total number of sessions ever for all sims.
         */
        public int getTotal() {
            return getPropertyInt( KEY_TOTAL_COUNT, 0 );
        }
    }

    public static void main( String[] args ) {
        SessionCounter s = SessionCounter.initInstance( "balloons", "balloons" );
        System.out.println( "before increment: count=" + s.getCount() + " since=" + s.getCountSince() );
        s.incrementCounts();
        System.out.println( "after increment: count=" + s.getCount() + " since=" + s.getCountSince() );
        s.clear();
        System.out.println( "after clear: count=" + s.getCount() + " since=" + s.getCountSince() );
    }
}
