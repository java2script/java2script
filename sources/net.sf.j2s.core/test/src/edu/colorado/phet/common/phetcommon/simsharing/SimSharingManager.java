// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.simsharing;

import java.util.ArrayList;

import edu.colorado.phet.common.phetcommon.application.PhetApplicationConfig;
import edu.colorado.phet.common.phetcommon.simsharing.logs.StringLog;
import edu.colorado.phet.common.phetcommon.simsharing.messages.IModelAction;
import edu.colorado.phet.common.phetcommon.simsharing.messages.IModelComponent;
import edu.colorado.phet.common.phetcommon.simsharing.messages.IModelComponentType;
import edu.colorado.phet.common.phetcommon.simsharing.messages.ISystemAction;
import edu.colorado.phet.common.phetcommon.simsharing.messages.ISystemComponent;
import edu.colorado.phet.common.phetcommon.simsharing.messages.ISystemComponentType;
import edu.colorado.phet.common.phetcommon.simsharing.messages.IUserAction;
import edu.colorado.phet.common.phetcommon.simsharing.messages.IUserComponent;
import edu.colorado.phet.common.phetcommon.simsharing.messages.IUserComponentType;
import edu.colorado.phet.common.phetcommon.simsharing.messages.ParameterSet;
import edu.colorado.phet.common.phetcommon.util.function.VoidFunction1;
//import edu.colorado.phet.common.phetcommon.simsharing.tests.MongoLoadTesterSimLauncher;

/**
 * Central access point for sim-sharing initialization and event sending.
 * If sim-sharing is enabled, events are sent to the Console, a log, and the server (if a connection is made.)
 * If sim-sharing is disabled, all event-sending methods are no-ops.
 * <p/>
 * For instructions on how to instrument a sim, please read simulations-java\common\phetcommon\simsharing-readme.txt
 *
 * @author Sam Reid
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class SimSharingManager {

//    // Standard DB name for sim event data collection.
    private static final String SIM_EVENT_COLLECTION_DB_NAME = "sessions";

//    // component and type used for system messages sent by this class
//    private final ISystemComponent SYSTEM_COMPONENT = SystemComponents.simsharingManager;
//    private final ISystemComponentType SYSTEM_COMPONENT_TYPE = SystemComponentTypes.simsharingManager;
//
//    //This number should be increased when the data format changes so that a different parser must be used
//    private static final int PARSER_VERSION = 2;

    // Delimiter between fields. We use Tab instead of comma since it is much less common in string representation of objects.
    // Must be public for usage in the processing tools (in Scala)
    public static final String DELIMITER = "\t";

    public static final String DELIMITER_REPLACEMENT = "\\t"; // HTML entity equivalent of DELIMITER

    //String to use when a null value provided in parameter
    public static final String NULL_STRING = "null";

//    // Command line option to enable sim-sharing
//    private static final String COMMAND_LINE_OPTION = "-study";

    // Singleton
    private static SimSharingManager INSTANCE = null;

//    //Part of the mongoDB password, see #3231
//    public static final String MONGO_PASSWORD = "8zkamme";

    //Get a callback when the SimSharingManager has been initialized
    public static final ArrayList<VoidFunction1<SimSharingManager>> initListeners = new ArrayList<VoidFunction1<SimSharingManager>>();

    public static final SimSharingManager getInstance() {

        //If we try to use sim sharing before init called (say from a sample main), init with sim-sharing turned off.
        if ( INSTANCE == null ) {
            init( new PhetApplicationConfig( new String[]{}, "sim-sharing-manager" ) );
        }
        assert ( INSTANCE != null ); // make sure init worked
        return INSTANCE;
    }

    // Use if you have a non-PhetApplication (e.g., a sample main) that involves sim-sharing and you want basic console output.
    public static void init() {
        init( new PhetApplicationConfig( new String[]{"-study"}, "sim-sharing-manager" ) );
    }

    // Initialization, creates the singleton and sends startup events if sim-sharing is enabled.
    public static void init( final PhetApplicationConfig config ) {
        init( config, SIM_EVENT_COLLECTION_DB_NAME );
    }

    public static void init( final PhetApplicationConfig config, String dbName ) {
        INSTANCE = new SimSharingManager( config, dbName );
        for ( VoidFunction1<SimSharingManager> initListener : initListeners ) {
            initListener.apply( INSTANCE );
        }
    }

    // These members are always initialized.
    private final boolean enabled; //Flag indicating whether sim-sharing is enabled.
//    private final long simStartedTime; //The time that the singleton was instantiated.
//    private final String sessionId; // identifies the session

    // These members are initialized only if sim-sharing is enabled.
//    private String studyName; // name for the study, as provided on the command line
//    private SimSharingConfig simSharingConfig;
//    private String studentId; // student id, as provided by the student
//    private String machineCookie; // identifies the client machine
    private int messageCount; // number of delivered events, for cross-checking that no events were dropped

    private final ArrayList<Log> logs = new ArrayList<Log>();
    public final StringLog stringLog = new StringLog();

    // Singleton, private constructor
    private SimSharingManager( final PhetApplicationConfig applicationConfig, String dbName ) {

        enabled = false;//applicationConfig.hasCommandLineArg( COMMAND_LINE_OPTION );
//        simStartedTime = System.currentTimeMillis();
//        sessionId = generateSessionId();
//        if ( enabled ) {
//
//            studyName = applicationConfig.getOptionArg( COMMAND_LINE_OPTION );
//            simSharingConfig = SimSharingConfig.getConfig( studyName );
//            studentId = getStudentId();
//
//            // Get the machine cookie from the properties file, create one if it doesn't exist.
//            SimSharingPropertiesFile propertiesFile = new SimSharingPropertiesFile();
//            machineCookie = propertiesFile.getMachineCookie();
//
//            logs.add( new ConsoleLog() );
//            logs.add( stringLog );
//            if ( simSharingConfig.sendToLogFile ) {
//                logs.add( new SimSharingFileLogger( machineCookie, sessionId,false ) );
//            }
//            if (simSharingConfig.sendToLogFileNearJAR){
//                logs.add( new SimSharingFileLogger( machineCookie, sessionId,true ) );
//            }
//
//            //If Mongo delivery is enabled, add that log (but if trying to connect to unknown host, print an exception and skip it)
//            if ( simSharingConfig.sendToServer ) {
//                try {
//                    logs.add( new MongoLog( sessionId, dbName ) );
//                }
//                catch( UnknownHostException unknownHostException ) {
//                    unknownHostException.printStackTrace();
//                }
//            }
//
//            sendStartupMessage( applicationConfig );
//
//            //Look up additional external info and report in a separate thread so it doesn't slow down the main thread too much
//            new Thread() {
//                @Override public void run() {
//                    if ( MongoLoadTesterSimLauncher.PERFORM_LOAD_TESTING ) {
//                        MongoLoadTesterSimLauncher.performLoadTesting();
//                    }
//                }
//            }.start();
//        }
    }

//    /*
//     * Tests to see if we're using a specific SimSharingConfig instance.
//     * Calling this method before PhetApplicationLauncher.launchSim is a programming error, and will
//     * result in IllegalStateException. We can't test for a SimSharingConfig until we receive the
//     * PhetApplicationConfig from PhetApplicationLauncher, which contains the name of the study.
//     * And we don't call getInstance herein, because getInstance will happily initialize with a
//     * dummy PhetApplicationConfig.
//     */
//    public static boolean usingConfig( SimSharingConfig simSharingConfig ) {
//        if ( INSTANCE == null ) {
//            throw new IllegalStateException( "attempt to test for SimSharingConfig before sim-sharing has been initialized" );
//        }
//        else {
//            // Use referential equality, this should be one of the static instances in SimSharingConfig.
//            return simSharingConfig == INSTANCE.simSharingConfig;
//        }
//    }

    // Gets the number of messages that have been sent.
    public int getMessageCount() {
        return messageCount;
    }

    // Events will be sent only if sim-sharing is enabled.
    public boolean isEnabled() {
        return enabled;
    }

//    // Gets the session ID that is being used for this sim-sharing session.
//    public String getSessionId() {
//        return sessionId;
//    }
//
//    /*
//    * Gets the name of the study.
//    * This is the optional arg supplied after the "-study" program arg (eg, "-study utah").
//    * Returns null if no study is specified.
//    */
//    public String getStudyName() {
//        return studyName;
//    }

//    //Add a log
//    public void addLog( Log log ) { logs.add( log ); }
//
    //Convenience overload to provide no parameters
    public static void sendSystemMessage( ISystemComponent component, ISystemComponentType componentType, ISystemAction action ) {
//        sendSystemMessage( component, componentType, action, new ParameterSet() );
    }

    public static void sendSystemMessage( ISystemComponent component, ISystemComponentType componentType, ISystemAction action, ParameterSet parameters ) {
//        getInstance().sendMessage( new SystemMessage( system, component, componentType, action, parameters ) );
    }

    public void sendSystemMessageNS( ISystemComponent component, ISystemComponentType componentType, ISystemAction action, ParameterSet parameters ) {
//        sendMessage( new SystemMessage( system, component, componentType, action, parameters ) );
    }

    //Convenience overload to signify that the user has pressed a button
    public static void sendButtonPressed( IUserComponent component ) {
//        sendUserMessage( component, UserComponentTypes.button, UserActions.pressed );
    }

    //Convenience overload to provide no parameters
    public static void sendUserMessage( IUserComponent component, IUserComponentType componentType, IUserAction action ) {
//        sendUserMessage( component, componentType, action, new ParameterSet() );
    }

    // Convenience method for sending an event from something the user did
    public static void sendUserMessage( IUserComponent component, IUserComponentType componentType, IUserAction action, ParameterSet parameters ) {
//        getInstance().sendMessage( new UserMessage( user, component, componentType, action, parameters ) );
    }

    public static void sendModelMessage( IModelComponent component, IModelComponentType componentType, IModelAction action ) {
//        getInstance().sendMessage( new ModelMessage( model, component, componentType, action, new ParameterSet() ) );
    }

    public static void sendModelMessage( IModelComponent component, IModelComponentType componentType, IModelAction action, ParameterSet parameters ) {
//        getInstance().sendMessage( new ModelMessage( model, component, componentType, action, parameters ) );
    }

    // Sends an event. If sim-sharing is disabled, this is a no-op.
    // Private because clients should use the send*Message methods to indicate the message type
//    private void sendMessage( SimSharingMessage message ) {
//        if ( enabled ) {
//            for ( Log log : logs ) {
//                try {
//                    log.addMessage( message );
//                }
//                catch( IOException e ) {
//                    e.printStackTrace();
//                }
//            }
//
//            //Every 100 events, send an event that says how many events have been sent. This way we can check to see that no events were dropped.
//            messageCount++;
//            if ( messageCount % 100 == 0 && messageCount > 0 ) {
//                sendSystemMessage( SYSTEM_COMPONENT, SYSTEM_COMPONENT_TYPE, sentEvent, parameterSet( ParameterKeys.messageCount, messageCount ) );
//            }
//        }
//    }
//
//    // Gets the id entered by the student. Semantics of this id vary from study to study. If the study requires no id, then returns null.
//    private String getStudentId() {
//        assert ( enabled );
//        String id = null;
//        if ( simSharingConfig.requestId ) {
//            SimSharingIdDialog dialog = new SimSharingIdDialog( null, simSharingConfig.idPrompt, simSharingConfig.idRequired, simSharingConfig.characterValidation );
//            SwingUtils.centerWindowOnScreen( dialog );
//            dialog.setVisible( true ); // dialog is modal, so this blocks until an id is entered.
//            id = dialog.getId();
//        }
//        return id;
//    }
//
//    // Sends a message when sim-sharing has been started up.
//    private void sendStartupMessage( PhetApplicationConfig config ) {
//        assert ( enabled );
//        sendSystemMessageNS( SYSTEM_COMPONENT, SYSTEM_COMPONENT_TYPE, started, parameterSet( time, simStartedTime ).
//                with( name, config.getName() ).
//                with( version, config.getVersion().formatForAboutDialog() ).
//                with( project, config.getProjectName() ).
//                with( flavor, config.getFlavor() ).
//                with( locale, config.getLocale().toString() ).
//                with( distributionTag, config.getDistributionTag() ).
//                with( javaVersion, System.getProperty( "java.version" ) ).
//                with( osName, System.getProperty( "os.name" ) ).
//                with( osVersion, System.getProperty( "os.version" ) ).
//                with( parserVersion, PARSER_VERSION ).
//                with( study, studyName ).
//                with( id, studentId ).
//                with( commandLineArgs, new ObservableList<String>( config.getCommandLineArgs() ).mkString( " " ) ).
//                with( ParameterKeys.machineCookie, machineCookie ).
//                with( ParameterKeys.sessionId, sessionId ) );
//    }
//
//    public static String generateSessionId() {
//        // MongoDB documentation says that collections should start with a
//        // letter, so we prepend one here.
//        return "s" + generateStrongId();
//    }
//
//    public static String generateMachineCookie() {
//        return generateStrongId();
//    }
//
//    //Generate a strong unique id, see http://stackoverflow.com/questions/41107/how-to-generate-a-random-alpha-numeric-string-in-java
//    private static String generateStrongId() {
//        return new BigInteger( 130, new SecureRandom() ).toString( 32 );
//    }
//
    public ArrayList<String> getLogNames() {
        ArrayList<String> logNames = new ArrayList<String>();
        for ( Log log : logs ) {
            logNames.add( log.getName() );
        }
        return logNames;
    }

    public void shutdown() {
        for ( Log log : logs ) {
            log.shutdown();
        }
    }
}