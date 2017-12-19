// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.resources;

import java.util.Locale;

/**
 * This class can be used to return a constant dummy string instead of the correct dynamically loaded string
 * for purposes of testing localization coverage.
 */
public class DummyConstantStringTester {
    //This can be used for testing. If non-null, this string is returned on calls to getLocalizedString
    private static String dummyString = null;
    private static final boolean debugStringTranslations = false;
//    private static String dummyString = "\u0637\u0642\u0645 \u0627\u062F\u0648\u0627\u062A \u0627\u0646\u0634\u0627\u0621"; //temporary code to test localization coverage and font rendering

    public static String getString( String string ) {

        //Use this to help indicate which strings are translated, while still leaving them readable and usable
        if ( debugStringTranslations ) {
            return "T[" + string + "]";
        }

        if ( dummyString != null ) {
            return dummyString;
        }
        else {
            return string;
        }
    }

    //This can be used for testing. If non-null, dummyString is returned on calls to getLocalizedString
    public static void setConstantTestString( String dummyStringValue ) {
        dummyString = dummyStringValue;
    }

    public static void setTestScenario( Locale locale, String dummyStringValue ) {
        Locale.setDefault( locale );
        setConstantTestString( dummyStringValue );
    }
}
