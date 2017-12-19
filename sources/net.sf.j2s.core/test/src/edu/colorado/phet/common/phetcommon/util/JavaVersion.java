// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.util;


/**
 * JavaVersion encapsulates the specification of Java version names.
 * Version names and release types are described at
 * http://java.sun.com/j2se/versioning_naming.html.
 * <p/>
 * Version names apply to both the JRE and the JVM.
 * The specification is the same, but the JRE and JVM are separately versioned,
 * so they will typically have different version names.
 * <p/>
 * The general form of a version name is shown in the specification as n.n.n_nn[-identifier].
 * More specifically, the general form is M.m.a[_uu][-identifier], where the components are:
 * <ul>
 * <li>M = major release number
 * <li>m = minor release number
 * <li>a = maintenance release number
 * <li>uu = update number
 * <li>identifier = build identifier
 * <li>[x] indicates that component x is optional
 * </ul>
 * <p/>
 * It's also important to use the System properties that give the full version name.
 * When you type "java -version" at a command line, you see something like this:
 * <code>
 * java version "1.5.0_16"
 * Java(TM) 2 Runtime Environment, Standard Edition (build 1.5.0_16-b06-284)
 * Java HotSpot(TM) Client VM (build 1.5.0_16-133, mixed mode, sharing)
 * </code>
 * <p/>
 * These lines correspond to the following System properties:
 * <code>
 * java.version (eg, 1.5.0_16)
 * java.runtime.version (eg, 1.5.0_16-b06-284)
 * java.vm.version (eg, 1.5.0_16-133)
 * </code>
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public abstract class JavaVersion {

    private final String version;
    private int majorNumber, minorNumber, maintenanceNumber, updateNumber;
    private String identifier;

    /**
     * JREVersion is the version information for the JRE (Java Runtime Environment).
     *
     * @author Chris Malley (cmalley@pixelzoom.com)
     */
    public static class JREVersion extends JavaVersion {

        public JREVersion() {
            /*
             * java.version pertains to the JRE, but does not include the build identifier.
             * java.runtime.version is the full version name for the JRE.
             */
            super( System.getProperty( "java.runtime.version" ) );
        }
    }

    /*
     * Base class constructor, does the parsing of the version name string.
     */
    private JavaVersion( String s ) {

        version = s;

        String majorString = null;
        String minorString = null;
        String maintenanceString = null;
        String updateString = "0";

        int iPrev = 0;
        int i = 0;

        try {
            i = s.indexOf( '.' );
            majorString = s.substring( iPrev, i );

            iPrev = i + 1;
            i = s.indexOf( '.', iPrev );
            if ( i != -1 ) {
                minorString = s.substring( iPrev, i );
            }

            iPrev = i + 1;
            i = s.indexOf( '_', iPrev );
            if ( i != -1 ) {
                // n.n.n_nn
                maintenanceString = s.substring( iPrev, i );

                iPrev = i + 1;
                i = s.indexOf( '-', iPrev );
                if ( i != -1 ) {
                    // n.n.n_nn-identifier
                    updateString = s.substring( iPrev, i );
                    iPrev = i + 1;
                    identifier = s.substring( iPrev );
                }
                else {
                    // n.n.n_nn
                    updateString = s.substring( iPrev );
                }
            }
            else {
                updateString = null;
                // n.n.n
                i = s.indexOf( '-', iPrev );
                if ( i != -1 ) {
                    // n.n.n-identifier
                    maintenanceString = s.substring( iPrev, i );
                    iPrev = i + 1;
                    identifier = s.substring( iPrev );
                }
                else {
                    // n.n.n
                    maintenanceString = s.substring( iPrev );
                }
            }


            majorNumber = Integer.valueOf( majorString ).intValue();
            if ( minorString != null ) {
                minorNumber = Integer.valueOf( minorString ).intValue();
            }
            else {
                minorNumber = 0;
            }
            if ( maintenanceString != null ) {
                maintenanceNumber = Integer.valueOf( maintenanceString ).intValue();
            }
            else {
                maintenanceNumber = 0;
            }
            if ( updateString != null ) {
                updateNumber = Integer.valueOf( updateString ).intValue();
            }

            // if parsing worked correctly, the individual components can be reassembled into the original string
            assert ( version.equals( toString() ) );
        }
        catch ( StringIndexOutOfBoundsException e ) {
            System.err.println( "JavaVersion: StringIndexOutOfBoundsException parsing " + version );
        }
        catch ( NumberFormatException e ) {
            System.err.println( "JavaVersion: NumberFormatException parsing " + version );
        }
    }

    /**
     * Gets the version name.
     *
     * @return
     */
    public String getVersion() {
        return version;
    }

    /**
     * Gets the major number for the release.
     * For example, 1 in 1.6.0.
     *
     * @return
     */
    public int getMajorNumber() {
        return majorNumber;
    }

    /**
     * Gets the minor number for the release.
     * For example, 6 in 1.6.0.
     *
     * @return
     */
    public int getMinorNumber() {
        return minorNumber;
    }

    /**
     * Gets the maintenance number.
     * For example, 2 in 1.3.2.
     * A value > 0 indicates a Maintenance release.
     *
     * @return
     */
    public int getMaintenanceNumber() {
        return maintenanceNumber;
    }

    /**
     * Gets the update number.
     * For example, 16 in 1.5.0_16.
     * <p/>
     * This indicates an update to a Feature or Maintenance release.
     * The higher the number, the more recent the update.
     * <p/>
     * The specification indicates that update numbers work like this example:
     * 1.3.0 < 1.3.0_01 < 1.3.1 < 1.3.1_01
     * <p/>
     * This seems to imply that the update number will never be 00.
     * So we'll use value of 0 to indicate that there was no update number.
     *
     * @return
     */
    public int getUpdateNumber() {
        return updateNumber;
    }

    /**
     * Gets the build identifier.
     * For example, "ea" in 1.5.0-ea.
     * For a GA (FCS) release, this will be null.
     * The identifier is often used to represent a particular milestone, for example:
     * <code>
     * ea (early access)
     * beta
     * rc1 (release candidate 1)
     * <code>
     *
     * @return
     */
    public String getIdentifier() {
        return identifier;
    }

    /**
     * Is this a Feature release?
     * A feature release has the format: n.n.0[-identifier]
     * The final digit is always a 0.
     * The -identifier is required for any non-GA (non-FCS) release.
     * A GA (FCS) release never has a -identifier.
     *
     * @return
     */
    public boolean isFeatureRelease() {
        return ( maintenanceNumber == 0 );
    }

    /**
     * Is this a Maintenance release?
     * A maintenance release has the format: n.n.n[_nn][-identifier]
     * The final digit is never a 0.
     * The -identifier is required for any non-GA (non-FCS) release.
     * A GA (FCS) release never has a -identifier.
     *
     * @return
     */
    public boolean isMaintenanceRelease() {
        return ( maintenanceNumber != 0 );
    }

    /**
     * Is this an Update release?
     * An update release has the format: n.n.n_nn[-identifier]
     * The first three digits are identical to those of the feature or maintenance release that is being updated.
     * The two digits following the underbar indicate the update number. The higher the number, the more recent the update.
     * The -identifier is required for any non-GA (non-FCS) release.
     * A GA (FCS) release never has a -identifier.
     *
     * @return
     */
    public boolean isUpdateRelease() {
        return ( updateNumber != 0 );
    }

    /**
     * Is this a General Availability (GA) release?
     * A GA release has no build identifier.
     *
     * @return
     */
    public boolean isGARelease() {
        return ( identifier == null );
    }

    /**
     * Is this is First Customer Ship (FCS) release?
     * A FCS release is another common name for a GA release.
     *
     * @return
     */
    public boolean isFCSRelease() {
        return isGARelease();
    }

    /**
     * String representation of this object.
     * Should return the same value as getVersion.
     */
    @Override
		public String toString() {
        String s = majorNumber + "." + minorNumber + "." + maintenanceNumber;
        if ( updateNumber != 0 ) {
        	String n = "00" + updateNumber;
            s += "_" + n.substring(n.length() - 2);
        }
        if ( identifier != null ) {
            s += "-" + identifier;
        }
        return s;
    }

    // test
    public static void main( String[] args ) {

        JREVersion jre = new JREVersion();
        System.out.println( "JREVersion " + jre.getVersion() + " -> " + jre.toString() );

        // base class parser, positive tests
        String[] tests = { "1.3.0", "1.3.0_01", "1.3.0-b24", "1.3.1-beta-b09", "1.3.1_05-ea-b01", "1.4.0_03-ea-b01" };
        for ( int i = 0; i < tests.length; i++ ) {
            JavaVersion jtest = new JavaVersion( tests[i] ) {
            };
            System.out.println( "+parser " + tests[i] + " -> " + jtest.toString() );
        }

        // base class parser, negative tests
        String[] fail = { "", "a", "1", "1.3", "1.3.", "1.3.0_", "1.3.0_ea" };
        for ( int i = 0; i < fail.length; i++ ) {
            JavaVersion jtest = new JavaVersion( fail[i] ) {
            };
            System.out.println( "-parser " + fail[i] + " -> " + jtest.toString() );
        }
    }
}
