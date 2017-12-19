// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 47772 $
 * Date modified : $Date: 2011-01-07 13:53:07 -0600 (Fri, 07 Jan 2011) $
 */
package edu.colorado.phet.idealgas.view;

import edu.colorado.phet.common.phetgraphics.view.graphics.mousecontrols.translation.TranslationEvent;
import edu.colorado.phet.common.phetgraphics.view.graphics.mousecontrols.translation.TranslationListener;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetShapeGraphic;
import edu.colorado.phet.idealgas.collision.Wall;
import edu.colorado.phet.idealgas.coreadditions.Translatable;

import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.geom.Rectangle2D;
import java.awt.geom.Rectangle2D.Double;

/**
 * WallGraphic
 *
 * @author Ron LeMaster
 * @version $Revision: 47772 $
 */
public class WallGraphic extends PhetShapeGraphic implements Wall.ChangeListener {
    public static final int ALL = 0, EAST_WEST = 1, NORTH_SOUTH = 2, NONE = -1;
    public static final Object NORTH = new Object();

    private Wall wall;
    private boolean isResizable = false;
    private boolean isResizingEast = false;
    private boolean isResizingWest = false;
    private boolean isResizingNorth = false;
    private boolean isResizingSouth = false;
    private double hotSpotRadius = 4;
    private int strokeWidth = 1;
//    private Paint normalBorderPaint;
//    private boolean isWallHighlightedByMouse;
//    private boolean isMovable;
    private boolean isResizableNorth = true;
    private boolean isResizableSouth = true;
    private boolean isResizableEast = true;
    private boolean isResizableWest = true;


    /**
     * @param wall
     * @param component
     * @param fill
     * @param borderPaint
     * @param translationDirection
     */
    public WallGraphic( Wall wall, Component component, Paint fill, Paint borderPaint,
                        int translationDirection ) {
        this( wall, component, fill, translationDirection );
        setStroke( new BasicStroke( strokeWidth ) );
        setBorderPaint( borderPaint );
//        normalBorderPaint = borderPaint;
    }

    /**
     * @param wall
     * @param component
     * @param fill
     * @param translationDirection
     */
    public WallGraphic( final Wall wall, Component component, Paint fill,
                        int translationDirection ) {
        super( component, wall.getBounds(), fill );
        this.wall = wall;
        wall.addChangeListener( this );

        // Add a listener for resize events
        addTranslationListener( new Resizer() );

        // Add mouseable behavior
        if( translationDirection == EAST_WEST ) {
            addTranslationListener( new EastWestTranslator( wall ) );
        }
        if( translationDirection == NORTH_SOUTH ) {
            addTranslationListener( new NorthSouthTranslator( wall ) );
        }
        if( translationDirection == ALL ) {
            addTranslationListener( new NorthSouthTranslator( wall ) );
            addTranslationListener( new EastWestTranslator( wall ) );
        }

        // Set the cursor when the wall is moused
        setCursorHand();

        // Add a listener that will detect if the user wants to resize the wall
        component.addMouseListener( new ResizingDetector( wall ) );
    }

    /**
     * Sets the wall to be resizable in a specified direction.
     *
     * @param isResizable
     */
    public void setIsResizable( boolean isResizable ) {
        this.isResizable = isResizable;
    }

//    private void setHighlightWall( boolean highlightWall ) {
//        if( highlightWall ) {
//            setBorderPaint( Color.red );
//        }
//        else {
//            setBorderPaint( normalBorderPaint );
//        }
//    }

    public void setWallHighlightedByMouse( boolean wallHighlightedByMouse ) {
//        isWallHighlightedByMouse = wallHighlightedByMouse;
    }

//    /**
//     * For debugging
//     *
//     * @param g2
//     */
//    public void paint( Graphics2D g2 ) {
//        saveGraphicsState( g2 );
//        paintType( g2 );
//        restoreGraphicsState();
//    }

    //----------------------------------------------------------------
    // Setters and getters
    //----------------------------------------------------------------
    public void setMovable( boolean movable ) {
//        isMovable = movable;
    }

    public void setResizableNorth( boolean resizableNorth ) {
        isResizableNorth = resizableNorth;
    }

    public void setResizableSouth( boolean resizableSouth ) {
        isResizableSouth = resizableSouth;
    }

    public void setResizableEast( boolean resizableEast ) {
        isResizableEast = resizableEast;
    }

    public void setResizableWest( boolean resizableWest ) {
        isResizableWest = resizableWest;
    }

    //-----------------------------------------------------------------
    // Event handling
    //-----------------------------------------------------------------
    boolean testFlag = false;

	@Override
	public void wallChanged(Wall.ChangeEvent event) {
		Rectangle2D.Double r = event.getWall().getBoundsNoCopy();
		setShape(new Rectangle((int) r.x, (int) r.y, (int) r.width, (int) r.height));
		testFlag = true;
		setBoundsDirtyOpt();
		repaint();
	}

    public void setIsMovable( boolean isMovable ) {
//        this.isMovable = isMovable;
    }

    //----------------------------------------------------------------
    // Translation listeners
    //----------------------------------------------------------------

    private class EastWestTranslator implements TranslationListener {
        private Translatable translatable;

        public EastWestTranslator( Translatable translatable ) {
            this.translatable = translatable;
        }

        @Override
				public void translationOccurred( TranslationEvent translationEvent ) {
            if( !( isResizingNorth || isResizingSouth || isResizingEast || isResizingWest ) ) {
                translatable.translate( translationEvent.getDx(), 0 );
            }
        }
    }

    private class NorthSouthTranslator implements TranslationListener {
        private Translatable translatable;

        public NorthSouthTranslator( Translatable translatable ) {
            this.translatable = translatable;
        }

        @Override
				public void translationOccurred( TranslationEvent translationEvent ) {
            if( !( isResizingNorth || isResizingSouth || isResizingEast || isResizingWest ) ) {
                translatable.translate( 0, translationEvent.getDy() );
            }
        }
    }

    /**
     * Resizes the wall
     */
    protected class Resizer implements TranslationListener {
        @Override
				public void translationOccurred( TranslationEvent translationEvent ) {
            if( isResizable /* && translationEvent.getMouseEvent().isControlDown()*/ ) {
            	  Double r = wall.getBoundsNoCopy();
                double minX = r.x;
                double maxX = r.x + r.width;
                double minY = r.y;
                double maxY = r.y + r.height;
                Point mouseLoc = translationEvent.getMouseEvent().getPoint();

                if( isResizingNorth ) {
                    minY = mouseLoc.y;
                }
                if( isResizingSouth ) {
                    maxY = mouseLoc.y;
                }
                if( isResizingWest ) {
                    minX = mouseLoc.x;
                }
                if( isResizingEast ) {
                    maxX = mouseLoc.x;
                }
                wall.setBounds( new Rectangle2D.Double( minX, minY, maxX - minX, maxY - minY ) );
            }
        }
    }

    /**
     * Detects that the user wishes to resize the wall.
     * <p/>
     * Sets the cursor and an internal flag
     */
    private class ResizingDetector extends MouseAdapter {
        private final Wall wall;

        public ResizingDetector( Wall wall ) {
            this.wall = wall;
        }

        @Override
				public void mousePressed( MouseEvent e ) {
            if( isResizable ) {
          	  Double r = wall.getBoundsNoCopy();
              double minX = r.x;
              double maxX = r.x + r.width;
              double minY = r.y;
              double maxY = r.y + r.height;
                Point mouseLoc = e.getPoint();

                if( Math.abs( mouseLoc.y - minY ) <= hotSpotRadius && isResizableNorth ) {
                    isResizingNorth = true;
                }
                else if( Math.abs( mouseLoc.y - maxY ) <= hotSpotRadius && isResizableSouth ) {
                    isResizingSouth = true;
                }
                else if( Math.abs( mouseLoc.x - minX ) <= hotSpotRadius && isResizableWest ) {
                    isResizingWest = true;
                }
                else if( Math.abs( mouseLoc.x - maxX ) <= hotSpotRadius && isResizableEast ) {
                    isResizingEast = true;
                }
            }
        }

        /**
         * Clear all resizing flags when the mouse is released, and reset the cursor
         *
         * @param e
         */
        @Override
				public void mouseReleased( MouseEvent e ) {
            isResizingEast = false;
            isResizingWest = false;
            isResizingNorth = false;
            isResizingSouth = false;
        }
    }
}
