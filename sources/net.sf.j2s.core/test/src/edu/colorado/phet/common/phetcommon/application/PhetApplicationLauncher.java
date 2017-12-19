// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.application;

import javax.swing.JSpinner;
import javax.swing.SwingUtilities;
//import edu.colorado.phet.common.phetcommon.sponsorship.SponsorDialog;
//import edu.colorado.phet.common.phetcommon.sponsorship.SponsorMenuItem;
//import edu.colorado.phet.common.phetcommon.statistics.StatisticsManager;
//import edu.colorado.phet.common.phetcommon.updates.AutomaticUpdatesManager;
//import edu.colorado.phet.common.phetcommon.updates.ManualUpdatesManager;

/**
 * This launcher solves the following problems: 1. Consolidate (instead of
 * duplicate) launch code 2. Make sure that all PhetSimulations launch in the
 * Swing Event Thread Note: The application main class should not invoke any
 * unsafe Swing operations outside of the Swing thread. 3. Make sure all
 * PhetSimulations instantiate and use a PhetLookAndFeel, which is necessary to
 * enable font support for many languages.
 * <p/>
 * This implementation uses ApplicationConstructor instead of reflection to
 * ensure compile-time checking (at the expense of slightly more complicated
 * subclass implementations).
 * 
 *
 */
public class PhetApplicationLauncher {

	// //for splash window
	// private AWTSplashWindow splashWindow;
	// private Frame splashWindowOwner;

//	private void showSplashWindow(String title) {
//		// if ( splashWindow == null ) {
//		// // PhetFrame doesn't exist when this is called, so create and manage the
//		// window's owner.
//		// splashWindowOwner = new Frame();
//		// splashWindow = new AWTSplashWindow( splashWindowOwner, title );
//		// splashWindow.setVisible( true );
//		// }
//	}

//	private void disposeSplashWindow() {
//		// if ( splashWindow != null ) {
//		// splashWindow.dispose();
//		// splashWindow = null;
//		// // Clean up the window's owner that we created in showSplashWindow.
//		// splashWindowOwner.dispose();
//		// splashWindowOwner = null;
//		// }
//	}

	public void launchSim(String[] commandLineArgs, String project,
			final Class<?> phetApplicationClass) {
		launchSim(commandLineArgs, project, new ReflectionApplicationConstructor(
				phetApplicationClass));
	}

	public static class ReflectionApplicationConstructor implements
			ApplicationConstructor {
		private Class<?> phetApplicationClass;

		public ReflectionApplicationConstructor(Class<?> phetApplicationClass) {
			this.phetApplicationClass = phetApplicationClass;
		}

		@Override
		public PhetApplication getApplication(PhetApplicationConfig config) {
			try {
				return (PhetApplication) phetApplicationClass.getConstructor(
						new Class<?>[] { config.getClass() }).newInstance(
						new Object[] { config });
			} catch (Exception e) {
				throw new RuntimeException(e);
			}
		}

	}

	public void launchSim(String[] commandLineArgs, String project,
			String flavor, final Class<?> phetApplicationClass) {
		launchSim(commandLineArgs, project, flavor,
				new ReflectionApplicationConstructor(phetApplicationClass));
	}

	public void launchSim(String[] commandLineArgs, String project,
			ApplicationConstructor applicationConstructor) {
		launchSim(new PhetApplicationConfig(commandLineArgs, project),
				applicationConstructor);
	}

	public void launchSim(String[] commandLineArgs, String project,
			String flavor, ApplicationConstructor applicationConstructor) {
		launchSim(new PhetApplicationConfig(commandLineArgs, project, flavor),
				applicationConstructor);
	}

	public void launchSim(final PhetApplicationConfig config,
			final Class<?> phetApplicationClass) {
		launchSim(config,
				new ReflectionApplicationConstructor(phetApplicationClass));
	}

	public void launchSim(final PhetApplicationConfig config,
			final ApplicationConstructor applicationConstructor) {

		// //Initializes the sim-sharing subsystem.
		// //Nothing happens unless the "-study" flag is provided on the command
		// line
		// SimSharingManager.init( config );

		/*
		 * Wrap the body of main in invokeAndWait, so that all initialization occurs
		 * in the event dispatch thread. Sun now recommends doing all Swing init in
		 * the event dispatch thread. And the Piccolo-based tabs in
		 * TabbedModulePanePiccolo seem to cause startup deadlock problems if they
		 * aren't initialized in the event dispatch thread. Since we don't have an
		 * easy way to separate Swing and non-Swing init, we're stuck doing
		 * everything in invokeAndWait.
		 */

		// Use invoke and wait since many older PhET simulations
		// require the existence of a reference to the PhetApplication as soon as
		// launchSim exits
		//
		// If/when these references have been changed/removed, we can change this to
		// invokeLater()
		SwingUtilities.invokeLater(new Runnable() {
			@Override
			public void run() {

// BH Java fix #17  The following comment is in com.sun.java.swing.plaf.windows.XPStyle.java:
//  
// -----------------
// 
//  <p>These classes are designed to be used while the
//  corresponding <code>LookAndFeel</code> class has been installed
//  (<code>UIManager.setLookAndFeel(new <i>XXX</i>LookAndFeel())</code>).
//  Using them while a different <code>LookAndFeel</code> is installed
//  may produce unexpected results, including exceptions.
//  Additionally, changing the <code>LookAndFeel</code>
//  maintained by the <code>UIManager</code> without updating the
//  corresponding <code>ComponentUI</code> of any
//  <code>JComponent</code>s may also produce unexpected results,
//  such as the wrong colors showing up, and is generally not
//  encouraged.
//  
//  -----------------
//  
// The reason the "reset" button only has an outline appears to be 
// associated with this, as commenting out the following statement
// reverts to the standard Windows look, with a fully painted background.
//  
// BH Java Fix #18 (NOT) I also note that commenting out the following statement restores the
// ticks on the gravity slider for whatever reason. (Probably a sequencing
// issue in relation of background painting; not fixed in Java; no problem in SwingJS.)
			
				config.getLookAndFeel().initLookAndFeel();

			/**
				 * ignore
				 * 
				 * @j2sNative
				 */
				{
					new JSpinner(); // WORKAROUND for Unfuddle #1372 (Apple bug
													// #6710919)
				}

				if (applicationConstructor != null) {

					// sim initialization
					// showSplashWindow( config.getName() );
					final PhetApplication app = applicationConstructor
							.getApplication(config);
					app.startApplication();
					// BH disposeSplashWindow();

					// // Function for displaying Sponsor dialog and adding Sponsor menu
					// item.
					// final VoidFunction0 sponsorFunction = new VoidFunction0() {
					// public void apply() {
					// if ( SponsorDialog.shouldShow( config ) ) {
					// SponsorDialog.show( config, app.getPhetFrame(), true /*
					// startDisposeTimer */ );
					// app.getPhetFrame().getHelpMenu().add( new SponsorMenuItem(
					// config, app.getPhetFrame() ) );
					// }
					// }
					// };

					// // Function for displaying KSU Credits window
					// final VoidFunction0 ksuFunction = new VoidFunction0() {
					// public void apply() {
					// // Display KSU Credits window, followed by Sponsor dialog (both
					// optional)
					// if ( KSUCreditsWindow.shouldShow( config ) ) {
					// JWindow window = KSUCreditsWindow.show( app.getPhetFrame() );
					// // wait until KSU Credits window is closed before calling sponsor
					// function
					// window.addWindowListener( new WindowAdapter() {
					// @Override public void windowClosed( WindowEvent e ) {
					// sponsorFunction.apply();
					// }
					// } );
					// }
					// else {
					// // No KSU Credits window, call sponsor function
					// sponsorFunction.apply();
					// }
					// }
					// };
					//
					// // Start with "KSU" window
					// ksuFunction.apply();
					//
					// // //Ignore statistics and updates for sims that are still under
					// development
					// // if ( app.getSimInfo().getVersion().getMajorAsInt() >= 1 ) {
					// // // statistics
					// // StatisticsManager.initInstance( app ).start();
					// //
					// // // updates
					// // AutomaticUpdatesManager.initInstance( app ).start();
					// // ManualUpdatesManager.initInstance( app );
					// // }
				} else {
					new RuntimeException("No applicationconstructor specified")
							.printStackTrace();
				}
			}
		});
	}
}
