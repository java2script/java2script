// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.util;

import java.util.ArrayList;

import javax.swing.SwingUtilities;

import edu.colorado.phet.common.phetcommon.application.Module;
import edu.colorado.phet.common.phetcommon.application.PhetApplication;
import edu.colorado.phet.common.phetcommon.model.clock.IClock;
import edu.colorado.phet.common.phetcommon.model.clock.SwingClock;
import edu.colorado.phet.common.phetcommon.view.PhetFrame;

/**
 * PhetUtilities
 * <p/>
 * Static methods of general utility
 *
 * @author Ron LeMaster
 */
public class PhetUtilities {

    // Operating Systems
    public static final int OS_WINDOWS = 0;
    public static final int OS_MACINTOSH = 1;
    public static final int OS_OTHER = 2;

    private static ArrayList<Runnable> pendingRunnables = new ArrayList<Runnable>();

    private PhetUtilities() {
    }

    /**
     * Requests that a Runnable be executed by the model.
     * <p/>
     * This provides thread-safe execution of a method by the model, whether its clock is running
     * in the Swing dispatch queue thread or a model-specific thread.
     *
     * @param runnable
     */
    public static void invokeLater( Runnable runnable ) {
        pendingRunnables.add( runnable );
        Module activeModule = getActiveModule();
        if ( activeModule != null ) {
            IClock clock = activeModule.getClock();
            for ( int i = 0; i < pendingRunnables.size(); i++ ) {
                Runnable target = pendingRunnables.get( i );
                if ( clock instanceof SwingClock ) {
                    SwingUtilities.invokeLater( target );
                }
                else {
                    target.run();
                }
            }
            pendingRunnables.clear();
        }
    }

    /**
     * Returns the active module
     *
     * @return The active module
     */
    public static Module getActiveModule() {
        return PhetApplication.getInstance().getActiveModule();
    }

    /**
     * Returns a reference to the application's PhetFrame
     *
     * @return The PhetFrame
     */
    public static PhetFrame getPhetFrame() {
        return PhetApplication.getInstance().getPhetFrame();
    }

    /**
     * Returns a reference to the clock associated with the currently active module
     *
     * @return The active clock
     */
    public static IClock getActiveClock() {
        return getActiveModule().getClock();
    }

    /**
     * Gets the operating system type.
     *
     * @return OS_WINDOWS, OS_MACINTOSH, or OS_OTHER
     */
    public static int getOperatingSystem() {

        // Get the operating system name.
        String osName = "";
        try {
            osName = System.getProperty( "os.name" );
        }
        catch ( Throwable t ) {
            t.printStackTrace();
        }

        // Convert to one of the operating system constants.
        int os = OS_OTHER;
        if ( osName.toLowerCase().indexOf( "windows" ) >= 0 ) {
            os = OS_WINDOWS;
        }
        else if ( osName.startsWith( "Mac OS X" ) ) {
            os = OS_MACINTOSH;
        }

        return os;
    }

    /**
     * Determines whether we're running on a Macintosh.
     *
     * @return true or false
     */
    public static boolean isMacintosh() {
        return getOperatingSystem() == OS_MACINTOSH;
    }


    /**
     * Determines whether we're running on a Windows
     *
     * @return true or false
     */
    public static boolean isWindows() {
        return getOperatingSystem() == OS_WINDOWS;
    }

    /**
     * Are we running on Mac OS 10.4.x ?
     *
     * @return true or false
     */
    public static boolean isMacOS_10_4() {
        boolean rval = false;
        if ( isMacintosh() ) {
            String osVersion = System.getProperty( "os.version" );
            if ( osVersion != null ) {
                rval = osVersion.startsWith( "10.4" );
            }
        }
        return rval;
    }

    public static String getJavaPath() {
        return System.getProperty( "java.home" ) + System.getProperty( "file.separator" ) + "bin" + System.getProperty( "file.separator" ) + "java";
    }

    // Gets the basename of an object's class.
    public static String getClassBasename( Object object ) {
        return getBasename( object.getClass() );
    }

    // Gets the basename of a class.
    public static String getBasename( Class<?> theClass ) {
        return theClass.getName().replaceAll( ".*\\.", "" );
    }
}
