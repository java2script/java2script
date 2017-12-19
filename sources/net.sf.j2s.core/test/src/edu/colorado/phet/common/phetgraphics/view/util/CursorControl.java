// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 54200 $
 * Date modified : $Date: 2011-07-18 19:45:40 -0500 (Mon, 18 Jul 2011) $
 */
package edu.colorado.phet.common.phetgraphics.view.util;

import java.awt.Cursor;
import java.awt.event.MouseEvent;

import javax.swing.event.MouseInputListener;

/**
 * CursorControl
 *
 * @author ?
 * @version $Revision: 54200 $
 */
public class CursorControl implements MouseInputListener {
    private Cursor cursor;
    private Cursor exitCursor;

    public CursorControl() {
        this( Cursor.getPredefinedCursor( Cursor.HAND_CURSOR ) );
    }

    public CursorControl( Cursor cursor ) {
        this( cursor, Cursor.getPredefinedCursor( Cursor.DEFAULT_CURSOR ) );
    }

    public CursorControl( Cursor cursor, Cursor exitCursor ) {
        this.cursor = cursor;
        this.exitCursor = exitCursor;
    }

    @Override
		public void mouseClicked( MouseEvent e ) {
    }

    @Override
		public void mousePressed( MouseEvent e ) {
    }

    @Override
		public void mouseReleased( MouseEvent e ) {
    }

    @Override
		public void mouseEntered( MouseEvent e ) {
        e.getComponent().setCursor( cursor );
    }

    @Override
		public void mouseExited( MouseEvent e ) {
        e.getComponent().setCursor( exitCursor );
    }

    @Override
		public void mouseDragged( MouseEvent e ) {
    }

    @Override
		public void mouseMoved( MouseEvent e ) {
    }

}
