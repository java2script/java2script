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
import java.net.MalformedURLException;
import java.net.URL;
import java.util.*;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.SAXParserFactory;
import org.eclipse.core.runtime.internal.adaptor.*;
import org.eclipse.core.runtime.internal.stats.StatsManager;
import org.eclipse.osgi.framework.adaptor.*;
import org.eclipse.osgi.framework.adaptor.core.*;
import org.eclipse.osgi.framework.console.CommandProvider;
import org.eclipse.osgi.framework.debug.Debug;
import org.eclipse.osgi.framework.debug.FrameworkDebugOptions;
import org.eclipse.osgi.framework.internal.core.Constants;
import org.eclipse.osgi.framework.log.FrameworkLog;
import org.eclipse.osgi.framework.log.FrameworkLogEntry;
import org.eclipse.osgi.service.datalocation.Location;
import org.eclipse.osgi.service.pluginconversion.PluginConverter;
import org.eclipse.osgi.service.resolver.*;
import org.eclipse.osgi.service.urlconversion.URLConverter;
import org.eclipse.osgi.util.NLS;
import org.osgi.framework.*;

/**
 * The FrameworkAdaptor implementation used to launch to OSGi framework for Eclipse.
 * <p>
 * Clients may extend this class.
 * </p>
 * @since 3.1
 */
public class EclipseAdaptor extends AbstractFrameworkAdaptor {
	/**	System property used to clean the osgi configuration area */
	public static final String PROP_CLEAN = "osgi.clean"; //$NON-NLS-1$
	/** System property used to prevent VM exit when unexpected errors occur */
	public static final String PROP_EXITONERROR = "eclipse.exitOnError"; //$NON-NLS-1$

	static final String F_LOG = ".log"; //$NON-NLS-1$
	/** Manifest header used to specify the plugin class */
	// TODO rename it to Eclipse-PluginClass
	public static final String PLUGIN_CLASS = "Plugin-Class"; //$NON-NLS-1$
	/** Manifest header used to specify the auto start properties of a bundle */
	public static final String ECLIPSE_AUTOSTART = "Eclipse-AutoStart"; //$NON-NLS-1$

	/** An Eclipse-AutoStart attribute used to specify exception classes for auto start */
	public static final String ECLIPSE_AUTOSTART_EXCEPTIONS = "exceptions"; //$NON-NLS-1$
	/** The SAX factory name */
	public static final String SAXFACTORYNAME = "javax.xml.parsers.SAXParserFactory"; //$NON-NLS-1$
	/** The DOM factory name */
	public static final String DOMFACTORYNAME = "javax.xml.parsers.DocumentBuilderFactory"; //$NON-NLS-1$

	private static final String RUNTIME_ADAPTOR = FRAMEWORK_SYMBOLICNAME + "/eclipseadaptor"; //$NON-NLS-1$

	private static final String OPTION_PLATFORM_ADMIN = RUNTIME_ADAPTOR + "/debug/platformadmin"; //$NON-NLS-1$

	private static final String OPTION_PLATFORM_ADMIN_RESOLVER = RUNTIME_ADAPTOR + "/debug/platformadmin/resolver"; //$NON-NLS-1$

	private static final String OPTION_MONITOR_PLATFORM_ADMIN = RUNTIME_ADAPTOR + "/resolver/timing"; //$NON-NLS-1$

	private static final String OPTION_RESOLVER_READER = RUNTIME_ADAPTOR + "/resolver/reader/timing"; //$NON-NLS-1$

	private static final String OPTION_CONVERTER = RUNTIME_ADAPTOR + "/converter/debug"; //$NON-NLS-1$

	private static final String OPTION_LOCATION = RUNTIME_ADAPTOR + "/debug/location"; //$NON-NLS-1$	

	/** The current bundle data version */
	public static final byte BUNDLEDATA_VERSION = 16;
	/** The NULL tag used in bundle data */
	public static final byte NULL = 0;
	/** The OBJECT tag used in bundle data */
	public static final byte OBJECT = 1;

	private static EclipseAdaptor instance;

	private byte cacheVersion;

	private long timeStamp = 0;

	// assume a file: installURL 
	private String installPath = null;

	private boolean exitOnError = true;

	private BundleStopper stopper;

	private FileManager fileManager;

	private boolean reinitialize = false;

	/**
	 * Should be instantiated only by the framework (through reflection).
	 * @param args the adaptor arguments
	 */
	public EclipseAdaptor(String[] args) {
		super(args);
		instance = this;
		setDebugOptions();
	}

	/**
	 * Gets the default instance
	 * @return the default instance
	 */
	public static EclipseAdaptor getDefault() {
		return instance;
	}

	private FrameworkLog createPerformanceLog() {
		String logFileProp = System.getProperty(EclipseStarter.PROP_LOGFILE);
		if (logFileProp != null) {
			int lastSlash = logFileProp.lastIndexOf(File.separatorChar);
			if (lastSlash > 0) {
				String logFile = logFileProp.substring(0, lastSlash + 1) + "performance.log"; //$NON-NLS-1$
				return new EclipseLog(new File(logFile));
			}
		}
		//if all else fails, write to std err
		return new EclipseLog(new PrintWriter(System.err));
	}

	/**
	 * @see FrameworkAdaptor#initialize(EventPublisher)
	 */
	public void initialize(EventPublisher publisher) {
		if (Boolean.getBoolean(EclipseAdaptor.PROP_CLEAN))
			cleanOSGiCache();
		boolean readOnlyConfiguration = LocationManager.getConfigurationLocation().isReadOnly();
		fileManager = initFileManager(LocationManager.getOSGiConfigurationDir(), readOnlyConfiguration ? "none" : null, readOnlyConfiguration); //$NON-NLS-1$
		readHeaders();
		super.initialize(publisher);
		// default the bootdelegation to all packages
		if (System.getProperty(Constants.OSGI_BOOTDELEGATION) == null && !Constants.OSGI_BOOTDELEGATION_NONE.equals(System.getProperty(Constants.OSGI_JAVA_PROFILE_BOOTDELEGATION)))
			System.getProperties().put(Constants.OSGI_BOOTDELEGATION, "*"); //$NON-NLS-1$
		// we need to set the install path as soon as possible so we can determine
		// the absolute location of install relative URLs
		Location installLoc = LocationManager.getInstallLocation();
		if (installLoc != null) {
			URL installURL = installLoc.getURL();
			// assume install URL is file: based
			installPath = installURL.getPath();
		}
	}

	/**
	 * @see AbstractFrameworkAdaptor#initializeMetadata()
	 */
	public void initializeMetadata() {
		// do nothing here; metadata is already initialized by readHeaders.
	}

	protected void initBundleStoreRootDir() {
		File configurationLocation = LocationManager.getOSGiConfigurationDir();
		if (configurationLocation != null) {
			bundleStoreRootDir = new File(configurationLocation, LocationManager.BUNDLES_DIR);
			bundleStore = bundleStoreRootDir.getAbsolutePath();
		} else {
			// last resort just default to "bundles"
			bundleStore = LocationManager.BUNDLES_DIR;
			bundleStoreRootDir = new File(bundleStore);
		}

		/* store bundleStore back into adaptor properties for others to see */
		properties.put(BUNDLE_STORE, bundleStoreRootDir.getAbsolutePath());
	}

	protected FrameworkLog createFrameworkLog() {
		if (frameworkLog != null)
			return frameworkLog;
		return EclipseStarter.createFrameworkLog();
	}

	private File[] findStateFiles() {
		if (reinitialize)
			return new File[2]; // return null enties to indicate reinitialize
		File stateFile = null;
		File lazyFile = null;
		try {
			stateFile = fileManager.lookup(LocationManager.STATE_FILE, false);
			lazyFile = fileManager.lookup(LocationManager.LAZY_FILE, false);
		} catch (IOException ex) {
			if (Debug.DEBUG && Debug.DEBUG_GENERAL) {
				Debug.println("Error reading state file " + ex.getMessage()); //$NON-NLS-1$
				Debug.printStackTrace(ex);
			}
		}
		//if it does not exist, try to read it from the parent
		if (stateFile == null || !stateFile.isFile()) { // NOTE this check is redundant since it
			// is done in StateManager, however it
			// is more convenient to have it here
			Location parentConfiguration = null;
			Location currentConfiguration = LocationManager.getConfigurationLocation();
			if (currentConfiguration != null && (parentConfiguration = currentConfiguration.getParentLocation()) != null) {
				try {
					File stateLocationDir = new File(parentConfiguration.getURL().getFile(), FrameworkAdaptor.FRAMEWORK_SYMBOLICNAME);
					FileManager newFileManager = initFileManager(stateLocationDir, "none", true); //$NON-NLS-1$);
					stateFile = newFileManager.lookup(LocationManager.STATE_FILE, false);
					lazyFile = newFileManager.lookup(LocationManager.LAZY_FILE, false);
				} catch (IOException ex) {
					if (Debug.DEBUG && Debug.DEBUG_GENERAL) {
						Debug.println("Error reading state file " + ex.getMessage()); //$NON-NLS-1$
						Debug.printStackTrace(ex);
					}
				}
			} else {
				try {
					//it did not exist in either place, so create it in the original location
					if (canWrite()) {
						stateFile = fileManager.lookup(LocationManager.STATE_FILE, true);
						lazyFile = fileManager.lookup(LocationManager.LAZY_FILE, true);
					}
				} catch (IOException ex) {
					if (Debug.DEBUG && Debug.DEBUG_GENERAL) {
						Debug.println("Error reading state file " + ex.getMessage()); //$NON-NLS-1$
						Debug.printStackTrace(ex);
					}
				}
			}
		}
		return new File[] {stateFile, lazyFile};
	}

	protected StateManager createStateManager() {
		File[] stateFiles = findStateFiles();
		File stateFile = stateFiles[0];
		File lazyFile = stateFiles[1];

		stateManager = new StateManager(stateFile, lazyFile, context, timeStamp);
		stateManager.setInstaller(new EclipseBundleInstaller(context));
		State systemState = null;
		if (!invalidState) {
			systemState = stateManager.readSystemState();
			if (systemState != null)
				return stateManager;
		}
		systemState = stateManager.createSystemState();
		Bundle[] installedBundles = context.getBundles();
		if (installedBundles == null)
			return stateManager;
		StateObjectFactory factory = stateManager.getFactory();
		for (int i = 0; i < installedBundles.length; i++) {
			Bundle toAdd = installedBundles[i];
			try {
				Dictionary toAddManifest = toAdd.getHeaders(""); //$NON-NLS-1$
				// if this is a cached manifest need to get the real one
				if (toAddManifest instanceof CachedManifest)
					toAddManifest = ((CachedManifest) toAddManifest).getManifest();
				BundleDescription newDescription = factory.createBundleDescription(systemState, toAddManifest, toAdd.getLocation(), toAdd.getBundleId());
				systemState.addBundle(newDescription);
			} catch (BundleException be) {
				// just ignore bundle datas with invalid manifests
			}
		}
		// we need the state resolved
		systemState.setTimeStamp(timeStamp);
		systemState.resolve();
		invalidState = false;
		return stateManager;
	}

	public void shutdownStateManager() {
		if (!canWrite() || stateManager.getCachedTimeStamp() == stateManager.getSystemState().getTimeStamp())
			return;
		try {
			File stateTmpFile = File.createTempFile(LocationManager.STATE_FILE, ".new", LocationManager.getOSGiConfigurationDir()); //$NON-NLS-1$
			File lazyTmpFile = File.createTempFile(LocationManager.LAZY_FILE, ".new", LocationManager.getOSGiConfigurationDir()); //$NON-NLS-1$
			stateManager.shutdown(stateTmpFile, lazyTmpFile);
			fileManager.lookup(LocationManager.STATE_FILE, true);
			fileManager.lookup(LocationManager.LAZY_FILE, true);
			fileManager.update(new String[] {LocationManager.STATE_FILE, LocationManager.LAZY_FILE}, new String[] {stateTmpFile.getName(), lazyTmpFile.getName()});
		} catch (IOException e) {
			frameworkLog.log(new FrameworkEvent(FrameworkEvent.ERROR, context.getBundle(), e));
		}
	}

	private void cleanOSGiCache() {
		File osgiConfig = LocationManager.getOSGiConfigurationDir();
		if (!rm(osgiConfig)) {
			// TODO log error?
		}
	}

	private void readHeaders() {
		InputStream bundleDataStream = findBundleDataFile();
		if (bundleDataStream == null)
			return;

		try {
			DataInputStream in = new DataInputStream(new BufferedInputStream(bundleDataStream));
			try {
				cacheVersion = in.readByte();
				if (cacheVersion == BUNDLEDATA_VERSION) {
					timeStamp = in.readLong();
					initialBundleStartLevel = in.readInt();
					nextId = in.readLong();
				}
			} finally {
				in.close();
			}
		} catch (IOException e) {
			if (Debug.DEBUG && Debug.DEBUG_GENERAL) {
				Debug.println("Error reading framework metadata: " + e.getMessage()); //$NON-NLS-1$
				Debug.printStackTrace(e);
			}
		}
	}

	public AdaptorElementFactory getElementFactory() {
		if (elementFactory == null)
			elementFactory = new EclipseElementFactory();
		return elementFactory;
	}

	public void frameworkStart(BundleContext aContext) throws BundleException {
		// EnvironmentInfo has to be initialized first to compute defaults for system context (see bug 88925)
		EclipseEnvironmentInfo.getDefault();
		// must register the xml parser and initialize the plugin converter
		// instance first because we may need it when creating the statemanager
		// in super.frameworkStart(context)
		registerEndorsedXMLParser(aContext);
		PluginConverter converter = new PluginConverterImpl(aContext);
		super.frameworkStart(aContext);
		Bundle bundle = aContext.getBundle();
		Location location;

		// Less than optimal reference to EclipseStarter here. Not sure how we
		// can make the location
		// objects available. They are needed very early in EclipseStarter but
		// these references tie the adaptor to that starter.
		location = LocationManager.getUserLocation();
		Hashtable locationProperties = new Hashtable(1);
		if (location != null) {
			locationProperties.put("type", LocationManager.PROP_USER_AREA); //$NON-NLS-1$
			aContext.registerService(Location.class.getName(), location, locationProperties);
		}
		location = LocationManager.getInstanceLocation();
		if (location != null) {
			locationProperties.put("type", LocationManager.PROP_INSTANCE_AREA); //$NON-NLS-1$
			aContext.registerService(Location.class.getName(), location, locationProperties);
		}
		location = LocationManager.getConfigurationLocation();
		if (location != null) {
			locationProperties.put("type", LocationManager.PROP_CONFIG_AREA); //$NON-NLS-1$
			aContext.registerService(Location.class.getName(), location, locationProperties);
		}
		location = LocationManager.getInstallLocation();
		if (location != null) {
			locationProperties.put("type", LocationManager.PROP_INSTALL_AREA); //$NON-NLS-1$
			aContext.registerService(Location.class.getName(), location, locationProperties);
		}

		register(org.eclipse.osgi.service.environment.EnvironmentInfo.class.getName(), EclipseEnvironmentInfo.getDefault(), bundle);
		register(PlatformAdmin.class.getName(), stateManager, bundle);
		register(PluginConverter.class.getName(), converter, bundle);
		register(URLConverter.class.getName(), new URLConverterImpl(), bundle);
		register(CommandProvider.class.getName(), new EclipseCommandProvider(aContext), bundle);
		register(FrameworkLog.class.getName(), getFrameworkLog(), bundle);
		registerPerformanceLog(bundle);
		register(org.eclipse.osgi.service.localization.BundleLocalization.class.getName(), new BundleLocalizationImpl(), bundle);
	}

	private void registerPerformanceLog(Bundle bundle) {
		Object service = createPerformanceLog();
		String serviceName = FrameworkLog.class.getName();
		Hashtable serviceProperties = new Hashtable(7);
		Dictionary headers = bundle.getHeaders();

		serviceProperties.put(Constants.SERVICE_VENDOR, headers.get(Constants.BUNDLE_VENDOR));
		serviceProperties.put(Constants.SERVICE_RANKING, new Integer(Integer.MIN_VALUE));
		serviceProperties.put(Constants.SERVICE_PID, bundle.getBundleId() + '.' + service.getClass().getName());
		serviceProperties.put(FrameworkLog.SERVICE_PERFORMANCE, Boolean.TRUE.toString());

		context.registerService(serviceName, service, serviceProperties);
	}

	private void setDebugOptions() {
		FrameworkDebugOptions options = FrameworkDebugOptions.getDefault();
		// may be null if debugging is not enabled
		if (options == null)
			return;
		StateManager.DEBUG = options != null;
		StateManager.DEBUG_READER = options.getBooleanOption(OPTION_RESOLVER_READER, false);
		StateManager.MONITOR_PLATFORM_ADMIN = options.getBooleanOption(OPTION_MONITOR_PLATFORM_ADMIN, false);
		StateManager.DEBUG_PLATFORM_ADMIN = options.getBooleanOption(OPTION_PLATFORM_ADMIN, false);
		StateManager.DEBUG_PLATFORM_ADMIN_RESOLVER = options.getBooleanOption(OPTION_PLATFORM_ADMIN_RESOLVER, false);
		PluginConverterImpl.DEBUG = options.getBooleanOption(OPTION_CONVERTER, false);
		BasicLocation.DEBUG = options.getBooleanOption(OPTION_LOCATION, false);
	}

	private void registerEndorsedXMLParser(BundleContext bc) {
		try {
			Class.forName(SAXFACTORYNAME);
			bc.registerService(SAXFACTORYNAME, new SaxParsingService(), new Hashtable());
			Class.forName(DOMFACTORYNAME);
			bc.registerService(DOMFACTORYNAME, new DomParsingService(), new Hashtable());
		} catch (ClassNotFoundException e) {
			// In case the JAXP API is not on the boot classpath
			String message = EclipseAdaptorMsg.ECLIPSE_ADAPTOR_ERROR_XML_SERVICE;
			getFrameworkLog().log(new FrameworkLogEntry(FrameworkAdaptor.FRAMEWORK_SYMBOLICNAME, message, 0, e, null));
		}
	}

	private class SaxParsingService implements ServiceFactory {
		public Object getService(Bundle bundle, ServiceRegistration registration) {
			return SAXParserFactory.newInstance();
		}

		public void ungetService(Bundle bundle, ServiceRegistration registration, Object service) {
			// Do nothing.
		}
	}

	private class DomParsingService implements ServiceFactory {
		public Object getService(Bundle bundle, ServiceRegistration registration) {
			return DocumentBuilderFactory.newInstance();
		}

		public void ungetService(Bundle bundle, ServiceRegistration registration, Object service) {
			// Do nothing.
		}
	}

	public boolean canWrite() {
		return !fileManager.isReadOnly();
	}

	public void frameworkStop(BundleContext aContext) throws BundleException {
		saveMetaData();
		super.frameworkStop(aContext);
		printStats();
		PluginParser.releaseXMLParsing();
		fileManager.close();
	}

	private void printStats() {
		FrameworkDebugOptions debugOptions = FrameworkDebugOptions.getDefault();
		if (debugOptions == null)
			return;
		String registryParsing = debugOptions.getOption("org.eclipse.core.runtime/registry/parsing/timing/value"); //$NON-NLS-1$
		if (registryParsing != null)
			EclipseAdaptorMsg.debug("Time spent in registry parsing: " + registryParsing); //$NON-NLS-1$
		String packageAdminResolution = debugOptions.getOption("debug.packageadmin/timing/value"); //$NON-NLS-1$
		if (packageAdminResolution != null)
			System.out.println("Time spent in package admin resolve: " + packageAdminResolution); //$NON-NLS-1$			
		String constraintResolution = debugOptions.getOption("org.eclipse.core.runtime.adaptor/resolver/timing/value"); //$NON-NLS-1$
		if (constraintResolution != null)
			System.out.println("Time spent resolving the dependency system: " + constraintResolution); //$NON-NLS-1$ 
	}

	private InputStream findBundleDataFile() {
		if (reinitialize)
			return null; // return null to indicate we are reinitializing
		StreamManager streamManager = new StreamManager(fileManager);
		InputStream bundleDataStream = null;
		try {
			bundleDataStream = streamManager.getInputStream(LocationManager.BUNDLE_DATA_FILE, StreamManager.OPEN_BEST_AVAILABLE);
		} catch (IOException ex) {
			if (Debug.DEBUG && Debug.DEBUG_GENERAL) {
				Debug.println("Error reading framework metadata: " + ex.getMessage()); //$NON-NLS-1$
				Debug.printStackTrace(ex);
			}
		}
		if (bundleDataStream == null) {
			Location currentConfiguration = LocationManager.getConfigurationLocation();
			Location parentConfiguration = null;
			if (currentConfiguration != null && (parentConfiguration = currentConfiguration.getParentLocation()) != null) {
				try {
					File bundledataLocationDir = new File(parentConfiguration.getURL().getFile(), FrameworkAdaptor.FRAMEWORK_SYMBOLICNAME);
					FileManager newFileManager = initFileManager(bundledataLocationDir, "none", true); //$NON-NLS-1$
					bundleDataStream = streamManager.getInputStream(LocationManager.BUNDLE_DATA_FILE, StreamManager.OPEN_BEST_AVAILABLE);
					newFileManager.close();
				} catch (MalformedURLException e1) {
					// This will not happen since all the URLs are derived by us
					// and we are GODS!
				} catch (IOException e1) {
					// That's ok we will regenerate the .bundleData
				}
			}
		}
		return bundleDataStream;
	}

	/**
	 * @see org.eclipse.osgi.framework.adaptor.FrameworkAdaptor#getInstalledBundles()
	 */
	public BundleData[] getInstalledBundles() {
		InputStream bundleDataStream = findBundleDataFile();
		if (bundleDataStream == null)
			return null;

		try {
			DataInputStream in = new DataInputStream(new BufferedInputStream(bundleDataStream));
			try {
				byte version = in.readByte();
				if (version != BUNDLEDATA_VERSION)
					return null;
				// skip timeStamp - was read by readHeaders
				in.readLong();
				in.readInt();
				in.readLong();

				int bundleCount = in.readInt();
				ArrayList result = new ArrayList(bundleCount);
				long id = -1;
				boolean bundleDiscarded = false;
				for (int i = 0; i < bundleCount; i++) {
					try {
						id = in.readLong();
						if (id != 0) {
							EclipseBundleData data = (EclipseBundleData) getElementFactory().createBundleData(this, id);
							loadMetaDataFor(data, in, version);
							data.initializeExistingBundle();
							if (Debug.DEBUG && Debug.DEBUG_GENERAL)
								Debug.println("BundleData created: " + data); //$NON-NLS-1$
							processExtension(data, EXTENSION_INITIALIZE);
							result.add(data);
						}
					} catch (NumberFormatException e) {
						// should never happen
						bundleDiscarded = true;
					} catch (BundleException e) {
						// should never happen
						bundleDiscarded = true;
					} catch (IOException e) {
						bundleDiscarded = true;
						if (Debug.DEBUG && Debug.DEBUG_GENERAL) {
							Debug.println("Error reading framework metadata: " + e.getMessage()); //$NON-NLS-1$ 
							Debug.printStackTrace(e);
						}
					}
				}
				if (bundleDiscarded)
					System.getProperties().put(EclipseStarter.PROP_REFRESH_BUNDLES, "true"); //$NON-NLS-1$
				return (BundleData[]) result.toArray(new BundleData[result.size()]);
			} finally {
				in.close();
			}
		} catch (IOException e) {
			if (Debug.DEBUG && Debug.DEBUG_GENERAL) {
				Debug.println("Error reading framework metadata: " + e.getMessage()); //$NON-NLS-1$ 
				Debug.printStackTrace(e);
			}
		}
		return null;
	}

	/**
	 * Loads the meta data for the specified bundle data
	 * @param data the bundle data to load meta data for
	 * @param in the stream to read the meta data from
	 * @param version the version of data being read
	 * @throws IOException when an io error occurs reading the metadata
	 */
	protected void loadMetaDataFor(EclipseBundleData data, DataInputStream in, byte version) throws IOException {
		byte flag = in.readByte();
		if (flag == NULL)
			return;
		data.setLocation(readString(in, false));
		data.setFileName(readString(in, false));
		data.setSymbolicName(readString(in, false));
		data.setVersion(loadVersion(in));
		data.setActivator(readString(in, false));
		data.setAutoStart(in.readBoolean());
		int exceptionsCount = in.readInt();
		String[] autoStartExceptions = exceptionsCount > 0 ? new String[exceptionsCount] : null;
		for (int i = 0; i < exceptionsCount; i++)
			autoStartExceptions[i] = in.readUTF();
		data.setAutoStartExceptions(autoStartExceptions);
		data.hasPackageInfo = in.readBoolean();
		data.buddyList = readString(in, false);
		data.registeredBuddyList = readString(in, false);
		data.setPluginClass(readString(in, false));
		data.setClassPathString(readString(in, false));
		data.setNativePaths(readString(in, false));
		data.setExecutionEnvironment(readString(in, false));
		data.setDynamicImports(readString(in, false));
		data.setGeneration(in.readInt());
		data.setStartLevel(in.readInt());
		data.setStatus(in.readInt());
		data.setReference(in.readBoolean());
		data.setManifestTimeStamp(in.readLong());
		data.setManifestType(in.readByte());
		data.setLastModified(in.readLong());
		data.setType(in.readInt());
		// TODO should we rearrange the isRefernce data before the fileName data?
		// this step is done at the end because the FileName data is read before the isReference data
		if (data.isReference()) {
			// fileName for bundles installed with reference URLs is stored relative to the install location
			File storedPath = new File(data.getFileName());
			if (!storedPath.isAbsolute())
				// make sure it has the absolute location instead
				data.setFileName(new FilePath(installPath + data.getFileName()).toString());
		}
	}

	private Version loadVersion(DataInputStream in) throws IOException {
		String versionString = readString(in, false);
		try {
			return Version.parseVersion(versionString);
		} catch (IllegalArgumentException e) {
			return new InvalidVersion(versionString);
		}
	}

	/**
	 * Saves the metadata for the specified bundle data.  This method only marks the bundle data
	 * as dirty if the bundle is not auto started.  The bundle data is not persisted until the 
	 * framework is shutdown.
	 * @param data
	 * @throws IOException
	 */
	public void saveMetaDataFor(EclipseBundleData data) throws IOException {
		if (!data.isAutoStartable()) {
			timeStamp--; // Change the value of the timeStamp, as a marker
			// that something changed.
		}
	}

	/** 
	 * Saves the initial bundle start level.  This method only marks the bundle data as 
	 * dirty.  The bundle dat is not persisted until the framework is shutdown.
	 */
	public void persistInitialBundleStartLevel(int value) {
		// Change the value of the timeStamp, as a marker that something
		// changed.
		timeStamp--;
	}

	public void persistNextBundleID(long value) {
		// Do nothing the timeStamp will have changed because the state will be
		// updated.
	}

	/**
	 * Saves the metadata for the specified bundle data.
	 * @param data the bundle data
	 * @param out the stream to save the metadata to
	 * @throws IOException when an io error occurs saving the metadata
	 */
	protected void saveMetaDataFor(BundleData data, DataOutputStream out) throws IOException {
		if (data.getBundleID() == 0 || !(data instanceof AbstractBundleData)) {
			out.writeByte(NULL);
			return;
		}
		EclipseBundleData bundleData = (EclipseBundleData) data;
		out.writeByte(OBJECT);
		writeStringOrNull(out, bundleData.getLocation());
		String storedFileName = bundleData.isReference() ? new FilePath(installPath).makeRelative(new FilePath(bundleData.getFileName())) : bundleData.getFileName();
		writeStringOrNull(out, storedFileName);
		writeStringOrNull(out, bundleData.getSymbolicName());
		writeStringOrNull(out, bundleData.getVersion().toString());
		writeStringOrNull(out, bundleData.getActivator());
		out.writeBoolean(bundleData.isAutoStart());
		String[] autoStartExceptions = bundleData.getAutoStartExceptions();
		if (autoStartExceptions == null)
			out.writeInt(0);
		else {
			out.writeInt(autoStartExceptions.length);
			for (int i = 0; i < autoStartExceptions.length; i++)
				out.writeUTF(autoStartExceptions[i]);
		}
		out.writeBoolean(bundleData.hasPackageInfo);
		writeStringOrNull(out, bundleData.buddyList);
		writeStringOrNull(out, bundleData.registeredBuddyList);
		writeStringOrNull(out, bundleData.getPluginClass());
		writeStringOrNull(out, bundleData.getClassPathString());
		writeStringOrNull(out, bundleData.getNativePathsString());
		writeStringOrNull(out, bundleData.getExecutionEnvironment());
		writeStringOrNull(out, bundleData.getDynamicImports());
		out.writeInt(bundleData.getGeneration());
		out.writeInt(bundleData.getStartLevel());
		out.writeInt(bundleData.getPersistentStatus());
		out.writeBoolean(bundleData.isReference());
		out.writeLong(bundleData.getManifestTimeStamp());
		out.writeByte(bundleData.getManifestType());
		out.writeLong(bundleData.getLastModified());
		out.writeInt(bundleData.getType());
	}

	private String readString(DataInputStream in, boolean intern) throws IOException {
		byte type = in.readByte();
		if (type == NULL)
			return null;
		return intern ? in.readUTF().intern() : in.readUTF();
	}

	private void writeStringOrNull(DataOutputStream out, String string) throws IOException {
		if (string == null)
			out.writeByte(NULL);
		else {
			out.writeByte(OBJECT);
			out.writeUTF(string);
		}
	}

	/**
	 * Persists the bundle data for all bundles installed in the framework.
	 */
	public void saveMetaData() {
		// the cache and the state match
		if (!canWrite() | timeStamp == stateManager.getSystemState().getTimeStamp())
			return;
		StreamManager streamManager = new StreamManager(fileManager);
		try {
			StreamManagerOutputStream fmos = streamManager.getOutputStream(LocationManager.BUNDLE_DATA_FILE);
			DataOutputStream out = new DataOutputStream(new BufferedOutputStream(fmos));
			boolean error = true;
			try {
				out.writeByte(BUNDLEDATA_VERSION);
				out.writeLong(stateManager.getSystemState().getTimeStamp());
				out.writeInt(initialBundleStartLevel);
				out.writeLong(nextId);
				Bundle[] bundles = context.getBundles();
				out.writeInt(bundles.length);
				for (int i = 0; i < bundles.length; i++) {
					long id = bundles[i].getBundleId();
					out.writeLong(id);
					if (id != 0) {
						BundleData data = ((org.eclipse.osgi.framework.internal.core.AbstractBundle) bundles[i]).getBundleData();
						saveMetaDataFor(data, out);
					}
				}
				out.close();
				error = false;
			} finally {
				// if something happens, don't close a corrupt file
				if (error) {
					fmos.abort();
					try {
						out.close();
					} catch (IOException e) {/*ignore*/
					}
				}
			}
		} catch (IOException e) {
			frameworkLog.log(new FrameworkEvent(FrameworkEvent.ERROR, context.getBundle(), e));
			return;
		}
	}

	public BundleWatcher getBundleWatcher() {
		return StatsManager.getDefault();
	}

	/**
	 * Returns the system bundle context
	 * @return the system bundle context
	 */
	protected BundleContext getContext() {
		return context;
	}

	public void frameworkStopping(BundleContext aContext) {
		super.frameworkStopping(aContext);
		stopper = new BundleStopper(context);
		stopper.stopBundles();
	}

	private boolean isFatalException(Throwable error) {
		if (error instanceof VirtualMachineError) {
			return true;
		}
		if (error instanceof ThreadDeath) {
			return true;
		}
		return false;
	}

	public void handleRuntimeError(Throwable error) {
		try {
			// check the prop each time this happens (should NEVER happen!)
			exitOnError = Boolean.valueOf(System.getProperty(PROP_EXITONERROR, "true")).booleanValue(); //$NON-NLS-1$
			String message = EclipseAdaptorMsg.ECLIPSE_ADAPTOR_RUNTIME_ERROR;
			if (exitOnError && isFatalException(error))
				message += ' ' + EclipseAdaptorMsg.ECLIPSE_ADAPTOR_EXITING;
			FrameworkLogEntry logEntry = new FrameworkLogEntry(FrameworkAdaptor.FRAMEWORK_SYMBOLICNAME, message, 0, error, null);
			getFrameworkLog().log(logEntry);
		} catch (Throwable t) {
			// we may be in a currupted state and must be able to handle any
			// errors (ie OutOfMemoryError)
			// that may occur when handling the first error; this is REALLY the
			// last resort.
			try {
				error.printStackTrace();
				t.printStackTrace();
			} catch (Throwable t1) {
				// if we fail that then we are beyond help.
			}
		} finally {
			// do the exit outside the try block just incase another runtime
			// error was thrown while logging
			if (exitOnError && isFatalException(error))
				System.exit(13);
		}
	}

	protected void setLog(FrameworkLog log) {
		frameworkLog = log;
	}

	BundleStopper getBundleStopper() {
		return stopper;
	}

	private FileManager initFileManager(File baseDir, String lockMode, boolean readOnly) {
		FileManager fManager = new FileManager(baseDir, lockMode, readOnly);
		try {
			fManager.open(!readOnly);
		} catch (IOException ex) {
			if (Debug.DEBUG && Debug.DEBUG_GENERAL) {
				Debug.println("Error reading framework metadata: " + ex.getMessage()); //$NON-NLS-1$
				Debug.printStackTrace(ex);
			}
			String message = NLS.bind(EclipseAdaptorMsg.ECLIPSE_STARTUP_FILEMANAGER_OPEN_ERROR, ex.getMessage());
			FrameworkLogEntry logEntry = new FrameworkLogEntry(FrameworkAdaptor.FRAMEWORK_SYMBOLICNAME, message, 0, ex, null);
			getFrameworkLog().log(logEntry);
		}
		return fManager;
	}
}
