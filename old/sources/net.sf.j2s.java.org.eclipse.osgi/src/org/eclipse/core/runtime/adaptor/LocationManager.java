/*******************************************************************************
 * Copyright (c) 2004, 2005 IBM Corporation and others.
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
import java.util.Properties;
import org.eclipse.core.runtime.internal.adaptor.BasicLocation;
import org.eclipse.osgi.framework.adaptor.FrameworkAdaptor;
import org.eclipse.osgi.service.datalocation.Location;

/**
 * This class is used to manage the various Locations for Eclipse.
 * <p>
 * Clients may not extend this class.
 * </p>
 * @since 3.1
 */
public class LocationManager {
	private static Location installLocation = null;
	private static Location configurationLocation = null;
	private static Location userLocation = null;
	private static Location instanceLocation = null;

	public static final String READ_ONLY_AREA_SUFFIX = ".readOnly"; //$NON-NLS-1$
	public static final String PROP_INSTALL_AREA = "osgi.install.area"; //$NON-NLS-1$
	public static final String PROP_CONFIG_AREA = "osgi.configuration.area"; //$NON-NLS-1$
	public static final String PROP_CONFIG_AREA_DEFAULT = "osgi.configuration.area.default"; //$NON-NLS-1$
	public static final String PROP_SHARED_CONFIG_AREA = "osgi.sharedConfiguration.area"; //$NON-NLS-1$
	public static final String PROP_INSTANCE_AREA = "osgi.instance.area"; //$NON-NLS-1$
	public static final String PROP_INSTANCE_AREA_DEFAULT = "osgi.instance.area.default"; //$NON-NLS-1$
	public static final String PROP_USER_AREA = "osgi.user.area"; //$NON-NLS-1$
	public static final String PROP_USER_AREA_DEFAULT = "osgi.user.area.default"; //$NON-NLS-1$
	public static final String PROP_MANIFEST_CACHE = "osgi.manifest.cache"; //$NON-NLS-1$
	public static final String PROP_USER_HOME = "user.home"; //$NON-NLS-1$
	public static final String PROP_USER_DIR = "user.dir"; //$NON-NLS-1$

	// configuration area file/dir names
	public static final String BUNDLES_DIR = "bundles"; //$NON-NLS-1$
	public static final String STATE_FILE = ".state"; //$NON-NLS-1$
	public static final String LAZY_FILE = ".lazy"; //$NON-NLS-1$
	public static final String BUNDLE_DATA_FILE = ".bundledata"; //$NON-NLS-1$
	public static final String MANIFESTS_DIR = "manifests"; //$NON-NLS-1$
	public static final String CONFIG_FILE = "config.ini"; //$NON-NLS-1$
	public static final String ECLIPSE_PROPERTIES = "eclipse.properties"; //$NON-NLS-1$

	// Constants for configuration location discovery
	private static final String ECLIPSE = "eclipse"; //$NON-NLS-1$
	private static final String PRODUCT_SITE_MARKER = ".eclipseproduct"; //$NON-NLS-1$
	private static final String PRODUCT_SITE_ID = "id"; //$NON-NLS-1$
	private static final String PRODUCT_SITE_VERSION = "version"; //$NON-NLS-1$

	private static final String CONFIG_DIR = "configuration"; //$NON-NLS-1$

	// Data mode constants for user, configuration and data locations.
	private static final String NONE = "@none"; //$NON-NLS-1$
	private static final String NO_DEFAULT = "@noDefault"; //$NON-NLS-1$
	private static final String USER_HOME = "@user.home"; //$NON-NLS-1$
	private static final String USER_DIR = "@user.dir"; //$NON-NLS-1$

	/**
	 * Builds a URL with the given specification
	 * @param spec the URL specification
	 * @param trailingSlash flag to indicate a trailing slash on the spec
	 * @return a URL
	 */
	public static URL buildURL(String spec, boolean trailingSlash) {
		if (spec == null)
			return null;
		boolean isFile = spec.startsWith("file:"); //$NON-NLS-1$
		try {
			if (isFile)
				return adjustTrailingSlash(new File(spec.substring(5)).toURL(), trailingSlash);
			else
				return new URL(spec);
		} catch (MalformedURLException e) {
			// if we failed and it is a file spec, there is nothing more we can do
			// otherwise, try to make the spec into a file URL.
			if (isFile)
				return null;
			try {
				return adjustTrailingSlash(new File(spec).toURL(), trailingSlash);
			} catch (MalformedURLException e1) {
				return null;
			}
		}
	}

	private static URL adjustTrailingSlash(URL url, boolean trailingSlash) throws MalformedURLException {
		String file = url.getFile();
		if (trailingSlash == (file.endsWith("/"))) //$NON-NLS-1$
			return url;
		file = trailingSlash ? file + "/" : file.substring(0, file.length() - 1); //$NON-NLS-1$
		return new URL(url.getProtocol(), url.getHost(), file);
	}

	private static void mungeConfigurationLocation() {
		// if the config property was set, munge it for backwards compatibility.
		String location = System.getProperty(PROP_CONFIG_AREA);
		if (location != null) {
			location = buildURL(location, false).toExternalForm();
			if (location.endsWith(".cfg")) { //$NON-NLS-1$
				int index = location.lastIndexOf('/');
				location = location.substring(0, index + 1);
			}
			if (!location.endsWith("/")) //$NON-NLS-1$
				location += "/"; //$NON-NLS-1$
			System.getProperties().put(PROP_CONFIG_AREA, location);
		}
	}

	/**
	 * Initializes the Location objects for the LocationManager.
	 */
	public static void initializeLocations() {
		// do install location initialization first since others may depend on it
		// assumes that the property is already set
		installLocation = buildLocation(PROP_INSTALL_AREA, null, null, true);		
		
		Location temp = buildLocation(PROP_USER_AREA_DEFAULT, null, "", false); //$NON-NLS-1$
		URL defaultLocation = temp == null ? null : temp.getURL();
		if (defaultLocation == null)
			defaultLocation = buildURL(new File(System.getProperty(PROP_USER_HOME), "user").getAbsolutePath(), true); //$NON-NLS-1$
		userLocation = buildLocation(PROP_USER_AREA, defaultLocation, "", false); //$NON-NLS-1$

		temp = buildLocation(PROP_INSTANCE_AREA_DEFAULT, null, "", false); //$NON-NLS-1$
		defaultLocation = temp == null ? null : temp.getURL();
		if (defaultLocation == null)
			defaultLocation = buildURL(new File(System.getProperty(PROP_USER_DIR), "workspace").getAbsolutePath(), true); //$NON-NLS-1$
		instanceLocation = buildLocation(PROP_INSTANCE_AREA, defaultLocation, "", false); //$NON-NLS-1$

		mungeConfigurationLocation();
		// compute a default but it is very unlikely to be used since main will have computed everything
		temp = buildLocation(PROP_CONFIG_AREA_DEFAULT, null, "", false); //$NON-NLS-1$
		defaultLocation = temp == null ? null : temp.getURL();
		if (defaultLocation == null)
			defaultLocation = buildURL(computeDefaultConfigurationLocation(), true);
		configurationLocation = buildLocation(PROP_CONFIG_AREA, defaultLocation, "", false); //$NON-NLS-1$
		// get the parent location based on the system property. This will have been set on the 
		// way in either by the caller/user or by main.  There will be no parent location if we are not 
		// cascaded.
		URL parentLocation = computeSharedConfigurationLocation();
		if (parentLocation != null && !parentLocation.equals(configurationLocation.getURL())) {
			Location parent = new BasicLocation(null, parentLocation, true);
			((BasicLocation) configurationLocation).setParent(parent);
		}
		initializeDerivedConfigurationLocations();
	}

	private static Location buildLocation(String property, URL defaultLocation, String userDefaultAppendage, boolean readOnlyDefault) {
		String location = (String) System.getProperties().remove(property);
		// the user/product may specify a non-default readOnly setting   
		String userReadOnlySetting = System.getProperty(property + READ_ONLY_AREA_SUFFIX);
		boolean readOnly = (userReadOnlySetting == null ? readOnlyDefault : Boolean.valueOf(userReadOnlySetting).booleanValue());
		// if the instance location is not set, predict where the workspace will be and 
		// put the instance area inside the workspace meta area.
		if (location == null)
			return new BasicLocation(property, defaultLocation, readOnly);
		String trimmedLocation = location.trim();
		if (trimmedLocation.equalsIgnoreCase(NONE))
			return null;
		if (trimmedLocation.equalsIgnoreCase(NO_DEFAULT))
			return new BasicLocation(property, null, readOnly);
		if (trimmedLocation.startsWith(USER_HOME)) {
			String base = substituteVar(location, USER_HOME, PROP_USER_HOME);
			location = new File(base, userDefaultAppendage).getAbsolutePath();
		} else if (trimmedLocation.startsWith(USER_DIR)) {
			String base = substituteVar(location, USER_DIR, PROP_USER_DIR);
			location = new File(base, userDefaultAppendage).getAbsolutePath();
		}
		URL url = buildURL(location, true);
		BasicLocation result = null;
		if (url != null) {
			result = new BasicLocation(property, null, readOnly);
			result.setURL(url, false);
		}
		return result;
	}

	private static String substituteVar(String source, String var, String prop) {
		String value = System.getProperty(prop, ""); //$NON-NLS-1$
		return value + source.substring(var.length());
	}

	private static void initializeDerivedConfigurationLocations() {
		if (System.getProperty(PROP_MANIFEST_CACHE) == null)
			System.getProperties().put(PROP_MANIFEST_CACHE, getConfigurationFile(MANIFESTS_DIR).getAbsolutePath());
	}

	private static URL computeInstallConfigurationLocation() {
		String property = System.getProperty(PROP_INSTALL_AREA);
		if (property != null) {
			try {
				return new URL(property);
			} catch (MalformedURLException e) {
				// do nothing here since it is basically impossible to get a bogus url
			}
		}
		return null;
	}

	private static URL computeSharedConfigurationLocation() {
		String property = System.getProperty(PROP_SHARED_CONFIG_AREA);
		if (property == null)
			return null;
		try {
			URL sharedConfigurationURL = new URL(property);
			if (sharedConfigurationURL.getPath().startsWith("/")) //$NON-NLS-1$
				// absolute
				return sharedConfigurationURL;
			URL installURL = installLocation.getURL();
			if (!sharedConfigurationURL.getProtocol().equals(installURL.getProtocol()))
				// different protocol
				return sharedConfigurationURL;
			sharedConfigurationURL = new URL(installURL, sharedConfigurationURL.getPath());
			System.getProperties().put(PROP_SHARED_CONFIG_AREA, sharedConfigurationURL.toExternalForm());
		} catch (MalformedURLException e) {
			// do nothing here since it is basically impossible to get a bogus url 
		}
		return null;
	}

	private static String computeDefaultConfigurationLocation() {
		// 1) We store the config state relative to the 'eclipse' directory if possible
		// 2) If this directory is read-only 
		//    we store the state in <user.home>/.eclipse/<application-id>_<version> where <user.home> 
		//    is unique for each local user, and <application-id> is the one 
		//    defined in .eclipseproduct marker file. If .eclipseproduct does not
		//    exist, use "eclipse" as the application-id.

		URL installURL = computeInstallConfigurationLocation();
		if (installURL != null) {
			File installDir = new File(installURL.getFile());
			if ("file".equals(installURL.getProtocol()) && canWrite(installDir)) //$NON-NLS-1$
				return new File(installDir, CONFIG_DIR).getAbsolutePath();
		}
		// We can't write in the eclipse install dir so try for some place in the user's home dir
		return computeDefaultUserAreaLocation(CONFIG_DIR);
	}

	private static boolean canWrite(File installDir) {
		if (installDir.canWrite() == false)
			return false;

		if (!installDir.isDirectory())
			return false;

		File fileTest = null;
		try {
			fileTest = File.createTempFile("writtableArea", null, installDir); //$NON-NLS-1$
		} catch (IOException e) {
			//If an exception occured while trying to create the file, it means that it is not writtable
			return false;
		} finally {
			if (fileTest != null)
				fileTest.delete();
		}
		return true;
	}

	private static String computeDefaultUserAreaLocation(String pathAppendage) {
		//    we store the state in <user.home>/.eclipse/<application-id>_<version> where <user.home> 
		//    is unique for each local user, and <application-id> is the one 
		//    defined in .eclipseproduct marker file. If .eclipseproduct does not
		//    exist, use "eclipse" as the application-id.
		String installProperty = System.getProperty(PROP_INSTALL_AREA);
		URL installURL = buildURL(installProperty, true);
		if (installURL == null)
			return null;
		File installDir = new File(installURL.getFile());
		String appName = "." + ECLIPSE; //$NON-NLS-1$
		File eclipseProduct = new File(installDir, PRODUCT_SITE_MARKER);
		if (eclipseProduct.exists()) {
			Properties props = new Properties();
			try {
				props.load(new FileInputStream(eclipseProduct));
				String appId = props.getProperty(PRODUCT_SITE_ID);
				if (appId == null || appId.trim().length() == 0)
					appId = ECLIPSE;
				String appVersion = props.getProperty(PRODUCT_SITE_VERSION);
				if (appVersion == null || appVersion.trim().length() == 0)
					appVersion = ""; //$NON-NLS-1$
				appName += File.separator + appId + "_" + appVersion; //$NON-NLS-1$
			} catch (IOException e) {
				// Do nothing if we get an exception.  We will default to a standard location 
				// in the user's home dir.
			}
		}
		String userHome = System.getProperty(PROP_USER_HOME);
		return new File(userHome, appName + "/" + pathAppendage).getAbsolutePath(); //$NON-NLS-1$
	}

	/**
	 * Returns the user Location object
	 * @return the user Location object
	 */
	public static Location getUserLocation() {
		return userLocation;
	}

	/**
	 * Returns the configuration Location object
	 * @return the configuration Location object
	 */
	public static Location getConfigurationLocation() {
		return configurationLocation;
	}

	/**
	 * Returns the install Location object
	 * @return the install Location object
	 */
	public static Location getInstallLocation() {
		return installLocation;
	}

	/**
	 * Returns the instance Location object
	 * @return the instance Location object
	 */
	public static Location getInstanceLocation() {
		return instanceLocation;
	}

	/**
	 * Returns the File object under the configuration location used for the OSGi configuration
	 * @return the OSGi configuration directory
	 */
	public static File getOSGiConfigurationDir() {
		// TODO assumes the URL is a file: url
		return new File(configurationLocation.getURL().getFile(), FrameworkAdaptor.FRAMEWORK_SYMBOLICNAME);
	}

	/**
	 * Returns a file from the configuration area that can be used by the framework
	 * @param filename the filename
	 * @return a file from the configuration area
	 */
	public static File getConfigurationFile(String filename) {
		File dir = getOSGiConfigurationDir();
		if (!dir.exists())
			dir.mkdirs();
		return new File(dir, filename);
	}
}
