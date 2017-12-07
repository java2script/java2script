// Copyright 2002-2011, University of Colorado

/**
 * Class: BoxDoorGraphic
 * Package: edu.colorado.phet.idealgas.view
 * Author: Another Guy
 * Date: Sep 10, 2004
 */
package edu.colorado.phet.idealgas.view;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Component;
import java.awt.Cursor;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.event.MouseEvent;
import java.awt.geom.AffineTransform;
import java.awt.geom.Point2D;
import java.awt.image.BufferedImage;

import edu.colorado.phet.common.phetcommon.math.MathUtil;
import edu.colorado.phet.common.phetcommon.model.clock.ClockAdapter;
import edu.colorado.phet.common.phetcommon.model.clock.ClockEvent;
import edu.colorado.phet.common.phetcommon.util.SimpleObserver;
import edu.colorado.phet.common.phetgraphics.view.graphics.mousecontrols.translation.TranslationEvent;
import edu.colorado.phet.common.phetgraphics.view.graphics.mousecontrols.translation.TranslationListener;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.CompositePhetGraphic;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetGraphic;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetImageGraphic;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetShapeGraphic;
import edu.colorado.phet.idealgas.IdealGasConfig;
import edu.colorado.phet.idealgas.IdealGasResources;
import edu.colorado.phet.idealgas.controller.IdealGasModule;
import edu.colorado.phet.idealgas.model.Box2D;
import edu.colorado.phet.idealgas.model.PressureSensingBox;

public class BoxDoorGraphic extends CompositePhetGraphic
        implements SimpleObserver,
                   Box2D.ChangeListener,
                   PressureSensingBox.ChangeListener,
                   IdealGasModule.ResetListener {
    private int x;
    private int y;
    private int minX;
    private int minY;
    private int maxX;
    private int maxY;
    private PressureSensingBox box;
    private PhetImageGraphic imageGraphic;
    private PhetShapeGraphic highlightGraphic;
    private double openingMaxX;
    private Point2D.Double[] opening = { new Point2D.Double(), new Point2D.Double() };
    private PhetShapeGraphic doorShapeGraphic;
    // Used to control the rotation of the door when it blows off the box
    private double blowOffRotation = 0;
    private boolean isAnimating = false;

    /**
     * @param component
     * @param x
     * @param y
     * @param minX
     * @param minY
     * @param maxX
     * @param maxY
     * @param box
     * @param color
     */
    public BoxDoorGraphic( Component component,
                           int x, int y, int minX, int minY, int maxX, int maxY,
                           PressureSensingBox box, Color color, IdealGasModule module ) {
        super( component );
        myName = "BoxDoor";
        BufferedImage doorImg = null;
        doorImg = IdealGasResources.getImage( IdealGasConfig.DOOR_IMAGE_FILE );
        imageGraphic = new PhetImageGraphic( component, doorImg );
        addGraphic( imageGraphic );
        Rectangle bounds = imageGraphic.getBounds();
        Rectangle door = new Rectangle( bounds.width, 12 );
        doorShapeGraphic = new PhetShapeGraphic( component, door, color );
        addGraphic( doorShapeGraphic );

        highlightGraphic = new PhetShapeGraphic( component, new Rectangle( bounds ),
                                                 new BasicStroke( 1 ), Color.red );

        highlightGraphic.setVisible( false );
        addGraphic( highlightGraphic );
        
        this.x = x;
        this.y = y;
        this.minX = minX;
        this.minY = minY;
        this.maxX = maxX;
        this.maxY = maxY;
        this.box = box;
        this.openingMaxX = x + bounds.width;
        setLocations(0, 0); // BH necessary since not changing acceleration unnecessarily now

        box.addObserver( this );
        box.addChangeListener( this );
        box.addChangeListenerPSB( this );

        setCursor( Cursor.getPredefinedCursor( Cursor.E_RESIZE_CURSOR ) );
        addTranslationListener( new DoorTranslator() );

        // Listen for resets
        module.addResetListener( this );

        module.getClock().addClockListener( new ClockAdapter() {
            @Override
						public void clockTicked( ClockEvent clockEvent ) {
                stepAnimation();
            }
        } );
        
    }

    @Override
		public void fireMouseEntered( MouseEvent e ) {
        super.fireMouseEntered( e );
        highlightGraphic.setVisible( true );
        setBoundsDirty();
        repaint();
    }

    @Override
		public void fireMouseExited( MouseEvent e ) {
        super.fireMouseExited( e );
        highlightGraphic.setVisible( false );
        setBoundsDirty();
        repaint();
    }

	public void translateDoor(double dx, double dy) {
		double w = imageGraphic.getImage().getWidth();
		minX = (int) (box.getMinX() - w);
		// Update the position of the image on the screen
		x = (int) Math.min(maxX, Math.max(minX, x + dx));
		y = (int) Math.min(maxY, Math.max(minY, y + dy));
		imageGraphic
				.setLocation2(x, y - imageGraphic.getImage().getHeight());

		// Update the box's openinng
		setOpening(w);
		setBoundsDirty();
		repaint();
	}
	
    private Point2D.Double[] setOpening(double w) {
  		opening[0].x = x + w;
  		opening[1].x = openingMaxX;
  		opening[0].y = opening[1].y = box.getMinY();
  		return opening;

		// TODO Auto-generated method stub
		
	}

		@Override
		public void update() {
    	if (setLocations(0, 0)) {
            setBoundsDirty();
            repaint();
        }
    }
    
    

	public boolean setLocations(double x0, double y0) {
		if (minY == (int) box.getMinY() && minX == (int) box.getMinX())
			return false;
		translateDoor(x0, 0);
		minX = (int) box.getMinX();
		minY = (int) box.getMinY();
		maxY = (int) box.getMinY();
		// For some reason, -1 is needed here to line this up properly with the box
		int y = minY - imageGraphic.getImage().getHeight() - 1;
		imageGraphic.setLocation2(x, y);

		doorShapeGraphic.setLocation2(x, y + 13);
		highlightGraphic.setLocation(imageGraphic.getLocationNoCopy());
		return true;
	}

		@Override
		protected PhetGraphic getHandler( Point p ) {
        if ( isVisible() && imageGraphic.contains( p.x, p.y ) ) {
            return this;
        }
        else {
            return null;
        }
    }

    public void setColor( Color color ) {
        doorShapeGraphic.setPaint( color );
    }

    //----------------------------------------------------------------
    // Listener implementations
    //----------------------------------------------------------------

    /**
     * Box2D.ChangeListener implementation
     *
     * @param event
     */
    @Override
		public void boundsChanged( Box2D.ChangeEvent event ) {
        double newMinX = (int) ( box.getMinX() - imageGraphic.getBounds().getWidth() );
        if ( newMinX > minX ) {
            translateDoor( newMinX - minX, 0 );
        }
    }

    @Override
		public void isVolumeFixedChanged( Box2D.ChangeEvent event ) {
        //noop
    }

    /**
     * IdealGasModule.ResetListener implementation
     *
     * @param event
     */
    @Override
		public void resetOccurred( IdealGasModule.ResetEvent event ) {
        closeDoor();
    }

    private AffineTransform IDENTITY = new AffineTransform();

    // Moves the door to the "closed" position.
    public void closeDoor() {
        stopAnimation();
        setTransform(IDENTITY);
        setLocation2( 0, 0 );
        minX = -1;
        setLocations(Double.MAX_VALUE, 0); 
    }

    /*
     * PressureSensingBox.ChangeListener implementation
     * When the safe pressure is exceeded, start the animation of the lid blowing off.
     */
    @Override
		public void stateChanged( PressureSensingBox.ChangeEvent event ) {
        if ( !event.getPressureSensingBox().isPressureSafe() && !isAnimating ) {
            openBox();
            startAnimation();
        }
    }

    // Opens the top of the box
    private void openBox() {
        box.setOpening(setOpening(0));
    }

    // Starts animation of the lid blowing off.
    private void startAnimation() {
        isAnimating = true;
        blowOffRotation = 0;
    }

    private void stopAnimation() {
        isAnimating = false;
    }

    // Performs one step of the animation for the lid blowing off.
    private void stepAnimation() {
        if ( isAnimating ) {
            blowOffRotation -= 10;
            setTransform(MathUtil.setToRotation(null, Math.toRadians( blowOffRotation ),
                doorShapeGraphic.getLocationNoCopy().getX(),
                doorShapeGraphic.getLocationNoCopy().getY())); // BH Optimized out new
            setLocation2( (int) getLocationNoCopy().getX() - 1, (int) getLocationNoCopy().getY() - 8 );
        }
    }

    //----------------------------------------------------------------
    // Inner classes
    //----------------------------------------------------------------

    private class DoorTranslator implements TranslationListener {
        @Override
				public void translationOccurred( TranslationEvent event ) {
            translateDoor( event.getDx(), event.getDy() );
            box.setOpening( opening );
        }

        public DoorTranslator() {
            translate( 0, 0 );
        }
    }

}
