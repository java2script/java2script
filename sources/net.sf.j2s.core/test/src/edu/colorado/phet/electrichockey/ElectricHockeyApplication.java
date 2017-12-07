// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.electrichockey;

import edu.colorado.phet.common.phetcommon.application.*;
import edu.colorado.phet.common.phetcommon.model.clock.ConstantDtClock;
import edu.colorado.phet.common.phetcommon.util.LocaleUtils;
import edu.colorado.phet.common.phetcommon.view.PhetLookAndFeel;
import edu.colorado.phet.common.phetcommon.view.util.FrameSetup;

public class ElectricHockeyApplication extends PhetApplication {
    private ElectricHockeyModule module;

    public ElectricHockeyApplication( PhetApplicationConfig config ) {
        super( config );
        module = new ElectricHockeyModule( config );
        addModule( module );
    }

    public static class ElectricHockeyApplicationConfig extends PhetApplicationConfig {
        public ElectricHockeyApplicationConfig( String[] commandLineArgs ) {
            super( commandLineArgs, "electric-hockey" );
            setFrameSetup( new FrameSetup.CenteredWithSize( 800, 750 ) );
            super.setLookAndFeel( new PhetLookAndFeel() );
        }

        /**
         * manually change English title for credits. The localized version should read "Electric Field Hockey" to be
         * read correctly by the website
         */
        public String getName() {
            if ( getResourceLoader().getLocale().equals( LocaleUtils.stringToLocale( "en" ) ) ) {
                return super.getName() + " - derived from work by Ruth Chabay";
            }
            else {
                return super.getName();
            }
        }
    }

    static int delay;
    
    static {
    	delay = 30;
    	/**
    	 * @j2sNative
    	 * delay = 5;
    	 */
    	{}
    }
    
    private class ElectricHockeyModule extends Module {
        public ElectricHockeyModule( PhetApplicationConfig config ) {
        	super( config.getName(), new ConstantDtClock( delay, 1 ) );
            ElectricHockeySimulationPanel balloonsSimulationPanel = new ElectricHockeySimulationPanel();
            balloonsSimulationPanel.init();
            setSimulationPanel( balloonsSimulationPanel );
            setClockControlPanel( null );
            setLogoPanelVisible( false );
        }
    }

    public static void main( String[] args ) {
        new PhetApplicationLauncher().launchSim( new ElectricHockeyApplicationConfig( args ), new ApplicationConstructor() {
            public PhetApplication getApplication( PhetApplicationConfig config ) {
                return new ElectricHockeyApplication( config );
            }
        } );
    }
}
