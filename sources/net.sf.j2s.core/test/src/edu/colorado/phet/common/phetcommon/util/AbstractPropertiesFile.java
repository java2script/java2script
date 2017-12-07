// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.util;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.security.AccessControlException;
import java.util.Enumeration;
import java.util.Properties;

/**
 * Base class for all properties file interfaces.
 * Setting a property value stores it in the file immediately.
 * <p/>
 * This class is implemented using composition instead of inheritance
 * because it's not appropriate to expose the entire File interface.
 * The interface should be limited to getting and setting properties.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class AbstractPropertiesFile {

    private final File file;
    private final Properties properties;
    private String header;

    public AbstractPropertiesFile( String filename ) {
        this( new File( filename ) );
    }

    public AbstractPropertiesFile( File file ) {
        this.file = file;
        this.header = null;
        this.properties = load( file );
    }

    /*
     * Loads the properties from the file, if it exists.
     */
    private static Properties load( File file ) {
        Properties properties = new Properties();
        if ( file.exists() ) {
            try {
                // added stream closing, so we don't open way way way too many streams!
                BufferedInputStream stream = new BufferedInputStream( new FileInputStream( file ) );
                properties.load( stream );
                stream.close();
            }
            catch ( IOException e ) {
                e.printStackTrace();
            }
            catch ( AccessControlException e ) {
                System.err.println( AbstractPropertiesFile.class.getName() + " access denied to file " + file.getAbsolutePath() );
            }
        }
        return properties;
    }

    /*
     * Store the properties to the file.
     */
    private void store() {
        try {
            final File parent = file.getParentFile();
            if ( !parent.exists() ) {
                parent.mkdirs();
            }
            final FileOutputStream stream = new FileOutputStream( file );
            properties.store( stream, header );
            stream.close();//close the output stream after use to avoid file locking related problems
        }
        catch ( IOException e ) {
            e.printStackTrace();
        }
        catch ( AccessControlException e ) {
            System.err.println( getClass().getName() + " access denied to file " + file.getAbsolutePath() );
        }
    }

    /**
     * Sets the header in the properties file.
     * The header is not written until the next time that store is called.
     * This ensures that we don't needlessly touch a properties file until
     * some property is actually modified.
     *
     * @param header
     */
    public void setHeader( String header ) {
        this.header = header;
    }

    /**
     * Does this properties file exist?
     *
     * @return
     */
    public boolean exists() {
        return file.exists();
    }

    /**
     * Gets the names of all properties in the file.
     *
     * @return
     */
    public Enumeration<?> getPropertyNames() {
        return properties.propertyNames();
    }

    /*
     * Setting a property stores it immediately.
     * <p>
     * This method is protected because subclasses should not expose key values,
     * they should have set/get methods for each property.
     *
     * @param key
     * @param value
     */
    protected void setProperty( String key, String value ) {
        properties.setProperty( key, value );
        store();
    }

    protected void setProperty( String key, int value ) {
        setProperty( key, String.valueOf( value ) );
    }

    protected void setProperty( String key, long value ) {
        setProperty( key, String.valueOf( value ) );
    }

    /*
     * Gets a property value as a String.
     * <p>
     * This method is protected because subclasses should not expose key values,
     * they should have set/get methods for each property.
     * @param key
     * @return String value
     */
    protected String getProperty( String key ) {
        return properties.getProperty( key );
    }

    /*
     * Gets a property as an integer value.
     * If the property value can't be converted to an integer, defaultValue is returned.
     * <p>
     * This method is protected because subclasses should not expose key values,
     * they should have set/get methods for each property.
     *
     * @param key
     * @param defaultValue
     * @return int value
     */
    protected int getPropertyInt( String key, int defaultValue ) {
        int value = defaultValue;
        String s = getProperty( key );
        if ( s != null ) {
            try {
                value = Integer.parseInt( s );
            }
            catch ( NumberFormatException e ) {
                System.err.println( "PropertiesFile.getPropertyInt: " + key + " is not an integer in file " + file.getAbsolutePath() );
            }
        }
        return value;
    }

    /*
     * Gets a property as an integer value.
     * If the property value can't be converted to an integer, defaultValue is returned.
     * <p>
     * This method is protected because subclasses should not expose key values,
     * they should have set/get methods for each property.
     *
     * @param key
     * @param defaultValue
     * @return int value
     */
    protected long getPropertyLong( String key, long defaultValue ) {
        long value = defaultValue;
        String s = getProperty( key );
        if ( s != null ) {
            try {
                value = Long.parseLong( s );
            }
            catch ( NumberFormatException e ) {
                System.err.println( "PropertiesFile.getPropertyInt: " + key + " is not a long in file " + file.getAbsolutePath() );
            }
        }
        return value;
    }

    @Override
		public String toString() {
        return properties.toString();
    }

    public boolean delete() {
        properties.clear();
        return file.delete();
    }

    public void deleteOnExit() {
        file.deleteOnExit();
    }
}
