package com.polytopemedia.polyhedra.utils;

import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.TreeSet;

import com.polytopemedia.polyhedra.PlacedPolygon;
import com.polytopemedia.polyhedra.vec.Vector;
import com.polytopemedia.polyhedra.vec.Vector2D;

public class Utils {
	
// separating axis method... nice and neat
	public static boolean areSeparated(PlacedPolygon p1, PlacedPolygon p2, TwoKeyMap<PlacedPolygon, Vector2D, Interval> intervalCache) {
		Vector2D[] cp1 = p1.cornerPositionProjections();
		Vector2D[] cp2 = p2.cornerPositionProjections();
		Collection<Vector2D> directions = getDirections(cp1,cp2);
		for (Vector2D direction : directions) {
			Interval interval1 = getInterval(p1, intervalCache, cp1, direction);
			Interval interval2 = getInterval(p2, intervalCache, cp2, direction);
			if (!interval1.meets(interval2)) {
				return true;
			}
		}
		return false;
	}
	
	
	private static Interval getInterval(
			PlacedPolygon pp,
			TwoKeyMap<PlacedPolygon, Vector2D, Interval> intervalCache,
			Vector2D[] cornerPoints, Vector2D direction) {
		Interval interval;
		if (intervalCache.containsKeys(pp, direction)) {
			interval = intervalCache.get(pp,direction);
		} else {
			interval = Utils.projectionInterval(direction, cornerPoints);
			intervalCache.put(pp,direction,interval);
		}
		return interval;
	}

	private static Collection<Vector2D> getDirections(Vector2D[] cp1, Vector2D[] cp2) {
		LinkedHashMap<Integer, Vector2D> directions = new LinkedHashMap<Integer, Vector2D>();
		for (Vector2D[] cp : new Vector2D[][] {cp1, cp2}) {
			for (int i=0; i<cp.length; i++) {
				Vector2D direction = cp[i].minus(cp[(i+1)%cp.length]).normal().normalise();
				double angle = Math.atan2(direction.getSecond(), direction.getFirst());
				if (angle < 0) {
					angle += Math.PI;
					direction = direction.times(-1);
				}
				int iangle = (int)Math.round(angle*1e6);
				directions.put(iangle, direction);
			}
		}
		return directions.values();
	}

	public static Interval projectionInterval(Vector2D direction,
			Vector2D[] cp) {
		double min = Double.POSITIVE_INFINITY;
		double max = Double.NEGATIVE_INFINITY;
		for (Vector2D p : cp) {
			double dot = p.dot(direction);
			if (dot < min) min = dot;
			if (dot > max) max = dot;
		}
		return new Interval(min, max);
	}
	/** returns the convex hull, with the start point repeated at the end */
	public static List<Vector2D> convexHull(TreeSet<Vector2D> points) {
		int n = points.size();
		Vector2D[] pointArray = points.toArray(new Vector2D[n]);
		int k = 0;
		Vector2D[] hullPoints= new Vector2D[2*n];
		
        for (int i = 0; i < n; i++) {
                while (k >= 2 && cross(hullPoints[k-2], hullPoints[k-1], pointArray[i]) <= 0) k--;
                hullPoints[k++] = pointArray[i];
        }
 
        // Build upper hull
        for (int i = n-2, t = k+1; i >= 0; i--) {
                while (k >= t && cross(hullPoints[k-2], hullPoints[k-1], pointArray[i]) <= 0) k--;
                hullPoints[k++] = pointArray[i];
        }
        List<Vector2D> hull= new ArrayList<Vector2D>();
        for (int i=0; i<k; i++) {
        	hull.add(hullPoints[i]);
        }
        return hull;

	}
	private static double cross(Vector2D O, Vector2D A,
			Vector2D B) {
		return (A.getFirst() - O.getFirst()) * (B.getSecond() - O.getSecond()) - (A.getSecond() - O.getSecond()) * (B.getFirst() - O.getFirst());
	}
	public static int toInt(double x) {
		return (int)(Math.round(x));
	}
	public static boolean containsRudeWord(String text) {
		if (text == null) return false;
		text = rot13(text);
		return text.contains("shpx") || text.contains("fuvg") || text.contains("frk") || text.contains("phag") || text.contains("avttre") || text.contains("anmv") || text.contains("qnza");
	}
	private static String rot13(String text) {
		StringBuffer buf = new StringBuffer();
		text = text.toLowerCase();
		for (int i=0; i<text.length(); i++) {
			char ch = text.charAt(i);
			if (ch >= 'a' && ch <= 'm') {
				ch = (char)(ch+13);
			} else if (ch >= 'n' && ch <= 'z') {
				ch = (char)(ch-13);
			}
			if (ch >= 'a' && ch <= 'z') {
				buf.append(ch);
			}
		}
		return buf.toString();
	}


	public static double[][] getMatrixThatMaps(Vector2D[] from, Vector[] to) {
		
		double sxx = 0;
		double sxy = 0;
		double syy = 0;
		double sx = 0;
		double sy = 0;
		double s = 0;

		double sxX = 0;
		double sxY = 0;
		double sxZ = 0;
		double syX = 0;
		double syY = 0;
		double syZ = 0;
		double sX = 0;
		double sY = 0;
		double sZ = 0;
		
		for (int i=0; i<from.length; i++) {
			double x = from[i].getFirst(), y=from[i].getSecond();
			double X = to[i].getX(),Y=to[i].getY(),Z=to[i].getZ();
			sxx += x*x;
			sxy += x*y;
			syy += y*y;
			sx += x;
			sy += y;
			s += 1;
			sxX += x*X;
			sxY += x*Y;
			sxZ += x*Z;
			syX += y*X;
			syY += y*Y;
			syZ += y*Z;
			sX += X;
			sY += Y;
			sZ += Z;
		}
		
		double[][] matrixToReduce = {
				{sxx,sxy,sx,sxX,sxY,sxZ},
				{sxy,syy,sy,syX,syY,syZ},
				{sx,sy,s,sX,sY,sZ}
		};
		for (int i=0; i<3; i++) {
			double scale = 1/matrixToReduce[i][i];
			for (int j=i; j<6; j++) {
				matrixToReduce[i][j] *= scale;
			}
			for (int k=0; k<3; k++) {
				if (k != i) {
					scale = matrixToReduce[k][i];
					for (int j=i; j<6; j++) {
						matrixToReduce[k][j] -= scale*matrixToReduce[i][j];
					}
				}
			}
		}
		
		double[][] rtn = new double[3][3];
		for (int i=0; i<3; i++) {
			for (int j=0; j<3; j++) {
				rtn[j][i] = matrixToReduce[i][j+3];
			}
		}
		     
		return rtn;
	}
	
	
}
