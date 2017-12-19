// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.util;


/**
 * PhET simulations can be deployed in several different ways.
 * This class determines how the sim that is running was deployed.
 * <p/>
 * This implementation combines the singleton pattern and the Java 1.4 typesafe enum pattern.
 */
public class DeploymentScenario {
//
//    // enumeration
//    public static final DeploymentScenario PHET_INSTALLATION = new DeploymentScenario( "phet-installation", true, true, true );
//    public static final DeploymentScenario STANDALONE_JAR = new DeploymentScenario( "standalone-jar", true, true, true );
//    public static final DeploymentScenario PHET_PRODUCTION_WEBSITE = new DeploymentScenario( "phet-production-website", false, false, false );
//    public static final DeploymentScenario PHET_DEVELOPMENT_WEBSITE = new DeploymentScenario( "phet-development-website", false, false, false );
//    public static final DeploymentScenario OTHER_WEBSITE = new DeploymentScenario( "other-website", true, true, false );
//    public static final DeploymentScenario DEVELOPER_IDE = new DeploymentScenario( "developer-ide", true, true, false );
//    public static final DeploymentScenario UNKNOWN = new DeploymentScenario( "unknown", true, true, false );
//
//    /*
//    * There are fragments of the codebase attribute in JNLP files.
//    * Codebase is a URL, whose syntax is:
//    * <protocol>://<authority><path>?<query>#<fragment>
//    *
//    * Example:
//    * http://www.colorado.edu/physics/phet/dev/balloons/1.07.05
//    *
//    * We're using <authority> and the general part of <path> to identify the codebase
//    * for the PhET production and development websites.
//    */
//    private static final String PHET_PRODUCTION_CODEBASE_PREFIX = PhetCommonConstants.PHET_HOME_SERVER; // prefix!
//    private static final String PHET_DEVELOPMENT_CODEBASE_SUBSTRING = "colorado.edu"; // substring!
//
////    private static final Logger LOGGER = LoggingUtils.getLogger( DeploymentScenario.class.getCanonicalName() );
//
//    // singleton
//    private static DeploymentScenario instance = null;
//
//    private final String name;
//    private final boolean statisticsEnabled;
//    private final boolean updatesEnabled;
//    private final boolean updatable;
//
//    /* singleton */
//    private DeploymentScenario( String name, boolean statisticsEnabled, boolean updatesEnabled, boolean updatable ) {
//        this.name = name;
//        this.statisticsEnabled = statisticsEnabled;
//        this.updatesEnabled = updatesEnabled;
//        this.updatable = updatable;
//    }
//
//    /**
//     * True if the scenario checks for updates.
//     */
//    public boolean isUpdatesEnabled() {
//        return updatesEnabled;
//    }
//
//    /**
//     * True if the scenario is capable of having it's executable file updated in place.
//     */
//    public boolean isUpdatable() {
//        return updatable;
//    }
//
//    /**
//     * True if the scenario sends statistics.
//     */
//    public boolean isStatisticsEnabled() {
//        return statisticsEnabled;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public String toString() {
//        return name;
//    }
//
//    public boolean equals( Object object ) {
//        boolean equals = false;
//        if ( object instanceof DeploymentScenario ) {
//            equals = getName().equals( ( (DeploymentScenario) object ).getName() );
//        }
//        return equals;
//    }
//
//    /**
//     * Gets the deployment scenario, a singleton.
//     * This is determined once, on demand, since it does not change.
//     *
//     * @return
//     */
//    public static DeploymentScenario getInstance() {
//        if ( instance == null ) {
//            instance = determineScenario();
//        }
//        return instance;
//    }
//
//    /*
//    * Determines which scenario was used to deploy the application that we're running.
//    */
//    private static DeploymentScenario determineScenario() {
//
//        DeploymentScenario scenario = UNKNOWN;
//
//        if ( PhetServiceManager.isJavaWebStart() ) {
//
//            if ( PhetInstallation.exists() ) {
//                scenario = DeploymentScenario.PHET_INSTALLATION;
//            }
//            else {
//                URL codeBase = PhetServiceManager.getCodeBase();
//                if ( codeBase != null ) {
//
//                    // web-started sims are differentiated base on the codebase attribute specified in the JNLP file
//
////                    LOGGER.fine( "codebase=" + codeBase );
//                    String codebaseFragment = codeBase.getAuthority() + codeBase.getPath();
//
//                    if ( codebaseFragment.startsWith( PHET_PRODUCTION_CODEBASE_PREFIX ) ) {
//                        scenario = DeploymentScenario.PHET_PRODUCTION_WEBSITE;
//                    }
//                    else if ( codebaseFragment.indexOf( PHET_DEVELOPMENT_CODEBASE_SUBSTRING ) >= 0 ) {
//                        /* 
//                         * Do this after checking the production server scenario, 
//                         * because deployment codebase substring may be contained in production codebase prefix.
//                         */
//                        scenario = DeploymentScenario.PHET_DEVELOPMENT_WEBSITE;
//                    }
//                    else {
//                        scenario = DeploymentScenario.OTHER_WEBSITE;
//                    }
//                }
//            }
//        }
//        else if ( FileUtils.isJarCodeSource() ) {
//            scenario = DeploymentScenario.STANDALONE_JAR;
//        }
//        else {
//            scenario = DeploymentScenario.DEVELOPER_IDE;
//        }
//
////        LOGGER.fine( "determineScenario " + scenario.getName() );
//        return scenario;
//    }
//
//    public static void main( String[] args ) {
//        System.out.println( DeploymentScenario.getInstance() );
//    }
}
