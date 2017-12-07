// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.resources;

import java.awt.image.BufferedImage;
import java.io.IOException;

import edu.colorado.phet.common.phetcommon.Interface;
import edu.colorado.phet.common.phetcommon.audio.PhetAudioClip;
import edu.colorado.phet.common.phetcommon.view.util.ImageLoader;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.GraphicLayerSet;

/**
 * DefaultResourceLoader is the default loader for JAR resources.
 */
/* package private */
public class DefaultResourceLoader extends AbstractResourceLoader {

//    private static BufferedImage NULL_IMAGE;

    /**
     * Gets the image having the specified resource name.
     *
     * @param resourceName
     * @return BufferedImage
     */
    @Override
		public BufferedImage getImage( String resource ) {
        if ( resource == null || resource.length() == 0 ) {
            throw new IllegalArgumentException( "null or zero-length resource name" );
        }
        BufferedImage image = null;
        try {
            image = ImageLoader.loadBufferedImage( resource );
            //System.out.println(image.getSource() + " " + resource);
            GraphicLayerSet.graphicSourcesBH.put(image.getSource(), resource);
        }
        catch ( IOException e ) {
            e.printStackTrace();
            image = new BufferedImage( 1, 1, BufferedImage.TYPE_INT_RGB );
        }
        return image;
    }

    /**
     * Gets the audio clip having the specified resource name.
     *
     * @param resourceName
     * @return PhetAudioClip
     */
    @Override
		public PhetAudioClip getAudioClip( String resource ) {
        if ( resource == null || resource.length() == 0 ) {
            throw new IllegalArgumentException( "null or zero-length resource name" );
        }
        return (PhetAudioClip) Interface.getInstanceWithParams("edu.colorado.phet.common.phetcommon.audio.PhetAudioClip", new Class<?>[] { String.class }, resource);
        //return new PhetAudioClip( resource );
    }
    

}
