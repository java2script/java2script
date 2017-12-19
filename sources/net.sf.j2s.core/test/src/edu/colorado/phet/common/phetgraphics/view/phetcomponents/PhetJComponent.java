// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author:samreid $
 * Revision : $Revision:14674 $
 * Date modified : $Date:2007-04-17 02:37:37 -0500 (Tue, 17 Apr 2007) $
 */
package edu.colorado.phet.common.phetgraphics.view.phetcomponents;

import java.awt.AlphaComposite;
import java.awt.Component;
import java.awt.Composite;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.RenderingHints;
import java.awt.Window;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.FocusAdapter;
import java.awt.event.FocusEvent;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;
import java.awt.geom.AffineTransform;
import java.awt.geom.NoninvertibleTransformException;
import java.awt.geom.Point2D;
import java.awt.image.BufferedImage;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.util.HashSet;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.Set;

import javax.swing.JComponent;
import javax.swing.JPanel;
import javax.swing.JWindow;
import javax.swing.KeyStroke;
import javax.swing.RepaintManager;
import javax.swing.event.CaretEvent;
import javax.swing.event.CaretListener;
import javax.swing.event.DocumentEvent;
import javax.swing.event.DocumentListener;
import javax.swing.event.MouseInputAdapter;
import javax.swing.text.JTextComponent;

import edu.colorado.phet.common.phetcommon.application.PhetApplication;
import edu.colorado.phet.common.phetcommon.view.util.RectangleUtils;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.GraphicLayerSet;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetGraphic;
import edu.colorado.phet.common.phetgraphics.view.phetgraphics.PhetGraphics2D;

/**
 * User: Sam Reid
 * Date: Mar 8, 2005
 * Time: 9:06:36 PM
 */

public class PhetJComponent extends PhetGraphic {

    private static JWindow offscreen;
    private static boolean inited = false;
    private static JPanel offscreenContentPane = new JPanel( null ) {
        @Override
				public void invalidate() {
        }

        @Override
				protected void paintComponent( Graphics g ) {
        }
    };

    private JComponent component;
//    private boolean topLevel;
    private BufferedImage image;
    private static Dimension tempDim = new Dimension();
    private Rectangle tempRec = new Rectangle();

    private static PhetJComponentRepaintManager repaintManagerPhet = new PhetJComponentRepaintManager();
//    private static PhetJComponentManager manager = new PhetJComponentManager();

//    static {
//        getManager().addListener( new PJCFocusManager() );
//    }

    public static PhetJComponentRepaintManager getRepaintManager() {
        return repaintManagerPhet;
    }

    public static PhetGraphic newInstance( Component apparatusPanel, JComponent jComponent ) {
        return newInstance( apparatusPanel, jComponent, true );
    }

    private static PhetGraphic newInstance( Component apparatusPanel, JComponent jComponent, boolean topLevel ) {
        if ( !inited ) {
            init( PhetApplication.getInstance().getPhetFrame() );
        }

        if ( topLevel ) {
        	Container c = offscreen.getContentPane();
            c.add( jComponent );
        }

        offscreen.getContentPane().validate();
        offscreen.getContentPane().doLayout();

        tempDim = jComponent.getPreferredSize();
        if ( topLevel ) {
            jComponent.setBounds( jComponent.getX(), jComponent.getY(), tempDim.width, tempDim.height );
        }
        else {
            Container container = jComponent.getParent();
            container.doLayout();
//            System.out.println( "container = " + container.getClass() + ", layout=" + container.getLayout().getClass() );
          	jComponent.setSize(tempDim); // BH lock it in. 
        }
        doNotifyAll( jComponent );//todo what is this for?
        if ( jComponent.getComponentCount() > 0 ) {

            //This code attempted to create a Graphic Tree with the swing components we contain.
            GraphicLayerSet graphicLayerSet = new GraphicLayerSet();
            Component[] children = jComponent.getComponents();

            validateSuperTree( jComponent );
            graphicLayerSet.addGraphic( new PhetJComponent( apparatusPanel, jComponent, topLevel ) );//the container is the background.

            for ( int i = 0; i < children.length; i++ ) {
                if ( !( children[i] instanceof JComponent ) ) {
                    System.out.println( "children[i] = " + children[i].getClass() );
                }
                else {
                    JComponent child = (JComponent) children[i];
                    Point location = child.getLocation();
//                System.out.println( "location@" + child.getClass() + " = " + location );
                    PhetGraphic pj = PhetJComponent.newInstance( apparatusPanel, child, false );
                    graphicLayerSet.addGraphic( pj );
                    //have to account for parent's locations.

                    pj.setLocation2( location.x - jComponent.getX(), location.y - jComponent.getY() );
                }
            }

            return graphicLayerSet;
        }
        else {
            return new PhetJComponent( apparatusPanel, jComponent, topLevel );
        }
    }

    public static void init( Window applicationWindow ) {


        if ( inited ) {
            throw new RuntimeException( "Multiple inits." );
        }

//        System.out.println( "Setting repaintManagerPhet." );
        RepaintManager.setCurrentManager( repaintManagerPhet );

        offscreen = new JWindow( applicationWindow ) {
        	//private int ok = 1;
        	//private int[] x = new int[3];
        	
            @Override
						public void invalidate() {
            }

            @Override
						public void paint( Graphics g ) {
            }
        };       //this seems to work.  I thought you might have needed a visible component, though (maybe for some JVM implementations?)
//        System.out.println( "offscreen.getOwner() = " + offscreen.getOwner() );

//        offscreen.getOwner().setVisible( true );
        offscreen.setSize( 0, 0 );
        offscreen.setVisible( true );
        offscreenContentPane.setOpaque( false );
        offscreen.setContentPane( offscreenContentPane );
        inited = true;
    }

    private static void validateSuperTree( Component jComponent ) {
        jComponent.invalidate();
        jComponent.validate();
        jComponent.doLayout();
        Component parent = jComponent.getParent();
        if ( parent != null ) {
            validateSuperTree( parent );
        }
    }

    private static void doNotifyAll( Component jComponent ) {
        jComponent.addNotify();
        if ( jComponent instanceof Container ) {
            Container container = (Container) jComponent;
            Component[] c = container.getComponents();
            for ( int i = 0; i < c.length; i++ ) {
                doNotifyAll( c[i] );
            }
        }
    }

	protected PhetJComponent(Component ap, final JComponent component,
			boolean topLevel) {
		super(ap);
		this.component = component;
		//this.topLevel = topLevel;
		repaint();
		// BH much simplified mouse input listener, without all the "new" calls for every event
		addMouseInputListener(new MouseInputAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				applyEvent(e, MouseEvent.MOUSE_CLICKED);
			}

			@Override
			public void mouseEntered(MouseEvent e) {
				applyEvent(e, MouseEvent.MOUSE_ENTERED);
			}

			@Override
			public void mouseExited(MouseEvent e) {
				applyEvent(e, MouseEvent.MOUSE_EXITED);
			}

			@Override
			public void mousePressed(MouseEvent e) {
				applyEvent(e, MouseEvent.MOUSE_PRESSED);
			}

			@Override
			public void mouseReleased(MouseEvent e) {
				applyEvent(e, MouseEvent.MOUSE_RELEASED);
			}

			@Override
			public void mouseDragged(MouseEvent e) {
				applyEvent(e, MouseEvent.MOUSE_DRAGGED);
			}

			@Override
			public void mouseMoved(MouseEvent e) {
				applyEvent(e, MouseEvent.MOUSE_MOVED);
			}
		});

		addKeyListener(new KeyListener() {
			@Override
			public void keyPressed(KeyEvent e) {
				handleKey(e, KeyEvent.KEY_PRESSED);
			}
			
			@Override
			public void keyReleased(KeyEvent e) {
				handleKey(e, KeyEvent.KEY_RELEASED);
			}

			@Override
			public void keyTyped(KeyEvent e) {
				handleKey(e, KeyEvent.KEY_TYPED);
			}
		});

		component.addFocusListener(new FocusAdapter() {
			@Override
			public void focusGained(FocusEvent e) {
				// System.out.println( "PhetJComponent.focusGained=" + component );
				repaint();
			}

			@Override
			public void focusLost(FocusEvent e) {
				// System.out.println( "PhetJComponent.focusLost, copmonent=" +
				// component );
				repaint();
			}
		});

		component.addPropertyChangeListener("enabled",
				new PropertyChangeListener() {
					@Override
					public void propertyChange(PropertyChangeEvent evt) {
						fireRepaintBurst();
					}
				});

		component.addMouseListener(new MouseInputAdapter() {
			@Override
			public void mouseExited(MouseEvent e) {
				fireRepaintBurst();
			}

			@Override
			public void mouseEntered(MouseEvent e) {
				fireRepaintBurst();
			}
		});

		if (component instanceof JTextComponent) {
			addTextComponentListeners((JTextComponent) component);
		}

		repaintManagerPhet.put(this);
		// manager.phetJComponentCreated( this );
	}

    /*
    * Ensure that repaint is called when various aspects of JTextComponet change.
    * This was added to address Unfuddle #1337.
    */
    private void addTextComponentListeners( JTextComponent textComponent ) {

        textComponent.getDocument().addDocumentListener( new DocumentListener() {

            @Override
						public void changedUpdate( DocumentEvent e ) {
                repaint();
            }

            @Override
						public void insertUpdate( DocumentEvent e ) {
                repaint();
            }

            @Override
						public void removeUpdate( DocumentEvent e ) {
                repaint();
            }

        } );

        textComponent.addCaretListener( new CaretListener() {

            @Override
						public void caretUpdate( CaretEvent e ) {
                repaint();
            }

        } );
    }

    /**
     * Simply repainting in SwingUtilities.invokeLater doesn't have the correct behavior, we have to schedule a
     * repaint for much further out in time for some reason.
     * <p/>
     * This workaround schedules 10 repaints over a second, and appears to work properly without demanding significantly more from the system.
     * See https://phet.unfuddle.com/projects/9404/tickets/by_number/906?cycle=true
     */
    private void fireRepaintBurst() {
    	repaint();
    	
    	// BH - for now, no burst -- example?
    	
//        final int[] count = new int[] { 0 };
//        final Timer[] t = new Timer[1];
//
//        t[0] = new Timer( 100, new ActionListener() {
//            public void actionPerformed( ActionEvent e ) {
//                repaint();
//                count[0]++;
//                if ( count[0] > 10 ) {
//                    t[0].stop();
//                }
//            }
//        } );
//        t[0].start();
    }

//    public static PhetJComponentManager getManager() {
//        return manager;
//    }
//
    private void handleKey( KeyEvent e, int id) {
        ActionListener al = component.getActionForKeyStroke(KeyStroke.getKeyStrokeForEvent(e));
        // BH moved ae into a1 != null
        if (al != null)
          al.actionPerformed(new ActionEvent(component, e.getID(), e.getKeyChar() + "", e.getWhen(), e.getModifiers()));
        KeyEvent event = new KeyEvent( component, e.getID(), e.getWhen(), e.getModifiers(), e.getKeyCode(), e.getKeyChar(), e.getKeyLocation() );
        KeyListener[] kl = component.getKeyListeners();
        for ( int i = 0, n = kl.length; i < n; i++ ) {
            KeyListener listener = kl[i];
            switch (id) {
            case KeyEvent.KEY_PRESSED:
              listener.keyPressed(event);
            	break;
            case KeyEvent.KEY_RELEASED:
              listener.keyPressed(event);
            	break;
            case KeyEvent.KEY_TYPED:
              listener.keyPressed(event);
            	break;
            }
        }
    }

	private boolean applyEvent(MouseEvent e, int id) {
		// need an intelligent conversion of mouse point.
		Point pt = toLocalFrame(e.getPoint());
		
		// BH Note that we could be sending a MOVED event to an ENTERED handler.
		// BH So this presumes the listener will not need e.getID(). Sounds risky!
		
		MouseEvent newEvent = new MouseEvent(component, e.getID(),
				System.currentTimeMillis(), e.getModifiers(), pt.x, pt.y,
				e.getClickCount(), e.isPopupTrigger(), e.getButton());
		// pass to all listeners, some will be no-ops.
		// could be rewritten for understandability.  // BH done! :)
		boolean changed = false;
		switch (id) {
		case MouseEvent.MOUSE_DRAGGED:
		case MouseEvent.MOUSE_MOVED:
			MouseMotionListener[] mml = component.getMouseMotionListeners();
			for (int i = 0, n = mml.length; i < n; i++) {
				MouseMotionListener mouseMotionListener = mml[i];
      	switch (id) {
      	case MouseEvent.MOUSE_MOVED:
          mouseMotionListener.mouseMoved(newEvent);
          break;
      	case MouseEvent.MOUSE_DRAGGED:
          mouseMotionListener.mouseDragged(newEvent);
          break;
      	}
				changed = true;
			}
			break;
	  default:
			MouseListener[] ml =component.getMouseListeners();
			for (int i = 0, n = ml.length; i < n; i++) {
				MouseListener mouseListener = ml[i];
      	switch (id) {
      	case MouseEvent.MOUSE_CLICKED:
          mouseListener.mouseClicked(newEvent);
          break;
      	case MouseEvent.MOUSE_ENTERED:
          mouseListener.mouseEntered(newEvent);
          break;
      	case MouseEvent.MOUSE_EXITED:
          mouseListener.mouseExited(newEvent);
          break;
      	case MouseEvent.MOUSE_PRESSED:
          mouseListener.mousePressed(newEvent);
          break;
      	case MouseEvent.MOUSE_RELEASED:
          mouseListener.mouseReleased(newEvent);
          break;
      	}
				changed = true;
			}
	  	break;
	  	
		}
		if (changed) {
			redraw();
		}
		return changed;
	}

    private Point toLocalFrame( Point point ) {
        AffineTransform affineTransform = getNetTransform();
        try {
            Point2D dst = affineTransform.inverseTransform( point, null );
            return new Point( (int) dst.getX(), (int) dst.getY() );
        }
        catch ( NoninvertibleTransformException e ) {
            e.printStackTrace();
            throw new RuntimeException( e );
        }
    }

    //TODO repaint should call redraw before super.repaint(), and all internal calls should be repaint().
    private void redraw() {
        //the x and y are in the local frame (ie in the parent.)
//        System.out.println( "component = " + component.getClass() + ", x=" + component.getX() + ", y=" + component.getY() );
    	Dimension dim = tempDim;
        component.getSize(dim);
//        if ( !topLevel ) {
//            dim = component.getSize();
//        }
        if ( dim.width == 0 || dim.height == 0 ) {
            return;
        }
        component.getBounds(tempRec);
//        System.out.println( "component = " + component );
//        System.out.println( "bounds = " + bounds );
        if (tempRec.x != 0 || tempRec.y != 0 || tempRec.width != dim.width || tempRec.height != dim.height) {
        //if ( !bounds.equals( new Rectangle( dim ) ) ) { // BH very expensive!
            component.setBounds( 0, 0, dim.width, dim.height );//dimension is set by parent's layout manager.
        }

        if ( image == null ) {
            image = new BufferedImage( dim.width, dim.height, BufferedImage.TYPE_INT_ARGB );
        }
        else {
            if ( image.getRaster().getWidth() != dim.width || image.getRaster().getHeight() != dim.height ) {
                image = new BufferedImage( dim.width, dim.height, BufferedImage.TYPE_INT_ARGB );
            }
            else {//reuse the old buffered image.
                Graphics2D g2 = image.createGraphics();

                // Clear the background with the component's color (which may contain alpha).
                Composite saveComposite = g2.getComposite();
                g2.setComposite( AlphaComposite.Clear );
                g2.setColor( component.getBackground() );
                localRect.width = image.getRaster().getWidth();
                localRect.height = image.getRaster().getHeight();
                RectangleUtils.fillRect(g2, localRect);
                g2.setComposite( saveComposite );
            }
        }
  
        localRect.width = image.getRaster().getWidth();
        localRect.height = image.getRaster().getHeight();
        
        Graphics2D g2 = image.createGraphics();
        g2 = new PhetGraphics2D( g2 );
        g2.setRenderingHint( RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON );
        g2.setRenderingHint( RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BICUBIC );
        g2.setRenderingHint( RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_ON );
        component.paint( g2 );
        setBoundsDirtyOpt();
    }

    protected Graphics2D createGraphics() {
        return image.createGraphics();
    }

//    protected Rectangle determineBounds() {
//      Rectangle r = (image == null ? null : determineBondsFor(image.getWidth(), image.getHeight()));
//      System.out.println("PJC " + r + this);      	
//      return  r;
//    }
    
    @Override
		protected Rectangle determineBounds() {
    	return determineShapeBounds();
   }



		@Override
		public void paint( Graphics2D g2 ) {
        if ( isVisible() ) {
            saveGraphicsState( g2 );
            RenderingHints hints = getRenderingHints();
            if ( hints != null ) {
                g2.setRenderingHints( hints );
            }
            if ( component != null && image != null ) {
                g2.transform(getNetTransform());
                Object origHint = g2.getRenderingHint( RenderingHints.KEY_INTERPOLATION );
                g2.setRenderingHint( RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BICUBIC );
                g2.drawRenderedImage( image, IDENTITY  ); // BH optimized out new
                
                
                // BH adding hook to JSComponentUI. 
                
				/**
				 * @j2sNative
				 * 
				 *            swingjs.plaf.JSComponentUI.updateSceneGraph$javax_swing_JComponent$javax_swing_JComponent$swingjs_JSGraphics2D(this.component
				 *            , this.container, g2);
				 */
                {}
                
                if ( origHint == null ) {
                    origHint = RenderingHints.VALUE_INTERPOLATION_NEAREST_NEIGHBOR;
                }
                g2.setRenderingHint( RenderingHints.KEY_INTERPOLATION, origHint );
            }
            restoreGraphicsStatePG();
        }
    }

    @Override
		public void repaint() {
        redraw();//TODO is this necessary?
        repaintPG();
    }

    public JComponent getSourceComponent() {
        return component;
    }

    public static class PhetJComponentRepaintManager extends RepaintManager {
        private Hashtable<JComponent, PhetJComponent> table = new Hashtable<JComponent, PhetJComponent>();
        private Set<PhetJComponent> dirty = new HashSet<PhetJComponent>();
        private boolean tooManyDirty = false;

        @Override
				public synchronized void addDirtyRegion( JComponent c, int x, int y, int w, int h ) {
        	// BH note: not called in JavaScript.
            super.addDirtyRegion( c, x, y, w, h );
            if ( table.containsKey( c ) ) {
                PhetJComponent phetJComponent = table.get( c );
                boolean inRecursiveLoopOfDeath = false;//( new Exception().getStackTrace().length > 75 ); // HACK: ask Sam Reid why
                if ( c.getComponentCount() == 0 && !inRecursiveLoopOfDeath ) {
                    if ( !dirty.contains( c ) ) {
                        dirty.add( phetJComponent );
                        if ( dirty.size() > 1000 && !tooManyDirty ) {
                            // This stack trace will only be printed once, as a warning.
                            new RuntimeException( "Too many dirty components: " + dirty.size() ).printStackTrace();
                            tooManyDirty = true;
                        }
                    }
                }
            }
        }

        public void put( PhetJComponent phetJComponent ) {
            table.put( phetJComponent.component, phetJComponent );
        }

        public void updateGraphics() {
        	if (dirty.size() == 0) // BH optimized out -- unneeded
        		return;
            for ( Iterator<PhetJComponent> iterator = dirty.iterator(); iterator.hasNext(); ) {
                PhetJComponent component = iterator.next();
                component.repaint();
            }
            dirty.clear();
        }
    }
}