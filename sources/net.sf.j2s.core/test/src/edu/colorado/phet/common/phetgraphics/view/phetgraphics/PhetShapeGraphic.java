// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 54200 $
 * Date modified : $Date: 2011-07-18 19:45:40 -0500 (Mon, 18 Jul 2011) $
 */
package edu.colorado.phet.common.phetgraphics.view.phetgraphics;

import java.awt.AlphaComposite;
import java.awt.Color;
import java.awt.Component;
import java.awt.Composite;
import java.awt.Graphics2D;
import java.awt.Paint;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.Shape;
import java.awt.Stroke;
import java.awt.geom.Area;
import java.awt.geom.GeneralPath;
import java.awt.geom.Rectangle2D;

import edu.colorado.phet.common.phetcommon.view.util.RectangleUtils;
import edu.colorado.phet.common.phetgraphics.view.ApparatusPanel2;
import edu.colorado.phet.common.phetgraphics.view.util.GraphicsUtil;

/**
 * PhetShapeGraphic
 *
 * @author ?
 * @version $Revision: 54200 $
 */
public class PhetShapeGraphic extends PhetGraphic {
		protected static final int TYPE_UNKNOWN = 0;
    protected static final int TYPE_RECT = 1;
		protected static final int TYPE_RECT2D = 2;
		private Shape shape; // BH needs to shadow PhetGraphic because it is not used there
    private Stroke stroke;
    private Paint fill;
    private Paint border;
    private Composite orgComposite = null;
    private Paint workingPaint;
    private Shape strokedShape;
    private boolean shapeDirty = false;
    private int type;
    
    

	public PhetShapeGraphic(Component component, Shape shape, Paint fill,
			Stroke stroke, Paint border) {
		super(component);
		this.shape = shape;
		this.fill = fill;
		this.stroke = stroke;
		this.border = border;
  	computeStrokedShape();
	}

    protected void setType(int type) {
  		this.type = type;
  	}

		public PhetShapeGraphic( Component component, Shape shape, Paint fill ) {
        this( component, shape, fill, null /* stroke */, null /* border */ );
    }

    public PhetShapeGraphic( Component component, Shape shape, Stroke stroke, Paint border ) {
        this( component, shape, null /* fill */, stroke, border );
    }

    public PhetShapeGraphic( Component component ) {
        this( component, null, null, null, null );
    }

    //----------------------------------------------------------------
    // Setters and getters
    //----------------------------------------------------------------

    public void setShape( Shape shape ) {
        boolean sameShape = sameShape( this.shape, shape );
        if ( !sameShape ) {
            this.shape = shape;
            setShapeDirty();
        }
    }

    public void setShapeDirty() {
        this.shapeDirty = true;
        setBoundsDirtyOpt();
        autorepaint();
    }

    public Shape getShape() {
        return shape;
    }

    public Paint getFill() {
        return fill;
    }

    public Stroke getStroke() {
        return stroke;
    }

    public Paint getBorder() {
        return border;
    }

    public Paint getBorderPaint() {
        return border;
    }

    public void setBorderPaint( Paint border ) {
        this.border = border;
        autorepaint();
    }

    public void setBorderColor( Color color ) {
        this.border = color;
        autorepaint();
    }

    public void setStroke( Stroke stroke ) {
        this.stroke = stroke;
        setShapeDirty();
    }

    public void setPaint( Paint paint ) {
        boolean changed = false;
        if ( this.fill == null && paint != null ) {
            changed = true;
        }
        else if ( this.fill != null && paint == null ) {
            changed = true;
        }
        else if ( this.fill == null && paint == null ) {
            changed = false;//to miss the next line.
        }
        else if ( !this.fill.equals( paint ) ) {
            changed = true;
        }
        if ( changed ) {
            this.fill = paint;
            autorepaint();
        }
    }

    public void setColor( Color color ) {
        setPaint( color );
    }

    public Paint getPaint() {
        return this.fill;
    }

    /*
     * Computes and caches the stroked shape.
     */
    private void computeStrokedShape() {
        if ( stroke != null && shape != null ) {
            strokedShape = stroke.createStrokedShape( shape );
        }
        else {
            strokedShape = null;
        }
    }

    //----------------------------------------------------------------
    // Rendering
    //----------------------------------------------------------------

    /**
     * Manipulates the paint to get alpha to work on a Mac as it does on Windows and Linux
     *
     * @param g2
     */
    @Override
		public void paint( Graphics2D g2 ) {
    	paintType(g2);
    }

	protected void paintType(Graphics2D g2) {
		if (isVisible() && shape != null) {
			saveGraphicsState(g2);
			updateGraphicsState(g2);
			g2.transform(getNetTransform());
			if (fill != null) {
				workingPaint = fill;
				// Set the alpha if necessary
				setAlpha(g2, fill);
				g2.setPaint(workingPaint);
				switch (type) {
				case TYPE_RECT:
					RectangleUtils.fillRect(g2, (Rectangle) shape);
					break;
				case TYPE_RECT2D:
					RectangleUtils.fillRect2D(g2, (Rectangle2D.Double) shape);
					break;
				default:
					g2.fill(shape);
				}
				restoreAlpha(g2);
			}
			if (stroke != null) {
				workingPaint = fill;
				setAlpha(g2, border);
				g2.setPaint(workingPaint);
				Stroke origStroke = g2.getStroke();
				g2.setStroke(stroke);
				switch (type) {
				case TYPE_RECT:
					RectangleUtils.drawRect(g2, (Rectangle) shape);
					break;
				case TYPE_RECT2D:
					RectangleUtils.drawRect2D(g2, (Rectangle2D.Double) shape);
					break;
				default:
					g2.draw(shape);
				}
				g2.setStroke(origStroke);
				restoreAlpha(g2);
			}
			restoreGraphicsState();
		}
	}

		/**
     * This method is linked intimately with setAlpha() to manage the restoration
     * of the graphics context withing the execution of paint()
     *
     * @param g2
     */
    private void restoreAlpha( Graphics2D g2 ) {
        if ( orgComposite != null ) {
            g2.setComposite( orgComposite );
            orgComposite = null;
        }
    }

    /**
     * Depending on specifics of the situation in which paint() has been called,
     * this method sets up the Graphics2D so that alpha is handled as the client
     * code expects, irrespective of the OS and whether the PhetShapeGraphic is being
     * drawn directly to the screen or to an opaque offscreen buffer. It is intimately
     * linked with restoreAlpha().
     *
     * @param g2
     * @param paint
     */
    private void setAlpha( Graphics2D g2, Paint paint ) {
        Component component = getComponent();
        // If we are drawing to an opaque offscreen buffer of an ApparatusPanel2, and
        // the Paint being used has alpha < 255, we set apply an AlphaComposite to the
        // Graphics2D that represents alpha in the Paint, compounded with whatever
        // AlphaComposite might have been already set on the Graphics2D.
        workingPaint = paint;
        if ( isApparatus2 ) {
            ApparatusPanel2 apparatusPanel2 = (ApparatusPanel2) component;
            if ( apparatusPanel2.isUseOffscreenBuffer() ) {
                if ( paint instanceof Color ) {
                    Color color = (Color) paint;
                    if ( color.getAlpha() < 255 ) {
                        workingPaint = new Color( color.getRed(), color.getGreen(), color.getBlue() );
                        double fillAlpha = (double) color.getAlpha() / 255;
                        Composite composite = g2.getComposite();
                        if ( composite instanceof AlphaComposite ) {
                            AlphaComposite alphaComposite = (AlphaComposite) composite;
                            fillAlpha *= alphaComposite.getAlpha();
                        }
                        // Save whatever Composite is already set on the Graphics2D
                        orgComposite = g2.getComposite();
                        GraphicsUtil.setAlpha( g2, fillAlpha );
                    }
                }
            }
        }
    }

	@Override
	protected Rectangle determineBounds() {
		if (shape == null)
			return null;
		Rectangle bounds;
		if (stroke == null) {
			bounds = shape.getBounds();
			localRect.x = bounds.x;
			localRect.y = bounds.y;
			localRect.width = bounds.width;
			localRect.height = bounds.height;
		} else {
			synchronizeStrokedShape();
			bounds = strokedShape.getBounds();
			localRect.x = bounds.x;
			localRect.y = bounds.y;
			localRect.width = bounds.width + 1;
			localRect.height = bounds.height + 1;
			// necessary to capture the entire bounds.
		}
		return determineShapeBounds();
	}

    private void synchronizeStrokedShape() {
        if ( shapeDirty ) {
            computeStrokedShape();
            shapeDirty = false;
        }
    }

    private boolean sameShape( Shape a, Shape b ) {
        if ( a == null && b == null ) {
            return true;
        }
        else if ( a == null && b != null ) {
            return false;
        }
        else if ( a != null && b == null ) {
            return false;
        }
        else if ( a.equals( b ) ) {
            return true;
        }
        else {
            //use specific comparators, not provided by java API.
            if ( new GeneralPathComparator().isMatch( a, b ) ) {
                return true;
            }
            else if ( new Rectangle2DComparator().isMatch( a, b ) ) {
                return true;
            }
            //this could default to comparinng new Areas., again, that may be better than drawing to the screen
            return false;
        }
    }

    /**
     * A separate class for ease of change when we move it.  This class may not be working currently.
     */
    private static class GeneralPathComparator {
        public boolean isMatch( Shape a, Shape b ) {
            if ( a.getClass().equals( GeneralPath.class ) && b.getClass().equals( GeneralPath.class ) ) {
                Area m = new Area( a );
                Area n = new Area( b );
                if ( m.equals( n ) ) {//slow, but better than drawing to the screen. //TODO is this working..?
                    return true;
                }
            }
            return false;
        }
    }

    /**
     * Returns true if any part of this PhetGraphic contains the specified point.
     * As of 2-6-2005, this includes the border.
     *
     * @param x
     * @param y
     * @return true if this PhetGraphic contains the specified point.
     */
    @Override
		public boolean contains( int x, int y ) {
        if ( isVisible() && shape != null ) {
            boolean borderVisible = stroke != null && border != null;
            boolean fillVisible = fill != null;
            if ( fillVisible &&             		
            		getNetTransform().createTransformedShape( shape ).contains( x, y ) ) {
                return true;
            }
            else if ( borderVisible && borderContains( x, y ) ) {
                return true;
            }
        }
        return false;
    }

    public boolean contains( Point p ) {
        return contains( p.x, p.y );
    }

    private boolean borderContains( int x, int y ) {
        boolean contains = false;
        synchronizeStrokedShape();
        if ( strokedShape != null ) {
            Shape txBorderShape = getNetTransform().createTransformedShape( strokedShape );
            contains = txBorderShape.contains( x, y );
        }
        return contains;
    }


    //----------------------------------------------------------------
    // Inner classes
    //----------------------------------------------------------------

    /**
     * A separate class for ease of change when we move it.
     */
    private static class Rectangle2DComparator {
        public boolean isMatch( Shape a, Shape b ) {
            if ( a.getClass().equals( Rectangle2D.Double.class ) && b.getClass().equals( Rectangle2D.Double.class ) ) {
                Rectangle2D.Double r = (Rectangle2D.Double) a;
                Rectangle2D.Double s = (Rectangle2D.Double) b;
                boolean same = r.x == s.x && r.y == s.y && r.width == s.width && r.height == s.height;
                return same;
            }
            return false;
        }
    }
}
