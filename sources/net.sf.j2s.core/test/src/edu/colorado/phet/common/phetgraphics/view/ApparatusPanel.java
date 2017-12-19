// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 54200 $
 * Date modified : $Date: 2011-07-18 19:45:40 -0500 (Mon, 18 Jul 2011) $
 */
package edu.colorado.phet.common.phetgraphics.view;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;
import java.util.ArrayList;

import javax.swing.JPanel;
import javax.swing.event.MouseInputListener;

import edu.colorado.phet.common.phetcommon.model.clock.IClock;
import edu.colorado.phet.common.phetcommon.view.util.RectangleUtils;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.GraphicLayerSet;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetGraphic;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.RepaintDebugGraphic;
import edu.colorado.phet.common.phetgraphics.view.util.GraphicsSetup;
import edu.colorado.phet.common.phetgraphics.view.util.GraphicsState;

/**
 * This is a base class for panels that contain graphic representations
 * of elements in the PhysicalSystem.
 * <p/>
 * The graphic objects to be displayed are maintained in "layers". Each layer can
 * contain any number of Graphic objects, and each layer has an integer "level"
 * associated with it. Layers are drawn in ascending order of their levels. The order
 * in which objects in a given level are drawn is undefined.
 * Test Comment.
 * <p/>
 *
 * @author Ron LeMaster
 * @version $Revision: 54200 $
 * @see edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetGraphic
 */
public class ApparatusPanel extends JPanel {

    //
    // Statics
    //
    public static final double LAYER_TOP = Double.POSITIVE_INFINITY;
    public static final double LAYER_BOTTOM = Double.NEGATIVE_INFINITY;
    public static final double LAYER_DEFAULT = 0;


    //
    // Instance fields and methods
    //
    private BasicStroke borderStroke = new BasicStroke( 1, BasicStroke.CAP_ROUND, BasicStroke.JOIN_ROUND );
    private GraphicLayerSet graphic;

    private ArrayList<GraphicsSetup> graphicsSetups = new ArrayList<GraphicsSetup>();
    private boolean displayBorder = true;

    protected ApparatusPanel( Object obj ) {
        super( null );
        setGraphic( new GraphicLayerSet( this ) );
    }

    public ApparatusPanel() {
        // Call superclass constructor with null so that we don't get the default layout manager. This allows us
        // to lay out components with absolute coordinates
        super( null );
        setGraphic( new GraphicLayerSet( this ) );
        setMouseAndKeyListeners( getGraphic().getMouseHandler(), getGraphic().getKeyAdapter() );
    }

	/**
	 * Sets the GraphicLayerSet for the ApparatusPanel, and attaches its listeners
	 * to the panel, after getting rid of the old ones. Also tells all the
	 * PhetGraphics in the new GraphicLayerSet that their containing component is
	 * this AppratusPanel.
	 * 
	 * @param newGraphic
	 */
	public void setGraphic(GraphicLayerSet newGraphic) {

		this.graphic = newGraphic;

		// Hook up all the graphics to the apparatus panel
		graphic.setComponent(this);
		PhetGraphic[] graphics = graphic.getGraphics();
		for (int i = graphics.length; --i >= 0;)
			graphics[i].setComponent(this);
	}

    /**
     * Sets up mouse and key listeners
     */
    protected void setMouseAndKeyListeners( MouseInputListener mouseHandler, KeyListener keyAdapter ) {
        // Clear the old handlers
        MouseListener[] mouseListeners = this.getMouseListeners();
        for ( int i = 0; i < mouseListeners.length; i++ ) {
            MouseListener mouseListener = mouseListeners[i];
            this.removeMouseListener( mouseListener );
        }
        MouseMotionListener[] mouseMostionListeners = this.getMouseMotionListeners();
        for ( int i = 0; i < mouseMostionListeners.length; i++ ) {
            MouseMotionListener mouseMostionListener = mouseMostionListeners[i];
            this.removeMouseMotionListener( mouseMostionListener );
        }
        KeyListener[] keyListeners = this.getKeyListeners();
        for ( int i = 0; i < keyListeners.length; i++ ) {
            KeyListener keyListener = keyListeners[i];
            this.removeKeyListener( keyListener );
        }

        // Add the new handlers
        this.addMouseListener( mouseHandler );
        this.addMouseMotionListener( getGraphic().getMouseHandler() );
        this.addKeyListener( keyAdapter );
    }

    protected void setHandlers( GraphicLayerSet.SwingAdapter mouseHandler, KeyListener keyAdapter ) {
        this.addMouseListener( mouseHandler );
        this.addMouseMotionListener( getGraphic().getMouseHandler() );
        this.addKeyListener( keyAdapter );
    }

    public void addGraphicsSetup( GraphicsSetup setup ) {
        graphicsSetups.add( setup );
    }

    public void addRepaintDebugGraphic( IClock clock ) {

        final RepaintDebugGraphic rdg = new RepaintDebugGraphic( this, clock );
        addGraphic( rdg, Double.POSITIVE_INFINITY );

        rdg.setActive( false );
        rdg.setVisible( false );
        addMouseListener( new MouseAdapter() {
            @Override
						public void mousePressed( MouseEvent e ) {
                requestFocus();
            }
        } );
        addKeyListener( new KeyListener() {
            @Override
						public void keyPressed( KeyEvent e ) {
                if ( e.getKeyCode() == KeyEvent.VK_P ) {
                    rdg.setActive( !rdg.isActive() );
                    rdg.setVisible( rdg.isActive() );
                }
            }

            @Override
						public void keyReleased( KeyEvent e ) {
            }

            @Override
						public void keyTyped( KeyEvent e ) {
            }
        } );
        requestFocus();
    }

    /**
     * Clears objects in the graphical context that are experiment-specific
     */
    public void removeAllGraphics() {
        graphic.clear();
    }

    protected void superPaint( Graphics g ) {
        super.paintComponent( g );
    }

    protected ArrayList<GraphicsSetup> getGraphicsSetups() {
        return graphicsSetups;
    }

    protected void setup( Graphics2D g2 ) {
        for ( int i = 0; i < graphicsSetups.size(); i++ ) {
            GraphicsSetup graphicsSetup = graphicsSetups.get( i );
            graphicsSetup.setup( g2 );
        }
    }

    /**
     * Draws all the Graphic objects in the ApparatusPanel
     *
     * @param graphics
     */
    @Override
		protected void paintComponent( Graphics graphics ) {
        Graphics2D g2 = (Graphics2D) graphics;
        super.paintComponent( g2 );
        GraphicsState state = new GraphicsState( g2 );
        setup( g2 );
        graphic.paint( g2 );
        drawBorder( g2 );
        state.restoreGraphics();
    }

    /**
     * Provided so that subclasses (e.g. ApparatusPanel2) can get Java components to
     * paint without them having to call super.paintComponent() and incurring a redundant
     * painting of the graphic instance.
     *
     * @param graphics
     */
    protected void doPaintSuper( Graphics graphics ) {
        super.paintComponent( graphics );
    }

    /**
     * Causes the panel to be repainted in the normal Swing invocation loop
     */
    public void paint() {
        repaint();
    }

    public void addGraphic( PhetGraphic graphic, double level ) {
        this.graphic.addGraphic( graphic, level );
    }

    /**
     * Adds a graphic to the default layer 0.
     */
    public void addGraphic( PhetGraphic graphic ) {
        this.addGraphic( graphic, 0 );
    }

    public void removeGraphic( PhetGraphic graphic ) {
        this.graphic.removeGraphic( graphic );
    }

    public GraphicLayerSet getGraphic() {
        return graphic;
    }

    private Rectangle grec = new Rectangle();
    
    protected void drawBorder( Graphics2D g2 ) {
        if ( displayBorder ) {
            GraphicsState gs = new GraphicsState( g2 );
            g2.setColor( Color.black );
            g2.setStroke( borderStroke );
            grec.width  =  this.getWidth() - 1;
            grec.height =  this.getHeight() - 1;
            RectangleUtils.drawRect(g2, grec);
            gs.restoreGraphics();
        }
    }

    public void setDisplayBorder( boolean displayBorder ) {
        this.displayBorder = displayBorder;
    }

    public void handleUserInput() {
        //noop
    }

}
