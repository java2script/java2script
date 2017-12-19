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

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.geom.AffineTransform;

import edu.colorado.phet.common.phetcommon.model.clock.ClockEvent;
import edu.colorado.phet.common.phetcommon.model.clock.ClockListener;
import edu.colorado.phet.common.phetcommon.model.clock.IClock;
import edu.colorado.phet.common.phetgraphics.view.ApparatusPanel;

/**
 * RepaintDebugGraphic
 *
 * @author ?
 * @version $Revision:14674 $
 */
public class RepaintDebugGraphic extends PhetGraphic implements ClockListener {
    private int r = 255;
    private int g = 255;
    private int b = 255;
    private int alpha = 255;
    private ApparatusPanel panel;
    private IClock clock;
    private boolean active = false;

    public RepaintDebugGraphic( ApparatusPanel panel, IClock clock ) {
        this( panel, clock, 128 );
    }

    public RepaintDebugGraphic( ApparatusPanel panel, IClock clock, int transparency ) {
        super( panel );
        this.panel = panel;
        this.clock = clock;
        setActive( true );
        setIgnoreMouse( true );
        setTransparency( transparency );
    }

    public void setTransparency( int alpha ) {
        this.alpha = alpha;
    }

    @Override
		public void paint( Graphics2D g2 ) {
        if ( isVisible() ) {
            saveGraphicsState( g2 );
            updateGraphicsState( g2 );
            g2.setColor( new Color( r, g, b, alpha ) );
            g2.setTransform( new AffineTransform() );
            g2.fillRect( 0, 0, panel.getWidth(), panel.getHeight() );
            restoreGraphicsState();
        }
    }

    @Override
		public void clockTicked( ClockEvent event ) {
        r = ( r - 1 + 255 ) % 255;
        g = ( g - 2 + 255 ) % 255;
        b = ( b - 3 + 255 ) % 255;
    }

    @Override
		public void clockStarted( ClockEvent clockEvent ) {
    }

    @Override
		public void clockPaused( ClockEvent clockEvent ) {
    }

    @Override
		public void simulationTimeChanged( ClockEvent clockEvent ) {
    }

    @Override
		public void simulationTimeReset( ClockEvent clockEvent ) {
    }

    public void setActive( boolean active ) {

        if ( this.active == active ) {
            return;
        }
        this.active = active;
        if ( active ) {
            clock.addClockListener( this );
        }
        else {
            clock.removeClockListener( this );
        }

    }

    @Override
		protected Rectangle determineBounds() {
    	shapeRect.width  = panel.getWidth();
    	shapeRect.height = panel.getHeight();
    	return shapeRect;
    }

    public boolean isActive() {
        return active;
    }

    /**
     * Make it so that pressing SPACE while the apparatus panel has focus will enable a RepaintDebugGraphic.
     *
     * @param apparatusPanel
     * @param clock
     */
    public static void enable( final ApparatusPanel apparatusPanel, IClock clock ) {
        final RepaintDebugGraphic debugGraphic = new RepaintDebugGraphic( apparatusPanel, clock );
        apparatusPanel.addMouseListener( new MouseAdapter() {
            @Override
						public void mousePressed( MouseEvent e ) {
                apparatusPanel.requestFocus();
            }
        } );
        debugGraphic.setVisible( false );
        apparatusPanel.addKeyListener( new KeyListener() {
            @Override
						public void keyPressed( KeyEvent e ) {
                if ( e.getKeyCode() == KeyEvent.VK_SPACE ) {
                    boolean active = !debugGraphic.isActive();

                    debugGraphic.setActive( active );
                    debugGraphic.setVisible( active );
                    if ( active ) {
                        apparatusPanel.addGraphic( debugGraphic, Double.POSITIVE_INFINITY );
                    }
                    else {
                        apparatusPanel.removeGraphic( debugGraphic );
                    }
                    apparatusPanel.paintImmediately( 0, 0, apparatusPanel.getWidth(), apparatusPanel.getHeight() );
                }
            }

            @Override
						public void keyReleased( KeyEvent e ) {
            }

            @Override
						public void keyTyped( KeyEvent e ) {
            }
        } );
        debugGraphic.setActive( false );
        debugGraphic.setVisible( false );
    }
}
