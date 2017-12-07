// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 54200 $
 * Date modified : $Date: 2011-07-18 19:45:40 -0500 (Mon, 18 Jul 2011) $
 */
package edu.colorado.phet.common.phetgraphics.view.graphics.mousecontrols.translation;

import java.awt.Point;
import java.awt.event.MouseEvent;

import javax.swing.event.MouseInputListener;

/**
 * TranslationHandler
 *
 * @author ?
 * @version $Revision: 54200 $
 */
public class TranslationHandler implements MouseInputListener {

    TranslationListener translationListener;
    private Point last;

    public TranslationHandler( TranslationListener translationListener ) {
        this.translationListener = translationListener;
    }

    @Override
		public void mouseDragged( MouseEvent event ) {
        if ( last == null ) {
            mousePressed( event );
            return;
        }
        Point modelLoc = event.getPoint();
        //Point dx = new Point( modelLoc.x - last.x, modelLoc.y - last.y );  // BH
        TranslationEvent trEvent = new TranslationEvent( this, event, event.getX(), event.getY(), 
        		modelLoc.x - last.x, modelLoc.y - last.y );
        translationListener.translationOccurred( trEvent );
        last = modelLoc;
    }

    @Override
		public void mouseMoved( MouseEvent e ) {
    }

    @Override
		public void mouseClicked( MouseEvent e ) {
    }

    @Override
		public void mousePressed( MouseEvent event ) {
        last = event.getPoint();
    }

    @Override
		public void mouseReleased( MouseEvent e ) {
    }

    @Override
		public void mouseEntered( MouseEvent e ) {
    }

    @Override
		public void mouseExited( MouseEvent e ) {
    }

    //////////////////////////////////////////////////////////
    // Persistence support
    //
    public TranslationHandler() {
    }

    public TranslationListener getTranslationListener() {
        return translationListener;
    }

    public void setTranslationListener( TranslationListener translationListener ) {
        this.translationListener = translationListener;
    }

    public Point getLast() {
        return last;
    }

    public void setLast( Point last ) {
        this.last = last;
    }
}
