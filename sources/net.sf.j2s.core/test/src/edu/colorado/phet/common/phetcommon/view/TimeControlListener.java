// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.view;

import java.util.EventListener;

/**
 * Listener interface for receiving events from anything that controls time.
 */
public interface TimeControlListener extends EventListener {

    void stepPressed();

    void playPressed();

    void pausePressed();

    void stepBackPressed();

    void restartPressed();

    public static class TimeControlAdapter implements TimeControlListener {

        @Override
				public void stepPressed() {
        }

        @Override
				public void playPressed() {
        }

        @Override
				public void pausePressed() {
        }

        @Override
				public void stepBackPressed() {
        }

        @Override
				public void restartPressed() {
        }
    }
}