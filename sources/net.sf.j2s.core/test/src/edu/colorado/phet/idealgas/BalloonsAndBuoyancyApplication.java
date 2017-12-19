// Copyright 2002-2011, University of Colorado

/**
 * Class: IdealGasApplication
 * Package: edu.colorado.phet.idealgas
 * Author: Another Guy
 * Date: Sep 10, 2004
 */
package edu.colorado.phet.idealgas;

import java.awt.Color;
import java.awt.geom.Point2D;
import java.util.ArrayList;

import javax.swing.SwingUtilities;

import edu.colorado.phet.common.phetcommon.Interface;
import edu.colorado.phet.common.phetcommon.application.ApplicationConstructor;
import edu.colorado.phet.common.phetcommon.application.PhetApplication;
import edu.colorado.phet.common.phetcommon.application.PhetApplicationConfig;
import edu.colorado.phet.common.phetcommon.application.PhetApplicationLauncher;
import edu.colorado.phet.common.phetcommon.util.SimpleObserver;
import edu.colorado.phet.common.phetgraphics.application.PhetGraphicsModule;
import edu.colorado.phet.common.phetgraphics.view.ApparatusPanel;
import edu.colorado.phet.idealgas.controller.IdealGasModule;
import edu.colorado.phet.idealgas.model.IdealGasClock;
import edu.colorado.phet.idealgas.view.WiggleMeGraphic;

public class BalloonsAndBuoyancyApplication extends PhetApplication {

	private static class BalloonsAndBuoyancyClock extends IdealGasClock {
		
		public BalloonsAndBuoyancyClock() {
			super(IdealGasConfig.WAIT_TIME, IdealGasConfig.TIME_STEP);
		}
	}

	public BalloonsAndBuoyancyApplication(PhetApplicationConfig config) {
		super(config);

		// BH allow for ONE module

		String modName = config.getOptionArg("--module");

		ArrayList<IdealGasModule> list = new ArrayList<IdealGasModule>();

		// BH use reflection

		// Create the modules
		if (modName == null) {
			newIGModule("HotAirBalloon", config, list);
			newIGModule("RigidHollowSphere", config, list);
			newIGModule("HeliumBalloon", config, list);
			newIGModule("IdealGas", config, list);
		} else {
			newIGModule(modName, config, list);
			getPhetFrame().setTitle(modName);
		}
		setModules(list.toArray(new IdealGasModule[list.size()]));
		final IdealGasModule module1 = list.get(0);
		final WiggleMeGraphic wiggleMeGraphic = new WiggleMeGraphic(
				module1.getApparatusPanel(), new Point2D.Double(
						IdealGasConfig.X_BASE_OFFSET + 480,
						IdealGasConfig.Y_BASE_OFFSET + 170), module1.getModel());
		wiggleMeGraphic.start();

		module1.addGraphic(wiggleMeGraphic, 40);
		module1.getPump().addObserver(new SimpleObserver() {
			@Override
			public void update() {
				if (wiggleMeGraphic != null) {
					wiggleMeGraphic.kill();
					module1.getApparatusPanel().removeGraphic(wiggleMeGraphic);
					module1.getPump().removeObserver(this);
				}
			}
		});
	}

	private static void preloadImages() {
		// BH these are needed because they are operated upon by Image operations
    IdealGasResources.getImage(IdealGasConfig.BLUE_PARTICLE_IMAGE_FILE);
    IdealGasResources.getImage(IdealGasConfig.RED_PARTICLE_IMAGE_FILE);
    IdealGasResources.getImage(IdealGasConfig.GREEN_PARTICLE_IMAGE_FILE);
		IdealGasResources.getImage(IdealGasConfig.PUMP_IMAGE_FILE);
	}

	/**
	 * BH create a module using reflection so as not to require all these classes
	 * 
	 * @param name
	 * @param list
	 * @return
	 */
	private IdealGasModule newIGModule(String name, PhetApplicationConfig config, // BH
																																								// use
																																								// reflection
																																								// here
			ArrayList<IdealGasModule> list) {
		BalloonsAndBuoyancyClock clock = new BalloonsAndBuoyancyClock();
		IdealGasModule module = (IdealGasModule) Interface.getInstanceWithParams(
				"edu.colorado.phet.idealgas.controller." + name + "Module",
				new Class<?>[] { IdealGasClock.class, PhetApplicationConfig.class },
				new Object[] { clock, config });
		list.add(module);
		return module;
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
				IdealGasConfig.FLAVOR_BALLOONS_AND_BUOYANCY);

		preloadImages();

		SwingUtilities.invokeLater(new Runnable() {

			@Override
			public void run() {
				ApplicationConstructor appConstructor = new ApplicationConstructor() {
					@Override
					public PhetApplication getApplication(PhetApplicationConfig config) {
						return new BalloonsAndBuoyancyApplication(config);
					}
				};

				appConfig.setLookAndFeel(new IdealGasLookAndFeel());
				appConfig.setFrameSetup(IdealGasConfig.FRAME_SETUP);
				new PhetApplicationLauncher().launchSim(appConfig, appConstructor);
			}
		});
	}
}
