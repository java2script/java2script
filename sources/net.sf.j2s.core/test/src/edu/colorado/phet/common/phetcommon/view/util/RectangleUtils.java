// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 68499 $
 * Date modified : $Date: 2012-09-27 11:25:41 -0500 (Thu, 27 Sep 2012) $
 */
package edu.colorado.phet.common.phetcommon.view.util;

import java.awt.Graphics2D;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.geom.Point2D;
import java.awt.geom.Rectangle2D;
import java.awt.geom.Rectangle2D.Double;
import java.awt.geom.RoundRectangle2D;
import java.util.ArrayList;

/**
 * RectangleUtils
 *
 * @author ?
 * @version $Revision: 68499 $
 */
public class RectangleUtils {
    public static Rectangle2D expandRectangle2D( Rectangle2D r, double dx, double dy ) {
        return new Rectangle2D.Double( r.getX() - dx, r.getY() - dy, r.getWidth() + dx * 2, r.getHeight() + dy * 2 );
    }

    public static Rectangle expand( Rectangle r, int dx, int dy ) {
        return new Rectangle( r.x - dx, r.y - dy, r.width + dx * 2, r.height + dy * 2 );
    }

    public static Rectangle toRectangle( Rectangle2D b ) {
        if ( b == null ) {
            return null;
        }
        if ( b instanceof Rectangle ) {
            return (Rectangle) b;
        }
        else {
            return new Rectangle( (int) b.getX(), (int) b.getY(), (int) b.getWidth(), (int) b.getHeight() );
        }
    }

    public static Point getLeftCenter( Rectangle bounds ) {
        Point pt = bounds.getLocation();
        pt.translate( 0, bounds.height / 2 );
        return pt;
    }

    public static Point getTopCenter( Rectangle bounds ) {
        Point pt = bounds.getLocation();
        pt.translate( bounds.width / 2, 0 );
        return pt;
    }

    public static Point getBottomCenter( Rectangle bounds ) {
        Point pt = bounds.getLocation();
        pt.translate( bounds.width / 2, bounds.height );
        return pt;
    }

    public static Point getRightCenter( Rectangle bounds ) {
        Point pt = bounds.getLocation();
        pt.translate( bounds.width, bounds.height / 2 );
        return pt;
    }

    public static Point getCenter( Rectangle rect ) {
        return new Point( rect.x + rect.width / 2, rect.y + rect.height / 2 );
    }

    public static Point2D.Double getCenter2D( Rectangle2D rect ) {
        return new Point2D.Double( rect.getX() + rect.getWidth() / 2, rect.getY() + rect.getHeight() / 2 );
    }

    public static Rectangle2D expand( Rectangle2D r, double dw, double dh ) {
        return new Rectangle2D.Double( r.getX() - dw, r.getY() - dh, r.getWidth() + dw * 2, r.getHeight() + dh * 2 );
    }


// BH updated to allow return rectangle
    
    public static Rectangle union( Rectangle[] rectangles ) {
      if ( rectangles.length == 0 ) {
          return null;
      }
      Rectangle union = null;//new Rectangle( rectangles[0] );
      for ( int i = 0; i < rectangles.length; i++ ) {
          Rectangle rectangle = rectangles[i];
          if ( rectangle != null ) {
              if ( union == null ) {
                  union = new Rectangle( rectangle );
              }
              else {
                  union = union.union( rectangle );
              }
          }

      }
      return union;
  }


    /**
     * return null or ret rectangle
     * 
     * @param rectangles
     * @param ret
     * @return
     */
    public static void unionAdd(Rectangle rectangle, Rectangle union) {
    	if (rectangle == null)
    		return;
    	if (union.x == Integer.MAX_VALUE) {
    		setBounds2(union, rectangle);
    		return;
    	}
      addToUnion(union, rectangle);
    }

    private static void setBounds2(Rectangle to, Rectangle from) {
  		to.x = from.x;
  		to.y = from.y;
  		to.width = from.width;
  		to.height = from.height;
		}

		private static void addToUnion(Rectangle union, Rectangle r) {
      long tx2 = union.width;
      long ty2 = union.height;
      if ((tx2 | ty2) < 0) {
          // This rectangle has negative dimensions...
          // If r has non-negative dimensions then it is the answer.
          // If r is non-existant (has a negative dimension), then both
          // are non-existant and we can return any non-existant rectangle
          // as an answer.  Thus, returning r meets that criterion.
          // Either way, r is our answer.
          setBounds2(union, r);
      }
      long rx2 = r.width;
      long ry2 = r.height;
      if ((rx2 | ry2) < 0) {
          return;
      }
      int tx1 = union.x;
      int ty1 = union.y;
      tx2 += tx1;
      ty2 += ty1;
      int rx1 = r.x;
      int ry1 = r.y;
      rx2 += rx1;
      ry2 += ry1;
      if (tx1 > rx1) tx1 = rx1;
      if (ty1 > ry1) ty1 = ry1;
      if (tx2 < rx2) tx2 = rx2;
      if (ty2 < ry2) ty2 = ry2;
      tx2 -= tx1;
      ty2 -= ty1;
      // tx2,ty2 will never underflow since both original rectangles
      // were already proven to be non-empty
      // they might overflow, though...
      if (tx2 > Integer.MAX_VALUE) tx2 = Integer.MAX_VALUE;
      if (ty2 > Integer.MAX_VALUE) ty2 = Integer.MAX_VALUE;
      union.x = tx1;
      union.y = ty1;
      union.width = (int) tx2;
      union.height =(int) ty2;
  }


	public static boolean areEqual(Rectangle a, Rectangle b) {
		return (a != null && b != null && a.x == b.x && a.y == b.y
				&& a.width == b.width && a.height == b.height);
	}

	public static Rectangle union(ArrayList<Rectangle> rectangles) {
		if (rectangles.size() == 0) {
			return null;
		}
		Rectangle union = rectangles.remove(0);
		while (rectangles.size() > 0) {
			Rectangle r = rectangles.remove(0);
			if (r != null) {
				// WORKAROUND: the list sometimes contains null objects
				union = union.union(r);
			}
		}
		return union;
	}

//    // BH refactored to remove redundancy
//    public static Rectangle2D union2D( Rectangle2D[] rectangles ) {
//        if ( rectangles.length == 0 ) {
//            return null;
//        }
//        Rectangle2D.Double union = null;//new Rectangle( rectangles[0] );
//        for ( int i = 0; i < rectangles.length; i++ ) {
//            Rectangle2D rectangle = rectangles[i];
//            if ( rectangle != null ) {
//                if ( union == null ) {
//                    union = new Rectangle2D.Double( rectangle.getX(), rectangle.getY(), rectangle.getWidth(), rectangle.getHeight() );
//                }
//                else {
//                    Rectangle2D.union( union, rectangle, union );
////                    union = union.union( rectangle.getX(),rectangle.getY(),rectangle.getWidth(),rectangle.getLength() );
//                }
//            }
//
//        }
//        return union;
//    }

    public static Rectangle2D compactRectangle2D( Rectangle2D r, double insetX, double insetY ) {
        return new Rectangle2D.Double( r.getX() + insetX, r.getY() + insetY, r.getWidth() - insetX * 2, r.getHeight() - insetY * 2 );
    }

    public static RoundRectangle2D.Double round( final Rectangle2D rectangle2D, final double arcW, final double arcH ) {
        return new RoundRectangle2D.Double( rectangle2D.getX(), rectangle2D.getY(), rectangle2D.getWidth(), rectangle2D.getHeight(), arcW, arcH );
    }

    public static Rectangle toRectangle2(Double b,
				Rectangle ret) {
      if ( b == null )
        return null;
      ret.x = (int) b.x;
      ret.y = (int) b.y;
      ret.width = (int) b.width;
      ret.height = (int) b.height;
      return ret;
		}


		/**
     * A simplified "inside" check for Double point with an integer Rectangle.
     * @param p
     * @param r
     *
     * @return
     * @author Bob Hanson 
     */
    
	public static boolean isInside(Point2D.Double p, Rectangle r) {
		double v;
		return ((v = p.x - r.x) >= 0 && v < r.width && (v = p.y - r.y) >= 0 && v < r.height);
	}

	public static void fillRect2D(Graphics2D g, Rectangle2D.Double r) {
		g.fillRect( (int) r.x, (int) r.y, (int) r.width, (int) r.height );		
	}

	public static void fillRect(Graphics2D g, Rectangle r) {
		g.fillRect( r.x, r.y, r.width, r.height );		
	}

	public static void drawRect2D(Graphics2D g, Rectangle2D.Double r) {
		g.drawRect( (int) r.x, (int) r.y, (int) r.width, (int) r.height );		
	}

	public static void drawRect(Graphics2D g, Rectangle r) {
		g.drawRect( r.x, r.y, r.width, r.height );		
	}

	public static boolean containsPt(Rectangle2D.Double r, Point2D.Double pt) {
		return (pt.x >= r.x && pt.y >= r.y && pt.x < r.x + r.width && pt.y <  r.y + r.height);
	}
	public static boolean containsXY(Rectangle2D.Double r, double x, double y) {
		return (x >= r.x && y >= r.y && x < r.x + r.width && y < r.y + r.height);
	}

	public static boolean containsR4XY(double rx, double ry, double rw, double rh, double x, double y) {
		return (x >= rx && y >= ry && x < rx + rw && y < ry + rh);
	}
	
	public static boolean containsRect(double rx, double ry, double rw,
			double rh, double x, double y, double w, double h) {
		return (rw > 0 && rh > 0 && w > 0 && h > 0 && x >= rx && y >= ry
				&& (x + w) <= rx + rw && (y + h) <= ry + rh);
	}

  private static Rectangle2D.Double rtemp = new Rectangle2D.Double();

	public static Rectangle2D.Double tempRect2D(double x, double y, double w,
			double h) {
		Double r = rtemp;
		r.x = x;
		r.y = y;
		r.width = w;
		r.height = h;
		return r;
	}
}
