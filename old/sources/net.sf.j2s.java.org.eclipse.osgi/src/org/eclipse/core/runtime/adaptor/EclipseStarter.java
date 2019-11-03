/*******************************************************************************
 * Copyright (c) 2003, 2005 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package org.eclipse.core.runtime.adaptor;

import java.io.*;
import java.lang.reflect.*;
import java.net.*;
import java.security.CodeSource;
import java.security.ProtectionDomain;
import java.util.*;
import org.eclipse.core.runtime.internal.adaptor.*;
import org.eclipse.core.runtime.internal.stats.StatsManager;
import org.eclipse.osgi.framework.adaptor.FilePath;
import org.eclipse.osgi.framework.adaptor.FrameworkAdaptor;
import org.eclipse.osgi.framework.internal.core.OSGi;
import org.eclipse.osgi.framework.log.FrameworkLog;
import org.eclipse.osgi.framework.log.FrameworkLogEntry;
import org.eclipse.osgi.internal.profile.Profile;
import org.eclipse.osgi.service.datalocation.Location;
import org.eclipse.osgi.service.resolver.*;
import org.eclipse.osgi.service.runnable.ParameterizedRunnable;
import org.eclipse.osgi.util.NLS;
import org.osgi.framework.*;
import org.osgi.service.packageadmin.PackageAdmin;
import org.osgi.service.startlevel.StartLevel;
import org.osgi.util.tracker.ServiceTracker;

/**
 * Special startup class for the Eclipse Platform. This class cannot be 
 * instantiated; all functionality is provided by static methods. 
 * <p>
 * The Eclipse Platform makes heavy use of Java class loaders for loading 
 * plug-ins. Even the Eclipse Runtime itself and the OSGi framework need
 * to be loaded by special class loaders. The upshot is that a 
 * client program (such as a Java main program, a servlet) cannot  
 * reference any part of Eclipse directly. Instead, a client must use this 
 * loader class to start the platform, invoking functionality defined 
 * in plug-ins, and shutting down the platform when done. 
 * </p>
 * <p>Note that the fields on this class are not API. </p>
 * @since 3.0
 */
public class EclipseStarter {
	private static FrameworkAdaptor adaptor;
	private static BundleContext context;
	private static ServiceTracker applicationTracker;
	private static boolean initialize = false;
	public static boolean debug = false;
	private static boolean running = false;

	// command line arguments
	private static final String CLEAN = "-clean"; //$NON-NLS-1$
	private static final String CONSOLE = "-console"; //$NON-NLS-1$
	private static final String CONSOLE_LOG = "-consoleLog"; //$NON-NLS-1$
	private static final String DEBUG = "-debug"; //$NON-NLS-1$
	private static final String INITIALIZE = "-initialize"; //$NON-NLS-1$
	private static final String DEV = "-dev"; //$NON-NLS-1$
	private static final String WS = "-ws"; //$NON-NLS-1$
	private static final String OS = "-os"; //$NON-NLS-1$
	private static final String ARCH = "-arch"; //$NON-NLS-1$
	private static final String NL = "-nl"; //$NON-NLS-1$	
	private static final String CONFIGURATION = "-configuration"; //$NON-NLS-1$	
	private static final String USER = "-user"; //$NON-NLS-1$
	private static final String NOEXIT = "-noExit"; //$NON-NLS-1$

	// this is more of an Eclipse argument but this OSGi implementation stores its 
	// metadata alongside Eclipse's.
	private static final String DATA = "-data"; //$NON-NLS-1$

	// System properties
	public static final String PROP_BUNDLES = "osgi.bundles"; //$NON-NLS-1$
	public static final String PROP_BUNDLES_STARTLEVEL = "osgi.bundles.defaultStartLevel"; //$NON-NLS-1$ //The start level used to install the bundles
	public static final String PROP_EXTENSIONS = "osgi.framework.extensions"; //$NON-NLS-1$
	public static final String PROP_INITIAL_STARTLEVEL = "osgi.startLevel"; //$NON-NLS-1$ //The start level when the fwl start
	public static final String PROP_DEBUG = "osgi.debug"; //$NON-NLS-1$
	public static final String PROP_DEV = "osgi.dev"; //$NON-NLS-1$
	public static final String PROP_CLEAN = "osgi.clean"; //$NON-NLS-1$
	public static final String PROP_CONSOLE = "osgi.console"; //$NON-NLS-1$
	public static final String PROP_CONSOLE_CLASS = "osgi.consoleClass"; //$NON-NLS-1$
	public static final String PROP_CHECK_CONFIG = "osgi.checkConfiguration"; //$NON-NLS-1$
	public static final String PROP_OS = "osgi.os"; //$NON-NLS-1$
	public static final String PROP_WS = "osgi.ws"; //$NON-NLS-1$
	public static final String PROP_NL = "osgi.nl"; //$NON-NLS-1$
	public static final String PROP_ARCH = "osgi.arch"; //$NON-NLS-1$
	public static final String PROP_ADAPTOR = "osgi.adaptor"; //$NON-NLS-1$
	public static final String PROP_SYSPATH = "osgi.syspath"; //$NON-NLS-1$
	public static final String PROP_LOGFILE = "osgi.logfile"; //$NON-NLS-1$
	public static final String PROP_FRAMEWORK = "osgi.framework"; //$NON-NLS-1$
	public static final String PROP_INSTALL_AREA = "osgi.install.area"; //$NON-NLS-1$
	public static final String PROP_FRAMEWORK_SHAPE = "osgi.framework.shape"; //$NON-NLS-1$ //the shape of the fwk (jar, or folder)
	public static final String PROP_NOSHUTDOWN = "osgi.noShutdown"; //$NON-NLS-1$

	public static final String PROP_EXITCODE = "eclipse.exitcode"; //$NON-NLS-1$
	public static final String PROP_EXITDATA = "eclipse.exitdata"; //$NON-NLS-1$
	public static final String PROP_CONSOLE_LOG = "eclipse.consoleLog"; //$NON-NLS-1$
	private static final String PROP_VM = "eclipse.vm"; //$NON-NLS-1$
	private static final String PROP_VMARGS = "eclipse.vmargs"; //$NON-NLS-1$
	private static final String PROP_COMMANDS = "eclipse.commands"; //$NON-NLS-1$
	public static final String PROP_IGNOREAPP = "eclipse.ignoreApp"; //$NON-NLS-1$
	public static final String PROP_REFRESH_BUNDLES = "eclipse.refreshBundles"; //$NON-NLS-1$

	private static final String FILE_SCHEME = "file:"; //$NON-NLS-1$
	private static final String FILE_PROTOCOL = "file"; //$NON-NLS-1$
	private static final String REFERENCE_SCHEME = "reference:"; //$NON-NLS-1$
	private static final String REFERENCE_PROTOCOL = "reference"; //$NON-NLS-1$
	private static final String INITIAL_LOCATION = "initial@"; //$NON-NLS-1$
	/** string containing the classname of the adaptor to be used in this framework instance */
	protected static final String DEFAULT_ADAPTOR_CLASS = "org.eclipse.core.runtime.adaptor.EclipseAdaptor"; //$NON-NLS-1$

	private static final int DEFAULT_INITIAL_STARTLEVEL = 6; // default value for legacy purposes
	private static final String DEFAULT_BUNDLES_STARTLEVEL = "4"; //$NON-NLS-1$
	// Console information
	protected static final String DEFAULT_CONSOLE_CLASS = "org.eclipse.osgi.framework.internal.core.FrameworkConsole"; //$NON-NLS-1$
	private static final String CONSOLE_NAME = "OSGi Console"; //$NON-NLS-1$

	private static FrameworkLog log;

	/**
	 * This is the main to start osgi.
	 * It only works when the framework is being jared as a single jar
	 */
	public static void main(String[] args) throws Exception {
		URL url = EclipseStarter.class.getProtectionDomain().getCodeSource().getLocation();
		System.getProperties().put(PROP_FRAMEWORK, url.toExternalForm());
		String filePart = url.getFile();
		System.getProperties().put(PROP_INSTALL_AREA, filePart.substring(0, filePart.lastIndexOf('/')));
		System.getProperties().put(PROP_NOSHUTDOWN, "true"); //$NON-NLS-1$
		run(args, null);
	}

	/**
	 * Launches the platform and runs a single application. The application is either identified
	 * in the given arguments (e.g., -application &ltapp id&gt) or in the <code>eclipse.application</code> 
	 * System property.  This convenience method starts 
	 * up the platform, runs the indicated application, and then shuts down the 
	 * platform. The platform must not be running already. 
	 * 
	 * @param args the command line-style arguments used to configure the platform
	 * @param endSplashHandler the block of code to run to tear down the splash 
	 * 	screen or <code>null</code> if no tear down is required
	 * @return the result of running the application
	 * @throws Exception if anything goes wrong
	 */
	public static Object run(String[] args, Runnable endSplashHandler) throws Exception {
		if (Profile.PROFILE && Profile.STARTUP)
			Profile.logEnter("EclipseStarter.run()", null); //$NON-NLS-1$
		if (running)
			throw new IllegalStateException(EclipseAdaptorMsg.ECLIPSE_STARTUP_ALREADY_RUNNING);
		boolean startupFailed = true;
		try {
			startup(args, endSplashHandler);
			startupFailed = false;
			if (Boolean.getBoolean(PROP_IGNOREAPP))
				return null;
			return run(null);
		} catch (Throwable e) {
			// ensure the splash screen is down
			if (endSplashHandler != null)
				endSplashHandler.run();
			// may use startupFailed to understand where the error happened
			FrameworkLogEntry logEntry = new FrameworkLogEntry(FrameworkAdaptor.FRAMEWORK_SYMBOLICNAME, startupFailed ? EclipseAdaptorMsg.ECLIPSE_STARTUP_STARTUP_ERROR : EclipseAdaptorMsg.ECLIPSE_STARTUP_APP_ERROR, 1, e, null); //$NON-NLS-1$//$NON-NLS-2$
			if (log != null) {
				log.log(logEntry);
				logUnresolvedBundles(context.getBundles());
			} else
				// TODO desperate measure - ideally, we should write this to disk (a la Main.log)
				e.printStackTrace();
		} finally {
			try {
				if (!Boolean.getBoolean(PROP_NOSHUTDOWN))
					shutdown();
			} catch (Throwable e) {
				FrameworkLogEntry logEntry = new FrameworkLogEntry(FrameworkAdaptor.FRAMEWORK_SYMBOLICNAME, EclipseAdaptorMsg.ECLIPSE_STARTUP_SHUTDOWN_ERROR, 1, e, null);
				if (log != null)
					log.log(logEntry);
				else
					// TODO desperate measure - ideally, we should write this to disk (a la Main.log)
					e.printStackTrace();
			}
			if (Profile.PROFILE && Profile.STARTUP)
				Profile.logExit("EclipseStarter.run()"); //$NON-NLS-1$
			if (Profile.PROFILE) {
				String report = Profile.getProfileLog();
				// avoiding writing to the console if there is nothing to print
				if (report != null && report.length() > 0)
					System.out.println(report);
			}
		}
		// first check to see if the framework is forcing a restart
		if (Boolean.getBoolean("osgi.forcedRestart")) { //$NON-NLS-1$
			System.getProperties().put(PROP_EXITCODE, "23"); //$NON-NLS-1$
			return null;
		}
		// we only get here if an error happened
		System.getProperties().put(PROP_EXITCODE, "13"); //$NON-NLS-1$
		System.getProperties().put(PROP_EXITDATA, NLS.bind(EclipseAdaptorMsg.ECLIPSE_STARTUP_ERROR_CHECK_LOG, log.getFile().getPath()));
		return null;
	}

	/**
	 * Returns true if the platform is already running, false otherwise.
	 * @return whether or not the platform is already running
	 */
	public static boolean isRunning() {
		return running;
	}

	protected static FrameworkLog createFrameworkLog() {
		FrameworkLog frameworkLog;
		String logFileProp = System.getProperty(EclipseStarter.PROP_LOGFILE);
		if (logFileProp != null) {
			frameworkLog = new EclipseLog(new File(logFileProp));
		} else {
			Location location = LocationManager.getConfigurationLocation();
			File configAreaDirectory = null;
			if (location != null)
				// TODO assumes the URL is a file: url
				configAreaDirectory = new File(location.getURL().getFile());

			if (configAreaDirectory != null) {
				String logFileName = Long.toString(System.currentTimeMillis()) + EclipseAdaptor.F_LOG;
				File logFile = new File(configAreaDirectory, logFileName);
				System.getProperties().put(EclipseStarter.PROP_LOGFILE, logFile.getAbsolutePath());
				frameworkLog = new EclipseLog(logFile);
			} else
				frameworkLog = new EclipseLog();
		}
		if ("true".equals(System.getProperty(EclipseStarter.PROP_CONSOLE_LOG))) //$NON-NLS-1$
			frameworkLog.setConsoleLog(true);
		return frameworkLog;
	}

	/**
	 * Starts the platform and sets it up to run a single application. The application is either identified
	 * in the given arguments (e.g., -application &ltapp id&gt) or in the <code>eclipse.application</code>
	 * System property.  The platform must not be running already. 
	 * <p>
	 * The given runnable (if not <code>null</code>) is used to tear down the splash screen if required.
	 * </p>
	 * @param args the arguments passed to the application
	 * @throws Exception if anything goes wrong
	 */
	public static void startup(String[] args, Runnable endSplashHandler) throws Exception {
		if (Profile.PROFILE && Profile.STARTUP)
			Profile.logEnter("EclipseStarter.startup()", null); //$NON-NLS-1$
		if (running)
			throw new IllegalStateException(EclipseAdaptorMsg.ECLIPSE_STARTUP_ALREADY_RUNNING);
		processCommandLine(args);
		LocationManager.initializeLocations();
		log = createFrameworkLog();
		initializeContextFinder();
		loadConfigurationInfo();
		finalizeProperties();
		if (Profile.PROFILE)
			Profile.initProps(); // catch any Profile properties set in eclipse.properties...
		if (Profile.PROFILE && Profile.STARTUP)
			Profile.logTime("EclipseStarter.startup()", "props inited"); //$NON-NLS-1$ //$NON-NLS-2$
		adaptor = createAdaptor();
		if (Profile.PROFILE && Profile.STARTUP)
			Profile.logTime("EclipseStarter.startup()", "adapter created"); //$NON-NLS-1$ //$NON-NLS-2$
		((EclipseAdaptor) adaptor).setLog(log);
		if (Profile.PROFILE && Profile.STARTUP)
			Profile.logTime("EclipseStarter.startup()", "adapter log set"); //$NON-NLS-1$ //$NON-NLS-2$
		OSGi osgi = new OSGi(adaptor);
		if (Profile.PROFILE && Profile.STARTUP)
			Profile.logTime("EclipseStarter.startup()", "OSGi created"); //$NON-NLS-1$ //$NON-NLS-2$
		osgi.launch();
		if (Profile.PROFILE && Profile.STARTUP)
			Profile.logTime("EclipseStarter.startup()", "osgi launched"); //$NON-NLS-1$ //$NON-NLS-2$
		String console = System.getProperty(PROP_CONSOLE);
		if (console != null) {
			startConsole(osgi, new String[0], console);
			if (Profile.PROFILE && Profile.STARTUP)
				Profile.logTime("EclipseStarter.startup()", "console started"); //$NON-NLS-1$ //$NON-NLS-2$
		}
		context = osgi.getBundleContext();
		publishSplashScreen(endSplashHandler);
		if (Profile.PROFILE && Profile.STARTUP)
			Profile.logTime("EclipseStarter.startup()", "loading basic bundles"); //$NON-NLS-1$ //$NON-NLS-2$
		Bundle[] startBundles = loadBasicBundles();
		// set the framework start level to the ultimate value.  This will actually start things
		// running if they are persistently active.
		setStartLevel(getStartLevel());
		if ("true".equals(System.getProperty(PROP_REFRESH_BUNDLES))) //$NON-NLS-1$
			refreshPackages(getCurrentBundles(false));
		if (Profile.PROFILE && Profile.STARTUP)
			Profile.logTime("EclipseStarter.startup()", "StartLevel set"); //$NON-NLS-1$ //$NON-NLS-2$
		// they should all be active by this time
		ensureBundlesActive(startBundles);
		if (debug || System.getProperty(PROP_DEV) != null)
			// only spend time showing unresolved bundles in dev/debug mode
			logUnresolvedBundles(context.getBundles());
		running = true;
		if (Profile.PROFILE && Profile.STARTUP)
			Profile.logExit("EclipseStarter.startup()"); //$NON-NLS-1$
	}

	private static void initializeContextFinder() {
		Thread current = Thread.currentThread();
		try {
			Method getContextClassLoader = Thread.class.getMethod("getContextClassLoader", null); //$NON-NLS-1$
			Method setContextClassLoader = Thread.class.getMethod("setContextClassLoader", new Class[] {ClassLoader.class}); //$NON-NLS-1$
			Object[] params = new Object[] {new ContextFinder((ClassLoader) getContextClassLoader.invoke(current, null))};
			setContextClassLoader.invoke(current, params);
			return;
		} catch (SecurityException e) {
			//Ignore
		} catch (NoSuchMethodException e) {
			//Ignore
		} catch (IllegalArgumentException e) {
			//Ignore
		} catch (IllegalAccessException e) {
			//Ignore
		} catch (InvocationTargetException e) {
			//Ignore
		}
		FrameworkLogEntry entry = new FrameworkLogEntry(FrameworkAdaptor.FRAMEWORK_SYMBOLICNAME, NLS.bind(EclipseAdaptorMsg.ECLIPSE_CLASSLOADER_CANNOT_SET_CONTEXTFINDER, null), 0, null, null);
		log.log(entry);
	}

	private static int getStartLevel() {
		String level = System.getProperty(PROP_INITIAL_STARTLEVEL);
		if (level != null)
			try {
				return Integer.parseInt(level);
			} catch (NumberFormatException e) {
				if (debug)
					System.out.println("Start level = " + level + "  parsed. Using hardcoded default: 6"); //$NON-NLS-1$ //$NON-NLS-2$
			}
		return DEFAULT_INITIAL_STARTLEVEL;
	}

	/**
	 * Runs the applicaiton for which the platform was started. The platform 
	 * must be running. 
	 * <p>
	 * The given argument is passed to the application being run.  If it is <code>null</code>
	 * then the command line arguments used in starting the platform, and not consumed
	 * by the platform code, are passed to the application as a <code>String[]</code>.
	 * </p>
	 * @param argument the argument passed to the application. May be <code>null</code>
	 * @return the result of running the application
	 * @throws Exception if anything goes wrong
	 */
	public static Object run(Object argument) throws Exception {
		if (Profile.PROFILE && Profile.STARTUP)
			Profile.logEnter("EclipseStarter.run(Object)()", null); //$NON-NLS-1$
		if (!running)
			throw new IllegalStateException(EclipseAdaptorMsg.ECLIPSE_STARTUP_NOT_RUNNING);
		// if we are just initializing, do not run the application just return.
		if (initialize)
			return new Integer(0);
		initializeApplicationTracker();
		if (Profile.PROFILE && Profile.STARTUP)
			Profile.logTime("EclipseStarter.run(Object)()", "applicaton tracker initialized"); //$NON-NLS-1$ //$NON-NLS-2$
		ParameterizedRunnable application = (ParameterizedRunnable) applicationTracker.getService();
		applicationTracker.close();
		if (application == null)
			throw new IllegalStateException(EclipseAdaptorMsg.ECLIPSE_STARTUP_ERROR_NO_APPLICATION);
		if (debug) {
			String timeString = System.getProperty("eclipse.startTime"); //$NON-NLS-1$ 
			long time = timeString == null ? 0L : Long.parseLong(timeString);
			System.out.println("Starting application: " + (System.currentTimeMillis() - time)); //$NON-NLS-1$ 
		}
		if (Profile.PROFILE && (Profile.STARTUP || Profile.BENCHMARK))
			Profile.logTime("EclipseStarter.run(Object)()", "framework initialized! starting application..."); //$NON-NLS-1$ //$NON-NLS-2$
		try {
			return application.run(argument);
		} finally {
			if (Profile.PROFILE && Profile.STARTUP)
				Profile.logExit("EclipseStarter.run(Object)()"); //$NON-NLS-1$
		}
	}

	/**
	 * Shuts down the Platform. The state of the Platform is not automatically 
	 * saved before shutting down. 
	 * <p>
	 * On return, the Platform will no longer be running (but could be re-launched 
	 * with another call to startup). If relaunching, care must be taken to reinitialize
	 * any System properties which the platform uses (e.g., osgi.instance.area) as
	 * some policies in the platform do not allow resetting of such properties on 
	 * subsequent runs.
	 * </p><p>
	 * Any objects handed out by running Platform, 
	 * including Platform runnables obtained via getRunnable, will be 
	 * permanently invalid. The effects of attempting to invoke methods 
	 * on invalid objects is undefined. 
	 * </p>
	 * @throws Exception if anything goes wrong
	 */
	public static void shutdown() throws Exception {
		if (!running)
			return;
		stopSystemBundle();
	}

	private static void ensureBundlesActive(Bundle[] bundles) {
		for (int i = 0; i < bundles.length; i++) {
			if (bundles[i].getState() != Bundle.ACTIVE) {
				String message = NLS.bind(EclipseAdaptorMsg.ECLIPSE_STARTUP_ERROR_BUNDLE_NOT_ACTIVE, bundles[i]);
				throw new IllegalStateException(message);
			}
		}
	}

	private static void logUnresolvedBundles(Bundle[] bundles) {
		State state = adaptor.getState();
		FrameworkLog logService = adaptor.getFrameworkLog();
		StateHelper stateHelper = adaptor.getPlatformAdmin().getStateHelper();
		for (int i = 0; i < bundles.length; i++)
			if (bundles[i].getState() == Bundle.INSTALLED) {
				String generalMessage = NLS.bind(EclipseAdaptorMsg.ECLIPSE_STARTUP_ERROR_BUNDLE_NOT_RESOLVED, bundles[i]);
				BundleDescription description = state.getBundle(bundles[i].getBundleId());
				// for some reason, the state does not know about that bundle
				if (description == null)
					continue;
				FrameworkLogEntry[] logChildren = null;
				VersionConstraint[] unsatisfied = stateHelper.getUnsatisfiedConstraints(description);
				if (unsatisfied.length > 0) {
					// the bundle wasn't resolved due to some of its constraints were unsatisfiable
					logChildren = new FrameworkLogEntry[unsatisfied.length];
					for (int j = 0; j < unsatisfied.length; j++)
						logChildren[j] = new FrameworkLogEntry(FrameworkAdaptor.FRAMEWORK_SYMBOLICNAME, EclipseAdaptorMsg.getResolutionFailureMessage(unsatisfied[j]), 0, null, null);
				} else if (description.getSymbolicName() != null) {
					BundleDescription[] homonyms = state.getBundles(description.getSymbolicName());
					for (int j = 0; j < homonyms.length; j++)
						if (homonyms[j].isResolved()) {
							logChildren = new FrameworkLogEntry[1];
							logChildren[0] = new FrameworkLogEntry(FrameworkAdaptor.FRAMEWORK_SYMBOLICNAME, NLS.bind(EclipseAdaptorMsg.ECLIPSE_CONSOLE_OTHER_VERSION, homonyms[j].getLocation()), 0, null, null); //$NON-NLS-1$
						}
				}

				logService.log(new FrameworkLogEntry(FrameworkAdaptor.FRAMEWORK_SYMBOLICNAME, generalMessage, 0, null, logChildren));
			}
	}

	private static void publishSplashScreen(final Runnable endSplashHandler) {
		// InternalPlatform now how to retrieve this later
		Dictionary properties = new Hashtable();
		properties.put("name", "splashscreen"); //$NON-NLS-1$ //$NON-NLS-2$
		Runnable handler = new Runnable() {
			public void run() {
				StatsManager.doneBooting();
				endSplashHandler.run();
			}
		};
		context.registerService(Runnable.class.getName(), handler, properties);
	}

	private static URL searchForBundle(String name, String parent) throws MalformedURLException {
		URL url = null;
		File fileLocation = null;
		boolean reference = false;
		try {
			URL child = new URL(name);
			url = new URL(new File(parent).toURL(), name);
		} catch (MalformedURLException e) {
			// TODO this is legacy support for non-URL names.  It should be removed eventually.
			// if name was not a URL then construct one.  
			// Assume it should be a reference and htat it is relative.  This support need not 
			// be robust as it is temporary..
			File child = new File(name);
			fileLocation = child.isAbsolute() ? child : new File(parent, name);
			url = new URL(REFERENCE_PROTOCOL, null, fileLocation.toURL().toExternalForm());
			reference = true;
		}
		// if the name was a URL then see if it is relative.  If so, insert syspath.
		if (!reference) {
			URL baseURL = url;
			// if it is a reference URL then strip off the reference: and set base to the file:...
			if (url.getProtocol().equals(REFERENCE_PROTOCOL)) {
				reference = true;
				String baseSpec = url.getFile();
				if (baseSpec.startsWith(FILE_SCHEME)) {
					File child = new File(baseSpec.substring(5));
					baseURL = child.isAbsolute() ? child.toURL() : new File(parent, child.getPath()).toURL();
				} else
					baseURL = new URL(baseSpec);
			}

			fileLocation = new File(baseURL.getFile());
			// if the location is relative, prefix it with the parent
			if (!fileLocation.isAbsolute())
				fileLocation = new File(parent, fileLocation.toString());
		}
		// If the result is a reference then search for the real result and 
		// reconstruct the answer.
		if (reference) {
			String result = searchFor(fileLocation.getName(), new File(fileLocation.getParent()).getAbsolutePath());
			if (result != null)
				url = new URL(REFERENCE_PROTOCOL, null, FILE_SCHEME + result);
			else
				return null;
		}

		// finally we have something worth trying	
		try {
			URLConnection result = url.openConnection();
			result.connect();
			return url;
		} catch (IOException e) {
			//			int i = location.lastIndexOf('_');
			//			return i == -1? location : location.substring(0, i);
			return null;
		}
	}

	/*
	 * Ensure all basic bundles are installed, resolved and scheduled to start. Returns an array containing
	 * all basic bundles that are marked to start. 
	 */
	private static Bundle[] loadBasicBundles() throws IOException {
		long startTime = System.currentTimeMillis();
		String osgiBundles = System.getProperty(PROP_BUNDLES);
		String osgiExtensions = System.getProperty(PROP_EXTENSIONS);
		if (osgiExtensions != null && osgiExtensions.length() > 0) {
			osgiBundles = osgiExtensions + ',' + osgiBundles;
			System.getProperties().put(PROP_BUNDLES, osgiBundles);
		}
		String[] installEntries = getArrayFromList(osgiBundles, ","); //$NON-NLS-1$
		// get the initial bundle list from the installEntries
		InitialBundle[] initialBundles = getInitialBundles(installEntries);
		// get the list of currently installed initial bundles from the framework
		Bundle[] curInitBundles = getCurrentBundles(true);

		// list of bundles to be refreshed
		List toRefresh = new ArrayList(curInitBundles.length);
		// uninstall any of the currently installed bundles that do not exist in the 
		// initial bundle list from installEntries.
		uninstallBundles(curInitBundles, initialBundles, toRefresh);

		// install the initialBundles that are not already installed.
		ArrayList startBundles = new ArrayList(installEntries.length);
		installBundles(initialBundles, curInitBundles, startBundles, toRefresh);

		// If we installed/uninstalled something, force a refresh of all installed/uninstalled bundles
		if (!toRefresh.isEmpty())
			refreshPackages((Bundle[]) toRefresh.toArray(new Bundle[toRefresh.size()]));

		// schedule all basic bundles to be started
		Bundle[] startInitBundles = (Bundle[]) startBundles.toArray(new Bundle[startBundles.size()]);
		startBundles(startInitBundles);

		if (debug)
			System.out.println("Time to load bundles: " + (System.currentTimeMillis() - startTime)); //$NON-NLS-1$
		return startInitBundles;
	}

	private static InitialBundle[] getInitialBundles(String[] installEntries) throws MalformedURLException {
		ArrayList result = new ArrayList(installEntries.length);
		int defaultStartLevel = Integer.parseInt(System.getProperty(PROP_BUNDLES_STARTLEVEL, DEFAULT_BUNDLES_STARTLEVEL));
		String syspath = getSysPath();
		for (int i = 0; i < installEntries.length; i++) {
			String name = installEntries[i];
			int level = defaultStartLevel;
			boolean start = false;
			int index = name.indexOf('@');
			if (index >= 0) {
				String[] attributes = getArrayFromList(name.substring(index + 1, name.length()), ":"); //$NON-NLS-1$
				name = name.substring(0, index);
				for (int j = 0; j < attributes.length; j++) {
					String attribute = attributes[j];
					if (attribute.equals("start")) //$NON-NLS-1$
						start = true;
					else
						level = Integer.parseInt(attribute);
				}
			}
			URL location = searchForBundle(name, syspath);
			if (location == null) {
				FrameworkLogEntry entry = new FrameworkLogEntry(FrameworkAdaptor.FRAMEWORK_SYMBOLICNAME, NLS.bind(EclipseAdaptorMsg.ECLIPSE_STARTUP_BUNDLE_NOT_FOUND, installEntries[i]), 0, null, null);
				log.log(entry);
				// skip this entry
				continue;
			}
			location = makeRelative(LocationManager.getInstallLocation().getURL(), location);
			String locationString = INITIAL_LOCATION + location.toExternalForm();
			result.add(new InitialBundle(locationString, location, level, start));
		}
		return (InitialBundle[]) result.toArray(new InitialBundle[result.size()]);
	}

	private static void refreshPackages(Bundle[] bundles) {
		ServiceReference packageAdminRef = context.getServiceReference(PackageAdmin.class.getName());
		PackageAdmin packageAdmin = null;
		if (packageAdminRef != null) {
			packageAdmin = (PackageAdmin) context.getService(packageAdminRef);
			if (packageAdmin == null)
				return;
		}
		// TODO this is such a hack it is silly.  There are still cases for race conditions etc
		// but this should allow for some progress...
		final Semaphore semaphore = new Semaphore(0);
		FrameworkListener listener = new FrameworkListener() {
			public void frameworkEvent(FrameworkEvent event) {
				if (event.getType() == FrameworkEvent.PACKAGES_REFRESHED)
					semaphore.release();
			}
		};
		context.addFrameworkListener(listener);
		packageAdmin.refreshPackages(bundles);
		semaphore.acquire();
		context.removeFrameworkListener(listener);
		context.ungetService(packageAdminRef);
	}

	/**
	 *  Invokes the OSGi Console on another thread
	 *
	 * @param osgi The current OSGi instance for the console to attach to
	 * @param consoleArgs An String array containing commands from the command line
	 * for the console to execute
	 * @param consolePort the port on which to run the console.  Empty string implies the default port.
	 */
	private static void startConsole(OSGi osgi, String[] consoleArgs, String consolePort) {
		try {
			String consoleClassName = System.getProperty(PROP_CONSOLE_CLASS, DEFAULT_CONSOLE_CLASS);
			Class consoleClass = Class.forName(consoleClassName);
			Class[] parameterTypes;
			Object[] parameters;
			if (consolePort.length() == 0) {
				parameterTypes = new Class[] {OSGi.class, String[].class};
				parameters = new Object[] {osgi, consoleArgs};
			} else {
				parameterTypes = new Class[] {OSGi.class, int.class, String[].class};
				parameters = new Object[] {osgi, new Integer(consolePort), consoleArgs};
			}
			Constructor constructor = consoleClass.getConstructor(parameterTypes);
			Object console = constructor.newInstance(parameters);
			Thread t = new Thread(((Runnable) console), CONSOLE_NAME);
			t.start();
		} catch (NumberFormatException nfe) {
			// TODO log or something other than write on System.err
			System.err.println(NLS.bind(EclipseAdaptorMsg.ECLIPSE_STARTUP_INVALID_PORT, consolePort));
		} catch (Exception ex) {
			System.out.println(NLS.bind(EclipseAdaptorMsg.ECLIPSE_STARTUP_FAILED_FIND, CONSOLE_NAME));
		}

	}

	/**
	 *  Creates and returns the adaptor
	 *
	 *  @return a FrameworkAdaptor object
	 */
	private static FrameworkAdaptor createAdaptor() throws Exception {
		String adaptorClassName = System.getProperty(PROP_ADAPTOR, DEFAULT_ADAPTOR_CLASS);
		Class adaptorClass = Class.forName(adaptorClassName);
		Class[] constructorArgs = new Class[] {String[].class};
		Constructor constructor = adaptorClass.getConstructor(constructorArgs);
		return (FrameworkAdaptor) constructor.newInstance(new Object[] {new String[0]});
	}

	private static String[] processCommandLine(String[] args) throws Exception {
		EclipseEnvironmentInfo.setAllArgs(args);
		if (args.length == 0) {
			EclipseEnvironmentInfo.setFrameworkArgs(args);
			EclipseEnvironmentInfo.setAllArgs(args);
			return args;
		}
		int[] configArgs = new int[args.length];
		configArgs[0] = -1; // need to initialize the first element to something that could not be an index.
		int configArgIndex = 0;
		for (int i = 0; i < args.length; i++) {
			boolean found = false;
			// check for args without parameters (i.e., a flag arg)

			// check if debug should be enabled for the entire platform
			// If this is the last arg or there is a following arg (i.e., arg+1 has a leading -), 
			// simply enable debug.  Otherwise, assume that that the following arg is
			// actually the filename of an options file.  This will be processed below.
			if (args[i].equalsIgnoreCase(DEBUG) && ((i + 1 == args.length) || ((i + 1 < args.length) && (args[i + 1].startsWith("-"))))) { //$NON-NLS-1$
				System.getProperties().put(PROP_DEBUG, ""); //$NON-NLS-1$
				debug = true;
				found = true;
			}

			// check if development mode should be enabled for the entire platform
			// If this is the last arg or there is a following arg (i.e., arg+1 has a leading -), 
			// simply enable development mode.  Otherwise, assume that that the following arg is
			// actually some additional development time class path entries.  This will be processed below.
			if (args[i].equalsIgnoreCase(DEV) && ((i + 1 == args.length) || ((i + 1 < args.length) && (args[i + 1].startsWith("-"))))) { //$NON-NLS-1$
				System.getProperties().put(PROP_DEV, ""); //$NON-NLS-1$
				found = true;
			}

			// look for the initialization arg
			if (args[i].equalsIgnoreCase(INITIALIZE)) {
				initialize = true;
				found = true;
			}

			// look for the clean flag.
			if (args[i].equalsIgnoreCase(CLEAN)) {
				System.getProperties().put(PROP_CLEAN, "true"); //$NON-NLS-1$
				found = true;
			}

			// look for the consoleLog flag
			if (args[i].equalsIgnoreCase(CONSOLE_LOG)) {
				System.getProperties().put(PROP_CONSOLE_LOG, "true"); //$NON-NLS-1$
				found = true;
			}

			// look for the console with no port.  
			if (args[i].equalsIgnoreCase(CONSOLE) && ((i + 1 == args.length) || ((i + 1 < args.length) && (args[i + 1].startsWith("-"))))) { //$NON-NLS-1$
				System.getProperties().put(PROP_CONSOLE, ""); //$NON-NLS-1$
				found = true;
			}

			if (args[i].equalsIgnoreCase(NOEXIT)) {
				System.getProperties().put(PROP_NOSHUTDOWN, "true"); //$NON-NLS-1$
				found = true;
			}

			if (found) {
				configArgs[configArgIndex++] = i;
				continue;
			}
			// check for args with parameters. If we are at the last argument or if the next one
			// has a '-' as the first character, then we can't have an arg with a parm so continue.
			if (i == args.length - 1 || args[i + 1].startsWith("-")) { //$NON-NLS-1$
				continue;
			}
			String arg = args[++i];

			// look for the console and port.  
			if (args[i - 1].equalsIgnoreCase(CONSOLE)) {
				System.getProperties().put(PROP_CONSOLE, arg);
				found = true;
			}

			// look for the configuration location .  
			if (args[i - 1].equalsIgnoreCase(CONFIGURATION)) {
				System.getProperties().put(LocationManager.PROP_CONFIG_AREA, arg);
				found = true;
			}

			// look for the data location for this instance.  
			if (args[i - 1].equalsIgnoreCase(DATA)) {
				System.getProperties().put(LocationManager.PROP_INSTANCE_AREA, arg);
				found = true;
			}

			// look for the user location for this instance.  
			if (args[i - 1].equalsIgnoreCase(USER)) {
				System.getProperties().put(LocationManager.PROP_USER_AREA, arg);
				found = true;
			}

			// look for the development mode and class path entries.  
			if (args[i - 1].equalsIgnoreCase(DEV)) {
				System.getProperties().put(PROP_DEV, arg);
				found = true;
			}

			// look for the debug mode and option file location.  
			if (args[i - 1].equalsIgnoreCase(DEBUG)) {
				System.getProperties().put(PROP_DEBUG, arg);
				debug = true;
				found = true;
			}

			// look for the window system.  
			if (args[i - 1].equalsIgnoreCase(WS)) {
				System.getProperties().put(PROP_WS, arg);
				found = true;
			}

			// look for the operating system
			if (args[i - 1].equalsIgnoreCase(OS)) {
				System.getProperties().put(PROP_OS, arg);
				found = true;
			}

			// look for the system architecture
			if (args[i - 1].equalsIgnoreCase(ARCH)) {
				System.getProperties().put(PROP_ARCH, arg);
				found = true;
			}

			// look for the nationality/language
			if (args[i - 1].equalsIgnoreCase(NL)) {
				System.getProperties().put(PROP_NL, arg);
				found = true;
			}
			// done checking for args.  Remember where an arg was found 
			if (found) {
				configArgs[configArgIndex++] = i - 1;
				configArgs[configArgIndex++] = i;
			}
		}

		// remove all the arguments consumed by this argument parsing
		if (configArgIndex == 0) {
			EclipseEnvironmentInfo.setFrameworkArgs(new String[0]);
			EclipseEnvironmentInfo.setAppArgs(args);
			return args;
		}
		String[] appArgs = new String[args.length - configArgIndex];
		String[] frameworkArgs = new String[configArgIndex];
		configArgIndex = 0;
		int j = 0;
		int k = 0;
		for (int i = 0; i < args.length; i++) {
			if (i == configArgs[configArgIndex]) {
				frameworkArgs[k++] = args[i];
				configArgIndex++;
			} else
				appArgs[j++] = args[i];
		}
		EclipseEnvironmentInfo.setFrameworkArgs(frameworkArgs);
		EclipseEnvironmentInfo.setAppArgs(appArgs);
		return appArgs;
	}

	/**
	 * Returns the result of converting a list of comma-separated tokens into an array
	 * 
	 * @return the array of string tokens
	 * @param prop the initial comma-separated string
	 */
	private static String[] getArrayFromList(String prop, String separator) {
		if (prop == null || prop.trim().equals("")) //$NON-NLS-1$
			return new String[0];
		Vector list = new Vector();
		StringTokenizer tokens = new StringTokenizer(prop, separator); //$NON-NLS-1$
		while (tokens.hasMoreTokens()) {
			String token = tokens.nextToken().trim();
			if (!token.equals("")) //$NON-NLS-1$
				list.addElement(token);
		}
		return list.isEmpty() ? new String[0] : (String[]) list.toArray(new String[list.size()]);
	}

	protected static String getSysPath() {
		String result = System.getProperty(PROP_SYSPATH);
		if (result != null)
			return result;
		result = getSysPathFromURL(System.getProperty(PROP_FRAMEWORK));
		if (result == null)
			result = getSysPathFromCodeSource();
		if (result == null)
			throw new IllegalStateException("Can not find the system path.");
		if (Character.isUpperCase(result.charAt(0))) {
			char[] chars = result.toCharArray();
			chars[0] = Character.toLowerCase(chars[0]);
			result = new String(chars);
		}
		System.getProperties().put(PROP_SYSPATH, result);
		return result;
	}

	private static String getSysPathFromURL(String urlSpec) {
		if (urlSpec == null)
			return null;
		URL url = null;
		try {
			url = new URL(urlSpec);
		} catch (MalformedURLException e) {
			return null;
		}
		File fwkFile = new File(url.getFile());
		fwkFile = new File(fwkFile.getAbsolutePath());
		fwkFile = new File(fwkFile.getParent());
		return fwkFile.getAbsolutePath();
	}

	private static String getSysPathFromCodeSource() {
		ProtectionDomain pd = EclipseStarter.class.getProtectionDomain();
		if (pd == null)
			return null;
		CodeSource cs = pd.getCodeSource();
		if (cs == null)
			return null;
		URL url = cs.getLocation();
		if (url == null)
			return null;
		String result = url.getFile();
		if (result.endsWith(".jar")) { //$NON-NLS-1$
			result = result.substring(0, result.lastIndexOf('/'));
			if ("folder".equals(System.getProperty(PROP_FRAMEWORK_SHAPE))) //$NON-NLS-1$
				result = result.substring(0, result.lastIndexOf('/'));
		} else {
			if (result.endsWith("/")) //$NON-NLS-1$
				result = result.substring(0, result.length() - 1);
			result = result.substring(0, result.lastIndexOf('/'));
			result = result.substring(0, result.lastIndexOf('/'));
		}
		return result;
	}

	private static Bundle[] getCurrentBundles(boolean includeInitial) {
		Bundle[] installed = context.getBundles();
		ArrayList initial = new ArrayList();
		for (int i = 0; i < installed.length; i++) {
			Bundle bundle = installed[i];
			if (bundle.getLocation().startsWith(INITIAL_LOCATION)) {
				if (includeInitial)
					initial.add(bundle);
			} else if (!includeInitial && bundle.getBundleId() != 0)
				initial.add(bundle);
		}
		return (Bundle[]) initial.toArray(new Bundle[initial.size()]);
	}

	private static Bundle getBundleByLocation(String location, Bundle[] bundles) {
		for (int i = 0; i < bundles.length; i++) {
			Bundle bundle = bundles[i];
			if (location.equalsIgnoreCase(bundle.getLocation()))
				return bundle;
		}
		return null;
	}

	private static void uninstallBundles(Bundle[] curInitBundles, InitialBundle[] newInitBundles, List toRefresh) {
		for (int i = 0; i < curInitBundles.length; i++) {
			boolean found = false;
			for (int j = 0; j < newInitBundles.length; j++) {
				if (curInitBundles[i].getLocation().equalsIgnoreCase(newInitBundles[j].locationString)) {
					found = true;
					break;
				}
			}
			if (!found)
				try {
					curInitBundles[i].uninstall();
					toRefresh.add(curInitBundles[i]);
				} catch (BundleException e) {
					FrameworkLogEntry entry = new FrameworkLogEntry(FrameworkAdaptor.FRAMEWORK_SYMBOLICNAME, NLS.bind(EclipseAdaptorMsg.ECLIPSE_STARTUP_FAILED_UNINSTALL, curInitBundles[i].getLocation()), 0, e, null);
					log.log(entry);
				}
		}
	}

	private static void installBundles(InitialBundle[] initialBundles, Bundle[] curInitBundles, ArrayList startBundles, List toRefresh) {
		ServiceReference reference = context.getServiceReference(StartLevel.class.getName());
		StartLevel startService = null;
		if (reference != null)
			startService = (StartLevel) context.getService(reference);
		for (int i = 0; i < initialBundles.length; i++) {
			Bundle osgiBundle = getBundleByLocation(initialBundles[i].locationString, curInitBundles);
			try {
				// don't need to install if it is already installed
				if (osgiBundle == null) {
					InputStream in = initialBundles[i].location.openStream();
					osgiBundle = context.installBundle(initialBundles[i].locationString, in);
					if (initialBundles[i].level >= 0 && startService != null)
						startService.setBundleStartLevel(osgiBundle, initialBundles[i].level);
				}
				if (initialBundles[i].start)
					startBundles.add(osgiBundle);
				// include basic bundles in case they were not resolved before
				if ((osgiBundle.getState() & Bundle.INSTALLED) != 0)
					toRefresh.add(osgiBundle);
			} catch (BundleException e) {
				FrameworkLogEntry entry = new FrameworkLogEntry(FrameworkAdaptor.FRAMEWORK_SYMBOLICNAME, NLS.bind(EclipseAdaptorMsg.ECLIPSE_STARTUP_FAILED_INSTALL, initialBundles[i].location), 0, e, null);
				log.log(entry);
			} catch (IOException e) {
				FrameworkLogEntry entry = new FrameworkLogEntry(FrameworkAdaptor.FRAMEWORK_SYMBOLICNAME, NLS.bind(EclipseAdaptorMsg.ECLIPSE_STARTUP_FAILED_INSTALL, initialBundles[i].location), 0, e, null);
				log.log(entry);
			}
		}
		context.ungetService(reference);
	}

	private static void startBundles(Bundle[] bundles) {
		for (int i = 0; i < bundles.length; i++) {
			Bundle bundle = bundles[i];
			if (bundle.getState() == Bundle.INSTALLED)
				throw new IllegalStateException(NLS.bind(EclipseAdaptorMsg.ECLIPSE_STARTUP_ERROR_BUNDLE_NOT_RESOLVED, bundle.getLocation()));
			try {
				bundle.start();
			} catch (BundleException e) {
				FrameworkLogEntry entry = new FrameworkLogEntry(FrameworkAdaptor.FRAMEWORK_SYMBOLICNAME, NLS.bind(EclipseAdaptorMsg.ECLIPSE_STARTUP_FAILED_START, bundle.getLocation()), 0, e, null);
				log.log(entry);
			}
		}
	}

	private static void initializeApplicationTracker() {
		Filter filter = null;
		try {
			String appClass = ParameterizedRunnable.class.getName();
			filter = context.createFilter("(&(objectClass=" + appClass + ")(eclipse.application=*))"); //$NON-NLS-1$ //$NON-NLS-2$
		} catch (InvalidSyntaxException e) {
			// ignore this.  It should never happen as we have tested the above format.
		}
		applicationTracker = new ServiceTracker(context, filter, null);
		applicationTracker.open();
	}

	private static void loadConfigurationInfo() {
		Location configArea = LocationManager.getConfigurationLocation();
		if (configArea == null)
			return;

		URL location = null;
		try {
			location = new URL(configArea.getURL().toExternalForm() + LocationManager.CONFIG_FILE);
		} catch (MalformedURLException e) {
			// its ok.  Thie should never happen
		}
		mergeProperties(System.getProperties(), loadProperties(location));
	}

	private static Properties loadProperties(URL location) {
		Properties result = new Properties();
		if (location == null)
			return result;
		try {
			InputStream in = location.openStream();
			try {
				result.load(in);
			} finally {
				in.close();
			}
		} catch (IOException e) {
			// its ok if there is no file.  We'll just use the defaults for everything
			// TODO but it might be nice to log something with gentle wording (i.e., it is not an error)
		}
		return result;
	}

	/**
	 * Returns a URL which is equivalent to the given URL relative to the
	 * specified base URL. Works only for file: URLs
	 * @throws MalformedURLException 
	 */
	private static URL makeRelative(URL base, URL location) throws MalformedURLException {
		if (base == null)
			return location;
		if (!"file".equals(base.getProtocol())) //$NON-NLS-1$
			return location;
		boolean reference = location.getProtocol().equals(REFERENCE_PROTOCOL);
		URL nonReferenceLocation = location;
		if (reference)
			nonReferenceLocation = new URL(location.getPath());
		// if some URL component does not match, return the original location
		if (!base.getProtocol().equals(nonReferenceLocation.getProtocol()))
			return location;
		File locationPath = new File(nonReferenceLocation.getPath());
		// if location is not absolute, return original location 
		if (!locationPath.isAbsolute())
			return location;
		File relativePath = makeRelative(new File(base.getPath()), locationPath);
		String urlPath = relativePath.getPath();
		if (File.separatorChar != '/')
			urlPath = urlPath.replace(File.separatorChar, '/');
		if (nonReferenceLocation.getPath().endsWith("/")) //$NON-NLS-1$
			// restore original trailing slash 
			urlPath += '/';
		// couldn't use File to create URL here because it prepends the path with user.dir 
		URL relativeURL = new URL(base.getProtocol(), base.getHost(), base.getPort(), urlPath);
		if (reference)
			relativeURL = new URL(REFERENCE_SCHEME + relativeURL.toExternalForm());
		return relativeURL;
	}

	private static File makeRelative(File base, File location) {
		if (!location.isAbsolute())
			return location;
		File relative = new File(new FilePath(base).makeRelative(new FilePath(location)));
		return relative;
	}

	private static void mergeProperties(Properties destination, Properties source) {
		for (Enumeration e = source.keys(); e.hasMoreElements();) {
			String key = (String) e.nextElement();
			String value = source.getProperty(key);
			if (destination.getProperty(key) == null)
				destination.put(key, value);
		}
	}

	private static void stopSystemBundle() throws BundleException {
		if (context == null || !running)
			return;
		Bundle systemBundle = context.getBundle(0);
		if (systemBundle.getState() == Bundle.ACTIVE) {
			final Semaphore semaphore = new Semaphore(0);
			FrameworkListener listener = new FrameworkListener() {
				public void frameworkEvent(FrameworkEvent event) {
					if (event.getType() == FrameworkEvent.STARTLEVEL_CHANGED)
						semaphore.release();
				}

			};
			context.addFrameworkListener(listener);
			systemBundle.stop();
			semaphore.acquire();
			context.removeFrameworkListener(listener);
		}
		context = null;
		applicationTracker = null;
		running = false;
	}

	private static void setStartLevel(final int value) {
		ServiceTracker tracker = new ServiceTracker(context, StartLevel.class.getName(), null);
		tracker.open();
		final StartLevel startLevel = (StartLevel) tracker.getService();
		final Semaphore semaphore = new Semaphore(0);
		FrameworkListener listener = new FrameworkListener() {
			public void frameworkEvent(FrameworkEvent event) {
				if (event.getType() == FrameworkEvent.STARTLEVEL_CHANGED && startLevel.getStartLevel() == value)
					semaphore.release();
			}
		};
		context.addFrameworkListener(listener);
		startLevel.setStartLevel(value);
		semaphore.acquire();
		context.removeFrameworkListener(listener);
		tracker.close();
	}

	/**
	 * Searches for the given target directory immediately under
	 * the given start location.  If one is found then this location is returned; 
	 * otherwise an exception is thrown.
	 * 
	 * @return the location where target directory was found
	 * @param start the location to begin searching
	 */
	private static String searchFor(final String target, String start) {
		String[] candidates = new File(start).list();
		if (candidates == null)
			return null;
		String result = null;
		Object maxVersion = null;
		for (int i = 0; i < candidates.length; i++) {
			File candidate = new File(start, candidates[i]);
			if (!candidate.getName().equals(target) && !candidate.getName().startsWith(target + "_")) //$NON-NLS-1$
				continue;
			String name = candidate.getName();
			String version = ""; //$NON-NLS-1$ // Note: directory with version suffix is always > than directory without version suffix
			int index = name.indexOf('_');
			if (index != -1)
				version = name.substring(index + 1);
			Object currentVersion = getVersionElements(version);
			if (maxVersion == null) {
				result = candidate.getAbsolutePath();
				maxVersion = currentVersion;
			} else {
				if (compareVersion((Object[]) maxVersion, (Object[]) currentVersion) < 0) {
					result = candidate.getAbsolutePath();
					maxVersion = currentVersion;
				}
			}
		}
		if (result == null)
			return null;
		return result.replace(File.separatorChar, '/') + "/"; //$NON-NLS-1$
	}

	/**
	 * Do a quick parse of version identifier so its elements can be correctly compared.
	 * If we are unable to parse the full version, remaining elements are initialized
	 * with suitable defaults.
	 * @return an array of size 4; first three elements are of type Integer (representing
	 * major, minor and service) and the fourth element is of type String (representing
	 * qualifier). Note, that returning anything else will cause exceptions in the caller.
	 */
	private static Object[] getVersionElements(String version) {
		Object[] result = {new Integer(0), new Integer(0), new Integer(0), ""}; //$NON-NLS-1$
		StringTokenizer t = new StringTokenizer(version, "."); //$NON-NLS-1$
		String token;
		int i = 0;
		while (t.hasMoreTokens() && i < 4) {
			token = t.nextToken();
			if (i < 3) {
				// major, minor or service ... numeric values
				try {
					result[i++] = new Integer(token);
				} catch (Exception e) {
					// invalid number format - use default numbers (0) for the rest
					break;
				}
			} else {
				// qualifier ... string value
				result[i++] = token;
			}
		}
		return result;
	}

	/**
	 * Compares version strings. 
	 * @return result of comparison, as integer;
	 * <code><0</code> if left < right;
	 * <code>0</code> if left == right;
	 * <code>>0</code> if left > right;
	 */
	private static int compareVersion(Object[] left, Object[] right) {
		int result = ((Integer) left[0]).compareTo((Integer) right[0]); // compare major
		if (result != 0)
			return result;

		result = ((Integer) left[1]).compareTo((Integer) right[1]); // compare minor
		if (result != 0)
			return result;

		result = ((Integer) left[2]).compareTo((Integer) right[2]); // compare service
		if (result != 0)
			return result;

		return ((String) left[3]).compareTo((String) right[3]); // compare qualifier
	}

	private static String buildCommandLine(String arg, String value) {
		StringBuffer result = new StringBuffer(300);
		String entry = System.getProperty(PROP_VM);
		if (entry == null)
			return null;
		result.append(entry);
		result.append('\n');
		// append the vmargs and commands.  Assume that these already end in \n
		entry = System.getProperty(PROP_VMARGS);
		if (entry != null)
			result.append(entry);
		entry = System.getProperty(PROP_COMMANDS);
		if (entry != null)
			result.append(entry);
		String commandLine = result.toString();
		int i = commandLine.indexOf(arg + "\n"); //$NON-NLS-1$
		if (i == 0)
			commandLine += arg + "\n" + value + "\n"; //$NON-NLS-1$ //$NON-NLS-2$
		else {
			i += arg.length() + 1;
			String left = commandLine.substring(0, i);
			int j = commandLine.indexOf('\n', i);
			String right = commandLine.substring(j);
			commandLine = left + value + right;
		}
		return commandLine;
	}

	private static void finalizeProperties() {
		// if check config is unknown and we are in dev mode, 
		if (System.getProperty(PROP_DEV) != null && System.getProperty(PROP_CHECK_CONFIG) == null)
			System.getProperties().put(PROP_CHECK_CONFIG, "true"); //$NON-NLS-1$
	}

	private static class InitialBundle {
		public final String locationString;
		public final URL location;
		public final int level;
		public final boolean start;

		InitialBundle(String locationString, URL location, int level, boolean start) {
			this.locationString = locationString;
			this.location = location;
			this.level = level;
			this.start = start;
		}
	}
}
