// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.view.util;

import java.awt.Insets;
import java.awt.Rectangle;

import javax.swing.JFrame;

import static java.awt.GraphicsEnvironment.getLocalGraphicsEnvironment;
import static java.awt.Toolkit.getDefaultToolkit;

/*
 * Strategies for setting up the size and location of a frame
 * FrameSetup is called during the build phase of a simulation, and hence must run in headless mode without exception,
 * so each of the getDefaultToolkit calls is in a try/catch that returns empty (0) values if there was a failure.
 * The exception is:
 * java.lang.InternalError: Can't connect to X11 window server using ':2000.0' as the value of the DISPLAY variable.
 * ...
 * Caused by: java.awt.HeadlessException
 	at sun.awt.HeadlessToolkit.getScreenSize(HeadlessToolkit.java:279)
 	at edu.colorado.phet.common.phetcommon.view.util.FrameSetup$CenteredWithSize.getAvailableWidth(FrameSetup.java:49)
 *
 * @author Sam Reid
 */
public interface FrameSetup {
    public void initialize( JFrame frame );

    public static class CenteredWithSize implements FrameSetup {
        private int frameWidth;
        private int frameHeight;

        //Flag to indicate whether the requested frame size would fit on the screen, accounting for toolbars, etc.
        private boolean shrunken;

		/**
		 * Creates a new CenteredWithSize strategy that will center the window with
		 * the specified size (or the available window size, whichever is smaller).
		 * This prevents the window from being initialized to be larger (in width or
		 * height) than the available screen size, accounting for insets of
		 * toolbars, etc.
		 * 
		 * @param frameWidth
		 *          the desired frame width
		 * @param frameHeight
		 *          the desired frame height
		 */
		public CenteredWithSize(int frameWidth, int frameHeight) {

			this.frameWidth = frameWidth;
			this.frameHeight = frameHeight;

			/**
			 * 
			 * @j2sIgnore
			 * 
			 * 
			 */
			{
				this.shrunken = getAvailableWidth() < frameWidth
						|| getAvailableHeight() < frameHeight;
				this.frameWidth = Math.min(getAvailableWidth(), frameWidth);
				this.frameHeight = Math.min(getAvailableHeight(), frameHeight);
			}
		}

        //Determines the width of the screen that is available for windowing, that is, the size without the insets.
        private int getAvailableWidth() {
            try {
                return getDefaultToolkit().getScreenSize().width - getInsets().left - getInsets().right;
            }
            catch ( Throwable e ) {
                return 0;
            }
        }

        //Determines the width of the screen that is available for windowing, that is, the size without the insets.
        private int getAvailableHeight() {
            try {
                return getDefaultToolkit().getScreenSize().height - getInsets().top - getInsets().bottom;
            }
            catch ( Throwable e ) {
                return 0;
            }
        }

        private Insets getInsets() {
            try {
                return getDefaultToolkit().getScreenInsets( getLocalGraphicsEnvironment().getDefaultScreenDevice().getDefaultConfiguration() );
            }
            catch ( Throwable e ) {
                return new Insets( 0, 0, 0, 0 );
            }
        }

        //Determine the screen region that is not taken up by toolbars, etc.
        private Rectangle getAvailableRectangle() {
            return new Rectangle( getInsets().left, getInsets().top, getAvailableWidth(), getAvailableHeight() );
        }

        @Override
				public void initialize( JFrame frame ) {
            //Center in available region
            frame.setLocation( (int) getAvailableRectangle().getCenterX() - frameWidth / 2,
                               (int) getAvailableRectangle().getCenterY() - frameHeight / 2 );
            frame.setSize( frameWidth, frameHeight );
        }

        //Returns true if the requested window size would not fit on the actual main screen, accounting for the size of toolbars and other insets.
        //This is used in ApparatusPanel3 to determine when to apply a different scaling algorithm--always scaling ApparatusPanel2 can lead to rendering artifacts, so we use this flag to determine when that step can be avoided.
        public boolean isShrunken() {
            return shrunken;
        }
    }
}