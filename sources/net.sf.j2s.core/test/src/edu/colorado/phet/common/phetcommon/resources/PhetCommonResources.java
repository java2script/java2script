// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.resources;


import java.awt.image.BufferedImage;
import java.io.IOException;
import java.text.MessageFormat;
import java.util.Locale;
import java.util.Properties;

import edu.colorado.phet.common.phetcommon.util.LocaleUtils;

/**
 * PhetCommonResources is a singleton that provides access to phetcommon's JAR resources.
 */
public class PhetCommonResources {

    // Symbolic names for localized string keys
    public static final String STRING_CLOCK_PLAY = "Common.ClockControlPanel.Play";
    public static final String STRING_CLOCK_PAUSE = "Common.ClockControlPanel.Pause";
    public static final String STRING_CLOCK_STEP = "Common.ClockControlPanel.Step";
    public static final String STRING_CLOCK_STEP_BACK = "Common.ClockControlPanel.StepBack";
    public static final String STRING_CLOCK_RESTART = "Common.ClockControlPanel.Restart";
    public static final String STRING_CLOCK_REWIND = "Common.ClockControlPanel.Rewind";
    public static final String STRING_RESET_ALL = "ControlPanel.button.resetAll";
    //The RESET string may cause problems since it is loaded from the StopwatchPanel, but it is already used like this in many places, so it shouldn't be changed lightly
    public static final String STRING_RESET = "Common.StopwatchPanel.reset";
    public static final String STRING_YES = "Common.choice.yes";
    public static final String STRING_NO = "Common.choice.no";
    public static final String STRING_HELP_MENU_HELP = "Common.HelpMenu.Help";

    // Symbolic names for image resources
    public static final String IMAGE_CLOSE_BUTTON = "buttons/closeButton.png";
    public static final String IMAGE_MINIMIZE_BUTTON = "buttons/minimizeButton.png";
    public static final String IMAGE_MAXIMIZE_BUTTON = "buttons/maximizeButton.png";
    public static final String IMAGE_FAST_FORWARD = "clock/FastForward24.gif";
    public static final String IMAGE_PAUSE = "clock/Pause24.gif";
    public static final String IMAGE_PLAY = "clock/Play24.gif";
    public static final String IMAGE_REWIND = "clock/Rewind24.gif";
    public static final String IMAGE_RESTART = IMAGE_REWIND;
    public static final String IMAGE_STEP_FORWARD = "clock/StepForward24.gif";
    public static final String IMAGE_STOP = "clock/Stop24.gif";
    public static final String IMAGE_PHET_LOGO = "logos/phet-logo-120x50.jpg";

    // preferred physical font names for various ISO language codes
    private static final String PREFERRED_FONTS_RESOURCE = "localization/phetcommon-fonts.properties";

    private static PhetResources INSTANCE = new PhetResources( "phetcommon" );

    //Values for translated strings
    public static final String PICCOLO_PHET_VELOCITY_SENSOR_NODE_SPEED = getString( "PiccoloPhet.VelocitySensorNode.speed" );
    public static final String PICCOLO_PHET_VELOCITY_SENSOR_NODE_UNKNOWN = getString( "PiccoloPhet.VelocitySensorNode.unknown" );

    /* not intended for instantiation */
    private PhetCommonResources() {
    }

    public static PhetResources getInstance() {
        return INSTANCE;
    }

    /**
     * Reads a list of preferred physical font names from the phetcommon-fonts.properties resource.
     * Returns the names as an array.
     * If no preferred fonts are specified, null is returned.
     */
    public static String[] getPreferredFontNames( Locale locale ) {
        String[] names = null;
        Properties fontProperties = new Properties();
        try {
            fontProperties.load( PhetCommonResources.getInstance().getResourceAsStream( PREFERRED_FONTS_RESOURCE ) );
            String localeString = LocaleUtils.localeToString( locale );
            String key = "preferredFonts." + localeString; // eg, preferredFonts.ja
            String allNames = fontProperties.getProperty( key );
            if ( allNames != null ) {
              // BH JavaScript fix, as we are going to use the full list here
              if (allNames.indexOf("Sans") >= 0)
              	allNames += ",Arial";
              else
              	allNames += ",Serif";
              names = allNames.split( "," ); // comma separated, no whitespace
            }
        }
        catch ( IOException e ) {
            e.printStackTrace();
        }
        return names;
    }

    /**
     * Convenience method for accessing a localized String from phetcommon.
     *
     * @param key the key for which to look up the String value
     * @return the localized String
     */
    public static String getString( String key ) {
        return INSTANCE.getLocalizedString( key );
    }

    public static final char getChar( String name, char defaultValue ) {
        return INSTANCE.getLocalizedChar( name, defaultValue );
    }

    /**
     * Convenience method for accessing an image file from phetcommon.
     *
     * @param name the name of the image
     * @return BufferedImage
     */
    public static BufferedImage getImage( String name ) {
        return INSTANCE.getImage( name );
    }

    /**
     * Formats a string containing a value and units using the pattern specified in the translation file by Common.value.units.  In English
     * this has the form "{0} {1}", for example "3 meters"
     *
     * @param value the value to display
     * @param units the units for the value
     * @return the formatted string
     */
    public static String formatValueUnits( String value, String units ) {
        return MessageFormat.format( getString( "Common.value_units" ), value, units );
    }

    public static BufferedImage getMaximizeButtonImage() {
        return getImage( IMAGE_MAXIMIZE_BUTTON );
    }

    public static BufferedImage getMinimizeButtonImage() {
        return getImage( IMAGE_MINIMIZE_BUTTON );
    }
}
