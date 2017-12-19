// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author:samreid $
 * Revision : $Revision:14674 $
 * Date modified : $Date:2007-04-17 02:37:37 -0500 (Tue, 17 Apr 2007) $
 */
package edu.colorado.phet.common.phetgraphics.view.phetgraphics;

import java.awt.Component;
import java.awt.Graphics2D;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.Iterator;

import javax.swing.event.MouseInputListener;

import edu.colorado.phet.common.phetcommon.util.MultiMap;
import edu.colorado.phet.common.phetcommon.view.util.RectangleUtils;

/**
 * GraphicLayerSet is a collection of PhetGraphics (referred to as "children").
 * Children are painted in the order that they are added.
 * Mouse events received by a GraphicLayer are forwarded to all children.
 *
 * @author ?
 * @version $Revision:14674 $
 */
public class GraphicLayerSet extends PhetGraphic {

	// BH optimized to minimize the use of MultiMap.iterator
	
  //private int grx = 30;

	protected String myName;

    private MultiMap graphicMap = new MultiMap();
    private PhetGraphic activeUnit;//The unit being dragged or moused-over.
    private PhetGraphic keyFocusUnit;//The unit that should accept key events.
    private SwingAdapter swingAdapter = new SwingAdapter();
    private KeyListener keyAdapter = new KeyAdapter();

		private PhetGraphic[] myGraphics;

		public static Hashtable<Object, Object> graphicSourcesBH = new Hashtable<Object, Object>();
    private static int mouseEventID = 0;//For creating mouse events.

    /**
     * Provided for JavaBeans conformance
     */
    public GraphicLayerSet() {
        this(null);
    }

    public GraphicLayerSet( Component component ) {
        super( component );
        type = TYPE_GRAPHIC_LAYER_SET;
    }

    /**
     * Sets the component for this object and all its children
     *
     * @param component
     */
    @Override
		public void setComponent( Component component ) {
        super.setComponent( component );
  			PhetGraphic[] graphics = getGraphics();
  			for (int i = graphics.length; --i >= 0;)
  				graphics[i].setComponent( component );
    }

	/**
	 * Paints all PhetGraphics in order on the Graphics2D device
	 * 
	 * @param g2
	 *          the Graphics2D on which to paint.
	 */
	@Override
	public void paint(Graphics2D g2) {
		if (isVisible()) {
			saveGraphicsState(g2);
			updateGraphicsState(g2);
			PhetGraphic[] graphics = getGraphics();
			// BH this one must go forward; others do not matter generally
      for (int i = 0, n = graphics.length; i < n; i++)
      	graphics[i].paint( g2 );
			restoreGraphicsState();
		}
	}

    /**
     * This is the MouseListener that should be added to Components for listening.
     *
     * @return the SwingAdapter to listen to Components.
     */
    public SwingAdapter getMouseHandler() {
        return swingAdapter;
    }

    /**
     * Used to see if the mouse is in one of our child graphics
     *
     * @param x
     * @param y
     * @return true if any child graphics contain the specified point.
     */
    @Override
		public boolean contains( int x, int y ) {
        if ( isVisible() ) {
      		PhetGraphic[] graphics = getGraphics();
    			// BH this one must go forward; others do not matter generally
          for (int i = 0, n = graphics.length; i < n; i++)
                if ( graphics[i].contains( x, y ) ) 
                    return true;
        }
        return false;
    }

    /**
     * Used to see if the mouse is in one of our child graphics
     *
     * @param p the point
     * @return true or false
     */
    public boolean contains( Point p ) {
        return contains( p.x, p.y );
    }

	/**
	 * Determines the union of child graphics bounds.
	 * 
	 * @return the union of child graphics bounds.
	 */
	@Override
	protected Rectangle determineBounds() {
		PhetGraphic[] ch = getGraphics();
		if (ch.length == 0)
			return null;
		shapeRect.x = Integer.MAX_VALUE;
		for (int i = 0; i < ch.length; i++)
			RectangleUtils.unionAdd(ch[i].getBounds(), shapeRect);
		return shapeRect;
	}

	/**
	 * Remove all graphics from this GraphicLayerSet.
	 */
	public void clear() {
		PhetGraphic[] graphics = getGraphics();
		for (int i = graphics.length; --i >= 0;) {
			// Do everything that removeGraphic method does.
			PhetGraphic graphic = graphics[i];
			graphic.setParent(null);
			setBoundsDirty();
			graphic.autorepaint();// Automatically repaint.
		}
		graphicMap.clear();
		myGraphics = new PhetGraphic[0];
	}

    /**
     * Remove a particular PhetGraphic from this composite.
     *
     * @param graphic the graphic to remove.
     */
    public void removeGraphic( PhetGraphic graphic ) {
        if ( containsGraphic( graphic ) ) {
        		myGraphics = null;
            graphicMap.removeValue( graphic );
            graphic.setParent( null );
            setBoundsDirty();
            graphic.autorepaint();//Automatically repaint.
        }
    }

    @Override
		public void setBoundsDirty() {
        setBoundsDirtyOpt();
  			PhetGraphic[] graphics = getGraphics();
  			for (int i = graphics.length; --i >= 0;)
  				graphics[i].setBoundsDirty();
    }

    /**
     * Ensure that all children will repaint in their respective rectangles.
     */
    @Override
		protected void forceRepaint() {
        syncBounds();//This guarantees a notification, if necessary.
    		PhetGraphic[] graphics = getGraphics();
    		for (int i = graphics.length; --i >= 0;)
    			graphics[i].forceRepaint();
    }

    /**
     * Add the specified graphic to the default (0th) layer.
     *
     * @param graphic the graphic to add.
     */
    public void addGraphic( PhetGraphic graphic ) {
        addGraphic( graphic, 0 );
        graphic.setParent( this );
    }

	/**
	 * Returns graphics from a forward iterator.
	 * 
	 * 
	 * @return the array of graphics in painting order.
	 */

	public PhetGraphic[] getGraphics() {
		if (myGraphics != null)
			return myGraphics; // BH optimized out iterator
		Iterator<?> it = graphicMap.iterator();
		ArrayList<PhetGraphic> graphics = new ArrayList<PhetGraphic>();
		while (it.hasNext()) {
			PhetGraphic graphic = (PhetGraphic) it.next();
			graphics.add(graphic);
		}
		return myGraphics = graphics.toArray(new PhetGraphic[0]);
	}

    /**
     * Add the specified graphic to the specified layer.
     *
     * @param graphic
     * @param layer
     */
    public void addGraphic( PhetGraphic graphic, double layer ) {
    		myGraphics = null;
        graphicMap.put( new Double( layer ), graphic );
        graphic.setParent( this );
        setBoundsDirtyOpt();
        graphic.setBoundsDirty();
        graphic.autorepaint();//Automatically repaint the added graphic.
    }

    /**
     * Moves a graphic to the top layer of the set
     *
     * @param target
     */
    public void moveToTop( PhetGraphic target ) {
    		myGraphics = null;
        this.removeGraphic( target );
        graphicMap.put( graphicMap.lastKey(), target );
    }

    /**
     * A forward iterator over the PhetGraphics.
     *
     * @return the PhetGraphic iterator.
     */
    protected Iterator<?> iterator() {
        return this.graphicMap.iterator();
    }

    /**
     * Returns the number of graphics in the GraphicLayerSet
     *
     * @return
     */
    public int getNumGraphics() {
        return graphicMap.size();
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Setters and getters for persistence
    //
    public void setGraphicMap( MultiMap graphicMap ) {
    		myGraphics = null;
        this.graphicMap = graphicMap;
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Methods for MouseInteraction.
    //
    public void startDragging( MouseEvent event, PhetGraphic activeUnit ) {
        if ( this.activeUnit != null ) {
            this.activeUnit.fireMouseExited( event );
        }
        this.activeUnit = activeUnit;
        activeUnit.fireMouseEntered( event );
        activeUnit.fireMousePressed( event );
        activeUnit.fireMouseDragged( event );
    }

    //experimental
    public void clearActiveUnit() {
        if ( this.activeUnit != null ) {
            activeUnit.fireMouseReleased( new MouseEvent( getComponent(), mouseEventID++, System.currentTimeMillis(), 0, 0, 0, 0, false ) );
            activeUnit.fireMouseExited( new MouseEvent( getComponent(), mouseEventID++, System.currentTimeMillis(), 0, 0, 0, 0, false ) );
        }
    }

    /**
     * Determine the active unit, based on the mouse event, firing enter and exit events if necessary.
     *
     * @param e
     */
    protected void handleEntranceAndExit( MouseEvent e ) {
        // Find the topmost graphic that can handle the event
        PhetGraphic newUnit = getHandler( e.getPoint() );
//        System.out.println( "newUnit = " + newUnit );
        if ( newUnit == null ) {
            // If the mouse isn't over anything contained in the
            // CompositeGraphic...
            if ( activeUnit != null ) {
                activeUnit.fireMouseExited( e );
                activeUnit = null;
            }
        }
        else {//newUnit was non-null.
            if ( activeUnit == newUnit ) {
                //same guy
            }
            else if ( activeUnit == null ) {
                //Fire a mouse entered, set the active newUnit.
                activeUnit = newUnit;
                activeUnit.fireMouseEntered( e );
            }
            else if ( activeUnit != newUnit ) {
                //Switch active units.
                activeUnit.fireMouseExited( e );
                activeUnit = newUnit;
                activeUnit.fireMouseEntered( e );
            }
        }
        //        System.out.println( "activeUnit = " + activeUnit );
    }

    /**
     * Determine the PhetGraphic suited for handling a click at the specified point.
     * If no such graphic is identified and this GraphicLayerSet is interested in
     * mouse events, then this GraphicLayerSet is returned.
     *
     * @param p the mouse point.
     * @return the handler.
     */
    protected PhetGraphic getHandler( Point p ) {

        // If the GraphicLayerSet is ignoring the mouse, then don't check any children.
        if ( getIgnoreMouse() == true ) {
            return null;
        }

        PhetGraphic[] graphics = getGraphics();
        PhetGraphic result = null;

        // For each graphic, working from foreground to background layer...
        for ( int i = graphics.length; result == null && --i >= 0; ) {
            PhetGraphic g = graphics[i];

            // XMLEncoder/Decoder serialization puts nulls in the map, for some reason.
            if ( g != null ) {
                if ( g.isVisible() && !g.getIgnoreMouse() ) {
                    if ( g.type == TYPE_GRAPHIC_LAYER_SET ) {
                        // Ask the GraphicLayerSet for the graphic.
                        result = ( (GraphicLayerSet) g ).getHandler( p );
                    }
                    else if ( g.contains( p.x, p.y ) ) {
                        // We picked this graphic.
                        result = g;
                    }
                }
            }
        }

        // We picked a graphic with no mouse listener, 
        // and this GraphicLayerSet does have a mouse listener.
        // So let the GraphicLayerSet handle the event.
        if ( result != null && result.numMouseInputListeners() == 0 &&
             isVisible() && numMouseInputListeners() != 0 && this.contains( p ) ) {
            result = this;
        }

        return result;
    }

    public KeyListener getKeyAdapter() {
        return keyAdapter;
    }

    public void setKeyFocus( PhetGraphic focus ) {
        if ( keyFocusUnit != focus ) {
            if ( keyFocusUnit != null ) {
                keyFocusUnit.lostKeyFocus();
            }

            this.keyFocusUnit = focus;
            //Fire a focus change.
            if ( keyFocusUnit != null ) {
                keyFocusUnit.gainedKeyFocus();
            }
        }

    }

    public void childBecameInvisible( PhetGraphic phetGraphic ) {
        if ( keyFocusUnit == phetGraphic ) {
            setKeyFocus( null );
        }
        if ( activeUnit == phetGraphic ) {
            MouseEvent mouseEvent = new MouseEvent( getComponent(), mouseEventID++, System.currentTimeMillis(), 0, 0, 0, 0, false );
            activeUnit.fireMouseExitedBecauseInvisible( mouseEvent );
            activeUnit = null;
        }
    }

//    public MultiMap getGraphicMap() {
//        return graphicMap; // BH do not allow this -- use getGraphics()
//    }

    //////////////////////////////////////////////////////////////
    // Inner classes
    //
    public class KeyAdapter implements KeyListener {
        //TODO this should probably include code to have a separate key-focused handler.
        @Override
				public void keyTyped( KeyEvent e ) {
            if ( keyFocusUnit != null ) {
                keyFocusUnit.fireKeyTyped( e );
            }
        }

        @Override
				public void keyPressed( KeyEvent e ) {
            if ( keyFocusUnit != null ) {
                keyFocusUnit.fireKeyPressed( e );
            }
        }

        @Override
				public void keyReleased( KeyEvent e ) {
            if ( keyFocusUnit != null ) {
                keyFocusUnit.fireKeyReleased( e );
            }
        }
    }


    /**
     * This class is used on a Swing component or AWT component to forward events to
     * the PhetGraphic subsystem.
     */
    public class SwingAdapter implements MouseInputListener {
        private boolean pressed = false;

        @Override
				public void mouseClicked( MouseEvent e ) {
            //Make sure we're over the active guy.
            handleEntranceAndExit( e );
            if ( activeUnit != null ) {
                activeUnit.fireMouseClicked( e );
            }
            setKeyFocus( activeUnit );
            pressed = false;
        }


        @Override
				public void mousePressed( MouseEvent e ) {
            handleEntranceAndExit( e );
            if ( activeUnit != null ) {
                activeUnit.fireMousePressed( e );
            }
            setKeyFocus( activeUnit );
            pressed = true;
        }

        /**
         * When the user releases the mouse, the following happens:
         * 1. The active unit gets a mouse release event.
         * 2. If the mouse has left the active unit:
         * a. A mouse exited event is fired on the active unit.
         * b. We check to see if the mouse is over a different interactive graphic.  If so:
         * ii. Fire a mouse Entered on the new unit.
         * 3.
         *
         * @param e
         */
        @Override
				public void mouseReleased( MouseEvent e ) {
            if ( activeUnit != null ) {
                activeUnit.fireMouseReleased( e );
                handleEntranceAndExit( e );
            }
            pressed = false;
        }

        /**
         * This method is no-op because if the user is dragging a graphic,
         * and handleEntranceAndExit() gets
         * called, the boundary may be dropped.
         *
         * @param e
         */
        @Override
				public void mouseEntered( MouseEvent e ) {
            if ( !pressed && activeUnit == null ) {
                handleEntranceAndExit( e );
            }
        }

        /**
         * This method is no-op because if the user is dragging a graphic,
         * and handleEntranceAndExit() gets
         * called, the boundary may be dropped.
         *
         * @param e
         */
        @Override
				public void mouseExited( MouseEvent e ) {
            if ( !pressed && activeUnit != null ) {
                activeUnit.fireMouseExited( e );
                activeUnit = null;
//                handleEntranceAndExit( e );
            }
        }

        @Override
				public void mouseDragged( MouseEvent e ) {
            if ( activeUnit != null ) {
                activeUnit.fireMouseDragged( e );
            }
            pressed = true;
        }

        @Override
				public void mouseMoved( MouseEvent e ) {
            //iterate down over the mouse handlers.
            handleEntranceAndExit( e );
            if ( activeUnit != null ) {
                activeUnit.fireMouseMoved( e );
            }
            pressed = false;
        }
    }

    public boolean containsGraphic( PhetGraphic graphic ) {
        return graphicMap.containsValue( graphic );
    }

    public PhetGraphic getActiveUnit() {
        return activeUnit;
    }
    
    @Override
		public Rectangle getVisibleBounds() {
  		PhetGraphic[] ch = getGraphics();
  		if (ch.length == 0)
  			return null;
  		tempRect.x = Integer.MAX_VALUE;
  		for (int i = 0; i < ch.length; i++)
  			RectangleUtils.unionAdd(ch[i].getVisibleBounds(), tempRect);
  		return tempRect;
    }

    /*
    * When a GraphicLayerSet's visibility changes, we need to also
    * notify all of its children's listeners.
    */
    @Override
		protected void fireVisibilityChanged() {
        super.fireVisibilityChanged();
    		PhetGraphic[] graphics = getGraphics();
    		for (int i = graphics.length; --i >= 0;)
    			graphics[i].fireVisibilityChanged();
    }
}
