// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.resources;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.util.Locale;

import edu.colorado.phet.common.phetcommon.audio.PhetAudioClip;

/**
 * IResourceLoader is the interface implemented by all resource loaders.
 */
/* package private */
public interface IResourceLoader {

    /**
     * Determines if a named resource exists.
     *
     * @param resourceName
     * @return true or false
     */
    public boolean exists( String resourceName );

    /**
     * Gets an input stream for the specified resource.
     *
     * @param resourceName
     * @return InputStream
     */
    public InputStream getResourceAsStream( String resourceName ) throws IOException;


    /**
     * Returns the contents of a resource as a String.
     *
     * @param resourceName
     * @return String
     */
    public String getResourceAsString( String resourceName ) throws IOException;

    /**
     * Gets a byte array for the specified resource.
     *
     * @param resourceName
     * @return byte[]
     */
    public byte[] getResource( String resourceName ) throws IOException;

    /**
     * Gets the image having the specified resource name.
     *
     * @param resourceName
     * @return BufferedImage
     */
    public BufferedImage getImage( String resourceName );

    /**
     * Gets the audio clip having the specified resource name.
     *
     * @param resourceName
     * @return PhetAudioClip
     */
    public PhetAudioClip getAudioClip( String resourceName );

    /**
     * Gets the properties file having the specified resource name and locale.
     *
     * @param resourceName
     * @param locale
     * @return PhetProperties
     */
    public PhetProperties getProperties( String resourceName, Locale locale );
}
