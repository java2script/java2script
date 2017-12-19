// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.files;


/**
 * Encapsulates the notion of a PhET offline website installation.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class PhetInstallation {
//
//    private static final String PROPERTIES_FILENAME = "phet-installation.properties";
//
//    private static PhetInstallation instance;
//
//    // properties associated with the PhET installation
//    private final PhetProperties properties;
//
//    /**
//     * Gets the instance of this object.
//     *
//     * @return
//     */
//    public static PhetInstallation getInstance() {
//        if ( instance == null ) {
//            instance = new PhetInstallation();
//        }
//        return instance;
//    }
//
//    /* singleton */
//    private PhetInstallation() {
//        properties = readProperties();
//    }
//
//    /**
//     * Gets the version information associated with the installer that was used to create the PhET installation.
//     *
//     * @return
//     */
//    public PhetInstallerVersion getInstallerVersion() {
//        String key = "installer.creation.date.epoch.seconds";
//        long seconds = properties.getLong( key, -1 );
//        if ( seconds == -1 ) {
//            warnMissingKey( key );
//        }
//        return new PhetInstallerVersion( seconds );
//    }
//
//    /**
//     * Timestamp that indicates when the installation was performed,
//     * in seconds since Epoch.
//     *
//     * @return
//     */
//    public long getInstallationTimestamp() {
//        return properties.getLong( "install.date.epoch.seconds", -1 );
//    }
//
////    /**
////     * Gets the JAR file in the installation that corresponds to the running simulation.
////     * We cannot use File.getCodeSource, because in some versions of Java, that will
////     * return the JAR file in the JWS cache (see #1320).  So we use the JNLP code base
////     * to identify the JAR.
////     *
////     * @return
////     */
////    public File getInstalledJarFile() {
////        File file = null;
////        URL codeBase = PhetServiceManager.getCodeBase();
////        if ( codeBase != null && codeBase.getProtocol().equals( "file" ) ) {
////            String dirname = codeBase.getPath();
////            String project = new File( dirname ).getName(); // last name in path is project name
////            file = new File( dirname, PhetApplicationConfig.getProjectJarName( project ) );
////        }
////        return file;
////    }
//
//    /**
//     * Does a PhET installation exists that is associated with this sim?
//     *
//     * @return
//     */
//    public static boolean exists() {
//        boolean exists = false;
//        File propertiesFile = getPropertiesFile();
//        if ( propertiesFile != null ) {
//            exists = propertiesFile.exists();
//        }
//        return exists;
//    }
//
//    /*
//    * Reads the properties file, if it exists.
//    */
//    private static PhetProperties readProperties() {
//        PhetProperties properties = new PhetProperties();
//        File file = getPropertiesFile();
//        if ( file != null && file.exists() ) {
//            try {
//                properties.load( new FileInputStream( file ) );
//            }
//            catch ( IOException e ) {
//                // this will only happen if the file is corrupt
//                e.printStackTrace();
//            }
//        }
//        return properties;
//    }
//
//    /*
//    * Gets the properties file associated the the PhET installation.
//    * Returns null if the file isn't found.
//    */
//    private static File getPropertiesFile() {
//        File file = null;
//        URL codeBase = PhetServiceManager.getCodeBase();
//        if ( codeBase != null && codeBase.getProtocol().equals( "file" ) ) {
//            String dirname = codeBase.getPath();
//            String project = new File( dirname ).getName(); // last name in path is project name
//            String jarName = project + "_all.jar"; // jar file shares project name
//            File jarFile = new File( dirname, jarName );
//            if ( jarFile.exists() ) {
//                File parent = jarFile.getParentFile();
//                if ( parent != null ) {
//                    File grandParent = parent.getParentFile();
//                    if ( grandParent != null ) {
//                        file = new File( grandParent.getAbsolutePath(), PROPERTIES_FILENAME );
//                    }
//                }
//            }
//        }
//        return file;
//    }
//
//    private static void warnMissingKey( String key ) {
//        System.err.println( "WARNING: " + PROPERTIES_FILENAME + " is missing required key " + key );
//    }
}
