// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.simsharing.state;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Arrays;

import javax.imageio.ImageIO;

import edu.colorado.phet.common.phetcommon.util.IProguardKeepClass;

/**
 * Serializable state for simsharing, allows transmission of a BufferedImage for thumbnail
 * Inspired by http://www.ni-c.de/2008/10/serializable-bufferedimage/ which is ditsributed under Creative Commons license
 */
public class SerializableBufferedImage implements IProguardKeepClass {

    private final byte[] byteArray;

    public SerializableBufferedImage( BufferedImage bufferedImage ) {
        this( bufferedImage, "JPG" );
    }

    public SerializableBufferedImage( BufferedImage bufferedImage, String format ) {
        this.byteArray = toByteArray( bufferedImage, format );
    }

    public BufferedImage toBufferedImage() {
        return fromByteArray( byteArray );
    }

    public static BufferedImage fromByteArray( byte[] byteArray ) {
        try {
            return ImageIO.read( new ByteArrayInputStream( byteArray ) );
        }
        catch ( IOException e ) {
            throw new RuntimeException( e );
        }
    }

    private static byte[] toByteArray( final BufferedImage bufferedImage, final String format ) {
        try {
            return new ByteArrayOutputStream() {{ ImageIO.write( bufferedImage, format, this ); }}.toByteArray();
        }
        catch ( IOException e ) {
            throw new RuntimeException( e );
        }
    }

    @Override public String toString() {
        return "SerializableBufferedImage{" +
               "byteArray=" + Arrays.toString( byteArray ) +
               '}';
    }
}