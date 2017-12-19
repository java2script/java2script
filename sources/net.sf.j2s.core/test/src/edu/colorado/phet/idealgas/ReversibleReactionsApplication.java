// Copyright 2002-2011, University of Colorado

/**
 * Class: IdealGasApplication
 * Package: edu.colorado.phet.idealgas
 * Author: Another Guy
 * Date: Sep 10, 2004
 */
package edu.colorado.phet.idealgas;

//import edu.colorado.phet.common.application.ApplicationModel;

import java.awt.Color;

import javax.swing.SwingUtilities;

import edu.colorado.phet.common.phetcommon.application.ApplicationConstructor;
import edu.colorado.phet.common.phetcommon.application.Module;
import edu.colorado.phet.common.phetcommon.application.PhetApplication;
import edu.colorado.phet.common.phetcommon.application.PhetApplicationConfig;
import edu.colorado.phet.common.phetcommon.application.PhetApplicationLauncher;
import edu.colorado.phet.common.phetgraphics.application.PhetGraphicsModule;
import edu.colorado.phet.common.phetgraphics.view.ApparatusPanel;
import edu.colorado.phet.idealgas.controller.MovableWallsModule;
import edu.colorado.phet.idealgas.model.IdealGasClock;

public class ReversibleReactionsApplication extends PhetApplication {
	
	private MovableWallsModule wallsModule;
	
	public ReversibleReactionsApplication(PhetApplicationConfig config) {
		super(config);

		IdealGasClock clock = new IdealGasClock(IdealGasConfig.WAIT_TIME, IdealGasConfig.TIME_STEP);

		wallsModule = new MovableWallsModule(clock, config) {
			@Override
			protected void addHelp() {
				addStoveHelp();// stove help only
				addThermometerHelp();
			}
		};
		setModules(new Module[] { wallsModule });
		// setModules( new Module[] { new MovableWallsModule( getClock() ) } );

	}

	@Override
	protected void parseArgs(String[] args) {
		super.parseArgs(args);

		for (int i = 0; i < args.length; i++) {
			String arg = args[i];
			if (arg.startsWith("-B")) {
				PhetGraphicsModule[] modules = (PhetGraphicsModule[]) this.getModules();
				for (int j = 0; j < modules.length; j++) {
					ApparatusPanel ap = modules[j].getApparatusPanel();
					ap.setBackground(Color.black);
					ap.paintImmediately(ap.getBounds());
				}
			}
		}
	}

	public static void main(final String[] args) {
		
		final PhetApplicationConfig appConfig = new PhetApplicationConfig(args,
				IdealGasConfig.PROJECT_NAME,
				IdealGasConfig.FLAVOR_REVERSIBLE_REACTIONS);

		preloadImages();

		SwingUtilities.invokeLater(new Runnable() {
			
			// invokeLater ensures that images are loaded and ready to go.

			@Override
			public void run() {
				ApplicationConstructor appConstructor = new ApplicationConstructor() {
					@Override
					public PhetApplication getApplication(PhetApplicationConfig config) {
						return new ReversibleReactionsApplication(config);
					}
				};

				appConfig.setLookAndFeel(new IdealGasLookAndFeel());
				appConfig.setFrameSetup(IdealGasConfig.FRAME_SETUP);
				new PhetApplicationLauncher().launchSim(appConfig, appConstructor);
			}
		});
	}

	private static void preloadImages() {
		// BH these are needed because they are operated upon by Image operations
    IdealGasResources.getImage(IdealGasConfig.BLUE_PARTICLE_IMAGE_FILE);
    IdealGasResources.getImage(IdealGasConfig.RED_PARTICLE_IMAGE_FILE);
    IdealGasResources.getImage(IdealGasConfig.GREEN_PARTICLE_IMAGE_FILE);
	}
}
