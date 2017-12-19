// Copyright 2002-2011, University of Colorado

/**
 * Class: Mannequin
 * Package: edu.colorado.phet.idealgas.view
 * Author: Another Guy
 * Date: Sep 14, 2004
 */
package edu.colorado.phet.idealgas.view;

import edu.colorado.phet.common.phetcommon.util.SimpleObserver;
import edu.colorado.phet.common.phetcommon.view.util.FrameSequence;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetGraphic;
import edu.colorado.phet.idealgas.IdealGasConfig;
import edu.colorado.phet.idealgas.IdealGasResources;
import edu.colorado.phet.idealgas.model.IdealGasModel;
import edu.colorado.phet.idealgas.model.PressureSensingBox;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;

/**
 * An animated stack of images of a mannequin. It either changes its angle
 * of lean, or walks
 */
public class Mannequin extends PhetGraphic implements SimpleObserver {
    private static float s_leaningManStateChangeScaleFactor = 1.75F;

    private FrameSequence pusher;
    private FrameSequence leaner;
    private BufferedImage currPusherFrame; // BH  was Image
    private BufferedImage currLeanerFrame;
    private IdealGasModel model;
    private PressureSensingBox box;
    private Box2DGraphic boxGraphic;
    private Point location = new Point();
    private double lastPressure;
    private Image currFrame;

    public Mannequin( Component component, IdealGasModel model, PressureSensingBox box, Box2DGraphic boxGraphic ) {
        super( component );
        this.model = model;
        this.box = box;
        this.boxGraphic = boxGraphic;
        try {
            pusher = new FrameSequence( IdealGasResources.toAsset(IdealGasConfig.PUSHER_ANIMATION_IMAGE_FILE_PREFIX), IdealGasConfig.PUSHER_ANIMATION_IMAGE_FILE_TYPE, IdealGasConfig.NUM_PUSHER_ANIMATION_FRAMES );
            leaner = new FrameSequence( IdealGasResources.toAsset(IdealGasConfig.LEANER_ANIMATION_IMAGE_FILE_PREFIX), IdealGasConfig.PUSHER_ANIMATION_IMAGE_FILE_TYPE, IdealGasConfig.NUM_LEANER_ANIMATION_FRAMES );
        }
        catch( IOException e ) {
            e.printStackTrace();
        }
        currPusherFrame = pusher.getCurrFrame();
        currLeanerFrame = leaner.getCurrFrame();

        box.addObserver( this );
        update();

        setIgnoreMouse( true );
    }

	@Override
	protected Rectangle determineBounds() {
		shapeRect.x = location.x;
		shapeRect.y = location.y;
		shapeRect.width = currPusherFrame.getRaster().getWidth();
		shapeRect.height = currPusherFrame.getRaster().getHeight();
		return shapeRect;
	}

    @Override
		public void paint( Graphics2D g ) {
        g.drawImage( currFrame, location.x, location.y, null );
    }

    @Override
		public void update() {
        int offsetX = -(int)Box2DGraphic.s_thickness + 3;
        int offsetY = (int)Box2DGraphic.s_thickness;

        int nextLocationX = (int)box.getMinX() - currPusherFrame.getRaster().getHeight() + offsetX;
        boolean wallMoving = nextLocationX != location.x;
        if( wallMoving || boxGraphic.isGraphicSelected() ) {
            int dir = nextLocationX - location.x;
            location.setLocation( nextLocationX, box.getMaxY() - currPusherFrame.getRaster().getWidth() + offsetY );
            // Update the pusher
            if( wallMoving ) {
                currPusherFrame = dir > 0 ? pusher.getNextFrame() : pusher.getPrevFrame();
            }
            currFrame = currPusherFrame;
            setBoundsDirtyOpt();
            repaint();
        }
        else {
            double newPressure = box.getPressure();
            if( newPressure != lastPressure ) {
                int dir = newPressure == lastPressure ? 0 :
                          ( newPressure > lastPressure * s_leaningManStateChangeScaleFactor ? 1 : -1 );
                lastPressure = newPressure;
                // Update the leaner
                if( dir > 0 && leaner.getCurrFrameNum() + 1 < leaner.getNumFrames() ) {
                    currLeanerFrame = leaner.getNextFrame();
                }
                else if( dir < 0 && leaner.getCurrFrameNum() > 0 ) {
                    currLeanerFrame = leaner.getPrevFrame();
                }
                // todo: replace hard-coded number here
                int frameNum = (int)Math.min( ( newPressure / IdealGasConfig.MAX_GAUGE_PRESSURE ) * leaner.getNumFrames(), leaner.getNumFrames() - 1 );
                currLeanerFrame = leaner.getFrame( frameNum );
                if( model.isConstantVolume() || model.isConstantNone() ) {
                    currFrame = currLeanerFrame;
                    setBoundsDirtyOpt();
                    repaint();
                }
            }
        }
    }
}
