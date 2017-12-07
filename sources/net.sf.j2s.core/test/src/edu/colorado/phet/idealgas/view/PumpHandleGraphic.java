// Copyright 2002-2011, University of Colorado

/**
 * Class: PumpHandleGraphic
 * Package: edu.colorado.phet.idealgas.graphics
 * Author: Another Guy
 * Date: Jan 14, 2004
 */
package edu.colorado.phet.idealgas.view;

import java.awt.Component;
import java.awt.Cursor;
import java.awt.Graphics2D;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.event.MouseEvent;

import edu.colorado.phet.common.phetgraphics.view.graphics.mousecontrols.translation.TranslationEvent;
import edu.colorado.phet.common.phetgraphics.view.graphics.mousecontrols.translation.TranslationListener;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.CompositePhetGraphic;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetGraphic;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetImageGraphic;
import edu.colorado.phet.idealgas.controller.IdealGasModule;

/**
 * The graphic for the pump handle and the shaft attached to it. Mouse
 * hits are only detected for points within the handle itself.
 */
public class PumpHandleGraphic extends CompositePhetGraphic {
    private IdealGasModule module;
    private PhetImageGraphic image;
    private int lastYPumped, lastYTracked; // BH Java fix #10
    private Rectangle hitRect = new Rectangle();
		//private int nMolecTotal;

    public PumpHandleGraphic( Component component, IdealGasModule module, final PhetImageGraphic image, int x, int y,
                              int minX, int minY,
                              int maxX, int maxY ) {
        super( component );
        this.module = module; // BH Java fix #9: should route actions through  module, not to pump directly
        this.image = image;
        resetPump();
        image.setLocation2( x, y );
        updateHitRect();
        this.setCursor( Cursor.getPredefinedCursor( Cursor.N_RESIZE_CURSOR ) );
        addTranslationListener( new PumpHandleTranslator( x, y, minX, minY, maxX, maxY ) );
    }

    private void resetPump() {
    	lastYPumped = lastYTracked = 1000000;
    }

		@Override
		public void paint( Graphics2D g ) {
        image.paint( g );
    }

    @Override
		public void fireMouseMoved( MouseEvent e ) { // BH Java fix #10: upward draw of pump could pump molecules 
      super.fireMouseMoved( e );
      resetPump();
    }


	@Override
	public void fireMouseDragged(MouseEvent e) {
		super.fireMouseDragged(e);

		// Determine if we should pump now. We do it if the mouse is moving down

		// int yNew = e.getY(); BH - should be just getY();
		int yNew = getY();

		// System.out.println("phg ynew = " + yNew + " " + lastYPumped + " " +
		// lastYTracked);

		if (yNew <= lastYPumped) { // BH Java fix #10 -- we were getting negative
																// numMolecules here in Java
			lastYPumped = yNew;
		} else if (yNew > lastYTracked + 1) { // BH gives just a bit more leeway
			int numMolecules = (yNew - lastYPumped) * 2; // BH more fun! (was / 2)
			module.pumpGasMolecules(numMolecules); // BH Java fix #9 do not call pump directly
			lastYPumped = yNew;
			// BH Java fix #9 -- moved to IdealGasModule
			// // If the simulation is paused, unpause it
			// IClock clock =
			// PhetApplication.getInstance().getActiveModule().getClock();
			// if( clock.isPaused()) {
			// //  clock.pause(); // BH Java fix #1
			// clock.start();
			// }
		}
		lastYTracked = yNew;
	}

    private void updateHitRect() {
        hitRect.x = image.getLocationNoCopy().x;
        hitRect.y = image.getLocationNoCopy().y;
        hitRect.width = image.getWidth();
        hitRect.height = 20;
    }

    @Override
		protected Rectangle determineBounds() {
        return image.getBounds();
    }

    @Override
		@SuppressWarnings("deprecation")
		protected PhetGraphic getHandler( Point p ) {
        if( getVisibilityFlag() && hitRect.inside( p.x, p.y ) ) { // BH inside, though deprecated is optimized
            return this;
        }
        else {
            return null;
        }
    }

    private class PumpHandleTranslator implements TranslationListener {
        private int x;
        private int y;
        private int minX;
        private int minY;
        private int maxX;
        private int maxY;

        public PumpHandleTranslator( int x, int y, int minX, int minY, int maxX, int maxY ) {
            this.x = x;
            this.y = y;
            this.minX = minX;
            this.minY = minY;
            this.maxX = maxX;
            this.maxY = maxY;
        }

        @Override
				public void translationOccurred( TranslationEvent translationEvent ) {
            double dx = translationEvent.getDx();
            double dy = translationEvent.getDy();
            x = (int)Math.min( maxX, Math.max( minX, x + dx ) );
            y = (int)Math.min( maxY, Math.max( minY, y + dy ) );
            image.setLocation2( x, y );
            PumpHandleGraphic.this.setLocation( image.getLocationNoCopy() );
            updateHitRect();
        }
    }
}
