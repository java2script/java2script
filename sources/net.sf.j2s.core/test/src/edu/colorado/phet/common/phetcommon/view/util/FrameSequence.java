// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 54200 $
 * Date modified : $Date: 2011-07-18 19:45:40 -0500 (Mon, 18 Jul 2011) $
 */
package edu.colorado.phet.common.phetcommon.view.util;

import java.awt.image.BufferedImage;
import java.io.IOException;

/**
 * FrameSequence
 * A utility class that supports animation of a set of images read from disk.
 * <p/>
 * The class provides methods for stepping back and forth at will through the
 * set of images. It also has methods that understand the specific naming convention
 * used by Poser when it creates animations.
 *
 * @author Ron LeMaster
 * @version $Revision: 54200 $
 */
public class FrameSequence {

    //----------------------------------------------------------------
    // Class<?> data
    //----------------------------------------------------------------
    private static final String DEFAULT_FILE_TYPE = "gif";


    private BufferedImage[] frames;
    private int currFrameNum = 0;

    /**
     * @param frames
     */
    public FrameSequence( BufferedImage[] frames ) {
        this.frames = frames;
    }

    /**
     * @param filePrefix The prefix for the names of all files to be animated
     * @param numFrames  The number of files to be animated
     */
    public FrameSequence( String filePrefix, int numFrames ) throws IOException {
        this( loadAnimation( filePrefix, DEFAULT_FILE_TYPE, numFrames ) );
    }

    /**
     * @param filePrefix
     * @param fileType
     * @param numFrames
     * @throws IOException
     */
    public FrameSequence( String filePrefix, String fileType, int numFrames ) throws IOException {
        this( loadAnimation( filePrefix, fileType, numFrames ) );
    }

    /**
     * Gets the current image of the animation
     *
     * @return The current image of the animation
     */
    public BufferedImage getCurrFrame() {
        return frames[currFrameNum];
    }

    /**
     * Gets the next frame in the animation
     *
     * @return The next frame in the animation
     */
    public BufferedImage getNextFrame() {
        stepCurrFrameNum( +1 );
        return getCurrFrame();
    }

    /**
     * Gets the previous frame of the animation
     *
     * @return The previous frame of the animation
     */
    public BufferedImage getPrevFrame() { // BH was Image
        stepCurrFrameNum( -1 );
        return getCurrFrame();
    }

    /**
     * Steps the animation a specified number of frames
     *
     * @param dir +1 steps forward, -1 steps back
     * @return the new current frame number for the animation
     */
    private int stepCurrFrameNum( int dir ) {
        currFrameNum = ( currFrameNum + frames.length + dir ) % frames.length;
        return currFrameNum;
    }

    /**
     */
    public int getCurrFrameNum() {
        return currFrameNum;
    }

    /**
     * @return the number of frames in this animation.
     */
    public int getNumFrames() {
        return frames.length;
    }

    //
    // Static fields and methods
    //

    /**
     *
     */
    private static BufferedImage[] loadAnimation( String filePrefix, String fileType, int numFrames ) throws IOException {
        BufferedImage[] frames = new BufferedImage[numFrames];
        ImageLoader animationLoader = new ImageLoader();
        for ( int i = 1; i <= numFrames; i++ ) {
            String fileName = FrameSequence.genAnimationFileName( filePrefix, fileType, i );
            frames[i - 1] = animationLoader.loadImage( fileName );
            //            frames[i - 1] = animationLoader.loadImage(fileName);
        }
        return frames;
    }

    /**
     * Generates a complete TIFF file name for a frame in a Poser-generated animation
     */
    private static String genAnimationFileName( String fileNamePrefix, String fileType, int frameNum ) {
    	// BH fix 11/2/2016 removal of int /= int and JavaScript optimization
			//      String zeroStr = "";
			//      int i = 0;
			//      for ( int temp = frameNum; temp != 0; i++ ) {
			//          temp /= 10;
			//      }
			//      for (; i < 4; i++ ) {
			//          zeroStr = zeroStr.concat( "0" );
			//      }
			//      String fileName = fileNamePrefix + "_" + zeroStr + Integer.toString( frameNum ) + "." + fileType;
        String s = "0000" + frameNum;
        s = s.substring(s.length() - 4);
        String fileName = fileNamePrefix + "_" + s + "." + fileType;
        return fileName;
    }

    public BufferedImage getFrame( int frameNum ) {
        return this.frames[frameNum];
    }
}
