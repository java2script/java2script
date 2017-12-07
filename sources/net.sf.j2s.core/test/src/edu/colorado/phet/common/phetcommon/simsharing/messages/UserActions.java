// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.simsharing.messages;

/**
 * Enum for actions performed by the user
 *
 * @author Sam Reid
 */
public enum UserActions implements IUserAction {
    activated, changed, closed, deactivated, deiconified, drag, endDrag,
    iconified, moved, pressed, released, resized, startDrag,
    windowOpened, windowClosed, windowClosing, popupTriggered,
    focusLost, focusGained, selected, textFieldCommitted, textFieldCorrected,
    enterPressed, keyPressed, buttonPressed, mousePressed,
    trackClicked, upArrowPressed, downArrowPressed
}
