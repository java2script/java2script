// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.simsharing.logs;
//
//import java.io.IOException;
//import java.net.UnknownHostException;
//import java.util.Enumeration;
//import java.util.concurrent.ExecutorService;
//import java.util.concurrent.Executors;
//import java.util.logging.Level;
//import java.util.logging.LogManager;
//
//import edu.colorado.phet.common.phetcommon.simsharing.Log;
//import edu.colorado.phet.common.phetcommon.simsharing.SimSharingManager;
//import edu.colorado.phet.common.phetcommon.simsharing.SimSharingMessage;
//import edu.colorado.phet.common.phetcommon.simsharing.messages.Parameter;
//import edu.colorado.phet.common.phetcommon.util.logging.LoggingUtils;
//
////import com.mongodb.BasicDBObject;
////import com.mongodb.DB;
////import com.mongodb.DBCollection;
////import com.mongodb.Mongo;
////import com.mongodb.MongoException;
////import com.mongodb.WriteResult;
//
//import static java.util.concurrent.TimeUnit.SECONDS;

/**
 * The destination for Mongo logging messages for sim sharing, connects
 * directly to MongoDB server, see #3213. Note that currently there is one
 * collection per session. This may not be optimal for searches that span
 * multiple machines (or operations that must operate on all stored logs), so
 * may be changed in the future.
 *
 * @author Sam Reid
 */
public class MongoLog {//implements Log {
//
//    private static final java.util.logging.Logger LOGGER = LoggingUtils.getLogger( MongoLog.class.getCanonicalName() );
//
////    private Mongo mongo;
//
//    //Strings for MongoDB
//    public static final String TIME = "time";
//    public static final String MESSAGE_TYPE = "messageType";
//    public static final String COMPONENT = "component";
//    public static final String COMPONENT_TYPE = "componentType";
//    public static final String ACTION = "action";
//    public static final String PARAMETERS = "parameters";
//
//    //Default to phet-server, but you can use this command line arg for local testing:
//    //-Dsim-event-data-collection-server-host-ip-address=localhost
//    public static String HOST_IP_ADDRESS = System.getProperty( "sim-event-data-collection-server-host-ip-address", "128.138.145.107" );
//
//    //On phet-server, port must be in a specific range of allowed ports, see Unfuddle ticket
//    public static int PORT = Integer.parseInt( System.getProperty( "sim-event-data-collection-server-host-port", "44100" ) );
//
//    //http://www.cs.umd.edu/class/spring2006/cmsc433/lectures/util-concurrent.pdf
//    private ExecutorService executor = Executors.newSingleThreadExecutor();
////    private final DBCollection collection;
//
//    //Keep track of the number of messages that failed to send and stop trying after it equals or exceeds MAX_FAILURES
//    private static final int MAX_FAILURES = 3;
//    private int failureCount = 0;
//
//    //Part of the mongoDB password, see #3231
//    public static final String MER = "meR".toLowerCase();
//
//    public MongoLog( String sessionID, String dbName ) throws UnknownHostException {
//        //mongo = new Mongo( HOST_IP_ADDRESS, PORT );
//
//        // All sessions are stored in the same DB.  Having a separate DB for
//        // each uses an excessive amount of disk space.
//        //DB database = mongo.getDB( dbName );
//
//        // Authenticate.
////        try {
////            boolean auth = database.authenticate( "phetsimclient", ( MER + SimSharingManager.MONGO_PASSWORD + "" + ( 2 * 2 * 2 ) + "ss0O88723otbubaoue" ).toCharArray() );
////            if ( !auth ) {
////                new RuntimeException( "Authentication failed" ).printStackTrace();
////            }
////        }
////
////        //A MongoException.Network indicates a failure to reach mongo for the authentication attempt, and hence there is probably no internet connection.  See #3304
////        catch ( MongoException.Network exception ) {
////            LOGGER.warning( "Failed to connect to mongo during authentication.  Perhaps there is no internet connection." );
////        }
//
//        //One collection per session, lets us easily iterate and add messages per session.
////        collection = database.getCollection( sessionID );
//
//        /*
//         * Mongo logs entire stack traces when failure occur, which is incredibly annoying.
//         * Turn off Mongo logging here by interrogating the LogManager.
//         * Do this at the end of the constructor, so that Mongo loggers have been instantiated.
//         */
//        LOGGER.info( "turning off MongoDB loggers" );
//        Enumeration<String> names = LogManager.getLogManager().getLoggerNames();
//        while ( names.hasMoreElements() ) {
//            String name = names.nextElement();
//            if ( name.startsWith( "com.mongodb" ) ) {
//                LogManager.getLogManager().getLogger( name ).setLevel( Level.OFF );
//            }
//        }
//    }
//
//    // Sends a message to the server, and prefixes the message with a couple of additional fields.
//    public void addMessage( final SimSharingMessage message ) throws IOException {
//
//        executor.execute( new Runnable() {
//            public void run() {
//
////                BasicDBObject doc = new BasicDBObject() {{
////                    put( TIME, message.time + "" );
////                    put( MESSAGE_TYPE, message.messageType.toString() );
////                    put( COMPONENT, message.component.toString() );
////                    put( COMPONENT_TYPE, message.componentType.toString() );
////                    put( ACTION, message.action.toString() );
////                    put( PARAMETERS, new BasicDBObject() {{
////                        for ( Parameter parameter : message.parameters ) {
////                            put( parameter.name.toString(), parameter.value == null ? "null" : parameter.value.toString() );
////                        }
////                    }} );
////                }};
////
////                try {
////                    if ( failureCount < MAX_FAILURES ) {
////                        WriteResult result = collection.insert( doc );
////                    }
////                    //TODO result should be checked, especially since we've turned off Mongo loggers
////                }
////                catch ( RuntimeException e ) {
////                    //If a connection could not be made, we may receive something like new MongoException.Network( "can't say something" , ioe )
////                    failureCount++;
////                    LOGGER.warning( failureCount + " failures sending to Mongo server, error=" + e.getMessage() );
////                }
//            }
//        } );
//    }
//
//    public String getName() {
//        return null;//"MongoDB Server @ " + mongo.getAddress();
//    }
//
//    //Refuse further messages (assumes all messages have been scheduled, and waits for them to be delivered
//    public void shutdown() {
//        executor.shutdown();
//
//        //Wait up to 1 second for the messages to be delivered to the server after sim exits,
//        //If they didn't get sent within 1 sec, just exit anyways.
//        try {
//            boolean success = executor.awaitTermination( 1, SECONDS );
//            LOGGER.info( "MongoLog.executor awaitTermination, success = " + success );
//        }
//        catch ( InterruptedException e ) {
//            e.printStackTrace();
//        }
//    }
}