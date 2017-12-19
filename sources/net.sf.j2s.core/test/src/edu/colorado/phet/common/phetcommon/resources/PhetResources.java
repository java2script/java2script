// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.resources;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.text.MessageFormat;
import java.util.Locale;
import java.util.Properties;

import edu.colorado.phet.common.phetcommon.PhetCommonConstants;
import edu.colorado.phet.common.phetcommon.audio.PhetAudioClip;

/**
 * PhetResources provides the facilities for accessing JAR resources.
 * <p/>
 * The implementation of this class assumes that the resources are in specific
 * locations. If [projectName] is the name of the simulation's directory in the
 * repository, then the resources are excepted to exist at these locations in
 * the JAR file:
 * <p/>
 * <ul>
 * <li>/[projectName]/ : the root of all resources
 * <li>/[projectName]/[projectName].properties : the project properties file,
 * nonlocalized properties
 * <li>/[projectName]/localization/[projectName]-strings.properties : English
 * strings
 * <li>/[projectName]/localization/[projectName]-strings_[countryCode].properties
 * : localized strings for a specific country code
 * <li>/[projectName]/images/ : images
 * <li>/[projectName]/audio/ : audio
 * </ul>
 * <p/>
 * The project's properties file and string localization file are loaded when
 * this object is instantiated.
 *
 * @author Chris Malley
 * @author John De Goes
 */
public class PhetResources {

	// ----------------------------------------------------------------------------
	// Class<?> data
	// ----------------------------------------------------------------------------

	// private static final Logger LOGGER = LoggingUtils.getLogger(
	// PhetResources.class.getCanonicalName() );

	// static {
	// // get rid of this to log all of the resource messages
	// LOGGER.setLevel( Level.WARNING );
	// }

	// Standard localized properties:
	private static final String PROPERTY_NAME = "name";

	// Standard non-localized properties:
	public static final String PROPERTY_VERSION_MAJOR = "version.major";
	public static final String PROPERTY_VERSION_MINOR = "version.minor";
	public static final String PROPERTY_VERSION_DEV = "version.dev";
	public static final String PROPERTY_VERSION_REVISION = "version.revision";
	public static final String PROPERTY_VERSION_TIMESTAMP = "version.timestamp";
	public static final String PROPERTY_DISTRIBUTION_TAG = "distribution.tag";

	private static final String AUDIO_DIR = "audio";
	private static final String IMAGES_DIR = "images";
	private static final String LOCALIZATION_DIR = "localization";
	private static final String LOCALIZATION_FILE_SUFFIX = "-strings";

	private static final char PATH_SEPARATOR = '/';

	private static final String PROPERTIES_SUFFIX = ".properties";

	public static final String ASSET_PREFIX = "edu/colorado/phet/assets/";

	// ----------------------------------------------------------------------------
	// Instance data
	// ----------------------------------------------------------------------------

	private final String projectName;
	private final Locale locale;
	private final PhetProperties localizedProperties;
	private final PhetProperties projectProperties;
	private final IResourceLoader resourceLoader;
	private final String rootDirectoryName;
	private volatile PhetVersion version;

	// ----------------------------------------------------------------------------
	// Constructors & initializers
	// ----------------------------------------------------------------------------

	/**
	 * Constructor, default locale and default resource loader.
	 *
	 * @param projectName
	 */
	public PhetResources(String projectName) {
		this(projectName, readLocale(), new DefaultResourceLoader());
	}

	/**
	 * Constructor.
	 *
	 * @param projectName
	 * @param locale
	 * @param resourceLoader
	 */
	public PhetResources(String projectName, Locale locale, IResourceLoader resourceLoader) {

		this.projectName = projectName;
		// BH -- moved root to edu/colorado/phet/assets
		this.rootDirectoryName = ASSET_PREFIX + projectName;
		this.locale = locale;
		this.resourceLoader = resourceLoader;

		// Load the project's properties file, if it exists
		String projectPropertiesBundleName = projectName + PROPERTIES_SUFFIX;
		if (resourceLoader.exists(rootDirectoryName + PATH_SEPARATOR + projectPropertiesBundleName)) {
			this.projectProperties = getProperties(projectPropertiesBundleName);
		} else {
			this.projectProperties = new PhetProperties();
		}

		// Load the localized strings
		String localizedPropertiesBundleName = LOCALIZATION_DIR + PATH_SEPARATOR + projectName
				+ LOCALIZATION_FILE_SUFFIX;
		this.localizedProperties = getProperties(localizedPropertiesBundleName);
	}

	/*
	 * Read the locale that was specified for the application. The default
	 * locale is the value of the user.language System property, as read by
	 * Locale.getDefault. PhET-specific properties can be used to override the
	 * default.
	 * 
	 * @return Locale
	 */
	public static Locale readLocale() {

		Locale locale = Locale.getDefault();

		/**
		 * just return default in JavaScript. JSToolkit will take care of this.
		 * 
		 * @j2sNative
		 * 
		 */
		{

			// LOGGER.fine( "readLocale: default locale=" + locale.toString() );

			String language = System.getProperty(PhetCommonConstants.PROPERTY_PHET_LANGUAGE);
			String country = System.getProperty(PhetCommonConstants.PROPERTY_PHET_COUNTRY); // optional,
																							// may
																							// be
																							// null
			if (language != null) {
				if (country != null) {
					// LOGGER.fine( "readLocale: overriding locale via " +
					// PhetCommonConstants.PROPERTY_PHET_LANGUAGE + "=" +
					// language + " " +
					// PhetCommonConstants.PROPERTY_PHET_COUNTRY + "=" + country
					// );
					locale = new Locale(language, country);
				} else {
					// LOGGER.fine( "readLocale: overriding locale via " +
					// PhetCommonConstants.PROPERTY_PHET_LANGUAGE + "=" +
					// language );
					locale = new Locale(language);
				}
			} else if (country != null) {
				// LOGGER.fine(
				// "readLocale: ignoring locale properties, they are in an
				// illegal state, country specified without language"
				// );
			}

			// LOGGER.fine( "readLocale: returning locale=" + locale.toString()
			// );

		}
		return locale;
	}

	// ----------------------------------------------------------------------------
	// Accessors
	// ----------------------------------------------------------------------------

	/**
	 * Gets the name of the project.
	 *
	 * @return String
	 */
	public String getProjectName() {
		return projectName;
	}

	/**
	 * Gets the name of the root directory where all resources are stored.
	 *
	 * @return directory name
	 */
	public String getRootDirectoryName() {
		return rootDirectoryName;
	}

	/**
	 * Gets the locale used to load the resources.
	 *
	 * @return Locale
	 */
	public Locale getLocale() {
		return locale;
	}

	/**
	 * Gets the localized properties.
	 *
	 * @return PhetProperties
	 */
	public PhetProperties getLocalizedProperties() {
		return localizedProperties;
	}

	/**
	 * Gets the project properties.
	 *
	 * @return PhetProperties
	 */
	public PhetProperties getProjectProperties() {
		return projectProperties;
	}

	// ----------------------------------------------------------------------------
	// Resource accessors
	// ----------------------------------------------------------------------------

	/**
	 * Gets the audio having the specified resource location.
	 *
	 * @param resourceName
	 * @return PhetAudioClip
	 */
	public PhetAudioClip getAudioClip(String resourceName) {
		return resourceLoader.getAudioClip(getFullPathForAudio(resourceName));
	}

	/**
	 * Returns the fully qualified path (from the root) for the specified audio
	 * resource
	 *
	 * @param s
	 * @return
	 */
	public String getFullPathForAudio(String s) {
		return rootDirectoryName + PATH_SEPARATOR + AUDIO_DIR + PATH_SEPARATOR + s;
	}

	/**
	 * Gets the image having the specified resource location.
	 *
	 * @param resourceName
	 * @return BufferedImage
	 */
	public BufferedImage getImage(String resourceName) {
		return resourceLoader.getImage(rootDirectoryName + PATH_SEPARATOR + IMAGES_DIR + PATH_SEPARATOR + resourceName);
	}

	/**
	 * Gets a byte array of the resource file having the specified location.
	 *
	 * @param resourceName
	 * @return byte[]
	 */
	public byte[] getResource(String resourceName) throws IOException {
		return resourceLoader.getResource(rootDirectoryName + PATH_SEPARATOR + resourceName);
	}

	/**
	 * Gets an input stream to the resource having the specified location.
	 *
	 * @param resourceName
	 * @return InputStream
	 */
	public InputStream getResourceAsStream(String resourceName) throws IOException {
		return resourceLoader.getResourceAsStream(rootDirectoryName + PATH_SEPARATOR + resourceName);
	}

	/**
	 * Returns the contents of a resource as a String.
	 * 
	 * @param resourceName
	 * @return String
	 */
	public String getResourceAsString(String resourceName) throws IOException {
		return resourceLoader.getResourceAsString(resourceName);
	}

	/**
	 * Gets a properties resource. Use this if you need to load a
	 * simulation-specific properties file.
	 *
	 * @param resourceName
	 * @return PhetProperties
	 */
	public PhetProperties getProperties(String resourceName) {
		return resourceLoader.getProperties(rootDirectoryName + PATH_SEPARATOR + resourceName, locale);
	}

	// ----------------------------------------------------------------------------
	// Convenience methods
	// ----------------------------------------------------------------------------

	public String getProjectProperty(String key) {
		return projectProperties.getProperty(key);
	}

	public String getLocalizedString(String key) {
		return DummyConstantStringTester.getString(localizedProperties.getString(key));
	}

	/**
	 * Look up a pattern based on a key, then fill it in with with the specified
	 * values.
	 *
	 * @param key
	 *            the key that indicates the pattern in a resource file
	 * @param values
	 *            the values to use in filling in the mesage pattern
	 * @return the formatted string with values filled in
	 */
	public String format(String key, String... values) {
		return MessageFormat.format(getLocalizedString(key), (Object[]) values);
	}

	public char getLocalizedChar(String key, char defaultValue) {
		return localizedProperties.getChar(key, defaultValue);
	}

	public int getLocalizedInt(String key, int defaultValue) {
		return localizedProperties.getInt(key, defaultValue);
	}

	public double getLocalizedDouble(String key, double defaultValue) {
		return localizedProperties.getDouble(key, defaultValue);
	}

	// ----------------------------------------------------------------------------
	// Properties that are common to all sims
	// ----------------------------------------------------------------------------

	/**
	 * Gets the localized name of the sim (required property).
	 */
	public String getName(String flavor) {
		return localizedProperties.getProperty(flavor + "." + PROPERTY_NAME);
	}

	/**
	 * Gets the object that encapsulates the project's version information.
	 * Involves using a number of required project properties. TODO: remove
	 * duplicate implementation in PhetProject
	 */
	public PhetVersion getVersion() {
		if (version == null) {
			version = getVersion(projectProperties);
		}
		return version;
	}

	public static PhetVersion getVersion(Properties properties) {
		String major = properties.getProperty(PROPERTY_VERSION_MAJOR),
				minor = properties.getProperty(PROPERTY_VERSION_MINOR),
				dev = properties.getProperty(PROPERTY_VERSION_DEV),
				rev = properties.getProperty(PROPERTY_VERSION_REVISION),
				timestamp = properties.getProperty(PROPERTY_VERSION_TIMESTAMP);
		return new PhetVersion(major, minor, dev, rev, timestamp);
	}

	public String getDistributionTag() {
		return getProjectProperty(PROPERTY_DISTRIBUTION_TAG);
	}

}
