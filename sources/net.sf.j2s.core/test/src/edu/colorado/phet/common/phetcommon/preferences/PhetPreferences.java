// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.preferences;


/**
 * PhET preferences, stored in a file in the user's home directory.
 */
public class PhetPreferences {
//
//    // if we don't have access permissions, this file will be null 
//    private static PhetPreferencesFile PREFERENCES_FILE;
//
//    public static void clear() {
//        PREFERENCES_FILE.clear();
//    }
//
//    public static File getPreferencesFile() {
//        return PREFERENCES_FILE;
//    }
//
//    static {
//        try {
//            PREFERENCES_FILE = new PhetPreferencesFile();
//        }
//        catch ( AccessControlException accessControlException ) {
//            PREFERENCES_FILE = null;
//            System.out.println( "PhetPreferences: access to local filesystem denied" );
//        }
//    }
//
//    /**
//     * Preferences are stored in a file in the persistence directory.
//     */
//    private static class PhetPreferencesFile extends File {
//        public PhetPreferencesFile() throws AccessControlException {
//            super( new PhetPersistenceDir(), "preferences.properties" );
//        }
//
//        public void clear() {
//            boolean deleted = delete();
//            if ( !deleted ) {
//                deleteOnExit();
//                System.out.println( "delete failed, will try again on exit" );
//            }
//            else {
//                System.out.println( "preferences file deleted, you should probably exit now" );
//                PREFERENCES_FILE = null;//prevent making changes that will get saved
//            }
//        }
//    }
//
//    // property keys
//    public static final String KEY_PREFERENCES_FILE_CREATION_TIME = "preferences-file-creation-time.milliseconds";
//    private static final String KEY_UPDATES_ENABLED = "all-sims.updates.enabled";
//    private static final String KEY_STATISTICS_ENABLED = "all-sims.statistics.enabled";
//    private static final String KEY_SOFTWARE_AGREEMENT_VERSION = "all-sims.software-agreement-version";
//    private static final String KEY_INSTALLER_ASK_ME_LATER = "installer.updates.ask-me-later-pressed.milliseconds";
//
//    // property key patterns
//    private static final String PATTERN_KEY_SIM_ASK_ME_LATER = "{0}.{1}.updates.ask-me-later-pressed.milliseconds";
//    private static final String PATTERN_KEY_SIM_SKIP_UPDATE = "{0}.{1}.updates.skip.version"; // project.sim.updates.skip-version
//
//    // developer only
//    private static final String DEV_KEY_ALWAYS_SHOW_SOFTWARE_AGREEMENT = "dev.always-show-software-agreement";
//
//    /* singleton */
//    private static PhetPreferences instance;
//
//    private final Properties properties = new Properties();
//
//    /* singleton */
//    private PhetPreferences() {
//        if ( PREFERENCES_FILE != null ) {
//            initPreferencesFile();
//            try {
//                properties.load( new FileInputStream( PREFERENCES_FILE ) );
//            }
//            catch ( IOException e ) {
//                e.printStackTrace();
//            }
//        }
//    }
//
//    /*
//     * Initializes the preferences file by creating it and setting default values.
//     */
//    private void initPreferencesFile() {
//        if ( !PREFERENCES_FILE.exists() ) {
//            PREFERENCES_FILE.getParentFile().mkdirs();
//            setPreferencesFileCreationTimeNow();
//            setUpdatesEnabled( true );
//            setStatisticsEnabled( true );
//            setAlwaysShowSoftwareAgreement( false );
//        }
//    }
//
//    public static PhetPreferences getInstance() {
//        if ( instance == null ) {
//            instance = new PhetPreferences();
//        }
//        return instance;
//    }
//
//    public void setStatisticsEnabled( boolean b ) {
//        setBooleanProperty( KEY_STATISTICS_ENABLED, b );
//    }
//
//    public boolean isStatisticsEnabled() {
//        return getBooleanProperty( KEY_STATISTICS_ENABLED );
//    }
//
//    public void setUpdatesEnabled( boolean b ) {
//        setBooleanProperty( KEY_UPDATES_ENABLED, b );
//    }
//
//    public boolean isUpdatesEnabled() {
//        return getBooleanProperty( KEY_UPDATES_ENABLED );
//    }
//
//    /**
//     * Sets the time in milliseconds since Epoch at which the user pressed "Ask Me Later".
//     * This is specific to a simulation.
//     */
//    public void setSimAskMeLater( String project, String sim, long time ) {
//        setStringProperty( getSimAskMeLaterKey( project, sim ), String.valueOf( time ) );
//    }
//
//    /**
//     * Gets the time in milliseconds since Epoch at which the user pressed "Ask Me Later".
//     * This is specific to a simulation.
//     */
//    public long getSimAskMeLater( String project, String sim ) {
//        return getLongProperty( getSimAskMeLaterKey( project, sim ), 0 );
//    }
//
//    private static String getSimAskMeLaterKey( String project, String sim ) {
//        Object[] args = { project, sim };
//        return MessageFormat.format( PATTERN_KEY_SIM_ASK_ME_LATER, args );
//    }
//
//    /**
//     * Sets the most recent version that the user asked to skip.
//     * This is specific to a simulation.
//     */
//    public void setSimSkipUpdate( String project, String sim, int skipRevision ) {
//        setStringProperty( getSimSkipUpdateKey( project, sim ), String.valueOf( skipRevision ) );
//    }
//
//    /**
//     * Gets the most recent revision number that the user asked to skip.
//     * This is specific to a simulation.
//     */
//    public int getSimSkipUpdate( String project, String sim ) {
//        return getIntProperty( getSimSkipUpdateKey( project, sim ), 0 );
//    }
//
//    private static String getSimSkipUpdateKey( String project, String sim ) {
//        Object[] args = { project, sim };
//        return MessageFormat.format( PATTERN_KEY_SIM_SKIP_UPDATE, args );
//    }
//
//    /**
//     * Sets the time in milliseconds since Epoch at which the user pressed "Ask Me Later".
//     * This is specific to the installer.
//     */
//    public void setInstallerAskMeLater( long time ) {
//        setStringProperty( KEY_INSTALLER_ASK_ME_LATER, String.valueOf( time ) );
//    }
//
//    public long getInstallerAskMeLater() {
//        return getLongProperty( KEY_INSTALLER_ASK_ME_LATER, 0 );
//    }
//
//    public void setSoftwareAgreementVersion( int version ) {
//        setIntProperty( KEY_SOFTWARE_AGREEMENT_VERSION, version );
//    }
//
//    /**
//     * Gets the software agreement version number that the user most recently accepted.
//     *
//     * @return -1 if the user has no accepted any agreement
//     */
//    public int getSoftwareAgreementVersion() {
//        return getIntProperty( KEY_SOFTWARE_AGREEMENT_VERSION, -1 );
//    }
//
//    /**
//     * Sets the time in milliseconds since Epoch that the preferences file was created.
//     * We use this as an ad hoc means of anonymously identifying unique users.
//     */
//    private long setPreferencesFileCreationTimeNow() {
//        long now = System.currentTimeMillis();
//        setLongProperty( KEY_PREFERENCES_FILE_CREATION_TIME, now );
//        return now;
//    }
//
//    /**
//     * Gets the time in milliseconds since Epoch that the preferences file was created.
//     */
//    public long getPreferencesFileCreationTime() {
//        return getLongProperty( KEY_PREFERENCES_FILE_CREATION_TIME, 0 );
//    }
//
//    public boolean isAlwaysShowSoftwareAgreement() {
//        return getBooleanProperty( DEV_KEY_ALWAYS_SHOW_SOFTWARE_AGREEMENT );
//    }
//
//    public void setAlwaysShowSoftwareAgreement( boolean b ) {
//        setBooleanProperty( DEV_KEY_ALWAYS_SHOW_SOFTWARE_AGREEMENT, b );
//    }
//
//    /*
//    * All other property setters should be implemented in terms of this one,
//    * since this is the one that actually handles storage of the property.
//    */
//    private void setStringProperty( String key, String value ) {
//        properties.setProperty( key, value );
//        storePreferences();
//    }
//
//    private String getStringProperty( String key ) {
//        return properties.getProperty( key );
//    }
//
//    private void setBooleanProperty( String key, boolean b ) {
//        setStringProperty( key, String.valueOf( b ) );
//    }
//
//    private boolean getBooleanProperty( String key ) {
//        return Boolean.valueOf( getStringProperty( key ) ).booleanValue(); // any value other than "true" is false
//    }
//
//    private void setLongProperty( String key, long value ) {
//        setStringProperty( key, String.valueOf( value ) );
//    }
//
//    private long getLongProperty( String key, long defaultValue ) {
//        long value = defaultValue;
//        String stringValue = properties.getProperty( key );
//        if ( stringValue != null ) {
//            try {
//                value = Long.parseLong( properties.getProperty( key ) );
//            }
//            catch ( NumberFormatException e ) {
//                e.printStackTrace();
//            }
//        }
//        return value;
//    }
//
//    private void setIntProperty( String key, int value ) {
//        setStringProperty( key, String.valueOf( value ) );
//    }
//
//    private int getIntProperty( String key, int defaultValue ) {
//        int value = defaultValue;
//        String stringValue = properties.getProperty( key );
//        if ( stringValue != null ) {
//            try {
//                value = Integer.parseInt( properties.getProperty( key ) );
//            }
//            catch ( NumberFormatException e ) {
//                e.printStackTrace();
//            }
//        }
//        return value;
//    }
//
//    private void storePreferences() {
//        if ( PREFERENCES_FILE != null ) {
//            try {
//                properties.store( new FileOutputStream( PREFERENCES_FILE ), "Preferences for PhET, see " + PhetCommonConstants.PHET_HOME_URL );
//            }
//            catch ( IOException e ) {
//                e.printStackTrace();
//            }
//        }
//    }
//
//    public String toString() {
//        return properties.toString();
//    }
//
//    public static void main( String[] args ) throws IOException {
//        PhetPreferences phetPreferences = new PhetPreferences();
//        System.out.println( "phetPreferences = " + phetPreferences );
//    }
}
