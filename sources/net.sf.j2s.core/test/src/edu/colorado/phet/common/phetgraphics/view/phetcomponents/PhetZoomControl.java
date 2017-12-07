// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetgraphics.view.phetcomponents;

import java.awt.Component;
import java.awt.Cursor;
import java.awt.Point;
import java.awt.event.MouseEvent;
import java.util.EventObject;

import javax.swing.JFrame;
import javax.swing.event.EventListenerList;
import javax.swing.event.MouseInputAdapter;

import edu.colorado.phet.common.phetgraphics.view.ApparatusPanel;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.GraphicLayerSet;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetImageGraphic;


/**
 * PhetZoomControl is a control for horizontal or vertical zooming.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class PhetZoomControl extends GraphicLayerSet {

    //----------------------------------------------------------------------------
    // Public class data
    //----------------------------------------------------------------------------

    public static final int HORIZONTAL = 0;
    public static final int VERTICAL = 1;

    //----------------------------------------------------------------------------
    // Private class data
    //----------------------------------------------------------------------------

    private static final Point IN_LOCATION = new Point( 31, 13 );
    private static final Point OUT_LOCATION = new Point( 3, 13 );

    private static final String IMAGES_DIRECTORY = "images/zoom/";
    private static final String ZOOM_BACKGROUND_HORIZONTAL_IMAGE = IMAGES_DIRECTORY + "zoomBackgroundHorizontal.png";
    private static final String ZOOM_BACKGROUND_VERTICAL_IMAGE = IMAGES_DIRECTORY + "zoomBackgroundVertical.png";
    private static final String ZOOM_IN_BUTTON_IMAGE = IMAGES_DIRECTORY + "zoomInButton.png";
    private static final String ZOOM_IN_BUTTON_PRESSED_IMAGE = IMAGES_DIRECTORY + "zoomInButtonPressed.png";
    private static final String ZOOM_OUT_BUTTON_IMAGE = IMAGES_DIRECTORY + "zoomOutButton.png";
    private static final String ZOOM_OUT_BUTTON_PRESSED_IMAGE = IMAGES_DIRECTORY + "zoomOutButtonPressed.png";

    private static final Cursor WAIT_CURSOR = Cursor.getPredefinedCursor( Cursor.WAIT_CURSOR );

    //----------------------------------------------------------------------------
    // Instance data
    //----------------------------------------------------------------------------

    private int _orientation;
    private PhetImageGraphic _inButton, _inButtonPressed;
    private PhetImageGraphic _outButton, _outButtonPressed;
    private EventListenerList _listenerList;

    //----------------------------------------------------------------------------
    // Constructors
    //----------------------------------------------------------------------------

    /**
     * Constructor.
     *
     * @param component
     * @param orientation HORIZONTAL or VERTICAL
     */
    public PhetZoomControl( Component component, int orientation ) {
        super( component );

        _orientation = orientation;

        PhetImageGraphic background;
        if ( orientation == HORIZONTAL ) {
            background = new PhetImageGraphic( component, ZOOM_BACKGROUND_HORIZONTAL_IMAGE );
        }
        else {
            background = new PhetImageGraphic( component, ZOOM_BACKGROUND_VERTICAL_IMAGE );
        }
        addGraphic( background );

        _inButton = new PhetImageGraphic( component, ZOOM_IN_BUTTON_IMAGE );
        _inButtonPressed = new PhetImageGraphic( component, ZOOM_IN_BUTTON_PRESSED_IMAGE );
        _inButton.setLocation( IN_LOCATION );
        _inButtonPressed.setLocation( IN_LOCATION );
        addGraphic( _inButton );
        addGraphic( _inButtonPressed );

        _outButton = new PhetImageGraphic( component, ZOOM_OUT_BUTTON_IMAGE );
        _outButtonPressed = new PhetImageGraphic( component, ZOOM_OUT_BUTTON_PRESSED_IMAGE );
        _outButton.setLocation( OUT_LOCATION );
        _outButtonPressed.setLocation( OUT_LOCATION );
        addGraphic( _outButton );
        addGraphic( _outButtonPressed );

        // Interactivity
        {
            background.setIgnoreMouse( true );

            _inButton.setCursorHand();
            _inButtonPressed.setCursorHand();
            _outButton.setCursorHand();
            _outButtonPressed.setCursorHand();

            EventListener listener = new EventListener();
            _inButton.addMouseInputListener( listener );
            _inButtonPressed.addMouseInputListener( listener );
            _outButton.addMouseInputListener( listener );
            _outButtonPressed.addMouseInputListener( listener );
        }

        // Initial visibility
        _inButtonPressed.setVisible( false );
        _outButtonPressed.setVisible( false );

        _listenerList = new EventListenerList();
    }

    //----------------------------------------------------------------------------
    // Accessors
    //----------------------------------------------------------------------------

    public void setZoomInEnabled( boolean enabled ) {
        _inButton.setVisible( enabled );
    }

    public void setZoomOutEnabled( boolean enabled ) {
        _outButton.setVisible( enabled );
    }

    //----------------------------------------------------------------------------
    // Inner classes
    //----------------------------------------------------------------------------

    /**
     * ZoomEvent indicates that a zoom action has occurred.
     *
     * @author Chris Malley (cmalley@pixelzoom.com)
     * @version $Revision: 13546 $
     */
    public class ZoomEvent extends EventObject {

        //----------------------------------------------------------------------------
        // Class<?> data
        //----------------------------------------------------------------------------

        // The zoom types
        public static final int VERTICAL_ZOOM_IN = 0;
        public static final int VERTICAL_ZOOM_OUT = 1;
        public static final int HORIZONTAL_ZOOM_IN = 2;
        public static final int HORIZONTAL_ZOOM_OUT = 3;

        //----------------------------------------------------------------------------
        // Instance data
        //----------------------------------------------------------------------------

        private int _zoomType;

        //----------------------------------------------------------------------------
        // Constructors
        //----------------------------------------------------------------------------

        /**
         * Sole constructor.
         *
         * @param source
         * @param zoomType
         */
        public ZoomEvent( Object source, int zoomType ) {
            super( source );
            assert ( isValidZoomType( zoomType ) );
            _zoomType = zoomType;
        }

        //----------------------------------------------------------------------------
        // Accessors
        //----------------------------------------------------------------------------

        /**
         * Gets the zoom type associated with the event.
         *
         * @return the zoom type
         */
        public int getZoomType() {
            return _zoomType;
        }

        /**
         * Validates a zoom type.
         *
         * @param zoomType
         * @return true or false
         */
        public boolean isValidZoomType( int zoomType ) {
            return ( zoomType == VERTICAL_ZOOM_IN ||
                     zoomType == VERTICAL_ZOOM_OUT ||
                     zoomType == HORIZONTAL_ZOOM_IN ||
                     zoomType == HORIZONTAL_ZOOM_OUT );
        }
    }

    //----------------------------------------------------------------------------
    // Event handling
    //----------------------------------------------------------------------------

    /**
     * ZoomListener is the listener interface for zoom events.
     *
     * @author Chris Malley (cmalley@pixelzoom.com)
     * @version $Revision: 13546 $
     */
    public interface ZoomListener extends java.util.EventListener {

        /**
         * Invoked when a zoom occurs.
         *
         * @param event
         */
        public void zoomPerformed( ZoomEvent event );
    }

    public void addZoomListener( ZoomListener listener ) {
        _listenerList.add( ZoomListener.class, listener );
    }

    public void removeZoomListener( ZoomListener listener ) {
        _listenerList.remove( ZoomListener.class, listener );
    }

    public void removeAllZoomListeners() {
        Object[] listeners = _listenerList.getListenerList();
        for ( int i = 0; i < listeners.length; i += 2 ) {
            if ( listeners[i] == ZoomListener.class ) {
                _listenerList.remove( ZoomListener.class, (ZoomListener) listeners[i + 1] );
            }
        }
    }

    private void fireZoomEvent( int zoomType ) {
        ZoomEvent event = new ZoomEvent( this, zoomType );
        Object[] listeners = _listenerList.getListenerList();
        for ( int i = 0; i < listeners.length; i += 2 ) {
            if ( listeners[i] == ZoomListener.class ) {
                ( (ZoomListener) listeners[i + 1] ).zoomPerformed( event );
            }
        }
    }

    private class EventListener extends MouseInputAdapter {

        private boolean _inPressed, _outPressed;

        public EventListener() {
            super();
        }

        @Override
				public void mousePressed( MouseEvent event ) {
            if ( _inButton.getBounds().contains( event.getPoint() ) ) {
                if ( !_inButtonPressed.isVisible() ) {
                    _inButtonPressed.setVisible( true );
                    _inPressed = true;
                }
            }
            else if ( _outButton.getBounds().contains( event.getPoint() ) ) {
                if ( !_outButtonPressed.isVisible() ) {
                    _outButtonPressed.setVisible( true );
                    _outPressed = true;
                }
            }
        }

        @Override
				public void mouseReleased( MouseEvent event ) {
            if ( _inPressed ) {
                _inButtonPressed.setVisible( false );
                _inPressed = false;
                if ( _inButtonPressed.getBounds().contains( event.getPoint() ) ) {
                    // Set the wait cursor
                    Cursor saveCursor = getComponent().getCursor();
                    getComponent().setCursor( WAIT_CURSOR );
                    // Handle the event
                    if ( _orientation == HORIZONTAL ) {
                        fireZoomEvent( ZoomEvent.HORIZONTAL_ZOOM_IN );
                    }
                    else {
                        fireZoomEvent( ZoomEvent.VERTICAL_ZOOM_IN );
                    }
                    // Restore the cursor
                    getComponent().setCursor( saveCursor );
                }
            }
            else if ( _outPressed ) {
                _outButtonPressed.setVisible( false );
                _outPressed = false;
                if ( _outButtonPressed.getBounds().contains( event.getPoint() ) ) {
                    // Set the wait cursor
                    Cursor saveCursor = getComponent().getCursor();
                    getComponent().setCursor( WAIT_CURSOR );
                    // Handle the event
                    if ( _orientation == HORIZONTAL ) {
                        fireZoomEvent( ZoomEvent.HORIZONTAL_ZOOM_OUT );
                    }
                    else {
                        fireZoomEvent( ZoomEvent.VERTICAL_ZOOM_OUT );
                    }
                    // Restore the cursor
                    getComponent().setCursor( saveCursor );
                }
            }
        }
    }

    //----------------------------------------------------------------------------
    // Test
    //----------------------------------------------------------------------------

    public static void main( String[] args ) {
        ApparatusPanel ap = new ApparatusPanel();
        PhetZoomControl zc = new PhetZoomControl( ap, HORIZONTAL );
        zc.setLocation2( 200, 300 );
        PhetZoomControl zc2 = new PhetZoomControl( ap, VERTICAL );
        zc2.setLocation2( 300, 300 );
        ap.addGraphic( zc );
        ap.addGraphic( zc2 );
        JFrame frame = new JFrame();
        frame.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE );
        frame.setContentPane( ap );
        frame.setSize( 800, 600 );
        frame.setVisible( true );
    }

}
