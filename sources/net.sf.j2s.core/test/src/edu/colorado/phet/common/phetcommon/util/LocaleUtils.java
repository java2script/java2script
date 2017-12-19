// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.util;


import java.util.Collections;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;
import java.util.StringTokenizer;


public class LocaleUtils {

    /* not intended for instantiation */
    private LocaleUtils() {
    }

    /**
     * Returns strings like "_ja" or "_en_CA" or "" for English.
     *
     * @param locale
     * @return
     */
    public static String getTranslationFileSuffix( Locale locale ) {
        assert locale != null;
        if ( locale.equals( new Locale( "en" ) ) ) {
            return "";
        }
        else {
            return "_" + localeToString( locale );
        }
    }

    /**
     * Converts a Locale to a String.
     *
     * @param locale
     * @return
     */
    public static String localeToString( Locale locale ) {
        assert ( locale != null );
        return locale.toString();
    }

    /**
     * Converts a String to a Locale.
     * Supports two formats for the string representation, as illustrated by these examples:
     * "zh" or "zh_CN"
     *
     * @param localeString
     * @return
     */
    public static Locale stringToLocale( String localeString ) {
        assert localeString != null;
        Locale locale = null;
        if ( localeString.matches( "test" ) ) {
            locale = new Locale( localeString ); /* #1756, support i18n testing */
        }
        else if ( localeString.matches( "[a-z][a-z]" ) ) { /* eg, "zh" */
            locale = new Locale( localeString );
        }
        else if ( localeString.matches( "[a-z][a-z](_[A-Z][A-Z])?" ) ) { /* eg, "zh_CN" */
            StringTokenizer tokenizer = new StringTokenizer( localeString, "_" );
            String language = tokenizer.nextToken();
            String country = tokenizer.nextToken();
            locale = new Locale( language, country );
        }
        else {
            throw new IllegalArgumentException( "malformed locale string: " + localeString );
        }
        return locale;
    }

    /**
     * Formats the locale by RFC 4646 (http://www.ietf.org/rfc/rfc4646.txt), with language and optional country codes.
     * Note that this does not include any "variant" that Java locales may have
     *
     * @param locale The locale to format
     * @return String formatted via RFC 4646
     */
    public static String localeTo4646String( Locale locale ) {
        assert ( locale != null );
        return locale.getLanguage() + ( locale.getCountry().length() > 0 ? "-" + locale.getCountry() : "" );
    }

    // following code for isTextTRL from: http://stackoverflow.com/questions/20814564/how-to-find-out-locale-dependent-text-orientation-in-java
    private static final Set<String> RTL;

    static {
        Set<String> lang = new HashSet<String>();
        lang.add( "ar" );
        lang.add( "dv" );
        lang.add( "fa" );
        lang.add( "ha" );
        lang.add( "he" );
        lang.add( "iw" );
        lang.add( "ji" );
        lang.add( "ps" );
        lang.add( "ur" );
        lang.add( "yi" );
        RTL = Collections.unmodifiableSet( lang );
    }

    public static boolean isTextRTL( Locale locale ) {
        return RTL.contains( locale.getLanguage() );
    }


    // tests
    public static void main( String[] args ) {

        // these should print out valid locale strings
        System.out.println( localeToString( new Locale( "zh" ) ) );
        System.out.println( localeToString( new Locale( "ZH" ) ) );
        System.out.println( localeToString( new Locale( "zh", "CN" ) ) );
        System.out.println( localeToString( new Locale( "ZH", "cn" ) ) );
        System.out.println( stringToLocale( "zh" ) );
        System.out.println( stringToLocale( "zh_CN" ) );
        System.out.println( stringToLocale( "test" ) );

        // these should fail
        String[] fail = { "CN", "zh_cn", "zh_", "_CN", "zn_CN_", "zn_CN_CN" };
        for ( int i = 0; i < fail.length; i++ ) {
            try {
                System.out.println( stringToLocale( fail[i] ) );
            }
            catch ( Exception e ) {
                System.out.println( e.getMessage() );
            }
        }
    }
}
