// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.view.util;

//import java.io.PrintWriter;
import java.util.Arrays;
import java.util.regex.Pattern;

public class StringUtil {
    private StringUtil() {
    }

    public static int asInt( String s, int defaultValue ) {
        int value;

        try {
            value = Integer.parseInt( s );
        }
        catch ( NumberFormatException nfe ) {
            System.err.println( "StringUtil: " + s + " is not an int" );
            value = defaultValue;
        }

        return value;
    }

    public static double asDouble( String s, double defaultValue ) {
        double value;

        try {
            value = Double.parseDouble( s );
        }
        catch ( NumberFormatException nfe ) {
            System.err.println( "StringUtil: " + s + " is not a double" );
            value = defaultValue;
        }

        return value;
    }

    public static long asLong( String s, long defaultValue ) {
        long value;

        try {
            value = Long.parseLong( s );
        }
        catch ( NumberFormatException nfe ) {
            System.err.println( "StringUtil: " + s + " is not a long" );
            value = defaultValue;
        }

        return value;
    }

    public static char asChar( String s, char defaultValue ) {
        if ( s.length() != 1 ) {
            System.err.println( "StringUtil: " + s + " is not a character" );

            return defaultValue;
        }

        return s.charAt( 0 );
    }

    public static boolean asBoolean( String s ) {
        return Boolean.valueOf( s ).booleanValue();
    }

    /**
     * Converts an exception's stack trace to a string.
     * Useful for displaying strings in error dialogs.
     *
     * @param e
     * @return String
     */
    public static String stackTraceToString( Exception e ) {
    	/**
    	 * @j2sNative
    	 * 
    	 * return Clazz.getstackTrace();
    	 */
    	{
        //StringWriter sw = new StringWriter();
        //PrintWriter pw = new PrintWriter( sw );
        //e.printStackTrace( pw );
        return null;//e.getStackTrace();//sw.toString();
    	}
    }

    /**
     * Does a specified string match any one of a set of regular expressions?
     * See java.util.regex.Pattern for regular expression syntax.
     *
     * @param regex
     * @param s
     * @return true or false
     */
    public static boolean matches( String[] regex, String s ) {
        boolean matches = false;
        for ( int i = 0; i < regex.length; i++ ) {
            if ( Pattern.matches( regex[i], s ) ) {
                matches = true;
                break;
            }
        }
        return matches;
    }

    /**
     * Is a specified string contained in an array of strings?
     * Useful for checking for the existence of commandline args.
     *
     * @param array
     * @param s
     * @return
     */
    public static boolean contains( String[] array, String s ) {
        boolean b = false;
        if ( array != null ) {
            b = Arrays.asList( array ).contains( s );
        }
        return b;
    }

    /**
     * Gets the basename of a class, useful in debug and toString implementations.
     *
     * @param c
     * @return
     */
    public static String basename( Class<?> c ) {
        return c.getName().replaceAll( ".*\\.", "" );
    }
}
