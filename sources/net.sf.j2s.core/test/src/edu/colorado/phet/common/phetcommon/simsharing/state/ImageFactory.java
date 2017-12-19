// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.simsharing.state;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;

import javax.swing.JFrame;

import edu.colorado.phet.common.phetcommon.view.PhetFrame;
import edu.colorado.phet.common.phetcommon.view.util.BufferedImageUtils;

/**
 * Encapsulates thumbnail creation, reusing BufferedImages as necessary for performance reasons.
 * Creating a new instance each time an image is required is too costly, the ImageFactory should be created once per application
 *
 * @author Sam Reid
 */
public class ImageFactory {
    private BufferedImage image;
    private int count;
    private int numTimes = 10;//sim runs at 30fps, but we only generate an image every numTimes frames

    public BufferedImage getThumbnail( PhetFrame frame, int width ) {
        return BufferedImageUtils.multiScaleToWidth( toImage( frame ), width );
    }

    public BufferedImage toImage( JFrame frame ) {
        count++;
        if ( image == null || image.getWidth() != frame.getWidth() || image.getHeight() != frame.getHeight() ) {
            image = new BufferedImage( frame.getWidth(), frame.getHeight(), BufferedImage.TYPE_INT_RGB );
            System.out.println( "new image created" );
        }
        //TODO: could be done in a different thread?
        if ( count % numTimes == 0 ) {
            Graphics2D g2 = image.createGraphics();
            frame.getContentPane().paint( g2 );
            g2.dispose();
//            image = sendFromRobot( frame );
        }
        return image;
    }

//    //Generates screenshots from a Robot, sending the entire desktop.  We may or may not use this in production
//    private BufferedImage sendFromRobot( JFrame frame ) {
//        try {
//            return new Robot().createScreenCapture( new Rectangle( frame.getX(), frame.getY(), frame.getWidth(), frame.getHeight() ) );
//        }
//        catch ( AWTException e ) {
//            e.printStackTrace();
//            throw new RuntimeException( e );
//        }
//    }
}
