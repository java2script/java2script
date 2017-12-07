// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 47772 $
 * Date modified : $Date: 2011-01-07 13:53:07 -0600 (Fri, 07 Jan 2011) $
 */
package edu.colorado.phet.idealgas;

import java.awt.Color;

import edu.colorado.phet.common.phetcommon.view.util.FrameSetup;
import edu.colorado.phet.idealgas.view.ColorScheme;

/**
 * Configuration parameters for the simulation.
 */
public class IdealGasConfig {
    
    public static final String PROJECT_NAME = "ideal-gas";
    public static final String FLAVOR_BALLOONS_AND_BUOYANCY = "balloons-and-buoyancy";
    public static final String FLAVOR_DIFFUSION = "diffusion";
    public static final String FLAVOR_GAS_PROPERTIES = "gas-properties";
    public static final String FLAVOR_REVERSIBLE_REACTIONS = "reversible-reactions";

    // Title, description and version number
    public static final String TITLE = "Ideal Gas Law";
    public static final String DESCRIPTION = "<html>A simulation for investigating"
                                             + "<br>the model of gasses.</html>";
//    public static final String VERSION = "3.05";

    // Global control parameters
    public static boolean REGION_TEST;
    public static boolean HEAT_ONLY_FROM_FLOOR;

    // Color Scheme
    public static ColorScheme BLACK_BACKGROUND_COLOR_SCHEME = new ColorScheme( Color.black, Color.white, new Color( 120, 120, 120 ) );
    public static ColorScheme WHITE_BACKGROUND_COLOR_SCHEME = new ColorScheme( Color.white, Color.black, Color.black );
    public static ColorScheme COLOR_SCHEME = BLACK_BACKGROUND_COLOR_SCHEME;

    // Physical constants
    public static final float TIME_STEP = 0.1f;
    public static int WAIT_TIME = 40; // BH will be 10 in JavaScript; notice NOT final
    // BH see also org.colorado.phet.common.phetcommon.PhetCommonConstants.IS_JAVA
    static { // BH JavaScript will change nonfinal static values
    	/**
    	 * @j2sNative
    	 * 
    	 *   edu.colorado.phet.idealgas.IdealGasConfig.WAIT_TIME = 10;
    	 *   
    	 */
    	{
    	}
    	
    }
    
    public static final double TEMPERATURE_SCALE_FACTOR = 20;
    public static final double MAX_GAUGE_PRESSURE = 6.0;
    public static final double MAX_SAFE_PRESSURE = MAX_GAUGE_PRESSURE;
    public static final int MAX_GRAVITY = 40;
    // Calibration factor for stopwatch. Determined from data given me by Linda Koch and Jack Barbera
    public static final double TIME_SCALE_FACTOR = 1.71;
    public static final double PIXELS_PER_NANOMETER = 45.4;

    // Images
    public static final String IMAGE_DIRECTORY = "";
    public static final String HELP_ITEM_ICON_IMAGE_FILE = IMAGE_DIRECTORY + "help-item-icon.gif";
    public static final String BLUE_PARTICLE_IMAGE_FILE = IMAGE_DIRECTORY + "particle-blue-xsml.gif";
    //    public static final String RED_PARTICLE_IMAGE_FILE = IMAGE_DIRECTORY + "particle-B-xsml.gif";
    public static final String RED_PARTICLE_IMAGE_FILE = IMAGE_DIRECTORY + "particle-red-xsml.gif";
    public static final String GREEN_PARTICLE_IMAGE_FILE = IMAGE_DIRECTORY + "particle-green-xsml.gif";

    public static final String PARTICLE_IMAGE_FILE = IMAGE_DIRECTORY + "molecule.gif";
    public static final String PUMP_IMAGE_FILE = IMAGE_DIRECTORY + "pump-body.png";
    public static final String PUMP_BASE_IMAGE_FILE = IMAGE_DIRECTORY + "pump-base-and-hose.png";
    //    public static final String PUMP_IMAGE_FILE = IMAGE_DIRECTORY + "bicycle-pump.gif";
    public static final String HANDLE_IMAGE_FILE = IMAGE_DIRECTORY + "pump-handle.png";
    //    public static final String HANDLE_IMAGE_FILE = IMAGE_DIRECTORY + "handle.gif";
    public static final String BOX_IMAGE_FILE = IMAGE_DIRECTORY + "box.gif";

    public static final String STOVE_IMAGE_FILE = IMAGE_DIRECTORY + "stove.png";
    //    public static final String STOVE_IMAGE_FILE = IMAGE_DIRECTORY + "stove.gif";
    public static final String FLAMES_IMAGE_FILE = IMAGE_DIRECTORY + "flames.gif";
    public static final String ICE_IMAGE_FILE = IMAGE_DIRECTORY + "ice.gif";
    public static final String DOOR_IMAGE_FILE = IMAGE_DIRECTORY + "knob-and-door.gif";
    public static final String STOVE_AND_FLAME_ICON_FILE = IMAGE_DIRECTORY + "stove-and-flames-small.gif";
    public static final String STOVE_ICON_FILE = IMAGE_DIRECTORY + "stove-small.gif";
    public static final String STOVE_AND_ICE_ICON_FILE = IMAGE_DIRECTORY + "stove-and-ice-small.gif";
    public static final String HOT_AIR_BALLOON_FLAMES_IMAGE_FILE = IMAGE_DIRECTORY + "hot-air-balloon-flames.gif";
    public static final String THERMOMETER_IMAGE_FILE = IMAGE_DIRECTORY + "thermometer.gif";
    public static final String RULER_IMAGE_FILE = IMAGE_DIRECTORY + "10-nanometer-stick.png";

    // Animation images
    public static final String ANIMATION_DIRECTORY = "images/animations/";
    public static final int NUM_PUSHER_ANIMATION_FRAMES = 19;
    public static final String PUSHER_ANIMATION_IMAGE_FILE_PREFIX = ANIMATION_DIRECTORY + "pusher-light-w-tank/pusher-3-light-w-tank";
    public static final int NUM_LEANER_ANIMATION_FRAMES = 15;
    public static final String LEANER_ANIMATION_IMAGE_FILE_PREFIX = ANIMATION_DIRECTORY + "pusher-leaning-light-w-tank/pusher-leaning-light-w-tank";
    public static final String PUSHER_ANIMATION_IMAGE_FILE_TYPE = "png";

    // Offset for locating objects in the apparatus panel
    public static final int X_BASE_OFFSET = 30;
    public static final int Y_BASE_OFFSET = -100;
    public static final int X_STOVE_OFFSET = 247;
    public static final int Y_STOVE_OFFSET = 545;

    // Dimensions of control panel
    public static final int CONTROL_PANEL_WIDTH = 125;

    // Frame setup for the application
    public static final FrameSetup FRAME_SETUP = new FrameSetup.CenteredWithSize( 920, 700 );

    // Colors
    public static final Color HELP_COLOR = new Color( 50, 200, 200 );

    // Sounds
    public static final String SOUND_DIRECTORY = "http://sounds/";
    public static final String BONG_SOUND_FILE = SOUND_DIRECTORY + "bond.au";
    public static final String BOING_SOUND_FILE = SOUND_DIRECTORY + "boing.au";

    // Graphic layer specs
    public static final double READOUT_LAYER = 100;
    public static final double MOLECULE_LAYER = 10;
    
}
