// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 47761 $
 * Date modified : $Date: 2011-01-07 11:49:12 -0600 (Fri, 07 Jan 2011) $
 */
package edu.colorado.phet.common.phetgraphics.view.graphics.mousecontrols.translation;

import java.awt.event.MouseEvent;
import java.util.EventObject;

/**
 * TranslationEvent
 *
 * @author ?
 * @version $Revision: 47761 $
 */
public class TranslationEvent extends EventObject {
    private MouseEvent event;
    private int x;
    private int y;
    private int dx;
    private int dy;

    public TranslationEvent( Object source, MouseEvent event, int x, int y, int dx, int dy ) {
        super( source );
        this.event = event;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
    }

    public MouseEvent getMouseEvent() {
        return event;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public int getDx() {
        return dx;
    }

    public int getDy() {
        return dy;
    }
}
