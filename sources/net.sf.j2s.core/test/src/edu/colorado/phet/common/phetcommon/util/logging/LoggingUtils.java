// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.util.logging;

//import java.util.logging.ConsoleHandler;
//import java.util.logging.Filter;
//import java.util.logging.Handler;
//import java.util.logging.Level;
//import java.util.logging.LogRecord;
//import java.util.logging.Logger;

/**
 * Keeps track of loggers and handles enabling logging levels for those loggers
 */
public class LoggingUtils {

//    /**
//     * A map of logger name => logger
//     */
//    private static Map<String, Logger> loggers = new HashMap<String, Logger>();
//
//    /**
//     * A set of all package names that by default will output log messages at all levels
//     */
//    private static Set<String> fullLoggingPackages = new HashSet<String>();
//
//    /**
//     * A dedicated logging handler that will print out messages at level FINE or lower to the console. This is used in
//     * addition to the default handler which prints out messages at level INFO or higher.
//     */
//    private static Handler handler = new ConsoleHandler();
//
//    /**
//     * Initialize the handler
//     */
//    static {
//        try {
//            // the handler should output all messages
//            handler.setLevel( Level.ALL );
//
//            // that even is not enough, we need to set a filter that won't double the log messages at level INFO or higher
//            handler.setFilter( new Filter() {
//                public boolean isLoggable( LogRecord logRecord ) {
//                    return logRecord.getLevel() == Level.FINE || logRecord.getLevel() == Level.FINER || logRecord.getLevel() == Level.FINEST;
//                }
//            } );
//        }
//        catch ( SecurityException e ) {
//
//        }
//    }
//
//    /**
//     * Enable logging of all levels for all loggers whose names start with the specified package name.
//     * Calling .setLevel() on a logger (even just once) will override this statement.
//     *
//     * @param packageName The package name, period-delimited.
//     */
//    public static synchronized void enableAllLogging( String packageName ) {
//        fullLoggingPackages.add( packageName );
//        for ( String loggerName : loggers.keySet() ) {
//            if ( loggerName.startsWith( packageName ) ) {
//                enableLogging( loggers.get( loggerName ) );
//            }
//        }
//    }
//
//    /**
//     * Obtain a logger.  This method centralizes log creation to make it easy to
//     * specify configuration such as whether it is anonymous or not, see #2386
//     *
//     * @param name The name of the logger. Generally, use the full name of the calling class so enabling logging by
//     *             package is easier.
//     * @return The logger
//     */
//    public static synchronized Logger getLogger( String name ) {
//        if ( loggers.containsKey( name ) ) {
//            return loggers.get( name );
//        }
//        else {
//            //Work around the Java 7 update 25 problem, see https://phet.unfuddle.com/a#/projects/9404/tickets/by_number/3557?cycle=true
//            java.util.logging.Logger.getLogger("logger-workaround");
//
//            // grab an anonymous logger with the specific name
//            Logger logger = Logger.getAnonymousLogger();
//
//            // store it so we can distribute the same copy
//            loggers.put( name, logger );
//
//            // if we have already enabled logging for a package (or subpackage), enable this logger
//            if ( hasAllLevelsEnabled( name ) ) {
//                enableLogging( logger );
//            }
//            return logger;
//        }
//    }
//
//    /**
//     * Whether a logger by this name should have all levels output.
//     *
//     * @param loggerName The name of the logger
//     * @return Whether all levels are enabled
//     */
//    public static synchronized boolean hasAllLevelsEnabled( String loggerName ) {
//        for ( String fullLoggingPackage : fullLoggingPackages ) {
//            if ( loggerName.startsWith( fullLoggingPackage ) ) {
//                return true;
//            }
//        }
//        return false;
//    }
//
//    /**
//     * Enable logging of all messages for the specified logger.
//     *
//     * @param logger The logger. Should be an anonymous logger.
//     */
//    private static void enableLogging( Logger logger ) {
//        try {
//            // allow directly setting level on the logger to override this
//            if ( logger.getLevel() == null ) {
//                // enable passing of all levels through the logger itself
//                logger.setLevel( Level.ALL );
//            }
//
//            for ( Handler h : logger.getHandlers() ) {
//                if ( h == handler ) {
//                    return;
//                }
//            }
//
//            // default console appender doesn't handle levels at FINE or under. we add our custom handler to output these levels
//            logger.addHandler( handler );
//        }
//        catch ( SecurityException e ) {
//
//        }
//    }
}
